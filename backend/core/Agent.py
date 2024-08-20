import google.generativeai as genai
from core.Extractor import JSONExtractor
import time

PROMPT = """
            "As an expert in analyzing articles for speech synthesis, your task is to extract and structure the text of the article. REMOVE ALL  the HTML BALISES like href or <a> or anything start with < , i want it to be only Text to read like News and make sure each picture is related to the context of its paraphraph"
            "Please split the text into paragraphs and identify the picture from the site that is most related to each paragraph. "
            "Make sure each paragraph is readable and understandable when its read as a speech in news "
            "The response should be formatted as follows:"
            "if the length of the paraphraph greater than 170 characters including white spaces then split it into 2 sub paragraphs"
            "each 170 characters of a paraphraph put it in sub paragraph"
            "image should be an object for the paraphraph not sub paragraph"
            "text should be an array of strings"
                ```json
                        [
            {
                "text": [
                "Vivre une période canicule quand on est en vacances, c'est une chose. Mais la subir alors qu'on doit travailler, ça en est une autre.",
                " Pour toutes celles qui doivent cumuler bureau et chaleurs extrêmes, la question du look à arborer face à de telles températures est sans doute survenue à plusieurs reprises. Comment rester chic et bien habillée même quand le thermomètre affiche 30+ degrés ? La réponse prend la forme d'une petite robe courte en lin repérée dans la nouvelle collection."
                ],
                "image": "https://cache.cosmopolitan.fr/data/photo/w1000_ci/6v/robe-quand-il-fait-chaud-travail.jpg"
            },
            {
                "text": [
                "Il faut dire que le lin est l'allié mode des journées caniculaires. Avec lui, la peau respire et les options de looks sont nombreuses,entre la chemise et le short assorti, la robe longue ou courte, la jupe mini ou midi, la combinaison pantalon ou short...",
                "Mais la forme que l'on préfère pour un look de bureau quand il fait chaud est sans conteste la robe courte en lin à fines bretelles et de coupe trapèze. Cette forme évasée a l'avantage de convenir à toutes les morphologies, mais aussi de laisser l'air circuler. Un atout de taille en période de fortes chaleurs."
                ],
                "image": "https://cache.cosmopolitan.fr/data/photo/w680_ci/6v/robe-quand-il-fait-chaud-1.jpg"
            },
            {
                "text": [
                "Pour vaincre les fortes chaleurs sans perdre un degré de style, la clé est d'éviter l'accumulation. Que cela soit au niveau des vêtements ou des accessoires.",
                "On s'en tient au strict minimum et pour cela, on mise sur des pièces mode qui se suffisent à elles-mêmes. Outre la petite robe trapèze aussi à l'aise en journée qu'en soirée, on peut aussi se tourner vers le pantalon large agréable à porter ou encore la jupe portefeuille, flatteuse pour la silhouette."
                ],
                "image": "https://cache.cosmopolitan.fr/data/photo/w500_h250_ci/6w/robe-quand-il-fait-chaud.webp"
            }
            ]
    

                ```
            "
            "Keep the text in its original French language."
            f"HTML Content:\n{html_content}"
        """


class Agent:
    def __init__(self, api_key):
        genai.configure(api_key=api_key)
        self.llm = genai.GenerativeModel('gemini-1.5-flash')


    def extract_content(self, html_content):
        start = time.time()
        response = self.llm.generate_content(PROMPT + html_content).text
        end = time.time()
        print("Time taken: ", int(end-start),"sec \n" ,"Response generated!!","\n----------------------------------------------------------\n")
        print("AGENT RES : ",response,"----------------------------------------------------------\n",sep="\n")
        print(self.llm.count_tokens(PROMPT + html_content))
        with open("output.json", "w", encoding="utf-8") as file:
            json = JSONExtractor().extract(f"{response}")
            file.write(json)
            
        return f"{response}"
