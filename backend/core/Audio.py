import json
import os
from TTS.api import TTS
import wave
from urllib.parse import urlparse
class TextToSpeechProcessor:
    def __init__(self, input_json_path, output_json_path,samples_path, audio_folder='audio', lang='fr',voice_gender="male",base_url='http://127.0.0.1:5000/'):
        self.input_json_path = input_json_path
        self.output_json_path = output_json_path
        self.audio_folder = audio_folder
        self.voice_gender=voice_gender
        self.samples = [os.path.join(samples_path, f"{self.voice_gender}.wav")]
        self.lang = lang
        self.tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2", gpu=False)
        self.base_url = base_url.rstrip('/') 


        

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
        return round(duration)
    def convert_text_to_speech(self):
        array = self.data.get('article')
        article_duration = 0
        for index, item in enumerate(array):
            total_paragraph_duration = 0
            paragraph = item.get('text')
            for i, text in enumerate(paragraph):
                audio_filename = f'audio{index+1}_{i+1}.wav'
                audio_file_path = os.path.join(self.audio_folder, audio_filename)
                self.tts.tts_to_file(text=text, file_path=audio_file_path, speaker_wav=self.samples, language=self.lang, split_sentences=True)
                
                # Construct the accessible URL for the audio file
                audio_url = f"{self.base_url}/audio/{audio_filename}"
                
                duration = self.get_audio_duration(audio_file_path)
                paragraph[i] = {'text': text, 'audio': audio_url, 'duration': duration}
                total_paragraph_duration += duration
            item['totalDuration'] = total_paragraph_duration
            article_duration += total_paragraph_duration
        self.data['articleDuration'] = article_duration

                
                
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
    def update_content(self, paragraph):
        try:
            data=self.data.get("article")
            # Ensure self.data is a list of dictionaries
            if not isinstance(data, list):
                raise ValueError("self.data must be a list of dictionaries")

            # Iterate over self.data and paragraph['article'] to update text and images
            for i, item in enumerate(data):
                if i < len(paragraph['article']):
                    article_item = paragraph['article'][i]
                    
                    # Ensure both item and article_item have 'text' as a list
                    if 'text' in item and 'text' in article_item:
                        if isinstance(item['text'], list) and isinstance(article_item['text'], list):
                            item['text'] = article_item['text']
                        else:
                            raise TypeError("The 'text' field must be a list")

            self.data['article']= data
            self.data['title'] = paragraph['title']    

        except Exception as e:
            print(f"Error updating content: {str(e)}")
        try:

            with open(self.input_json_path, 'w',encoding="utf-8") as file:
                json.dump(self.data, file, indent=4)

            print("File updated successfully.")

        except Exception as e:
            print(f"Error updating JSON file: {str(e)}")


 

    def edit_voice(self, paragraph=None):
            """Edit the voice type and/or update the paragraph text."""
            self.load_data()
            if paragraph is not None:
                self.update_content(paragraph=paragraph)
            # Reprocess with updated voice and paragraph
            self.create_audio_folder()
            self.convert_text_to_speech()
            self.save_data()
            print(f"Audio files have been updated with voice type '{self.voice_gender}' and new text content, if provided.")
    def edit_subparaph(self, paragraph=None,file_path=None):
        file_path=urlparse(file_path).path.split('/')[-1]
        print(file_path)
        file_path=file_path.replace('.wav', '_edit.wav')
        audio_file_path = os.path.join(self.audio_folder, file_path)
        self.tts.tts_to_file(text=paragraph, file_path=audio_file_path, speaker_wav=self.samples, language=self.lang, split_sentences=True)
        response = {}
        response['duration'] = self.get_audio_duration(audio_file_path)
        response['path'] = f"{self.base_url}/{audio_file_path}" 
        print(response)
        return response



        