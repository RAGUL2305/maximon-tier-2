import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Filter,
  RefreshCw,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MemoryObjectList = () => {
  // Sample data for demonstration
  const [memoryObjects] = useState([
    {
      id: 1,
      filename: "Brand_Guidelines_2025.pdf",
      tags: ["Guidelines", "Brand Voice"],
      uploadedBy: "Sarah Kim",
      uploadDate: "2025-04-28",
      complianceStatus: "Compliant",
      driftStatus: "Normal",
    },
    {
      id: 2,
      filename: "Product_Messaging_Framework.docx",
      tags: ["Product", "Messaging"],
      uploadedBy: "David Chen",
      uploadDate: "2025-04-25",
      complianceStatus: "Non-compliant",
      driftStatus: "Normal",
    },
    {
      id: 3,
      filename: "Customer_Personas_Q2.pdf",
      tags: ["Personas", "Research"],
      uploadedBy: "Miguel Santos",
      uploadDate: "2025-04-20",
      complianceStatus: "Compliant",
      driftStatus: "Drifted",
    },
    {
      id: 4,
      filename: "Voice_and_Tone_Examples.txt",
      tags: ["Guidelines", "Examples"],
      uploadedBy: "Emma Wilson",
      uploadDate: "2025-04-15",
      complianceStatus: "Compliant",
      driftStatus: "Normal",
    },
    {
      id: 5,
      filename: "Marketing_Strategy_2025.pdf",
      tags: ["Strategy", "Planning"],
      uploadedBy: "James Taylor",
      uploadDate: "2025-04-10",
      complianceStatus: "Compliant",
      driftStatus: "Normal",
    },
    {
      id: 6,
      filename: "Competitor_Analysis_Q1.pptx",
      tags: ["Research", "Competitive"],
      uploadedBy: "Priya Patel",
      uploadDate: "2025-04-05",
      complianceStatus: "Non-compliant",
      driftStatus: "Drifted",
    },
    {
      id: 7,
      filename: "Brand_Voice_Training.pdf",
      tags: ["Training", "Brand Voice"],
      uploadedBy: "Sarah Kim",
      uploadDate: "2025-03-28",
      complianceStatus: "Compliant",
      driftStatus: "Normal",
    },
  ]);

  // States for filtering and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{
    tags: string[];
    complianceStatus: string;
    driftStatus: string;
  }>({
    tags: [],
    complianceStatus: "",
    driftStatus: "",
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof (typeof memoryObjects)[0];
    direction: "asc" | "desc";
  }>({
    key: "uploadDate",
    direction: "desc",
  });
  const [filteredObjects, setFilteredObjects] = useState<
    {
      id: number;
      filename: string;
      tags: string[];
      uploadedBy: string;
      uploadDate: string;
      complianceStatus: string;
      driftStatus: string;
    }[]
  >([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  // All possible tags from the data (for filter options)
  const allTags = [...new Set(memoryObjects.flatMap((obj) => obj.tags))];

  // Apply filters and search
  useEffect(() => {
    let result = [...memoryObjects];

    // Apply search
    if (searchTerm) {
      result = result.filter((obj) =>
        obj.filename.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply tag filter
    if (filters.tags.length > 0) {
      result = result.filter((obj) =>
        filters.tags.some((tag) => obj.tags.includes(tag))
      );
    }

    // Apply compliance status filter
    if (filters.complianceStatus) {
      result = result.filter(
        (obj) => obj.complianceStatus === filters.complianceStatus
      );
    }

    // Apply drift status filter
    if (filters.driftStatus) {
      result = result.filter((obj) => obj.driftStatus === filters.driftStatus);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredObjects(result);
  }, [memoryObjects, searchTerm, filters, sortConfig]);

  // Handle sort click
  const handleSort = (key: keyof (typeof memoryObjects)[0]) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle tag filter toggle
  const toggleTagFilter = (tag: string) => {
    if (filters.tags.includes(tag)) {
      setFilters({
        ...filters,
        tags: filters.tags.filter((t) => t !== tag),
      });
    } else {
      setFilters({
        ...filters,
        tags: [...filters.tags, tag],
      });
    }
  };

  // Render sort indicator
  const renderSortIndicator = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp className="inline w-4 h-4" />
      ) : (
        <ChevronDown className="inline w-4 h-4" />
      );
    }
    return null;
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Memory Object List
          </h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
            onClick={() => navigate("/dashboard/codex")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Upload New Codex
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by filename..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
              >
                <Filter size={16} className="mr-2" />
                Filters
                {isFilterOpen ? (
                  <ChevronUp size={16} className="ml-2" />
                ) : (
                  <ChevronDown size={16} className="ml-2" />
                )}
              </button>
            </div>
          </div>

          {/* Advanced Filters (collapsible) */}
          {isFilterOpen && (
            <div className="p-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTagFilter(tag)}
                        className={`px-3 py-1 rounded-full text-xs ${
                          filters.tags.includes(tag)
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compliance Status
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={filters.complianceStatus}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        complianceStatus: e.target.value,
                      })
                    }
                  >
                    <option value="">All</option>
                    <option value="Compliant">Compliant</option>
                    <option value="Non-compliant">Non-compliant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Drift Status
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={filters.driftStatus}
                    onChange={(e) =>
                      setFilters({ ...filters, driftStatus: e.target.value })
                    }
                  >
                    <option value="">All</option>
                    <option value="Normal">Normal</option>
                    <option value="Drifted">Drifted</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() =>
                    setFilters({
                      tags: [],
                      complianceStatus: "",
                      driftStatus: "",
                    })
                  }
                  className="text-blue-600 hover:text-blue-800 mr-4 flex items-center"
                >
                  <RefreshCw size={16} className="mr-1" />
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Memory Objects Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("filename")}
                >
                  Filename {renderSortIndicator("filename")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("uploadedBy")}
                >
                  Uploaded By {renderSortIndicator("uploadedBy")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("uploadDate")}
                >
                  Upload Date {renderSortIndicator("uploadDate")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compliance Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Drift Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredObjects.length > 0 ? (
                filteredObjects.map((object) => (
                  <tr
                    key={object.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate("/dashboard/memoryobjectdetails")}
                  >
                    <td className="px-6 py-4 text-blue-600 font-medium">
                      <div className="flex items-center">
                        <FileText size={16} className="mr-2 text-gray-500" />
                        {object.filename}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {object.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {object.uploadedBy}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {object.uploadDate}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          object.complianceStatus === "Compliant"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {object.complianceStatus === "Compliant" ? (
                          <CheckCircle size={12} className="mr-1" />
                        ) : (
                          <AlertTriangle size={12} className="mr-1" />
                        )}
                        {object.complianceStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          object.driftStatus === "Normal"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {object.driftStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-gray-500"
                  >
                    No memory objects found matching the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Results Statistics */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredObjects.length} of {memoryObjects.length} memory
          objects
        </div>
      </div>
    </div>
  );
};

export default MemoryObjectList;
