// src/components/TabsSection.tsx
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import ImageUploader from './ImageUploader';
import ResultCard from './ResultCard';
import { useAnalysis } from '../contexts/AnalysisContext';
import { Scan, BookOpen, Cloud, Database } from 'lucide-react';

const TabsSection: React.FC = () => {
  const { analysisResult, isAnalyzing, uploadedImage } = useAnalysis();

  return (
    <section className="py-6 sm:py-8 md:py-12 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="detection" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6 md:mb-8">
            <TabsTrigger 
              value="detection" 
              className="flex items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm md:text-base"
            >
              <Scan className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Disease</span> Detection
            </TabsTrigger>
            <TabsTrigger 
              value="knowledge" 
              className="flex items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm md:text-base"
            >
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Knowledge</span> Hub
            </TabsTrigger>
            <TabsTrigger 
              value="weather" 
              className="flex items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm md:text-base"
            >
              <Cloud className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Weather</span> Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="detection" className="space-y-6 sm:space-y-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                AI-Powered Crop Analysis
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
                Upload a clear photo of your crop leaves. Our AI will analyze the image 
                and provide instant disease detection with treatment recommendations.
              </p>
            </div>

            <ImageUploader />
            
            {analysisResult && <ResultCard />}

            {/* Empty State */}
            {!uploadedImage && !isAnalyzing && !analysisResult && (
              <div className="text-center py-8 sm:py-12 md:py-16">
                <Database className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-600 mb-2">
                  Ready to Analyze Your Crops
                </h3>
                <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto px-4">
                  Upload an image of your crop leaves to get started with AI-powered disease detection.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="knowledge">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Crop Disease Knowledge Hub</h3>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-green-800 mb-2 sm:mb-3">🌽 Common Corn Diseases</h4>
                    <ul className="space-y-2 text-green-700 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span><strong>Common Rust:</strong> Cinnamon-brown pustules on leaves</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span><strong>Gray Leaf Spot:</strong> Rectangular gray lesions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span><strong>Leaf Blight:</strong> Tan lesions with dark borders</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-blue-800 mb-2 sm:mb-3">🥔 Potato Disease Guide</h4>
                    <ul className="space-y-2 text-blue-700 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span><strong>Early Blight:</strong> Concentric rings on leaves</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span><strong>Late Blight:</strong> Water-soaked lesions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>Monitor during humid conditions</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 sm:p-6">
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-orange-800 mb-2 sm:mb-3">🛡️ Prevention Strategies</h4>
                    <ul className="space-y-2 text-orange-700 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Practice 3-year crop rotation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Use disease-resistant varieties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Avoid overhead irrigation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>Remove crop debris after harvest</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6">
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-amber-800 mb-2 sm:mb-3">🌾 Wheat & Rice Diseases</h4>
                    <ul className="space-y-2 text-amber-700 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span><strong>Wheat Rust:</strong> Reddish-brown pustules</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span><strong>Rice Blast:</strong> Diamond-shaped lesions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span><strong>Brown Spot:</strong> Oval spots on leaves</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 sm:p-6">
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-purple-800 mb-2 sm:mb-3">🌿 Organic Treatment Options</h4>
                    <ul className="space-y-2 text-purple-700 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span><strong>Neem Oil:</strong> Natural fungicide</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span><strong>Copper Sprays:</strong> Fungal control</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span><strong>Baking Soda:</strong> Powdery mildew</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span><strong>Compost Tea:</strong> Boosts immunity</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-red-800 mb-2 sm:mb-3">🚨 When to Consult Experts</h4>
                    <ul className="space-y-2 text-red-700 text-sm sm:text-base">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Disease spreads rapidly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Multiple plants affected</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Unidentified symptoms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span>Large-scale infection</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quick Tips Section */}
              <div className="mt-6 sm:mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 text-center">💡 Quick Farming Tips</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-center">
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="text-green-600 font-bold text-lg mb-1">🌧️</div>
                    <p className="text-gray-700 text-xs sm:text-sm">Monitor after rainfall</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="text-green-600 font-bold text-lg mb-1">🔍</div>
                    <p className="text-gray-700 text-xs sm:text-sm">Weekly inspections</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="text-green-600 font-bold text-lg mb-1">🔄</div>
                    <p className="text-gray-700 text-xs sm:text-sm">Crop rotation</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="text-green-600 font-bold text-lg mb-1">📝</div>
                    <p className="text-gray-700 text-xs sm:text-sm">Keep records</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weather">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Weather Insights & Disease Forecasting</h3>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div className="space-y-4 sm:space-y-6">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-800">🌤️ Weather & Disease Relationship</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-700 text-sm sm:text-base">High Humidity</span>
                      <span className="text-red-600 font-semibold text-sm sm:text-base">↑ Fungal Risk</span>
                    </div>
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-700 text-sm sm:text-base">Rainy Conditions</span>
                      <span className="text-orange-600 font-semibold text-sm sm:text-base">↑ Bacterial Risk</span>
                    </div>
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-700 text-sm sm:text-base">Temperature 20-30°C</span>
                      <span className="text-yellow-600 font-semibold text-sm sm:text-base">↑ Disease Spread</span>
                    </div>
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-700 text-sm sm:text-base">Dry & Windy</span>
                      <span className="text-green-600 font-semibold text-sm sm:text-base">↓ Disease Risk</span>
                    </div>
                  </div>

                  {/* Weather Alert */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                    <h5 className="font-semibold text-yellow-800 mb-2 text-sm sm:text-base">⚠️ Current Weather Alert</h5>
                    <p className="text-yellow-700 text-xs sm:text-sm">
                      Based on your location, expect increased humidity this week. 
                      Monitor crops closely for early signs of fungal diseases.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-800">📋 Current Recommendations</h4>
                  <div className="space-y-3">
                    <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-700 text-sm sm:text-base">
                        <strong>🌽 Corn:</strong> Monitor for rust during humid periods. Apply preventive fungicides if needed.
                      </p>
                    </div>
                    <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-700 text-sm sm:text-base">
                        <strong>🥔 Potato:</strong> Watch for blight after rainfall. Ensure good field drainage.
                      </p>
                    </div>
                    <div className="p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-amber-700 text-sm sm:text-base">
                        <strong>🌾 Wheat:</strong> Check for rust during cool, moist mornings. Consider early treatment.
                      </p>
                    </div>
                    <div className="p-3 sm:p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-purple-700 text-sm sm:text-base">
                        <strong>🍚 Rice:</strong> Monitor water levels. Avoid waterlogging to prevent blast disease.
                      </p>
                    </div>
                  </div>

                  {/* Seasonal Guide */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <h5 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">📅 Seasonal Disease Calendar</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                      <div className="text-blue-700">Spring: Leaf diseases</div>
                      <div className="text-green-700">Summer: Fungal outbreaks</div>
                      <div className="text-orange-700">Fall: Rust diseases</div>
                      <div className="text-purple-700">Winter: Storage rots</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Weather Tips */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-blue-500 text-lg sm:text-xl mt-1">💡</div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Professional Weather Advice</h4>
                    <p className="text-blue-700 text-xs sm:text-sm">
                      <strong>Pro Tip:</strong> Regular monitoring combined with weather-aware prevention 
                      can reduce crop disease incidence by up to 70%. Use weather forecasts to plan 
                      preventive treatments 2-3 days before expected rainfall or humidity spikes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Weather Stats */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <div className="text-2xl sm:text-3xl text-blue-600 mb-1">85%</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Humidity Alert</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <div className="text-2xl sm:text-3xl text-green-600 mb-1">25°C</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Avg Temp</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <div className="text-2xl sm:text-3xl text-orange-600 mb-1">60%</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Disease Risk</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <div className="text-2xl sm:text-3xl text-purple-600 mb-1">7d</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Forecast</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TabsSection;