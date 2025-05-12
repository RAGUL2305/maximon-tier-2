import { useState } from "react";
import { RotateCw, CheckCircle, XCircle } from "lucide-react";

const MemorySyncPanel = () => {
  const [memoryObjects, setMemoryObjects] = useState([
    {
      id: 1,
      name: "Brand Voice Guidelines",
      syncStatus: "Synced",
      lastSynced: "10 May 2025, 14:32",
      pendingFeedback: false,
    },
    {
      id: 2,
      name: "Product Feature Lexicon",
      syncStatus: "Out of Sync",
      lastSynced: "8 May 2025, 09:15",
      pendingFeedback: true,
    },
    {
      id: 3,
      name: "Customer Journey Templates",
      syncStatus: "Synced",
      lastSynced: "10 May 2025, 11:47",
      pendingFeedback: false,
    },
    {
      id: 4,
      name: "Campaign Messaging Atoms",
      syncStatus: "Out of Sync",
      lastSynced: "5 May 2025, 16:22",
      pendingFeedback: true,
    },
    {
      id: 5,
      name: "Service Tone Guidelines",
      syncStatus: "Synced",
      lastSynced: "9 May 2025, 10:05",
      pendingFeedback: false,
    },
  ]);

  const [feedbackItems, setFeedbackItems] = useState([
    {
      id: 1,
      memoryObjectId: 2,
      content: "New features require updated terminology for consistency",
      submittedBy: "SignalCore",
      timestamp: "10 May 2025, 08:45",
      status: "Pending",
    },
    {
      id: 2,
      memoryObjectId: 4,
      content: "Campaign performance suggests adjusting tone for Segment B",
      submittedBy: "SignalFlow",
      timestamp: "9 May 2025, 15:20",
      status: "Pending",
    },
    {
      id: 3,
      memoryObjectId: 4,
      content: "External perception deviates from intended brand voice",
      submittedBy: "SignalScope",
      timestamp: "8 May 2025, 11:33",
      status: "Pending",
    },
  ]);

  const [activeTab, setActiveTab] = useState("sync");

  const handleSyncItem = (id) => {
    setMemoryObjects(
      memoryObjects.map((obj) =>
        obj.id === id
          ? { ...obj, syncStatus: "Synced", lastSynced: "10 May 2025, 15:00" }
          : obj
      )
    );
  };

  const handleFeedbackAction = (id, action) => {
    setFeedbackItems(
      feedbackItems.map((item) =>
        item.id === id
          ? { ...item, status: action === "approve" ? "Approved" : "Rejected" }
          : item
      )
    );

    // If approved, automatically mark the related memory object as out of sync
    if (action === "approve") {
      const feedbackItem = feedbackItems.find((f) => f.id === id);
      const memoryObjectId = feedbackItem.memoryObjectId;
      setMemoryObjects(
        memoryObjects.map((obj) =>
          obj.id === memoryObjectId
            ? { ...obj, syncStatus: "Out of Sync" }
            : obj
        )
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Memory Sync/Feedback Loop Panel
        </h2>
        <div className="bg-gray-100 rounded-lg p-1">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "sync" ? "bg-white shadow-sm" : ""
            }`}
            onClick={() => setActiveTab("sync")}
          >
            Sync Status
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "feedback" ? "bg-white shadow-sm" : ""
            }`}
            onClick={() => setActiveTab("feedback")}
          >
            Pending Feedback (
            {feedbackItems.filter((f) => f.status === "Pending").length})
          </button>
        </div>
      </div>

      {activeTab === "sync" && (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Memory Object
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sync Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Synced
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {memoryObjects.map((item) => (
                  <tr
                    key={item.id}
                    className={item.pendingFeedback ? "bg-yellow-50" : ""}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      {item.pendingFeedback && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          Has feedback
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.syncStatus === "Synced"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.syncStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.lastSynced}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {item.syncStatus === "Out of Sync" && (
                        <button
                          onClick={() => handleSyncItem(item.id)}
                          className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                        >
                          <RotateCw className="w-4 h-4 mr-1" />
                          Sync Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "feedback" && (
        <div className="space-y-4">
          {feedbackItems
            .filter((item) => item.status === "Pending")
            .map((item) => {
              const memoryObject = memoryObjects.find(
                (obj) => obj.id === item.memoryObjectId
              );
              return (
                <div key={item.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Feedback for:{" "}
                      <span className="text-indigo-600">
                        {memoryObject?.name}
                      </span>
                    </h3>
                    <span className="text-sm text-gray-500">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{item.content}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Submitted by: {item.submittedBy}
                    </span>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleFeedbackAction(item.id, "reject")}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <XCircle className="w-4 h-4 mr-1 text-red-500" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleFeedbackAction(item.id, "approve")}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve & Update
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

          {feedbackItems.filter((item) => item.status === "Pending").length ===
            0 && (
            <div className="text-center py-8 text-gray-500">
              No pending feedback items available.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemorySyncPanel;
