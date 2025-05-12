import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingUp, Filter, Download, RefreshCw, Eye, ExternalLink, Bell } from 'lucide-react';

const DriftInsightDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7days');
  const [filterSource, setFilterSource] = useState('all');
  
  // Mock data for demonstration
  const driftData = [
    { date: 'Jan 01', driftScore: 12, threshold: 20, signals: 32 },
    { date: 'Jan 02', driftScore: 18, threshold: 20, signals: 45 },
    { date: 'Jan 03', driftScore: 24, threshold: 20, signals: 38 },
    { date: 'Jan 04', driftScore: 16, threshold: 20, signals: 41 },
    { date: 'Jan 05', driftScore: 22, threshold: 20, signals: 52 },
    { date: 'Jan 06', driftScore: 27, threshold: 20, signals: 47 },
    { date: 'Jan 07', driftScore: 19, threshold: 20, signals: 36 },
  ];
  
  const insightData = [
    { date: 'Jan 01', positiveSignals: 22, negativeSignals: 10, neutralSignals: 15 },
    { date: 'Jan 02', positiveSignals: 25, negativeSignals: 12, neutralSignals: 18 },
    { date: 'Jan 03', positiveSignals: 18, negativeSignals: 16, neutralSignals: 14 },
    { date: 'Jan 04', positiveSignals: 28, negativeSignals: 9, neutralSignals: 17 },
    { date: 'Jan 05', positiveSignals: 32, negativeSignals: 13, neutralSignals: 19 },
    { date: 'Jan 06', positiveSignals: 24, negativeSignals: 15, neutralSignals: 20 },
    { date: 'Jan 07', positiveSignals: 29, negativeSignals: 11, neutralSignals: 16 },
  ];
  
  const alertsList = [
    { id: 1, type: 'drift', message: 'Brand tone drift detected in social media signals', severity: 'high', date: 'Jan 06' },
    { id: 2, type: 'perception', message: 'Negative perception shift in product reviews', severity: 'medium', date: 'Jan 05' },
    { id: 3, type: 'insight', message: 'Emerging trend detected in customer feedback', severity: 'low', date: 'Jan 04' },
    { id: 4, type: 'drift', message: 'Visual brand elements misalignment in LLM responses', severity: 'high', date: 'Jan 03' },
  ];
  
  const signalSourceData = [
    { name: 'Social Media', value: 35 },
    { name: 'Search', value: 25 },
    { name: 'LLMs', value: 20 },
    { name: 'Reviews', value: 15 },
    { name: 'Forums', value: 5 },
  ];
  
  const renderDateRangeSelector = () => (
    <div className="mb-4">
      <label className="mr-2 text-sm font-medium">Date Range:</label>
      <select 
        value={dateRange} 
        onChange={(e) => setDateRange(e.target.value)}
        className="bg-white border border-gray-300 rounded px-3 py-1 text-sm"
      >
        <option value="7days">Last 7 Days</option>
        <option value="30days">Last 30 Days</option>
        <option value="90days">Last 90 Days</option>
        <option value="custom">Custom Range</option>
      </select>
    </div>
  );
  
  const renderSourceFilter = () => (
    <div className="mb-4 ml-4">
      <label className="mr-2 text-sm font-medium">Signal Source:</label>
      <select 
        value={filterSource} 
        onChange={(e) => setFilterSource(e.target.value)}
        className="bg-white border border-gray-300 rounded px-3 py-1 text-sm"
      >
        <option value="all">All Sources</option>
        <option value="social">Social Media</option>
        <option value="search">Search</option>
        <option value="llm">LLMs</option>
        <option value="reviews">Reviews</option>
      </select>
    </div>
  );
  
  const renderOverviewTab = () => (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-700">Drift Score</h3>
            <span className={`px-2 py-1 rounded text-xs font-medium ${driftData[driftData.length-1].driftScore > driftData[driftData.length-1].threshold ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {driftData[driftData.length-1].driftScore > driftData[driftData.length-1].threshold ? 'Above Threshold' : 'Normal'}
            </span>
          </div>
          <div className="flex items-end">
            <div className="text-3xl font-bold">{driftData[driftData.length-1].driftScore}</div>
            <div className="text-sm text-gray-500 ml-2 mb-1">/ {driftData[driftData.length-1].threshold} threshold</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-700 mb-2">Signals Collected</h3>
          <div className="flex items-end">
            <div className="text-3xl font-bold">{driftData.reduce((sum, item) => sum + item.signals, 0)}</div>
            <div className="text-sm text-gray-500 ml-2 mb-1">last {dateRange === '7days' ? '7' : dateRange === '30days' ? '30' : '90'} days</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-700 mb-2">Perception Trend</h3>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-green-600">+14%</div>
            <TrendingUp className="ml-2 text-green-600" size={20} />
          </div>
          <div className="text-sm text-gray-500">Positive perception</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700">Drift Score Trend</h3>
            <div className="flex items-center">
              <button className="p-1 hover:bg-gray-100 rounded">
                <RefreshCw size={16} />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded ml-2">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={driftData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="driftScore" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="threshold" stroke="#ff7300" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700">Signal Distribution</h3>
            <div className="flex items-center">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Filter size={16} />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded ml-2">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="positiveSignals" fill="#4ade80" />
                <Bar dataKey="negativeSignals" fill="#f87171" />
                <Bar dataKey="neutralSignals" fill="#93c5fd" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700">Recent Alerts</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline flex items-center">
              View All <ExternalLink size={14} className="ml-1" />
            </button>
          </div>
          <div className="overflow-y-auto max-h-64">
            {alertsList.map(alert => (
              <div key={alert.id} className="border-b border-gray-100 py-3 last:border-0">
                <div className="flex items-start">
                  <div className={`p-1 rounded-full mt-0.5 ${
                    alert.severity === 'high' ? 'bg-red-100' : 
                    alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <AlertTriangle size={16} className={
                      alert.severity === 'high' ? 'text-red-500' : 
                      alert.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                    } />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium">{alert.message}</div>
                    <div className="text-xs text-gray-500 flex mt-1">
                      <span className="capitalize">{alert.type}</span>
                      <span className="mx-1">•</span>
                      <span>{alert.date}</span>
                      <span className="mx-1">•</span>
                      <span className="capitalize">{alert.severity} severity</span>
                    </div>
                  </div>
                  <button className="ml-auto p-1 hover:bg-gray-100 rounded">
                    <Eye size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700">Signal Sources</h3>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Filter size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {signalSourceData.map(source => (
              <div key={source.name} className="flex items-center">
                <div className="w-36 truncate">{source.name}</div>
                <div className="flex-grow h-2 bg-gray-100 rounded-full mx-2">
                  <div 
                    className="h-full rounded-full bg-blue-500" 
                    style={{ width: `${source.value}%` }} 
                  />
                </div>
                <div className="w-8 text-right text-sm text-gray-600">{source.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderDriftAnalysisTab = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Drift Analysis</h3>
      <p className="text-gray-600 mb-4">This feature provides detailed analysis of brand perception drift across channels.</p>
      <div className="bg-gray-50 p-12 rounded flex items-center justify-center">
        <p className="text-gray-500">Detailed drift analysis view will be displayed here</p>
      </div>
    </div>
  );
  
  const renderInsightsTab = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Insights Manager</h3>
      <p className="text-gray-600 mb-4">View and manage detected insights from external signals.</p>
      <div className="bg-gray-50 p-12 rounded flex items-center justify-center">
        <p className="text-gray-500">Insights management interface will be displayed here</p>
      </div>
    </div>
  );
  
  const renderReportsTab = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Reports & Exports</h3>
      <p className="text-gray-600 mb-4">Generate and download reports from your drift and insight data.</p>
      <div className="bg-gray-50 p-12 rounded flex items-center justify-center">
        <p className="text-gray-500">Reporting interface will be displayed here</p>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Drift & Insight Dashboard</h1>
        <p className="text-gray-600">Monitor brand perception trends and detect drift across channels</p>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {renderDateRangeSelector()}
          {renderSourceFilter()}
        </div>
        
        <div className="flex items-center">
          <button className="flex items-center bg-white border border-gray-300 rounded px-3 py-1.5 text-sm font-medium hover:bg-gray-50 mr-3">
            <RefreshCw size={14} className="mr-1.5" />
            Refresh
          </button>
          
          <button className="flex items-center bg-white border border-gray-300 rounded px-3 py-1.5 text-sm font-medium hover:bg-gray-50 mr-3">
            <Download size={14} className="mr-1.5" />
            Export
          </button>
          
          <button className="flex items-center bg-white border border-gray-300 rounded px-3 py-1.5 text-sm font-medium hover:bg-gray-50">
            <Bell size={14} className="mr-1.5" />
            Set Alerts
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            
            <button
              onClick={() => setActiveTab('drift')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'drift'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Drift Analysis
            </button>
            
            <button
              onClick={() => setActiveTab('insights')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'insights'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Insights
            </button>
            
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Reports
            </button>
          </nav>
        </div>
      </div>
      
      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'drift' && renderDriftAnalysisTab()}
      {activeTab === 'insights' && renderInsightsTab()}
      {activeTab === 'reports' && renderReportsTab()}
    </div>
  );
};

export default DriftInsightDashboard;
