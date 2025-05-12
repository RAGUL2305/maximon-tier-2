import { useState } from "react";

const GovernanceGuardrailConfig = () => {
  const [guardrails, setGuardrails] = useState([
    {
      id: 1,
      name: "Brand Voice Protection",
      enforcementLevel: "High",
      status: "Active",
      description:
        "Ensures all content maintains approved tone and voice characteristics",
    },
    {
      id: 2,
      name: "Legal Compliance",
      enforcementLevel: "Critical",
      status: "Active",
      description: "Prevents content that violates regulatory requirements",
    },
    {
      id: 3,
      name: "Sensitive Topic Detection",
      enforcementLevel: "Medium",
      status: "Active",
      description:
        "Flags content that discusses potentially controversial topics",
    },
    {
      id: 4,
      name: "Competitive Mention Alert",
      enforcementLevel: "Low",
      status: "Inactive",
      description: "Notifies when competitor brands are referenced",
    },
    {
      id: 5,
      name: "Revenue Claim Oversight",
      enforcementLevel: "High",
      status: "Active",
      description:
        "Validates that financial claims meet documentation standards",
    },
  ]);

  const [modules, setModules] = useState([
    { id: 1, name: "Signal Studio", selected: true },
    { id: 2, name: "Memory Loom", selected: true },
    { id: 3, name: "Signal Flow", selected: true },
    { id: 4, name: "SignalCore", selected: false },
    { id: 5, name: "SignalScope", selected: false },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentGuardrail, setCurrentGuardrail] = useState(null);

  const enforcementLevels = ["Low", "Medium", "High", "Critical"];

  const toggleModuleSelection = (id) => {
    setModules(
      modules.map((mod) =>
        mod.id === id ? { ...mod, selected: !mod.selected } : mod
      )
    );
  };

  const toggleStatus = (id) => {
    setGuardrails(
      guardrails.map((guardrail) =>
        guardrail.id === id
          ? {
              ...guardrail,
              status: guardrail.status === "Active" ? "Inactive" : "Active",
            }
          : guardrail
      )
    );
  };

  const openEditModal = (guardrail) => {
    setCurrentGuardrail({ ...guardrail });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (currentGuardrail) {
      setGuardrails(
        guardrails.map((g) =>
          g.id === currentGuardrail.id ? currentGuardrail : g
        )
      );
    } else {
      // Add new guardrail
      setGuardrails([
        ...guardrails,
        {
          id: guardrails.length + 1,
          ...currentGuardrail,
          status: "Active",
        },
      ]);
    }
    setModalOpen(false);
    setCurrentGuardrail(null);
  };

  const addNewGuardrail = () => {
    setCurrentGuardrail({
      name: "",
      enforcementLevel: "Medium",
      description: "",
      status: "Active",
    });
    setModalOpen(true);
  };

  return (
    <div className="p-6 max-w-full bg-gray-50 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Governance & Guardrail Config
          </h1>
          <p className="text-gray-600">
            Control brand safety and compliance across Marketing OS
          </p>
        </div>
        <button
          onClick={addNewGuardrail}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
        >
          <span className="mr-2">+ Add Guardrail</span>
        </button>
      </div>

      {/* Module Selection */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="font-semibold text-gray-700 mb-3">Apply to Modules</h2>
        <div className="flex flex-wrap gap-2">
          {modules.map((module) => (
            <button
              key={module.id}
              className={`px-4 py-2 rounded-full border ${
                module.selected
                  ? "bg-blue-100 border-blue-500 text-blue-700"
                  : "bg-gray-100 border-gray-300 text-gray-700"
              }`}
              onClick={() => toggleModuleSelection(module.id)}
            >
              {module.name}
              {module.selected ? " ✓" : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Guardrails Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enforcement Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {guardrails.map((guardrail) => (
              <tr key={guardrail.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {guardrail.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      guardrail.enforcementLevel === "Critical"
                        ? "bg-red-100 text-red-800"
                        : guardrail.enforcementLevel === "High"
                        ? "bg-orange-100 text-orange-800"
                        : guardrail.enforcementLevel === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {guardrail.enforcementLevel}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => toggleStatus(guardrail.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      guardrail.status === "Active"
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        guardrail.status === "Active"
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {guardrail.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => openEditModal(guardrail)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {currentGuardrail.id ? "Edit Guardrail" : "Add New Guardrail"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={currentGuardrail.name}
                  onChange={(e) =>
                    setCurrentGuardrail({
                      ...currentGuardrail,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enforcement Level
                </label>
                <select
                  value={currentGuardrail.enforcementLevel}
                  onChange={(e) =>
                    setCurrentGuardrail({
                      ...currentGuardrail,
                      enforcementLevel: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  {enforcementLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={currentGuardrail.description}
                  onChange={(e) =>
                    setCurrentGuardrail({
                      ...currentGuardrail,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="3"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernanceGuardrailConfig;
