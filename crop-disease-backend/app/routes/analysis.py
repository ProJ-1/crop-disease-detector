# app/routes/analysis.py
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import logging
from PIL import Image

from app.schemas.analysis import AnalysisResponse, ErrorResponse
from app.models.disease_classifier import classifier
from app.services.image_processing import ImageProcessor

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_crop_disease(
    file: UploadFile = File(...)
):
    """
    Analyze crop image for disease detection using the actual model
    """
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read file content
        contents = await file.read()
        
        # Validate image size
        if len(contents) > 10 * 1024 * 1024:  # 10MB
            raise HTTPException(status_code=400, detail="Image size too large. Maximum 10MB allowed.")
        
        # Process image
        processed_image = ImageProcessor.process_image(contents)
        
        # Make prediction using the actual model
        disease_name, confidence, class_idx = classifier.predict(processed_image)
        
        # Filter out low confidence predictions for "Invalid" class
        if disease_name == "Invalid" and confidence > 70:
            # Try to find the next best prediction
            disease_name = "Unknown Disease"
            confidence = confidence * 0.7  # Reduce confidence for uncertain predictions
        
        # Get additional information
        description = classifier.get_disease_description(disease_name)
        severity = classifier.get_severity(confidence, disease_name)
        treatments = classifier.get_treatment_recommendations(disease_name)
        
        # Prepare response
        response = AnalysisResponse(
            disease_name=disease_name,
            confidence=round(confidence, 2),
            description=description,
            remedies=treatments["remedies"],
            fungicides=treatments["fungicides"],
            is_healthy="Healthy" in disease_name,
            severity=severity
        )
        
        logger.info(f"Analysis completed: {disease_name} ({confidence:.2f}%) - Severity: {severity}")
        
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.get("/diseases")
async def get_supported_diseases():
    """Get list of supported diseases from the model"""
    return {
        "diseases": classifier.class_names,
        "count": len(classifier.class_names),
        "crops": ["Corn", "Potato", "Rice", "Wheat"],
        "model_loaded": classifier.is_loaded
    }

@router.get("/health")
async def model_health():
    """Check model health and information"""
    try:
        return {
            "status": "healthy",
            "model_loaded": classifier.is_loaded,
            "device": str(classifier.device),
            "supported_diseases": len(classifier.class_names),
            "disease_classes": classifier.class_names
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Health check failed: {str(e)}")

@router.get("/crops")
async def get_supported_crops():
    """Get list of supported crops"""
    crops = {
        "Corn": ["Common Rust", "Gray Leaf Spot", "Leaf Blight", "Healthy"],
        "Potato": ["Early Blight", "Late Blight", "Healthy"], 
        "Rice": ["Brown Spot", "Leaf Blast", "Healthy"],
        "Wheat": ["Brown Rust", "Yellow Rust", "Healthy"]
    }
    return crops