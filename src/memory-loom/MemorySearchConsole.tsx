import { AlertCircle, Download, Info, Search, Tag } from "lucide-react";
import { useEffect, useState, type SetStateAction } from "react";

const MemorySearchConsole = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    {
      id: number;
      term: string;
      definition: string;
      context: string;
      confidence: number;
      source: string;
      tags: string[];
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [confidenceFilter, setConfidenceFilter] = useState(0);
  const [showExport, setShowExport] = useState(false);

  // Available tags for filtering
  const availableTags = [
    "Brand Voice",
    "Product",
    "Compliance",
    "Campaign",
    "Legal",
  ];

  // Mock data for memory objects
  const mockMemoryData = [
    {
      id: 1,
      term: "Value Proposition",
      definition:
        "Our product delivers 30% more efficiency than competitors with proprietary technology.",
      context:
        "Use this when discussing product benefits or comparing to alternatives.",
      confidence: 0.92,
      source: "Brand Guidelines 2025",
      tags: ["Brand Voice", "Product"],
    },
    {
      id: 2,
      term: "Customer Promise",
      definition:
        "We promise reliability, transparency, and continuous improvement.",
      context:
        "Central to all customer communications and support interactions.",
      confidence: 0.87,
      source: "Customer Charter",
      tags: ["Brand Voice", "Compliance"],
    },
    {
      id: 3,
      term: "Legal Disclaimer",
      definition:
        "Results may vary. Product efficacy based on controlled studies.",
      context:
        "Must be included in all promotional materials discussing product benefits.",
      confidence: 0.95,
      source: "Legal Department Guidelines",
      tags: ["Legal", "Compliance"],
    },
    {
      id: 4,
      term: "Brand Personality",
      definition:
        "Confident, innovative, approachable, but never arrogant or overly technical.",
      context: "Guide for tone across all content creation.",
      confidence: 0.89,
      source: "Brand Voice Guidelines",
      tags: ["Brand Voice"],
    },
    {
      id: 5,
      term: "Summer Campaign 2025",
      definition: "Focus on outdoor usage scenarios and warm weather benefits.",
      context: "Seasonal campaign running May-August.",
      confidence: 0.78,
      source: "Campaign Brief",
      tags: ["Campaign"],
    },
  ];

  // Search function
  const performSearch = () => {
    if (searchQuery.length < 2) return;

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      let results = mockMemoryData.filter(
        (item) =>
          item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.definition.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Apply tag filters if any are selected
      if (selectedTags.length > 0) {
        results = results.filter((item) =>
          selectedTags.some((tag) => item.tags.includes(tag))
        );
      }

      // Apply confidence filter
      if (confidenceFilter > 0) {
        results = results.filter(
          (item) => item.confidence >= confidenceFilter / 100
        );
      }

      setSearchResults(results);
      setIsLoading(false);

      // Show export option if we have results
      setShowExport(results.length > 0);
    }, 600);
  };

  // Handle search input
  const handleSearchChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (
    e: { preventDefault: () => void } | undefined
  ) => {
    if (e) e.preventDefault();
    performSearch();
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Export results (simulated)
  const exportResults = () => {
    alert("Exporting search results as CSV");
    // In a real implementation, this would generate and download a file
  };

  // Effect to run search when filters change (if we have a query)
  useEffect(() => {
    if (searchQuery.length >= 2) {
      performSearch();
    }
  }, [selectedTags, confidenceFilter]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-700 text-white p-4">
          <h1 className="text-xl font-bold flex items-center">
            <Search className="mr-2" size={20} />
            Memory Search/Query Console
          </h1>
          <p className="text-blue-100">
            Access brand knowledge and semantic memory
          </p>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b">
          <div className="flex items-center">
            <div className="relative flex-grow">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search terms, definitions, or context (min 2 characters)"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSearchSubmit(undefined)
                }
              />
              {isLoading && (
                <div className="absolute right-3 top-2">
                  <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
            <button
              onClick={handleSearchSubmit}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={searchQuery.length < 2 || isLoading}
            >
              Search
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="p-4 bg-gray-50 border-b flex flex-wrap items-center">
          <div className="mr-4 mb-2">
            <span className="font-medium text-gray-700 flex items-center">
              <Tag size={16} className="mr-1" /> Tags:
            </span>
            <div className="mt-1 flex flex-wrap gap-1">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-2 py-1 rounded-full ${
                    selectedTags.includes(tag)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="mr-4 mb-2">
            <span className="font-medium text-gray-700 flex items-center">
              <Info size={16} className="mr-1" /> Confidence:
            </span>
            <div className="mt-1 flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={confidenceFilter}
                onChange={(e) => setConfidenceFilter(parseInt(e.target.value))}
                className="w-32"
              />
              <span className="ml-2 text-sm text-gray-600">
                {confidenceFilter}%
              </span>
            </div>
          </div>

          {showExport && (
            <button
              onClick={exportResults}
              className="ml-auto px-3 py-1 flex items-center text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
              <Download size={14} className="mr-1" />
              Export Results
            </button>
          )}
        </div>

        {/* Results Section */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-3">
            {searchResults.length > 0
              ? `Found ${searchResults.length} result${
                  searchResults.length !== 1 ? "s" : ""
                }`
              : searchQuery.length >= 2
              ? "No results found"
              : "Enter a search term to begin"}
          </h2>

          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-blue-700">
                      {result.term}
                    </h3>
                    <div className="flex items-center">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          result.confidence > 0.9
                            ? "bg-green-100 text-green-800"
                            : result.confidence > 0.8
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {Math.round(result.confidence * 100)}% confidence
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-gray-700">{result.definition}</p>

                  <div className="mt-3 text-sm text-gray-600">
                    <p>
                      <strong>Context:</strong> {result.context}
                    </p>
                    <p className="mt-1">
                      <strong>Source:</strong> {result.source}
                    </p>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {result.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            searchQuery.length >= 2 && (
              <div className="flex items-center justify-center p-8 text-gray-500 border rounded-lg">
                <AlertCircle size={20} className="mr-2 text-yellow-500" />
                <span>
                  No memory objects match your search criteria. Try broadening
                  your search or using different terms.
                </span>
              </div>
            )
          )}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 max-w-6xl mx-auto p-2">
        <p className="flex items-center">
          <Info size={14} className="mr-1" />
          Memory Loom semantic search allows access to brand knowledge across
          your organization. Results are shown with confidence scores that
          indicate reliability of the information.
        </p>
      </div>
    </div>
  );
};

export default MemorySearchConsole;
