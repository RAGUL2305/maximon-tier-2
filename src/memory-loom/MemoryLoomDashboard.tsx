import {
  AlertTriangle,
  BookOpen,
  Clock,
  Database,
  FileText,
  Search,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MemoryLoomDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  // Dummy data for UI demonstration
  const kpiData = {
    codexFiles: 24,
    memoryObjects: 136,
    lexiconTerms: 82,
  };

  const recentUploads = [
    {
      id: 1,
      filename: "Brand_Guidelines_2025.pdf",
      tags: ["brand", "guidelines"],
      uploadedBy: "Sarah Chen",
      date: "2 hours ago",
    },
    {
      id: 2,
      filename: "Customer_Journey_Map.docx",
      tags: ["journey", "customer"],
      uploadedBy: "Miguel Rodriguez",
      date: "5 hours ago",
    },
    {
      id: 3,
      filename: "Voice_Tone_Examples.pdf",
      tags: ["voice", "tone"],
      uploadedBy: "Aisha Johnson",
      date: "1 day ago",
    },
    {
      id: 4,
      filename: "Product_Messaging_Framework.docx",
      tags: ["product", "messaging"],
      uploadedBy: "Thomas Wright",
      date: "2 days ago",
    },
  ];

  const drifts = [
    {
      id: 1,
      object: "Value Proposition",
      severity: "high",
      lastChecked: "30 min ago",
    },
    {
      id: 2,
      object: "Product Terminology",
      severity: "medium",
      lastChecked: "2 hours ago",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Memory Loom</h1>
          {/* <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
            </button>
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
              TC
            </div>
          </div> */}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* KPI Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm font-medium">
                  Codex Files
                </h3>
                <Database size={20} className="text-indigo-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {kpiData.codexFiles}
              </p>
              <p className="text-sm text-gray-500 mt-1">+3 this week</p>
            </div>

            <div
              className="bg-white rounded-lg shadow p-6 hover:cursor-pointer"
              onClick={() => navigate("/dashboard/memoryobjectlist")}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm font-medium">
                  Memory Objects
                </h3>
                <FileText size={20} className="text-indigo-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {kpiData.memoryObjects}
              </p>
              <p className="text-sm text-gray-500 mt-1">+18 this week</p>
            </div>

            <div
              className="bg-white rounded-lg shadow p-6"
              onClick={() => navigate("/dashboard/brandlexicon")}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm font-medium">
                  Brand Lexicon Terms
                </h3>
                <BookOpen size={20} className="text-indigo-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {kpiData.lexiconTerms}
              </p>
              <p className="text-sm text-gray-500 mt-1">+5 this week</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
              onClick={() => navigate("/dashboard/codex")}
            >
              <Upload size={18} className="mr-2" />
              Upload Codex
            </button>

            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search memory objects..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "uploads"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("uploads")}
              >
                Recent Uploads
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "drift"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("drift")}
              >
                Drift Alerts
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              {/* Recent Uploads Panel */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">
                    Recent Uploads
                  </h2>
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">
                    View all
                  </button>
                </div>
                <div className="p-6">
                  <ul className="divide-y divide-gray-200">
                    {recentUploads.slice(0, 3).map((upload) => (
                      <li key={upload.id} className="py-4 flex">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <FileText size={20} className="text-indigo-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {upload.filename}
                            </p>
                            <p className="text-sm text-gray-500">
                              {upload.date}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center">
                            <p className="text-sm text-gray-500">
                              By {upload.uploadedBy}
                            </p>
                            <div className="ml-4 flex">
                              {upload.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="mr-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Governance Panel */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">
                    Governance Status
                  </h2>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Compliant
                  </span>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium text-gray-700">
                          Brand Compliance
                        </p>
                        <p className="text-sm text-gray-500">95%</p>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: "95%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium text-gray-700">
                          Term Consistency
                        </p>
                        <p className="text-sm text-gray-500">88%</p>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: "88%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium text-gray-700">
                          Drift Prevention
                        </p>
                        <p className="text-sm text-gray-500">92%</p>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">
                        Flagged Terms
                      </h3>
                      <div className="flex space-x-2">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full flex items-center">
                          <AlertTriangle size={12} className="mr-1" />
                          Product Suite
                        </span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full flex items-center">
                          <AlertTriangle size={12} className="mr-1" />
                          Enterprise Solutions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "uploads" && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  All Recent Uploads
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Filename
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tags
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Uploaded By
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
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
                    {recentUploads.map((upload) => (
                      <tr key={upload.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText
                              size={16}
                              className="text-gray-400 mr-2"
                            />
                            <div className="text-sm font-medium text-gray-900">
                              {upload.filename}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">
                            {upload.tags.map((tag) => (
                              <span
                                key={tag}
                                className="mr-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {upload.uploadedBy}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {upload.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Processed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "drift" && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Drift Scanner
                </h2>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full flex items-center">
                  <AlertTriangle size={12} className="mr-1" />2 files drifted
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
                        Object
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Severity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last Checked
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
                    {drifts.map((drift) => (
                      <tr key={drift.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {drift.object}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              drift.severity === "high"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {drift.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {drift.lastChecked}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                            Review
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            Ignore
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>Last synchronized: 5 minutes ago</span>
          </div>
          <div>
            <button className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sync Now
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MemoryLoomDashboard;
