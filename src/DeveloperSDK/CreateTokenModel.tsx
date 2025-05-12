import React, { useState } from "react";

interface TokenModel {
  isOpen: boolean;
  onClose: () => void;
  onCreateToken: (token: { name: string; expiryDays: number }) => void;
  tokenCount: number;
}

const CreateTokenModal = ({
  isOpen,
  onClose,
  onCreateToken,
  tokenCount,
}: TokenModel) => {
  const [tokenName, setTokenName] = useState("");
  const [expiryDays, setExpiryDays] = useState(30);
  const [nameError, setNameError] = useState("");

  // Check if we've reached the 5 token limit
  const hasReachedLimit = tokenCount >= 5;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTokenName(value);

    // Validate token name
    if (value.trim().length < 3) {
      setNameError("Token name must be at least 3 characters");
    } else if (value.length > 50) {
      setNameError("Token name must be less than 50 characters");
    } else {
      setNameError("");
    }
  };

  const handleSubmit = () => {
    if (tokenName.trim().length >= 3 && tokenName.length <= 50) {
      onCreateToken({ name: tokenName, expiryDays });
      setTokenName("");
      setExpiryDays(30);
    }
  };

  const handleCancel = () => {
    setTokenName("");
    setExpiryDays(30);
    setNameError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      {/* Backdrop */}
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleCancel}
        ></div>

        {/* Modal */}
        <div className="relative bg-white rounded-lg max-w-md w-full mx-auto shadow-xl z-20">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Create API Token
            </h3>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            {hasReachedLimit ? (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    {/* Warning icon */}
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Maximum limit of 5 active tokens reached. Revoke an
                      existing token before creating a new one.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Token Name Field */}
                <div>
                  <label
                    htmlFor="token-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Token Name
                  </label>
                  <input
                    type="text"
                    id="token-name"
                    value={tokenName}
                    onChange={handleNameChange}
                    className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 sm:text-sm ${
                      nameError
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder="e.g., Production API"
                  />
                  {nameError && (
                    <p className="mt-1 text-sm text-red-600">{nameError}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Name must be 3-50 characters and should identify the token's
                    purpose.
                  </p>
                </div>

                {/* Expiration Dropdown */}
                <div>
                  <label
                    htmlFor="expiry-days"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration (Days)
                  </label>
                  <select
                    id="expiry-days"
                    value={expiryDays}
                    onChange={(e) => setExpiryDays(Number(e.target.value))}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value={7}>7 days</option>
                    <option value={30}>30 days</option>
                    <option value={90}>90 days</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    Token will automatically expire after this period for
                    security.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                hasReachedLimit || !tokenName.trim() || Boolean(nameError)
              }
              className={`inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                hasReachedLimit || !tokenName.trim() || nameError
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              }`}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Demo component to show the modal in action
const CreateTokenModalDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [activeTokens, setActiveTokens] = useState(3); // Simulating 3 existing tokens

  const handleCreateToken = (tokenData: any) => {
    console.log("Token created:", tokenData);
    setActiveTokens(activeTokens + 1);
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Create Token Modal Demo</h1>

      <div className="mb-4">
        <p className="text-sm text-gray-500">
          Current active tokens: {activeTokens}/5
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Open Modal
        </button>
      </div>

      <CreateTokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateToken={handleCreateToken}
        tokenCount={activeTokens}
      />
    </div>
  );
};

export default CreateTokenModalDemo;
