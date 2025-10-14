# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.routes.analysis import router as analysis_router
from app.utils.config import settings

app = FastAPI(
    title="Crop Disease Detection API",
    description="AI-powered crop disease detection using Vision Transformer",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analysis_router, prefix="/api/v1", tags=["analysis"])

# Health check endpoint
@app.get("/")
async def root():
    return {"message": "Crop Disease Detection API", "status": "healthy"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "crop-disease-detector"}

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )