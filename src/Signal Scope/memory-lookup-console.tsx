import { AlertTriangle, Clock, Eye, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const MemoryLookupConsole = () => {
  const [searchTerm, setSearchTerm] = useState<any>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [advancedFilters, setAdvancedFilters] = useState<any>({
    confidenceThreshold: 70,
    tags: []
  });

  // Simulated memory data - in a real implementation, this would come from Memory Loom
  const mockMemoryObjects = [
    {
      id: 1,
      term: "Brand Voice",
      definition: "Our brand voice is confident, approachable, and expert without being technical.",
      confidence: 95,
      source: "Brand Guidelines 2025",
      context: "Our voice should convey expertise while remaining accessible to all audiences.",
      tags: ["tone", "guidelines", "core"]
    },
    {
      id: 2,
      term: "Product Description Framework",
      definition: "Start with the benefit, explain the feature, end with the impact.",
      confidence: 87,
      source: "Content Playbook",
      context: "When describing products, follow the Benefit-Feature-Impact structure for consistency.",
      tags: ["content", "product", "structure"]
    },
    {
      id: 3,
      term: "Sustainability Claims",
      definition: "Only make specific, measurable claims about sustainability with documentation.",
      confidence: 92,
      source: "Legal Guidelines",
      context: "All sustainability claims must be specific, measurable, and documented by third parties.",
      tags: ["legal", "compliance", "sustainability"]
    },
    {
      id: 4,
      term: "Customer Segments",
      definition: "Primary segments include Early Adopters, Value Seekers, and Enterprise Users.",
      confidence: 84,
      source: "Market Analysis 2025",
      context: "Our messaging should be tailored to these three primary customer segments.",
      tags: ["audience", "segments", "targeting"]
    },
    {
      id: 5,
      term: "Pricing Communication",
      definition: "Focus on value delivered rather than cost savings or discounts.",
      confidence: 78,
      source: "Pricing Strategy",
      context: "When discussing pricing, emphasize the value our solution provides rather than focusing on cost.",
      tags: ["pricing", "sales", "messaging"]
    },
    {
      id: 6,
      term: "Competitor Positioning",
      definition: "We position as the most user-friendly solution with enterprise-grade security.",
      confidence: 83,
      source: "Competitive Analysis",
      context: "Our key differentiators are ease-of-use combined with enterprise security capabilities.",
      tags: ["competition", "positioning", "sales"]
    }
  ];

  // Tags for filter dropdown
  const availableTags: any[] = ['tone', 'guidelines', 'core', 'content', 'product', 'structure', 
    'legal', 'compliance', 'sustainability', 'audience', 'segments', 'targeting', 
    'pricing', 'sales', 'messaging', 'competition', 'positioning'];

  // Handle search input change
  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  // Perform search
  const handleSearch = () => {
    if (searchTerm.length < 2) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filteredResults = mockMemoryObjects.filter(item => {
        // Only include results that meet the confidence threshold
        if (item.confidence < advancedFilters.confidenceThreshold) return false;
        
        // Filter by tags if any are selected
        if (advancedFilters.tags.length > 0 && 
            !item.tags.some(tag => advancedFilters.tags.includes(tag))) return false;
        
        // Check if search term appears in term or definition
        return item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
               item.definition.toLowerCase().includes(searchTerm.toLowerCase());
      });
      
      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 800);
  };

  // Handle tag selection
  const toggleTag = (tag: any) => {
    setAdvancedFilters((prev: { tags: any[]; }) => {
      if (prev.tags.includes(tag)) {
        return { ...prev, tags: prev.tags.filter(t => t !== tag) };
      } else {
        return { ...prev, tags: [...prev.tags, tag] };
      }
    });
  };

  // Handle confidence threshold change
  const handleConfidenceChange = (e:any) => {
    setAdvancedFilters((prev: any) => ({
      ...prev,
      confidenceThreshold: parseInt(e.target.value)
    }));
  };

  // View memory object details
  const viewDetails = (item: any) => {
    setSelectedResult(item);
  };

  // Clear selected result
  const clearSelectedResult = () => {
    setSelectedResult(null);
  };

  // Effect to trigger search when filters change
  useEffect(() => {
    if (searchTerm.length >= 2) {
      handleSearch();
    }
  }, [advancedFilters]);

  // Handle Enter key press
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && searchTerm.length >= 2) {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Memory Lookup Console</h1>
          <div className="text-sm text-gray-500">Memory Loom • Marketing OS</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search and Filters Panel */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-4">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Memory</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter search term..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-600 hover:text-blue-800"
                  onClick={handleSearch}
                  disabled={searchTerm.length < 2}
                >
                  {isLoading ? (
                    <Clock className="h-5 w-5 animate-spin" />
                  ) : (
                    <span className="font-medium text-sm">Search</span>
                  )}
                </button>
              </div>
              {searchTerm.length === 1 && (
                <p className="mt-1 text-xs text-red-500">Enter at least 2 characters</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confidence Threshold: {advancedFilters.confidenceThreshold}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={advancedFilters.confidenceThreshold}
                onChange={handleConfidenceChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Tags</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag: string) => (
                  <button
                    key={tag}
                    className={`text-xs px-2 py-1 rounded-full ${
                      advancedFilters.tags.includes(tag)
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results and Detail Panel */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            {selectedResult ? (
              // Memory Object Detail View
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{selectedResult.term}</h2>
                  <button 
                    onClick={clearSelectedResult}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="mb-3 flex items-center">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium
                    ${selectedResult.confidence >= 90 ? 'bg-green-100 text-green-800' : 
                      selectedResult.confidence >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    Confidence: {selectedResult.confidence}%
                  </div>
                  <div className="ml-2 text-sm text-gray-500">
                    Source: {selectedResult.source}
                  </div>
                </div>
                
                <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Definition</h3>
                  <p className="text-gray-800">{selectedResult.definition}</p>
                </div>
                
                <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Context</h3>
                  <p className="text-gray-800">{selectedResult.context}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedResult.tags.map((tag: any) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Results List View
              <div className="p-4">
                <h2 className="text-lg font-medium text-gray-700 mb-4">
                  {searchResults.length > 0 
                    ? `Search Results (${searchResults.length})` 
                    : 'Enter a search term to find brand memory'}
                </h2>
                
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                      <Clock className="h-8 w-8 text-blue-500 mx-auto animate-spin" />
                      <p className="mt-2 text-gray-500">Searching brand memory...</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    {searchResults.length === 0 && searchTerm.length >= 2 ? (
                      <div className="flex flex-col items-center justify-center h-64">
                        <AlertTriangle className="h-12 w-12 text-yellow-500 mb-2" />
                        <p className="text-gray-500 text-center">
                          No results found for "{searchTerm}"
                          <br />
                          <span className="text-sm">Try adjusting your search or filters</span>
                        </p>
                      </div>
                    ) : (
                      <ul className="divide-y divide-gray-200">
                        {searchResults.map((result) => (
                          <li key={result.id} className="py-4">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-gray-800">{result.term}</h3>
                                <p className="mt-1 text-gray-600 line-clamp-2">{result.definition}</p>
                                <div className="mt-2 flex items-center">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                                    ${result.confidence >= 90 ? 'bg-green-100 text-green-800' : 
                                      result.confidence >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                                      'bg-red-100 text-red-800'}`}>
                                    {result.confidence}%
                                  </span>
                                  <span className="ml-2 text-sm text-gray-500">
                                    {result.source}
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => viewDetails(result)}
                                className="flex-shrink-0 ml-2 bg-white p-1 rounded-full text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                <Eye className="h-6 w-6" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          Memory Lookup Console • Part of Memory Loom Module in Marketing OS
        </div>
      </footer>
    </div>
  );
};

export default MemoryLookupConsole;