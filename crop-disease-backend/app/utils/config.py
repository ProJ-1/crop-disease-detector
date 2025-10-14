# app/utils/config.py
from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # API Settings
    APP_NAME: str = "Crop Disease Detection API"
    VERSION: str = "1.0.0"
    DEBUG: bool = True
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]
    
    # Model Settings
    MODEL_PATH: str = "app/models/weights/crop_leaf_diseases_vit"
    MODEL_NAME: str = "google/vit-base-patch16-224"
    IMAGE_SIZE: int = 224
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    
    # Exact Disease Classes from your model (with underscores)
    DISEASE_CLASSES: List[str] = [
        "Corn___Common_Rust",
        "Corn___Gray_Leaf_Spot", 
        "Corn___Healthy",
        "Invalid",
        "Potato___Early_Blight",
        "Potato___Healthy",
        "Potato___Late_Blight",
        "Rice___Brown_Spot",
        "Rice___Healthy", 
        "Rice___Leaf_Blast",
        "Wheat___Brown_Rust",
        "Wheat___Healthy",
        "Wheat___Yellow_Rust"
    ]
    
    # Treatment Recommendations - updated to match exact class names
    TREATMENTS: dict = {
        "Corn___Common_Rust": {
            "remedies": [
                "Plant resistant hybrid varieties",
                "Apply fungicides at first sign of disease",
                "Practice crop rotation with non-cereal crops",
                "Remove and destroy crop debris after harvest"
            ],
            "fungicides": [
                "Triazole fungicides - Apply when disease first appears",
                "Strobilurin fungicides - Protective treatment",
                "Propiconazole - Effective against rust diseases"
            ]
        },
        "Corn___Gray_Leaf_Spot": {
            "remedies": [
                "Use resistant hybrid varieties",
                "Practice crop rotation for at least one year",
                "Plow under crop residue to reduce inoculum",
                "Avoid continuous corn planting"
            ],
            "fungicides": [
                "Azoxystrobin - Apply at disease onset",
                "Pyraclostrobin - Protective and curative action",
                "Trifloxystrobin - Systemic fungicide"
            ]
        },
        "Corn___Healthy": {
            "remedies": [
                "Continue current management practices",
                "Monitor regularly for early disease detection",
                "Maintain proper nutrition and irrigation",
                "Practice crop rotation for prevention"
            ],
            "fungicides": [
                "No fungicide needed at this time",
                "Continue preventive monitoring",
                "Consider protective fungicides only if disease pressure is high in your area"
            ]
        },
        "Invalid": {
            "remedies": [
                "Unable to identify disease from image",
                "Try taking a clearer photo of affected leaves",
                "Consult local agricultural expert",
                "Check for multiple disease symptoms"
            ],
            "fungicides": [
                "Consult with agricultural extension service",
                "Get proper diagnosis before treatment",
                "Consider sending sample to plant pathology lab"
            ]
        },
        "Potato___Early_Blight": {
            "remedies": [
                "Remove infected leaves promptly",
                "Avoid overhead irrigation",
                "Rotate crops with non-solanaceous plants for 3-4 years",
                "Ensure proper plant spacing for air circulation"
            ],
            "fungicides": [
                "Chlorothalonil - Apply every 7-10 days during humid weather",
                "Mancozeb - Protective treatment, apply before symptoms appear",
                "Copper-based fungicides - Organic alternative"
            ]
        },
        "Potato___Healthy": {
            "remedies": [
                "Maintain good growing conditions",
                "Continue regular monitoring",
                "Practice crop rotation",
                "Ensure proper soil drainage"
            ],
            "fungicides": [
                "No treatment required",
                "Focus on preventive measures",
                "Monitor weather conditions for disease development"
            ]
        },
        "Potato___Late_Blight": {
            "remedies": [
                "Remove and destroy infected plants immediately",
                "Use certified disease-free seed potatoes",
                "Avoid overhead irrigation",
                "Hill soil around plants to protect tubers"
            ],
            "fungicides": [
                "Metalaxyl - Systemic fungicide for early protection",
                "Chlorothalonil - Protectant fungicide",
                "Copper compounds - For organic production"
            ]
        },
        "Rice___Brown_Spot": {
            "remedies": [
                "Use resistant varieties",
                "Apply balanced fertilization, avoid excess nitrogen",
                "Ensure proper water management",
                "Treat seeds with fungicides before planting"
            ],
            "fungicides": [
                "Edifenphos - Apply at tillering and booting stages",
                "Tricyclazole - Systemic fungicide",
                "Carbendazim - Broad-spectrum treatment"
            ]
        },
        "Rice___Healthy": {
            "remedies": [
                "Continue current water management",
                "Maintain balanced fertilization",
                "Monitor for pests and diseases",
                "Practice field sanitation"
            ],
            "fungicides": [
                "No fungicide application needed",
                "Continue preventive practices",
                "Be prepared for potential disease outbreaks"
            ]
        },
        "Rice___Leaf_Blast": {
            "remedies": [
                "Plant blast-resistant varieties",
                "Avoid excessive nitrogen fertilization",
                "Maintain proper water depth",
                "Remove and destroy infected plant debris"
            ],
            "fungicides": [
                "Tricyclazole - Apply at first symptom appearance",
                "Isoprothiolane - Systemic fungicide",
                "Pyroquilon - Effective blast control"
            ]
        },
        "Wheat___Brown_Rust": {
            "remedies": [
                "Plant resistant varieties",
                "Apply early fungicide protection",
                "Avoid excessive nitrogen application",
                "Practice crop rotation"
            ],
            "fungicides": [
                "Triazole fungicides - Apply at first detection",
                "Strobilurin fungicides - Protective action",
                "Propiconazole - Specific for rust control"
            ]
        },
        "Wheat___Healthy": {
            "remedies": [
                "Continue good agronomic practices",
                "Monitor crop regularly",
                "Maintain proper plant density",
                "Practice field rotation"
            ],
            "fungicides": [
                "No chemical treatment required",
                "Focus on cultural prevention methods",
                "Be vigilant during favorable disease conditions"
            ]
        },
        "Wheat___Yellow_Rust": {
            "remedies": [
                "Use resistant wheat varieties",
                "Apply fungicides at early growth stages",
                "Monitor fields regularly during cool, moist weather",
                "Destroy volunteer wheat plants"
            ],
            "fungicides": [
                "Tebuconazole - Apply at flag leaf emergence",
                "Epoxiconazole - Systemic fungicide",
                "Azoxystrobin - Broad-spectrum protection"
            ]
        }
    }

    class Config:
        env_file = ".env"

settings = Settings()