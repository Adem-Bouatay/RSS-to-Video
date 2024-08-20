import json
from gtts import gTTS
from pyht import Client, TTSOptions, Format
import os
import requests
import os
import time
from dotenv import load_dotenv
from TTS.api import TTS


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
                # Generate the audio file name
                audio_filename = os.path.join(self.audio_folder, f"audio_{index + 1}.wav")
                
                # Convert the paragraph to speech and save to the file
                self.tts.tts_to_file(
                    text=paragraph,
                    file_path=audio_filename,
                    peaker_wav="test.wav",
                    language="fr"
                )

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

