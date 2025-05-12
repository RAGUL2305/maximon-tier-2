import { useState } from "react";
import {
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Edit3,
  Save,
  FileText,
  BarChart2,
  History,
  Settings,
} from "lucide-react";

const DraftDetailView = () => {
  const [content, setContent] = useState(
    "This innovative product leverages cutting-edge AI technology to transform how businesses operate. By streamlining workflows and automating routine tasks, it enables teams to focus on high-value strategic initiatives that drive growth. Our solution integrates seamlessly with existing systems while providing comprehensive analytics for data-driven decision making."
  );
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("Draft");
  const [toneScore, setToneScore] = useState(87);
  const [driftScore, setDriftScore] = useState(92);
  const [showComments, setShowComments] = useState(false);
  const [governanceWarnings, setGovernanceWarnings] = useState([
    {
      type: "Brand Voice",
      message: "Consider using more approachable language in paragraph 2",
      severity: "low",
    },
  ]);
  const [comments, setComments] = useState([
    {
      user: "Sarah Kim",
      text: "Can we emphasize the ROI more clearly?",
      timestamp: "10:32 AM",
    },
    {
      user: "Alex Johnson",
      text: "Approved from legal perspective",
      timestamp: "11:45 AM",
    },
  ]);
  const [commentInput, setCommentInput] = useState("");
  const [showGovernance, setShowGovernance] = useState(false);
  const [showChangeLog, setShowChangeLog] = useState(false);

  const changeLog = [
    {
      user: "AI Assistant",
      action: "Created initial draft",
      timestamp: "May 10, 2025, 09:15 AM",
    },
    {
      user: "Sarah Kim",
      action: "Edited tone and messaging",
      timestamp: "May 10, 2025, 10:30 AM",
    },
    {
      user: "System",
      action: "Applied brand voice check",
      timestamp: "May 10, 2025, 10:35 AM",
    },
  ];

  const handleApprove = () => {
    setStatus("Approved");
  };

  const handleReject = () => {
    setStatus("Rejected");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Simulate tone score recalculation
    setToneScore(Math.min(100, toneScore + Math.floor(Math.random() * 5)));
    setDriftScore(Math.max(70, driftScore - Math.floor(Math.random() * 8)));

    // Add to change log
    changeLog.unshift({
      user: "Current User",
      action: "Edited content",
      timestamp: new Date().toLocaleString(),
    });
  };

  const handleAddComment = () => {
    if (commentInput.trim()) {
      setComments([
        {
          user: "Current User",
          text: commentInput,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...comments,
      ]);
      setCommentInput("");
    }
  };

  const getToneColor = () => {
    if (toneScore >= 90) return "text-green-600";
    if (toneScore >= 75) return "text-blue-600";
    if (toneScore >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getDriftColor = () => {
    if (driftScore >= 90) return "text-green-600";
    if (driftScore >= 75) return "text-blue-600";
    if (driftScore >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadge = () => {
    switch (status) {
      case "Draft":
        return (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center">
            <Clock size={14} className="mr-1" /> Draft
          </span>
        );
      case "Approved":
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm flex items-center">
            <CheckCircle size={14} className="mr-1" /> Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm flex items-center">
            <XCircle size={14} className="mr-1" /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Q2 Product Launch Announcement
          </h1>
          <div className="flex space-x-4 text-sm text-gray-500">
            <p>Created by: AI Assistant</p>
            <p>Last updated: May 10, 2025</p>
            <div>{getStatusBadge()}</div>
          </div>
        </div>
        <div className="flex space-x-2">
          {!isEditing && status === "Draft" && (
            <>
              <button
                onClick={handleEdit}
                className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100"
              >
                <Edit3 size={16} className="mr-1" /> Edit
              </button>
              <button
                onClick={handleApprove}
                className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100"
              >
                <CheckCircle size={16} className="mr-1" /> Approve
              </button>
              <button
                onClick={handleReject}
                className="flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100"
              >
                <XCircle size={16} className="mr-1" /> Reject
              </button>
            </>
          )}
          {isEditing && (
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Save size={16} className="mr-1" /> Save
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Content area - takes up 2/3 of the width */}
        <div className="col-span-2 bg-white rounded-lg shadow p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center">
              <FileText size={18} className="mr-2" /> Content
            </h2>
            {governanceWarnings.length > 0 && (
              <button
                onClick={() => setShowGovernance(!showGovernance)}
                className="flex items-center text-yellow-600 text-sm"
              >
                <AlertTriangle size={16} className="mr-1" />{" "}
                {governanceWarnings.length} Warning
                {governanceWarnings.length > 1 ? "s" : ""}
              </button>
            )}
          </div>

          {showGovernance && (
            <div className="mb-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
              <h3 className="font-medium text-yellow-800 mb-2">
                Governance Warnings
              </h3>
              <ul className="space-y-2">
                {governanceWarnings.map((warning, idx) => (
                  <li key={idx} className="flex items-start">
                    <AlertTriangle
                      size={14}
                      className="text-yellow-600 mr-2 mt-1 flex-shrink-0"
                    />
                    <div>
                      <span className="font-medium">{warning.type}:</span>{" "}
                      {warning.message}
                      <span className="ml-2 text-xs bg-yellow-100 px-2 py-0.5 rounded-full">
                        {warning.severity}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <div className="prose max-w-none">
              <p className="leading-relaxed text-gray-700">{content}</p>
            </div>
          )}
        </div>

        {/* Right sidebar - takes up 1/3 of the width */}
        <div className="col-span-1 space-y-4">
          {/* Scores */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <BarChart2 size={18} className="mr-2" /> Scores
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Tone Score</span>
                  <span className={`text-sm font-medium ${getToneColor()}`}>
                    {toneScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      toneScore >= 90
                        ? "bg-green-500"
                        : toneScore >= 75
                        ? "bg-blue-500"
                        : toneScore >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${toneScore}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Drift Score</span>
                  <span className={`text-sm font-medium ${getDriftColor()}`}>
                    {driftScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      driftScore >= 90
                        ? "bg-green-500"
                        : driftScore >= 75
                        ? "bg-blue-500"
                        : driftScore >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${driftScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2
              className="text-lg font-semibold text-gray-700 mb-3 flex items-center cursor-pointer"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageSquare size={18} className="mr-2" /> Comments (
              {comments.length})
              <svg
                className={`ml-2 w-4 h-4 transition-transform ${
                  showComments ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </h2>

            {showComments && (
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={handleAddComment}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-3">
                  {comments.map((comment, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-md">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-700">
                          {comment.user}
                        </span>
                        <span className="text-xs text-gray-500">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Change Log */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2
              className="text-lg font-semibold text-gray-700 mb-3 flex items-center cursor-pointer"
              onClick={() => setShowChangeLog(!showChangeLog)}
            >
              <History size={18} className="mr-2" /> Change Log
              <svg
                className={`ml-2 w-4 h-4 transition-transform ${
                  showChangeLog ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </h2>

            {showChangeLog && (
              <div className="max-h-64 overflow-y-auto">
                <ul className="space-y-2">
                  {changeLog.map((log, idx) => (
                    <li
                      key={idx}
                      className="text-sm border-l-2 border-gray-300 pl-3 py-1"
                    >
                      <div className="font-medium text-gray-700">
                        {log.action}
                      </div>
                      <div className="text-xs text-gray-500">
                        {log.user} • {log.timestamp}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftDetailView;
