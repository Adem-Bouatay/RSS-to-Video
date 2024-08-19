import json
from gtts import gTTS
from pyht import Client, TTSOptions, Format
import os
import requests
import os
import time
from dotenv import load_dotenv


load_dotenv()
HT_ID = os.getenv("HT_ID")
HT_API_KEY=os.getenv("HT_API_KEY")
class TextToSpeechProcessor:
    def __init__(self, input_json_path, output_json_path, audio_folder='audio', lang='fr'):
        self.input_json_path = input_json_path
        self.output_json_path = output_json_path
        self.audio_folder = audio_folder
        self.lang = lang
        self.apiUrl="https://api.play.ht/api/v2/tts/stream"
        

    def load_data(self):
        """Load the JSON data from the input file."""
        with open(self.input_json_path, 'r',encoding='utf-8') as file:
            self.data = json.load(file)

    def create_audio_folder(self):
        """Create the audio folder if it doesn't exist."""
        os.makedirs(self.audio_folder, exist_ok=True)

    def convert_text_to_speech(self):
        """Convert text in JSON data to speech and update the data with audio paths."""
        for index, item in enumerate(self.data):
            paragraph = item.get('text')
            image_url = item.get('image')

            if paragraph:
                # Convert the paragraph to speech // Gonna change it to a tts model 
                """ tts = gTTS(paragraph, lang=self.lang) """
                audio_filename = os.path.join(self.audio_folder, f"audio_{index + 1}.mpeg")
                payload = {
                "text": paragraph,
                "voice": "s3://voice-cloning-zero-shot/1d26f4fe-1d08-4cfe-a7c1-d28e4e913ff9/original/manifest.json",
                "output_format": "mp3",
                "speed":"1",
                "voice_engine": "PlayHT2.0",
                "emotion": "female_happy"

            }
                headers = {
                    "accept": "audio/mpeg", #application/json if i want to get the url
                    "content-type": "application/json",
                    "AUTHORIZATION":HT_API_KEY,
                    "X-USER-ID":HT_ID
                }
                response = requests.post(self.apiUrl, json=payload, headers=headers)
                #in case i want to save the url
                """     res = response.json()
                audio_url = res.get('href')
                rel = res.get('rel')
                print(rel) """
                with open(audio_filename, 'wb') as f:
                        f.write(response.content)
 
                # Add the audio file path to the item
            item['audio'] = audio_filename
            
            print(f"Saved audio file: {audio_filename}")
            

    def save_data(self):
        """Save the updated JSON data to the output file."""
        with open(self.output_json_path, 'w',encoding='utf-8') as file:
            json.dump(self.data, file, indent=4,ensure_ascii=False)

    def process(self):
        """Load data, process text to speech, and save updated data."""
        self.load_data()
        self.create_audio_folder()
        self.convert_text_to_speech()
        self.save_data()
        print(f"All audio files have been created and the updated data has been saved to '{self.output_json_path}'.")

