import { useState } from 'react';
import { ArrowRight, AlertTriangle, CheckCircle, AlertCircle, Filter, Send, Settings, Bell } from 'lucide-react';

const InsightRouter = () => {
  const [insights, setInsights] = useState([
    { id: 1, title: "Negative sentiment detected on product launch", source: "Social Media", severity: "high", status: "pending", destination: "" },
    { id: 2, title: "Brand mention in competitor analysis", source: "Market Research", severity: "medium", status: "pending", destination: "" },
    { id: 3, title: "Positive reception of latest campaign", source: "Customer Feedback", severity: "low", status: "pending", destination: "" },
    { id: 4, title: "Sentiment shift on sustainability messaging", source: "LLM Perception", severity: "medium", status: "pending", destination: "" },
    { id: 5, title: "Potential brand confusion in market survey", source: "Market Research", severity: "high", status: "pending", destination: "" }
  ]);

  const destinations = [
    { id: "content", name: "Content Team", description: "For messaging and content adjustments" },
    { id: "product", name: "Product Team", description: "For product-related insights" },
    { id: "social", name: "Social Media Team", description: "For social response and management" },
    { id: "exec", name: "Executive Team", description: "For high-level strategic insights" },
    { id: "memory", name: "Memory Loom", description: "For brand knowledge updates" }
  ];

  const handleRouteInsight = (insightId, destination) => {
    setInsights(insights.map(insight => 
      insight.id === insightId 
        ? { ...insight, status: "routed", destination } 
        : insight
    ));
  };

  // Filter settings
  const [filters, setFilters] = useState({
    severity: "",
    source: ""
  });

  const handleFilterChange = (filterType, value) => {
    setFilters({...filters, [filterType]: value});
  };

  const filteredInsights = insights.filter(insight => {
    if (filters.severity && insight.severity !== filters.severity) return false;
    if (filters.source && insight.source !== filters.source) return false;
    return true;
  });

  // Get unique sources for filter dropdown
  const sources = [...new Set(insights.map(insight => insight.source))];

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'high': return <AlertTriangle className="text-red-500" />;
      case 'medium': return <AlertCircle className="text-yellow-500" />;
      case 'low': return <CheckCircle className="text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Insight Router</h1>
          <p className="text-gray-600">Direct validated signals to appropriate teams and systems</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 bg-gray-100 rounded-full">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button className="p-2 bg-gray-100 rounded-full">
            <Settings size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Filter controls */}
      <div className="flex items-center mb-4 p-4 bg-gray-50 rounded-lg">
        <Filter size={20} className="text-gray-500 mr-2" />
        <span className="mr-2 font-medium">Filter:</span>
        
        <select 
          className="mr-4 p-2 border rounded-md"
          value={filters.severity}
          onChange={(e) => handleFilterChange('severity', e.target.value)}
        >
          <option value="">All Severities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        
        <select
          className="p-2 border rounded-md"
          value={filters.source}
          onChange={(e) => handleFilterChange('source', e.target.value)}
        >
          <option value="">All Sources</option>
          {sources.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
      </div>

      {/* Insights table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Insight</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Source</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Severity</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Destination</th>
              <th className="py-3 px-4 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInsights.length > 0 ? (
              filteredInsights.map(insight => (
                <tr key={insight.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{insight.title}</td>
                  <td className="py-3 px-4">{insight.source}</td>
                  <td className="py-3 px-4 flex items-center">
                    {getSeverityIcon(insight.severity)}
                    <span className="ml-2 capitalize">{insight.severity}</span>
                  </td>
                  <td className="py-3 px-4">
                    {insight.status === "routed" ? (
                      <span className="font-medium">
                        {destinations.find(d => d.id === insight.destination)?.name || insight.destination}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">Not routed</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {insight.status === "pending" ? (
                      <div className="flex">
                        <select 
                          className="p-1 border rounded mr-2"
                          defaultValue=""
                          onChange={(e) => e.target.value && handleRouteInsight(insight.id, e.target.value)}
                        >
                          <option value="" disabled>Select destination</option>
                          {destinations.map(dest => (
                            <option key={dest.id} value={dest.id}>{dest.name}</option>
                          ))}
                        </select>
                        <button 
                          className="bg-blue-500 text-white p-1 rounded flex items-center disabled:opacity-50"
                          disabled={true}
                        >
                          <Send size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Routed
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                  No insights match the current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Destination Panels */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map(dest => (
            <div key={dest.id} className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg">{dest.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{dest.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {insights.filter(i => i.destination === dest.id).length} insights routed
                </span>
                {insights.filter(i => i.destination === dest.id).length > 0 && (
                  <ArrowRight size={16} className="text-blue-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightRouter;