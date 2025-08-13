import os
import threading

BACKEND_DIR = os.path.join(os.path.dirname(__file__), "backend")
FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "frontend")


class Command:
    def run_backend(self):
        os.chdir(BACKEND_DIR)
        os.system("python manage.py runserver")

    def run_frontend(self):
        os.chdir(FRONTEND_DIR)
        os.system("npm run dev")

    def start_development_server(self):
        backend_thread = threading.Thread(target=self.run_backend)
        frontend_thread = threading.Thread(target=self.run_frontend)

        backend_thread.start()
        frontend_thread.start()

        backend_thread.join()
        frontend_thread.join()


if __name__ == "__main__":
    command = Command()
    command.start_development_server()
