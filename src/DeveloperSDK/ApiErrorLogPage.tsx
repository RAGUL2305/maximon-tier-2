import React, { useState } from "react";

const ApiErrorLogPage = () => {
  // Mock data for API errors
  const initialErrors = [
    {
      id: 1,
      timestamp: "2025-05-05T14:32:10Z",
      endpoint: "/v1/signals/create",
      errorCode: 401,
      message: "Unauthorized: Invalid API token",
    },
    {
      id: 2,
      timestamp: "2025-05-05T12:15:45Z",
      endpoint: "/v1/memory/query",
      errorCode: 400,
      message: 'Bad Request: Missing required parameter "query_text"',
    },
    {
      id: 3,
      timestamp: "2025-05-04T18:22:33Z",
      endpoint: "/v1/signals/validate",
      errorCode: 422,
      message: "Unprocessable Entity: Signal content exceeds maximum length",
    },
    {
      id: 4,
      timestamp: "2025-05-04T09:45:12Z",
      endpoint: "/v1/journey/trigger",
      errorCode: 404,
      message: 'Not Found: Journey with ID "journey_12345" does not exist',
    },
    {
      id: 5,
      timestamp: "2025-05-03T16:37:28Z",
      endpoint: "/v1/signals/create",
      errorCode: 429,
      message: "Too Many Requests: Rate limit exceeded",
    },
    {
      id: 6,
      timestamp: "2025-05-03T11:08:55Z",
      endpoint: "/v1/memory/inject",
      errorCode: 500,
      message: "Internal Server Error: Unexpected error occurred",
    },
  ];

  // State for errors and filters
  const [errors, setErrors] = useState(initialErrors);
  const [filters, setFilters] = useState({
    errorCode: "",
    endpoint: "",
    dateRange: "30", // Default to 30 days
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Format date for display
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Apply filters to error list
  const filteredErrors = errors.filter((error) => {
    // Filter by error code
    if (filters.errorCode && error.errorCode.toString() !== filters.errorCode) {
      return false;
    }

    // Filter by endpoint (partial match)
    if (filters.endpoint && !error.endpoint.includes(filters.endpoint)) {
      return false;
    }

    // Search term (checks endpoint and message)
    if (
      searchTerm &&
      !error.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !error.message.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Get unique error codes for filter dropdown
  const uniqueErrorCodes = [...new Set(errors.map((error) => error.errorCode))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header and Navigation would be here but omitted for brevity */}

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">API Error Log</h1>
          <div className="mt-3 sm:mt-0">
            <span className="text-sm text-gray-500">
              Showing last 30 days of API errors
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-4 md:gap-6">
            {/* Error Code Filter */}
            <div>
              <label
                htmlFor="errorCode"
                className="block text-sm font-medium text-gray-700"
              >
                Error Code
              </label>
              <select
                id="errorCode"
                name="errorCode"
                value={filters.errorCode}
                onChange={handleFilterChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">All Error Codes</option>
                {uniqueErrorCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label
                htmlFor="dateRange"
                className="block text-sm font-medium text-gray-700"
              >
                Date Range
              </label>
              <select
                id="dateRange"
                name="dateRange"
                value={filters.dateRange}
                onChange={handleFilterChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="7">Last 7 days</option>
                <option value="14">Last 14 days</option>
                <option value="30">Last 30 days</option>
              </select>
            </div>

            {/* Search by Endpoint */}
            <div className="col-span-2">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700"
              >
                Search by Endpoint
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="/v1/endpoint/path"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Log Table */}
        <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
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
                    API Endpoint
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Error Code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredErrors.length > 0 ? (
                  filteredErrors.map((error) => (
                    <tr key={error.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(error.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {error.endpoint}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            error.errorCode >= 500
                              ? "bg-red-100 text-red-800"
                              : error.errorCode >= 400
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {error.errorCode}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {error.message}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      No errors found matching the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty state if no errors */}
        {errors.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No API Errors
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your API has been running smoothly with no errors in the selected
              time period.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiErrorLogPage;
