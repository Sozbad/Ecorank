from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import firebase_admin
from firebase_admin import credentials, firestore
import openai
from datetime import datetime

from utils.find_greener_swaps import find_greener_swaps
from utils.image_and_description import fetch_image_and_description

app = FastAPI()

# Allow all CORS origins (safe for public API usage)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Firebase Admin SDK using default service account (Cloud Run-compatible)
firebase_admin.initialize_app()
db = firestore.client()

# Load OpenAI key
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.get("/")
def read_root():
    return {"message": "Welcome to EcoRank API"}

@app.get("/search")
def search_product(productName: str):
    if not productName:
        return {"error": "No product name provided"}

    product_ref = db.collection("products").document(productName.lower())
    product = product_ref.get()

    if product.exists:
        return {"status": "cached", "data": product.to_dict()}

    # If not cached, fetch from GPT and scraping
    try:
        swaps, hazard_text, disposal_text, score = find_greener_swaps(productName)
    except Exception:
        swaps, hazard_text, disposal_text, score = [], "not found", "not found", "not found"

    try:
        image_url, description = fetch_image_and_description(productName)
    except Exception:
        image_url, description = "not found", "not found"

    missing_fields = []
    if hazard_text == "not found":
        missing_fields.append("hazards")
    if disposal_text == "not found":
        missing_fields.append("disposal")
    if image_url == "not found":
        missing_fields.append("image")
    if description == "not found":
        missing_fields.append("description")

    result = {
        "name": productName,
        "hazards": hazard_text,
        "disposal": disposal_text,
        "score": score,
        "swaps": swaps,
        "image": image_url,
        "description": description,
        "source": "GPT estimate",
        "sds_url": "",
        "missingFields": missing_fields,
        "timestamp": datetime.utcnow().isoformat()
    }

    product_ref.set(result)
    return {"status": "done", "data": result}

@app.get("/test-openai")
def test_openai():
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": "Say hello"}]
        )
        return {"response": response.choices[0].message['content']}
    except Exception as e:
        return {"error": str(e)}
