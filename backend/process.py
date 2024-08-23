from core.Extractor import HTMLExtractor
from core.Agent import Agent
from core.DemoOutput import DemoOutput
from core.Audio import TextToSpeechProcessor
from dotenv import load_dotenv
import os
import time
import json
load_dotenv()
api_key = os.getenv("API_KEY")


def run(url):
    
    start_time = time.time()
    
    html_extractor = HTMLExtractor()
    print("-----------------------------EXTRACTING-HTML-----------------------------")
    html_content = html_extractor.get_html(url)
    print("---------------------------END-EXTRACTING-HTML---------------------------")
    agent = Agent(api_key=api_key)
    agent_res = agent.extract_content(html_content=html_content)
    DemoOutput().generate_html_page(content=agent_res)
    tts = TextToSpeechProcessor(input_json_path="output.json", 
                                output_json_path="output_with_audio.json", 
                                samples_path="samples", 
                                audio_folder='audio', 
                                lang='fr',
                                voice_gender="male"
                                )
    tts.process()
    end_time = time.time()
    print(f"Total time: {end_time - start_time:.2f} seconds")
        # Read and return the content of output.json
    with open('output_with_audio.json', 'r') as file:
        output_data = json.load(file)
    
    return output_data


