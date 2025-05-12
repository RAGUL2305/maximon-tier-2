import { useNavigate } from "react-router-dom";

const SignalDetailView = () => {
  const navigate = useNavigate()
  // Sample signal data
  const signal = {
    id: 'SIG-2025-0485',
    source: 'Twitter',
    status: 'Scored',
    score: 98,
    confidence: 95,
    collectedAt: '2025-05-05T10:15:00Z',
    scoredAt: '2025-05-05T10:18:30Z',
    content: 'Our new product from Maximon was exactly what I needed! The AI features are mind-blowing. #MarketingOS #CustomerExperience',
    entities: [
      { type: 'Product', name: 'Marketing OS', confidence: 94 },
      { type: 'Feature', name: 'AI capabilities', confidence: 89 },
      { type: 'Sentiment', name: 'Positive', confidence: 97 }
    ],
    metadata: {
      author: '@customer123',
      location: 'Los Angeles, CA',
      platform: 'Twitter',
      reach: 1450,
      engagement: 32
    }
  };

  // Format dates for display
  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
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
            Back to Signal List
          </button>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-500">Signal Detail</span>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700 font-medium">{signal.id}</span>
        </div>
        
        {/* Signal Header */}
        <div className="bg-white p-6 rounded-t shadow">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900 mr-3">{signal.id}</h1>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  signal.status === 'Scored' ? 'bg-green-100 text-green-800' : 
                  signal.status === 'Unscored' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-purple-100 text-purple-800'
                }`}>
                  {signal.status}
                </span>
              </div>
              <p className="text-gray-600 mt-1">Source: {signal.source}</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="mr-6">
                <p className="text-sm text-gray-500">Collected</p>
                <p className="text-sm font-medium">{formatDate(signal.collectedAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Scored</p>
                <p className="text-sm font-medium">{formatDate(signal.scoredAt)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Score Card */}
        <div className="bg-white shadow border-t border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Signal Score</h2>
          <div className="flex flex-col sm:flex-row sm:space-x-8">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center">
                <div className={`h-16 w-16 rounded-full ${signal.score >= 80 ? 'bg-green-500' : signal.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'} flex items-center justify-center text-white text-2xl font-bold mr-4`}>
                  {signal.score}
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">Overall Score</p>
                  <p className="text-sm text-gray-500">Based on semantic analysis</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                {signal.confidence}% <span className="text-sm text-gray-500">Confidence</span>
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${signal.confidence}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Card */}
        <div className="bg-white shadow border-t border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Signal Content</h2>
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <p className="text-gray-800">{signal.content}</p>
          </div>
        </div>
        
        {/* Entities Card */}
        <div className="bg-white shadow border-t border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Detected Entities</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {signal.entities.map((entity, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entity.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entity.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entity.confidence}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Metadata Card */}
        <div className="bg-white shadow border-t border-gray-200 p-6 rounded-b">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Signal Metadata</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(signal.metadata).map(([key, value]) => (
              <div key={key} className="flex">
                <span className="text-sm font-medium text-gray-500 w-1/3 capitalize">{key}:</span>
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
            Route Signal
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

export default SignalDetailView;
