import {
  AlertTriangle,
  ArrowRight,
  ArrowUp,
  Check,
  Edit,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

const EscalationManager = () => {
  const [rules, setRules] = useState([
    {
      id: 1,
      trigger: "Brand Tone Drift > 60%",
      path: "Content Team Lead",
      status: "Active",
      priority: "High",
    },
    {
      id: 2,
      trigger: "Compliance Term Detected",
      path: "Legal Review",
      status: "Active",
      priority: "Critical",
    },
    {
      id: 3,
      trigger: "Customer Sentiment < 30%",
      path: "CX Manager",
      status: "Active",
      priority: "Medium",
    },
    {
      id: 4,
      trigger: "Revenue Drop > 15%",
      path: "Marketing Director",
      status: "Inactive",
      priority: "High",
    },
    {
      id: 5,
      trigger: "External Perception Shift",
      path: "Brand Manager",
      status: "Active",
      priority: "Medium",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newRule, setNewRule] = useState({
    trigger: "",
    path: "",
    priority: "Medium",
    status: "Active",
  });
  const [selectedView, setSelectedView] = useState("all");
  const [activeAlert, setActiveAlert] = useState({
    id: 2,
    message: "Compliance Issue: Financial claim requires approval",
    timestamp: "2 min ago",
    status: "Pending",
    module: "Signal Studio",
  });

  const handleAddRule = () => {
    setRules([...rules, { id: rules.length + 1, ...newRule }]);
    setNewRule({ trigger: "", path: "", priority: "Medium", status: "Active" });
    setShowAddModal(false);
  };

  const handleDeleteRule = (id) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  const handleToggleStatus = (id) => {
    setRules(
      rules.map((rule) =>
        rule.id === id
          ? {
              ...rule,
              status: rule.status === "Active" ? "Inactive" : "Active",
            }
          : rule
      )
    );
  };

  const handleResolveAlert = () => {
    setActiveAlert({ ...activeAlert, status: "Resolved" });
  };

  const filteredRules =
    selectedView === "all"
      ? rules
      : rules.filter((rule) => rule.status.toLowerCase() === selectedView);

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Medium":
        return "bg-blue-100 text-blue-800";
      case "Low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Escalation Manager
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure when and how to route exceptions for human review
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-white rounded-md shadow-sm">
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setSelectedView("all")}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  selectedView === "all"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedView("active")}
                className={`px-4 py-2 text-sm font-medium ${
                  selectedView === "active"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setSelectedView("inactive")}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  selectedView === "inactive"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700"
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Rule
          </button>
        </div>
      </div>

      {/* Active Alerts Section */}
      <div className="px-6 py-4 bg-amber-50 border-b border-amber-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
            <h3 className="text-sm font-medium text-amber-800">
              Active Escalation
            </h3>
          </div>
          <span className="text-xs text-amber-700 bg-amber-100 rounded-full px-2 py-1">
            {activeAlert.status}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">
              {activeAlert.message}
            </p>
            <div className="flex items-center mt-1">
              <span className="text-xs text-gray-500">
                {activeAlert.timestamp}
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-xs text-gray-500">
                From: {activeAlert.module}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleResolveAlert}
              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-green-500"
            >
              <Check className="h-3 w-3 mr-1" /> Resolve
            </button>
            <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500">
              <ArrowRight className="h-3 w-3 mr-1" /> Forward
            </button>
          </div>
        </div>
      </div>

      {/* Rules Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Trigger Condition
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Escalation Path
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Priority
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRules.map((rule) => (
              <tr key={rule.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{rule.trigger}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 text-gray-400 mr-2" />
                    <div className="text-sm text-gray-900">{rule.path}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(
                      rule.priority
                    )}`}
                  >
                    {rule.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      rule.status
                    )}`}
                  >
                    {rule.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleToggleStatus(rule.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {rule.status === "Active" ? (
                        <X className="h-4 w-4" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteRule(rule.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Rule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Add Escalation Rule
              </h3>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="trigger"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Trigger Condition
                  </label>
                  <input
                    type="text"
                    id="trigger"
                    value={newRule.trigger}
                    onChange={(e) =>
                      setNewRule({ ...newRule, trigger: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., Brand Tone Drift > 50%"
                  />
                </div>
                <div>
                  <label
                    htmlFor="path"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Escalation Path
                  </label>
                  <input
                    type="text"
                    id="path"
                    value={newRule.path}
                    onChange={(e) =>
                      setNewRule({ ...newRule, path: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., Content Team Lead"
                  />
                </div>
                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={newRule.priority}
                    onChange={(e) =>
                      setNewRule({ ...newRule, priority: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={newRule.status}
                    onChange={(e) =>
                      setNewRule({ ...newRule, status: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRule}
                disabled={!newRule.trigger || !newRule.path}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  !newRule.trigger || !newRule.path
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
              >
                Add Rule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-500">
          <div className="mr-6">
            <span className="font-medium">Module Usage:</span> Signal Flow,
            SignalCore, SignalScope, Memory Loom
          </div>
          <div>
            <span className="font-medium">Access:</span> Admins & Supervisors
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscalationManager;
