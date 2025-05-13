import { useState, type KeyboardEvent, type ChangeEvent } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";

// Define TypeScript interfaces for our data structures
interface Snippet {
  id: number;
  title: string;
  content: string;
  usage: number;
  tags: string[];
  lastUsed: string;
  compliance: "compliant" | "warning" | "violation";
}

interface EditingSnippet extends Snippet {
  newTags: string;
}

interface NewSnippet {
  title: string;
  content: string;
  tags: string[];
}

const SnippetManager = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([
    {
      id: 1,
      title: "Brand Promise",
      content:
        "We deliver exceptional experiences that transform how people connect with technology.",
      usage: 15,
      tags: ["brand", "core"],
      lastUsed: "2025-05-01",
      compliance: "compliant",
    },
    {
      id: 2,
      title: "Product Benefit",
      content:
        "Our solution empowers teams to work smarter, not harder, with AI-powered insights.",
      usage: 8,
      tags: ["product", "benefits"],
      lastUsed: "2025-05-05",
      compliance: "compliant",
    },
    {
      id: 3,
      title: "Legal Disclaimer",
      content:
        "Results may vary based on implementation. Please consult with your system administrator.",
      usage: 12,
      tags: ["legal", "disclaimer"],
      lastUsed: "2025-05-02",
      compliance: "warning",
    },
    {
      id: 4,
      title: "Call to Action",
      content: "Start your free trial today and experience the difference.",
      usage: 22,
      tags: ["marketing", "conversion"],
      lastUsed: "2025-05-07",
      compliance: "compliant",
    },
    {
      id: 5,
      title: "Customer Support",
      content:
        "Our dedicated team is available 24/7 to assist with any questions you may have.",
      usage: 9,
      tags: ["support", "service"],
      lastUsed: "2025-04-30",
      compliance: "compliant",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [editingSnippet, setEditingSnippet] = useState<EditingSnippet | null>(
    null
  );
  const [newSnippet, setNewSnippet] = useState<NewSnippet>({
    title: "",
    content: "",
    tags: [],
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newTag, setNewTag] = useState<string>("");
  const [complianceFilter, setComplianceFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("usage");

  // All available tags
  const allTags = [
    ...new Set(snippets.flatMap((snippet) => snippet.tags)),
  ].sort();

  // Handle search
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Edit snippet
  const startEditing = (snippet: Snippet) => {
    setEditingSnippet({ ...snippet, newTags: snippet.tags.join(", ") });
  };

  // Save edited snippet
  const saveEditedSnippet = () => {
    if (!editingSnippet) return;

    const tags = editingSnippet.newTags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    // Create a new snippet without the newTags property
    const updatedSnippet: Snippet = {
      id: editingSnippet.id,
      title: editingSnippet.title,
      content: editingSnippet.content,
      usage: editingSnippet.usage,
      tags: tags,
      lastUsed: editingSnippet.lastUsed,
      compliance: editingSnippet.compliance,
    };

    setSnippets(
      snippets.map((s) => (s.id === updatedSnippet.id ? updatedSnippet : s))
    );
    setEditingSnippet(null);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingSnippet(null);
  };

  // Delete snippet
  const deleteSnippet = (id: number) => {
    setSnippets(snippets.filter((s) => s.id !== id));
    if (editingSnippet && editingSnippet.id === id) {
      setEditingSnippet(null);
    }
  };

  // Start creating new snippet
  const startCreatingSnippet = () => {
    setIsCreating(true);
  };

  // Add new tag to the creating snippet
  const addTagToNewSnippet = () => {
    if (newTag && !newSnippet.tags.includes(newTag)) {
      setNewSnippet({ ...newSnippet, tags: [...newSnippet.tags, newTag] });
      setNewTag("");
    }
  };

  // Remove tag from new snippet
  const removeTagFromNewSnippet = (tagToRemove: string) => {
    setNewSnippet({
      ...newSnippet,
      tags: newSnippet.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  // Save new snippet
  const saveNewSnippet = () => {
    if (newSnippet.title && newSnippet.content) {
      const snippet: Snippet = {
        id:
          snippets.length > 0 ? Math.max(...snippets.map((s) => s.id)) + 1 : 1,
        title: newSnippet.title,
        content: newSnippet.content,
        tags: newSnippet.tags,
        usage: 0,
        lastUsed: new Date().toISOString().split("T")[0],
        compliance: "compliant",
      };

      setSnippets([...snippets, snippet]);
      setNewSnippet({ title: "", content: "", tags: [] });
      setIsCreating(false);
    }
  };

  // Cancel creating
  const cancelCreating = () => {
    setNewSnippet({ title: "", content: "", tags: [] });
    setIsCreating(false);
  };

  // Filter snippets based on search, tags, and compliance
  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      searchTerm === "" ||
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => snippet.tags.includes(tag));

    const matchesCompliance =
      complianceFilter === "all" || snippet.compliance === complianceFilter;

    return matchesSearch && matchesTags && matchesCompliance;
  });

  // Sort snippets
  const sortedSnippets = [...filteredSnippets].sort((a, b) => {
    if (sortOption === "usage") {
      return b.usage - a.usage;
    } else if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "date") {
      return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
    }
    return 0;
  });

  // Copy to clipboard
  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    // Update the snippet usage count
    const snippet = snippets.find((s) => s.content === content);
    if (!snippet) return;

    setSnippets(
      snippets.map((s) => {
        if (s.id === snippet.id) {
          return {
            ...s,
            usage: s.usage + 1,
            lastUsed: new Date().toISOString().split("T")[0],
          };
        }
        return s;
      })
    );
  };

  // Handle key press for adding tags
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTagToNewSnippet();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Snippet Manager</h1>
        <button
          onClick={startCreatingSnippet}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          disabled={isCreating}
        >
          <Plus size={18} className="mr-2" />
          New Snippet
        </button>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search snippets..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          <div className="flex gap-3">
            <select
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={complianceFilter}
              onChange={(e) => setComplianceFilter(e.target.value)}
            >
              <option value="all">All Compliance</option>
              <option value="compliant">Compliant</option>
              <option value="warning">Warning</option>
              <option value="violation">Violation</option>
            </select>

            <select
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="usage">Sort by Usage</option>
              <option value="title">Sort by Title</option>
              <option value="date">Sort by Last Used</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagSelect(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTags.includes(tag)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Create New Snippet Form */}
      {isCreating && (
        <div className="mb-8 p-6 border border-blue-200 rounded-lg bg-blue-50">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Create New Snippet
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={newSnippet.title}
                onChange={(e) =>
                  setNewSnippet({ ...newSnippet, title: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter snippet title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                value={newSnippet.content}
                onChange={(e) =>
                  setNewSnippet({ ...newSnippet, content: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
                placeholder="Enter snippet content"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newSnippet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      onClick={() => removeTagFromNewSnippet(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a tag"
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={addTagToNewSnippet}
                  className="bg-gray-200 px-3 py-2 rounded-r-md hover:bg-gray-300"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={cancelCreating}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveNewSnippet}
                disabled={!newSnippet.title || !newSnippet.content}
                className={`px-4 py-2 rounded-md text-white ${
                  !newSnippet.title || !newSnippet.content
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Save Snippet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snippets List */}
      <div className="space-y-4">
        {sortedSnippets.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No snippets found. Try adjusting your filters or create a new
            snippet.
          </div>
        ) : (
          sortedSnippets.map((snippet) => (
            <div key={snippet.id} className="border rounded-lg overflow-hidden">
              {/* Snippet Header */}
              <div
                className={`px-6 py-4 flex justify-between items-center ${
                  snippet.compliance === "warning"
                    ? "bg-yellow-50 border-b border-yellow-200"
                    : snippet.compliance === "violation"
                    ? "bg-red-50 border-b border-red-200"
                    : "bg-gray-50 border-b"
                }`}
              >
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">
                    {snippet.title}
                  </span>
                  {snippet.compliance === "warning" && (
                    <div className="ml-2 text-yellow-600 flex items-center">
                      <AlertTriangle size={16} />
                      <span className="ml-1 text-xs">Warning</span>
                    </div>
                  )}
                  {snippet.compliance === "violation" && (
                    <div className="ml-2 text-red-600 flex items-center">
                      <AlertTriangle size={16} />
                      <span className="ml-1 text-xs">Violation</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {editingSnippet && editingSnippet.id === snippet.id ? (
                    <>
                      <button
                        onClick={saveEditedSnippet}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(snippet)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteSnippet(snippet.id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Snippet Content */}
              <div className="px-6 py-4">
                {editingSnippet && editingSnippet.id === snippet.id ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editingSnippet.title}
                        onChange={(e) =>
                          setEditingSnippet({
                            ...editingSnippet,
                            title: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <textarea
                        value={editingSnippet.content}
                        onChange={(e) =>
                          setEditingSnippet({
                            ...editingSnippet,
                            content: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={editingSnippet.newTags}
                        onChange={(e) =>
                          setEditingSnippet({
                            ...editingSnippet,
                            newTags: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-800 mb-4">{snippet.content}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {snippet.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">
                          Used {snippet.usage} times
                        </div>
                        <button
                          onClick={() => copyToClipboard(snippet.content)}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SnippetManager;