# check_model.py
import torch
from transformers import ViTForImageClassification, ViTImageProcessor
import json
import os

def check_model_classes():
    model_path = "app/models/weights/crop_leaf_diseases_vit"
    
    if os.path.exists(model_path):
        print("Loading model from:", model_path)
        
        # Check if config exists
        config_path = os.path.join(model_path, "config.json")
        if os.path.exists(config_path):
            with open(config_path, 'r') as f:
                config = json.load(f)
                print("Model configuration:")
                print(f"Number of classes: {config.get('num_labels', 'Not found')}")
                print(f"ID to label: {config.get('id2label', 'Not found')}")
                print(f"Label to ID: {config.get('label2id', 'Not found')}")
        
        # Try to load processor to see labels
        try:
            processor = ViTImageProcessor.from_pretrained(model_path)
            print("\nProcessor loaded successfully")
        except Exception as e:
            print(f"Error loading processor: {e}")
            
        # Try to load model
        try:
            model = ViTForImageClassification.from_pretrained(model_path)
            print(f"Model loaded successfully")
            print(f"Number of classes in model: {model.config.num_labels}")
            if hasattr(model.config, 'id2label'):
                print("Actual classes in model:")
                for i in range(model.config.num_labels):
                    print(f"  {i}: {model.config.id2label.get(i, 'Unknown')}")
        except Exception as e:
            print(f"Error loading model: {e}")
            
    else:
        print(f"Model path {model_path} does not exist")

if __name__ == "__main__":
    check_model_classes()