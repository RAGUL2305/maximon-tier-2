import { AlertTriangle, Check, Info, PlusCircle, Save, Settings, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JourneyBuilder = () => {
  const [journeyName, setJourneyName] = useState('New Customer Onboarding');
  const [journeyDescription, setJourneyDescription] = useState('Welcome journey for new customers with personalized touchpoints');
  const [isGovernanceCompliant, setIsGovernanceCompliant] = useState(true);
  const [nodeCount, setNodeCount] = useState(3);
  const navigate = useNavigate();

  // Sample journey triggers
  const [triggers, setTriggers] = useState([
    { id: 1, name: 'Account Creation', type: 'Event', status: 'Active' },
    { id: 2, name: 'Profile Completion', type: 'Event', status: 'Active' }
  ]);

  // Sample journey nodes
  const [nodes] = useState([
    { id: 1, name: 'Welcome Email', type: 'Action', status: 'Active' },
    { id: 2, name: 'Wait 2 Days', type: 'Delay', status: 'Active' },
    { id: 3, name: 'Profile Complete?', type: 'Condition', status: 'Active' }
  ]);

  const handleSaveJourney = () => {
    alert('Journey saved successfully!');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Create/Edit Journey</h1>
            {isGovernanceCompliant ? (
              <span className="ml-3 flex items-center text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <Check size={14} className="mr-1" /> Compliant
              </span>
            ) : (
              <span className="ml-3 flex items-center text-sm text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                <AlertTriangle size={14} className="mr-1" /> Compliance Issues
              </span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Cancel
            </button>
            <button 
              className="px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 flex items-center"
              onClick={handleSaveJourney}
            >
              <Save size={16} className="mr-2" />
              Save Journey
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Properties Panel */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Journey Properties</h2>
          </div>
          <div className="p-4 space-y-4 overflow-y-auto">
            <div>
              <label htmlFor="journeyName" className="block text-sm font-medium text-gray-700">Journey Name</label>
              <input
                id="journeyName"
                type="text"
                value={journeyName}
                onChange={(e) => setJourneyName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="journeyDescription" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="journeyDescription"
                rows={3}
                value={journeyDescription}
                onChange={(e) => setJourneyDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            {/* Triggers Section */}
            <div className="border border-gray-200 rounded-md">
              <div className="px-4 py-3 bg-gray-50 flex justify-between items-center rounded-t-md">
                <h3 className="text-sm font-medium text-gray-700">Triggers</h3>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center">
                  <PlusCircle size={14} className="mr-1" /> Add
                </button>
              </div>
              <div className="p-3 max-h-40 overflow-y-auto">
                {triggers.map(trigger => (
                  <div key={trigger.id} className="flex justify-between items-center py-2 px-3 hover:bg-gray-50 rounded-md">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{trigger.name}</span>
                      <p className="text-xs text-gray-500">{trigger.type}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      trigger.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {trigger.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Journey Stats */}
            <div className="bg-gray-50 p-3 rounded-md">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Journey Overview</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-2 rounded border border-gray-200">
                  <p className="text-xs text-gray-500">Nodes</p>
                  <p className="text-lg font-semibold">{nodeCount}</p>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <p className="text-xs text-gray-500">Triggers</p>
                  <p className="text-lg font-semibold">{triggers.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 py-2 px-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <PlusCircle size={16} className="mr-1" /> Add Node
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Node Type:</span>
                <select className="block pl-3 pr-10 py-1.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Action</option>
                  <option>Condition</option>
                  <option>Delay</option>
                  <option>Email</option>
                  <option>SMS</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700"
              onClick={()=> navigate ("/dashboard/journeyvalidator")}
              >
                <Settings size={16} className="mr-1" /> Validator
              </button>
            </div>
          </div>

          {/* Canvas Area - Placeholder for the flowchart builder */}
          <div className="flex-1 bg-gray-100 p-4 overflow-auto relative">
            <div className="bg-white rounded-lg border border-gray-200 border-dashed flex items-center justify-center h-full">
              <div className="text-center p-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Flowchart Builder Area</h3>
                <p className="mt-1 text-sm text-gray-500">
                  This is a placeholder for the flowchart builder component.
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  The actual implementation would include a drag-and-drop interface for creating journey flows.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Node Properties */}
        <div className="w-72 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Node Properties</h2>
            <button className="text-gray-400 hover:text-gray-500">
              <X size={18} />
            </button>
          </div>
          <div className="p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Node Selection */}
              <div className="border border-gray-200 rounded-md">
                <div className="px-4 py-3 bg-gray-50 flex justify-between items-center rounded-t-md">
                  <h3 className="text-sm font-medium text-gray-700">Selected Node</h3>
                </div>
                <div className="p-3">
                  <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    {nodes.map(node => (
                      <option key={node.id} value={node.id}>{node.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Node Configuration */}
              <div>
                <label htmlFor="nodeName" className="block text-sm font-medium text-gray-700">Node Name</label>
                <input
                  id="nodeName"
                  type="text"
                  defaultValue="Welcome Email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="nodeType" className="block text-sm font-medium text-gray-700">Node Type</label>
                <select 
                  id="nodeType"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue="Action"
                >
                  <option>Action</option>
                  <option>Condition</option>
                  <option>Delay</option>
                  <option>Email</option>
                  <option>SMS</option>
                </select>
              </div>
              
              {/* Content Section */}
              <div>
                <label htmlFor="nodeContent" className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  id="nodeContent"
                  rows={4}
                  defaultValue="Welcome to our platform! We're excited to have you on board. Here's how to get started..."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              {/* Content Source */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Content Source</label>
                <div className="mt-1 flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Signal Studio</span>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                    Select Content
                  </button>
                </div>
              </div>
              
              {/* Memory Integration */}
              <div className="border border-gray-200 rounded-md">
                <div className="px-4 py-3 bg-gray-50 flex justify-between items-center rounded-t-md">
                  <h3 className="text-sm font-medium text-gray-700">Memory Hooks</h3>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center">
                    <PlusCircle size={14} className="mr-1" /> Add
                  </button>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-900">Brand Voice Guidelines</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                      Linked
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Governance Check */}
              <div className="bg-green-50 p-3 rounded-md flex items-start">
                <Info size={18} className="text-green-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Governance Check</h3>
                  <p className="text-xs text-green-700 mt-1">This node complies with brand voice and governance requirements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyBuilder;