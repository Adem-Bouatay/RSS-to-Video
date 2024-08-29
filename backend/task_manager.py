# task_manager.py
import uuid

class TaskManager:
# Dictionary to store tasks and their statuses
    def __init__(self) -> None:
        self.tasks = {}

    # Function to update task progress
    def update_task_progress(self,task_id, progress, status, output=None):
        self.tasks[task_id] = {
            'progress': progress,
            'status': status,
            'output': output
        }

    # Function to get task by ID
    def get_task(self,task_id):
        return self.tasks.get(task_id)

    # Function to create a new task
    def create_task(self):
        task_id = str(uuid.uuid4())
        self.tasks[task_id] = {'progress': 0, 'status': 'started'}
        return task_id

    # Function to complete a task
    def complete_task(self,task_id, output):
        if task_id in self.tasks:
            self.tasks[task_id]['progress'] = 1
            self.tasks[task_id]['status'] = 'completed'
            self.tasks[task_id]['output'] = output

    # Function to fail a task
    def fail_task(self,task_id, error_message):
        if task_id in self.tasks:
            self.tasks[task_id]['progress'] = 0
            self.tasks[task_id]['status'] = 'failed'
            self.tasks[task_id]['error'] = error_message
