// src/components/ImageUploader.tsx
import React, { useCallback, useState } from 'react';
import { useAnalysis } from '../contexts/AnalysisContext';
import { Button } from './ui/button';
import { Upload, Scan, X, AlertCircle } from 'lucide-react';
import ScanAnimation from './ScanAnimation';

const ImageUploader: React.FC = () => {
  const { 
    uploadedImage, 
    setUploadedImage, 
    isAnalyzing, 
    analyzeCrop,
    error,
    clearError
  } = useAnalysis();

  const [localError, setLocalError] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    clearError();
    setLocalError(null);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelection(file);
    }
  }, [clearError]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    setLocalError(null);
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleFileSelection = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setLocalError('File size too large. Please select an image under 10MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setLocalError('Please select a valid image file (JPEG, PNG, etc.).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.onerror = () => {
      setLocalError('Failed to read the image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;
    
    try {
      const response = await fetch(uploadedImage);
      const blob = await response.blob();
      const file = new File([blob], 'crop-image.jpg', { type: 'image/jpeg' });
      
      await analyzeCrop(file);
    } catch (err) {
      setLocalError('Failed to process the image for analysis.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const clearImage = () => {
    setUploadedImage(null);
    clearError();
    setLocalError(null);
  };

  const clearLocalError = () => {
    setLocalError(null);
  };

  const displayError = error || localError;

  if (uploadedImage) {
    return (
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-0">
        {displayError && (
          <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start sm:items-center gap-2 sm:gap-3">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5 sm:mt-0" />
            <div className="flex-1 min-w-0">
              <p className="text-red-800 font-medium text-sm sm:text-base">Error</p>
              <p className="text-red-600 text-xs sm:text-sm">{displayError}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={localError ? clearLocalError : clearError}
              className="ml-auto text-red-600 hover:text-red-800 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        <div className="relative bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <div className="relative inline-block max-w-full">
            <div className="relative overflow-hidden rounded-lg border-2 border-green-200 bg-gray-50 max-w-full">
              <img 
                src={uploadedImage} 
                alt="Uploaded crop" 
                className="max-w-full h-auto max-h-64 sm:max-h-80 md:max-h-96 object-contain"
              />
              {isAnalyzing && <ScanAnimation />}
              
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="font-semibold text-sm sm:text-base">AI Analysis in Progress</p>
                  </div>
                </div>
              )}
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 rounded-full w-6 h-6 sm:w-8 sm:h-8 p-0"
              onClick={clearImage}
              disabled={isAnalyzing}
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
          
          <div className="mt-4 sm:mt-6 flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-green-600 hover:bg-green-700 px-6 sm:px-8 py-2 text-white text-sm sm:text-base"
            >
              <Scan className="w-4 h-4 mr-2" />
              {isAnalyzing ? 'Analyzing...' : 'Analyze Crop'}
            </Button>
            <Button
              variant="outline"
              onClick={clearImage}
              disabled={isAnalyzing}
              className="text-sm sm:text-base"
            >
              Upload Different Image
            </Button>
          </div>

          {isAnalyzing && (
            <div className="mt-3 sm:mt-4 text-center text-gray-600">
              <p className="text-sm sm:text-base">Please wait while our AI analyzes your crop image...</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">This usually takes a few seconds</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-0">
      {displayError && (
        <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start sm:items-center gap-2 sm:gap-3">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1 min-w-0">
            <p className="text-red-800 font-medium text-sm sm:text-base">Upload Error</p>
            <p className="text-red-600 text-xs sm:text-sm">{displayError}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={localError ? clearLocalError : clearError}
            className="ml-auto text-red-600 hover:text-red-800 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-3 border-dashed border-green-300 rounded-2xl bg-white/50 backdrop-blur-sm p-6 sm:p-8 md:p-12 text-center cursor-pointer hover:border-green-400 hover:bg-white/70 transition-all duration-300"
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              Upload Crop Image
            </h3>
            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
              Drag and drop your image here, or click to browse. 
              Supported formats: JPG, JPEG, PNG
            </p>
          </div>
          
          <Button className="bg-green-600 hover:bg-green-700 mt-2 sm:mt-4 text-white text-sm sm:text-base">
            <Upload className="w-4 h-4 mr-2" />
            Select Image
          </Button>
          
          <div className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 space-y-1">
            <p>📷 Upload a clear photo of plant leaves for accurate disease detection</p>
            <p>💡 Make sure the image is well-lit and focused on the affected areas</p>
            <p>⚡ Maximum file size: 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;