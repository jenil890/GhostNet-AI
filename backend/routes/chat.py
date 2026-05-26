from fastapi import APIRouter

router = APIRouter()

@router.get("/chat")
async def chat():
    return {
        "response": "GhostNet AI connected successfully"
    }