import { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Download,
  Calendar,
  User,
  FileText,
  Clock,
  AlertCircle,
} from "lucide-react";

const AuditTrailLog = () => {
  // Sample audit trail data
  const initialAuditData = [
    {
      id: 1,
      action: "Upload",
      user: "Sarah Johnson",
      timestamp: "2025-05-10T09:23:45",
      objectAffected: "Brand_Guidelines_2025.pdf",
      module: "Memory Loom",
    },
    {
      id: 2,
      action: "Edit",
      user: "Michael Chen",
      timestamp: "2025-05-10T10:15:32",
      objectAffected: "Summer_Campaign_Draft",
      module: "Signal Studio",
    },
    {
      id: 3,
      action: "Delete",
      user: "Alexis Rodriguez",
      timestamp: "2025-05-09T16:47:21",
      objectAffected: "Old_Promotion_Journey",
      module: "Signal Flow",
    },
    {
      id: 4,
      action: "Approve",
      user: "Jordan Williams",
      timestamp: "2025-05-09T14:05:17",
      objectAffected: "Q2_Marketing_Draft",
      module: "Signal Studio",
    },
    {
      id: 5,
      action: "Upload",
      user: "Taylor Lee",
      timestamp: "2025-05-08T11:30:45",
      objectAffected: "Customer_Journey_Map.pdf",
      module: "Memory Loom",
    },
    {
      id: 6,
      action: "Edit",
      user: "Sarah Johnson",
      timestamp: "2025-05-08T09:12:33",
      objectAffected: "Product_Launch_Sequence",
      module: "Signal Flow",
    },
    {
      id: 7,
      action: "Create",
      user: "Michael Chen",
      timestamp: "2025-05-07T16:22:19",
      objectAffected: "New_Feature_Announcement",
      module: "Signal Studio",
    },
    {
      id: 8,
      action: "Review",
      user: "Alexis Rodriguez",
      timestamp: "2025-05-07T14:35:28",
      objectAffected: "Customer_Feedback_Insights",
      module: "SignalScope",
    },
  ];

  const [auditData, setAuditData] = useState(initialAuditData);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof (typeof initialAuditData)[0];
    direction: "asc" | "desc";
  }>({
    key: "timestamp",
    direction: "desc",
  });
  const [filterAction, setFilterAction] = useState("");
  const [filterModule, setFilterModule] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showFilters, setShowFilters] = useState(false);

  // Sort handler
  const handleSort = (key: keyof (typeof initialAuditData)[0]) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Apply all filters and sorting
  const getFilteredAndSortedData = () => {
    let filteredData = [...initialAuditData];

    // Apply action filter
    if (filterAction) {
      filteredData = filteredData.filter(
        (item) => item.action === filterAction
      );
    }

    // Apply module filter
    if (filterModule) {
      filteredData = filteredData.filter(
        (item) => item.module === filterModule
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter(
        (item) =>
          item.objectAffected.toLowerCase().includes(query) ||
          item.user.toLowerCase().includes(query)
      );
    }

    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59); // Set to end of day

      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return filteredData;
  };

  const filteredAndSortedData = getFilteredAndSortedData();

  // Get unique action types and modules for filters
  const actionTypes = [...new Set(initialAuditData.map((item) => item.action))];
  const modules = [...new Set(initialAuditData.map((item) => item.module))];

  // Format date for display
  const formatDate = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Action color mapping
  const getActionColor = (action: string) => {
    const colors = {
      Upload: "bg-blue-100 text-blue-800",
      Edit: "bg-yellow-100 text-yellow-800",
      Delete: "bg-red-100 text-red-800",
      Approve: "bg-green-100 text-green-800",
      Create: "bg-purple-100 text-purple-800",
      Review: "bg-indigo-100 text-indigo-800",
    };
    return colors[action as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Clock className="h-6 w-6 text-gray-700 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Audit Trail Log</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {showFilters ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className={`mb-6 ${showFilters ? "block" : "hidden"}`}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search objects or users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <select
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
            >
              <option value="">All Actions</option>
              {actionTypes.map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
            >
              <option value="">All Modules</option>
              {modules.map((module) => (
                <option key={module} value={module}>
                  {module}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              placeholder="Start Date"
            />
          </div>

          <div>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
              placeholder="End Date"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              setFilterAction("");
              setFilterModule("");
              setSearchQuery("");
              setDateRange({ start: "", end: "" });
            }}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results summary */}
      <div className="mb-4 text-sm text-gray-500 flex items-center">
        <AlertCircle className="h-4 w-4 mr-1" />
        Showing {filteredAndSortedData.length} of {initialAuditData.length}{" "}
        audit records
        {(filterAction ||
          filterModule ||
          searchQuery ||
          (dateRange.start && dateRange.end)) &&
          " (filtered)"}
      </div>

      {/* Audit trail table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("action")}
              >
                <div className="flex items-center">
                  Action
                  {sortConfig.key === "action" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("user")}
              >
                <div className="flex items-center">
                  User
                  {sortConfig.key === "user" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("timestamp")}
              >
                <div className="flex items-center">
                  Timestamp
                  {sortConfig.key === "timestamp" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("objectAffected")}
              >
                <div className="flex items-center">
                  Object Affected
                  {sortConfig.key === "objectAffected" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("module")}
              >
                <div className="flex items-center">
                  Module
                  {sortConfig.key === "module" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedData.length > 0 ? (
              filteredAndSortedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(
                        item.action
                      )}`}
                    >
                      {item.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{item.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">
                        {formatDate(item.timestamp)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {item.objectAffected}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.module}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No audit records found matching the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - simplified for demo */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">
              {Math.min(10, filteredAndSortedData.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium">{filteredAndSortedData.length}</span>{" "}
            results
          </p>
        </div>
        <div className="flex justify-end">
          <button className="px-3 py-1 border rounded-md mr-2 bg-white text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditTrailLog;
