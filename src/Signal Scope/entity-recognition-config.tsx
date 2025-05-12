import { Plus, RefreshCw, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';

const EntityRecognitionConfig = () => {
  const [entities, setEntities] = useState([
    { id: 1, name: 'Product', type: 'Asset', confidence: 0.92, active: true },
    { id: 2, name: 'Brand', type: 'Organization', confidence: 0.89, active: true },
    { id: 3, name: 'Campaign', type: 'Event', confidence: 0.78, active: true },
    { id: 4, name: 'Competitor', type: 'Organization', confidence: 0.85, active: false },
  ]);
  
  const [modelType, setModelType] = useState('OpenAI');
  const [showAddEntity, setShowAddEntity] = useState(false);
  const [newEntity, setNewEntity] = useState({ name: '', type: 'Organization', confidence: 0.75, active: true });
  const [isTestingEntity, setIsTestingEntity] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [selectedEntity, setSelectedEntity] = useState<any>(null);

  const entityTypes = ['Organization', 'Person', 'Asset', 'Event', 'Location', 'Custom'];

  const handleAddEntity = () => {
    if (newEntity.name.trim() === '') return;
    
    setEntities([
      ...entities,
      {
        id: Date.now(),
        ...newEntity
      }
    ]);
    
    setNewEntity({ name: '', type: 'Organization', confidence: 0.75, active: true });
    setShowAddEntity(false);
  };

  const handleDeleteEntity = (id: any) => {
    setEntities(entities.filter(entity => entity.id !== id));
  };

  const toggleActive = (id:any) => {
    setEntities(entities.map(entity => 
      entity.id === id ? { ...entity, active: !entity.active } : entity
    ));
  };

  const handleTestEntity = (entity: any) => {
    setIsTestingEntity(true);
    setSelectedEntity(entity);
    
    // Simulate API call
    setTimeout(() => {
      setTestResults({
        matches: Math.floor(Math.random() * 20) + 5,
        sampleTexts: [
          "Our [ENTITY] is performing well in Q2 results.",
          "Customers have shown increased interest in [ENTITY] offerings.",
          "The market perception of [ENTITY] has improved by 12%."
        ],
        accuracy: (entity.confidence * 100).toFixed(1)
      });
      setIsTestingEntity(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Entity Recognition Config</h1>
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">AI Model</label>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
            >
              <option value="OpenAI">OpenAI</option>
              <option value="Custom">Custom</option>
              <option value="HuggingFace">HuggingFace</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <p className="text-sm text-gray-600">
          Entity Recognition maps external mentions to your brand taxonomy. Configure the entities you want to track across channels, social media, and LLM outputs.
        </p>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Entities</h2>
        <button 
          onClick={() => setShowAddEntity(!showAddEntity)}
          className="flex items-center space-x-1 bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700"
        >
          <Plus size={16} />
          <span>Add Entity</span>
        </button>
      </div>
      
      {showAddEntity && (
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <h3 className="font-medium text-gray-700 mb-2">New Entity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 w-full"
                value={newEntity.name}
                onChange={(e) => setNewEntity({...newEntity, name: e.target.value})}
                placeholder="Entity name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 w-full"
                value={newEntity.type}
                onChange={(e) => setNewEntity({...newEntity, type: e.target.value})}
              >
                {entityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confidence Threshold</label>
              <div className="flex items-center">
                <input
                  type="range"
                  className="w-full"
                  min="0"
                  max="1"
                  step="0.01"
                  value={newEntity.confidence}
                  onChange={(e) => setNewEntity({...newEntity, confidence: parseFloat(e.target.value)})}
                />
                <span className="ml-2 text-gray-700">{(newEntity.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              onClick={() => setShowAddEntity(false)} 
              className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddEntity}
              className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Entity
            </button>
          </div>
        </div>
      )}

      <div className="border rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entities.map((entity) => (
              <tr key={entity.id} className={!entity.active ? "bg-gray-50" : ""}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entity.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entity.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div 
                        className={`h-2.5 rounded-full ${entity.confidence > 0.8 ? 'bg-green-500' : entity.confidence > 0.6 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                        style={{ width: `${entity.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span>{(entity.confidence * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span 
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      entity.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {entity.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => toggleActive(entity.id)}
                      className={`px-2 py-1 rounded ${
                        entity.active ? 'text-gray-600 hover:text-gray-800' : 'text-indigo-600 hover:text-indigo-800'
                      }`}
                    >
                      {entity.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button 
                      onClick={() => handleTestEntity(entity)}
                      className="px-2 py-1 text-indigo-600 hover:text-indigo-800"
                    >
                      Test
                    </button>
                    <button 
                      onClick={() => handleDeleteEntity(entity.id)}
                      className="px-2 py-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {testResults && selectedEntity && (
        <div className="mt-6 border rounded-md p-4">
          <h3 className="font-medium text-gray-800 mb-2 flex items-center">
            Test Results: <span className="text-indigo-600 ml-1">{selectedEntity.name}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-500">Matches Found</p>
              <p className="font-semibold text-lg">{testResults.matches}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-500">Recognition Accuracy</p>
              <p className="font-semibold text-lg">{testResults.accuracy}%</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-500">Model</p>
              <p className="font-semibold text-lg">{modelType}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500 mb-2">Sample Recognized Sentences</p>
            <ul className="space-y-2 text-sm">
              {testResults.sampleTexts.map((text: any, index: any) => (
                <li key={index} className="p-2 bg-white rounded border">
                  {text.replace('[ENTITY]', `<span class="font-semibold text-indigo-600">${selectedEntity.name}</span>`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isTestingEntity && (
        <div className="mt-6 flex justify-center">
          <div className="flex items-center space-x-2 text-gray-600">
            <RefreshCw size={20} className="animate-spin" />
            <span>Testing entity recognition...</span>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center space-x-1"
        >
          <Save size={16} />
          <span>Save Configuration</span>
        </button>
      </div>
    </div>
  );
};

export default EntityRecognitionConfig;