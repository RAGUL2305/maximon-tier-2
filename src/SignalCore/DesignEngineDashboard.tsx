import { useState } from "react";

const DecisionEngineDashboard = () => {
  // Mock data for optimization rules
  const optimizationRules = [
    {
      id: "RULE-001",
      name: "Email Frequency Optimization",
      targetMetric: "Open Rate",
      activeStatus: true,
      lastRun: "2025-05-04T14:30:00",
    },
    {
      id: "RULE-002",
      name: "Landing Page Content Match",
      targetMetric: "Conversion Rate",
      activeStatus: true,
      lastRun: "2025-05-04T12:15:00",
    },
    {
      id: "RULE-003",
      name: "Personalization Level Adjustment",
      targetMetric: "Click-through Rate",
      activeStatus: false,
      lastRun: "2025-05-03T09:45:00",
    },
    {
      id: "RULE-004",
      name: "Send Time Optimization",
      targetMetric: "Engagement Score",
      activeStatus: true,
      lastRun: "2025-05-02T16:30:00",
    },
    {
      id: "RULE-005",
      name: "Channel Preference Detection",
      targetMetric: "Response Rate",
      activeStatus: true,
      lastRun: "2025-05-01T10:20:00",
    },
  ];

  // Mock data for decision logs
  const decisionLogs = [
    {
      id: "LOG-1045",
      timestamp: "2025-05-04T16:42:00",
      signalId: "SIG-1021",
      ruleName: "Email Frequency Optimization",
      outcome: "Reduced Frequency",
    },
    {
      id: "LOG-1044",
      timestamp: "2025-05-04T15:30:00",
      signalId: "SIG-1020",
      ruleName: "Landing Page Content Match",
      outcome: "Content Variant B Selected",
    },
    {
      id: "LOG-1043",
      timestamp: "2025-05-04T14:15:00",
      signalId: "SIG-1018",
      ruleName: "Send Time Optimization",
      outcome: "Time Shifted to Evening",
    },
    {
      id: "LOG-1042",
      timestamp: "2025-05-04T12:05:00",
      signalId: "SIG-1017",
      ruleName: "Channel Preference Detection",
      outcome: "SMS Channel Selected",
    },
    {
      id: "LOG-1041",
      timestamp: "2025-05-04T10:30:00",
      signalId: "SIG-1014",
      ruleName: "Email Frequency Optimization",
      outcome: "Maintained Frequency",
    },
    {
      id: "LOG-1040",
      timestamp: "2025-05-04T09:15:00",
      signalId: "SIG-1013",
      ruleName: "Landing Page Content Match",
      outcome: "Content Variant A Selected",
    },
    {
      id: "LOG-1039",
      timestamp: "2025-05-03T16:45:00",
      signalId: "SIG-1012",
      ruleName: "Channel Preference Detection",
      outcome: "Email Channel Selected",
    },
    {
      id: "LOG-1038",
      timestamp: "2025-05-03T14:20:00",
      signalId: "SIG-1010",
      ruleName: "Send Time Optimization",
      outcome: "Time Shifted to Morning",
    },
  ];

  // State for filters
  //   const [ruleFilter, setRuleFilter] = useState("All");
  const [logFilter, setLogFilter] = useState("");

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Filter logs based on signal ID or rule name
  const filteredLogs = decisionLogs.filter((log) => {
    return (
      logFilter === "" ||
      log.signalId.toLowerCase().includes(logFilter.toLowerCase()) ||
      log.ruleName.toLowerCase().includes(logFilter.toLowerCase())
    );
  });

  // Function to render status badge with appropriate color
  const renderStatusBadge = (active: boolean) => {
    return active ? (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Active
      </span>
    ) : (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Inactive
      </span>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header with Back Navigation */}
      <div className="flex items-center mb-6">
        <button className="mr-3 text-gray-600 hover:text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Decision Engine Dashboard
          </h1>
          <p className="text-gray-600">
            View optimization rules and decision logs
          </p>
        </div>
      </div>

      {/* Optimization Summary Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500 mb-1">Rules Applied</p>
          <p className="text-3xl font-bold">
            {optimizationRules.filter((rule) => rule.activeStatus).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500 mb-1">
            Signals Optimized (Today)
          </p>
          <p className="text-3xl font-bold">
            {
              decisionLogs.filter(
                (log) =>
                  new Date(log.timestamp).toDateString() ===
                  new Date().toDateString()
              ).length
            }
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500 mb-1">Optimization Health</p>
          <p className="text-3xl font-bold text-green-600">Good</p>
        </div>
      </div>

      {/* Rules List */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">Optimization Rules</h2>
          <p className="text-sm text-gray-500">
            {optimizationRules.length} rules configured
          </p>
        </div>
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
                Last Run
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {optimizationRules.map((rule) => (
              <tr key={rule.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {rule.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {rule.targetMetric}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStatusBadge(rule.activeStatus)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(rule.lastRun)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decision Logs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium">Decision Logs</h2>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Filter by Signal ID or Rule"
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                value={logFilter}
                onChange={(e) => setLogFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
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
                Rule Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Decision Outcome
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(log.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {log.signalId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.ruleName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.outcome}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination (simplified for Tier 1) */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredLogs.length}</span> of{" "}
              <span className="font-medium">{decisionLogs.length}</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Note about Tier 1 limitations */}
      <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
        <p className="text-sm text-blue-700">
          <span className="font-medium">Note:</span> In this Tier 1
          implementation, rules are view-only. Rule creation and editing will be
          available in Tier 2.
        </p>
      </div>
    </div>
  );
};

export default DecisionEngineDashboard;
