import { AlertCircle, ChevronDown, ChevronUp, Clock, PlayCircle, Sliders, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const SimulationStudio = () => {
  const [activeTab, setActiveTab] = useState('configure');
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState('scenario1');
  const [scenarioConfig, setScenarioConfig] = useState({
    audienceSize: 50000,
    conversionThreshold: 3.2,
    timeframe: 30,
    optimizationGoal: 'revenue'
  });

  // Mock scenarios
  const scenarios = {
    scenario1: { name: 'Product Launch Campaign', description: 'Optimize for new product awareness and initial purchases' },
    scenario2: { name: 'Retention Strategy', description: 'Focus on existing customers and upsell opportunities' },
    scenario3: { name: 'Brand Awareness', description: 'Maximize reach and engagement across channels' }
  };

  // Mock historical data
  const historicalData = [
    { day: '01/04', revenue: 4200, conversions: 120, ctr: 2.8 },
    { day: '02/04', revenue: 3800, conversions: 108, ctr: 2.5 },
    { day: '03/04', revenue: 4100, conversions: 115, ctr: 2.7 },
    { day: '04/04', revenue: 4500, conversions: 130, ctr: 3.0 },
    { day: '05/04', revenue: 4300, conversions: 122, ctr: 2.9 }
  ];

  // Mock simulation results
  const simulationResults = [
    { 
      id: 1, 
      name: 'Base Scenario', 
      predictedRevenue: 54000, 
      conversionRate: 3.1, 
      riskScore: 'Low',
      confidenceScore: 85,
      data: [
        { day: '06/04', revenue: 4400, conversions: 125, ctr: 2.9 },
        { day: '07/04', revenue: 4500, conversions: 130, ctr: 3.0 },
        { day: '08/04', revenue: 4600, conversions: 133, ctr: 3.1 },
        { day: '09/04', revenue: 4700, conversions: 138, ctr: 3.2 },
        { day: '10/04', revenue: 4800, conversions: 142, ctr: 3.3 }
      ]
    },
    { 
      id: 2, 
      name: 'Aggressive Optimization', 
      predictedRevenue: 61000, 
      conversionRate: 3.5, 
      riskScore: 'Medium',
      confidenceScore: 72,
      data: [
        { day: '06/04', revenue: 4600, conversions: 132, ctr: 3.1 },
        { day: '07/04', revenue: 4900, conversions: 140, ctr: 3.3 },
        { day: '08/04', revenue: 5200, conversions: 148, ctr: 3.4 },
        { day: '09/04', revenue: 5600, conversions: 160, ctr: 3.6 },
        { day: '10/04', revenue: 6000, conversions: 170, ctr: 3.8 }
      ]
    },
    { 
      id: 3, 
      name: 'Conservative Approach', 
      predictedRevenue: 49000, 
      conversionRate: 2.9, 
      riskScore: 'Very Low',
      confidenceScore: 91,
      data: [
        { day: '06/04', revenue: 4300, conversions: 122, ctr: 2.8 },
        { day: '07/04', revenue: 4300, conversions: 122, ctr: 2.8 },
        { day: '08/04', revenue: 4400, conversions: 125, ctr: 2.9 },
        { day: '09/04', revenue: 4400, conversions: 125, ctr: 2.9 },
        { day: '10/04', revenue: 4500, conversions: 130, ctr: 3.0 }
      ]
    }
  ];

  // Handle scenario selection
  const handleScenarioChange = (e:any) => {
    setSelectedScenario(e.target.value);
  };

  // Handle config changes
  const handleConfigChange = (e:any) => {
    const { name, value } = e.target;
    setScenarioConfig({
      ...scenarioConfig,
      [name]: name === 'audienceSize' || name === 'timeframe' ? parseInt(value) : parseFloat(value)
    });
  };

  // Run simulation
  const runSimulation = () => {
    setIsRunning(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setIsRunning(false);
      setShowResults(true);
      setActiveTab('results');
    }, 2000);
  };

  // Reset simulation
  const resetSimulation = () => {
    setShowResults(false);
    setActiveTab('configure');
    setExpanded(null);
  };

  // Toggle expanded result
  const toggleExpanded = (id: any) => {
    setExpanded(expanded === id ? null : id);
  };

  const getRiskColor = (risk:any) => {
    switch(risk) {
      case 'Very Low': return 'bg-green-100 text-green-800';
      case 'Low': return 'bg-green-50 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Very High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Simulation Studio</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">SignalCore Module</span>
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Tier 2</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button 
          onClick={() => setActiveTab('configure')}
          className={`px-4 py-2 font-medium ${activeTab === 'configure' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Configure
        </button>
        <button 
          onClick={() => setActiveTab('historical')}
          className={`px-4 py-2 font-medium ${activeTab === 'historical' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Historical Data
        </button>
        <button 
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2 font-medium ${activeTab === 'results' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          disabled={!showResults}
        >
          Results
        </button>
      </div>

      {/* Configuration Tab */}
      {activeTab === 'configure' && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <Sliders className="mr-2 h-5 w-5 text-blue-600" />
              Scenario Configuration
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Scenario Template</label>
              <select 
                value={selectedScenario}
                onChange={handleScenarioChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {Object.entries(scenarios).map(([key, scenario]) => (
                  <option key={key} value={key}>{scenario.name}</option>
                ))}
              </select>
              {/* <p className="mt-1 text-sm text-gray-500">{scenarios[selectedScenario]?.description}</p> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience Size</label>
                <input 
                  type="number" 
                  name="audienceSize"
                  value={scenarioConfig.audienceSize}
                  onChange={handleConfigChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conversion Threshold (%)</label>
                <input 
                  type="number" 
                  name="conversionThreshold"
                  value={scenarioConfig.conversionThreshold}
                  onChange={handleConfigChange}
                  step="0.1"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe (days)</label>
                <input 
                  type="number" 
                  name="timeframe"
                  value={scenarioConfig.timeframe}
                  onChange={handleConfigChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Optimization Goal</label>
                <select 
                  name="optimizationGoal"
                  value={scenarioConfig.optimizationGoal}
                  onChange={handleConfigChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="revenue">Revenue</option>
                  <option value="conversions">Conversions</option>
                  <option value="engagement">Engagement</option>
                  <option value="reach">Reach</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <AlertCircle className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  AI will simulate performance based on historical data and your configuration. Results include predicted outcomes and confidence scores.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isRunning ? (
                <>
                  <Clock className="mr-2 h-5 w-5 animate-spin" />
                  Running Simulation...
                </>
              ) : (
                <>
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Run Simulation
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Historical Data Tab */}
      {activeTab === 'historical' && (
        <div>
          <h2 className="text-lg font-medium text-gray-800 mb-4">Historical Performance Data</h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue ($)" />
                  <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} name="Conversions" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR (%)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {historicalData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.day}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.conversions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.ctr}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && showResults && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-800">Simulation Results</h2>
            <button
              onClick={resetSimulation}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Reset Simulation
            </button>
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {simulationResults.map((result) => (
              <div 
                key={result.id} 
                className={`bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${expanded === result.id ? 'col-span-full' : ''}`}
              >
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800">{result.name}</h3>
                    <button 
                      onClick={() => toggleExpanded(result.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {expanded === result.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Predicted Revenue</p>
                      <p className="text-lg font-semibold text-gray-900">${result.predictedRevenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Conversion Rate</p>
                      <p className="text-lg font-semibold text-gray-900">{result.conversionRate}%</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(result.riskScore)}`}>
                        {result.riskScore} Risk
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Confidence:</span> 
                      <span className="ml-1 font-medium">{result.confidenceScore}%</span>
                    </div>
                  </div>

                  {expanded === result.id && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 mb-2">Projected Performance</h4>
                      <div className="h-64 mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={result.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue ($)" />
                            <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} name="Conversions" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-md">
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1 text-blue-600" />
                          AI Insights
                        </h4>
                        <p className="text-sm text-gray-600">
                          {result.id === 1 && "This approach maintains current trajectory with minimal risk. Recommended for stable markets."}
                          {result.id === 2 && "Higher potential returns but increased volatility. Consider testing with a segment before full rollout."}
                          {result.id === 3 && "Most predictable outcome with high confidence. Best for compliance-sensitive contexts or regulated industries."}
                        </p>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <button className="px-3 py-1 text-sm mr-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                          Export
                        </button>
                        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                          Apply Strategy
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-4 rounded-md flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <AlertCircle className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Simulation Guidance</h3>
              <p className="mt-1 text-sm text-blue-700">
                These results are predictions based on historical data and AI models. Human review is recommended before implementing any strategy. 
                The confidence score indicates the AI's certainty in the prediction based on available data.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t text-sm text-gray-500">
        <p>Part of SignalCore (Revenue Intelligence) - Tier 2 features</p>
        <p>Version 1.0.2 • Last updated: May 9, 2025</p>
      </div>
    </div>
  );
};

export default SimulationStudio;