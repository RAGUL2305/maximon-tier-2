import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, X, Plus, FileText, Send } from 'lucide-react';

const FallbackEscalationManager = () => {
  const [activeTab, setActiveTab] = useState('fallback');
  const [fallbackRules, setFallbackRules] = useState([
    { id: 1, trigger: 'Payment_Failure', action: 'Retry_Payment', status: 'Active' },
    { id: 2, trigger: 'Email_Bounce', action: 'SMS_Alternative', status: 'Active' },
    { id: 3, trigger: 'Content_Rejection', action: 'Default_Content', status: 'Inactive' }
  ]);
  
  const [escalationRules, setEscalationRules] = useState([
    { id: 1, trigger: 'Compliance_Issue', path: 'Legal_Team', priority: 'High', status: 'Active' },
    { id: 2, trigger: 'Negative_Sentiment', path: 'Customer_Support', priority: 'Medium', status: 'Active' },
    { id: 3, trigger: 'Security_Alert', path: 'Security_Team', priority: 'Critical', status: 'Active' }
  ]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRule, setNewRule] = useState({ trigger: '', action: '', path: '', priority: 'Medium' });
  const [expandedRule, setExpandedRule] = useState(null);
  
  const handleAddRule = () => {
    if (activeTab === 'fallback') {
      if (newRule.trigger && newRule.action) {
        setFallbackRules([
          ...fallbackRules, 
          { 
            id: fallbackRules.length + 1, 
            trigger: newRule.trigger, 
            action: newRule.action, 
            status: 'Active' 
          }
        ]);
      }
    } else {
      if (newRule.trigger && newRule.path) {
        setEscalationRules([
          ...escalationRules, 
          { 
            id: escalationRules.length + 1, 
            trigger: newRule.trigger, 
            path: newRule.path, 
            priority: newRule.priority, 
            status: 'Active' 
          }
        ]);
      }
    }
    setIsAddModalOpen(false);
    setNewRule({ trigger: '', action: '', path: '', priority: 'Medium' });
  };
  
  const toggleRuleStatus = (id, type) => {
    if (type === 'fallback') {
      setFallbackRules(fallbackRules.map(rule => 
        rule.id === id ? { ...rule, status: rule.status === 'Active' ? 'Inactive' : 'Active' } : rule
      ));
    } else {
      setEscalationRules(escalationRules.map(rule => 
        rule.id === id ? { ...rule, status: rule.status === 'Active' ? 'Inactive' : 'Active' } : rule
      ));
    }
  };
  
  const deleteRule = (id, type) => {
    if (type === 'fallback') {
      setFallbackRules(fallbackRules.filter(rule => rule.id !== id));
    } else {
      setEscalationRules(escalationRules.filter(rule => rule.id !== id));
    }
  };
  
  const toggleExpandRule = (id) => {
    setExpandedRule(expandedRule === id ? null : id);
  };
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Fallback & Escalation Manager</h1>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={18} className="mr-1" /> Add Rule
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'fallback' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('fallback')}
          >
            Fallback Rules
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'escalation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('escalation')}
          >
            Escalation Paths
          </button>
        </div>
      </div>
      
      {activeTab === 'fallback' ? (
        <div className="bg-white rounded-md shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trigger</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fallback Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fallbackRules.map((rule) => (
                <React.Fragment key={rule.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {rule.trigger}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rule.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          rule.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {rule.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => toggleExpandRule(rule.id)}
                        >
                          {expandedRule === rule.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                        <button 
                          className={`${rule.status === 'Active' ? 'text-green-600 hover:text-green-900' : 'text-gray-600 hover:text-gray-900'}`}
                          onClick={() => toggleRuleStatus(rule.id, 'fallback')}
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => deleteRule(rule.id, 'fallback')}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedRule === rule.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="4" className="px-6 py-4">
                        <div className="text-sm text-gray-700">
                          <div className="mb-3">
                            <span className="font-medium">Trigger Details:</span> When a {rule.trigger} event occurs in a journey
                          </div>
                          <div className="mb-3">
                            <span className="font-medium">Fallback Action:</span> System will automatically {rule.action.replace('_', ' ')}
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                              <FileText size={16} className="mr-1" /> View Log
                            </button>
                            <button className="inline-flex items-center px-3 py-1 border border-blue-300 text-sm leading-5 font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100">
                              <Send size={16} className="mr-1" /> Test Rule
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trigger</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Escalation Path</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {escalationRules.map((rule) => (
                <React.Fragment key={rule.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {rule.trigger}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rule.path}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          rule.priority === 'Critical' ? 'bg-red-100 text-red-800' : 
                          rule.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {rule.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          rule.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {rule.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => toggleExpandRule(rule.id)}
                        >
                          {expandedRule === rule.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                        <button 
                          className={`${rule.status === 'Active' ? 'text-green-600 hover:text-green-900' : 'text-gray-600 hover:text-gray-900'}`}
                          onClick={() => toggleRuleStatus(rule.id, 'escalation')}
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => deleteRule(rule.id, 'escalation')}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedRule === rule.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="5" className="px-6 py-4">
                        <div className="text-sm text-gray-700">
                          <div className="mb-3">
                            <span className="font-medium">Escalation Details:</span> When a {rule.trigger} is detected
                          </div>
                          <div className="mb-3">
                            <span className="font-medium">Escalation Path:</span> Issue will be routed to {rule.path.replace('_', ' ')}
                          </div>
                          <div className="mb-3">
                            <span className="font-medium">Priority Level:</span> {rule.priority}
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                              <FileText size={16} className="mr-1" /> View History
                            </button>
                            <button className="inline-flex items-center px-3 py-1 border border-blue-300 text-sm leading-5 font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100">
                              <Send size={16} className="mr-1" /> Test Escalation
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Add New {activeTab === 'fallback' ? 'Fallback Rule' : 'Escalation Path'}
              </h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setIsAddModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Trigger Event</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Payment_Failure"
                  value={newRule.trigger}
                  onChange={(e) => setNewRule({...newRule, trigger: e.target.value})}
                />
              </div>
              
              {activeTab === 'fallback' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fallback Action</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., Retry_Payment"
                    value={newRule.action}
                    onChange={(e) => setNewRule({...newRule, action: e.target.value})}
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Escalation Path</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., Legal_Team"
                      value={newRule.path}
                      onChange={(e) => setNewRule({...newRule, path: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                      className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={newRule.priority}
                      onChange={(e) => setNewRule({...newRule, priority: e.target.value})}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </>
              )}
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleAddRule}
                >
                  Add Rule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">About Fallback & Escalation Manager</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>This T2 feature handles exception management in journey orchestration:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Fallback rules define automated actions when expected paths fail</li>
                <li>Escalation paths route high-risk or ambiguous signals for human review</li>
                <li>AI identifies exceptions and routes to humans when needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FallbackEscalationManager;