import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BarChart2,
  Check,
  CornerRightDown,
  PieChart,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SignalCoreExportHub from "./signal-core-export-hub";
import SignalIntakeConsole from "./signal-intake-console";
import GrowthSignalMapper from "./growth-signal-mapper";
import DecisionEngineDashboard from "./decision-engine-dashboard";

const SignalCore = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for visualization
  const performanceData = [
    { name: "Jan", signals: 65, optimized: 40 },
    { name: "Feb", signals: 59, optimized: 45 },
    { name: "Mar", signals: 80, optimized: 65 },
    { name: "Apr", signals: 81, optimized: 70 },
    { name: "May", signals: 90, optimized: 80 },
  ];

  const signalIntakeData = [
    { id: "SIG-1001", source: "CRM", timestamp: "10:45 AM", status: "Mapped" },
    {
      id: "SIG-1002",
      source: "Analytics",
      timestamp: "11:30 AM",
      status: "New",
    },
    {
      id: "SIG-1003",
      source: "Journey Data",
      timestamp: "12:15 PM",
      status: "Mapped",
    },
    { id: "SIG-1004", source: "CDP", timestamp: "01:20 PM", status: "New" },
    {
      id: "SIG-1005",
      source: "Analytics",
      timestamp: "02:45 PM",
      status: "Mapped",
    },
  ];

  const recentActivity = [
    {
      type: "Signal Mapped",
      detail: "Email Response Signal mapped to Growth",
      time: "10 min ago",
    },
    {
      type: "Optimization",
      detail: "Subject Line Variant A selected as winner",
      time: "45 min ago",
    },
    {
      type: "Escalation",
      detail: "Unusual drop in email open rates detected",
      time: "1 hour ago",
    },
    {
      type: "Simulation",
      detail: "New journey variant simulation completed",
      time: "3 hours ago",
    },
  ];

  const growthSignals = [
    { name: "Email Clicks", strength: 85, trend: "up" },
    { name: "Product Views", strength: 72, trend: "up" },
    { name: "Cart Additions", strength: 65, trend: "down" },
    { name: "Checkout Starts", strength: 90, trend: "up" },
    { name: "Purchases", strength: 78, trend: "stable" },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-indigo-600">SignalCore</div>
            <div className="ml-2 text-sm text-gray-500">
              Revenue Intelligence
            </div>
          </div>
          {/* <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
              JD
            </div>
          </div> */}
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-200">
          <nav className="flex px-4 space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "dashboard"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("signalIntake")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "signalIntake"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Signal Intake Console
            </button>
            <button
              onClick={() => setActiveTab("growthMapper")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "growthMapper"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Growth Signal Mapper
            </button>
            <button
              onClick={() => setActiveTab("decisionEngine")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "decisionEngine"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Decision Engine
            </button>
            <button
              onClick={() => setActiveTab("exportHub")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "exportHub"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Export Hub
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* KPI Tiles */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Signals Ingested
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            2,543
                          </div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <TrendingUp className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                            <span className="sr-only">Increased by</span>
                            12%
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <BarChart2 className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Mapped Signals
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            1,924
                          </div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <TrendingUp className="self-center flex-shrink-0 h-5 w-5 text-green-500" />
                            <span className="sr-only">Increased by</span>
                            8%
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                      <PieChart className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Avg. Conversion Signal Strength
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            78.4%
                          </div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                            <CornerRightDown className="self-center flex-shrink-0 h-5 w-5 text-red-500" />
                            <span className="sr-only">Decreased by</span>
                            2%
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <AlertCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Drift Alerts
                        </dt>
                        <dd className="text-2xl font-semibold text-gray-900">
                          3
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Alerts
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="bg-white shadow rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Signal Performance
                  </h2>
                  <div className="text-sm text-gray-500">Last 5 months</div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="signals"
                        name="Signals Received"
                        fill="#6366F1"
                      />
                      <Bar
                        dataKey="optimized"
                        name="Optimized Signals"
                        fill="#10B981"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Top Growth Signals
                  </h2>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View All
                  </button>
                </div>
                <ul className="divide-y divide-gray-200">
                  {growthSignals.map((signal, index) => (
                    <li
                      key={index}
                      className="py-3 flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <span className="flex-shrink-0 h-5 w-5 text-gray-400">
                          {signal.trend === "up" ? (
                            <TrendingUp className="h-5 w-5 text-green-500" />
                          ) : signal.trend === "down" ? (
                            <CornerRightDown className="h-5 w-5 text-red-500" />
                          ) : (
                            <ArrowRight className="h-5 w-5 text-yellow-500" />
                          )}
                        </span>
                        <span className="ml-3 text-sm text-gray-900">
                          {signal.name}
                        </span>
                      </div>
                      <div>
                        <div className="bg-gray-100 w-24 h-4 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              signal.strength > 80
                                ? "bg-green-500"
                                : signal.strength > 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${signal.strength}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          {signal.strength}%
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Activity
                </h3>
                <span className="text-sm text-gray-500">Today</span>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {recentActivity.map((activity, index) => (
                    <li key={index} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {activity.type}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="text-sm text-gray-500">
                            {activity.detail}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "signalIntake" && <SignalIntakeConsole />}
        {activeTab === "growthMapper" && <GrowthSignalMapper />}
        {activeTab === "decisionEngine" && <DecisionEngineDashboard />}
        {activeTab === "exportHub" && <SignalCoreExportHub />}
      </main>
    </div>
  );
};

export default SignalCore;
