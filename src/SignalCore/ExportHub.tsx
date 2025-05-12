import { useState } from "react";

const CoreExportHub = () => {
  // Mock data for exported signals
  const initialExportedSignals = [
    {
      signalId: "SIG-1021",
      exportTarget: "Email Marketing Platform",
      exportStatus: "Exported",
      lastExported: "2025-05-04T16:30:00",
    },
    {
      signalId: "SIG-1020",
      exportTarget: "CRM System",
      exportStatus: "Exported",
      lastExported: "2025-05-04T15:15:00",
    },
    {
      signalId: "SIG-1018",
      exportTarget: "Ad Platform",
      exportStatus: "Exported",
      lastExported: "2025-05-04T14:45:00",
    },
    {
      signalId: "SIG-1017",
      exportTarget: "SMS Gateway",
      exportStatus: "Failed",
      lastExported: "2025-05-04T13:30:00",
    },
    {
      signalId: "SIG-1016",
      exportTarget: "Content Management System",
      exportStatus: "Exported",
      lastExported: "2025-05-04T12:20:00",
    },
    {
      signalId: "SIG-1015",
      exportTarget: "Email Marketing Platform",
      exportStatus: "Exported",
      lastExported: "2025-05-03T16:45:00",
    },
    {
      signalId: "SIG-1014",
      exportTarget: "CRM System",
      exportStatus: "Failed",
      lastExported: "2025-05-03T15:30:00",
    },
    {
      signalId: "SIG-1013",
      exportTarget: "Ad Platform",
      exportStatus: "Exported",
      lastExported: "2025-05-03T14:15:00",
    },
    {
      signalId: "SIG-1012",
      exportTarget: "SMS Gateway",
      exportStatus: "Exported",
      lastExported: "2025-05-03T13:00:00",
    },
    {
      signalId: "SIG-1011",
      exportTarget: "Content Management System",
      exportStatus: "Exported",
      lastExported: "2025-05-03T11:45:00",
    },
  ];

  // State for filter and signals
  const [statusFilter, setStatusFilter] = useState("All");
  const [targetFilter, setTargetFilter] = useState("All");
  const [exportedSignals, setExportedSignals] = useState(
    initialExportedSignals
  );

  // Extract unique export targets for filter dropdown
  const exportTargets = [
    "All",
    ...new Set(exportedSignals.map((signal) => signal.exportTarget)),
  ];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Filter signals based on status and target
  const filteredSignals = exportedSignals.filter((signal) => {
    const matchesStatus =
      statusFilter === "All" || signal.exportStatus === statusFilter;
    const matchesTarget =
      targetFilter === "All" || signal.exportTarget === targetFilter;
    return matchesStatus && matchesTarget;
  });

  // Function to render status badge with appropriate color
  const renderStatusBadge = (status: string) => {
    if (status === "Exported") {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Exported
        </span>
      );
    } else if (status === "Failed") {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Failed
        </span>
      );
    }
    return (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        {status}
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
          <h1 className="text-2xl font-bold text-gray-800">Export Hub</h1>
          <p className="text-gray-600">View signals routed externally</p>
        </div>
      </div>

      {/* Export Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500 mb-1">Total Exports (Today)</p>
          <p className="text-3xl font-bold">
            {
              exportedSignals.filter((signal) => {
                const today = new Date().toDateString();
                const signalDate = new Date(signal.lastExported).toDateString();
                return (
                  signalDate === today && signal.exportStatus === "Exported"
                );
              }).length
            }
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500 mb-1">Failed Exports</p>
          <p className="text-3xl font-bold text-red-600">
            {
              exportedSignals.filter(
                (signal) => signal.exportStatus === "Failed"
              ).length
            }
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500 mb-1">Active Export Targets</p>
          <p className="text-3xl font-bold">
            {new Set(exportedSignals.map((signal) => signal.exportTarget)).size}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status Filter */}
          <div>
            <label
              htmlFor="status-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Status
            </label>
            <select
              id="status-filter"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Exported">Exported</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          {/* Target Filter */}
          <div>
            <label
              htmlFor="target-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Export Target
            </label>
            <select
              id="target-filter"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={targetFilter}
              onChange={(e) => setTargetFilter(e.target.value)}
            >
              {exportTargets.map((target) => (
                <option key={target} value={target}>
                  {target}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Exported Signals Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Exported Signals</h2>
          <p className="text-sm text-gray-500">
            {filteredSignals.length} signals displayed
          </p>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
                Export Target
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Export Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Exported
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSignals.map((signal, index) => (
              <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {signal.signalId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {signal.exportTarget}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStatusBadge(signal.exportStatus)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(signal.lastExported)}
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
              <span className="font-medium">{filteredSignals.length}</span> of{" "}
              <span className="font-medium">{exportedSignals.length}</span>{" "}
              results
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
          implementation, you can view export status but retry functionality
          will be available in Tier 2.
        </p>
      </div>
    </div>
  );
};

export default CoreExportHub;
