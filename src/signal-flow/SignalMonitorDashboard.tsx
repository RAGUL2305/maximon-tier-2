import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Bell, AlertTriangle, Check, RefreshCw } from "lucide-react";

const SignalMonitor = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState("7d");
  const [journeyFilter, setJourneyFilter] = useState("all");

  // Mock data for the dashboard
  const overviewData = [
    { name: "Welcome", signals: 245, success: 218, failure: 27 },
    { name: "Onboarding", signals: 189, success: 165, failure: 24 },
    { name: "Re-engagement", signals: 143, success: 112, failure: 31 },
    { name: "Product Update", signals: 87, success: 82, failure: 5 },
    { name: "Feedback", signals: 64, success: 58, failure: 6 },
  ];

  const timeSeriesData = [
    { date: "May 3", signals: 42, success: 38, failure: 4 },
    { date: "May 4", signals: 56, success: 49, failure: 7 },
    { date: "May 5", signals: 78, success: 70, failure: 8 },
    { date: "May 6", signals: 95, success: 85, failure: 10 },
    { date: "May 7", signals: 116, success: 105, failure: 11 },
    { date: "May 8", signals: 94, success: 86, failure: 8 },
    { date: "May 9", signals: 120, success: 112, failure: 8 },
  ];

  const triggerLogData = [
    {
      id: "sig-458",
      timestamp: "2025-05-10 09:42:18",
      trigger: "Cart Abandoned",
      journey: "Re-engagement",
      result: "Success",
    },
    {
      id: "sig-457",
      timestamp: "2025-05-10 09:41:52",
      trigger: "Email Opened",
      journey: "Product Update",
      result: "Success",
    },
    {
      id: "sig-456",
      timestamp: "2025-05-10 09:40:30",
      trigger: "Profile Updated",
      journey: "Onboarding",
      result: "Success",
    },
    {
      id: "sig-455",
      timestamp: "2025-05-10 09:38:45",
      trigger: "Login",
      journey: "Welcome",
      result: "Failure",
    },
    {
      id: "sig-454",
      timestamp: "2025-05-10 09:36:12",
      trigger: "Feedback Requested",
      journey: "Feedback",
      result: "Success",
    },
    {
      id: "sig-453",
      timestamp: "2025-05-10 09:35:08",
      trigger: "Cart Abandoned",
      journey: "Re-engagement",
      result: "Success",
    },
    {
      id: "sig-452",
      timestamp: "2025-05-10 09:32:55",
      trigger: "Email Clicked",
      journey: "Product Update",
      result: "Success",
    },
    {
      id: "sig-451",
      timestamp: "2025-05-10 09:30:22",
      trigger: "Signup Completed",
      journey: "Welcome",
      result: "Success",
    },
  ];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Simulate initial loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Signal Monitor</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleRefresh}
            className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">
            Total Signals Processed
          </div>
          <div className="text-2xl font-bold text-gray-800">728</div>
          <div className="text-xs text-green-600 mt-1">
            +12.4% from last week
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Success Rate</div>
          <div className="text-2xl font-bold text-gray-800">87.5%</div>
          <div className="text-xs text-green-600 mt-1">
            +2.1% from last week
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Active Journeys</div>
          <div className="text-2xl font-bold text-gray-800">5</div>
          <div className="text-xs text-blue-600 mt-1">
            No change from last week
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Journey</label>
          <select
            value={journeyFilter}
            onChange={(e) => setJourneyFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm"
          >
            <option value="all">All Journeys</option>
            <option value="welcome">Welcome</option>
            <option value="onboarding">Onboarding</option>
            <option value="reengagement">Re-engagement</option>
            <option value="product">Product Update</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Trigger Type
          </label>
          <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
            <option value="all">All Triggers</option>
            <option value="email">Email Events</option>
            <option value="profile">Profile Events</option>
            <option value="cart">Cart Events</option>
            <option value="login">Authentication Events</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Status</label>
          <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failure">Failure</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "overview"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Journey Overview
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`ml-8 py-2 px-4 text-sm font-medium ${
                activeTab === "timeline"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`ml-8 py-2 px-4 text-sm font-medium ${
                activeTab === "logs"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Trigger Logs
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {activeTab === "overview" && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overviewData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="success" fill="#4ade80" name="Success" />
                    <Bar dataKey="failure" fill="#f87171" name="Failure" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeTab === "timeline" && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="signals"
                      stroke="#60a5fa"
                      name="Total Signals"
                    />
                    <Line
                      type="monotone"
                      dataKey="success"
                      stroke="#4ade80"
                      name="Success"
                    />
                    <Line
                      type="monotone"
                      dataKey="failure"
                      stroke="#f87171"
                      name="Failure"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeTab === "logs" && (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Signal ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trigger
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Journey
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {triggerLogData.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {log.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.trigger}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.journey}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {log.result === "Success" ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              <Check className="w-3 h-3 mr-1" /> Success
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              <AlertTriangle className="w-3 h-3 mr-1" /> Failure
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Alerts Panel */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Recent Alerts</h2>
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            3 New
          </span>
        </div>
        <ul className="divide-y divide-gray-200">
          <li className="py-3">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  High failure rate detected in Re-engagement journey
                </p>
                <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
              </div>
            </div>
          </li>
          <li className="py-3">
            <div className="flex items-start">
              <Bell className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Trigger 'Cart Abandoned' execution time above threshold
                </p>
                <p className="text-xs text-gray-500 mt-1">42 minutes ago</p>
              </div>
            </div>
          </li>
          <li className="py-3">
            <div className="flex items-start">
              <Bell className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Journey 'Product Update' traffic spike detected
                </p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Data refreshed: May 10, 2025 at 09:45 AM • Signal Monitor v1.2.0
      </div>
    </div>
  );
};

export default SignalMonitor;
