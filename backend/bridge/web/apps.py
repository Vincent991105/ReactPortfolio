from django.apps import AppConfig
from django.conf import settings
import os
import subprocess
import psutil 
import logging 


class WebConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'web'
    def ready(self):
        # Only run in the main process
        if os.environ.get('RUN_MAIN', None) != 'true':
            return
        
         # **直接模仿 start_mediamtx.py 的行為自己啟動 exe**
        base_path = os.path.join(settings.BASE_DIR, 'web', 'management', 'commands')
        exe_path = os.path.join(base_path, 'mediamtx.exe')
        config_path = os.path.join(base_path, 'mediamtx.yml')


        mediamtx_logger = logging.getLogger('mediamtx')


        # Check if mediamtx.exe is already running
        for proc in psutil.process_iter(['name', 'pid']):
            if proc.info['name'] == 'mediamtx.exe':
                mediamtx_logger.warning(f'mediamtx.exe is already running with PID {proc.info["pid"]}. Skipping startup.')
                print(f'mediamtx.exe is already running. PID: {proc.info["pid"]}. Skipping startup.')
                return



        try:
            # Open a log file to collect stdout and stderr
            log_dir = os.path.join(settings.LOG_DIR)
            os.makedirs(log_dir, exist_ok=True)
            log_path = os.path.join(log_dir, 'mediamtx.log')

            log_file = open(log_path, 'ab')  # 用 binary append 模式，不會錯亂
            process = subprocess.Popen(
                [str(exe_path), str(config_path)],
                stdout=log_file,
                stderr=log_file,
                cwd=os.path.dirname(exe_path)
            )

            # Log startup success + record PID
            mediamtx_logger.info(f'mediamtx.exe started successfully with PID {process.pid}. Logging to {log_path}')
            print(f'mediamtx.exe start command issued! PID: {process.pid}, logging to: {log_path}')
        except Exception as e:
            mediamtx_logger.error(f'Failed to start mediamtx.exe: {e}')
            print(f'Failed to start mediamtx.exe: {e}')