import { useState } from "react";

const ApiTokensPage = () => {
  // Sample data for demonstration
  const [tokens, setTokens] = useState([
    {
      id: 1,
      name: "Production API",
      created: "2025-04-20",
      expiry: "2025-07-20",
      status: "Active",
    },
    {
      id: 2,
      name: "Testing Environment",
      created: "2025-03-15",
      expiry: "2025-06-15",
      status: "Active",
    },
    {
      id: 3,
      name: "Development Token",
      created: "2025-02-10",
      expiry: "2025-05-10",
      status: "Active",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTokenName, setNewTokenName] = useState("");
  const [expiryDays, setExpiryDays] = useState(30);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [tokenToRevoke, setTokenToRevoke] = useState<number | null>(null);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const handleCreateToken = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTokenName("");
    setExpiryDays(30);
  };

  const handleGenerateToken = () => {
    // In a real application, this would call an API to generate a token
    const today = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(today.getDate() + expiryDays);

    const newToken = {
      id: tokens.length + 1,
      name: newTokenName,
      created: today.toISOString().split("T")[0],
      expiry: expiryDate.toISOString().split("T")[0],
      status: "Active",
    };

    setTokens([...tokens, newToken]);
    handleCloseModal();
  };

  const handleRevokeClick = (tokenId: number) => {
    setTokenToRevoke(tokenId);
    setShowConfirmDialog(true);
  };

  const handleConfirmRevoke = () => {
    setTokens(
      tokens.map((token) =>
        token.id === tokenToRevoke ? { ...token, status: "Revoked" } : token
      )
    );
    setShowConfirmDialog(false);
    setTokenToRevoke(null);
  };

  const handleCopyToken = () => {
    // In a real app, this would copy the token to clipboard
    setShowCopyMessage(true);
    setTimeout(() => setShowCopyMessage(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header and Navigation would be here but omitted for brevity */}

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">API Tokens</h1>

          <div className="mt-3 sm:mt-0 sm:ml-4">
            <button
              type="button"
              onClick={handleCreateToken}
              disabled={tokens.filter((t) => t.status === "Active").length >= 5}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                tokens.filter((t) => t.status === "Active").length >= 5
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }`}
            >
              Create Token
            </button>
          </div>
        </div>

        {/* API Tokens Table */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Token Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Created Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Expiry Date
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
                      {tokens.map((token) => (
                        <tr key={token.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {token.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {token.created}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {token.expiry}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                token.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {token.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button
                                onClick={handleCopyToken}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Copy
                              </button>
                              {token.status === "Active" && (
                                <button
                                  onClick={() => handleRevokeClick(token.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Revoke
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help text */}
        <div className="mt-4 text-sm text-gray-500">
          <p>
            Maximum 5 active tokens allowed. Expired or revoked tokens do not
            count towards this limit.
          </p>
        </div>
      </div>

      {/* Create Token Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Create API Token
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Create a new API token to access Marketing OS services.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-4">
                  <label
                    htmlFor="token-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Token Name
                  </label>
                  <input
                    type="text"
                    name="token-name"
                    id="token-name"
                    value={newTokenName}
                    onChange={(e) => setNewTokenName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., Production API"
                    minLength={3}
                    maxLength={50}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration (Days)
                  </label>
                  <select
                    id="expiry"
                    name="expiry"
                    value={expiryDays}
                    onChange={(e) => setExpiryDays(parseInt(e.target.value))}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value={7}>7 days</option>
                    <option value={30}>30 days</option>
                    <option value={90}>90 days</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={handleGenerateToken}
                  disabled={!newTokenName.trim() || newTokenName.length < 3}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:col-start-2 sm:text-sm ${
                    !newTokenName.trim() || newTokenName.length < 3
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  }`}
                >
                  Generate
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revoke Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Revoke API Token
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to revoke this token? This action
                    cannot be undone, and the token will no longer be valid for
                    API access.
                  </p>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={handleConfirmRevoke}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                >
                  Revoke
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmDialog(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copy Success Message */}
      {showCopyMessage && (
        <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-20">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="p-2 rounded-lg bg-green-600 shadow-lg sm:p-3">
              <div className="flex items-center justify-between flex-wrap">
                <div className="w-0 flex-1 flex items-center">
                  <p className="ml-3 font-medium text-white truncate">
                    <span>Token copied to clipboard</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTokensPage;
