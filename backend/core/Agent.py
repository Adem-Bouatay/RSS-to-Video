import tiktoken
from llama_index.core.callbacks import CallbackManager, TokenCountingHandler
from llama_index.llms.openai import OpenAI
from llama_index.llms.gemini import Gemini
from core.DemoOutput import DemoOutput
import time
from core.Audio import TextToSpeechProcessor

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
        self.token_counter = TokenCountingHandler(tokenizer=tiktoken.encoding_for_model("gpt-4").encode)
        self.token_counter.reset_counts()
        self.callback_manager = CallbackManager([self.token_counter])
    
        self.llm = Gemini(
        model_name="models/gemini-1.5-flash",
        api_key=api_key,
        callback_manager=self.callback_manager,
        )
    
        self.tts = TextToSpeechProcessor(input_json_path='./output.json', output_json_path="./output_audio.json")


    def extract_content(self, html_content):
        
        start = time.time()
        response = self.llm.complete(prompt=PROMPT + html_content)
        end = time.time()
        print("Time taken: ", int(end-start),"sec \n" ,"Response generated!!","\n----------------------------------------------------------\n")
        print(response, "\n----------------------------------------------------------\n")
        print(
            "Embedding Tokens: ",
            self.token_counter.total_embedding_token_count,
            "\nLLM Prompt Tokens: ",
            self.token_counter.prompt_llm_token_count,
            "\nLLM Completion Tokens: ",
            self.token_counter.completion_llm_token_count,
            "\nTotal LLM Token Count: ",
            self.token_counter.total_llm_token_count,
            "\n",
        )
        with open("output.json", "w", encoding="utf-8") as file:
            json = DemoOutput().extract(f"{response}")
            file.write(json)
        self.tts.process()  # Process audio conversion and save to output_audio.json
        return f"{response}"
