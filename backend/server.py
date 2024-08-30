from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import core.Audio as Audio
from core.task_manager import TaskManager 

app = Flask(__name__)
CORS(app)

# Create a new TaskManager instance
tm = TaskManager()  

@app.route('/process', methods=['POST'])
def process_url():
    data = request.get_json()
    
    if not data or 'url' not in data:
        return jsonify({"error": "No URL provided"}), 400
    
    url = data['url']
    task_id = tm.create_task(url)
    tm.add_task_to_queue(task_id, 'process', {'url': url})
    
    return jsonify({"task_id": task_id, "status": "started"})

@app.route('/tasks/<task_id>/progress', methods=['GET'])
def get_task_progress(task_id):
    task = tm.get_task(task_id)
    if task:
        return jsonify(task)
    else:
        return jsonify({"error": "Task not found"}), 404

@app.route('/tasks/queue', methods=['GET'])
def get_queued_tasks():
    queued_tasks = tm.get_queued_tasks()
    return jsonify(queued_tasks)

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
    
    if not data or 'paragraph' not in data or 'voice' not in data:
        return jsonify({"error": "Missing 'paragraph' or 'voice'"}), 400

    paragraph = data['paragraph']
    voice = data['voice']
    task_id = tm.create_task("edit_video")
    tm.add_task_to_queue(task_id, 'edit_video', {'paragraph': paragraph, 'voice': voice})
    
    return jsonify({"task_id": task_id, "status": "started"})


@app.route('/editSub', methods=['POST'])
def edit_subpara():
    data = request.get_json()
    
    if not data or 'paragraph' not in data or 'voice' not in data or 'path' not in data:
        return jsonify({"error": "Missing 'paragraph', 'voice', or 'path'"}), 400

    paragraph = data['paragraph']
    voice = data['voice']
    path = data['path']
    task_id = tm.create_task("edit_subpara")
    tm.add_task_to_queue(task_id, 'edit_subpara', {'paragraph': paragraph, 'voice': voice, 'path': path})
    
    return jsonify({"task_id": task_id, "status": "started"})


@app.route('/audio/<path:filename>', methods=['GET'])
def serve_audio(filename):
    audio_folder = 'audio'
    return send_from_directory(audio_folder, filename)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
