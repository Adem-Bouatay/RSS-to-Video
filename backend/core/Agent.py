import google.generativeai as genai
from core.Extractor import JSONExtractor
import time

PROMPT = """
            "As an expert in analyzing articles for speech synthesis, your task is to extract and structure the text of the article. REMOVE ALL  the HTML BALISES like href or <a> or anything start with < , i want it to be only Text to read like News and make sure each picture is related to the context of its paraphraph"
            "Please split the text into paragraphs and identify the picture from the site that is most related to each paragraph. "
            "Make sure each paragraph is readable and understandable when its read as a speech in news "
            "the paraphraphs gonna be read like an article in news with voice so make sure it doesnt involve something like 'for more information click on link' etc " 
            "The response should be formatted as follows:"
            "if a paraphraph has More than 34 word including white spaces then split it into  EQUAL sub paragraphs"
            "SUb paraphraphs Must be equal in size"
            "The sub paragraphs must not be longer than 34 word including white spaces"
            "image should be an object for the paraphraph not sub paragraph"
            "when the image Url path is static then change it to absolute"
            "text should be an array of strings"
                ```json
                     [
                        {
                            "text": [
                                "Le lin est un tissu de choix pour les journées chaudes, car il permet à la peau de respirer et offre de nombreuses options de vêtements. Que vous optiez pour une chemise, un short assorti, une robe longue ou courte, une jupe mini ou midi, ou une combinaison, le lin reste un excellent choix pour affronter la chaleur tout en restant stylé.",
                                "En période de fortes chaleurs, la robe courte en lin à fines bretelles et à coupe trapèze est idéale pour le bureau. Sa coupe évasée convient à toutes les morphologies et permet à l'air de circuler, offrant ainsi un confort maximal même lors des journées les plus chaudes."
                            ],
                            "image": "https://cache.cosmopolitan.fr/data/photo/w680_ci/6v/robe-quand-il-fait-chaud-1.jpg"
                        },
                        {
                            "text": [
                                "Pour éviter de perdre un degré de style en période de chaleur intense, il est important de limiter l'accumulation de vêtements et d'accessoires. Optez pour des pièces qui se suffisent à elles-mêmes, comme une petite robe trapèze, qui est à l'aise en journée comme en soirée, ou un pantalon large confortable et une jupe portefeuille flatteuse pour la silhouette.",
                                "Vivre une canicule pendant les vacances est une chose, mais le faire tout en travaillant est une autre. Pour celles qui doivent jongler entre bureau et chaleur extrême, le choix des vêtements devient crucial. Une robe courte en lin de la nouvelle collection pourrait bien être la solution idéale pour rester chic et bien habillée même par 30+ degrés."
                            ],
                            "image": "https://cache.cosmopolitan.fr/data/photo/w1000_ci/6v/robe-quand-il-fait-chaud-travail.jpg"
                        },
                        {
                            "text": [
                                "Quand le thermomètre affiche des températures élevées, le lin se révèle être un allié mode de choix. Avec sa capacité à laisser respirer la peau, il permet de créer divers looks adaptés à la chaleur, qu'il s'agisse de chemises, de shorts, de robes, de jupes ou de combinaisons. La clé pour un style réussi pendant une canicule est de choisir des vêtements légers et aérés qui permettent de rester à l'aise tout au long de la journée.",
                                "Pour toutes celles qui doivent concilier bureau et chaleur extrême, il est important de rester chic tout en étant confortable. Optez pour des vêtements qui offrent une bonne circulation de l'air et évitez les couches superflues. Une robe courte en lin, par exemple, combine élégance et confort, parfaite pour affronter les températures élevées au travail ou en dehors."
                            ],
                            "image": "https://cache.cosmopolitan.fr/data/photo/w500_h250_ci/6w/robe-quand-il-fait-chaud.webp"
                        }
                    ]
                ```
                example 2:
                ```json
                     [
                        {
                            "text": [
                                "La clé pour une alimentation saine est d'incorporer une variété d'aliments riches en nutriments. Les légumes frais, les fruits de saison, les grains entiers et les protéines maigres sont des éléments essentiels à inclure dans vos repas quotidiens. De plus, boire suffisamment d'eau et limiter la consommation de sucre et de graisses saturées peut grandement contribuer à votre bien-être général.",
                                "Pour une alimentation équilibrée, essayez de préparer vos repas à l'avance et d'inclure des portions appropriées de chaque groupe alimentaire. Utilisez des méthodes de cuisson saines comme la vapeur, la grillade ou la cuisson au four pour préserver les nutriments et réduire l'ajout de graisses inutiles."
                            ],
                            "image": "https://example.com/images/healthy-eating.jpg"
                        },
                        {
                            "text": [
                                "En suivant un régime équilibré, vous pouvez non seulement améliorer votre santé physique, mais aussi votre bien-être mental. L'alimentation joue un rôle crucial dans la gestion de l'humeur et l'énergie au quotidien. Les vitamines, minéraux et antioxydants présents dans une alimentation variée peuvent aider à réduire le stress et augmenter la concentration.",
                                "Un bon point de départ est de planifier vos repas et collations pour éviter les choix alimentaires impulsifs. Optez pour des aliments frais et minimisez les produits transformés qui contiennent souvent des quantités élevées de sucre, de sel et de conservateurs."
                            ],
                            "image": "https://example.com/images/meal-prep.jpg"
                        },
                        {
                            "text": [
                                "Pour maintenir une alimentation saine, il est important de se fixer des objectifs réalistes et de faire preuve de flexibilité. Introduisez progressivement des changements dans votre alimentation pour que ceux-ci deviennent des habitudes durables. De plus, il est crucial de faire attention aux signaux de faim et de satiété de votre corps, afin de manger en pleine conscience.",
                                "N'oubliez pas que la santé alimentaire est un équilibre entre plaisir et nutrition. Profitez de vos repas et apprenez à savourer des aliments sains tout en vous accordant des petits plaisirs de temps en temps."
                            ],
                            "image": "https://example.com/images/mindful-eating.jpg"
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
        self.llm = genai.GenerativeModel('gemini-1.5-pro')


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
