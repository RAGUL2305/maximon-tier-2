import { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, X, ChevronDown, ChevronUp, AlertCircle, Info } from 'lucide-react';

const JourneyValidator = () => {
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    drift: true,
    trigger: true
  });
  const [validationResult, setValidationResult] = useState(null);

  // Simulated journey data
  useEffect(() => {
    // This would normally be an API call
    setTimeout(() => {
      setJourneyData({
        name: "Summer Promotion Campaign",
        status: "Draft",
        nodes: 12,
        triggers: 3,
        createdBy: "Marketing Team",
        lastModified: "2025-05-08T14:30:00Z"
      });
      
      setValidationResult({
        brandCompliance: {
          status: 'warning',
          issues: [
            { severity: 'warning', message: 'CTA tone in Node 4 deviates from brand guidelines', nodeId: 4 },
            { severity: 'warning', message: 'Product description in Node 7 uses non-approved terminology', nodeId: 7 }
          ],
          passRate: 83
        },
        driftCheck: {
          status: 'success',
          issues: [],
          passRate: 100
        },
        triggerHealth: {
          status: 'error',
          issues: [
            { severity: 'error', message: 'Trigger "abandoned_cart" missing fallback path', triggerId: 'trigger-002' },
            { severity: 'warning', message: 'Trigger "email_open" has potential overlap with "email_click"', triggerId: 'trigger-003' }
          ],
          passRate: 67
        }
      });
      
      setLoading(false);
    }, 1500);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'success':
        return <CheckCircle className="text-green-500" />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" />;
      case 'error':
        return <AlertCircle className="text-red-500" />;
      default:
        return <Info className="text-blue-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  const runValidation = () => {
    setLoading(true);
    setTimeout(() => {
      // This would be an API call in a real implementation
      setLoading(false);
      
      // Update validation results with a slight improvement
      setValidationResult(prev => ({
        ...prev,
        brandCompliance: {
          ...prev.brandCompliance,
          issues: prev.brandCompliance.issues.slice(0, 1), // Remove one issue
          passRate: 92
        }
      }));
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Validating journey...</p>
        </div>
      </div>
    );
  }

  const overallStatus = 
    validationResult.brandCompliance.status === 'error' || 
    validationResult.driftCheck.status === 'error' || 
    validationResult.triggerHealth.status === 'error' 
      ? 'error' 
      : validationResult.brandCompliance.status === 'warning' || 
        validationResult.driftCheck.status === 'warning' || 
        validationResult.triggerHealth.status === 'warning'
        ? 'warning' : 'success';

  const totalIssues = 
    validationResult.brandCompliance.issues.length + 
    validationResult.driftCheck.issues.length + 
    validationResult.triggerHealth.issues.length;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Journey Validator</h2>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 text-sm rounded-full ${
              overallStatus === 'success' ? 'bg-green-100 text-green-800' :
              overallStatus === 'warning' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {overallStatus === 'success' ? 'Pass' : 
               overallStatus === 'warning' ? 'Pass with warnings' : 'Validation failed'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Journey information */}
      <div className="p-4 border-b">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Journey Name</p>
            <p className="font-medium">{journeyData.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium">{journeyData.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nodes</p>
            <p className="font-medium">{journeyData.nodes}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Triggers</p>
            <p className="font-medium">{journeyData.triggers}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Modified</p>
            <p className="font-medium">{new Date(journeyData.lastModified).toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      {/* Validation summary */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-800">Validation Results</h3>
            <p className="text-sm text-gray-500">{totalIssues} issues found</p>
          </div>
          <div className="mt-3 md:mt-0">
            <button 
              onClick={runValidation}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Run Validation
            </button>
          </div>
        </div>
      </div>
      
      {/* Validation sections */}
      <div className="divide-y">
        {/* Brand Compliance Section */}
        <div className="p-4">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleSection('brand')}
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(validationResult.brandCompliance.status)}
              <h3 className="font-medium">Brand Compliance</h3>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                validationResult.brandCompliance.passRate > 90 ? 'bg-green-100 text-green-800' :
                validationResult.brandCompliance.passRate > 70 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {validationResult.brandCompliance.passRate}% Pass
              </span>
            </div>
            {expandedSections.brand ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          {expandedSections.brand && (
            <div className="mt-3 pl-8">
              {validationResult.brandCompliance.issues.length === 0 ? (
                <p className="text-green-600 text-sm">No brand compliance issues detected.</p>
              ) : (
                <ul className="space-y-2">
                  {validationResult.brandCompliance.issues.map((issue, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className={getSeverityColor(issue.severity)}>•</span>
                      <span className="text-sm">{issue.message} <span className="text-gray-500">(Node {issue.nodeId})</span></span>
                    </li>
                  ))}
                </ul>
              )}
              
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  <strong>Brand alignment check:</strong> Validates that all content, CTAs, and messaging align with brand voice guidelines stored in Memory Loom.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Drift Check Section */}
        <div className="p-4">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleSection('drift')}
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(validationResult.driftCheck.status)}
              <h3 className="font-medium">Drift Check</h3>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                validationResult.driftCheck.passRate > 90 ? 'bg-green-100 text-green-800' :
                validationResult.driftCheck.passRate > 70 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {validationResult.driftCheck.passRate}% Pass
              </span>
            </div>
            {expandedSections.drift ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          {expandedSections.drift && (
            <div className="mt-3 pl-8">
              {validationResult.driftCheck.issues.length === 0 ? (
                <p className="text-green-600 text-sm">No drift issues detected.</p>
              ) : (
                <ul className="space-y-2">
                  {validationResult.driftCheck.issues.map((issue, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className={getSeverityColor(issue.severity)}>•</span>
                      <span className="text-sm">{issue.message}</span>
                    </li>
                  ))}
                </ul>
              )}
              
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  <strong>Drift detection:</strong> Identifies when journey paths have deviated from expected behavior or brand standards over time.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Trigger Health Section */}
        <div className="p-4">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleSection('trigger')}
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(validationResult.triggerHealth.status)}
              <h3 className="font-medium">Trigger Health</h3>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                validationResult.triggerHealth.passRate > 90 ? 'bg-green-100 text-green-800' :
                validationResult.triggerHealth.passRate > 70 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {validationResult.triggerHealth.passRate}% Pass
              </span>
            </div>
            {expandedSections.trigger ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          {expandedSections.trigger && (
            <div className="mt-3 pl-8">
              {validationResult.triggerHealth.issues.length === 0 ? (
                <p className="text-green-600 text-sm">No trigger health issues detected.</p>
              ) : (
                <ul className="space-y-2">
                  {validationResult.triggerHealth.issues.map((issue, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className={getSeverityColor(issue.severity)}>•</span>
                      <span className="text-sm">{issue.message} <span className="text-gray-500">({issue.triggerId})</span></span>
                    </li>
                  ))}
                </ul>
              )}
              
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  <strong>Trigger validation:</strong> Ensures all triggers are properly configured with appropriate fallback paths and don't create conflicting conditions.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer actions */}
      <div className="p-4 bg-gray-50 border-t flex justify-between">
        <button className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors">
          Cancel
        </button>
        
        <div className="space-x-2">
          <button 
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Export Report
          </button>
          <button 
            className={`px-4 py-2 rounded text-white transition-colors ${
              overallStatus === 'error' 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'
            }`}
            disabled={overallStatus === 'error'}
          >
            {overallStatus === 'error' ? 'Fix Issues to Continue' : 'Approve Journey'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JourneyValidator;