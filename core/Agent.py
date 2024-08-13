from llama_index.llms.gemini import Gemini
import time

PROMPT = """
            "As an expert in analyzing articles for speech synthesis, your task is to extract and structure the text of the article. REMOVE ALL  the HTML BALISES like href or <a> or anything start with < , i want it to be only Text to read like News and make sure each picture is related to the context of its paraphraph"
            "Please split the text into paragraphs and identify the picture from the site that is most related to each paragraph. "
            "Make sure each paragraph is readable and understandable when its read as a speech in news "
            "The response should be formatted as follows:"
                ```json
                [
                    {
                        text: "Paragraph 1 text",
                        image: "https://www.example.com/image1.jpg"
                    },
                    {
                        text: "Paragraph 2 text",
                        image: "https://www.example.com/image2.jpg"
                    },
                    ...
                ]
                ```
            "
            "Keep the text in its original French language."
            f"HTML Content:\n{html_content}"
        """


class Agent:
    def __init__(self, api_key):
        self.llm = Gemini(
            model_name="models/gemini-1.5-flash",
            api_key=api_key,
        )

    def extract_content(self, html_content):
        start = time.time()
        response = self.llm.complete(prompt=PROMPT + html_content)
        end = time.time()
        print("Time taken: ", int(end-start),"sec \n" ,"Response generated!!","\n----------------------------------------------------------\n")
        print(response)
        with open("output.txt", "w", encoding="utf-8") as file:
            file.write(str(response))
        return f"{response}"
