import os

from fastapi import APIRouter
from pydantic import BaseModel
from dotenv import load_dotenv

from groq import Groq

# Load env
load_dotenv()

# Create client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str

@router.post("/ai")
async def ai_chat(data: PromptRequest):

    try:

        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": data.prompt
                }
            ]
        )

        return {
            "response": completion.choices[0].message.content
        }

    except Exception as e:

        return {
            "error": str(e)
        }