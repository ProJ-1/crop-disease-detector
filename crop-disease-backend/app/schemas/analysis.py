# app/schemas/analysis.py
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class DiseaseClass(str, Enum):
    CORN_COMMON_RUST = "Corn Common Rust"
    CORN_GRAY_LEAF_SPOT = "Corn Gray Leaf Spot"
    CORN_HEALTHY = "Corn Healthy"
    CORN_LEAF_BLIGHT = "Corn Leaf Blight"
    INVALID = "Invalid"
    POTATO_EARLY_BLIGHT = "Potato Early Blight"
    POTATO_HEALTHY = "Potato Healthy"
    POTATO_LATE_BLIGHT = "Potato Late Blight"
    RICE_BROWN_SPOT = "Rice Brown Spot"
    RICE_HEALTHY = "Rice Healthy"
    RICE_LEAF_BLAST = "Rice Leaf Blast"
    WHEAT_BROWN_RUST = "Wheat Brown Rust"
    WHEAT_HEALTHY = "Wheat Healthy"
    WHEAT_YELLOW_RUST = "Wheat Yellow Rust"

class AnalysisRequest(BaseModel):
    image_data: str  # base64 encoded image

class TreatmentInfo(BaseModel):
    remedies: List[str]
    fungicides: List[str]

class AnalysisResponse(BaseModel):
    disease_name: str
    confidence: float
    description: str
    remedies: List[str]
    fungicides: List[str]
    is_healthy: bool
    severity: str

class ErrorResponse(BaseModel):
    error: str
    details: Optional[str] = None