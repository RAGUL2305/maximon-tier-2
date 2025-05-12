import { useNavigate } from "react-router-dom";

const SignalFlowDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Title */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-xl font-semibold text-gray-800">Signal Flow</h1>

        {/* KPI Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">
              # Active Journeys
            </h3>
            <p className="text-2xl font-bold mt-1">12</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">
              # Completed Journeys
            </h3>
            <p className="text-2xl font-bold mt-1">27</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">
              # Triggers Configured
            </h3>
            <p className="text-2xl font-bold mt-1">43</p>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="my-6 flex justify-end">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
            onClick={() => navigate("/dashboard/signal-flow/create")}
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            New Journey
          </button>
        </div>

        {/* Journey List Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Journey Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Steps
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 cursor-pointer">
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600"
                  onClick={() => navigate("/dashboard/signal-flow/detail-view")}
                >
                  New Customer Onboarding
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  7
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2025-04-30
                </td>
              </tr>
              <tr className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  Abandoned Cart Recovery
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Draft
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  4
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2025-05-01
                </td>
              </tr>
              <tr className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  Re-engagement Campaign
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  5
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2025-04-25
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SignalFlowDashboard;
