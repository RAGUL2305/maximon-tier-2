import { useNavigate } from "react-router-dom";

const CreateEditJourneyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Back button and Title */}
        <div className="flex items-center mb-6">
          <a
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-blue-600 mr-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </a>
          <h1 className="text-xl font-semibold text-gray-800">
            Create New Journey
          </h1>
        </div>
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Journey Details Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Journey Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="journey-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Journey Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="journey-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter journey name"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Min 3 characters, max 100 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="journey-description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Journey Description
                  </label>
                  <textarea
                    id="journey-description"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Describe the purpose of this journey"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Flowchart Builder Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Flowchart Builder
              </h2>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 min-h-80">
                {/* Simplified flowchart with ad campaign journey nodes */}
                <div className="relative h-80 w-full">
                  {/* Start Node */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-48 p-3 bg-green-100 border border-green-300 rounded-md shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-800">
                        Campaign Launch
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-200 text-green-800">
                        Start
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-green-600">
                      Trigger: Schedule activation
                    </p>
                  </div>

                  {/* Connecting Arrow */}
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 h-8 w-0.5 bg-gray-300"></div>
                  <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-0 h-0 border-4 border-gray-300 border-t-0 border-l-4 border-r-4 border-b-8"></div>

                  {/* Second Node */}
                  <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-48 p-3 bg-blue-100 border border-blue-300 rounded-md shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-800">
                        Ad Impressions
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-200 text-blue-800">
                        Action
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-blue-600">
                      Display ads to target audience
                    </p>
                  </div>

                  {/* Connecting Arrow */}
                  <div className="absolute top-48 left-1/2 transform -translate-x-1/2 h-8 w-0.5 bg-gray-300"></div>
                  <div className="absolute top-56 left-1/2 transform -translate-x-1/2 w-0 h-0 border-4 border-gray-300 border-t-0 border-l-4 border-r-4 border-b-8"></div>

                  {/* Third Node */}
                  <div className="absolute top-60 left-1/2 transform -translate-x-1/2 w-48 p-3 bg-purple-100 border border-purple-300 rounded-md shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-purple-800">
                        Ad Click
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-200 text-purple-800">
                        Condition
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-purple-600">
                      If user clicks ad
                    </p>
                  </div>

                  {/* Split Path Arrows */}
                  <div className="absolute top-76 left-1/3 transform -translate-x-1/2 rotate-45 h-8 w-0.5 bg-gray-300"></div>
                  <div className="absolute top-76 left-2/3 transform -translate-x-1/2 -rotate-45 h-8 w-0.5 bg-gray-300"></div>

                  {/* Fourth Node - Yes Path */}
                  <div className="absolute top-88 left-1/4 transform -translate-x-1/2 w-48 p-3 bg-yellow-100 border border-yellow-300 rounded-md shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-yellow-800">
                        Landing Page
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-200 text-yellow-800">
                        Action
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-yellow-600">
                      Track landing page visit
                    </p>
                  </div>

                  {/* Fifth Node - No Path - with dashed outline to indicate it's being edited/focused */}
                  <div className="absolute top-88 left-3/4 transform -translate-x-1/2 w-48 p-3 bg-red-100 border-2 border-dashed border-red-500 rounded-md shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-red-800">
                        Retargeting
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-red-200 text-red-800">
                        Action
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-red-600">
                      Add to retargeting audience
                    </p>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Node
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Node Configuration Modal (Shown when Add Node is clicked) */}
        <div
          className="fixed inset-0 flex items-center justify-center z-10"
          style={{ display: "none" }}
        >
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Configure Node
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label
                        htmlFor="node-name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Node Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="node-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter node name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="node-type"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Node Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="node-type"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="">Select node type</option>
                        <option value="action">Action</option>
                        <option value="condition">Condition</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="trigger"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Trigger (Optional)
                      </label>
                      <select
                        id="trigger"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="">No trigger</option>
                        <option value="account-creation">
                          Account Creation
                        </option>
                        <option value="form-submission">Form Submission</option>
                        <option value="page-view">Page View</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save Node
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Delete Node
              </button>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          >
            Save Journey
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateEditJourneyPage;
