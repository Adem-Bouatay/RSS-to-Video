import json
import os
from TTS.api import TTS
import wave
class TextToSpeechProcessor:
    def __init__(self, input_json_path, output_json_path,samples_path, audio_folder='audio', lang='fr'):
        self.input_json_path = input_json_path
        self.output_json_path = output_json_path
        self.audio_folder = audio_folder
        self.samples = [f"{samples_path}/{i}" for i in os.listdir(samples_path)]
        self.lang = lang
        self.tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2", gpu=False)
        

    def load_data(self):
        """Load the JSON data from the input file."""
        with open(self.input_json_path, 'r',encoding='utf-8') as file:
            self.data = json.load(file)

    def create_audio_folder(self):
        """Create the audio folder if it doesn't exist."""
        os.makedirs(self.audio_folder, exist_ok=True)

    def get_audio_duration(self, file_path):
        """Get the duration of a WAV file in seconds."""
        with wave.open(file_path, 'rb') as wav_file:
            frames = wav_file.getnframes()
            rate = wav_file.getframerate()
            duration = frames / float(rate)
        return duration
    def convert_text_to_speech(self):
        """Convert text in JSON data to speech and update the data with audio paths."""
        
        for index, item in enumerate(self.data):
            total_paragraph_duration=0
            paragraph = item.get('text')
            for i, text in enumerate(paragraph):
                audio_path = os.path.join(self.audio_folder, f'audio{index+1}_{i+1}.wav')
                self.tts.tts_to_file(text=text, file_path=audio_path, speaker_wav=self.samples, language=self.lang, split_sentences=True)
                duration =self.get_audio_duration(audio_path)
                paragraph[i] = {'text': text, 'audio': audio_path,'duration':round(duration)}
                total_paragraph_duration=total_paragraph_duration+duration
            item['totalDuration'] =round(total_paragraph_duration )

                
                
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

