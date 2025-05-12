const ExportHub = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Export Hub</h2>
      <div className="border-2 border-gray-300 p-4 rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded mr-3"></div>
            <span className="font-bold text-xl">Export Hub</span>
          </div>
          <div>
            <button className="bg-gray-200 px-4 py-2 rounded">
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">
            Approved Drafts Ready for Export
          </h3>
        </div>

        {/* Draft List */}
        <div className="border border-gray-200 rounded overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Export Status</th>
                <th className="px-4 py-2 text-left">Last Exported</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-3">Customer Survey Invitation</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Ready
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">Never</td>
                <td className="px-4 py-3 text-right">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                    Export
                  </button>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-3">Feature Announcement</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                    Exported
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">May 2, 2025</td>
                <td className="px-4 py-3 text-right">
                  <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded text-sm">
                    Re-Export
                  </button>
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="px-4 py-3">Monthly Newsletter</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Ready
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">Never</td>
                <td className="px-4 py-3 text-right">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                    Export
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
          <h4 className="font-medium mb-2">Export Options</h4>
          <div className="grid grid-cols-4 gap-4">
            <div className="border border-gray-300 p-3 rounded bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="text-sm">HTML</div>
              </div>
            </div>
            <div className="border border-gray-300 p-3 rounded bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="text-sm">Markdown</div>
              </div>
            </div>
            <div className="border border-gray-300 p-3 rounded bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="text-sm">Plain Text</div>
              </div>
            </div>
            <div className="border border-gray-300 p-3 rounded bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="text-sm">JSON</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportHub;
