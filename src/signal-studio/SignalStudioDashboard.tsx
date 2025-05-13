import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { FileText, Image, AlertTriangle, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignalStudioDashboard = () => {
  const navigate = useNavigate();

  // Mock data for KPI tiles
  const kpiData = [
    { title: "Drafts", count: 126, pending: 42, approved: 84 },
    { title: "Avg. Tone Score", value: 87, maxValue: 100 },
    { title: "Exports", count: 93 },
  ];

  // Mock data for recent drafts
  const recentDrafts = [
    {
      id: 1,
      title: "Q2 Product Launch Email",
      status: "Approved",
      toneScore: 92,
      lastUpdated: "2 hours ago",
    },
    {
      id: 2,
      title: "Summer Campaign Landing Page",
      status: "Pending",
      toneScore: 85,
      lastUpdated: "4 hours ago",
    },
    {
      id: 3,
      title: "Customer Success Story",
      status: "Pending",
      toneScore: 78,
      lastUpdated: "1 day ago",
    },
    {
      id: 4,
      title: "Social Media Announcement",
      status: "Approved",
      toneScore: 90,
      lastUpdated: "2 days ago",
    },
    {
      id: 5,
      title: "Weekly Newsletter",
      status: "Approved",
      toneScore: 88,
      lastUpdated: "3 days ago",
    },
  ];

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      message: '"Summer Campaign" draft requires approval',
      type: "approval",
    },
    {
      id: 2,
      message: 'Brand tone drift detected in "Product Release"',
      type: "warning",
    },
    { id: 3, message: "New prompt template added to library", type: "info" },
  ];

  // Mock data for draft status chart
  const draftStatusData = [
    { name: "Approved", value: 84, color: "#10B981" },
    { name: "Pending", value: 42, color: "#F59E0B" },
  ];

  // Mock data for tone score histogram
  const toneScoreData = [
    { range: "50-60", count: 5 },
    { range: "61-70", count: 12 },
    { range: "71-80", count: 28 },
    { range: "81-90", count: 47 },
    { range: "91-100", count: 34 },
  ];

  const getStatusColor = (status: string) => {
    return status === "Approved"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="font-bold text-xl text-blue-800">Signal Studio</div>
            <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
              Content AI
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              KC
            </div>
          </div>
        </div>
      </header> */}

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Signal Studio Dashboard
              </h1>

              {/* <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus className="w-4 h-4 mr-2" />
                New Draft
              </button> */}
            </div>
            {/* KPI Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {kpiData.map((kpi, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    {kpi.title}
                  </h3>

                  {kpi.title === "Drafts" ? (
                    <div>
                      <p className="text-3xl font-bold text-gray-900 mb-2">
                        {kpi.count}
                      </p>
                      <div className="flex space-x-4 text-sm">
                        <span className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
                          <span>{kpi.pending} Pending</span>
                        </span>
                        <span className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-green-400 mr-1"></span>
                          <span>{kpi.approved} Approved</span>
                        </span>
                      </div>
                    </div>
                  ) : kpi.title === "Avg. Tone Score" ? (
                    <div>
                      <p className="text-3xl font-bold text-gray-900 mb-1">
                        {kpi.value}/100
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${kpi.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold text-gray-900">
                      {kpi.count}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center hover:bg-gray-50"
                onClick={() => {
                  navigate("/dashboard/studio/editor");
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                  <FileText size={20} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Create New Draft</p>
                  <p className="text-sm text-gray-500">
                    Start a new content draft
                  </p>
                </div>
                <ChevronRight className="ml-auto text-gray-400" size={20} />
              </button>

              <button
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center hover:bg-gray-50"
                onClick={() => {
                  navigate("/dashboard/studio/visualasseststudio");
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                  <Image size={20} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">
                    Visual Asset Studio
                  </p>
                  <p className="text-sm text-gray-500">
                    Create brand-aligned images
                  </p>
                </div>
                <ChevronRight className="ml-auto text-gray-400" size={20} />
              </button>

              <button
                onClick={() => navigate("/dashboard/studio/snippet")}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center hover:bg-gray-50"
              >
                <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mr-3">
                  <FileText size={20} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Snippet Manager</p>
                  <p className="text-sm text-gray-500">
                    Manage reusable content blocks
                  </p>
                </div>
                <ChevronRight className="ml-auto text-gray-400" size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Drafts */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-semibold text-gray-800">
                      Recent Drafts
                    </h2>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      View All
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Title
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
                            Tone Score
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
                        {recentDrafts.map((draft) => (
                          <tr
                            key={draft.id}
                            className="hover:bg-gray-50 cursor-pointer"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {draft.title}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                  draft.status
                                )}`}
                              >
                                {draft.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="text-sm text-gray-900 mr-2">
                                  {draft.toneScore}
                                </span>
                                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className={`h-1.5 rounded-full ${
                                      draft.toneScore >= 90
                                        ? "bg-green-500"
                                        : draft.toneScore >= 80
                                        ? "bg-blue-500"
                                        : draft.toneScore >= 70
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                    }`}
                                    style={{ width: `${draft.toneScore}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {draft.lastUpdated}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Analytics Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Draft Status Chart */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">
                      Draft Status
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={draftStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            {draftStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Tone Score Distribution */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">
                      Tone Score Distribution
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={toneScoreData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <XAxis dataKey="range" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div>
                {/* Notifications */}
                <div className="bg-white rounded-lg shadow mb-6">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-semibold text-gray-800">
                      Studio Notifications
                    </h2>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      View All
                    </button>
                  </div>
                  <div className="p-4">
                    <ul className="divide-y divide-gray-200">
                      {notifications.map((notification) => (
                        <li key={notification.id} className="py-3">
                          <div className="flex items-start">
                            <div
                              className={`mt-1 mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                                notification.type === "approval"
                                  ? "bg-blue-600"
                                  : notification.type === "warning"
                                  ? "bg-yellow-500"
                                  : "bg-gray-400"
                              }`}
                            ></div>
                            <p className="text-sm text-gray-600">
                              {notification.message}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Brand Governance Alert */}
                <div className="bg-white rounded-lg shadow mb-6">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-semibold text-gray-800">
                      Brand Voice Governance
                    </h2>
                    <button
                      className="text-sm text-blue-600 hover:text-blue-800"
                      onClick={() => navigate("/dashboard/studio/governence")}
                    >
                      View
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertTriangle className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            Attention needed
                          </h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <p>
                              2 drafts are non-compliant with Brand Voice
                              guidelines.
                            </p>
                          </div>
                          <div className="mt-4">
                            <div className="-mx-2 -my-1.5 flex">
                              <button className="px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600">
                                Review issues
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Drift Status */}
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="font-semibold text-gray-800">
                      Drift Status
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">
                        Current Drift Score
                      </span>
                      <span className="text-xl font-semibold text-gray-900">
                        12%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: "12%" }}
                      ></div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                      Content is currently within acceptable drift parameters.
                    </p>
                    <button
                      className="mt-4 text-sm text-blue-600 hover:text-blue-800"
                      onClick={() => navigate("/dashboard/studio/drift")}
                    >
                      View Drift Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignalStudioDashboard;
