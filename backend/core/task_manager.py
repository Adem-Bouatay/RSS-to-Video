# task_manager.py
import time
import uuid
from datetime import datetime

class TaskManager:
# Dictionary to store tasks and their statuses
    def __init__(self) -> None:
        self.tasks = {}

    # Function to update task progress
    def update_task_progress(self,task_id, progress, status, output=None):
        task = self.tasks[task_id]
        if progress is not None:
            task['progress'] = progress
        if status is not None:
            task['status'] = status
        if output is not None:
            task['output'] = output
        self.tasks[task_id] = task

    def get_task(self,task_id):
        return self.tasks.get(task_id)
    def create_task(self, url=None):
        print(url)
        task_id = str(uuid.uuid4())
        current_time = datetime.now() 
        formatted_date_time = current_time.strftime("%Y-%m-%d at %H:%M:%S")

        self.tasks[task_id] = {
            'progress': 0,
            'status': 'started',
            'creation_date': formatted_date_time,
            'url': url
        }
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
