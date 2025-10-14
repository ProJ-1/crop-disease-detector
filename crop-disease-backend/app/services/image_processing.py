# app/services/image_processing.py
from PIL import Image, ImageOps
import io
import base64
import numpy as np
import logging
from typing import Tuple

logger = logging.getLogger(__name__)

class ImageProcessor:
    @staticmethod
    def validate_image(file_content: bytes, max_size: int = 10 * 1024 * 1024) -> bool:
        """Validate image file"""
        if len(file_content) > max_size:
            raise ValueError(f"Image size exceeds maximum allowed size of {max_size} bytes")
        
        try:
            Image.open(io.BytesIO(file_content))
            return True
        except Exception as e:
            raise ValueError(f"Invalid image file: {str(e)}")
    
    @staticmethod
    def process_image(image_data: bytes, target_size: Tuple[int, int] = (224, 224)) -> Image.Image:
        """Process image for model input"""
        try:
            # Open image
            image = Image.open(io.BytesIO(image_data))
            
            # Convert to RGB if necessary
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Resize image
            image = ImageOps.fit(image, target_size, Image.Resampling.LANCZOS)
            
            return image
            
        except Exception as e:
            logger.error(f"Error processing image: {str(e)}")
            raise
    
    @staticmethod
    def base64_to_image(base64_string: str) -> Image.Image:
        """Convert base64 string to PIL Image"""
        try:
            # Remove data URL prefix if present
            if ',' in base64_string:
                base64_string = base64_string.split(',')[1]
            
            image_data = base64.b64decode(base64_string)
            return Image.open(io.BytesIO(image_data))
            
        except Exception as e:
            logger.error(f"Error converting base64 to image: {str(e)}")
            raise
    
    @staticmethod
    def image_to_base64(image: Image.Image) -> str:
        """Convert PIL Image to base64 string"""
        try:
            buffered = io.BytesIO()
            image.save(buffered, format="JPEG")
            return base64.b64encode(buffered.getvalue()).decode()
        except Exception as e:
            logger.error(f"Error converting image to base64: {str(e)}")
            raise