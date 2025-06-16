FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy the actual source files (which are inside /backend/api)
COPY backend/api .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
