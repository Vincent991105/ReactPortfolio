# backend/Dockerfile

FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 設定工作資料夾為 /app/bridge
WORKDIR /app

# 安裝系統依賴
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 複製 requirements 並安裝
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# 複製整個 Django 專案
COPY bridge/ ./bridge/

# 收集 static files
RUN python bridge/manage.py collectstatic --noinput

# 開放 port
EXPOSE 8000

# 啟動 gunicorn
CMD ["gunicorn", "bridge.wsgi:application", "--chdir", "bridge", "--bind", "0.0.0.0:8000"]
