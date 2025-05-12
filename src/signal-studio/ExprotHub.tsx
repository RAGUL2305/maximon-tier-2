import { useState } from "react";
import {
  Check,
  AlertTriangle,
  RefreshCw,
  ArrowDown,
  Clock,
  Filter,
  ChevronDown,
  Settings,
} from "lucide-react";

const ExportHub = () => {
  const [selectedFormat, setSelectedFormat] = useState("DOCX");
  const [showBatch, setShowBatch] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const mockExports = [
    {
      id: 1,
      title: "Q2 Campaign Brief",
      status: "Complete",
      format: "DOCX",
      date: "2025-04-22",
      destination: "CMS",
    },
    {
      id: 2,
      title: "Product Launch Email",
      status: "Complete",
      format: "HTML",
      date: "2025-04-21",
      destination: "CRM",
    },
    {
      id: 3,
      title: "Social Media Calendar",
      status: "Failed",
      format: "PDF",
      date: "2025-04-20",
      destination: "Asana",
    },
    {
      id: 4,
      title: "Brand Guidelines",
      status: "Processing",
      format: "PDF",
      date: "2025-04-20",
      destination: "DAM",
    },
    {
      id: 5,
      title: "Customer Journey Map",
      status: "Complete",
      format: "PNG",
      date: "2025-04-19",
      destination: "Figma",
    },
    {
      id: 6,
      title: "Blog Post Draft",
      status: "Complete",
      format: "DOCX",
      date: "2025-04-18",
      destination: "WordPress",
    },
  ];

  const toggleItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const toggleBatch = () => {
    setShowBatch(!showBatch);
    setSelectedItems([]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Complete":
        return <Check className="text-green-500" size={18} />;
      case "Failed":
        return <AlertTriangle className="text-red-500" size={18} />;
      case "Processing":
        return <RefreshCw className="text-blue-500 animate-spin" size={18} />;
      default:
        return null;
    }
  };

  const formatOptions = ["PDF", "DOCX", "HTML", "JSON", "PNG", "CSV"];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Export Hub</h1>
            <p className="text-gray-500 mt-1">
              Manage and distribute content across your channels
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleBatch}
              className={`px-4 py-2 border rounded-md flex items-center ${
                showBatch
                  ? "bg-blue-50 border-blue-300 text-blue-600"
                  : "border-gray-300"
              }`}
            >
              <Settings size={16} className="mr-2" />
              Batch Mode
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center">
              <ArrowDown size={16} className="mr-2" />
              New Export
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-4">
        {/* Filters */}
        <div className="bg-white p-4 rounded-md shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="mr-2 text-gray-700">Format:</span>
                <div className="relative">
                  <select
                    className="appearance-none bg-gray-50 border border-gray-300 rounded-md py-2 pl-3 pr-8 text-gray-700"
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                  >
                    <option value="">All Formats</option>
                    {formatOptions.map((format) => (
                      <option key={format} value={format}>
                        {format}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-3 text-gray-500 pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <span className="mr-2 text-gray-700">Status:</span>
                <div className="relative">
                  <select className="appearance-none bg-gray-50 border border-gray-300 rounded-md py-2 pl-3 pr-8 text-gray-700">
                    <option>All Status</option>
                    <option>Complete</option>
                    <option>Failed</option>
                    <option>Processing</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-3 text-gray-500 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <Filter size={16} className="mr-1" />
              Advanced Filters
            </button>
          </div>
        </div>

        {/* Export Table */}
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {showBatch && (
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      onChange={() => {
                        if (selectedItems.length === mockExports.length) {
                          setSelectedItems([]);
                        } else {
                          setSelectedItems(mockExports.map((item) => item.id));
                        }
                      }}
                      checked={
                        selectedItems.length === mockExports.length &&
                        mockExports.length > 0
                      }
                    />
                  </th>
                )}
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Format
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Destination
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockExports.map((item) => (
                <tr
                  key={item.id}
                  className={item.status === "Failed" ? "bg-red-50" : ""}
                >
                  {showBatch && (
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleItem(item.id)}
                      />
                    </td>
                  )}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.title}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(item.status)}
                      <span
                        className={`ml-1 text-sm ${
                          item.status === "Complete"
                            ? "text-green-800"
                            : item.status === "Failed"
                            ? "text-red-800"
                            : "text-blue-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.format}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.destination}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1 text-gray-400" />
                      {item.date}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex space-x-2">
                      {item.status === "Complete" && (
                        <button className="px-2 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition">
                          Download
                        </button>
                      )}
                      {item.status === "Failed" && (
                        <button className="px-2 py-1 bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition">
                          Retry
                        </button>
                      )}
                      <button className="px-2 py-1 bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition">
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Batch Actions (visible when in batch mode) */}
        {showBatch && selectedItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center">
            <div>
              <span className="font-medium">
                {selectedItems.length} items selected
              </span>
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition">
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Batch Export
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Advanced Export Features Section */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Export Formats
            </h3>
            <p className="text-gray-600 mb-3">
              Multiple export formats supported for different channels.
            </p>
            <div className="flex flex-wrap gap-2">
              {formatOptions.map((format) => (
                <span
                  key={format}
                  className="px-2 py-1 bg-gray-100 text-xs rounded-md text-gray-700"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Export Logs
            </h3>
            <p className="text-gray-600 mb-3">
              Track and monitor all export activities over time.
            </p>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View Complete History →
            </button>
          </div>

          <div className="p-4 border border-gray-200 rounded-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Batch Export
            </h3>
            <p className="text-gray-600 mb-3">
              Export multiple items at once to increase efficiency.
            </p>
            <button
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={toggleBatch}
            >
              {showBatch ? "Exit Batch Mode" : "Enter Batch Mode"} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportHub;
