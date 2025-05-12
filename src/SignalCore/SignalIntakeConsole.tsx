import { useState } from "react";

const SignalIntakeConsole = () => {
  // Mock data for demonstration purposes
  const initialSignals = [
    {
      id: "SIG-1021",
      source: "CRM System",
      receivedAt: "2025-05-04T14:30:00",
      status: "Mapped",
    },
    {
      id: "SIG-1020",
      source: "Web Analytics",
      receivedAt: "2025-05-04T12:15:00",
      status: "Mapped",
    },
    {
      id: "SIG-1019",
      source: "Email Campaign",
      receivedAt: "2025-05-04T10:45:00",
      status: "Unmapped",
    },
    {
      id: "SIG-1018",
      source: "Social Media",
      receivedAt: "2025-05-04T09:30:00",
      status: "Mapped",
    },
    {
      id: "SIG-1017",
      source: "Web Analytics",
      receivedAt: "2025-05-03T16:20:00",
      status: "Mapped",
    },
    {
      id: "SIG-1016",
      source: "CRM System",
      receivedAt: "2025-05-03T14:10:00",
      status: "Unmapped",
    },
    {
      id: "SIG-1015",
      source: "CRM System",
      receivedAt: "2025-05-03T11:05:00",
      status: "Unmapped",
    },
    {
      id: "SIG-1014",
      source: "Web Analytics",
      receivedAt: "2025-05-03T09:45:00",
      status: "Mapped",
    },
    {
      id: "SIG-1013",
      source: "Email Campaign",
      receivedAt: "2025-05-02T16:30:00",
      status: "Mapped",
    },
    {
      id: "SIG-1012",
      source: "Social Media",
      receivedAt: "2025-05-02T14:15:00",
      status: "Unmapped",
    },
  ];

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");

  // Extract unique sources for filter dropdown
  const sources = [
    "All",
    ...new Set(initialSignals.map((signal) => signal.source)),
  ];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Filter signals based on search and filters
  const filteredSignals = initialSignals.filter((signal) => {
    // Apply search filter
    const matchesSearch =
      searchTerm === "" ||
      signal.id.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply status filter
    const matchesStatus =
      statusFilter === "All" || signal.status === statusFilter;

    // Apply source filter
    const matchesSource =
      sourceFilter === "All" || signal.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  // Function to render status badge with appropriate color
  const renderStatusBadge = (status: string) => {
    let bgColor;
    switch (status) {
      case "Mapped":
        bgColor = "bg-green-100 text-green-800";
        break;
      case "Unmapped":
        bgColor = "bg-yellow-100 text-yellow-800";
        break;
      default:
        bgColor = "bg-gray-100 text-gray-800";
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
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
          <h1 className="text-2xl font-bold text-gray-800">
            Signal Intake Console
          </h1>
          <p className="text-gray-600">View list of incoming signals</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search by Signal ID
            </label>
            <input
              type="text"
              id="search"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter Signal ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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
              <option value="Mapped">Mapped</option>
              <option value="Unmapped">Unmapped</option>
            </select>
          </div>

          {/* Source Filter */}
          <div>
            <label
              htmlFor="source-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Source
            </label>
            <select
              id="source-filter"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Signals Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Incoming Signals</h2>
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
                Source Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Received At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSignals.map((signal) => (
              <tr key={signal.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {signal.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {signal.source}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(signal.receivedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStatusBadge(signal.status)}
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
              <span className="font-medium">{initialSignals.length}</span>{" "}
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
    </div>
  );
};

export default SignalIntakeConsole;
