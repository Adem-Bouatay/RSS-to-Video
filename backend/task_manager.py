# task_manager.py
import uuid

# Dictionary to store tasks and their statuses
tasks = {}

# Function to update task progress
def update_task_progress(task_id, progress, status, output=None):
    tasks[task_id] = {
        'progress': progress,
        'status': status,
        'output': output
    }

# Function to get task by ID
def get_task(task_id):
    return tasks.get(task_id)

# Function to create a new task
def create_task():
    task_id = str(uuid.uuid4())
    tasks[task_id] = {'progress': 0, 'status': 'started'}
    return task_id

# Function to complete a task
def complete_task(task_id, output):
    if task_id in tasks:
        tasks[task_id]['progress'] = 100
        tasks[task_id]['status'] = 'completed'
        tasks[task_id]['output'] = output

# Function to fail a task
def fail_task(task_id, error_message):
    if task_id in tasks:
        tasks[task_id]['progress'] = 0
        tasks[task_id]['status'] = 'failed'
        tasks[task_id]['error'] = error_message
