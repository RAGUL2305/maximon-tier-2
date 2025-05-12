import { useState } from "react";

const GrowthSignalMapper = () => {
  // Mock data for raw signals
  const initialRawSignals = [
    {
      id: "SIG-1021",
      source: "CRM System",
      metadata: "User Registration, New Account",
      mappedType: "",
      timestamp: "2025-05-04T14:30:00",
    },
    {
      id: "SIG-1020",
      source: "Web Analytics",
      metadata: "Page View, Pricing Page",
      mappedType: "Purchase Intent",
      timestamp: "2025-05-04T12:15:00",
    },
    {
      id: "SIG-1019",
      source: "Email Campaign",
      metadata: "Email Open, Promotion Email",
      mappedType: "",
      timestamp: "2025-05-04T10:45:00",
    },
    {
      id: "SIG-1018",
      source: "Social Media",
      metadata: "Post Engagement, Product Mention",
      mappedType: "Brand Awareness",
      timestamp: "2025-05-04T09:30:00",
    },
    {
      id: "SIG-1017",
      source: "Web Analytics",
      metadata: "Form Submission, Contact Form",
      mappedType: "Lead Generation",
      timestamp: "2025-05-03T16:20:00",
    },
    {
      id: "SIG-1016",
      source: "CRM System",
      metadata: "Quote Request, Enterprise Plan",
      mappedType: "",
      timestamp: "2025-05-03T14:10:00",
    },
    {
      id: "SIG-1015",
      source: "CRM System",
      metadata: "Support Ticket, Technical Issue",
      mappedType: "",
      timestamp: "2025-05-03T11:05:00",
    },
    {
      id: "SIG-1014",
      source: "Web Analytics",
      metadata: "Checkout Started, Cart Value $250",
      mappedType: "Purchase Intent",
      timestamp: "2025-05-03T09:45:00",
    },
  ];

  // State for raw signals
  const [rawSignals, setRawSignals] = useState(initialRawSignals);

  // Available growth signal types for dropdown
  const growthSignalTypes = [
    "",
    "Purchase Intent",
    "Lead Generation",
    "Brand Awareness",
    "Customer Satisfaction",
    "Product Interest",
    "Churn Risk",
  ];

  // Handle mapping change
  const handleMappingChange = (signalId: string, newType: string) => {
    setRawSignals(
      rawSignals.map((signal) =>
        signal.id === signalId ? { ...signal, mappedType: newType } : signal
      )
    );
  };

  // Check if save button should be enabled
  const isSaveEnabled = rawSignals.some(
    (signal) =>
      signal.mappedType !==
      initialRawSignals.find((s) => s.id === signal.id)?.mappedType
  );

  // Handle save mappings
  const handleSaveMappings = () => {
    // In a real app, this would send the data to the backend
    alert("Mappings saved successfully!");
    // Update initialRawSignals to match current state
    initialRawSignals.forEach((signal, index) => {
      signal.mappedType = rawSignals[index].mappedType;
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header with Back Navigation */}
      <div className="flex items-center mb-6">
        <button className="mr-3 text-gray-600 hover:text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Growth Signal Mapper
          </h1>
          <p className="text-gray-600">
            Map raw signals to growth signal types
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Raw Signal List</h2>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-md ${
                isSaveEnabled
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isSaveEnabled}
              onClick={handleSaveMappings}
            >
              Save Mapping
            </button>
          </div>
        </div>

        {/* Signals Table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Signal ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Source
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Metadata
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Timestamp
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Growth Signal Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rawSignals.map((signal) => (
              <tr key={signal.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {signal.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {signal.source}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {signal.metadata}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(signal.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    className="border-gray-300 rounded-md"
                    value={signal.mappedType}
                    onChange={(e) =>
                      handleMappingChange(signal.id, e.target.value)
                    }
                  >
                    {growthSignalTypes.map((type) => (
                      <option key={type} value={type}>
                        {type || "Select Growth Signal Type"}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination (simplified for Tier 1) */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{rawSignals.length}</span> of{" "}
              <span className="font-medium">{rawSignals.length}</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Validation message area */}
      <div
        className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-md"
        style={{ display: "none" }}
      >
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
            <h3 className="text-sm font-medium text-yellow-800">
              Validation Error
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>Cannot mark as Mapped if Growth Signal Type not selected.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthSignalMapper;
