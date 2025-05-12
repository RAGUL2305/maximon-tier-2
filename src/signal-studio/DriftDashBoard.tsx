import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle,
  BarChart2,
  RefreshCw,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const DriftDashboard = () => {
  // Sample data - would come from API in real implementation
  const [driftData, setDriftData] = useState({
    overallScore: 78,
    threshold: 85,
    moduleScores: [
      {
        module: "Signal Studio",
        score: 76,
        status: "warning",
        driftedItems: 4,
      },
      { module: "Memory Loom", score: 82, status: "normal", driftedItems: 2 },
      { module: "Signal Flow", score: 69, status: "critical", driftedItems: 7 },
    ],
    recentDrifts: [
      {
        id: "dr-123",
        module: "Signal Studio",
        content: "Product messaging tone shift",
        severity: "high",
        timestamp: "10 mins ago",
      },
      {
        id: "dr-124",
        module: "Signal Flow",
        content: "Journey response messaging inconsistency",
        severity: "medium",
        timestamp: "1 hour ago",
      },
      {
        id: "dr-125",
        module: "Signal Flow",
        content: "Trigger response deviation",
        severity: "high",
        timestamp: "2 hours ago",
      },
      {
        id: "dr-126",
        module: "Memory Loom",
        content: "Term definition alignment issue",
        severity: "low",
        timestamp: "5 hours ago",
      },
    ],
  });

  const [refreshing, setRefreshing] = useState(false);
  const [timeFilter, setTimeFilter] = useState("24h");

  // Simulated refresh function
  const handleRefresh = () => {
    setRefreshing(true);
    // Would fetch new data in real implementation
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    if (status === "critical") return "text-red-600";
    if (status === "warning") return "text-amber-500";
    return "text-green-600";
  };

  const getSeverityBadge = (severity) => {
    if (severity === "high")
      return (
        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
          High
        </span>
      );
    if (severity === "medium")
      return (
        <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
          Medium
        </span>
      );
    return (
      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
        Low
      </span>
    );
  };

  const getScoreColor = (score, threshold) => {
    if (score < threshold - 10) return "text-red-600";
    if (score < threshold) return "text-amber-500";
    return "text-green-600";
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Drift Dashboard</h2>
          <p className="text-gray-600">
            Monitoring brand alignment across Marketing OS
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 mr-1" />
            <select
              className="text-sm border rounded-md px-2 py-1"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
          </div>
          <button
            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-100"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw
              className={`h-4 w-4 mr-1 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Overall Score Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 col-span-1">
          <div className="text-sm font-medium text-gray-500 mb-1">
            Overall Drift Score
          </div>
          <div className="flex items-end">
            <span
              className={`text-3xl font-bold ${getScoreColor(
                driftData.overallScore,
                driftData.threshold
              )}`}
            >
              {driftData.overallScore}
            </span>
            <span className="text-gray-500 ml-2 mb-1">/ 100</span>
          </div>
          <div className="mt-2 text-sm">
            {driftData.overallScore < driftData.threshold ? (
              <div className="flex items-center text-amber-600">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span>Below threshold ({driftData.threshold})</span>
              </div>
            ) : (
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Within threshold ({driftData.threshold})</span>
              </div>
            )}
          </div>
        </div>

        {/* Module Scores */}
        {driftData.moduleScores.map((module, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-500 mb-1">
              {module.module}
            </div>
            <div className="flex items-end">
              <span
                className={`text-3xl font-bold ${getScoreColor(
                  module.score,
                  driftData.threshold
                )}`}
              >
                {module.score}
              </span>
              <span className="text-gray-500 ml-2 mb-1">/ 100</span>
            </div>
            <div className="mt-2 text-sm flex justify-between">
              <div
                className={`flex items-center ${getStatusColor(module.status)}`}
              >
                {module.status === "normal" ? (
                  <CheckCircle className="h-4 w-4 mr-1" />
                ) : (
                  <AlertTriangle className="h-4 w-4 mr-1" />
                )}
                <span>{module.driftedItems} drifted items</span>
              </div>
              <a
                href={`#${module.module.toLowerCase().replace(" ", "-")}`}
                className="text-blue-600 hover:underline flex items-center"
              >
                View <ArrowUpRight className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Drift Distribution Chart */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-700">Drift Distribution</h3>
          <div className="flex items-center text-sm">
            <BarChart2 className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-gray-500">Last updated: Today, 1:45 PM</span>
          </div>
        </div>
        <div className="h-32 flex items-end justify-around">
          {driftData.moduleScores.map((module, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-16 rounded-t ${
                  module.status === "critical"
                    ? "bg-red-500"
                    : module.status === "warning"
                    ? "bg-amber-400"
                    : "bg-green-500"
                }`}
                style={{ height: `${module.score}px` }}
              ></div>
              <div className="text-xs font-medium mt-1 text-center">
                {module.module}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Drift Incidents */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-700 mb-4">
          Recent Drift Incidents
        </h3>
        <div className="overflow-hidden rounded-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Module
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Content
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Severity
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Detected
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {driftData.recentDrifts.map((drift, index) => (
                <tr
                  key={drift.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {drift.module}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {drift.content}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {getSeverityBadge(drift.severity)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {drift.timestamp}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <a href="#review" className="text-blue-600 hover:underline">
                      Review
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {driftData.recentDrifts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No drift incidents detected in the selected time period.
          </div>
        )}
      </div>
    </div>
  );
};

export default DriftDashboard;
