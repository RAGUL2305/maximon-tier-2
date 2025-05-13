import {
  AlertTriangle,
  CheckCircle,
  Download,
  FileText,
  RefreshCw,
  Settings,
} from "lucide-react";
import { useState } from "react";

const SignalCoreExportHub = () => {
  const [signals, setSignals] = useState([
    {
      id: "SIG-001",
      destination: "CRM Platform",
      status: "Success",
      lastExported: "2025-05-09",
      type: "Optimization",
    },
    {
      id: "SIG-002",
      destination: "Email Platform",
      status: "Failed",
      lastExported: "2025-05-08",
      type: "Revenue",
    },
    {
      id: "SIG-003",
      destination: "Ad Platform",
      status: "Success",
      lastExported: "2025-05-09",
      type: "Journey",
    },
    {
      id: "SIG-004",
      destination: "CMS",
      status: "Pending",
      lastExported: "2025-05-08",
      type: "Content",
    },
    {
      id: "SIG-005",
      destination: "Analytics Platform",
      status: "Success",
      lastExported: "2025-05-07",
      type: "Performance",
    },
  ]);

  const [selectedFormat, setSelectedFormat] = useState("JSON");
  const [activeTab, setActiveTab] = useState("signals");
  const [showSettings, setShowSettings] = useState(false);

  const handleRetryExport = (id: any) => {
    setSignals(
      signals.map((signal) =>
        signal.id === id ? { ...signal, status: "Pending" } : signal
      )
    );

    // Simulate processing
    setTimeout(() => {
      setSignals(
        signals.map((signal) =>
          signal.id === id
            ? { ...signal, status: "Success", lastExported: "2025-05-10" }
            : signal
        )
      );
    }, 1500);
  };

  const handleExportFormat = (format: any) => {
    setSelectedFormat(format);
    setShowSettings(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 text-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Header */}

      {showSettings && (
        <div className="absolute right-8 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10 border border-gray-600">
          <div className="p-3 border-b border-gray-600">
            <h3 className="font-medium text-white">Export Format</h3>
          </div>
          <div className="p-2">
            <button
              className={`w-full text-left px-3 py-2 rounded text-gray-200 ${
                selectedFormat === "JSON"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-600"
              }`}
              onClick={() => handleExportFormat("JSON")}
            >
              JSON
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded text-gray-200 ${
                selectedFormat === "CSV"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-600"
              }`}
              onClick={() => handleExportFormat("CSV")}
            >
              CSV
            </button>
            <button
              className={`w-full text-left px-3 py-2 rounded text-gray-200 ${
                selectedFormat === "API Push"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-600"
              }`}
              onClick={() => handleExportFormat("API Push")}
            >
              API Push
            </button>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b">
        <button
          className={`px-4 py-3 font-medium ${
            activeTab === "signals"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("signals")}
        >
          Signals
        </button>
        <button
          className={`px-4 py-3 font-medium ${
            activeTab === "logs"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("logs")}
        >
          Export Logs
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === "signals" ? (
          <div className="bg-white rounded-lg border">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-semibold">Signal Exports</h2>
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 rounded-full hover:bg-blue-500 transition-colors"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings size={20} />
                </button>
                <div className="text-sm text-gray-500">
                  Format: <span className="font-medium">{selectedFormat}</span>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center">
                  <Download size={16} className="mr-1" /> Batch Export
                </button>
              </div>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Signal ID
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Destination
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">
                    Last Exported
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {signals.map((signal) => (
                  <tr key={signal.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{signal.id}</td>
                    <td className="px-4 py-3">{signal.type}</td>
                    <td className="px-4 py-3">{signal.destination}</td>
                    <td className="px-4 py-3">
                      {signal.status === "Success" && (
                        <span className="flex items-center text-green-600">
                          <CheckCircle size={16} className="mr-1" /> Success
                        </span>
                      )}
                      {signal.status === "Failed" && (
                        <span className="flex items-center text-red-600">
                          <AlertTriangle size={16} className="mr-1" /> Failed
                        </span>
                      )}
                      {signal.status === "Pending" && (
                        <span className="flex items-center text-yellow-600">
                          <RefreshCw size={16} className="mr-1 animate-spin" />{" "}
                          Processing
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">{signal.lastExported}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="p-1 rounded hover:bg-gray-100"
                          onClick={() => handleRetryExport(signal.id)}
                          disabled={signal.status === "Pending"}
                        >
                          <RefreshCw
                            size={16}
                            className={
                              signal.status === "Pending"
                                ? "text-gray-400"
                                : "text-blue-600"
                            }
                          />
                        </button>
                        <button className="p-1 rounded hover:bg-gray-100">
                          <Download size={16} className="text-blue-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-lg border p-4">
            <h2 className="font-semibold mb-4">Export Logs</h2>
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-3 border rounded-lg flex items-start">
                  <FileText size={20} className="text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">
                      Signal Export{" "}
                      {i === 0 ? "Completed" : i === 1 ? "Failed" : "Completed"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {i === 0
                        ? "SIG-001 exported to CRM Platform successfully"
                        : i === 1
                        ? "SIG-002 export to Email Platform failed: connection timeout"
                        : `Batch export of ${i} signals completed`}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {i === 0
                        ? "1 minute ago"
                        : i === 1
                        ? "3 hours ago"
                        : `${i + 1} days ago`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="bg-gray-100 border-t p-3 text-sm text-gray-600 flex justify-between">
        <div>
          {signals.filter((s) => s.status === "Success").length} successful
          exports today
        </div>
        <div>
          {signals.filter((s) => s.status === "Failed").length} failed •
          {signals.filter((s) => s.status === "Pending").length} pending
        </div>
      </div>
    </div>
  );
};

export default SignalCoreExportHub;
