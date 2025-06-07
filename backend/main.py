import openai
import os

openai.api_key = os.environ.get("OPENAI_API_KEY")

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
