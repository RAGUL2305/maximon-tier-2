import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Filter,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";

const DriftScannerView = () => {
  const [loading, setLoading] = useState(true);
  const [driftAlerts, setDriftAlerts] = useState([]);
  const [driftOverview, setDriftOverview] = useState({
    filesDrifted: 12,
    avgDriftScore: 34.8,
    highRiskFiles: 3,
    lastScanned: "2025-05-09T16:45:23",
  });
  const [filterRange, setFilterRange] = useState([0, 100]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [sortBy, setSortBy] = useState("driftScore");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setDriftAlerts([
        {
          id: 1,
          filename: "Brand Guidelines 2025.pdf",
          driftScore: 76,
          lastChecked: "2025-05-09T10:23:45",
          status: "critical",
          driftAreas: ["Tone", "Product Messaging", "Brand Voice"],
          details:
            "Significant drift detected in brand voice sections. Product messaging is inconsistent with current positioning.",
        },
        {
          id: 2,
          filename: "Customer Journey Playbook.docx",
          driftScore: 45,
          lastChecked: "2025-05-08T14:30:22",
          status: "warning",
          driftAreas: ["Terminology", "Value Proposition"],
          details:
            "Value proposition terminology shows moderate deviation from approved brand lexicon.",
        },
        {
          id: 3,
          filename: "Product Feature Matrix Q2.xlsx",
          driftScore: 62,
          lastChecked: "2025-05-09T09:15:10",
          status: "warning",
          driftAreas: ["Feature Description", "Technical Terms"],
          details:
            "Technical terminology drifting from established definitions. Feature descriptions inconsistent with Memory Loom reference.",
        },
        {
          id: 4,
          filename: "Company Overview 2025.pptx",
          driftScore: 23,
          lastChecked: "2025-05-07T11:20:40",
          status: "normal",
          driftAreas: ["Corporate Mission"],
          details:
            "Minor drift detected in mission statement phrasing. Within acceptable threshold.",
        },
        {
          id: 5,
          filename: "Marketing Campaign Brief Q3.pdf",
          driftScore: 18,
          lastChecked: "2025-05-08T16:45:33",
          status: "normal",
          driftAreas: ["Campaign Taglines"],
          details:
            "Slight variation in tagline formatting, but messaging remains aligned with brand voice.",
        },
        {
          id: 6,
          filename: "Social Media Guidelines.docx",
          driftScore: 81,
          lastChecked: "2025-05-09T08:30:15",
          status: "critical",
          driftAreas: [
            "Platform Voice",
            "Visual Guidelines",
            "Audience Targeting",
          ],
          details:
            "Significant drift in platform voice and visual guidelines. Document requires immediate review to align with current brand standards.",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const getStatusBadge = (status) => {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
          status
        )}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("desc");
    }
  };

  const sortedAlerts = [...driftAlerts]
    .sort((a, b) => {
      if (sortBy === "driftScore") {
        return sortDirection === "asc"
          ? a.driftScore - b.driftScore
          : b.driftScore - a.driftScore;
      } else if (sortBy === "filename") {
        return sortDirection === "asc"
          ? a.filename.localeCompare(b.filename)
          : b.filename.localeCompare(a.filename);
      } else if (sortBy === "lastChecked") {
        return sortDirection === "asc"
          ? new Date(a.lastChecked) - new Date(b.lastChecked)
          : new Date(b.lastChecked) - new Date(a.lastChecked);
      }
      return 0;
    })
    .filter((alert) => {
      return (
        alert.driftScore >= filterRange[0] && alert.driftScore <= filterRange[1]
      );
    });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value);
    const [min, max] = filterRange;
    if (e.target.id === "min-range") {
      setFilterRange([value, max]);
    } else {
      setFilterRange([min, value]);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Drift Scanner View</h1>
        <button
          className="flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
          onClick={handleRefresh}
        >
          <RefreshCw
            size={16}
            className={`mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="text-sm text-indigo-600 mb-1">Files Drifted</div>
          <div className="text-2xl font-semibold">
            {driftOverview.filesDrifted}
          </div>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg">
          <div className="text-sm text-amber-600 mb-1">Avg. Drift Score</div>
          <div className="text-2xl font-semibold">
            {driftOverview.avgDriftScore}
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-sm text-red-600 mb-1">High Risk Files</div>
          <div className="text-2xl font-semibold">
            {driftOverview.highRiskFiles}
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-blue-600 mb-1">Last Scanned</div>
          <div className="text-md font-semibold">
            {formatDate(driftOverview.lastScanned)}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex items-center mb-2">
          <Filter size={16} className="mr-2 text-gray-500" />
          <h3 className="font-medium">Drift Score Filter</h3>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:w-2/3">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Min: {filterRange[0]}</span>
              <span>Max: {filterRange[1]}</span>
            </div>
            <div className="flex gap-4">
              <input
                id="min-range"
                type="range"
                min="0"
                max="100"
                value={filterRange[0]}
                onChange={handleRangeChange}
                className="w-full"
              />
              <input
                id="max-range"
                type="range"
                min="0"
                max="100"
                value={filterRange[1]}
                onChange={handleRangeChange}
                className="w-full"
              />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <button
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => setFilterRange([0, 100])}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Drift Log Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center"
                  onClick={() => handleSort("filename")}
                >
                  Filename
                  {sortBy === "filename" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center"
                  onClick={() => handleSort("driftScore")}
                >
                  Drift Score
                  {sortBy === "driftScore" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  className="flex items-center"
                  onClick={() => handleSort("lastChecked")}
                >
                  Last Checked
                  {sortBy === "lastChecked" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </button>
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                  Loading drift data...
                </td>
              </tr>
            ) : sortedAlerts.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                  No drift alerts match your filter criteria.
                </td>
              </tr>
            ) : (
              sortedAlerts.map((alert) => (
                <React.Fragment key={alert.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {alert.filename}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className={`h-2.5 rounded-full ${
                              alert.driftScore > 70
                                ? "bg-red-500"
                                : alert.driftScore > 40
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{ width: `${alert.driftScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{alert.driftScore}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(alert.status)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {formatDate(alert.lastChecked)}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-right">
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        onClick={() => toggleExpand(alert.id)}
                      >
                        {expandedItem === alert.id
                          ? "Collapse"
                          : "View Details"}
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Analyze
                      </button>
                    </td>
                  </tr>
                  {expandedItem === alert.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="5" className="py-3 px-4">
                        <div className="text-sm">
                          <div className="mb-2">
                            <span className="font-medium">Drift Areas: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {alert.driftAreas.map((area, idx) => (
                                <span
                                  key={idx}
                                  className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                                >
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="mb-2">
                            <span className="font-medium">Details: </span>
                            <p className="mt-1 text-gray-600">
                              {alert.details}
                            </p>
                          </div>
                          <div className="flex justify-end mt-2">
                            <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm flex items-center hover:bg-blue-100">
                              View in Memory Object{" "}
                              <ArrowRight size={14} className="ml-1" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Admin Controls (visible only to admins) */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-3 flex items-center">
          <AlertTriangle size={16} className="mr-2 text-amber-500" />
          Admin Settings: Drift Thresholds
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Warning Threshold
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              defaultValue={40}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Critical Threshold
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              defaultValue={70}
            />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
              Save Thresholds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriftScannerView;
