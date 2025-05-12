import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InsightRouter = () => {
  const navigate = useNavigate();
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const [destinationFilter, setDestinationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const signals = [
    {
      id: "SIG-2025-0485",
      score: 98,
      destination: "",
      status: "Pending",
    },
    {
      id: "SIG-2025-0484",
      score: 87,
      destination: "SignalCore",
      status: "Routed",
    },
    {
      id: "SIG-2025-0473",
      score: 76,
      destination: "Memory Loom",
      status: "Routed",
    },
    {
      id: "SIG-2025-0471",
      score: 72,
      destination: "",
      status: "Pending",
    },
    {
      id: "SIG-2025-0469",
      score: 45,
      destination: "Export Endpoint",
      status: "Failed",
    },
  ];

  const filteredSignals = signals.filter((signal) => {
    if (destinationFilter !== "All" && signal.destination !== destinationFilter)
      return false;
    if (statusFilter !== "All" && signal.status !== statusFilter) return false;
    return true;
  });

  const toggleSignalSelection = (signalId: string) => {
    if (selectedSignals.includes(signalId)) {
      setSelectedSignals(selectedSignals.filter((id) => id !== signalId));
    } else {
      setSelectedSignals([...selectedSignals, signalId]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Breadcrumb and Back Button */}
        <div className="flex items-center mb-6">
          <button
            className="flex items-center text-blue-600 hover:text-blue-800"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to Dashboard
          </button>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-500">Insight Router</span>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Insight Router</h1>
          <p className="text-gray-600">
            Route scored signals to appropriate destinations
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex flex-wrap gap-4">
            {/* Destination Filter */}
            <div className="w-full sm:w-auto">
              <label
                htmlFor="destination"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Destination
              </label>
              <select
                id="destination"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
              >
                <option value="All">All Destinations</option>
                <option value="SignalCore">SignalCore</option>
                <option value="Memory Loom">Memory Loom</option>
                <option value="Export Endpoint">Export Endpoint</option>
                <option value="">Not Routed</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="w-full sm:w-auto">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Routed">Routed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Signals Table */}
        <div className="bg-white shadow rounded">
          <div className="px-4 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Scored Signals
            </h3>
            <span className="text-sm text-gray-500">
              Select signals to route
            </span>
          </div>
          <div className="overflow-x-auto">
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
                    Score Value
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Destination
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Route Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSignals.map((signal) => (
                  <tr key={signal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {signal.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`h-6 w-6 rounded-full ${
                            signal.score >= 80
                              ? "bg-green-500"
                              : signal.score >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          } flex items-center justify-center text-white text-xs font-medium mr-2`}
                        >
                          {signal.score}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {signal.destination || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          signal.status === "Routed"
                            ? "bg-green-100 text-green-800"
                            : signal.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {signal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {signal.status !== "Routed" && (
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => toggleSignalSelection(signal.id)}
                        >
                          {selectedSignals.includes(signal.id)
                            ? "Deselect"
                            : "Select"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Routing Controls */}
        {selectedSignals.length > 0 && (
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Route Selected Signals
            </h3>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="w-full sm:w-auto flex-grow">
                <label
                  htmlFor="route-destination"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Destination
                </label>
                <select
                  id="route-destination"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">Select Destination</option>
                  <option value="SignalCore">SignalCore</option>
                  <option value="Memory Loom">Memory Loom</option>
                  <option value="Export Endpoint">Export Endpoint</option>
                </select>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() =>
                  navigate("/dashboard/signal-scope/insight-router/detail")
                }
              >
                Route {selectedSignals.length} Signal
                {selectedSignals.length > 1 ? "s" : ""}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InsightRouter;
