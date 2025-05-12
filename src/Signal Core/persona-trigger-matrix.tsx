import  { useState, useEffect } from 'react';
import { Check, X, Edit, AlertCircle, Save, PlusSquare, Info } from 'lucide-react';

const PersonaTriggerMatrix = () => {
  // Sample data - in a real application this would come from an API
  const [personas, setPersonas] = useState([
    { id: 1, name: 'Enterprise Decision Maker', description: 'C-level executives with purchasing authority' },
    { id: 2, name: 'Technical Evaluator', description: 'IT professionals evaluating technical requirements' },
    { id: 3, name: 'End User', description: 'Day-to-day users of the product' },
    { id: 4, name: 'Finance Approver', description: 'Budget holders who approve purchases' }
  ]);

  const [triggers] = useState([
    { id: 1, name: 'Demo Request', source: 'Website', condition: 'Form Submission' },
    { id: 2, name: 'Pricing Page Visit', source: 'Website', condition: '3+ Visits in 7 Days' },
    { id: 3, name: 'Competitor Comparison', source: 'Website', condition: 'Page View > 2 min' },
    { id: 4, name: 'Free Trial Expiring', source: 'Product', condition: '3 Days Remaining' },
    { id: 5, name: 'High Product Usage', source: 'Product', condition: 'Daily Active > 5 Days' }
  ]);

  // Matrix connections (persona ID + trigger ID as key, true/false as value)
  const [connections, setConnections] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const [newPersona, setNewPersona] = useState({ name: '', description: '' });
  const [showNewPersonaForm, setShowNewPersonaForm] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [showPersonaDetail, setShowPersonaDetail] = useState(false);

  // Initialize random connections for demo
  // useEffect(() => {
  //   const initialConnections = {};
  //   personas.forEach(persona => {
  //     triggers.forEach(trigger => {
  //       // Randomly set some connections to true (about 40%)
  //       initialConnections[`${persona.id}-${trigger.id}`] = Math.random() > 0.6;
  //     });
  //   });
  //   setConnections(initialConnections);
  // }, []);

  const toggleConnection = (personaId: number, triggerId: number) => {
    if (!isEditing) return;
    
    const key = `${personaId}-${triggerId}`;
    setConnections({
      ...connections,
      [key]: !connections[key]
    });
  };

  const handleAddPersona = () => {
    if (!newPersona.name) return;
    
    const newId = Math.max(...personas.map(p => p.id)) + 1;
    const persona = {
      id: newId,
      name: newPersona.name,
      description: newPersona.description
    };
    
    setPersonas([...personas, persona]);
    setNewPersona({ name: '', description: '' });
    setShowNewPersonaForm(false);
    
    // Initialize connections for new persona
    const updatedConnections = {...connections};
    triggers.forEach(trigger => {
      updatedConnections[`${newId}-${trigger.id}`] = false;
    });
    setConnections(updatedConnections);
  };

  const viewPersonaDetail = (persona: any) => {
    setSelectedPersona(persona);
    setShowPersonaDetail(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Persona Trigger Matrix</h2>
          <p className="text-gray-600">Map high-impact revenue moments across audience segments</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-md flex items-center ${
              isEditing ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
            }`}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit Matrix
              </>
            )}
          </button>
        </div>
      </div>

      {showPersonaDetail && selectedPersona && (
        <div className="mb-6 p-4 bg-blue-50 rounded-md">
          <div className="flex justify-between">
            {/* <h3 className="text-xl font-semibold text-blue-800">{selectedPersona.name}</h3> */}
            <button onClick={() => setShowPersonaDetail(false)} className="text-gray-500">
              <X size={20} />
            </button>
          </div>
          {/* <p className="text-gray-600 mb-2">{selectedPersona.description}</p> */}
          
          <h4 className="font-medium text-blue-700 mt-4">Active Triggers:</h4>
          {/* <ul className="list-disc pl-5 mt-2">
            {triggers.filter(trigger => connections[`${selectedPersona.id}-${trigger.id}`]).map(trigger => (
              <li key={trigger.id} className="text-gray-700">{trigger.name} <span className="text-gray-500 text-sm">({trigger.source})</span></li>
            ))}
          </ul> */}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border bg-gray-100 p-3 w-40">Personas / Triggers</th>
              {triggers.map(trigger => (
                <th key={trigger.id} className="border bg-gray-100 p-3 w-32">
                  <div className="font-medium">{trigger.name}</div>
                  <div className="text-xs text-gray-500">{trigger.source}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {personas.map(persona => (
              <tr key={persona.id}>
                <td className="border p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{persona.name}</div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">{persona.description}</div>
                    </div>
                    <button 
                      onClick={() => viewPersonaDetail(persona)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Info size={16} />
                    </button>
                  </div>
                </td>
                {triggers.map(trigger => {
                  const isConnected = connections[`${persona.id}-${trigger.id}`];
                  return (
                    <td 
                      key={trigger.id} 
                      className={`border p-3 text-center ${isEditing ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                      onClick={() => toggleConnection(persona.id, trigger.id)}
                    >
                      {isConnected ? (
                        <div className="flex justify-center">
                          <span className="bg-green-100 text-green-800 p-1 rounded-full">
                            <Check className="w-5 h-5" />
                          </span>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <span className="bg-gray-100 text-gray-400 p-1 rounded-full">
                            <X className="w-5 h-5" />
                          </span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="mt-6">
          {!showNewPersonaForm ? (
            <button
              onClick={() => setShowNewPersonaForm(true)}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <PlusSquare className="w-5 h-5 mr-2" />
              Add New Persona
            </button>
          ) : (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-3">Add New Persona</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Persona Name</label>
                  <input
                    type="text"
                    value={newPersona.name}
                    onChange={(e) => setNewPersona({...newPersona, name: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enterprise Decision Maker"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <input
                    type="text"
                    value={newPersona.description}
                    onChange={(e) => setNewPersona({...newPersona, description: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="C-level executives with purchasing authority"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddPersona}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Add Persona
                  </button>
                  <button
                    onClick={() => setShowNewPersonaForm(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 bg-blue-50 p-4 rounded-md">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
          <div>
            <h3 className="text-blue-800 font-medium">About Persona Trigger Matrix</h3>
            <p className="text-sm text-gray-600 mt-1">
              The Persona Trigger Matrix helps you map high-impact revenue moments across different audience segments.
              This enables targeted journeys and optimized conversion paths for each persona.
              Edit the matrix to define which triggers should activate for each persona, creating personalized experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaTriggerMatrix;