// src/components/ResultCard.tsx
import React, { useState } from 'react';
import { useAnalysis } from '../contexts/AnalysisContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Download, 
  Share2, 
  CheckCircle, 
  AlertTriangle, 
  Leaf, 
  Wheat,
  Sprout,
  Circle,
  Square,
  Check
} from 'lucide-react';

const ResultCard: React.FC = () => {
  const { analysisResult } = useAnalysis();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!analysisResult) return null;

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-red-600';
    if (confidence >= 60) return 'text-orange-600';
    return 'text-yellow-600';
  };

  const getConfidenceBgColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-red-50 border-red-200';
    if (confidence >= 60) return 'bg-orange-50 border-orange-200';
    return 'bg-yellow-50 border-yellow-200';
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High':
        return <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />;
      case 'Medium':
        return <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />;
      case 'Low':
        return <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />;
      case 'Unknown':
        return <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />;
      default:
        return <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />;
    }
  };

  // Get crop type from disease name (handles both underscore and space formats)
  const getCropType = (diseaseName: string) => {
    const normalizedName = diseaseName.replace(/___/g, ' ').replace(/_/g, ' ');
    
    if (normalizedName.includes('Corn')) return 'corn';
    if (normalizedName.includes('Potato')) return 'potato'; 
    if (normalizedName.includes('Rice')) return 'rice';
    if (normalizedName.includes('Wheat')) return 'wheat';
    return 'unknown';
  };

  // Format disease name for display
  const formatDiseaseName = (diseaseName: string) => {
    return diseaseName.replace(/___/g, ' ').replace(/_/g, ' ');
  };

  const getCropIcon = (cropType: string) => {
    switch (cropType) {
      case 'corn':
        return <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />;
      case 'potato':
        return <Square className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />;
      case 'wheat':
        return <Wheat className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />;
      case 'rice':
        return <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />;
      default:
        return <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />;
    }
  };

  const getCropColor = (cropType: string) => {
    switch (cropType) {
      case 'corn':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'potato':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'wheat':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'rice':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getCropName = (cropType: string) => {
    switch (cropType) {
      case 'corn':
        return 'Corn';
      case 'potato':
        return 'Potato';
      case 'wheat':
        return 'Wheat';
      case 'rice':
        return 'Rice';
      default:
        return 'Crop';
    }
  };

  const cropType = getCropType(analysisResult.disease_name);
  const cropIcon = getCropIcon(cropType);
  const cropColor = getCropColor(cropType);
  const cropName = getCropName(cropType);
  const readableDiseaseName = formatDiseaseName(analysisResult.disease_name);

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    setDownloadSuccess(false);
    
    // Simulate download delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Create a comprehensive text report
      const report = `
CROP DISEASE ANALYSIS REPORT
============================

Crop Type: ${cropName}
Disease Detected: ${readableDiseaseName}
Confidence Level: ${analysisResult.confidence}%
Severity: ${analysisResult.severity}
Status: ${analysisResult.is_healthy ? 'Healthy' : 'Diseased'}

DESCRIPTION:
${analysisResult.description}

SYMPTOMS:
${readableDiseaseName.includes('Common Rust') ? '• Cinnamon-brown pustules on leaves and stems\n• Reduced photosynthesis and yield' :
readableDiseaseName.includes('Gray Leaf Spot') ? '• Rectangular, gray to tan lesions on leaves\n• Favored by humid conditions' :
readableDiseaseName.includes('Leaf Blight') ? '• Elongated, tan lesions with dark borders\n• Common during warm, humid weather' :
readableDiseaseName.includes('Early Blight') ? '• Dark spots with concentric rings on older leaves\n• Can lead to defoliation' :
readableDiseaseName.includes('Late Blight') ? '• Water-soaked lesions that spread rapidly\n• Can destroy entire crops if untreated' :
readableDiseaseName.includes('Brown Spot') ? '• Brown, oval spots on leaves and grains\n• Often associated with nutrient deficiency' :
readableDiseaseName.includes('Leaf Blast') ? '• Diamond-shaped lesions with gray centers\n• Brown borders on leaves' :
readableDiseaseName.includes('Brown Rust') ? '• Reddish-brown pustules on leaves and stems\n• Reduces grain quality and yield' :
readableDiseaseName.includes('Yellow Rust') ? '• Yellow-orange pustules in stripes on leaves\n• Favored by cool temperatures' :
'• No disease symptoms detected\n• Plant appears healthy'}

RECOMMENDED REMEDIES:
${analysisResult.remedies.map((remedy, index) => `${index + 1}. ${remedy}`).join('\n')}

RECOMMENDED FUNGICIDES:
${analysisResult.fungicides.map((fungicide, index) => `${index + 1}. ${fungicide}`).join('\n')}

IMMEDIATE ACTIONS:
${analysisResult.severity === 'High' ? '• Apply recommended fungicides immediately\n• Remove severely infected plants\n• Increase monitoring frequency\n• Consult agricultural expert' :
analysisResult.severity === 'Medium' ? '• Begin fungicide application program\n• Remove infected plant parts\n• Improve cultural practices\n• Monitor daily for spread' :
analysisResult.severity === 'Low' ? '• Implement preventive measures\n• Monitor plant health regularly\n• Consider early intervention\n• Maintain good growing conditions' :
'• Continue current management practices\n• Regular monitoring recommended\n• Maintain preventive measures'}

PREVENTION TIPS:
• Practice crop rotation
• Use disease-resistant varieties
• Ensure proper plant spacing
• Avoid overhead irrigation
• Remove crop debris after harvest
• Monitor weather conditions
• Use balanced fertilization

GENERATED: ${new Date().toLocaleString()}
ANALYSIS CONFIDENCE: ${analysisResult.confidence}%

=== IMPORTANT NOTICE ===
This analysis is provided by AI and should be used as a guidance tool. 
For serious infections, consult with a local agricultural expert or 
plant pathologist for definitive diagnosis and treatment plans.
      `.trim();

      const blob = new Blob([report], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cropName.toLowerCase()}-disease-analysis-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setDownloadSuccess(true);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: `${cropName} Disease Analysis Results`,
        text: `My ${cropName.toLowerCase()} analysis detected: ${readableDiseaseName} with ${analysisResult.confidence}% confidence. Severity: ${analysisResult.severity}.`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      const text = `
${cropName} Disease Analysis Report
Disease: ${readableDiseaseName}
Confidence: ${analysisResult.confidence}%
Severity: ${analysisResult.severity}
Status: ${analysisResult.is_healthy ? 'Healthy' : 'Needs Treatment'}

Description: ${analysisResult.description}

Key Recommendations:
${analysisResult.remedies.slice(0, 3).map(remedy => `• ${remedy}`).join('\n')}

Generated by Crop Disease Detector AI
      `.trim();
      
      navigator.clipboard.writeText(text).then(() => {
        alert('Results copied to clipboard!');
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-0 animate-in fade-in duration-500">
      <Card className="border-l-4 border-l-green-500 shadow-lg sm:shadow-xl">
        <CardHeader className={`bg-gradient-to-r from-green-50 to-emerald-50 ${getConfidenceBgColor(analysisResult.confidence)} p-4 sm:p-6`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl">
              {getSeverityIcon(analysisResult.severity)}
              <span className="text-lg sm:text-2xl">Analysis Results</span>
            </CardTitle>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                {cropIcon}
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${cropColor} border`}>
                  {cropName}
                </span>
              </div>
              <div className={`text-base sm:text-lg font-semibold ${getConfidenceColor(analysisResult.confidence)} flex items-center gap-2`}>
                <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                {analysisResult.confidence}% Confidence
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Disease Information */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Detected Condition</h3>
            <div className={`p-3 sm:p-4 rounded-lg border-2 ${
              analysisResult.is_healthy 
                ? 'bg-green-50 border-green-200' 
                : analysisResult.severity === 'High' 
                ? 'bg-red-50 border-red-200'
                : analysisResult.severity === 'Medium'
                ? 'bg-orange-50 border-orange-200'
                : 'bg-yellow-50 border-yellow-200'
            }`}>
              <div className="flex items-start gap-2 sm:gap-3">
                {analysisResult.is_healthy ? (
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className={`text-lg sm:text-xl font-bold ${
                    analysisResult.is_healthy ? 'text-green-700' : 
                    analysisResult.severity === 'High' ? 'text-red-700' :
                    analysisResult.severity === 'Medium' ? 'text-orange-700' :
                    'text-yellow-700'
                  }`}>
                    {readableDiseaseName}
                  </h4>
                  <p className={`mt-1 text-sm sm:text-base ${
                    analysisResult.is_healthy ? 'text-green-600' : 
                    analysisResult.severity === 'High' ? 'text-red-600' :
                    analysisResult.severity === 'Medium' ? 'text-orange-600' :
                    'text-yellow-600'
                  }`}>
                    {analysisResult.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Severity and Status */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <h4 className="text-xs sm:text-sm font-medium text-blue-900 mb-1">Severity Level</h4>
              <p className={`text-base sm:text-lg font-semibold ${
                analysisResult.severity === 'High' ? 'text-red-600' :
                analysisResult.severity === 'Medium' ? 'text-orange-600' :
                analysisResult.severity === 'Low' ? 'text-yellow-600' :
                analysisResult.severity === 'Unknown' ? 'text-gray-600' :
                'text-green-600'
              }`}>
                {analysisResult.severity}
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 sm:p-4">
              <h4 className="text-xs sm:text-sm font-medium text-purple-900 mb-1">Plant Status</h4>
              <p className={`text-base sm:text-lg font-semibold ${
                analysisResult.is_healthy ? 'text-green-600' : 'text-red-600'
              }`}>
                {analysisResult.is_healthy ? 'Healthy' : 'Needs Treatment'}
              </p>
            </div>
          </div>

          {/* Recommended Remedies */}
          {!analysisResult.is_healthy && (
            <>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">💊 Recommended Remedies</h3>
                <div className="grid gap-2 sm:gap-3">
                  {analysisResult.remedies.map((remedy, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3 bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-600 text-xs sm:text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-green-800 text-sm sm:text-base">{remedy}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fungicides */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">🧪 Recommended Fungicides</h3>
                <div className="grid gap-2 sm:gap-3">
                  {analysisResult.fungicides.map((fungicide, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3 bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs sm:text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-blue-800 text-sm sm:text-base">{fungicide}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Immediate Actions Based on Severity */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">🚨 Immediate Actions</h3>
                <div className={`p-3 sm:p-4 rounded-lg border-2 ${
                  analysisResult.severity === 'High' ? 'bg-red-50 border-red-200' :
                  analysisResult.severity === 'Medium' ? 'bg-orange-50 border-orange-200' :
                  'bg-yellow-50 border-yellow-200'
                }`}>
                  {analysisResult.severity === 'High' && (
                    <ul className="text-red-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
                      <li>• Apply recommended fungicides immediately</li>
                      <li>• Remove and destroy severely infected plants</li>
                      <li>• Increase monitoring to daily frequency</li>
                      <li>• Consult agricultural expert within 24 hours</li>
                    </ul>
                  )}
                  {analysisResult.severity === 'Medium' && (
                    <ul className="text-orange-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
                      <li>• Begin fungicide application program this week</li>
                      <li>• Remove infected plant parts promptly</li>
                      <li>• Improve cultural practices immediately</li>
                      <li>• Monitor plants every 2-3 days for spread</li>
                    </ul>
                  )}
                  {analysisResult.severity === 'Low' && (
                    <ul className="text-yellow-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
                      <li>• Implement preventive measures now</li>
                      <li>• Monitor plant health weekly</li>
                      <li>• Consider early intervention treatments</li>
                      <li>• Maintain optimal growing conditions</li>
                    </ul>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Healthy Plant Message */}
          {analysisResult.is_healthy && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 text-center">
              <Leaf className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-2 sm:mb-3" />
              <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">Excellent! Your {cropName} Plants Are Healthy</h3>
              <p className="text-green-600 mb-3 sm:mb-4 text-sm sm:text-base">
                No signs of disease detected. Your plants show healthy growth patterns 
                and are free from visible disease symptoms.
              </p>
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-green-200">
                <h4 className="font-semibold text-green-700 mb-2 text-sm sm:text-base">Maintenance Tips:</h4>
                <ul className="text-green-600 text-xs sm:text-sm space-y-1">
                  <li>• Continue current management practices</li>
                  <li>• Monitor plants weekly for early detection</li>
                  <li>• Maintain proper nutrition and irrigation</li>
                  <li>• Practice crop rotation for prevention</li>
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <Button 
              onClick={handleDownloadReport}
              disabled={isDownloading}
              className={`flex-1 py-3 text-white ${
                downloadSuccess 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : isDownloading 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Downloaded!
                </>
              ) : isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleShareResults}
              className="flex-1 py-3"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
        <h4 className="font-semibold text-yellow-800 mb-1 sm:mb-2 text-sm sm:text-base">💡 Professional Advice</h4>
        <p className="text-yellow-700 text-xs sm:text-sm">
          This AI analysis is provided as a guidance tool with {analysisResult.confidence}% confidence. 
          For serious infections or uncertain diagnoses, consult with a local agricultural expert 
          or plant pathologist for definitive diagnosis and customized treatment plans. 
          Always follow local regulations when applying chemical treatments.
        </p>
      </div>

      {/* Crop-Specific Additional Information */}
      {!analysisResult.is_healthy && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
          <h4 className="font-semibold text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base">🌱 {cropName}-Specific Guidance</h4>
          <p className="text-blue-700 text-xs sm:text-sm">
            {cropType === 'corn' && 'For corn diseases, focus on resistant hybrids and timely fungicide applications during vegetative stages.'}
            {cropType === 'potato' && 'Potato diseases require careful tuber selection and regular field monitoring, especially during humid conditions.'}
            {cropType === 'wheat' && 'Wheat rust management involves resistant varieties and early season fungicide protection.'}
            {cropType === 'rice' && 'Rice disease control emphasizes water management and balanced fertilization alongside chemical treatments.'}
            Regular scouting and early intervention are key to successful {cropName.toLowerCase()} disease management.
          </p>
        </div>
      )}

      {/* Download Success Toast */}
      {downloadSuccess && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-bottom-4 z-50">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Report downloaded successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;