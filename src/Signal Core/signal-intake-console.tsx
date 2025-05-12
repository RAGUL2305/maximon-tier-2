import { AlertTriangle, Calendar, CheckCircle, ChevronDown, Download, RefreshCw, Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SignalIntakeConsole = () => {
  // Mock data for the signals
  const [signals, setSignals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredSignals, setFilteredSignals] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [expandedRow, setExpandedRow] = useState(null);
  
  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      const mockSignals = [
        { id: 'SIG-1001', source: 'CRM', status: 'New', receivedAt: '2025-05-08T14:22:43', confidence: 87, metadata: { type: 'customer_upgrade', channel: 'web', segment: 'enterprise' } },
        { id: 'SIG-1002', source: 'Analytics', status: 'Mapped', receivedAt: '2025-05-09T10:15:22', confidence: 92, metadata: { type: 'conversion', channel: 'email', segment: 'mid-market' } },
        { id: 'SIG-1003', source: 'CDP', status: 'New', receivedAt: '2025-05-09T12:30:11', confidence: 76, metadata: { type: 'pageview', channel: 'mobile', segment: 'smb' } },
        { id: 'SIG-1004', source: 'CRM', status: 'Mapped', receivedAt: '2025-05-09T15:45:33', confidence: 95, metadata: { type: 'churn_risk', channel: 'web', segment: 'enterprise' } },
        { id: 'SIG-1005', source: 'Analytics', status: 'Failed', receivedAt: '2025-05-10T08:12:09', confidence: 45, metadata: { type: 'pageview', channel: 'mobile', segment: 'consumer' } },
        { id: 'SIG-1006', source: 'CDP', status: 'New', receivedAt: '2025-05-10T09:22:17', confidence: 89, metadata: { type: 'form_completion', channel: 'web', segment: 'mid-market' } },
        { id: 'SIG-1007', source: 'Journey', status: 'Mapped', receivedAt: '2025-05-10T11:05:51', confidence: 94, metadata: { type: 'email_open', channel: 'email', segment: 'enterprise' } },
        { id: 'SIG-1008', source: 'Journey', status: 'Failed', receivedAt: '2025-05-10T13:18:27', confidence: 38, metadata: { type: 'abandoned_cart', channel: 'web', segment: 'consumer' } }
      ];
      setSignals(mockSignals);
      setFilteredSignals(mockSignals);
      setLoading(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    // Filter signals based on search term and filters
    let results = signals;
    
    if (searchTerm.trim() !== '') {
      results = results.filter(signal => 
        signal.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'All') {
      results = results.filter(signal => signal.status === statusFilter);
    }
    
    if (sourceFilter !== 'All') {
      results = results.filter(signal => signal.source === sourceFilter);
    }
    
    setFilteredSignals(results);
  }, [searchTerm, statusFilter, sourceFilter, signals]);

  const getStatusColor = (status:any) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Mapped': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status:any) => {
    switch(status) {
      case 'New': return <AlertTriangle size={16} className="text-blue-800" />;
      case 'Mapped': return <CheckCircle size={16} className="text-green-800" />;
      case 'Failed': return <X size={16} className="text-red-800" />;
      default: return null;
    }
  };

  const handleRowClick = (index:any) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Signal Intake Console</h1>
        <div className="flex space-x-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <RefreshCw size={18} className="mr-2" />
            Refresh
          </button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center">
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search by Signal ID..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Mapped">Mapped</option>
              <option value="Failed">Failed</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-3 text-gray-500 pointer-events-none" />
          </div>
          
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              <option value="All">All Sources</option>
              <option value="CRM">CRM</option>
              <option value="Analytics">Analytics</option>
              <option value="CDP">CDP</option>
              <option value="Journey">Journey</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-3 text-gray-500 pointer-events-none" />
          </div>
          
          <button className="flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Calendar size={18} className="mr-2 text-gray-500" />
            <span>Date Range</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredSignals.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No signals found matching your filters.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signal ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source System</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received At</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSignals.map((signal, index) => (
                <React.Fragment key={signal.id}>
                  <tr 
                    className={`hover:bg-gray-50 cursor-pointer ${expandedRow === index ? 'bg-blue-50' : ''}`}
                    onClick={() => handleRowClick(index)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{signal.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{signal.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(signal.receivedAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(signal.status)}`}>
                        {getStatusIcon(signal.status)}
                        <span className="ml-1">{signal.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${signal.confidence > 80 ? 'bg-green-600' : signal.confidence > 60 ? 'bg-yellow-400' : 'bg-red-500'}`} 
                          style={{ width: `${signal.confidence}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">
                          <h3 className="font-medium text-gray-900 mb-2">Signal Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-gray-500">Type</p>
                              <p className="font-medium">{signal.metadata.type}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Channel</p>
                              <p className="font-medium">{signal.metadata.channel}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Segment</p>
                              <p className="font-medium">{signal.metadata.segment}</p>
                            </div>
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">Map Signal</button>
                            <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm">Export Details</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{filteredSignals.length}</span> of <span className="font-medium">{signals.length}</span> signals
        </div>
        <div className="flex space-x-2">
          <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
          <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default SignalIntakeConsole;