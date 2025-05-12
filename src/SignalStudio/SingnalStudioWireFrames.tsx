import { useNavigate } from "react-router-dom";

const SignalStudioWireframes = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* KPI Tiles */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border border-gray-200 p-4 rounded bg-gray-50">
          <div className="text-sm text-gray-500">Drafts Pending</div>
          <div className="text-2xl font-bold">12</div>
        </div>
        <div className="border border-gray-200 p-4 rounded bg-gray-50">
          <div className="text-sm text-gray-500">Drafts Approved</div>
          <div className="text-2xl font-bold">8</div>
        </div>
        <div className="border border-gray-200 p-4 rounded bg-gray-50">
          <div className="text-sm text-gray-500">Drafts Exported</div>
          <div className="text-2xl font-bold">5</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold text-lg">Recent Drafts</h3>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          onClick={() => navigate("/dashboard/signal-studio/create")}
        >
          <span className="mr-1">+</span> New Draft
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <div className="px-4 py-2 border-b-2 border-blue-500 font-medium">
          All
        </div>
        <div className="px-4 py-2 text-gray-500">Pending Approval</div>
        <div className="px-4 py-2 text-gray-500">Approved</div>
        <div className="px-4 py-2 text-gray-500">Exported</div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search drafts..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Draft List */}
      <div className="border border-gray-200 rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Last Updated</th>
              <th className="px-4 py-2 text-left">Tone Score</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer">
              <td
                className="px-4 py-3 hover:underline "
                onClick={() => navigate("/dashboard/signal-studio/draft")}
              >
                Q2 Product Launch Email
              </td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  Pending Approval
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">2 hours ago</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  92%
                </span>
              </td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer">
              <td className="px-4 py-3">Customer Survey Invitation</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  Approved
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">Yesterday</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  88%
                </span>
              </td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer">
              <td className="px-4 py-3">Weekly Newsletter Draft</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                  Drafting
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">Today</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  75%
                </span>
              </td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer">
              <td className="px-4 py-3">Feature Announcement</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                  Exported
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">3 days ago</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  95%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">Showing 1-4 of 25 drafts</div>
        <div className="flex">
          <button className="px-3 py-1 border border-gray-300 rounded-l bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-r bg-gray-50 border-l-0">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignalStudioWireframes;
