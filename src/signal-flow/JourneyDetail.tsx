import { AlertCircle, BarChart2, Check, ChevronDown, ChevronUp, Clock, Edit, Eye, MessageSquare, PlayCircle, StopCircle } from 'lucide-react';
import { useState } from 'react';

const JourneyDetailView = () => {
  const [expanded, setExpanded] = useState({
    triggers: false,
    metrics: false,
    settings: false
  });
  
  const [journeyStatus, setJourneyStatus] = useState('Active');
  
  const toggleExpanded = (section: string) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section]
    });
  };
  
  const toggleStatus = () => {
    setJourneyStatus(journeyStatus === 'Active' ? 'Paused' : 'Active');
  };
  
  // Sample journey data
  const journeyData = {
    name: "New Customer Welcome Series",
    description: "Automated onboarding flow for new customers with personalized content based on signup source and initial product interest.",
    status: journeyStatus,
    created: "May 2, 2025",
    createdBy: "Sarah Johnson",
    lastUpdated: "May 8, 2025",
    driftScore: 0.87,
    triggers: [
      { id: 1, name: "New User Signup", type: "Event", condition: "user.status == 'new'", status: "Active" },
      { id: 2, name: "Product Tour Completed", type: "Milestone", condition: "user.tour_status == 'completed'", status: "Active" },
      { id: 3, name: "7 Days Inactive", type: "Time-based", condition: "user.last_login > 7d", status: "Active" }
    ],
    metrics: {
      entries: 2457,
      completions: 1832,
      conversions: 643,
      conversionRate: "26.17%"
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{journeyData.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{journeyData.description}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              className="flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Eye className="mr-2 h-4 w-4 text-gray-500" />
              Preview
            </button>
            <button 
              className="flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Edit className="mr-2 h-4 w-4 text-gray-500" />
              Edit
            </button>
            <button 
              className={`flex items-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium ${
                journeyStatus === 'Active' 
                  ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                  : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
              }`}
              onClick={toggleStatus}
            >
              {journeyStatus === 'Active' ? (
                <>
                  <StopCircle className="mr-2 h-4 w-4" />
                  Pause Journey
                </>
              ) : (
                <>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Start Journey
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - Journey Info */}
        <div className="w-2/3 overflow-y-auto p-6">
          {/* Status card */}
          <div className="bg-white rounded-lg shadow p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Journey Overview</h2>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                journeyStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {journeyStatus}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="border-r border-gray-200 pr-4">
                <p className="text-sm text-gray-500">Created</p>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <p className="text-sm font-medium text-gray-900">{journeyData.created}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">by {journeyData.createdBy}</p>
              </div>
              
              <div className="border-r border-gray-200 px-4">
                <p className="text-sm text-gray-500">Last Updated</p>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <p className="text-sm font-medium text-gray-900">{journeyData.lastUpdated}</p>
                </div>
              </div>
              
              <div className="pl-4">
                <p className="text-sm text-gray-500">Drift Score</p>
                <div className="flex items-center mt-1">
                  {journeyData.driftScore > 0.9 ? (
                    <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                  ) : journeyData.driftScore > 0.7 ? (
                    <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                  ) : (
                    <Check className="h-4 w-4 text-green-500 mr-1" />
                  )}
                  <p className="text-sm font-medium text-gray-900">{journeyData.driftScore}</p>
                </div>
                {journeyData.driftScore > 0.7 && (
                  <p className="text-xs text-yellow-600 mt-1">Showing minor drift</p>
                )}
              </div>
            </div>
          </div>

          {/* Journey Visual */}
          <div className="bg-white rounded-lg shadow p-5 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Journey Flow</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
              <p className="text-gray-500 text-sm">Journey visualization would appear here</p>
              <div className="h-64 flex items-center justify-center">
                <svg width="400" height="150" className="text-gray-300">
                  <rect x="10" y="10" width="100" height="60" rx="5" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                  <text x="60" y="45" textAnchor="middle" fill="#6b7280" fontSize="12">Trigger</text>
                  
                  <line x1="110" y1="40" x2="150" y2="40" stroke="#d1d5db" strokeWidth="2"/>
                  <polygon points="150,40 145,35 145,45" fill="#d1d5db"/>
                  
                  <rect x="150" y="10" width="100" height="60" rx="5" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                  <text x="200" y="45" textAnchor="middle" fill="#6b7280" fontSize="12">Welcome Email</text>
                  
                  <line x1="250" y1="40" x2="290" y2="40" stroke="#d1d5db" strokeWidth="2"/>
                  <polygon points="290,40 285,35 285,45" fill="#d1d5db"/>
                  
                  <rect x="290" y="10" width="100" height="60" rx="5" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                  <text x="340" y="45" textAnchor="middle" fill="#6b7280" fontSize="12">Product Tour</text>
                  
                  <rect x="150" y="90" width="100" height="60" rx="5" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,5"/>
                  <text x="200" y="125" textAnchor="middle" fill="#6b7280" fontSize="12">Fallback Path</text>
                  
                  <line x1="200" y1="70" x2="200" y2="90" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,5"/>
                  <polygon points="200,90 195,85 205,85" fill="#d1d5db"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Triggers */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div 
              className="flex items-center justify-between p-5 cursor-pointer"
              onClick={() => toggleExpanded('triggers')}
            >
              <h2 className="text-lg font-medium text-gray-900">Triggers ({journeyData.triggers.length})</h2>
              {expanded.triggers ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
            
            {expanded.triggers && (
              <div className="px-5 pb-5">
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {journeyData.triggers.map((trigger) => (
                        <tr key={trigger.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trigger.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trigger.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{trigger.condition}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              trigger.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {trigger.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Metrics */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div 
              className="flex items-center justify-between p-5 cursor-pointer"
              onClick={() => toggleExpanded('metrics')}
            >
              <h2 className="text-lg font-medium text-gray-900">Journey Metrics</h2>
              {expanded.metrics ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
            
            {expanded.metrics && (
              <div className="px-5 pb-5">
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Total Entries</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{journeyData.metrics.entries}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Completions</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{journeyData.metrics.completions}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Conversions</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{journeyData.metrics.conversions}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Conversion Rate</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{journeyData.metrics.conversionRate}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Performance Over Time</h3>
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
                    <p className="text-gray-500 text-sm">Journey analytics chart would appear here</p>
                    <div className="h-48 flex items-center justify-center">
                      <BarChart2 className="w-12 h-12 text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right sidebar */}
        <div className="w-1/3 border-l border-gray-200 bg-white overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Related Actions</h2>
            
            <div className="space-y-4">
              <button className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <MessageSquare className="mr-3 h-5 w-5 text-gray-400" />
                View Change Log
              </button>
              
              <button className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <AlertCircle className="mr-3 h-5 w-5 text-gray-400" />
                Check Drift Score
              </button>
              
              <button className="w-full flex items-center px-4 py-3 border border-teal-200 rounded-md shadow-sm text-sm font-medium text-teal-700 bg-teal-50 hover:bg-teal-100">
                <PlayCircle className="mr-3 h-5 w-5 text-teal-500" />
                Test Journey
              </button>
            </div>
            
            <hr className="my-6 border-gray-200" />
            
            <h3 className="text-sm font-medium text-gray-900 mb-3">Memory Hooks</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Brand Voice Settings</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Synced</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-gray-500">Product Terminology</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Synced</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-gray-500">Customer Segments</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Synced</span>
              </div>
              <button className="mt-4 w-full text-xs text-teal-600 hover:text-teal-700 font-medium">
                + Add Memory Hook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyDetailView;