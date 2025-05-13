import { AlertTriangle, Check, FileText, Tag, Upload, X } from "lucide-react";
import { useState } from "react";

const CodexUploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [uploadStatus, setUploadStatus] = useState<
    "error" | "uploading" | "success" | null
  >(null);
  const [showModal, setShowModal] = useState(false);

  // Example tag options
  const tagOptions = [
    "Brand Guidelines",
    "Product Info",
    "Messaging",
    "Tone",
    "Legal",
    "Values",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const selectedFile = files[0];
      if (selectedFile.size <= 20 * 1024 * 1024) {
        // 20MB max
        setFile(selectedFile);
        // Auto-suggest title based on filename
        const fileName = selectedFile.name.split(".")[0];
        setTitle(fileName);
      } else {
        alert("File size exceeds 20MB limit.");
      }
    }
  };

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const selectTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!file || !title) {
      setUploadStatus("error");
      return;
    }

    // Simulate upload process
    setUploadStatus("uploading");
    setTimeout(() => {
      setUploadStatus("success");
      setShowModal(true);
    }, 2000);
  };

  const closeModal = () => {
    setShowModal(false);
    // Reset form after successful upload
    if (uploadStatus === "success") {
      setFile(null);
      setTitle("");
      setTags([]);
      setUploadStatus(null);
    }
  };

  // Governance compliance check (Tier 2 feature)
  const governanceChecks = [
    { name: "Brand Voice", status: "pass" },
    { name: "Legal Compliance", status: "pass" },
    { name: "Formatting", status: "warning" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Memory Loom — Codex Upload
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Upload brand documents to build your semantic memory layer
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Upload
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 ${
                  file ? "border-blue-400 bg-blue-50" : "border-gray-300"
                }`}
              >
                {!file ? (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        PDF, DOCX, or TXT up to 20MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-blue-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {Math.round(file.size / 1024)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setFile(null)}
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Title Input */}
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Codex Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a descriptive title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <p className="mt-1 text-xs text-gray-500">3-100 characters</p>
            </div>

            {/* Tags Input */}
            <div className="mb-6">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tags
              </label>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  id="tags"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add a tag"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-700 rounded-r-md hover:bg-gray-100"
                >
                  Add
                </button>
              </div>

              {/* Tag suggestions */}
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Suggested tags:</p>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => selectTag(tag)}
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs 
                        ${
                          tags.includes(tag)
                            ? "bg-blue-100 text-blue-800 cursor-not-allowed opacity-50"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      disabled={tags.includes(tag)}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Governance Checklist (Tier 2 feature) */}
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Pre-Upload Compliance Check
              </h3>
              <ul className="space-y-2">
                {governanceChecks.map((check, index) => (
                  <li key={index} className="flex items-center">
                    {check.status === "pass" ? (
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                    ) : check.status === "warning" ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span
                      className={`text-sm ${
                        check.status === "pass"
                          ? "text-green-700"
                          : check.status === "warning"
                          ? "text-yellow-700"
                          : "text-red-700"
                      }`}
                    >
                      {check.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm 
                  ${
                    uploadStatus === "uploading"
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                disabled={uploadStatus === "uploading"}
              >
                {uploadStatus === "uploading" ? "Uploading..." : "Upload Codex"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Status Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="text-center">
              {uploadStatus === "success" ? (
                <>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    Upload Successful
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Your document has been uploaded and is being processed. The
                    semantic memory layer will be updated shortly.
                  </p>
                </>
              ) : (
                <>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <X className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    Upload Failed
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    There was an error uploading your document. Please ensure
                    you've provided all required information and try again.
                  </p>
                </>
              )}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  {uploadStatus === "success" ? "Continue" : "Try Again"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodexUploadPage;
