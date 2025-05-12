import { useState } from "react";

const ApiDocumentationPage = () => {
  // Mock data for API endpoints
  const endpoints = [
    {
      id: "authentication",
      title: "Authentication",
      subtopics: [
        { id: "auth-overview", title: "Overview" },
        { id: "auth-tokens", title: "Tokens" },
      ],
    },
    {
      id: "signal-studio",
      title: "Signal Studio API",
      subtopics: [
        { id: "signal-create", title: "Create Signal" },
        { id: "signal-validate", title: "Validate Signal" },
        { id: "signal-export", title: "Export Signal" },
      ],
    },
    {
      id: "memory-loom",
      title: "Memory Loom API",
      subtopics: [
        { id: "memory-query", title: "Query Memory" },
        { id: "memory-inject", title: "Inject Memory" },
      ],
    },
    {
      id: "signal-flow",
      title: "Signal Flow API",
      subtopics: [
        { id: "flow-create", title: "Create Journey" },
        { id: "flow-trigger", title: "Trigger Journey" },
      ],
    },
  ];

  // Current selected endpoint and subtopic
  const [selectedEndpoint, setSelectedEndpoint] = useState("authentication");
  const [selectedSubtopic, setSelectedSubtopic] = useState("auth-overview");

  const handleEndpointClick = (endpointId: string, subtopicId: string) => {
    setSelectedEndpoint(endpointId);
    setSelectedSubtopic(subtopicId);
  };

  // Mock content for the selected documentation
  const getDocContent = () => {
    if (
      selectedEndpoint === "authentication" &&
      selectedSubtopic === "auth-overview"
    ) {
      return (
        <>
          <h2 className="text-2xl font-bold mb-4">Authentication Overview</h2>
          <p className="mb-4">
            Marketing OS API uses token-based authentication. All API requests
            must include a valid API token in the header.
          </p>
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <pre className="whitespace-pre-wrap">
              <code>
                {`// Example request with token authentication
const headers = {
  "Authorization": "Bearer YOUR_API_TOKEN",
  "Content-Type": "application/json"
};

fetch("https://api.marketingos.example/v1/signals", {
  method: "GET",
  headers: headers
})
.then(response => response.json())
.then(data => console.log(data));`}
              </code>
            </pre>
          </div>
          <h3 className="text-xl font-semibold mb-2">Token Management</h3>
          <p className="mb-4">
            You can create and manage API tokens through the Developer SDK
            interface or programmatically using the Authentication API.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
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
                  <strong>Important:</strong> Keep your API tokens secure. Never
                  expose them in client-side code or public repositories.
                </p>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Rate Limiting</h3>
          <p className="mb-4">
            API requests are subject to rate limiting of 100 requests per minute
            per token. Exceeding this limit will result in 429 (Too Many
            Requests) responses.
          </p>
        </>
      );
    } else if (
      selectedEndpoint === "authentication" &&
      selectedSubtopic === "auth-tokens"
    ) {
      return (
        <>
          <h2 className="text-2xl font-bold mb-4">Authentication Tokens</h2>
          <p className="mb-4">
            API tokens are the primary method for authenticating with the
            Marketing OS API. Each token has specific permissions and an
            expiration date.
          </p>
          <h3 className="text-xl font-semibold mb-2">Token Format</h3>
          <p className="mb-4">
            Tokens are base64-encoded strings with the format:{" "}
            <code>aos_xxxxxxxxxxxxxxxxxxxx</code>
          </p>
          <h3 className="text-xl font-semibold mb-2">Authentication Header</h3>
          <p className="mb-4">
            Include the token in the Authorization header using the Bearer
            scheme:
          </p>
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <pre>
              <code>Authorization: Bearer aos_xxxxxxxxxxxxxxxxxxxx</code>
            </pre>
          </div>
          <h3 className="text-xl font-semibold mb-2">Token Lifecycle</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Tokens expire after 7, 30, or 90 days (as specified during
              creation)
            </li>
            <li>Tokens can be revoked manually at any time</li>
            <li>Maximum of 5 active tokens per account</li>
          </ul>
        </>
      );
    } else if (
      selectedEndpoint === "signal-studio" &&
      selectedSubtopic === "signal-create"
    ) {
      return (
        <>
          <h2 className="text-2xl font-bold mb-4">Create Signal</h2>
          <p className="mb-4">
            This endpoint allows you to create a new signal in Signal Studio
            programmatically.
          </p>
          <h3 className="text-xl font-semibold mb-2">Request</h3>
          <p className="mb-2">
            <strong>HTTP Method:</strong> POST
          </p>
          <p className="mb-4">
            <strong>Endpoint:</strong> <code>/v1/signals</code>
          </p>
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <pre className="whitespace-pre-wrap">
              <code>
                {`// Example request
POST /v1/signals HTTP/1.1
Host: api.marketingos.example
Authorization: Bearer YOUR_API_TOKEN
Content-Type: application/json

{
  "title": "Weekly Newsletter",
  "content": "This week's top stories include...",
  "type": "email",
  "metadata": {
    "tone": "professional",
    "target_audience": "enterprise"
  }
}`}
              </code>
            </pre>
          </div>
          <h3 className="text-xl font-semibold mb-2">Response</h3>
          <p className="mb-4">
            Returns the created signal object with its unique ID and other
            properties.
          </p>
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <pre className="whitespace-pre-wrap">
              <code>
                {`// Example response
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "sig_12345abcde",
  "title": "Weekly Newsletter",
  "content": "This week's top stories include...",
  "type": "email",
  "metadata": {
    "tone": "professional",
    "target_audience": "enterprise"
  },
  "status": "draft",
  "created_at": "2025-04-28T15:32:10Z",
  "updated_at": "2025-04-28T15:32:10Z"
}`}
              </code>
            </pre>
          </div>
        </>
      );
    } else {
      // Default placeholder content for other endpoints
      return (
        <div className="text-center p-10">
          <p className="text-gray-500">
            Documentation for {selectedEndpoint} - {selectedSubtopic} would be
            displayed here.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header and Navigation would be here but omitted for brevity */}

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="pb-5 border-b border-gray-200 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            API Documentation
          </h1>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0 border-r border-gray-200 bg-white rounded-lg shadow overflow-hidden">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {endpoints.map((endpoint) => (
                <div key={endpoint.id} className="mb-4">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {endpoint.title}
                  </h3>
                  <div className="mt-1 space-y-1">
                    {endpoint.subtopics.map((subtopic) => (
                      <button
                        key={subtopic.id}
                        onClick={() =>
                          handleEndpointClick(endpoint.id, subtopic.id)
                        }
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                          selectedEndpoint === endpoint.id &&
                          selectedSubtopic === subtopic.id
                            ? "bg-blue-100 text-blue-900"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {subtopic.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Documentation Content */}
          <div className="flex-1 bg-white p-6 ml-0 md:ml-6 mt-6 md:mt-0 rounded-lg shadow overflow-hidden">
            <div className="prose max-w-none">{getDocContent()}</div>
          </div>
        </div>

        {/* Documentation footer with helpful links */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Need help?</h3>
              <p className="text-sm text-gray-500">
                Check out our developer community or contact support.
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Developer Forum
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocumentationPage;
