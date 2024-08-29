from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import process  
import os
import time
import core.Audio as Audio
app = Flask(__name__)
CORS(app)
import task_manager as tm  # Importing task_manager module
import threading
# Serve audio files from the "audio" directory

@app.route('/process', methods=['POST'])
def process_url():
    data = request.get_json()
    
    if not data or 'url' not in data:
        return jsonify({"error": "No URL provided"}), 400
    
    url = data['url']
    task_id = tm.create_task()  # Create a new task

    def run_task():
        try:
            tm.update_task_progress(task_id, 10, 'in_progress')  # Example initial progress update
            output_data = process.run(url)
            tm.complete_task(task_id, output_data)  # Mark task as completed
        except Exception as e:
            tm.fail_task(task_id, str(e))  # Mark task as failed

    # Run the task in a separate thread
    threading.Thread(target=run_task).start()
    
    return jsonify({"task_id": task_id, "status": "started"})
@app.route('/tasks/<task_id>/progress', methods=['GET'])
def get_task_progress(task_id):
    task = tm.get_task(task_id)
    if task:
        return jsonify(task)
    else:
        return jsonify({"error": "Task not found"}), 404

@app.route('/tasks/<task_id>/result', methods=['GET'])
def get_task_result(task_id):
    task = tm.get_task(task_id)
    if task:
        if task['status'] == 'completed':
            return jsonify({"task_id": task_id, "output": task['output']})
        else:
            return jsonify({"error": "Task not completed yet"}), 202
    else:
        return jsonify({"error": "Task not found"}), 404
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