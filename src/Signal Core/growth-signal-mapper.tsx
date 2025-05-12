import { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Filter, ChevronDown, ChevronUp, Search, Zap, BarChart2, Save, TrendingUp, RefreshCw } from 'lucide-react';

type Signal = {
  id: string;
  source: string;
  timestamp: string;
  rawData: Record<string, any>;
  signalType: string;
  mappedTo: string | null;
  score: number | null;
  status: string;
}

export default function GrowthSignalMapper() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [mappedCount, setMappedCount] = useState(0);
  const [selectedSignal, setSelectedSignal] = useState<null | any>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [signalTypes, setSignalTypes] = useState([
    { id: 'conversion', name: 'Conversion', selected: true },
    { id: 'engagement', name: 'Engagement', selected: true },
    { id: 'retention', name: 'Retention', selected: true },
    { id: 'revenue', name: 'Revenue', selected: true }
  ]);

  useEffect(() => {
    // Simulate fetching signals from API
    const fetchSignals = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data
      const mockSignals = [
        {
          id: 'sig-001',
          source: 'Website Analytics',
          timestamp: '2025-05-09T14:32:00Z',
          rawData: { 
            pageViews: 1243,
            conversions: 32,
            bounceRate: '28%'
          },
          signalType: 'conversion',
          mappedTo: 'product_interest',
          score: 87,
          status: 'mapped'
        },
        {
          id: 'sig-002',
          source: 'CRM Data',
          timestamp: '2025-05-09T12:15:00Z',
          rawData: { 
            newLeads: 18,
            qualifiedLeads: 7,
            salesOpportunities: 3
          },
          signalType: 'revenue',
          mappedTo: null,
          score: null,
          status: 'new'
        },
        {
          id: 'sig-003',
          source: 'Email Campaigns',
          timestamp: '2025-05-09T10:45:00Z',
          rawData: { 
            opens: 1876,
            clicks: 432,
            unsubscribes: 7
          },
          signalType: 'engagement',
          mappedTo: 'content_engagement',
          score: 73,
          status: 'mapped'
        },
        {
          id: 'sig-004',
          source: 'App Analytics',
          timestamp: '2025-05-09T09:22:00Z',
          rawData: { 
            activeSessions: 876,
            featureUsage: 432,
            timeSpent: '6.4 min'
          },
          signalType: 'retention',
          mappedTo: null,
          score: null,
          status: 'new'
        },
        {
          id: 'sig-005',
          source: 'Social Listening',
          timestamp: '2025-05-09T08:17:00Z',
          rawData: { 
            mentions: 142,
            sentiment: 'positive',
            engagement: 532
          },
          signalType: 'engagement',
          mappedTo: 'brand_affinity',
          score: 81,
          status: 'mapped'
        }
      ];
      
      setSignals(mockSignals);
      setMappedCount(mockSignals.filter(s => s.status === 'mapped').length);
      setLoading(false);
    };
    
    fetchSignals();
  }, []);

  const filteredSignals = signals.filter(signal => {
    // Filter by search query (on ID or source)
    const matchesSearch = searchQuery === '' || 
      signal.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      signal.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by selected signal types
    const matchesType = signalTypes.find(type => type.id === signal.signalType)?.selected;
    
    return matchesSearch && matchesType;
  });

  const handleSignalTypeToggle = (typeId: any) => {
    setSignalTypes(
      signalTypes.map(type => 
        type.id === typeId 
          ? { ...type, selected: !type.selected } 
          : type
      )
    );
  };

  const handleMapSignal = (signalId: string, mappingType: string) => {
    setSignals(
      signals.map(signal => {
        if (signal.id === signalId) {
          const newSignal = { 
            ...signal, 
            mappedTo: mappingType,
            status: 'mapped',
            score: Math.floor(Math.random() * 25) + 75 // Random score between 75-99
          };
          return newSignal;
        }
        return signal;
      })
    );
    
    // Update mapped count
    setMappedCount(prevCount => prevCount + 1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Growth Signal Mapper</h1>
            <p className="text-gray-500 text-sm">Transform raw data into structured optimization signals</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-100 p-2 rounded-md hover:bg-gray-200">
              <RefreshCw size={16} className="text-gray-600" />
            </button>
            <button 
              className="bg-white border border-gray-200 py-1 px-3 rounded-md text-gray-700 hover:bg-gray-50 text-sm flex items-center space-x-1"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter size={14} />
              <span>Filters</span>
              {filterOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <button className="bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-700 text-sm flex items-center space-x-1">
              <Save size={14} />
              <span>Save Mappings</span>
            </button>
          </div>
        </div>
        
        {/* Filter panel */}
        {filterOpen && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md border">
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <div className="relative w-full sm:w-1/2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search signals..."
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {signalTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => handleSignalTypeToggle(type.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      type.selected 
                        ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' 
                        : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white border-b">
        <div className="flex flex-col rounded-md border p-3">
          <span className="text-xs font-medium text-gray-500">Total Signals</span>
          <div className="flex items-baseline">
            <span className="text-xl font-semibold text-gray-900">{signals.length}</span>
            <span className="ml-1 text-xs text-gray-500">signals</span>
          </div>
        </div>
        <div className="flex flex-col rounded-md border p-3">
          <span className="text-xs font-medium text-gray-500">Mapped Signals</span>
          <div className="flex items-baseline">
            <span className="text-xl font-semibold text-green-600">{mappedCount}</span>
            <span className="ml-1 text-xs text-gray-500">signals</span>
          </div>
        </div>
        <div className="flex flex-col rounded-md border p-3">
          <span className="text-xs font-medium text-gray-500">Mapping Rate</span>
          <div className="flex items-baseline">
            <span className="text-xl font-semibold text-indigo-600">
              {signals.length > 0 ? Math.round((mappedCount / signals.length) * 100) : 0}%
            </span>
          </div>
        </div>
        <div className="flex flex-col rounded-md border p-3">
          <span className="text-xs font-medium text-gray-500">Avg. Signal Score</span>
          <div className="flex items-baseline">
            <span className="text-xl font-semibold text-gray-900">
              {/* {signals.filter(s => s.score).length > 0 
                ? Math.round(signals.filter(s => s.score).reduce((acc, s) => acc + s.score, 0) / 
                    signals.filter(s => s.score).length) 
                : '-'} */}
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Signals List */}
        <div className="w-full md:w-1/2 lg:w-2/5 border-r overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-indigo-200 flex items-center justify-center">
                  <RefreshCw size={24} className="text-indigo-500 animate-spin" />
                </div>
                <p className="mt-2 text-gray-500">Loading signals...</p>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredSignals.length > 0 ? (
                filteredSignals.map(signal => (
                  <li 
                    key={signal.id}
                    onClick={() => setSelectedSignal(signal)}
                    className={`cursor-pointer hover:bg-gray-50 p-4 ${
                      selectedSignal?.id === signal.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''
                    }`}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-start space-x-3">
                        {signal.status === 'mapped' ? (
                          <CheckCircle size={16} className="text-green-500 mt-1" />
                        ) : (
                          <div className="w-4 h-4 mt-1 rounded-full bg-amber-400"></div>
                        )}
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium text-gray-900">{signal.id}</p>
                            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                              signal.signalType === 'conversion' ? 'bg-green-100 text-green-800' :
                              signal.signalType === 'engagement' ? 'bg-blue-100 text-blue-800' :
                              signal.signalType === 'retention' ? 'bg-purple-100 text-purple-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {signal.signalType}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            From {signal.source}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {formatDate(signal.timestamp)}
                        </p>
                        {signal.status === 'mapped' && (
                          <p className="text-xs font-medium text-gray-900 mt-1">
                            Score: <span className="text-green-600">{signal.score}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                  <AlertTriangle size={30} className="text-amber-500 mb-2" />
                  <h3 className="text-gray-900 font-medium">No signals found</h3>
                  <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or search query.</p>
                </div>
              )}
            </ul>
          )}
        </div>

        {/* Detail Panel */}
        <div className="hidden md:block md:w-1/2 lg:w-3/5 p-0 overflow-y-auto">
          {selectedSignal ? (
            <div className="h-full flex flex-col">
              <div className="bg-gray-50 border-b p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{selectedSignal.id}</h2>
                    <p className="text-sm text-gray-500">{selectedSignal.source}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      selectedSignal.status === 'mapped' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {selectedSignal.status === 'mapped' ? 'Mapped' : 'New'}
                    </span>
                    {selectedSignal.status === 'mapped' && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        Score: {selectedSignal.score}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Raw Signal Data</h3>
                  <div className="bg-gray-50 border rounded-md p-3 overflow-x-auto">
                    <pre className="text-sm text-gray-800">
                      {JSON.stringify(selectedSignal.rawData, null, 2)}
                    </pre>
                  </div>
                </div>

                {selectedSignal.status === 'mapped' ? (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Signal Mapping</h3>
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle size={16} className="text-green-600" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">Mapped to Growth Signal</p>
                          <p className="text-sm text-gray-600">This signal has been mapped successfully</p>
                        </div>
                      </div>
                      <div className="bg-white border rounded-md p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">{selectedSignal.mappedTo}</p>
                            <p className="text-sm text-gray-500">Signal Type: {selectedSignal.signalType}</p>
                          </div>
                          <div className="flex items-center">
                            <BarChart2 size={16} className="text-indigo-500 mr-1" />
                            <span className="text-sm font-medium text-indigo-600">Conversion Impact: High</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end space-x-2">
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                          Edit Mapping
                        </button>
                        <button className="px-3 py-1 border border-red-300 rounded text-sm text-red-700 hover:bg-red-50">
                          Remove Mapping
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Map This Signal</h3>
                    <div className="bg-white border rounded-md">
                      <div className="p-4 border-b">
                        <p className="text-sm text-gray-500 mb-3">Select a growth signal type to map this raw data:</p>
                        <div className="grid grid-cols-2 gap-3">
                          <button 
                            onClick={() => handleMapSignal(selectedSignal.id, 'product_interest')}
                            className="flex items-center p-3 border rounded-md hover:bg-indigo-50 hover:border-indigo-200"
                          >
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                              <Zap size={16} className="text-indigo-600" />
                            </div>
                            <div className="ml-3 text-left">
                              <p className="font-medium text-gray-900">Product Interest</p>
                              <p className="text-xs text-gray-500">Maps user interest signals</p>
                            </div>
                          </button>
                          
                          <button 
                            onClick={() => handleMapSignal(selectedSignal.id, 'content_engagement')}
                            className="flex items-center p-3 border rounded-md hover:bg-blue-50 hover:border-blue-200"
                          >
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <BarChart2 size={16} className="text-blue-600" />
                            </div>
                            <div className="ml-3 text-left">
                              <p className="font-medium text-gray-900">Content Engagement</p>
                              <p className="text-xs text-gray-500">Maps content interaction</p>
                            </div>
                          </button>
                          
                          <button 
                            onClick={() => handleMapSignal(selectedSignal.id, 'conversion_intent')}
                            className="flex items-center p-3 border rounded-md hover:bg-green-50 hover:border-green-200"
                          >
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                              <TrendingUp size={16} className="text-green-600" />
                            </div>
                            <div className="ml-3 text-left">
                              <p className="font-medium text-gray-900">Conversion Intent</p>
                              <p className="text-xs text-gray-500">Maps purchase/signup intent</p>
                            </div>
                          </button>
                          
                          <button 
                            onClick={() => handleMapSignal(selectedSignal.id, 'brand_affinity')}
                            className="flex items-center p-3 border rounded-md hover:bg-purple-50 hover:border-purple-200"
                          >
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                              <Zap size={16} className="text-purple-600" />
                            </div>
                            <div className="ml-3 text-left">
                              <p className="font-medium text-gray-900">Brand Affinity</p>
                              <p className="text-xs text-gray-500">Maps brand relationship</p>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50">
                        <button className="w-full px-3 py-2 bg-gray-100 rounded text-sm text-gray-700 hover:bg-gray-200 font-medium">
                          Custom Mapping...
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Zap size={24} className="text-gray-400" />
                </div>
                <h3 className="text-gray-500 font-medium">Select a signal</h3>
                <p className="text-gray-400 text-sm mt-1">Select a signal from the list to view details and create mappings</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
