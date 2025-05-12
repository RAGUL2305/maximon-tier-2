import { useNavigate } from "react-router-dom";

const SignalCoreDashboard = () => {
  const navigate = useNavigate();
  // Mock data for demonstration purposes
  const kpiData = {
    mappedSignals: 124,
    activeSourcesCount: 7,
    optimizationStatus: "Active",
  };

  const recentSignals = [
    {
      id: "SIG-1021",
      source: "CRM System",
      status: "Mapped",
      lastUpdated: "2025-05-04T14:30:00",
    },
    {
      id: "SIG-1020",
      source: "Web Analytics",
      status: "Mapped",
      lastUpdated: "2025-05-04T12:15:00",
    },
    {
      id: "SIG-1019",
      source: "Email Campaign",
      status: "Unmapped",
      lastUpdated: "2025-05-04T10:45:00",
    },
    {
      id: "SIG-1018",
      source: "Social Media",
      status: "Routed",
      lastUpdated: "2025-05-04T09:30:00",
    },
    {
      id: "SIG-1017",
      source: "Web Analytics",
      status: "Mapped",
      lastUpdated: "2025-05-03T16:20:00",
    },
    {
      id: "SIG-1016",
      source: "CRM System",
      status: "Unmapped",
      lastUpdated: "2025-05-03T14:10:00",
    },
  ];

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
      case "Routed":
        bgColor = "bg-blue-100 text-blue-800";
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

  //   Function to format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Module Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">SignalCore</h2>
        <p className="text-gray-600">Revenue Intelligence Dashboard</p>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500 mb-1">Mapped Signals</p>
          <p className="text-3xl font-bold">{kpiData.mappedSignals}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500 mb-1">Sources Active</p>
          <p className="text-3xl font-bold">{kpiData.activeSourcesCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500 mb-1">Optimization Status</p>
          <p className="text-3xl font-bold">{kpiData.optimizationStatus}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/dashboard/signal-core/intake")}
          >
            Open Signal Intake
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/dashboard/signal-core/growth-signal")}
          >
            Open Growth Signal Mapper
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/dashboard/signal-core/design-engine")}
          >
            Open Decision Engine
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/dashboard/signal-core/export-hub")}
          >
            Open Export Hub
          </button>
        </div>
      </div>

      {/* Recent Signals Table */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-gray-800">Recent Signals</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View All
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
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
              {recentSignals.map((signal) => (
                <tr key={signal.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {signal.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {signal.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderStatusBadge(signal.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(signal.lastUpdated)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SignalCoreDashboard;
