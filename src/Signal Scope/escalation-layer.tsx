import { AlertCircle, AlertTriangle, ArrowRight, Check, ChevronRight, Filter, MessageSquare, Search, Users } from 'lucide-react';
import { useState } from 'react';

const EscalationLayer = () => {
  const [selectedSignal, setSelectedSignal] = useState<any>(null);
  const [signalList, setSignalList] = useState([
    {
      id: 'sig-001',
      source: 'Twitter',
      title: 'Product feature misrepresentation',
      type: 'Misalignment',
      severity: 'High',
      timestamp: '2025-05-09T14:23:00',
      status: 'Pending',
      assignedTo: null,
      content: 'Multiple users reporting confusion about Feature X capabilities. Claims in marketing materials may be inconsistent with actual functionality.',
    },
    {
      id: 'sig-002',
      source: 'LLM Test',
      title: 'Hallucination detected in brand voice',
      type: 'Hallucination',
      severity: 'Critical',
      timestamp: '2025-05-10T09:12:00',
      status: 'Pending',
      assignedTo: null,
      content: 'Claude 3.7 Sonnet incorrectly describing our product as "open-source" when it is proprietary. Potential reputation risk.',
    },
    {
      id: 'sig-003',
      source: 'Search Analytics',
      title: 'Growing search trend with negative sentiment',
      type: 'Sentiment',
      severity: 'Medium',
      timestamp: '2025-05-09T18:45:00',
      status: 'In Progress',
      assignedTo: 'marketing-team',
      content: 'Increasing searches for "Brand X problems" with 27% rise in negative sentiment. May require content response strategy.',
    },
    {
      id: 'sig-004',
      source: 'Customer Support',
      title: 'Recurring customer confusion on pricing',
      type: 'Clarity',
      severity: 'Medium',
      timestamp: '2025-05-08T11:30:00',
      status: 'Resolved',
      assignedTo: 'product-team',
      content: 'Multiple support tickets indicate pricing page language creates confusion about subscription tiers. Needs clarity improvements.',
      resolution: 'Updated pricing page with clearer tier comparisons and FAQ section.'
    }
  ]);
  
  const [teams] = useState([
    { id: 'marketing-team', name: 'Marketing Team', members: 4 },
    { id: 'legal-team', name: 'Legal Team', members: 2 },
    { id: 'product-team', name: 'Product Team', members: 3 },
    { id: 'leadership-team', name: 'Leadership', members: 2 }
  ]);
  
  const handleAssign = (teamId: any) => {
    if (!selectedSignal) return;
    
    const updatedSignals = signalList.map(signal => {
      if (signal.id === selectedSignal.id) {
        return {
          ...signal,
          status: 'In Progress',
          assignedTo: teamId,
        };
      }
      return signal;
    });
    
    setSignalList(updatedSignals);
    setSelectedSignal({...selectedSignal, status: 'In Progress', assignedTo: teamId});
  };
  
  const handleResolve = (resolution: any) => {
    if (!selectedSignal) return;
    
    const updatedSignals = signalList.map(signal => {
      if (signal.id === selectedSignal.id) {
        return {
          ...signal,
          status: 'Resolved',
          resolution
        };
      }
      return signal;
    });
    
    setSignalList(updatedSignals);
    setSelectedSignal(null);
  };
  
  const getStatusIcon = (status:any) => {
    switch (status) {
      case 'Pending':
        return <AlertTriangle className="text-yellow-500" size={16} />;
      case 'In Progress':
        return <MessageSquare className="text-blue-500" size={16} />;
      case 'Resolved':
        return <Check className="text-green-500" size={16} />;
      default:
        return null;
    }
  };
  
  const getSeverityBadge = (severity: any) => {
    let color = "bg-gray-100 text-gray-800";
    
    switch (severity) {
      case 'Low':
        color = "bg-gray-100 text-gray-800";
        break;
      case 'Medium':
        color = "bg-yellow-100 text-yellow-800";
        break;
      case 'High':
        color = "bg-orange-100 text-orange-800";
        break;
      case 'Critical':
        color = "bg-red-100 text-red-800";
        break;
      default:
        break;
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {severity}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-6xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-semibold">Escalation Layer (T2) - SignalScope</h1>
          <div className="flex items-center text-white text-sm">
            <span className="opacity-75">Marketing OS</span>
            <ChevronRight size={16} className="mx-1 opacity-50" />
            <span className="opacity-75">SignalScope</span>
            <ChevronRight size={16} className="mx-1 opacity-50" />
            <span>Escalation Layer</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Signals List */}
        <div className="col-span-1 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-800">Signals Requiring Review</h2>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <Search size={18} />
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <Filter size={18} />
                </button>
              </div>
            </div>
            <div className="flex mt-2 gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                Critical (1)
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
                High (1)
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                Medium (2)
              </span>
            </div>
          </div>
          
          <div className="overflow-y-auto" style={{ maxHeight: '70vh' }}>
            {signalList.map(signal => (
              <div 
                key={signal.id}
                onClick={() => setSelectedSignal(signal)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${selectedSignal?.id === signal.id ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : ''}`}
              >
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{signal.title}</h3>
                  <div className="flex items-center">
                    {getStatusIcon(signal.status)}
                  </div>
                </div>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <span>{signal.source}</span>
                  <span className="mx-1">•</span>
                  <span>{new Date(signal.timestamp).toLocaleString()}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {getSeverityBadge(signal.severity)}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {signal.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Signal Detail */}
        <div className="col-span-2 h-full">
          {selectedSignal ? (
            <div className="h-full flex flex-col">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">{selectedSignal.title}</h2>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span>ID: {selectedSignal.id}</span>
                      <span className="mx-1">•</span>
                      <span>Source: {selectedSignal.source}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {selectedSignal.status === 'Pending' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <AlertTriangle size={12} className="mr-1" />
                        Awaiting Review
                      </span>
                    )}
                    {selectedSignal.status === 'In Progress' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <MessageSquare size={12} className="mr-1" />
                        In Review
                      </span>
                    )}
                    {selectedSignal.status === 'Resolved' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Check size={12} className="mr-1" />
                        Resolved
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-grow">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">SIGNAL DETAILS</h3>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-700">{selectedSignal.content}</p>
                    </div>
                  </div>
                  
                  {selectedSignal.status === 'Resolved' && selectedSignal.resolution && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">RESOLUTION</h3>
                      <div className="mt-2 p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-gray-700">{selectedSignal.resolution}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedSignal.status !== 'Resolved' && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">ROUTE TO TEAM</h3>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        {teams.map(team => (
                          <button
                            key={team.id}
                            onClick={() => handleAssign(team.id)}
                            disabled={selectedSignal.assignedTo === team.id}
                            className={`flex items-center justify-between p-3 rounded-lg border ${
                              selectedSignal.assignedTo === team.id
                                ? 'bg-blue-50 border-blue-200 text-blue-700'
                                : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            <div className="flex items-center">
                              <Users size={18} className="mr-2" />
                              <span>{team.name}</span>
                            </div>
                            {selectedSignal.assignedTo === team.id ? (
                              <span className="text-xs bg-blue-100 px-2 py-1 rounded-full">Assigned</span>
                            ) : (
                              <ArrowRight size={16} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedSignal.assignedTo && selectedSignal.status !== 'Resolved' && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">RESOLVE SIGNAL</h3>
                      <div className="mt-2">
                        <textarea 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter resolution details..."
                          rows={3}
                          id="resolution-text"
                        />
                        <div className="mt-2 flex justify-end">
                          <button
                            // onClick={() => handleResolve(document.getElementById('resolution-text').value)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Mark as Resolved
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <span>Signal detected on {new Date(selectedSignal.timestamp).toLocaleString()}</span>
                    {selectedSignal.severity === 'Critical' && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        <AlertCircle size={12} className="mr-1" />
                        Auto-escalated due to critical severity
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 bg-gray-50">
              <div className="text-center max-w-md mx-auto">
                <AlertTriangle size={48} className="mx-auto text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Select a signal to review</h3>
                <p className="mt-1 text-sm text-gray-500">
                  The Escalation Layer intelligently routes high-risk or ambiguous signals for human review,
                  ensuring appropriate attention to critical market perceptions.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EscalationLayer;