import { useNavigate } from "react-router-dom";

const MemoryObjectDetailViews = () => {
  const navigate = useNavigate()
  // Sample memory object data
  const memoryObject = {
    id: 'MEM-2025-1234',
    term: 'Signal Integrity',
    type: 'Concept',
    createdAt: '2025-03-15T14:30:00Z',
    updatedAt: '2025-04-22T09:45:00Z',
    definition: 'The accuracy of a signal in representing its intended value in the context of brand perception. Signal integrity ensures that what is communicated matches the intended meaning and tone of the brand.',
    contextExamples: [
      {
        id: 'CTX-001',
        text: 'Signal integrity is a core measurement in the SignalScope system, allowing us to evaluate how accurately our message is being perceived.',
        source: 'Brand Guidelines v3.2'
      },
      {
        id: 'CTX-002',
        text: 'When signal integrity drops below 80%, we need to investigate potential misalignment between our messaging and audience reception.',
        source: 'Marketing Handbook'
      }
    ],
    relatedTerms: [
      { id: 'MEM-2025-0987', term: 'Perception Alignment' },
      { id: 'MEM-2025-0765', term: 'Brand Voice' },
      { id: 'MEM-2025-1422', term: 'Signal Drift' }
    ],
    metadata: {
      author: 'Marketing Team',
      department: 'Brand Strategy',
      confidenceScore: 97,
      usageCount: 124
    }
  };

  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Memory Results
          </button>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-500">Memory Object</span>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700 font-medium">{memoryObject.term}</span>
        </div>
        
        {/* Memory Object Header */}
        <div className="bg-white p-6 rounded-t shadow">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900 mr-3">{memoryObject.term}</h1>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {memoryObject.type}
                </span>
              </div>
              <p className="text-gray-600 mt-1">Memory ID: {memoryObject.id}</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-sm">
                <span className="text-gray-500">Created: </span>
                <span className="font-medium">{formatDate(memoryObject.createdAt)}</span>
              </div>
              <div className="text-sm mt-1">
                <span className="text-gray-500">Last Updated: </span>
                <span className="font-medium">{formatDate(memoryObject.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Definition Card */}
        <div className="bg-white shadow border-t border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Definition</h2>
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <p className="text-gray-800">{memoryObject.definition}</p>
          </div>
        </div>
        
        {/* Context Examples Card */}
        <div className="bg-white shadow border-t border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Context Examples</h2>
          <div className="space-y-4">
            {memoryObject.contextExamples.map((example) => (
              <div key={example.id} className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="text-gray-800 italic">"{example.text}"</p>
                <p className="text-sm text-gray-500 mt-2">Source: {example.source}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Related Terms Card */}
        <div className="bg-white shadow border-t border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Related Terms</h2>
          <div className="flex flex-wrap gap-2">
            {memoryObject.relatedTerms.map((term) => (
              <button
                key={term.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                {term.term}
              </button>
            ))}
          </div>
        </div>
        
        {/* Metadata Card */}
        <div className="bg-white shadow border-t border-gray-200 p-6 rounded-b">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Metadata</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(memoryObject.metadata).map(([key, value]) => (
              <div key={key} className="flex">
                <span className="text-sm font-medium text-gray-500 w-1/2 capitalize">{key}:</span>
                <span className="text-sm text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reference in Signal
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Export Details
          </button>
        </div>
      </main>
    </div>
  );
};

export default MemoryObjectDetailViews;
