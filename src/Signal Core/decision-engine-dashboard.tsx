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
} from "recharts";
import {
  Check,
  AlertTriangle,
  Filter,
  RefreshCw,
  Settings,
  Zap,
  Activity,
  Flag,
  ChevronDown,
} from "lucide-react";

interface Rule {
  id: number;
  name: string;
  targetMetric: string;
  status: string;
  lastUpdated: string;
  score: number;
}

interface Signal {
  date: string;
  count: number;
  optimized: number;
}

interface Log {
  id: number;
  timestamp: string;
  signalId: string;
  outcome: string;
  rule: string;
}

const DecisionEngineDashboard = () => {
  // State for rules, signals, and logs
  const [activeRules, setActiveRules] = useState<Rule[]>([]);
  const [signalsOptimized, setSignalsOptimized] = useState<Signal[]>([]);
  const [executionLogs, setExecutionLogs] = useState<Log[]>([]);
  const [simulationMode, setSimulationMode] = useState(false);
  const [selectedRule, setSelectedRule] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data loading
  useEffect(() => {
    // Simulates API call to fetch data
    const loadData = () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockRules = [
          {
            id: 1,
            name: "High CTR Optimization",
            targetMetric: "Click-Through Rate",
            status: "active",
            lastUpdated: "2 hours ago",
            score: 84,
          },
          {
            id: 2,
            name: "Conversion Path Enhancement",
            targetMetric: "Conversion Rate",
            status: "active",
            lastUpdated: "1 day ago",
            score: 78,
          },
          {
            id: 3,
            name: "Audience Segmentation",
            targetMetric: "Engagement",
            status: "paused",
            lastUpdated: "5 days ago",
            score: 65,
          },
          {
            id: 4,
            name: "Budget Allocation",
            targetMetric: "ROI",
            status: "active",
            lastUpdated: "3 hours ago",
            score: 91,
          },
          {
            id: 5,
            name: "Content Optimization",
            targetMetric: "Time on Page",
            status: "draft",
            lastUpdated: "12 hours ago",
            score: 42,
          },
        ];

        const mockSignals = [
          { date: "Jan", count: 400, optimized: 350 },
          { date: "Feb", count: 500, optimized: 420 },
          { date: "Mar", count: 600, optimized: 590 },
          { date: "Apr", count: 550, optimized: 490 },
          { date: "May", count: 700, optimized: 690 },
        ];

        const mockLogs = [
          {
            id: 1,
            timestamp: "2025-05-10 09:15:23",
            signalId: "SIG-45621",
            outcome: "success",
            rule: "High CTR Optimization",
          },
          {
            id: 2,
            timestamp: "2025-05-10 09:12:18",
            signalId: "SIG-45620",
            outcome: "success",
            rule: "Budget Allocation",
          },
          {
            id: 3,
            timestamp: "2025-05-10 09:08:54",
            signalId: "SIG-45619",
            outcome: "warning",
            rule: "Conversion Path Enhancement",
          },
          {
            id: 4,
            timestamp: "2025-05-10 09:03:42",
            signalId: "SIG-45618",
            outcome: "success",
            rule: "High CTR Optimization",
          },
          {
            id: 5,
            timestamp: "2025-05-10 08:57:31",
            signalId: "SIG-45617",
            outcome: "error",
            rule: "Budget Allocation",
          },
          {
            id: 6,
            timestamp: "2025-05-10 08:52:19",
            signalId: "SIG-45616",
            outcome: "success",
            rule: "High CTR Optimization",
          },
          {
            id: 7,
            timestamp: "2025-05-10 08:48:07",
            signalId: "SIG-45615",
            outcome: "success",
            rule: "Conversion Path Enhancement",
          },
        ];

        setActiveRules(mockRules);
        setSignalsOptimized(mockSignals);
        setExecutionLogs(mockLogs);
        setIsLoading(false);
      }, 1000);
    };

    loadData();
  }, []);

  // Filter logs based on status
  const filteredLogs = executionLogs.filter((log) => {
    if (filterStatus === "all") return true;
    return log.outcome === filterStatus;
  });

  // Handle rule selection
  const handleRuleSelect = (rule: Rule) => {
    setSelectedRule(rule.id === selectedRule ? null : rule.id);
  };

  // Toggle simulation mode
  const toggleSimulationMode = () => {
    setSimulationMode(!simulationMode);
  };

  // Refresh data
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Decision Engine Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              SignalCore • Revenue Intelligence
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center ${
                simulationMode ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <span className="mr-2 text-sm font-medium">Simulation Mode</span>
              <button
                onClick={toggleSimulationMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  simulationMode ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    simulationMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
              disabled={isLoading}
            >
              <RefreshCw
                size={20}
                className={isLoading ? "animate-spin" : ""}
              />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      {simulationMode && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Simulation Mode Active:</span> All
                optimization decisions will be simulated but not executed. Use
                this mode to test rule configurations safely.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
            {/* KPI Summary Cards */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Optimization Summary
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <span className="text-blue-700 text-sm font-medium">
                    Active Rules
                  </span>
                  <div className="flex items-center mt-2">
                    <Zap className="text-blue-500 mr-2" size={20} />
                    <span className="text-2xl font-bold">
                      {activeRules.filter((r) => r.status === "active").length}
                    </span>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <span className="text-green-700 text-sm font-medium">
                    Signals Optimized
                  </span>
                  <div className="flex items-center mt-2">
                    <Activity className="text-green-500 mr-2" size={20} />
                    <span className="text-2xl font-bold">
                      {signalsOptimized.reduce(
                        (sum, item) => sum + item.optimized,
                        0
                      )}
                    </span>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <span className="text-purple-700 text-sm font-medium">
                    Avg. Success Rate
                  </span>
                  <div className="flex items-center mt-2">
                    <Check className="text-purple-500 mr-2" size={20} />
                    <span className="text-2xl font-bold">92%</span>
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <span className="text-amber-700 text-sm font-medium">
                    Pending Decisions
                  </span>
                  <div className="flex items-center mt-2">
                    <Flag className="text-amber-500 mr-2" size={20} />
                    <span className="text-2xl font-bold">7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Signals Chart */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Signals Performance
              </h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={signalsOptimized}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Total Signals" fill="#94a3b8" />
                  <Bar dataKey="optimized" name="Optimized" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Rules Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Active Rules</h2>
            <p className="text-sm text-gray-500">
              Manage optimization rules and their targets
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Rule Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Target Metric
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Score
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Updated
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activeRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {rule.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {rule.targetMetric}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          rule.status === "active"
                            ? "bg-green-100 text-green-800"
                            : rule.status === "paused"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {rule.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              rule.score >= 80
                                ? "bg-green-500"
                                : rule.score >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${rule.score}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {rule.score}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rule.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleRuleSelect(rule)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <ChevronDown size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Execution Logs */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Execution Logs
              </h2>
              <p className="text-sm text-gray-500">
                Recent signal processing activity
              </p>
            </div>
            <div className="flex items-center">
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                <Filter size={16} className="mr-1" />
                <select
                  className="bg-transparent focus:outline-none"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Timestamp
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Signal ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Rule
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Outcome
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.signalId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.rule}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          log.outcome === "success"
                            ? "bg-green-100 text-green-800"
                            : log.outcome === "warning"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {log.outcome}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredLogs.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              <p>No logs found with the selected filter.</p>
            </div>
          )}
          <div className="px-6 py-3 flex justify-between items-center bg-gray-50 border-t border-gray-200">
            <span className="text-sm text-gray-500">
              Showing {filteredLogs.length} of {executionLogs.length} logs
            </span>
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                Previous
              </button>
              <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DecisionEngineDashboard;
