import { Clock, Eye, FileText, History, Tag } from "lucide-react";
import { useState } from "react";

const MemoryObjectDetail = () => {
  const [activeTab, setActiveTab] = useState("terms");

  // Mock data for the memory object
  const memoryObject = {
    id: "MO-2025-04-28",
    title: "Brand Voice Guidelines 2025",
    uploadedBy: "Marketing Team",
    uploadDate: "2025-04-28",
    tags: ["Brand Voice", "Guidelines", "Marketing"],
    complianceStatus: "Compliant",
    driftScore: 0.2, // 0 to 1, where lower is better
    contentPreview:
      "Our brand voice is confident but approachable, expert but not condescending...",
  };

  // Mock data for extracted terms
  const extractedTerms = [
    {
      term: "Confident Approachability",
      definition: "Striking a balance between expertise and accessibility",
      confidenceScore: 0.95,
    },
    {
      term: "Clarity First",
      definition:
        "All communications prioritize clear, direct language over jargon",
      confidenceScore: 0.98,
    },
    {
      term: "Empathetic Expertise",
      definition:
        "Demonstrating knowledge while acknowledging customer challenges",
      confidenceScore: 0.92,
    },
    {
      term: "Active Solutions",
      definition:
        "Proactive language that focuses on solutions rather than problems",
      confidenceScore: 0.89,
    },
    {
      term: "Inclusive Language",
      definition:
        "Using terminology that respects all audiences and avoids bias",
      confidenceScore: 0.97,
    },
  ];

  // Mock version history
  const versionHistory = [
    {
      version: "1.2",
      timestamp: "2025-04-28 14:23",
      changes: "Updated terms based on latest market research",
    },
    {
      version: "1.1",
      timestamp: "2025-03-15 09:45",
      changes: "Added clarity first principle",
    },
    {
      version: "1.0",
      timestamp: "2025-02-20 11:30",
      changes: "Initial upload",
    },
  ];

  const getDriftStatusColor = (score: number) => {
    if (score < 0.3) return "text-green-600";
    if (score < 0.7) return "text-yellow-600";
    return "text-red-600";
  };

  const getConfidenceColor = (score: number) => {
    if (score > 0.9) return "text-green-600";
    if (score > 0.7) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="border-b pb-4 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {memoryObject.title}
          </h1>
          <div className="flex space-x-2">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                memoryObject.complianceStatus === "Compliant"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {memoryObject.complianceStatus}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm bg-gray-100 ${getDriftStatusColor(
                memoryObject.driftScore
              )}`}
            >
              Drift: {memoryObject.driftScore * 100}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <FileText size={16} className="mr-2" />
            <span>ID: {memoryObject.id}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-2" />
            <span>Uploaded: {memoryObject.uploadDate}</span>
          </div>
          <div className="flex items-center">
            <Eye size={16} className="mr-2" />
            <span>Uploaded by: {memoryObject.uploadedBy}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {memoryObject.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center"
            >
              <Tag size={12} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "terms"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("terms")}
        >
          Extracted Terms
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "preview"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("preview")}
        >
          Content Preview
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "versions"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("versions")}
        >
          Version History
        </button>
      </div>

      {/* Tab Contents */}
      <div className="mb-6">
        {activeTab === "terms" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Extracted Terms
            </h2>
            <div className="overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Term
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Definition
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Confidence
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {extractedTerms.map((term, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {term.term}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {term.definition}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`${getConfidenceColor(
                            term.confidenceScore
                          )}`}
                        >
                          {(term.confidenceScore * 100).toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "preview" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Content Preview
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-700">
              <p>{memoryObject.contentPreview}</p>
              <p className="mt-4 text-gray-500 text-sm">
                Note: This is just the first 1000 characters. To view full
                content, please use the Memory Lookup Console.
              </p>
            </div>
          </div>
        )}

        {activeTab === "versions" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Version History
            </h2>
            <div className="overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Version
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Changes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {versionHistory.map((version, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        v{version.version}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {version.timestamp}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {version.changes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          title="View this version"
                        >
                          <Eye size={16} />
                        </button>
                        {index !== 0 && (
                          <button
                            className="text-green-600 hover:text-green-800 ml-3"
                            title="Restore this version"
                          >
                            <History size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Actions Footer */}
      <div className="flex justify-between pt-4 border-t">
        <div>
          <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Back to List
          </button>
        </div>
        <div className="space-x-2">
          <button className="bg-blue-600 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700">
            Add to Brand Lexicon
          </button>
          <button className="bg-green-600 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-green-700">
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryObjectDetail;
