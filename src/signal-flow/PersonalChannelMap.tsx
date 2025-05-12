import { useState } from 'react';
import { Check, Plus, Save, Trash2, Edit } from 'lucide-react';

export default function PersonaChannelMap() {
  // Sample personas and channels
  const [personas, setPersonas] = useState([
    { id: 1, name: 'Decision Makers', description: 'C-level executives with purchasing authority', isEditing: false },
    { id: 2, name: 'Technical Evaluators', description: 'IT professionals evaluating solutions', isEditing: false },
    { id: 3, name: 'End Users', description: 'Daily users of the product', isEditing: false }
  ]);

  const [channels, setChannels] = useState([
    { id: 1, name: 'Email', icon: '✉️' },
    { id: 2, name: 'Social Media', icon: '📱' },
    { id: 3, name: 'Paid Search', icon: '🔍' },
    { id: 4, name: 'Website', icon: '🌐' },
    { id: 5, name: 'Events', icon: '📅' }
  ]);

  // Mapping between personas and channels
  const [mappings, setMappings] = useState({
    1: [1, 4, 5],     // Decision Makers -> Email, Website, Events
    2: [1, 2, 3, 4],  // Technical Evaluators -> Email, Social, Search, Website
    3: [1, 2, 4]      // End Users -> Email, Social, Website
  });

  // State for new persona form
  const [newPersona, setNewPersona] = useState({ name: '', description: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPersonaId, setEditingPersonaId] = useState(null);

  const toggleMapping = (personaId, channelId) => {
    setMappings(prev => {
      const personaMappings = [...(prev[personaId] || [])];
      const index = personaMappings.indexOf(channelId);
      
      if (index === -1) {
        personaMappings.push(channelId);
      } else {
        personaMappings.splice(index, 1);
      }
      
      return { ...prev, [personaId]: personaMappings };
    });
  };

  const addPersona = () => {
    if (!newPersona.name) return;
    
    const newId = Math.max(0, ...personas.map(p => p.id)) + 1;
    setPersonas([...personas, { id: newId, name: newPersona.name, description: newPersona.description, isEditing: false }]);
    setMappings({ ...mappings, [newId]: [] });
    setNewPersona({ name: '', description: '' });
    setShowAddForm(false);
  };

  const startEditPersona = (id) => {
    setPersonas(personas.map(p => 
      p.id === id 
        ? { ...p, isEditing: true } 
        : { ...p, isEditing: false }
    ));
    setEditingPersonaId(id);
  };

  const saveEditPersona = (id, updatedName, updatedDesc) => {
    setPersonas(personas.map(p => 
      p.id === id 
        ? { ...p, name: updatedName, description: updatedDesc, isEditing: false } 
        : p
    ));
    setEditingPersonaId(null);
  };

  const deletePersona = (id) => {
    setPersonas(personas.filter(p => p.id !== id));
    // Remove mappings for this persona
    const newMappings = { ...mappings };
    delete newMappings[id];
    setMappings(newMappings);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Persona & Channel Map</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={16} className="mr-1" />
          <span>Add Persona</span>
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border border-blue-200 rounded-md bg-blue-50">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Add New Persona</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={newPersona.name}
                onChange={(e) => setNewPersona({...newPersona, name: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Persona name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newPersona.description}
                onChange={(e) => setNewPersona({...newPersona, description: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Describe this persona"
                rows="2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setShowAddForm(false)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button 
                onClick={addPersona}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={!newPersona.name}
              >
                Add Persona
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 p-3 text-left font-semibold text-gray-700 border-b">Persona</th>
              {channels.map(channel => (
                <th key={channel.id} className="p-3 text-center font-semibold text-gray-700 border-b">
                  <div className="flex flex-col items-center">
                    <span className="text-xl">{channel.icon}</span>
                    <span className="text-sm">{channel.name}</span>
                  </div>
                </th>
              ))}
              <th className="w-16 p-3 text-center font-semibold text-gray-700 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {personas.map(persona => (
              <tr key={persona.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {persona.isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        defaultValue={persona.name}
                        id={`edit-name-${persona.id}`}
                        className="w-full p-1 border border-gray-300 rounded-md text-sm"
                      />
                      <textarea
                        defaultValue={persona.description}
                        id={`edit-desc-${persona.id}`}
                        className="w-full p-1 border border-gray-300 rounded-md text-sm"
                        rows="2"
                      />
                      <button 
                        onClick={() => saveEditPersona(
                          persona.id, 
                          document.getElementById(`edit-name-${persona.id}`).value,
                          document.getElementById(`edit-desc-${persona.id}`).value
                        )}
                        className="flex items-center text-sm text-green-600 hover:text-green-800"
                      >
                        <Save size={14} className="mr-1" />
                        Save
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium text-gray-800">{persona.name}</div>
                      <div className="text-sm text-gray-500">{persona.description}</div>
                    </div>
                  )}
                </td>

                {channels.map(channel => {
                  const isActive = mappings[persona.id]?.includes(channel.id);
                  return (
                    <td key={channel.id} className="p-3 text-center">
                      <button
                        onClick={() => toggleMapping(persona.id, channel.id)}
                        className={`w-6 h-6 rounded ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}
                      >
                        {isActive && <Check size={16} className="mx-auto" />}
                      </button>
                    </td>
                  );
                })}

                <td className="p-3">
                  <div className="flex justify-center space-x-2">
                    {!persona.isEditing && (
                      <>
                        <button 
                          onClick={() => startEditPersona(persona.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => deletePersona(persona.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-md">
        <h3 className="font-semibold text-gray-700 mb-2">Usage Notes:</h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
          <li>Click on the checkboxes to toggle channel mapping for each persona</li>
          <li>Add new personas using the button at the top-right</li>
          <li>Edit persona details or delete them using the action buttons</li>
          <li>This mapping helps tailor journeys to different audience needs</li>
          <li>Use this information when building customer journeys in Signal Flow</li>
        </ul>
      </div>
    </div>
  );
}