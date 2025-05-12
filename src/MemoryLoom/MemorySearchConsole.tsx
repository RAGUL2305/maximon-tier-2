const MemorySearchConsole = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <a href="#" className="hover:text-indigo-600">
              Memory Loom
            </a>
            <svg
              className="mx-2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span className="text-gray-700">Memory Search</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Memory Search Console
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Search across all brand knowledge in the semantic memory store
              </p>
            </div>
          </div>
        </div>

        {/* Search UI */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Search Input */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start space-x-3">
              <div className="relative flex-grow">
                <input
                  type="text"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-lg border-gray-300 rounded-md"
                  placeholder="Search semantic memory..."
                  defaultValue="signal object"
                />
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                Search
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                Search All
              </button>
              <button className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
                Brand Lexicon
              </button>
              <button className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
                Extracted Terms
              </button>
              <button className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
                Source Documents
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Search Results
              </h2>
              <p className="text-sm text-gray-500">
                Found 5 results for "signal object"
              </p>
            </div>

            <div className="space-y-6">
              {/* Result 1 */}
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-md font-medium text-indigo-600">
                      Signal Object
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      From: Marketing_OS_System_Overview.pdf
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Core Terminology
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Standardized data format for cross-system communication.
                  Contains signal source, tone, intent, performance, trust
                  score.
                </p>
                <div className="text-xs text-gray-500 flex items-center">
                  <span className="mr-2">Confidence: 98%</span>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Result 2 */}
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-md font-medium text-indigo-600">
                      Signal Object Protocol
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      From: Developer_SDK_Overview.txt
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Developer
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Standardized metadata structure for content exports. All
                  products produce and consume structured signal objects with
                  standardized metadata.
                </p>
                <div className="text-xs text-gray-500 flex items-center">
                  <span className="mr-2">Confidence: 96%</span>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: "96%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Result 3 */}
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-md font-medium text-indigo-600">
                      Signal Object Spec
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      From: Developer_SDK_Overview.txt
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Developer
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  JSON schema definition for signal format. Technical
                  implementation details for the Signal Object Protocol.
                </p>
                <div className="text-xs text-gray-500 flex items-center">
                  <span className="mr-2">Confidence: 95%</span>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Result 4 */}
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-md font-medium text-indigo-600">
                      Signal Export Hub
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      From: Signal_Studio_Documentation.pdf
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Feature
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Multi-format content delivery (HTML, Markdown, JSON) with
                  standardized metadata. Converts Signal Studio content into
                  Signal Objects.
                </p>
                <div className="text-xs text-gray-500 flex items-center">
                  <span className="mr-2">Confidence: 91%</span>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: "91%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Result 5 */}
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-md font-medium text-indigo-600">
                      Semantic Signal Layer
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      From: Signal_Flow_Documentation.pdf
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Feature
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  Tags all nodes for memory retrieval and reporting. Implements
                  Signal Object framework within journey flows.
                </p>
                <div className="text-xs text-gray-500 flex items-center">
                  <span className="mr-2">Confidence: 87%</span>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: "87%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Searches */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-md font-medium text-gray-900 mb-3">
                Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-800">
                  brand voice
                </button>
                <button className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-800">
                  signal object
                </button>
                <button className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-800">
                  mesh organization
                </button>
                <button className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-800">
                  messaging framework
                </button>
                <button className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-800">
                  hybrid intelligence
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemorySearchConsole;
