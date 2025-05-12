import { useState, useEffect, type SetStateAction } from "react";
import { Search, Edit2, Check, X, AlertTriangle } from "lucide-react";

const BrandLexiconView = () => {
  // Sample brand lexicon data - in a real implementation this would come from an API
  const [terms, setTerms] = useState([
    {
      id: 1,
      term: "Marketing OS",
      definition:
        "A comprehensive orchestration layer designed for marketing in the age of hybrid intelligence.",
      approvedUsage: true,
      notes:
        'Always capitalize OS. Preferred over "platform" when describing the full system.',
      complianceStatus: "compliant",
      context: "Foundational concept for all marketing communications.",
    },
    {
      id: 2,
      term: "Signal",
      definition:
        "Structured, scored output designed to perform in both human and machine environments.",
      approvedUsage: true,
      notes: 'Preferred over "content" when referring to any system output.',
      complianceStatus: "compliant",
      context: "Core concept across all modules.",
    },
    {
      id: 3,
      term: "Campaign",
      definition:
        "A coordinated series of marketing activities with defined goals.",
      approvedUsage: false,
      notes:
        'Deprecated term. Use "journey" instead to emphasize dynamic, responsive nature.',
      complianceStatus: "non-compliant",
      context: "Legacy concept being phased out.",
    },
    {
      id: 4,
      term: "Memory Loom",
      definition:
        "The semantic memory infrastructure that powers all other components in the Marketing OS ecosystem.",
      approvedUsage: true,
      notes:
        "Should be introduced early in any description of the system architecture.",
      complianceStatus: "compliant",
      context: "Core module for brand knowledge.",
    },
    {
      id: 5,
      term: "MESH Organization",
      definition:
        "Modular, Emergent, Semantic, Hybrid structure for marketing teams.",
      approvedUsage: true,
      notes:
        "Always capitalize all letters in MESH. Define acronym on first use.",
      complianceStatus: "warning",
      context: "Organizational model for implementation.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterApproved, setFilterApproved] = useState("all");
  const [filterCompliance, setFilterCompliance] = useState("all");
  const [filteredTerms, setFilteredTerms] = useState(terms);
  const [isEditing, setIsEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Admin role simulation - in real app would come from auth context
  const isAdmin = true;

  useEffect(() => {
    let result = terms;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (term) =>
          term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply approved usage filter
    if (filterApproved !== "all") {
      result = result.filter(
        (term) => term.approvedUsage === (filterApproved === "approved")
      );
    }

    // Apply compliance filter
    if (filterCompliance !== "all") {
      result = result.filter(
        (term) => term.complianceStatus === filterCompliance
      );
    }

    setFilteredTerms(result);
  }, [terms, searchTerm, filterApproved, filterCompliance]);

  const handleEdit = (term: SetStateAction<{}>) => {
    setIsEditing(term.id);
    setEditForm({ ...term });
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditForm({});
  };

  const handleSaveEdit = () => {
    setTerms(terms.map((term) => (term.id === editForm.id ? editForm : term)));
    setIsEditing(null);
    setEditForm({});
  };

  const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const getComplianceStatusBadge = (status: string) => {
    if (status === "compliant") {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
          Compliant
        </span>
      );
    } else if (status === "non-compliant") {
      return (
        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs font-medium">
          Non-Compliant
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs font-medium flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> Warning
        </span>
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Brand Lexicon View
        </h1>
        <p className="text-slate-600">
          Manage canonical vocabulary, tone, and phrasing for your brand
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search terms or definitions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div>
            <label
              htmlFor="approved-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Approved Usage
            </label>
            <select
              id="approved-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filterApproved}
              onChange={(e) => setFilterApproved(e.target.value)}
            >
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="not-approved">Not Approved</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="compliance-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Compliance
            </label>
            <select
              id="compliance-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filterCompliance}
              onChange={(e) => setFilterCompliance(e.target.value)}
            >
              <option value="all">All</option>
              <option value="compliant">Compliant</option>
              <option value="non-compliant">Non-Compliant</option>
              <option value="warning">Warning</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Term
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Definition
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Approved Usage
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Compliance
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Notes
              </th>
              {isAdmin && (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTerms.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 6 : 5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No terms found matching your search criteria.
                </td>
              </tr>
            ) : (
              filteredTerms.map((term) => (
                <tr key={term.id} className="hover:bg-gray-50">
                  {isEditing === term.id ? (
                    // Edit Mode
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="term"
                          value={editForm.term}
                          onChange={handleChange}
                          className="w-full p-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <textarea
                          name="definition"
                          value={editForm.definition}
                          onChange={handleChange}
                          className="w-full p-1 border border-gray-300 rounded"
                          rows="2"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          name="approvedUsage"
                          checked={editForm.approvedUsage}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <select
                          name="complianceStatus"
                          value={editForm.complianceStatus}
                          onChange={handleChange}
                          className="p-1 border border-gray-300 rounded"
                        >
                          <option value="compliant">Compliant</option>
                          <option value="non-compliant">Non-Compliant</option>
                          <option value="warning">Warning</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <textarea
                          name="notes"
                          value={editForm.notes}
                          onChange={handleChange}
                          className="w-full p-1 border border-gray-300 rounded"
                          rows="2"
                        />
                      </td>
                      <td className="px-6 py-4 flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="p-1 text-green-600 hover:text-green-900"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-1 text-red-600 hover:text-red-900"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </td>
                    </>
                  ) : (
                    // View Mode
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {term.term}
                        </div>
                        <div className="text-xs text-gray-500">
                          {term.context}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {term.definition}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${
                            term.approvedUsage
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {term.approvedUsage ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getComplianceStatusBadge(term.complianceStatus)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {term.notes}
                        </div>
                      </td>
                      {isAdmin && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(term)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrandLexiconView;
