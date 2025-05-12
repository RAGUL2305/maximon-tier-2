import { useNavigate } from "react-router-dom";

const MemoryLoomDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Memory Loom Dashboard
            </h1>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center"
              onClick={() => navigate("/dashboard/memory-loom/upload")}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Upload Codex
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Memory Loom is the semantic memory infrastructure of Marketing OS —
            a pluggable, governable, engine designed to structure, store,
            evolve, and operationalize brand meaning.
          </p>
        </div>

        {/* KPI Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-indigo-100 p-3">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">
                  Total Codex Files
                </p>
                <p className="text-3xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-green-100 p-3">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">
                  Recently Uploaded
                </p>
                <p className="text-3xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-500">this week</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-blue-100 p-3">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  ></path>
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">
                  Brand Terms Extracted
                </p>
                <p className="text-3xl font-bold text-gray-900">352</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow p-6 text-white">
            <h3 className="text-lg font-medium mb-3">Brand Lexicon</h3>
            <p className="mb-4 text-purple-100">
              Access your complete brand vocabulary and approved terminology.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">142 terms</span>
              <button
                className="bg-white bg-opacity-20 hover:bg-opacity-30 py-2 px-4 rounded-md text-sm"
                onClick={() => navigate("/dashboard/memory-bloom/lexicon")}
              >
                View Lexicon
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow p-6 text-white">
            <h3 className="text-lg font-medium mb-3">Memory Search</h3>
            <p className="mb-4 text-blue-100">
              Search across all your semantic brand knowledge.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Full-text search</span>
              <button
                className="bg-white bg-opacity-20 hover:bg-opacity-30 py-2 px-4 rounded-md text-sm"
                onClick={() => navigate("/dashboard/memory-loom/search")}
              >
                Search Memory
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg shadow p-6 text-white">
            <h3 className="text-lg font-medium mb-3">Memory Objects</h3>
            <p className="mb-4 text-emerald-100">
              View and manage all your uploaded codex files.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">24 files</span>
              <button
                className="bg-white bg-opacity-20 hover:bg-opacity-30 py-2 px-4 rounded-md text-sm"
                onClick={() => navigate("/dashboard/memory-loom/list-view")}
              >
                View All
              </button>
            </div>
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">
              Recent Uploads
            </h2>
            <a
              href="#"
              className="text-sm text-indigo-600 hover:text-indigo-900"
            >
              View all files
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Filename
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Upload Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Uploaded By
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tags
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600"
                    onClick={() =>
                      navigate("/dashboard/memory-loom/detailview")
                    }
                  >
                    Brand_Guidelines_2025.pdf
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    May 3, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Katie Casey
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Guidelines, Brand Voice
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                    Product_Messaging_Framework.docx
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    May 1, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Alex Johnson
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Messaging, Product
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                    Marketing_OS_Glossary.txt
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Apr 29, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Katie Casey
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Terminology, Reference
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Terms & Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Popular Brand Terms
              </h2>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  Signal-based Marketing
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Marketing OS
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  MESH Organization
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Memory Loom
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Signal Studio
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  Signal Flow
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                  SignalCore
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                  SignalScope
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800">
                  Semantic Memory
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                  Brand Signal
                </span>
              </div>
              <div className="mt-4 text-right">
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  View all terms →
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Quick Search
              </h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label htmlFor="quick-search" className="sr-only">
                  Quick Search
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="quick-search"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search brand memory..."
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 mb-2">Recent searches:</p>
                <button className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-800">
                  signal object
                </button>
                <button className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-800">
                  brand voice
                </button>
                <button className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-800">
                  messaging framework
                </button>
              </div>
              <div className="mt-4 text-right">
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-900"
                >
                  Advanced search →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemoryLoomDashboard;
