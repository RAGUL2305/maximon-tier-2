import { useNavigate } from "react-router-dom";

const SignalScopeDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">SignalScope</h1>
          <p className="text-gray-600">External Perception Intelligence</p>
        </div>

        {/* KPI Tiles */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm font-medium text-gray-500">
              Signals Collected
            </p>
            <p className="text-2xl font-bold text-gray-900">247</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm font-medium text-gray-500">Signals Scored</p>
            <p className="text-2xl font-bold text-gray-900">182</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm font-medium text-gray-500">Insights Routed</p>
            <p className="text-2xl font-bold text-gray-900">125</p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => navigate("/dashboard/signal-scope/intake")}
          >
            Open Signal Intake
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => navigate("/dashboard/signal-scope/scoring-engine")}
          >
            Open Signal Scoring Engine
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => navigate("/dashboard/signal-scope/insight-router")}
          >
            Open Insight Router
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => navigate("/dashboard/signal-scope/memory-lookup")}
          >
            Memory Lookup
          </button>
        </div>

        {/* Recent Signals Table */}
        <div className="bg-white shadow rounded">
          <div className="px-4 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Signals
            </h3>
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
                    Source
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
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    SIG-2025-0473
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Twitter
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Scored
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2 hours ago
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    SIG-2025-0472
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Google Search
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Unscored
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    3 hours ago
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    SIG-2025-0471
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Product Review
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      Routed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    5 hours ago
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    SIG-2025-0470
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    LLM Testing
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      Routed
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    6 hours ago
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    SIG-2025-0469
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Social Media
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Scored
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Yesterday
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignalScopeDashboard;
