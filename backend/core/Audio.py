import json
import os
from TTS.api import TTS

class TextToSpeechProcessor:
    def __init__(self, input_json_path, output_json_path,samples_path, audio_folder='audio', lang='fr'):
        self.input_json_path = input_json_path
        self.output_json_path = output_json_path
        self.audio_folder = audio_folder
        self.samples = ["test.wav"]
        self.lang = lang
        self.tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2", gpu=False)
        

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
            print(os.listdir)

            

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

