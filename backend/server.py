from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import process  
import os
import time
import core.Audio as Audio
app = Flask(__name__)
CORS(app)

# Serve audio files from the "audio" directory

@app.route('/process', methods=['POST'])
def process_url():
    data = request.get_json()
    
    if not data or 'url' not in data:
        return jsonify({"error": "No URL provided"}), 400
    url = data['url']
    try:
        output_data = process.run(url)
        return jsonify(output_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route('/edit', methods=['POST'])
def edit_video():
    data = request.get_json()
    
    if  data and 'paragraph' in data:
        paragraph = data['paragraph']
    if  data and 'voice' in data:
        voice = data['voice']
    try:
        ouput=process.edit_video(paragraph=paragraph, voice=voice)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return ouput

@app.route('/editSub', methods=['POST'])
def edit_Subpara():
    data = request.get_json()
    
    if  data and 'paragraph' in data:
        paragraph = data['paragraph']
    if  data and 'voice' in data:
        voice = data['voice']
    if  data and 'path' in data:
        path = data['path']
    try:
        ouput=process.edit_subparaps(paragraph=paragraph, voice=voice,path=path)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    return ouput
    
@app.route('/audio/<path:filename>', methods=['GET'])
def serve_audio(filename):
    audio_folder = 'audio'
    return send_from_directory(audio_folder, filename)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
