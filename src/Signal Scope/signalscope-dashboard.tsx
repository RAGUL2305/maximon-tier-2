import { Eye, Filter, MessageSquare, RefreshCw, Search } from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SignalIntakeList from "./signal-intake-list";
import MemoryLookupConsole from "./memory-lookup-console";
import InsightRouter from "./insight-router";
import { useNavigate } from "react-router-dom";

const SignalScope = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  // Mock data
  const signalData = [
    { name: "Jan", signals: 65, insights: 42 },
    { name: "Feb", signals: 59, insights: 35 },
    { name: "Mar", signals: 80, insights: 55 },
    { name: "Apr", signals: 81, insights: 66 },
    { name: "May", signals: 56, insights: 47 },
    { name: "Jun", signals: 55, insights: 41 },
    { name: "Jul", signals: 72, insights: 52 },
  ];

  const recentSignals = [
    {
      id: "SIG-1243",
      source: "Twitter",
      content: "Negative sentiment about pricing model",
      score: 87,
      status: "Escalated",
    },
    {
      id: "SIG-1242",
      source: "Review Site",
      content: "Feature request trending in community",
      score: 76,
      status: "Routed",
    },
    {
      id: "SIG-1241",
      source: "Support",
      content: "Confusion on product messaging",
      score: 65,
      status: "Pending",
    },
    {
      id: "SIG-1240",
      source: "Claude",
      content: "Brand hallucination detected in AI output",
      score: 92,
      status: "Escalated",
    },
    {
      id: "SIG-1239",
      source: "Search",
      content: "New search trend related to product",
      score: 54,
      status: "Processed",
    },
  ];

  const signalTypes = [
    { name: "Social Media", value: 35 },
    { name: "AI/LLM", value: 25 },
    { name: "Search", value: 20 },
    { name: "Reviews", value: 15 },
    { name: "Support", value: 5 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const entities = [
    { name: "Product Name", mentions: 145, sentiment: 3.7 },
    { name: "Feature X", mentions: 89, sentiment: 4.2 },
    { name: "Feature Y", mentions: 56, sentiment: 2.8 },
    { name: "Competitor A", mentions: 34, sentiment: 3.1 },
    { name: "Industry Term", mentions: 112, sentiment: 3.9 },
  ];

  const driftAlerts = [
    {
      id: "DFT-421",
      entity: "Product Feature",
      expectedPerception: "Easy to use",
      actualPerception: "Complex UI",
      confidence: 87,
    },
    {
      id: "DFT-420",
      entity: "Brand Value",
      expectedPerception: "Reliable",
      actualPerception: "Occasional downtime issues",
      confidence: 73,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">SignalScope</h1>
            <p className="text-sm text-gray-500">
              Marketing Intelligence Engine
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
              <Bell size={20} />
            </button> */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search signals..."
                className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                className="absolute left-2 top-2.5 text-gray-400"
                size={16}
              />
            </div>
            {/* <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              US
            </div> */}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <nav className="flex px-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("signals")}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === "signals"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Signal Intake
            </button>
            <button
              onClick={() => setActiveTab("memory")}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === "memory"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Memory Lookup
            </button>
            <button
              onClick={() => setActiveTab("insights")}
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === "insights"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Insight Router
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Signals Collected
                    </p>
                    <p className="text-2xl font-bold mt-1">1,248</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    +12.4%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  vs previous 30 days
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Signals Scored
                    </p>
                    <p className="text-2xl font-bold mt-1">1,105</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    +8.2%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  88.5% processing rate
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Insights Routed
                    </p>
                    <p className="text-2xl font-bold mt-1">876</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    +15.3%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  79.3% actionable rate
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Avg. Signal Score
                    </p>
                    <p className="text-2xl font-bold mt-1">68.5</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    -2.1%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-4">Threshold: 65.0</p>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Signal Activity
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100">
                      <Filter size={16} />
                    </button>
                    <button className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100">
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={signalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="signals"
                        stroke="#3B82F6"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="insights"
                        stroke="#10B981"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Signal Sources
                  </h2>
                  <button className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100">
                    <Filter size={16} />
                  </button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={signalTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {signalTypes.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Alerts and Recent Signals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Drift Alerts
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {driftAlerts.length} Active
                  </span>
                </div>

                <div className="space-y-4">
                  {driftAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="border-l-4 border-red-500 pl-4 py-2"
                    >
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {alert.entity}
                        </p>
                        <span className="text-xs text-gray-500">
                          Confidence: {alert.confidence}%
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm">
                        <span className="text-gray-500">Expected:</span>
                        <span className="ml-1 font-medium">
                          {alert.expectedPerception}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm">
                        <span className="text-gray-500">Actual:</span>
                        <span className="ml-1 font-medium text-red-600">
                          {alert.actualPerception}
                        </span>
                      </div>
                      <div className="mt-2 flex space-x-2">
                        <button className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
                          Review
                        </button>
                        <button className="px-2 py-1 text-xs font-medium bg-gray-50 text-gray-700 rounded hover:bg-gray-100">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800">
                  View all alerts
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Recent Signals
                  </h2>
                  <button className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100">
                    <RefreshCw size={16} />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Source
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Content
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score
                        </th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentSignals.map((signal) => (
                        <tr key={signal.id}>
                          <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {signal.id}
                          </td>
                          <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
                            {signal.source}
                          </td>
                          <td className="px-2 py-3 text-sm text-gray-500">
                            {signal.content}
                          </td>
                          <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500">
                            {signal.score}
                          </td>
                          <td className="px-2 py-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                signal.status === "Escalated"
                                  ? "bg-red-100 text-red-800"
                                  : signal.status === "Routed"
                                  ? "bg-green-100 text-green-800"
                                  : signal.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {signal.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800">
                  View all signals
                </button>
              </div>
            </div>

            {/* Entity Recognition */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">
                  Entity Recognition
                </h2>
                <button
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() =>
                    navigate("/dashboard/scope/entity-recognition-config")
                  }
                >
                  Configure Entities
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Entity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mentions
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sentiment
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trend
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {entities.map((entity) => (
                      <tr key={entity.name}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {entity.name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entity.mentions}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-24 h-2 bg-gray-200 rounded">
                              <div
                                className={`h-2 rounded ${
                                  entity.sentiment > 4
                                    ? "bg-green-500"
                                    : entity.sentiment > 3
                                    ? "bg-blue-500"
                                    : entity.sentiment > 2
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{
                                  width: `${(entity.sentiment / 5) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm">
                              {entity.sentiment.toFixed(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ↑ 4.2%
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button className="p-1 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50">
                              <Eye size={16} />
                            </button>
                            <button className="p-1 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50">
                              <MessageSquare size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "signals" && <SignalIntakeList />}
        {activeTab === "memory" && <MemoryLookupConsole />}
        {activeTab === "insights" && <InsightRouter />}
      </main>
    </div>
  );
};

export default SignalScope;
