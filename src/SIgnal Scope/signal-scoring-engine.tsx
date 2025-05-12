import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignalScoringEngine = () => {
  const navigate = useNavigate()
  const [minScore, setMinScore] = useState(0);
  const [maxScore, setMaxScore] = useState(100);
  const [minConfidence, setMinConfidence] = useState(0);

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to Dashboard
          </button>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-500">Signal Scoring Engine</span>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Signal Scoring Engine
          </h1>
          <p className="text-gray-600">
            View scored signals with metadata and score values
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Filter Signals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Score Range Filter */}
            <div>
              <label
                htmlFor="minScore"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Min Score
              </label>
              <input
                type="range"
                id="minScore"
                min="0"
                max="100"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                value={minScore}
                onChange={(e) => setMinScore(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>{minScore}</span>
              </div>
            </div>
            <div>
              <label
                htmlFor="maxScore"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Max Score
              </label>
              <input
                type="range"
                id="maxScore"
                min="0"
                max="100"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                value={maxScore}
                onChange={(e) => setMaxScore(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{maxScore}</span>
                <span>100</span>
              </div>
            </div>
            <div>
              <label
                htmlFor="confidence"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Min Confidence (%)
              </label>
              <input
                type="range"
                id="confidence"
                min="0"
                max="100"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                value={minConfidence}
                onChange={(e) => setMinConfidence(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>{minConfidence}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scored Signals Table */}
        <div className="bg-white shadow rounded">
          <div className="px-4 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Scored Signals
            </h3>
            <span className="text-sm text-gray-500">
              Showing 25 of 182 signals
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Signal ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Score Value
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Scored At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Confidence (%)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    SIG-2025-0485
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium mr-2">
                        98
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "98%" }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    45 minutes ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    95%
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    SIG-2025-0484
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium mr-2">
                        87
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "87%" }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1 hour ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    92%
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    SIG-2025-0473
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-medium mr-2">
                        76
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-yellow-500 h-2.5 rounded-full"
                          style={{ width: "76%" }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2 hours ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    88%
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    SIG-2025-0471
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-medium mr-2">
                        72
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-yellow-500 h-2.5 rounded-full"
                          style={{ width: "72%" }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    5 hours ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    86%
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    SIG-2025-0469
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-medium mr-2">
                        45
                      </span>
                      <div className="w-24 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-red-500 h-2.5 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Yesterday
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    72%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">5</span> of{" "}
                  <span className="font-medium">182</span> results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    8
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignalScoringEngine;
