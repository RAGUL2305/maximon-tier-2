import { useState } from "react";
import {
  Plus,
  Save,
  AlertTriangle,
  Check,
  ExternalLink,
  X,
} from "lucide-react";

// Combined type that includes all properties needed
type Webhook = {
  id?: number;
  name: string;
  endpoint: string;
  secret: string;
  status?: string;
  lastTriggered?: string;
};

const WebhooksConfig = () => {
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: 1,
      name: "Content Creation",
      endpoint: "https://api.example.com/webhook/content",
      secret: "sk_test_123456789",
      status: "active",
      lastTriggered: "2025-04-28T14:32:11Z",
    },
    {
      id: 2,
      name: "Journey Trigger",
      endpoint: "https://api.example.com/webhook/journey",
      secret: "sk_test_987654321",
      status: "active",
      lastTriggered: "2025-05-01T09:15:43Z",
    },
    {
      id: 3,
      name: "Memory Update",
      endpoint: "https://api.example.com/webhook/memory",
      secret: "sk_test_456789123",
      status: "inactive",
      lastTriggered: "2025-04-15T11:22:33Z",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentWebhook, setCurrentWebhook] = useState<Webhook>({
    name: "",
    endpoint: "",
    secret: "",
  });
  const [validationError, setValidationError] = useState("");
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [testMessage, setTestMessage] = useState("");

  const openModal = (webhook?: Webhook | null) => {
    if (webhook) {
      // Create a new object with the webhook properties
      setCurrentWebhook({
        id: webhook.id,
        name: webhook.name,
        endpoint: webhook.endpoint,
        secret: webhook.secret,
        status: webhook.status,
        lastTriggered: webhook.lastTriggered,
      });
    } else {
      setCurrentWebhook({ name: "", endpoint: "", secret: "" });
    }
    setValidationError("");
    setTestStatus(null);
    setTestMessage("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const validateWebhook = () => {
    if (!currentWebhook.name.trim()) {
      setValidationError("Webhook name is required");
      return false;
    }
    if (!currentWebhook.endpoint.trim()) {
      setValidationError("Endpoint URL is required");
      return false;
    }
    if (!isValidUrl(currentWebhook.endpoint)) {
      setValidationError("Please enter a valid URL");
      return false;
    }
    if (!currentWebhook.secret.trim()) {
      setValidationError("Secret key is required");
      return false;
    }
    return true;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const saveWebhook = () => {
    if (!validateWebhook()) return;

    if (currentWebhook.id) {
      // Update existing webhook
      setWebhooks(
        webhooks.map((w) =>
          w.id === currentWebhook.id
            ? { ...currentWebhook, status: "active" }
            : w
        )
      );
    } else {
      // Add new webhook
      const newId = Math.max(0, ...webhooks.map((w) => w.id || 0)) + 1;
      setWebhooks([
        ...webhooks,
        { ...currentWebhook, id: newId, status: "active", lastTriggered: "-" },
      ]);
    }
    closeModal();
  };

  const deleteWebhook = (id: number) => {
    setWebhooks(webhooks.filter((w) => w.id !== id));
  };

  const toggleWebhookStatus = (id: number) => {
    setWebhooks(
      webhooks.map((w) => {
        if (w.id === id) {
          return {
            ...w,
            status: w.status === "active" ? "inactive" : "active",
          };
        }
        return w;
      })
    );
  };

  const testWebhook = () => {
    if (!validateWebhook()) return;

    setTestStatus("loading");

    // Simulate API call with timeout
    setTimeout(() => {
      if (Math.random() > 0.2) {
        // 80% success rate for demo
        setTestStatus("success");
        setTestMessage("Webhook test successful! Received 200 OK response");
      } else {
        setTestStatus("error");
        setTestMessage("Webhook test failed. Server returned 404 Not Found");
      }
    }, 1500);
  };

  const generateSecret = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "sk_test_";
    for (let i = 0; i < 24; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setCurrentWebhook({ ...currentWebhook, secret: result });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Webhooks Configuration
          </h1>
          <p className="text-gray-600 mt-1">
            Configure event-based triggers and callbacks for real-time
            integrations
          </p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => openModal()}
        >
          <Plus size={18} className="mr-2" />
          Add Webhook
        </button>
      </div>

      {webhooks.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No webhooks configured
          </h3>
          <p className="text-gray-500 mb-4">
            Create your first webhook to receive real-time notifications when
            events occur
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-flex items-center"
            onClick={() => openModal()}
          >
            <Plus size={18} className="mr-2" />
            Add Webhook
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Endpoint</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Last Triggered</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {webhooks.map((webhook) => (
                <tr
                  key={webhook.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium">{webhook.name}</td>
                  <td className="py-3 px-4 text-gray-600 truncate max-w-xs">
                    {webhook.endpoint}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        webhook.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {webhook.status === "active" ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                          Active
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 rounded-full bg-gray-400 mr-1.5"></span>
                          Inactive
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {webhook.lastTriggered === "-"
                      ? "-"
                      : new Date(webhook.lastTriggered || "").toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      className="text-gray-600 hover:text-blue-600 p-1 ml-1"
                      onClick={() => openModal(webhook)}
                      title="Edit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      className={`${
                        webhook.status === "active"
                          ? "text-green-600 hover:text-gray-600"
                          : "text-gray-600 hover:text-green-600"
                      } p-1 ml-1`}
                      onClick={() => toggleWebhookStatus(webhook.id || 0)}
                      title={
                        webhook.status === "active" ? "Deactivate" : "Activate"
                      }
                    >
                      {webhook.status === "active" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </button>
                    <button
                      className="text-gray-600 hover:text-red-600 p-1 ml-1"
                      onClick={() => deleteWebhook(webhook.id || 0)}
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Webhook management modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {currentWebhook.id ? "Edit Webhook" : "Add New Webhook"}
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {validationError && (
                <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-md flex items-start">
                  <AlertTriangle
                    size={20}
                    className="mr-2 flex-shrink-0 mt-0.5"
                  />
                  <span>{validationError}</span>
                </div>
              )}

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="webhook-name"
                >
                  Webhook Name
                </label>
                <input
                  type="text"
                  id="webhook-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Content Update Notification"
                  value={currentWebhook.name}
                  onChange={(e) =>
                    setCurrentWebhook({
                      ...currentWebhook,
                      name: e.target.value,
                    })
                  }
                />
                <p className="mt-1 text-sm text-gray-500">
                  A descriptive name to identify this webhook
                </p>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="webhook-endpoint"
                >
                  Endpoint URL
                </label>
                <input
                  type="url"
                  id="webhook-endpoint"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://your-domain.com/api/webhook"
                  value={currentWebhook.endpoint}
                  onChange={(e) =>
                    setCurrentWebhook({
                      ...currentWebhook,
                      endpoint: e.target.value,
                    })
                  }
                />
                <p className="mt-1 text-sm text-gray-500">
                  The URL where webhook events will be sent
                </p>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="webhook-secret"
                >
                  Webhook Secret
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="webhook-secret"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="sk_test_..."
                    value={currentWebhook.secret}
                    onChange={(e) =>
                      setCurrentWebhook({
                        ...currentWebhook,
                        secret: e.target.value,
                      })
                    }
                    readOnly={!!currentWebhook.id}
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 border-l-0 rounded-r-md"
                    onClick={generateSecret}
                    disabled={!!currentWebhook.id}
                  >
                    Generate
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Used to verify webhook requests are from Marketing OS
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                  <ExternalLink size={18} className="mr-2 text-gray-500" />
                  Implementation Guide
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  To verify webhook authenticity, calculate a HMAC signature
                  using your secret:
                </p>
                <pre className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm overflow-x-auto">
                  <code>
                    {`// Node.js example
const crypto = require('crypto');

function verifyWebhook(req) {
  const signature = req.headers['x-webhook-signature'];
  const payload = JSON.stringify(req.body);
  
  const expectedSignature = crypto
    .createHmac('sha256', '${currentWebhook.secret || "YOUR_WEBHOOK_SECRET"}')
    .update(payload)
    .digest('hex');
    
  return signature === expectedSignature;
}`}
                  </code>
                </pre>
              </div>

              {testStatus && (
                <div
                  className={`mb-4 ${
                    testStatus === "loading"
                      ? "bg-blue-50 text-blue-700"
                      : testStatus === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  } p-3 rounded-md flex items-start`}
                >
                  {testStatus === "loading" ? (
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                  ) : testStatus === "success" ? (
                    <Check size={20} className="mr-2 flex-shrink-0" />
                  ) : (
                    <AlertTriangle size={20} className="mr-2 flex-shrink-0" />
                  )}
                  <span>
                    {testStatus === "loading"
                      ? "Testing webhook..."
                      : testMessage}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
                onClick={testWebhook}
              >
                Test Webhook
              </button>

              <div className="flex space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center"
                  onClick={saveWebhook}
                >
                  <Save size={18} className="mr-2" />
                  Save Webhook
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebhooksConfig;
