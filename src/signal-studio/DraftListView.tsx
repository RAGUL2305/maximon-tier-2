import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Download,
  Edit,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DraftListView = () => {
  // Simulated draft data
  const [drafts, setDrafts] = useState([]);
  const [filteredDrafts, setFilteredDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDrafts, setSelectedDrafts] = useState([]);
  const navigate = useNavigate();

  // Sort states
  const [sortField, setSortField] = useState("lastUpdated");
  const [sortDirection, setSortDirection] = useState("desc");

  // Generate mock draft data
  useEffect(() => {
    const mockDrafts = Array(12)
      .fill()
      .map((_, idx) => {
        const statuses = ["Pending", "Approved", "Rejected"];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));

        return {
          id: `draft-${idx + 1}`,
          title: `Marketing Campaign ${
            ["Announcement", "Promotion", "Newsletter", "Product Launch"][
              Math.floor(Math.random() * 4)
            ]
          } ${idx + 1}`,
          status,
          toneScore: Math.floor(Math.random() * 40) + 60, // 60-99
          lastUpdated: date,
          createdBy: ["Alex Morgan", "Sam Wilson", "Jamie Lee", "Taylor Swift"][
            Math.floor(Math.random() * 4)
          ],
          exported: Math.random() > 0.5,
        };
      });

    setDrafts(mockDrafts);
    setFilteredDrafts(mockDrafts);
    setLoading(false);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let result = drafts;

    // Apply search
    if (searchTerm) {
      result = result.filter((draft) =>
        draft.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      result = result.filter((draft) => draft.status === statusFilter);
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      if (sortField === "title") {
        return sortDirection === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortField === "toneScore") {
        return sortDirection === "asc"
          ? a.toneScore - b.toneScore
          : b.toneScore - a.toneScore;
      } else if (sortField === "lastUpdated") {
        return sortDirection === "asc"
          ? new Date(a.lastUpdated) - new Date(b.lastUpdated)
          : new Date(b.lastUpdated) - new Date(a.lastUpdated);
      }
      return 0;
    });

    setFilteredDrafts(result);
  }, [drafts, searchTerm, statusFilter, sortField, sortDirection]);

  // Toggle sort
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle checkbox selection
  const toggleDraftSelection = (draftId) => {
    if (selectedDrafts.includes(draftId)) {
      setSelectedDrafts(selectedDrafts.filter((id) => id !== draftId));
    } else {
      setSelectedDrafts([...selectedDrafts, draftId]);
    }
  };

  // Bulk actions
  const handleBulkAction = (action) => {
    if (selectedDrafts.length === 0) return;

    if (action === "approve") {
      // In a real app, this would call an API
      setDrafts(
        drafts.map((draft) =>
          selectedDrafts.includes(draft.id)
            ? { ...draft, status: "Approved" }
            : draft
        )
      );
    } else if (action === "reject") {
      setDrafts(
        drafts.map((draft) =>
          selectedDrafts.includes(draft.id)
            ? { ...draft, status: "Rejected" }
            : draft
        )
      );
    }

    // Clear selection after action
    setSelectedDrafts([]);
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  // Format date for display
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Drafts</h1>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={() => {
            navigate("/dashboard/studio/editor");
          }}
          >
            + New Draft
          </button>
        </div>

        {/* Search and filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center bg-gray-100 rounded-md overflow-hidden pr-2 w-full md:w-auto max-w-md">
            <input
              type="text"
              placeholder="Search by title..."
              className="py-2 px-4 bg-transparent outline-none flex-grow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="text-gray-500 w-5 h-5" />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-500 w-5 h-5" />
              <select
                className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Date Range:</span>
              <select className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none text-sm">
                <option>Last 30 days</option>
                <option>Last 60 days</option>
                <option>Last 90 days</option>
                <option>All time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk actions - Only show when items are selected */}
        {selectedDrafts.length > 0 && (
          <div className="flex items-center p-3 bg-blue-50 rounded-md mb-4">
            <span className="text-sm text-blue-700 mr-4">
              {selectedDrafts.length}{" "}
              {selectedDrafts.length === 1 ? "draft" : "drafts"} selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction("approve")}
                className="px-3 py-1 text-xs text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleBulkAction("reject")}
                className="px-3 py-1 text-xs text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={() => setSelectedDrafts([])}
                className="px-3 py-1 text-xs text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Main table */}
        {loading ? (
          <div className="py-20 text-center text-gray-500">
            Loading drafts...
          </div>
        ) : filteredDrafts.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            No drafts found matching your criteria
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-b border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="w-10 py-3 pl-4 pr-3 text-left">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600"
                      checked={
                        selectedDrafts.length === filteredDrafts.length &&
                        filteredDrafts.length > 0
                      }
                      onChange={() => {
                        if (selectedDrafts.length === filteredDrafts.length) {
                          setSelectedDrafts([]);
                        } else {
                          setSelectedDrafts(filteredDrafts.map((d) => d.id));
                        }
                      }}
                    />
                  </th>
                  <th
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort("title")}
                  >
                    <div className="flex items-center">
                      Title
                      <ArrowUpDown className="ml-1 w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort("toneScore")}
                  >
                    <div className="flex items-center">
                      Tone Score
                      <ArrowUpDown className="ml-1 w-4 h-4" />
                    </div>
                  </th>
                  <th
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort("lastUpdated")}
                  >
                    <div className="flex items-center">
                      Last Updated
                      <ArrowUpDown className="ml-1 w-4 h-4" />
                    </div>
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Export Status
                  </th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDrafts.map((draft) => (
                  <tr
                    key={draft.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 pl-4 pr-3 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        checked={selectedDrafts.includes(draft.id)}
                        onChange={() => toggleDraftSelection(draft.id)}
                      />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {draft.title}
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      {getStatusBadge(draft.status)}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              draft.toneScore >= 80
                                ? "bg-green-500"
                                : draft.toneScore >= 70
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${draft.toneScore}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {draft.toneScore}%
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(draft.lastUpdated)}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {draft.createdBy}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                      {draft.exported ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Exported
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Not Exported
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="p-1 text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {draft.status === "Approved" && (
                          <button
                            className="p-1 text-green-600 hover:text-green-900"
                            title="Export"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          className="p-1 text-gray-500 hover:text-gray-700"
                          title="More options"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">
                  {Math.min(10, filteredDrafts.length)}
                </span>{" "}
                of <span className="font-medium">{filteredDrafts.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
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
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-700 hover:bg-blue-100">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  8
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
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
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftListView;
