// src/components/HeroSection.tsx
import React from 'react';
import { Button } from './ui/button';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useAnalysis } from '../contexts/AnalysisContext';

const HeroSection: React.FC = () => {
  const { setUploadedImage } = useAnalysis();

  const handleUploadClick = () => {
    // Trigger the file input click in the ImageUploader component
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.click();
    } else {
      // If we're not on the detection tab, scroll to the upload section
      const detectionTab = document.querySelector('[data-value="detection"]') as HTMLElement;
      if (detectionTab) {
        detectionTab.click();
        // Wait a bit for the tab to switch, then trigger file input
        setTimeout(() => {
          const fileInput = document.getElementById('file-input');
          if (fileInput) {
            fileInput.click();
          }
        }, 300);
      }
    }
  };

  const handleKnowledgeHubClick = () => {
    // Switch to the Knowledge Hub tab
    const knowledgeTab = document.querySelector('[data-value="knowledge"]') as HTMLElement;
    if (knowledgeTab) {
      knowledgeTab.click();
      // Smooth scroll to the tabs section
      const tabsSection = document.getElementById('tabs-section');
      if (tabsSection) {
        tabsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleGetStartedClick = () => {
    // Clear any existing uploaded image and scroll to detection tab
    setUploadedImage(null);
    const detectionTab = document.querySelector('[data-value="detection"]') as HTMLElement;
    if (detectionTab) {
      detectionTab.click();
      const tabsSection = document.getElementById('tabs-section');
      if (tabsSection) {
        tabsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white py-12 sm:py-16 lg:py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">AI-Powered Agriculture</span>
          </div>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          Empowering Farmers with
          <span className="block bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mt-2">
            AI — Detect Crop Diseases Instantly
          </span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
          Upload a photo of your crop and get instant AI-powered disease analysis, 
          treatment recommendations, and prevention tips.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10">
          <Button 
            onClick={handleUploadClick}
            size="lg" 
            className="bg-white text-green-700 hover:bg-green-50 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Upload Image
            <ArrowUpRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <Button 
            onClick={handleKnowledgeHubClick}
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white/10 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            View Knowledge Hub
          </Button>
        </div>

        {/* Get Started CTA */}
        <div className="mb-8 sm:mb-12">
          <Button 
            onClick={handleGetStartedClick}
            size="lg"
            className="bg-green-500 hover:bg-green-400 text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-pulse"
          >
            🚀 Get Started - It's Free!
          </Button>
        </div>
        
        <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-left">
          <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group">
            <div className="text-xl sm:text-2xl font-bold text-green-300 mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
            <div className="text-green-100 text-sm sm:text-base">Accuracy Rate</div>
            <p className="text-green-200 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Industry-leading AI accuracy
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group">
            <div className="text-xl sm:text-2xl font-bold text-green-300 mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
            <div className="text-green-100 text-sm sm:text-base">Crop Diseases</div>
            <p className="text-green-200 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Comprehensive disease database
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group">
            <div className="text-xl sm:text-2xl font-bold text-green-300 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
            <div className="text-green-100 text-sm sm:text-base">Instant Analysis</div>
            <p className="text-green-200 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Available anytime, anywhere
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center mx-auto">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
          <p className="text-white/70 text-sm mt-2">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;