import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-12 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Create/Edit Draft Page</h2>
      <div className="border-2 border-gray-300 p-4 rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded mr-3"></div>
            <span className="font-bold text-xl">New Draft</span>
          </div>
          <div>
            <button className="bg-gray-200 px-4 py-2 rounded mr-2">
              Cancel
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => navigate("/dashboard/signal-studio")}
            >
              Save Draft
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Draft Title</label>
          <input
            type="text"
            placeholder="Enter draft title..."
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="text-xs text-gray-500 mt-1">
            3-100 characters required
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="block mb-1 font-medium">Prompt</label>
            <div className="flex items-center">
              <label className="mr-2 text-sm">Tone:</label>
              <select className="p-1 border border-gray-300 rounded text-sm">
                <option>Neutral</option>
                <option>Professional</option>
                <option>Friendly</option>
                <option>Persuasive</option>
              </select>
            </div>
          </div>
          <textarea
            placeholder="Enter your prompt here..."
            className="w-full p-2 border border-gray-300 rounded h-24"
            rows={4}
          ></textarea>
        </div>

        <div className="mb-4">
          <div className="bg-gray-50 border border-gray-200 p-3 rounded">
            <h4 className="font-medium mb-2">Brand Guidelines Preview</h4>
            <ul className="text-sm text-gray-600 pl-4">
              <li className="mb-1">
                Always use "customers" instead of "users"
              </li>
              <li className="mb-1">Avoid jargon and technical terms</li>
              <li className="mb-1">Focus on benefits, not features</li>
              <li className="mb-1">Voice: approachable but professional</li>
            </ul>
          </div>
        </div>

        <div className="mb-4 flex justify-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            Generate Content
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Generated Content</label>
          <div className="flex mb-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mr-2">
              Tone Score: 92%
            </span>
            <a href="#" className="text-blue-600 text-sm">
              View Generation History
            </a>
          </div>
          <div className="border border-gray-300 rounded p-2 bg-white min-h-32">
            <p className="text-gray-400 italic">
              Generated content will appear here...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
