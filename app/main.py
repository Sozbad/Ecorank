from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials, firestore
import openai
import os
import uuid
from utils.image_and_description import fetch_image_and_description
from gpt_agent_search import find_greener_swaps

# Set OpenAI key
openai.api_key = os.environ.get("OPENAI_API_KEY")

# Init Firebase
if not firebase_admin._apps:
    cred = credentials.ApplicationDefault()
    firebase_admin.initialize_app(cred)
db = firestore.client()

# Init FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/search")
async def search_product(request: Request):
    product_name = request.query_params.get("productName")
    if not product_name:
        return {"error": "Missing productName"}

    # Check Firestore
    product_ref = db.collection("products").document(product_name)
    product_doc = product_ref.get()
    if product_doc.exists:
        return {"status": "exists", **product_doc.to_dict()}

    # GPT logic
    try:
        swaps, sds_data = await find_greener_swaps(product_name)
    except Exception as e:
        swaps, sds_data = [], {"hazards": [], "disposal": "not found", "score": "not found"}

    # Enrich with image + description
    image, description = fetch_image_and_description(product_name)

    # Build record
    data = {
        "name": product_name,
        "hazards": sds_data.get("hazards", ["not found"]),
        "disposal": sds_data.get("disposal", "not found"),
        "score": sds_data.get("score", "not found"),
        "swaps": swaps,
        "image": image or "not found",
        "description": description or "not found",
        "source": "GPT estimate",
        "sds_url": "",
        "lastUpdated": firestore.SERVER_TIMESTAMP,
        "missingFields": [
            key for key in ["hazards", "disposal", "description", "image"]
            if not sds_data.get(key) and not locals().get(key)
        ],
    }

    # Save to Firestore
    product_ref.set(data)
    return {"status": "done", **data}

@app.get("/test-openai")
def test_openai():
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": "Say hello"}]
        )
        return {"result": response.choices[0].message["content"]}
    except Exception as e:
        return {"error": str(e)}
