from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import Routes
from routes.scanner import router as scanner_router

# Create FastAPI App
app = FastAPI(
    title="GhostNet AI Backend",
    description="Cybersecurity Threat Intelligence API",
    version="1.0.0"
)

# =========================
# CORS CONFIGURATION
# =========================

app.add_middleware(
    CORSMiddleware,

    # Allow frontend domains
    allow_origins=["*"],

    # Allow cookies/auth
    allow_credentials=True,

    # Allow all methods
    allow_methods=["*"],

    # Allow all headers
    allow_headers=["*"],
)

# =========================
# ROUTES
# =========================

# URL Scanner Routes
app.include_router(scanner_router)

# =========================
# ROOT ROUTE
# =========================

@app.get("/")
async def root():

    return {
        "status": "online",
        "message": "GhostNet Backend Running",
        "service": "GhostNet AI Cybersecurity API"
    }

# =========================
# HEALTH CHECK
# =========================

@app.get("/health")
async def health_check():

    return {
        "status": "healthy"
    }