const MemoryLoomUploadScreen = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <a href="#" className="hover:text-indigo-600">
              Memory Loom
            </a>
            <svg
              className="mx-2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span className="text-gray-700">Upload Codex</span>
          </div>
        </div>

        {/* Upload Codex Form */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Upload Codex File
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Upload brand documents to extract semantic knowledge for Memory
              Loom.
            </p>
          </div>
          <div className="p-6">
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File Upload <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOCX, TXT up to 20MB
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label
                htmlFor="codex-title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Codex Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="codex-title"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter a descriptive title"
              />
              <p className="mt-1 text-sm text-gray-500">
                Give your codex a clear, descriptive name (e.g., "Brand
                Guidelines 2025")
              </p>
            </div>

            <div className="mb-8">
              <label
                htmlFor="codex-description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description (Optional)
              </label>
              <textarea
                id="codex-description"
                // rows="3"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Brief description of this codex file's contents"
              ></textarea>
            </div>

            <div className="mb-8">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tags (Optional)
              </label>
              <input
                type="text"
                id="tags"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="e.g., Guidelines, Brand Voice, Product"
              />
              <p className="mt-1 text-sm text-gray-500">
                Separate tags with commas
              </p>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Processing Options
              </label>
              <div className="mt-2 space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="auto-extract"
                      name="auto-extract"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="auto-extract"
                      className="font-medium text-gray-700"
                    >
                      Auto-extract terms
                    </label>
                    <p className="text-gray-500">
                      Automatically identify and extract brand terms and
                      definitions
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="add-to-lexicon"
                      name="add-to-lexicon"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="add-to-lexicon"
                      className="font-medium text-gray-700"
                    >
                      Add to Brand Lexicon
                    </label>
                    <p className="text-gray-500">
                      Include extracted terms in the Brand Lexicon (review
                      required)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 border-t border-gray-200 pt-6">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Upload
              </button>
            </div>
          </div>
        </div>

        {/* Help Panel */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                Recommended file types include brand guidelines, messaging
                frameworks, tone of voice documents, and product glossaries.
              </p>
              <p className="mt-3 text-sm md:mt-0 md:ml-6">
                <a
                  href="#"
                  className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                >
                  Learn more <span aria-hidden="true">&rarr;</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MemoryLoomUploadScreen;
