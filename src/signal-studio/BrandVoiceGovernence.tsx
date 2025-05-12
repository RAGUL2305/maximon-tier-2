import { useState } from "react";
import {
  PlusCircle,
  X,
  Check,
  AlertTriangle,
  Edit,
  Settings,
  Shield,
  Save,
  EyeOff,
} from "lucide-react";

type Rules = {
  id: number;
  name: string;
  status: string;
  description: string;
  enforcementLevel: string;
};

export default function BrandVoiceGovernanceConfig() {
  const [rules, setRules] = useState<Rules[]>([
    {
      id: 1,
      name: "Formal Tone",
      status: "Active",
      description: "Use professional language and avoid colloquialisms",
      enforcementLevel: "Strict",
    },
    {
      id: 2,
      name: "Brand Keywords",
      status: "Active",
      description: "Ensure all content includes approved product terminology",
      enforcementLevel: "Warning",
    },
    {
      id: 3,
      name: "Compliance Check",
      status: "Active",
      description: "Content must adhere to industry regulations",
      enforcementLevel: "Block",
    },
    {
      id: 4,
      name: "Banned Phrases",
      status: "Inactive",
      description: "Avoid specific competitor terms and problematic language",
      enforcementLevel: "Strict",
    },
  ]);

  const [selectedRule, setSelectedRule] = useState<Rules | null>(null);
  const [complianceLog] = useState([
    {
      id: 1,
      draft: "Summer Campaign Email",
      violation: "Formal Tone",
      timestamp: "2025-05-08 09:23:45",
    },
    {
      id: 2,
      draft: "Product Launch Blog",
      violation: "Brand Keywords",
      timestamp: "2025-05-08 14:17:32",
    },
    {
      id: 3,
      draft: "Social Media Post #12",
      violation: "Compliance Check",
      timestamp: "2025-05-09 11:05:21",
    },
  ]);

  const [isAddingRule, setIsAddingRule] = useState(false);
  const [newRule, setNewRule] = useState({
    name: "",
    description: "",
    enforcementLevel: "Warning",
  });

  const handleAddRule = () => {
    if (newRule.name) {
      setRules([
        ...rules,
        {
          id: rules.length + 1,
          name: newRule.name,
          description: newRule.description,
          enforcementLevel: newRule.enforcementLevel,
          status: "Active",
        },
      ]);
      setIsAddingRule(false);
      setNewRule({ name: "", description: "", enforcementLevel: "Warning" });
    }
  };

  const handleStatusChange = (id: number) => {
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

  const handleRuleEdit = (rule: Rules) => {
    setSelectedRule(rule);
  };

  const handleEditSave = () => {
    if (selectedRule) {
      setRules(
        rules.map((rule) => (rule.id === selectedRule.id ? selectedRule : rule))
      );
      setSelectedRule(null);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Brand Voice Governance
              </h1>
              <p className="text-gray-600 mt-2">
                Configure and manage brand voice rules and compliance settings
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                <Settings size={16} />
                <span>Global Settings</span>
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Shield size={20} className="mr-2 text-indigo-600" />
                  Governance Rules
                </h2>
                <button
                  className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700"
                  onClick={() => setIsAddingRule(true)}
                >
                  <PlusCircle size={16} />
                  <span>Add Rule</span>
                </button>
              </div>

              {isAddingRule ? (
                <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">New Governance Rule</h3>
                    <button
                      onClick={() => setIsAddingRule(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rule Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={newRule.name}
                        onChange={(e) =>
                          setNewRule({ ...newRule, name: e.target.value })
                        }
                        placeholder="E.g., Formal Tone, Brand Keywords"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={newRule.description}
                        onChange={(e) =>
                          setNewRule({
                            ...newRule,
                            description: e.target.value,
                          })
                        }
                        placeholder="Describe the rule and its purpose"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Enforcement Level
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={newRule.enforcementLevel}
                        onChange={(e) =>
                          setNewRule({
                            ...newRule,
                            enforcementLevel: e.target.value,
                          })
                        }
                      >
                        <option value="Warning">Warning</option>
                        <option value="Strict">Strict</option>
                        <option value="Block">Block</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => setIsAddingRule(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddRule}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        Add Rule
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {selectedRule ? (
                <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Edit Rule</h3>
                    <button
                      onClick={() => setSelectedRule(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Rule Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={selectedRule.name}
                        onChange={(e) =>
                          setSelectedRule({
                            ...selectedRule,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={selectedRule.description}
                        onChange={(e) =>
                          setSelectedRule({
                            ...selectedRule,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Enforcement Level
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={selectedRule.enforcementLevel}
                        onChange={(e) =>
                          setSelectedRule({
                            ...selectedRule,
                            enforcementLevel: e.target.value,
                          })
                        }
                      >
                        <option value="Warning">Warning</option>
                        <option value="Strict">Strict</option>
                        <option value="Block">Block</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => setSelectedRule(null)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleEditSave}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
                      >
                        <Save size={16} />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Rule Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Enforcement
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
                    {rules.map((rule) => (
                      <tr key={rule.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {rule.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {rule.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              rule.enforcementLevel === "Block"
                                ? "bg-red-100 text-red-800"
                                : rule.enforcementLevel === "Strict"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {rule.enforcementLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleStatusChange(rule.id)}
                            className={`inline-flex items-center px-2.5 py-1.5 border rounded-md text-xs font-medium ${
                              rule.status === "Active"
                                ? "border-green-200 text-green-800 bg-green-50"
                                : "border-gray-200 text-gray-800 bg-gray-50"
                            }`}
                          >
                            {rule.status === "Active" ? (
                              <>
                                <Check size={14} className="mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <EyeOff size={14} className="mr-1" />
                                Inactive
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleRuleEdit(rule)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            <Edit size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <AlertTriangle size={20} className="mr-2 text-yellow-500" />
                Compliance Checks
              </h2>
              <div className="space-y-4">
                {complianceLog.map((log) => (
                  <div
                    key={log.id}
                    className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r-md"
                  >
                    <div className="flex justify-between">
                      <h3 className="font-medium text-yellow-800">
                        {log.draft}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {log.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      Violated:{" "}
                      <span className="font-medium">{log.violation}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Settings size={20} className="mr-2 text-indigo-600" />
                Enforcement Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Auto-Validation
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enable real-time validation during content creation
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Block Exports
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Prevent export of non-compliant content
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Escalation
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Auto-escalate repeated violations
                  </p>
                </div>

                <div className="pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Enforcement Level
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="Warning">Warning</option>
                    <option value="Strict">Strict</option>
                    <option value="Block">Block</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Applied to rules without specific level
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
