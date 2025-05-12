import {
  AlertCircle,
  CheckCircle,
  Edit,
  Plus,
  Search,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

const RolePermissionSystem = () => {
  // Sample data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      role: "Editor",
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      email: "alex.rodriguez@example.com",
      role: "Viewer",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Editor",
    },
  ]);

  const [roles] = useState(["Admin", "Editor", "Viewer"]);

  const [modules] = useState([
    "Signal Studio",
    "Memory Loom",
    "Signal Flow",
    "SignalCore",
    "SignalScope",
  ]);

  const [permissionTypes] = useState(["View", "Edit", "Admin"]);

  // Initial permission matrix (module x permission type)
  const [permissionsMatrix, setPermissionsMatrix] = useState({
    Admin: {
      "Signal Studio": { View: true, Edit: true, Admin: true },
      "Memory Loom": { View: true, Edit: true, Admin: true },
      "Signal Flow": { View: true, Edit: true, Admin: true },
      SignalCore: { View: true, Edit: true, Admin: true },
      SignalScope: { View: true, Edit: true, Admin: true },
    },
    Editor: {
      "Signal Studio": { View: true, Edit: true, Admin: false },
      "Memory Loom": { View: true, Edit: true, Admin: false },
      "Signal Flow": { View: true, Edit: true, Admin: false },
      SignalCore: { View: true, Edit: false, Admin: false },
      SignalScope: { View: true, Edit: false, Admin: false },
    },
    Viewer: {
      "Signal Studio": { View: true, Edit: false, Admin: false },
      "Memory Loom": { View: true, Edit: false, Admin: false },
      "Signal Flow": { View: true, Edit: false, Admin: false },
      SignalCore: { View: true, Edit: false, Admin: false },
      SignalScope: { View: true, Edit: false, Admin: false },
    },
  });

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPermissionMatrix, setShowPermissionMatrix] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);

  // New user form data
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Viewer",
  });

  // Status message
  const [statusMessage, setStatusMessage] = useState({
    show: false,
    type: "",
    message: "",
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      setStatusMessage({
        show: true,
        type: "error",
        message: "Name and email are required fields",
      });
      return;
    }

    const id =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
    setUsers([...users, { id, ...newUser }]);
    setShowAddModal(false);
    setNewUser({ name: "", email: "", role: "Viewer" });

    setStatusMessage({
      show: true,
      type: "success",
      message: "User added successfully",
    });

    // Hide status message after 3 seconds
    setTimeout(() => {
      setStatusMessage({ show: false, type: "", message: "" });
    }, 3000);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));

      setStatusMessage({
        show: true,
        type: "success",
        message: "User deleted successfully",
      });

      // Hide status message after 3 seconds
      setTimeout(() => {
        setStatusMessage({ show: false, type: "", message: "" });
      }, 3000);
    }
  };

  const handleRoleChange = (id, newRole) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, role: newRole } : user))
    );
  };

  const handleEditPermissions = (role) => {
    setSelectedRole(role);
    setShowPermissionMatrix(true);
  };

  const handlePermissionChange = (module, permissionType, value) => {
    // Create a deep copy of the permissions matrix
    const updatedMatrix = JSON.parse(JSON.stringify(permissionsMatrix));

    // Update the value
    updatedMatrix[selectedRole][module][permissionType] = value;

    // If setting "Admin" to true, ensure View and Edit are also true
    if (permissionType === "Admin" && value === true) {
      updatedMatrix[selectedRole][module]["View"] = true;
      updatedMatrix[selectedRole][module]["Edit"] = true;
    }

    // If setting "View" to false, ensure Edit and Admin are also false
    if (permissionType === "View" && value === false) {
      updatedMatrix[selectedRole][module]["Edit"] = false;
      updatedMatrix[selectedRole][module]["Admin"] = false;
    }

    // If setting "Edit" to false, ensure Admin is also false
    if (permissionType === "Edit" && value === false) {
      updatedMatrix[selectedRole][module]["Admin"] = false;
    }

    setPermissionsMatrix(updatedMatrix);
  };

  // Effect to check if user is admin (for demo purposes)
  useEffect(() => {
    // In a real application, this would be determined from authentication
    setIsAdmin(true);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Role Permission System
            </h1>

            {statusMessage.show && (
              <div
                className={`flex items-center p-2 rounded ${
                  statusMessage.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                <span>{statusMessage.message}</span>
              </div>
            )}

            {isAdmin && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </button>
            )}
          </div>

          {/* User Roles Table */}
          <div className="mb-8">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">
                User Roles
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="py-3 px-4 border-b text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="font-medium text-gray-900">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-gray-600">
                        {user.email}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {isAdmin ? (
                          <select
                            value={user.role}
                            onChange={(e) =>
                              handleRoleChange(user.id, e.target.value)
                            }
                            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                          >
                            {roles.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {user.role}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-right text-sm font-medium">
                        {isAdmin && (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Permissions Matrix (Admin only) */}
          {isAdmin && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Permissions Matrix
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="py-3 px-4 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {roles.map((role) => (
                      <tr key={role} className="hover:bg-gray-50">
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="font-medium text-gray-900">
                            {role}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleEditPermissions(role)}
                            className="inline-flex items-center px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit Permissions
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

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Role
              </label>
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permission Matrix Modal */}
      {showPermissionMatrix && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {selectedRole} Role Permissions
              </h2>
              <button
                onClick={() => setShowPermissionMatrix(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Module
                    </th>
                    {permissionTypes.map((type) => (
                      <th
                        key={type}
                        className="py-3 px-4 border-b text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {type}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {modules.map((module) => (
                    <tr key={module} className="hover:bg-gray-50">
                      <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">
                        {module}
                      </td>
                      {permissionTypes.map((type) => (
                        <td
                          key={type}
                          className="py-3 px-4 whitespace-nowrap text-center"
                        >
                          <input
                            type="checkbox"
                            checked={
                              permissionsMatrix[selectedRole][module][type]
                            }
                            onChange={(e) =>
                              handlePermissionChange(
                                module,
                                type,
                                e.target.checked
                              )
                            }
                            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPermissionMatrix(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolePermissionSystem;
