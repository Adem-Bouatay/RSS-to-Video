import process
import uuid
from datetime import datetime
import queue
import threading

class TaskManager:
    def __init__(self) -> None:
        self.tasks = {}
        self.task_queue = queue.Queue()
        self.worker_thread = threading.Thread(target=self.task_worker)
        self.worker_thread.daemon = True
        self.worker_thread.start()

    def task_worker(self):
        while True:
            task_id, task_type, data = self.task_queue.get()
            if task_id is None:
                break 

            try:
                if task_type == 'process':
                    url = data['url']
                    self.update_task_progress(task_id, 0, 'in_progress')
                    output_data = process.run(url, self, task_id)
                    self.complete_task(task_id, output_data)
                elif task_type == 'edit_video':
                    paragraph = data['paragraph']
                    voice = data['voice']
                    self.update_task_progress(task_id, 0, 'in_progress')
                    output_data = process.edit_video(paragraph=paragraph, voice=voice)
                    self.complete_task(task_id, output_data)
                elif task_type == 'edit_subpara':
                    paragraph = data['paragraph']
                    voice = data['voice']
                    path = data['path']
                    self.update_task_progress(task_id, 0, 'in_progress')
                    output_data = process.edit_subparaps(paragraph=paragraph, voice=voice, path=path)
                    self.complete_task(task_id, output_data)
            except Exception as e:
                self.fail_task(task_id, str(e))
            finally:
                self.task_queue.task_done()

    def update_task_progress(self, task_id, progress, status, output=None):
        task = self.tasks[task_id]
        if progress is not None:
            task['progress'] = progress
        if status is not None:
            task['status'] = status
        if output is not None:
            task['output'] = output
        self.tasks[task_id] = task

    def get_task(self, task_id):
        return self.tasks.get(task_id)

    def create_task(self, url=None):
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

    def complete_task(self, task_id, output):
        if task_id in self.tasks:
            self.tasks[task_id]['progress'] = 1
            self.tasks[task_id]['status'] = 'completed'
            self.tasks[task_id]['output'] = output

    def fail_task(self, task_id, error_message):
        if task_id in self.tasks:
            self.tasks[task_id]['progress'] = 0
            self.tasks[task_id]['status'] = 'failed'
            self.tasks[task_id]['error'] = error_message

    def add_task_to_queue(self, task_id, task_type, data):
        self.task_queue.put((task_id, task_type, data))

    def stop_worker(self):
        self.task_queue.put((None, None, None))
        # Wait for the worker thread to exit
        self.worker_thread.join()  

    def get_queued_tasks(self):
        queued_tasks = []
        with self.task_queue.mutex:
            for task in self.task_queue.queue:
                task_id, task_type, _ = task
                task_info = {
                    'task_id': task_id,
                    'task_type': task_type,
                    'status': self.tasks[task_id]['status']
                }
                queued_tasks.append(task_info)
        return queued_tasks