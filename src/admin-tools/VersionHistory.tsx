import {
  ArrowDown,
  Calendar,
  ChevronDown,
  Clock,
  Eye,
  Filter,
  RefreshCw,
  Search,
  Share2,
  User,
} from "lucide-react";
import { useState } from "react";

const VersionHistoryAuditLogs = () => {
  const [activeTab, setActiveTab] = useState("audit");
  const [selectedModule, setSelectedModule] = useState("all");
  const [timeRange, setTimeRange] = useState("7d");
  const [filterOpen, setFilterOpen] = useState(false);

  // Sample audit log data
  const auditLogs = [
    {
      id: 1,
      timestamp: "2025-05-10 09:23:45",
      user: "Sarah Johnson",
      module: "Signal Studio",
      action: "Draft Edited",
      object: "Q2 Campaign Email",
      details: "Updated headline and call-to-action",
    },
    {
      id: 2,
      timestamp: "2025-05-10 08:12:30",
      user: "Michael Torres",
      module: "Memory Loom",
      action: "Codex Uploaded",
      object: "Brand Guidelines 2025",
      details: "New brand voice guidelines document",
    },
    {
      id: 3,
      timestamp: "2025-05-09 16:45:22",
      user: "Alex Wong",
      module: "Signal Flow",
      action: "Journey Activated",
      object: "Onboarding Sequence",
      details: "Started new customer journey",
    },
    {
      id: 4,
      timestamp: "2025-05-09 14:33:10",
      user: "Lisa Chen",
      module: "SignalCore",
      action: "Decision Rule Modified",
      object: "Conversion Optimizer",
      details: "Updated threshold from 0.65 to 0.70",
    },
    {
      id: 5,
      timestamp: "2025-05-09 11:20:15",
      user: "Rachel Kim",
      module: "SignalScope",
      action: "Entity Created",
      object: "Competitor Analysis",
      details: "Added new market player to tracking",
    },
    {
      id: 6,
      timestamp: "2025-05-08 17:05:33",
      user: "David Miller",
      module: "Signal Studio",
      action: "Content Approved",
      object: "Product Launch Email",
      details: "Final approval for distribution",
    },
    {
      id: 7,
      timestamp: "2025-05-08 15:47:21",
      user: "Emma Davis",
      module: "Memory Loom",
      action: "Brand Term Updated",
      object: "Product Description",
      details: "Modified positioning statement",
    },
    {
      id: 8,
      timestamp: "2025-05-08 10:15:09",
      user: "James Wilson",
      module: "Admin",
      action: "User Role Changed",
      object: "Lisa Chen",
      details: "Promoted to Content Admin role",
    },
  ];

  // Sample version history data
  const versionHistory = [
    {
      id: 1,
      version: "v2.3.1",
      timestamp: "2025-05-10 10:00:00",
      user: "Sarah Johnson",
      module: "Signal Studio",
      object: "Q2 Campaign Email",
      changes: "Headline, CTA button color",
      status: "Current",
    },
    {
      id: 2,
      version: "v2.3.0",
      timestamp: "2025-05-09 15:30:00",
      user: "Sarah Johnson",
      module: "Signal Studio",
      object: "Q2 Campaign Email",
      changes: "Image updates, body text",
      status: "Previous",
    },
    {
      id: 3,
      version: "v1.2.1",
      timestamp: "2025-05-09 13:15:00",
      user: "Michael Torres",
      module: "Memory Loom",
      object: "Brand Guidelines 2025",
      changes: "Voice guidelines section",
      status: "Current",
    },
    {
      id: 4,
      version: "v1.2.0",
      timestamp: "2025-05-08 16:40:00",
      user: "Michael Torres",
      module: "Memory Loom",
      object: "Brand Guidelines 2025",
      changes: "Initial document upload",
      status: "Previous",
    },
    {
      id: 5,
      version: "v3.1.2",
      timestamp: "2025-05-08 14:20:00",
      user: "Alex Wong",
      module: "Signal Flow",
      object: "Onboarding Sequence",
      changes: "Added email #3 trigger",
      status: "Current",
    },
    {
      id: 6,
      version: "v3.1.1",
      timestamp: "2025-05-07 11:45:00",
      user: "Alex Wong",
      module: "Signal Flow",
      object: "Onboarding Sequence",
      changes: "Modified welcome timing",
      status: "Previous",
    },
    {
      id: 7,
      version: "v3.1.0",
      timestamp: "2025-05-06 09:30:00",
      user: "Alex Wong",
      module: "Signal Flow",
      object: "Onboarding Sequence",
      changes: "Initial journey setup",
      status: "Archived",
    },
  ];

  const filteredLogs = auditLogs.filter(
    (log) => selectedModule === "all" || log.module === selectedModule
  );

  const filteredVersions = versionHistory.filter(
    (version) => selectedModule === "all" || version.module === selectedModule
  );

  const moduleColors = {
    "Signal Studio": "bg-blue-100 text-blue-800",
    "Memory Loom": "bg-purple-100 text-purple-800",
    "Signal Flow": "bg-green-100 text-green-800",
    SignalCore: "bg-orange-100 text-orange-800",
    SignalScope: "bg-red-100 text-red-800",
    Admin: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="p-6 max-w-full bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Version History & Audit Logs
        </h1>
        <div className="flex space-x-2">
          <button
            className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-2 text-sm"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={16} />
            Filter
            <ChevronDown size={16} />
          </button>
          <button className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-2 text-sm">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {filterOpen && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Module
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
              >
                <option value="all">All Modules</option>
                <option value="Signal Studio">Signal Studio</option>
                <option value="Memory Loom">Memory Loom</option>
                <option value="Signal Flow">Signal Flow</option>
                <option value="SignalCore">SignalCore</option>
                <option value="SignalScope">SignalScope</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="flex-1 min-w-[180px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Range
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div className="flex-1 min-w-[220px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by user or object..."
                  className="w-full p-2 pl-9 border border-gray-300 rounded-md"
                />
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`py-2 px-1 ${
                activeTab === "audit"
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } font-medium text-sm`}
              onClick={() => setActiveTab("audit")}
            >
              Audit Logs
            </button>
            <button
              className={`py-2 px-1 ${
                activeTab === "version"
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } font-medium text-sm`}
              onClick={() => setActiveTab("version")}
            >
              Version History
            </button>
          </nav>
        </div>
      </div>

      {activeTab === "audit" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    Timestamp
                    <ArrowDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Module
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
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
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2 text-gray-400" />
                      {log.timestamp}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center">
                      <User size={14} className="mr-2 text-gray-400" />
                      {log.user}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        moduleColors[log.module]
                      }`}
                    >
                      {log.module}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-medium">
                    {log.object}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">Version</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    Timestamp
                    <ArrowDown size={14} className="ml-1" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Module
                </th>
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
                  Changes
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVersions.map((version) => (
                <tr key={version.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {version.version}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2 text-gray-400" />
                      {version.timestamp}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center">
                      <User size={14} className="mr-2 text-gray-400" />
                      {version.user}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        moduleColors[version.module]
                      }`}
                    >
                      {version.module}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-medium">
                    {version.object}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {version.changes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        version.status === "Current"
                          ? "bg-green-100 text-green-800"
                          : version.status === "Previous"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {version.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Eye size={16} />
                      </button>
                      {version.status !== "Current" && (
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <RefreshCw size={16} />
                        </button>
                      )}
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <div>
          Showing{" "}
          {activeTab === "audit"
            ? filteredLogs.length
            : filteredVersions.length}{" "}
          entries
        </div>
        <div className="flex items-center space-x-2">
          <span>Page 1 of 1</span>
          <div className="flex space-x-1">
            <button
              className="px-2 py-1 border rounded disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              className="px-2 py-1 border rounded disabled:opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionHistoryAuditLogs;
