FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Debug: list contents to confirm utils/ is inside the image
RUN echo "--- /app contents ---" && ls -la /app && echo "--- /app/utils ---" && ls -la /app/utils

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
