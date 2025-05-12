import React, { useState } from 'react';
import { Search, Filter, Calendar, RefreshCw, ChevronDown, ExternalLink, AlertCircle } from 'lucide-react';

const SignalIntakeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('Last 7 days');
  
  // Mock data for signals
  const signals = [
    { id: 'SIG-001', source: 'Twitter', collectedAt: '2025-05-09T14:30:00', status: 'New', confidence: 87 },
    { id: 'SIG-002', source: 'Customer Feedback', collectedAt: '2025-05-08T09:15:00', status: 'Scored', confidence: 92 },
    { id: 'SIG-003', source: 'Claude LLM', collectedAt: '2025-05-08T11:45:00', status: 'Routed', confidence: 78 },
    { id: 'SIG-004', source: 'Google Search', collectedAt: '2025-05-07T16:20:00', status: 'New', confidence: 85 },
    { id: 'SIG-005', source: 'Social Listening', collectedAt: '2025-05-07T13:10:00', status: 'Scored', confidence: 65 },
    { id: 'SIG-006', source: 'Customer Support', collectedAt: '2025-05-06T10:05:00', status: 'Routed', confidence: 89 },
    { id: 'SIG-007', source: 'GPT-4', collectedAt: '2025-05-05T15:30:00', status: 'New', confidence: 73 },
  ];
  
  // Filter signals based on search term and filters
  const filteredSignals = signals.filter(signal => {
    const matchesSearch = signal.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          signal.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || signal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  // Get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Scored': return 'bg-green-100 text-green-800';
      case 'Routed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Signal Intake List</h1>
        <div className="flex items-center space-x-2">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search bar */}
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search by Signal ID or Source"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Status filter */}
        <div className="relative w-48">
          <select
            className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Scored">Scored</option>
            <option value="Routed">Routed</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown size={18} />
          </div>
        </div>
        
        {/* Date filter */}
        <div className="relative w-48">
          <select
            className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 90 days">Last 90 days</option>
            <option value="Custom">Custom Range</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown size={18} />
          </div>
        </div>
      </div>

      {/* Signals table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Signal ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source System
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Collected At
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confidence
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSignals.map((signal) => (
              <tr key={signal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                  {signal.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {signal.source}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(signal.collectedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(signal.status)}`}>
                    {signal.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${signal.confidence >= 80 ? 'bg-green-500' : signal.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${signal.confidence}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-700">{signal.confidence}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                  <button className="text-indigo-600 hover:text-indigo-900">Process</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredSignals.length === 0 && (
        <div className="flex justify-center items-center p-8 text-gray-500">
          <AlertCircle className="mr-2" size={18} />
          No signals found matching your criteria
        </div>
      )}
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{filteredSignals.length}</span> of <span className="font-medium">{signals.length}</span> signals
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-gray-50">
              2
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </a>
            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SignalIntakeList;