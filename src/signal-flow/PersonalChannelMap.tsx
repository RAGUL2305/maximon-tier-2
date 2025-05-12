import { useState } from 'react';
import { AlertCircle, CheckCircle, PlusCircle, Save, ChevronDown, Edit, Trash2, Play, Pause } from 'lucide-react';

const TriggerConfigurator = () => {
  const [triggers, setTriggers] = useState([
    {
      id: 1,
      name: 'Email Opened',
      eventSource: 'Signal Studio',
      condition: 'User opens marketing email',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Purchase Completed',
      eventSource: 'SignalScope',
      condition: 'User completes purchase flow',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Cart Abandonment',
      eventSource: 'Signal Flow',
      condition: 'User leaves checkout with items',
      status: 'Inactive'
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentTrigger, setCurrentTrigger] = useState({
    id: null,
    name: '',
    eventSource: 'Signal Studio',
    condition: '',
    status: 'Active'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [validationError, setValidationError] = useState('');

  const eventSources = ['Signal Studio', 'SignalScope', 'Signal Flow', 'CDP', 'CRM'];

  const openModal = (trigger = null) => {
    if (trigger) {
      setCurrentTrigger({...trigger});
      setIsEditing(true);
    } else {
      setCurrentTrigger({
        id: triggers.length > 0 ? Math.max(...triggers.map(t => t.id)) + 1 : 1,
        name: '',
        eventSource: 'Signal Studio',
        condition: '',
        status: 'Active'
      });
      setIsEditing(false);
    }
    setValidationError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setValidationError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTrigger(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveChanges = () => {
    // Validation
    if (!currentTrigger.name.trim()) {
      setValidationError('Trigger name is required');
      return;
    }
    
    if (!currentTrigger.condition.trim()) {
      setValidationError('Condition is required');
      return;
    }
    
    // Check for duplicate names
    const isDuplicate = triggers.some(t => 
      t.name.toLowerCase() === currentTrigger.name.toLowerCase() && 
      t.id !== currentTrigger.id
    );
    
    if (isDuplicate) {
      setValidationError('A trigger with this name already exists');
      return;
    }

    if (isEditing) {
      setTriggers(prev => prev.map(t => t.id === currentTrigger.id ? currentTrigger : t));
    } else {
      setTriggers(prev => [...prev, currentTrigger]);
    }
    
    closeModal();
  };

  const deleteTrigger = (id) => {
    setTriggers(prev => prev.filter(t => t.id !== id));
  };

  const toggleStatus = (id) => {
    setTriggers(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: t.status === 'Active' ? 'Inactive' : 'Active'
        };
      }
      return t;
    }));
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Trigger Configurator</h1>
          <p className="text-gray-600">Define event conditions from CDP, CRM, and behavior events</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="mr-2 w-5 h-5" />
          Add Trigger
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <div className="w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <div className="relative">
            <select 
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
        
        <div className="w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Source</label>
          <div className="relative">
            <select 
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
            >
              <option value="all">All Sources</option>
              {eventSources.map(source => (
                <option key={source} value={source.toLowerCase()}>{source}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Triggers Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {triggers.map(trigger => (
              <tr key={trigger.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{trigger.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {trigger.eventSource}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{trigger.condition}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {trigger.status === 'Active' ? (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 flex items-center w-fit">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 flex items-center w-fit">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => toggleStatus(trigger.id)} 
                      className="text-gray-600 hover:text-blue-600"
                      title={trigger.status === 'Active' ? 'Deactivate' : 'Activate'}
                    >
                      {trigger.status === 'Active' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button 
                      onClick={() => openModal(trigger)} 
                      className="text-gray-600 hover:text-blue-600"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => deleteTrigger(trigger.id)} 
                      className="text-gray-600 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {triggers.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No triggers configured. Click "Add Trigger" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions (Tier 2 feature) */}
      {triggers.length > 0 && (
        <div className="mt-4 flex items-center space-x-4">
          <span className="text-sm text-gray-500">Bulk Actions:</span>
          <button className="text-sm text-blue-600 hover:text-blue-800">Enable Selected</button>
          <button className="text-sm text-blue-600 hover:text-blue-800">Disable Selected</button>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div 
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {isEditing ? 'Edit Trigger' : 'Create New Trigger'}
                </h3>
                
                {validationError && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start">
                    <AlertCircle className="w-5 h-5 mr-2 mt-0.5" />
                    <span>{validationError}</span>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trigger Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={currentTrigger.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter trigger name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Source
                    </label>
                    <select
                      name="eventSource"
                      value={currentTrigger.eventSource}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {eventSources.map(source => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Condition <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="condition"
                      value={currentTrigger.condition}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter trigger condition"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="Active"
                          checked={currentTrigger.status === 'Active'}
                          onChange={handleInputChange}
                          className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Active</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value="Inactive"
                          checked={currentTrigger.status === 'Inactive'}
                          onChange={handleInputChange}
                          className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Inactive</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={saveChanges}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TriggerConfigurator;