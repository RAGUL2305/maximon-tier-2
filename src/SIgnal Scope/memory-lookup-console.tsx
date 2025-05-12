import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MemoryLookupConsole = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults] = useState([
    {
      id: "MEM-2025-1234",
      term: "Signal Integrity",
      definition:
        "The accuracy of a signal in representing its intended value in the context of brand perception.",
      contextSnippet:
        "Signal integrity is a core measurement in the SignalScope system.",
    },
    {
      id: "MEM-2025-0987",
      term: "Perception Alignment",
      definition:
        "The degree to which external perceptions match intended brand positioning.",
      contextSnippet:
        "Our goal is to achieve high perception alignment across all channels.",
    },
    {
      id: "MEM-2025-0765",
      term: "Brand Voice",
      definition:
        "The distinctive personality and tone that characterizes a brand's communications.",
      contextSnippet:
        "Maintaining consistent brand voice is essential for market recognition.",
    },
  ]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (searchTerm.length < 2) return;

    setIsSearching(true);

    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Breadcrumb and Back Button */}
        <div className="flex items-center mb-6">
          <button
            className="flex items-center text-blue-600 hover:text-blue-800"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to Dashboard
          </button>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-500">Memory Lookup Console</span>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Memory Lookup Console
          </h1>
          <p className="text-gray-600">
            Query semantic memory to retrieve enriched data and definitions
          </p>
        </div>

        {/* Search Input */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <div>
            <label
              htmlFor="memory-search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search Semantic Memory
            </label>
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  id="memory-search"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-12 py-3 sm:text-sm border-gray-300 rounded-l-md"
                  placeholder="Enter a term, phrase, or concept (minimum 2 characters)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={searchTerm.length < 2 || isSearching}
                onClick={handleSearch}
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Search terms are matched against the brand's semantic memory
              database.
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white shadow rounded">
          <div className="px-4 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Memory Results
            </h3>
            {searchResults.length > 0 && (
              <span className="text-sm text-gray-500">
                Found {searchResults.length} results
              </span>
            )}
          </div>

          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {searchResults.map((result) => (
                <li
                  key={result.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    navigate("/dashboard/signal-scope/memory-lookup/detail")
                  }
                >
                  <div className="flex flex-col sm:flex-row sm:items-start">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-lg font-bold text-blue-600">
                        {result.term}
                      </h4>
                      <div className="mt-2">
                        <p className="text-sm text-gray-900 font-medium">
                          Definition:
                        </p>
                        <p className="text-sm text-gray-500">
                          {result.definition}
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-900 font-medium">
                          Context:
                        </p>
                        <p className="text-sm text-gray-500">
                          {result.contextSnippet}
                        </p>
                      </div>
                      <div className="mt-2 flex">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Memory ID: {result.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemoryLookupConsole;
