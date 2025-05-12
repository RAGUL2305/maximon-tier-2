import { useState, useEffect } from "react";
import {
  AlertCircle,
  Copy,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";

type ApiToken = {
  id: string;
  name: string;
  created: string; // ISO date string
  expires: string; // ISO date string
  status: "active" | "expired"; // enum-like string literal union
  token: string;
};

const API_TOKENS_MOCK: ApiToken[] = [
  {
    id: "1",
    name: "Production API",
    created: "2025-04-01T12:00:00Z",
    expires: "2025-07-01T12:00:00Z",
    status: "active",
    token: "mkt_os_tk_prod_3z7x9y1w2a5s8d4f6g7h",
  },
  {
    id: "2",
    name: "Staging Environment",
    created: "2025-03-15T09:30:00Z",
    expires: "2025-06-15T09:30:00Z",
    status: "active",
    token: "mkt_os_tk_stg_8h7g6f5d4s3a2w1y9x3z",
  },
  {
    id: "3",
    name: "Legacy Integration",
    created: "2024-11-20T14:45:00Z",
    expires: "2025-02-20T14:45:00Z",
    status: "expired",
    token: "mkt_os_tk_old_4d3s2a1w9x8y7z6h5g4f",
  },
];

const APITokensPage = () => {
  const [tokens, setTokens] = useState<ApiToken[]>([]);
  const [showNewTokenModal, setShowNewTokenModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<ApiToken | null>(null);
  const [newTokenName, setNewTokenName] = useState("");
  const [newTokenExpiry, setNewTokenExpiry] = useState("30");
  const [newToken, setNewToken] = useState<ApiToken | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);

  useEffect(() => {
    // Simulating API fetch
    setTokens(API_TOKENS_MOCK);
    setTokenCount(
      API_TOKENS_MOCK.filter((token) => token.status === "active").length
    );
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Active
        </span>
      );
    } else {
      return (
        <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
          <XCircle className="w-3 h-3 mr-1" />
          Expired
        </span>
      );
    }
  };

  const handleCreateToken = () => {
    if (!newTokenName.trim()) {
      return;
    }

    // Check if max token limit reached
    if (tokenCount >= 5) {
      alert(
        "Maximum token limit (5) reached. Please revoke unused tokens first."
      );
      return;
    }

    const expiryDays = parseInt(newTokenExpiry);
    const now = new Date();
    const expiryDate = new Date(now);
    expiryDate.setDate(now.getDate() + expiryDays);

    const newTokenObj: ApiToken = {
      id: `new-${Date.now()}`,
      name: newTokenName,
      created: now.toISOString(),
      expires: expiryDate.toISOString(),
      status: "active",
      token: `mkt_os_tk_${Math.random().toString(36).substring(2, 15)}`,
    };

    setNewToken(newTokenObj);
    setTokens([newTokenObj, ...tokens]);
    setTokenCount(tokenCount + 1);
    setNewTokenName("");
    setNewTokenExpiry("30");
  };

  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleRevoke = (token: ApiToken) => {
    setSelectedToken(token);
    setShowRevokeModal(true);
  };

  const confirmRevoke = () => {
    const updatedTokens: ApiToken[] = tokens.map((token) =>
      token.id === selectedToken?.id ? { ...token, status: "expired" as const } : token
    );
    setTokens(updatedTokens);
    setTokenCount(tokenCount - 1);
    setShowRevokeModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                API Tokens
              </h1>
              <button
                onClick={() => setShowNewTokenModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Token
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Generate API tokens to authenticate requests to the Marketing OS
              Developer SDK.
            </p>
            {tokenCount >= 5 && (
              <div className="mt-4 flex items-center p-4 rounded-md bg-yellow-50 text-yellow-800">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>
                  Maximum token limit reached (5/5). Revoke unused tokens to
                  create new ones.
                </span>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Expires
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
                {tokens.map((token) => (
                  <tr key={token.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {token.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(token.created)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(token.expires)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(token.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {token.status === "active" && (
                        <button
                          onClick={() => handleRevoke(token)}
                          className="text-red-600 hover:text-red-900 ml-3"
                        >
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {tokens.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No API tokens found. Create one to get started.
              </p>
            </div>
          )}
        </div>

        {/* New Token Modal */}
        {showNewTokenModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Create New API Token
                      </h3>
                      <div className="mt-4">
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
                        />
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="token-expiry"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Expiration Period
                        </label>
                        <select
                          id="token-expiry"
                          name="token-expiry"
                          value={newTokenExpiry}
                          onChange={(e) => setNewTokenExpiry(e.target.value)}
                          className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="7">7 days</option>
                          <option value="30">30 days</option>
                          <option value="90">90 days</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleCreateToken}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Create Token
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewTokenModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Token Display Modal */}
        {newToken && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Token Created Successfully
                      </h3>
                      <div className="mt-4 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-500 mb-2">
                          Make sure to copy your new token now. You won't be
                          able to see it again.
                        </p>
                        <div className="flex items-center">
                          <div className="flex-1 font-mono text-xs sm:text-sm p-2 bg-white border border-gray-300 rounded-md overflow-x-auto">
                            {newToken.token}
                          </div>
                          <button
                            onClick={() => handleCopyToken(newToken.token)}
                            className="ml-2 p-2 text-blue-600 hover:text-blue-800"
                          >
                            {copiedToken ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => setNewToken(null)}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Revoke Confirmation Modal */}
        {showRevokeModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <Trash2
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Revoke API Token
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to revoke the token{" "}
                          <strong>{selectedToken?.name}</strong>? This action
                          cannot be undone and any applications using this token
                          will no longer be able to access the API.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={confirmRevoke}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Revoke
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRevokeModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default APITokensPage;
