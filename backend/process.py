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
from core.Audio import TextToSpeechProcessor


def run(url,tm,task_id):
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
                                voice_gender="male",
                                task_id=task_id,
                                task_manager=tm
                                )
    tts.process()
    
    end_time = time.time()
    print(f"Total time: {end_time - start_time:.2f} seconds")
        # Read and return the content of output.json
    try:    
        with open('output_with_audio.json', 'r', encoding="UTF-8") as file:
            output_data = json.load(file)
    except Exception as e:
        print(f"Error reading output_with_audio.json: {e}")
        output_data = {"error": "An error occurred while processing the generated text"}
    return output_data

def edit_video(paragraph,voice):
        tts = TextToSpeechProcessor(input_json_path="output.json", 
                                    output_json_path="output_with_audio.json", 
                                    samples_path="samples", 
                                    audio_folder='audio', 
                                    lang='fr',
                                    voice_gender=voice
                                    )
        
        tts.edit_voice(paragraph) 
        with open('output_with_audio.json', 'r') as file:
            output_data = json.load(file)
        return output_data

def edit_subparaps(paragraph,voice,path):
    tts = TextToSpeechProcessor(input_json_path="output.json", 
                                    output_json_path="output_with_audio.json", 
                                    samples_path="samples", 
                                    audio_folder='audio', 
                                    lang='fr',
                                    voice_gender=voice
                                    )
    return tts.edit_subparaph(paragraph,file_path=path)
     

    
