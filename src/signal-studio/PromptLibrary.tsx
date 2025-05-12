import { useState } from "react";

function PromptLibrary() {
  const [prompts, setPrompts] = useState([
    {
      id: 1,
      title: "Product Launch Email",
      description: "Announcement email for new product launches",
      template:
        "Subject: Introducing [Product Name]: [Key Benefit]\n\nHello [Name],\n\nWe are excited to announce the launch of our newest [product/service]: [Product Name].\n\n[2-3 sentences about key features and benefits]\n\n[Call to action with link]\n\nBest regards,\n[Company Name] Team",
      tags: ["Email", "Announcement", "Sales"],
      lastUsed: "2025-04-28",
    },
    {
      id: 2,
      title: "Weekly Social Media Update",
      description: "Template for consistent weekly updates on social platforms",
      template:
        "📣 [Company] Weekly Update\n\n🔹 [News item 1]\n🔹 [News item 2]\n🔹 [News item 3]\n\n👉 [Call to action]\n\n#[BrandHashtag] #[IndustryHashtag]",
      tags: ["Social", "Casual", "Informative"],
      lastUsed: "2025-05-01",
    },
    {
      id: 3,
      title: "Technical Documentation Intro",
      description: "Beginning section for technical documentation",
      template:
        "# [Feature/Component] Documentation\n\n## Overview\n[1-2 sentences explaining what this is]\n\n## Prerequisites\n- [Requirement 1]\n- [Requirement 2]\n\n## Installation\n```\n[Installation commands]\n```\n\n## Basic Usage\n[Example code or usage instructions]",
      tags: ["Technical", "Informative", "Formal"],
      lastUsed: "2025-04-15",
    },
    {
      id: 4,
      title: "Customer Support Response",
      description: "Template for responding to customer inquiries",
      template:
        "Hello [Customer Name],\n\nThank you for reaching out to [Company] support.\n\n[Personalized response to their specific question/issue]\n\nIf you have any further questions, please don't hesitate to ask.\n\nBest regards,\n[Your Name]\n[Company] Support Team",
      tags: ["Email", "Formal", "Sales"],
      lastUsed: "2025-05-05",
    },
    {
      id: 5,
      title: "Blog Post Structure",
      description: "Framework for creating consistent blog content",
      template:
        "# [Attention-Grabbing Title]\n\n## Introduction\n[Hook to grab reader attention]\n[Brief overview of what the post will cover]\n\n## [Section 1 Heading]\n[Content for section 1]\n\n## [Section 2 Heading]\n[Content for section 2]\n\n## [Section 3 Heading]\n[Content for section 3]\n\n## Conclusion\n[Summary of key points]\n[Call to action]",
      tags: ["Blog", "Informative", "Persuasive"],
      lastUsed: "2025-04-22",
    },
  ]);

  const [filteredPrompts, setFilteredPrompts] = useState(prompts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [expandedPromptId, setExpandedPromptId] = useState(null);
  const [isAddingPrompt, setIsAddingPrompt] = useState(false);
  const [newPrompt, setNewPrompt] = useState({
    title: "",
    description: "",
    template: "",
    tags: [],
    tagInput: "",
    lastUsed: null,
  });

  const allTags = [
    "Email",
    "Social",
    "Blog",
    "Landing Page",
    "Sales",
    "Technical",
    "Formal",
    "Casual",
    "Persuasive",
    "Informative",
    "Announcement",
  ];

  useEffect(() => {
    let filtered = prompts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (prompt) =>
          prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prompt.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((prompt) =>
        selectedTags.every((tag) => prompt.tags.includes(tag))
      );
    }

    setFilteredPrompts(filtered);
  }, [searchTerm, selectedTags, prompts]);

  function handleTagToggle(tag) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function togglePromptExpansion(id) {
    setExpandedPromptId(expandedPromptId === id ? null : id);
  }

  function handleAddTag() {
    if (newPrompt.tagInput && !newPrompt.tags.includes(newPrompt.tagInput)) {
      setNewPrompt({
        ...newPrompt,
        tags: [...newPrompt.tags, newPrompt.tagInput],
        tagInput: "",
      });
    }
  }

  function handleRemoveTag(tag) {
    setNewPrompt({
      ...newPrompt,
      tags: newPrompt.tags.filter((t) => t !== tag),
    });
  }

  function handleSubmitPrompt() {
    if (newPrompt.title && newPrompt.template) {
      const currentDate = new Date().toISOString().split("T")[0];
      const newPromptItem = {
        id: prompts.length + 1,
        ...newPrompt,
        lastUsed: null,
        tagInput: undefined,
      };

      setPrompts([...prompts, newPromptItem]);
      setIsAddingPrompt(false);
      setNewPrompt({
        title: "",
        description: "",
        template: "",
        tags: [],
        tagInput: "",
        lastUsed: null,
      });
    }
  }

  function handleDeletePrompt(id) {
    setPrompts(prompts.filter((prompt) => prompt.id !== id));
  }

  function handleUsePrompt(id) {
    const currentDate = new Date().toISOString().split("T")[0];
    setPrompts(
      prompts.map((prompt) =>
        prompt.id === id ? { ...prompt, lastUsed: currentDate } : prompt
      )
    );

    // In a real application, this would navigate to Signal Studio Draft Editor
    // with this prompt template loaded
    alert("Prompt template loaded in editor");
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Prompt Library
          </h1>
          <button
            onClick={() => setIsAddingPrompt(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            <span>New Prompt</span>
          </button>
        </div>
        <p className="text-gray-600 mt-1">
          Standardized templates encoding brand voice
        </p>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-2.5 text-gray-400"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Filter by Tags</h3>
            <div className="space-y-1.5">
              {allTags.map((tag) => (
                <div
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer ${
                    selectedTags.includes(tag)
                      ? "bg-blue-100 text-blue-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={
                      selectedTags.includes(tag)
                        ? "text-blue-600"
                        : "text-gray-500"
                    }
                  >
                    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                    <path d="M7 7h.01" />
                  </svg>
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredPrompts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No prompts match your search criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <div
                    className="px-6 py-4 flex items-center justify-between cursor-pointer"
                    onClick={() => togglePromptExpansion(prompt.id)}
                  >
                    <div>
                      <h3 className="font-medium text-lg text-gray-800">
                        {prompt.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {prompt.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {prompt.lastUsed && (
                        <span className="text-xs text-gray-500">
                          Last used: {prompt.lastUsed}
                        </span>
                      )}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        {expandedPromptId === prompt.id ? (
                          <path d="m18 15-6-6-6 6" />
                        ) : (
                          <path d="m6 9 6 6 6-6" />
                        )}
                      </svg>
                    </div>
                  </div>

                  {expandedPromptId === prompt.id && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                      <div className="mb-4">
                        <div className="flex gap-2 mb-2 flex-wrap">
                          {prompt.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-md p-3 font-mono text-sm whitespace-pre-wrap text-gray-700 mb-4">
                        {prompt.template}
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleDeletePrompt(prompt.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                          </svg>
                        </button>
                        <button
                          onClick={() =>
                            alert("Edit functionality would open here")
                          }
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(prompt.template);
                            alert("Prompt template copied to clipboard");
                          }}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              width="14"
                              height="14"
                              x="8"
                              y="8"
                              rx="2"
                              ry="2"
                            />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleUsePrompt(prompt.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        >
                          Use Prompt
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Prompt Modal */}
      {isAddingPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Create New Prompt Template
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newPrompt.title}
                    onChange={(e) =>
                      setNewPrompt({ ...newPrompt, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter a descriptive title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newPrompt.description}
                    onChange={(e) =>
                      setNewPrompt({
                        ...newPrompt,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Brief description of when to use this prompt"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Template
                  </label>
                  <textarea
                    value={newPrompt.template}
                    onChange={(e) =>
                      setNewPrompt({ ...newPrompt, template: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    placeholder="Enter your prompt template with [placeholders] for variables"
                    rows={8}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {newPrompt.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full flex items-center gap-1"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="text-blue-800 hover:text-blue-900"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={newPrompt.tagInput}
                      onChange={(e) =>
                        setNewPrompt({ ...newPrompt, tagInput: e.target.value })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <button
                      onClick={handleAddTag}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-r-md"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-1">Quick add:</p>
                    <div className="flex gap-1 flex-wrap">
                      {allTags
                        .filter((tag) => !newPrompt.tags.includes(tag))
                        .slice(0, 5)
                        .map((tag) => (
                          <button
                            key={tag}
                            onClick={() =>
                              setNewPrompt({
                                ...newPrompt,
                                tags: [...newPrompt.tags, tag],
                              })
                            }
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsAddingPrompt(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitPrompt}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  disabled={!newPrompt.title || !newPrompt.template}
                >
                  Create Prompt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PromptLibrary;
