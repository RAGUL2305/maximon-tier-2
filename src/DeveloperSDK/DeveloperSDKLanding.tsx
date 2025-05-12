import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeveloperSDKLanding = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("landing");

  const handleCardClick = (page: string) => {
    setActivePage(page);
  };

  const navigateHome = () => {
    setActivePage("landing");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation / Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3">
            <div className="flex items-center space-x-2 text-sm">
              <span
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={navigateHome}
              >
                Home
              </span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-900">Developer SDK</span>
              {activePage !== "landing" && (
                <>
                  <span className="text-gray-500">/</span>
                  <span className="text-gray-900">
                    {activePage === "tokens" && "API Tokens"}
                    {activePage === "docs" && "API Documentation"}
                    {activePage === "errors" && "API Error Log"}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {activePage === "landing" ? (
          /* Developer SDK Landing Page */
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">
              Developer SDK
            </h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* API Tokens Card */}
              <div
                className="bg-white overflow-hidden shadow rounded-lg cursor-pointer transform transition hover:-translate-y-1 hover:shadow-lg"
                onClick={() => handleCardClick("tokens")}
              >
                <div
                  className="px-4 py-5 sm:p-6"
                  onClick={() =>
                    navigate("/dashboard/developer-sdk/api-tokens")
                  }
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    API Tokens
                  </h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      Create, view, and manage your API tokens for secure access
                      to Marketing OS services.
                    </p>
                  </div>
                </div>
              </div>

              {/* API Documentation Card */}
              <div
                className="bg-white overflow-hidden shadow rounded-lg cursor-pointer transform transition hover:-translate-y-1 hover:shadow-lg"
                onClick={() => handleCardClick("docs")}
              >
                <div
                  className="px-4 py-5 sm:p-6"
                  onClick={() => navigate("/dashboard/developer-sdk/api-docs")}
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    API Documentation
                  </h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      Explore endpoints, parameters, and examples for
                      implementing Marketing OS API.
                    </p>
                  </div>
                </div>
              </div>

              {/* API Error Log Card */}
              <div
                className="bg-white overflow-hidden shadow rounded-lg cursor-pointer transform transition hover:-translate-y-1 hover:shadow-lg"
                onClick={() => handleCardClick("errors")}
              >
                <div
                  className="px-4 py-5 sm:p-6"
                  onClick={() =>
                    navigate("/dashboard/developer-sdk/api-error-log")
                  }
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    API Error Log
                  </h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      View and troubleshoot recent API errors and issues with
                      your integration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Placeholder for other pages */
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                {activePage === "tokens" && "API Tokens"}
                {activePage === "docs" && "API Documentation"}
                {activePage === "errors" && "API Error Log"}
              </h1>
              <button
                onClick={navigateHome}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Back to SDK Home
              </button>
            </div>

            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                This is a placeholder for the{" "}
                {activePage === "tokens"
                  ? "API Tokens"
                  : activePage === "docs"
                  ? "API Documentation"
                  : "API Error Log"}{" "}
                page.
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Click "Back to SDK Home" to return to the main page.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DeveloperSDKLanding;
