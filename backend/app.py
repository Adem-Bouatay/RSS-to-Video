from core.Extractor import HTMLExtractor
from core.Agent import Agent
from core.DemoOutput import DemoOutput
from core.Audio import TextToSpeechProcessor
from dotenv import load_dotenv
import os
import time

load_dotenv()
api_key = os.getenv("API_KEY")


def main():

    tts = TextToSpeechProcessor(input_json_path="output.json", output_json_path="output.json")
    tts.process()
 


if __name__ == "__main__":
    main()
