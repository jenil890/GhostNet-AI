from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# AI Route
from routes.ai import router as ai_router

# URL Scanner Route
from routes.scanner import router as scanner_router

# FastAPI App
app = FastAPI(
    title="GhostNet API",
    description="Predictive Cyber Threat Intelligence Platform",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(ai_router)

app.include_router(scanner_router)

# Root Route
@app.get("/")
async def root():

    return {
        "message": "GhostNet API Running",
        "status": "online"
    }

# Health Check
@app.get("/health")
async def health():

    return {
        "status": "healthy"
    }