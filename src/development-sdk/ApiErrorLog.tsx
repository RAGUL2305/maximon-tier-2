import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  AlertCircle,
  Clock,
  Hash,
  Server,
} from "lucide-react";

const APIErrorLog = () => {
  // Mock data for API errors
  const [errors] = useState([
    {
      id: "err-001",
      timestamp: "2025-05-10T08:23:45Z",
      endpoint: "/api/signal-studio/drafts",
      errorCode: "AUTH_401",
      message: "Unauthorized access: Invalid API token",
      module: "Signal Studio",
      severity: "high",
    },
    {
      id: "err-002",
      timestamp: "2025-05-10T07:45:12Z",
      endpoint: "/api/memory-loom/query",
      errorCode: "RATE_429",
      message: "Rate limit exceeded: Too many requests",
      module: "Memory Loom",
      severity: "medium",
    },
    {
      id: "err-003",
      timestamp: "2025-05-09T22:12:31Z",
      endpoint: "/api/signal-flow/journeys/trigger",
      errorCode: "VALIDATION_400",
      message: "Invalid payload: Missing required fields",
      module: "Signal Flow",
      severity: "low",
    },
    {
      id: "err-004",
      timestamp: "2025-05-09T18:05:22Z",
      endpoint: "/api/signalcore/optimization",
      errorCode: "SERVER_500",
      message: "Internal server error: Database connection failed",
      module: "SignalCore",
      severity: "high",
    },
    {
      id: "err-005",
      timestamp: "2025-05-09T14:33:10Z",
      endpoint: "/api/signalscope/signals/intake",
      errorCode: "TIMEOUT_504",
      message: "Gateway timeout: Service unavailable",
      module: "SignalScope",
      severity: "medium",
    },
  ]);

  // State for filters
  const [search, setSearch] = useState("");
  const [filterCode, setFilterCode] = useState("");
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedError, setSelectedError] = useState(null);

  // Filtered errors based on search and filters
  const filteredErrors = errors.filter((error) => {
    // Search filter
    const searchMatch =
      error.endpoint.toLowerCase().includes(search.toLowerCase()) ||
      error.errorCode.toLowerCase().includes(search.toLowerCase()) ||
      error.message.toLowerCase().includes(search.toLowerCase()) ||
      error.module.toLowerCase().includes(search.toLowerCase());

    // Error code filter
    const codeMatch = filterCode ? error.errorCode.includes(filterCode) : true;

    // Date range filter
    const dateMatch = true; // Simplified for demo

    return searchMatch && codeMatch && dateMatch;
  });

  const sortedErrors = [...filteredErrors].sort((a, b) => {
    if (sortBy === "timestamp") {
      return sortOrder === "asc"
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (sortBy === "severity") {
      const severityOrder: Record<string, number> = {
        high: 3,
        medium: 2,
        low: 1,
      };
      return sortOrder === "asc"
        ? severityOrder[a.severity] - severityOrder[b.severity]
        : severityOrder[b.severity] - severityOrder[a.severity];
    }
    return 0;
  });
  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    // In a real app, this would fetch the latest error logs
    alert("Refreshing error logs...");
  };

  // Handle error selection
  const handleErrorSelect = (error) => {
    setSelectedError(selectedError?.id === error.id ? null : error);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
            API Error Log
          </h2>
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search endpoints, error codes, or messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              className="block rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterCode}
              onChange={(e) => setFilterCode(e.target.value)}
            >
              <option value="">All Error Types</option>
              <option value="AUTH">Authentication Errors</option>
              <option value="VALIDATION">Validation Errors</option>
              <option value="SERVER">Server Errors</option>
              <option value="RATE">Rate Limit Errors</option>
              <option value="TIMEOUT">Timeout Errors</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  className="flex items-center focus:outline-none group"
                  onClick={() => toggleSort("timestamp")}
                >
                  <Clock className="h-4 w-4 mr-1 text-gray-400 group-hover:text-gray-500" />
                  Timestamp
                  {sortBy === "timestamp" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
                    ))}
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <Server className="h-4 w-4 mr-1 text-gray-400" />
                  Endpoint
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <Hash className="h-4 w-4 mr-1 text-gray-400" />
                  Error Code
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  className="flex items-center focus:outline-none group"
                  onClick={() => toggleSort("severity")}
                >
                  <AlertCircle className="h-4 w-4 mr-1 text-gray-400 group-hover:text-gray-500" />
                  Severity
                  {sortBy === "severity" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
                    ))}
                </button>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Module
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedErrors.length > 0 ? (
              sortedErrors.map((error) => (
                <React.Fragment key={error.id}>
                  <tr
                    className={`hover:bg-gray-50 cursor-pointer ${
                      selectedError?.id === error.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => handleErrorSelect(error)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatTimestamp(error.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                      {error.endpoint}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                      {error.errorCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(
                          error.severity
                        )}`}
                      >
                        {error.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {error.module}
                    </td>
                  </tr>
                  {selectedError?.id === error.id && (
                    <tr className="bg-blue-50">
                      <td colSpan="5" className="px-6 py-4">
                        <div className="text-sm text-gray-800">
                          <h4 className="font-semibold mb-2">Error Details</h4>
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <p className="mb-2">
                              <span className="font-medium">Message:</span>{" "}
                              {error.message}
                            </p>
                            <p className="mb-2">
                              <span className="font-medium">Endpoint:</span>{" "}
                              <span className="font-mono">
                                {error.endpoint}
                              </span>
                            </p>
                            <p className="mb-2">
                              <span className="font-medium">Error Code:</span>{" "}
                              <span className="font-mono">
                                {error.errorCode}
                              </span>
                            </p>
                            <p className="mb-2">
                              <span className="font-medium">Module:</span>{" "}
                              {error.module}
                            </p>
                            <p>
                              <span className="font-medium">Timestamp:</span>{" "}
                              {formatTimestamp(error.timestamp)}
                            </p>
                          </div>
                          <div className="mt-3 flex space-x-2">
                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors">
                              Copy Details
                            </button>
                            <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 transition-colors">
                              Archive
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No errors found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{sortedErrors.length}</span> of{" "}
              <span className="font-medium">{sortedErrors.length}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIErrorLog;
