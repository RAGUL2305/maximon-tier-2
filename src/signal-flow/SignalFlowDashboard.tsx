import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bell, Clock, CheckCircle, AlertCircle, Plus, Settings, Search, Filter, Activity } from 'lucide-react';

export default function SignalFlowDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data for KPIs
  const kpiData = {
    activeJourneys: 12,
    triggersConfigured: 34,
    avgTriggerSuccessRate: 89
  };
  
  // Sample data for recent journeys
  const recentJourneys = [
    { id: 1, name: "Email Welcome Sequence", status: "Active", triggers: 5, steps: 8, lastUpdated: "2025-05-08" },
    { id: 2, name: "Post-Purchase Follow-up", status: "Active", triggers: 3, steps: 6, lastUpdated: "2025-05-07" },
    { id: 3, name: "Abandoned Cart Recovery", status: "Paused", triggers: 2, steps: 4, lastUpdated: "2025-05-05" },
    { id: 4, name: "Loyalty Program Onboarding", status: "Draft", triggers: 0, steps: 3, lastUpdated: "2025-05-04" },
    { id: 5, name: "Renewal Reminder Campaign", status: "Active", triggers: 4, steps: 7, lastUpdated: "2025-05-03" }
  ];
  
  // Sample data for chart
  const statusData = [
    { name: 'Active', value: 8 },
    { name: 'Paused', value: 3 },
    { name: 'Draft', value: 4 },
    { name: 'Completed', value: 5 },
  ];
  
  const performanceData = [
    { name: 'Day 1', triggers: 24, success: 21 },
    { name: 'Day 2', triggers: 18, success: 16 },
    { name: 'Day 3', triggers: 31, success: 28 },
    { name: 'Day 4', triggers: 42, success: 38 },
    { name: 'Day 5', triggers: 27, success: 25 },
    { name: 'Day 6', triggers: 35, success: 32 },
    { name: 'Day 7', triggers: 29, success: 27 },
  ];
  
  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Signal Flow Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <span className="font-medium">KM</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* KPI Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Journeys</p>
                <h2 className="text-3xl font-bold mt-1">{kpiData.activeJourneys}</h2>
              </div>
              <div className="bg-blue-100 p-2 rounded">
                <Activity className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Triggers Configured</p>
                <h2 className="text-3xl font-bold mt-1">{kpiData.triggersConfigured}</h2>
              </div>
              <div className="bg-green-100 p-2 rounded">
                <Bell className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Trigger Success Rate</p>
                <h2 className="text-3xl font-bold mt-1">{kpiData.avgTriggerSuccessRate}%</h2>
              </div>
              <div className="bg-purple-100 p-2 rounded">
                <CheckCircle className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Action Button */}
        <div className="flex mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <Plus size={18} className="mr-2" />
            <span>New Journey</span>
          </button>
        </div>
        
        {/* Dashboard Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-1 ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('journeys')}
              className={`pb-4 px-1 ${activeTab === 'journeys' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Journeys
            </button>
            <button 
              onClick={() => setActiveTab('triggers')}
              className={`pb-4 px-1 ${activeTab === 'triggers' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Triggers
            </button>
            <button 
              onClick={() => setActiveTab('monitor')}
              className={`pb-4 px-1 ${activeTab === 'monitor' ? 'border-b-2 border-blue-500 text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Signal Monitor
            </button>
          </nav>
        </div>
        
        {/* Dashboard Content */}
        {activeTab === 'overview' && (
          <div>
            {/* Journey Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Journey Status Overview</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#4F46E5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Trigger Performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="triggers" fill="#6366F1" />
                      <Bar dataKey="success" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Drift Alerts (Tier 2 feature) */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle size={20} className="text-amber-500 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Drift Warning</h3>
                  <p className="text-amber-700 text-sm">2 journeys have drifted beyond threshold</p>
                  <a href="#" className="text-amber-600 text-sm font-medium mt-1 inline-block hover:underline">View in Journey Validator</a>
                </div>
              </div>
            </div>
            
            {/* Recent Journeys Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">Recent Journeys</h3>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search journeys..." 
                        className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <button className="p-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                      <Filter size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Journey Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Triggers</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Steps</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentJourneys.map((journey) => (
                      <tr key={journey.id} className="hover:bg-gray-50 cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{journey.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${journey.status === 'Active' ? 'bg-green-100 text-green-800' : 
                              journey.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-gray-100 text-gray-800'}`}>
                            {journey.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{journey.triggers}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{journey.steps}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1 text-gray-400" />
                            {journey.lastUpdated}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Showing 5 of 20 journeys</div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-500 hover:bg-gray-50">Previous</button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-500 hover:bg-gray-50">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Other tabs would be implemented here */}
        {activeTab !== 'overview' && (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Coming Soon</h3>
            <p className="text-gray-600">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} view is under development</p>
          </div>
        )}
      </main>
    </div>
  );
}