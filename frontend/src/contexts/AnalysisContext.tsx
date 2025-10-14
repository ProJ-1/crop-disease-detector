// src/context/AnalysisContext.tsx
import React, { createContext, useContext, useState } from 'react';
import type {  ReactNode } from 'react';

interface AnalysisResult {
  disease_name: string;
  confidence: number;
  description: string;
  remedies: string[];
  fungicides: string[];
  is_healthy: boolean;
  severity: string;
}

interface AnalysisContextType {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  clearUploadedImage: () => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  analyzeCrop: (imageFile: File) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

// Backend API base URL
const API_BASE_URL = 'http://localhost:8000/api/v1';

export const AnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);
  
  const clearUploadedImage = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
    clearError();
  };

  const analyzeCrop = async (imageFile: File) => {
    if (!imageFile) return;
    
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Analysis failed');
      }

      const result: AnalysisResult = await response.json();
      setAnalysisResult(result);
      
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <AnalysisContext.Provider value={{
      uploadedImage,
      setUploadedImage,
      clearUploadedImage,
      isAnalyzing,
      setIsAnalyzing,
      analysisResult,
      setAnalysisResult,
      analyzeCrop,
      error,
      clearError
    }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};