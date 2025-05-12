import { Outlet, useNavigate } from "react-router-dom";

const PlatformDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100 overflow-y-auto">
      {/* Left Sidebar Navigation */}
      <div className="w-64 bg-slate-800 text-white shadow-lg">
        <div className="p-4 border-b border-slate-700">
          <h1 className="text-xl font-bold">Marketing OS</h1>
        </div>
        <nav className="mt-4">
          <ul>
            <li className="mb-1">
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full flex items-center p-3 text-gray-300 hover:bg-slate-700 rounded-r-md text-left"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                DashBoard
              </button>
            </li>
            <li className="mb-1">
              <button
                onClick={() => navigate("/dashboard/signal-studio")}
                className="w-full flex items-center p-3 text-gray-300 hover:bg-slate-700 rounded-r-md text-left"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                Signal Studio
              </button>
              {/* {
                <ul className="ml-6 mt-1">
                  <li className="mb-1">
                    <button
                      onClick={() => navigate("dashboard/signal-studio/export")}
                    >
                      Export Hub
                    </button>
                  </li>
                </ul>
              } */}
            </li>
            <li className="mb-1">
              <button
                onClick={() => navigate("/dashboard/memory-loom")}
                className="w-full flex items-center p-3 text-gray-300 hover:bg-slate-700 rounded-r-md text-left"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  ></path>
                </svg>
                Memory Loom
              </button>
            </li>
            <li className="mb-1">
              <button
                onClick={() => navigate("/dashboard/signal-flow")}
                className="w-full flex items-center p-3 text-gray-300 hover:bg-slate-700 rounded-r-md text-left"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
                Signal Flow
              </button>
            </li>
            <li className="mb-1">
              <button
                onClick={() => navigate("/dashboard/signal-core")}
                className="w-full flex items-center p-3 text-gray-300 hover:bg-slate-700 rounded-r-md text-left"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
                SignalCore
              </button>
            </li>
            <li className="mb-1">
              <a
                className="flex items-center p-3 text-gray-300 hover:bg-slate-700 rounded-r-md"
                onClick={() => navigate("/dashboard/signal-scope")}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                SignalScope
              </a>
            </li>
            <li className="mb-1">
              <button
                onClick={() => navigate("/dashboard/signal-studio/export")}
                className="w-full flex items-center p-3 text-gray-300 hover:bg-slate-700 rounded-r-md text-left"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                Export Hub
              </button>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t border-slate-700">
          <button
            onClick={() => navigate("/dashboard/developer-sdk")}
            className="w-full flex items-center p-3 text-gray-300 hover:bg-slate-700 rounded-r-md text-left"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              ></path>
            </svg>
            Developer SDK
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex justify-between items-center px-6 py-3">
            <div className="text-xl font-semibold"></div>
            <div className="flex items-center">
              <div className="relative mr-4">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    ></path>
                  </svg>
                  <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    KC
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PlatformDashboard;
