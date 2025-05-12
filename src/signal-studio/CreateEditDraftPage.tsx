import { useState, useEffect } from "react";
import {
  Clock,
  AlertCircle,
  Check,
  Save,
  X,
  Zap,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Version = {
  id: number;
  timestamp: string;
  user: string;
  summary: string;
};

const CreateEditDraftPage = () => {
  const [draftTitle, setDraftTitle] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [toneSelection, setToneSelection] = useState<string>("professional");
  const [aiOutput, setAiOutput] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [toneScore, setToneScore] = useState<number | null>(null);
  const [driftScore, setDriftScore] = useState<number | null>(null);
  const [brandGuidelines, setBrandGuidelines] = useState<string[]>([]);
  type GovernanceWarning = {
    severity: string;
    message: string;
  };

  const [governanceWarnings, setGovernanceWarnings] = useState<
    GovernanceWarning[]
  >([]);
  const [showMemoryDrawer, setShowMemoryDrawer] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [versions, setVersions] = useState<Version[]>([]);
  const navigate = useNavigate();

  // Mock brand guidelines data
  useEffect(() => {
    setBrandGuidelines([
      "Use a friendly but professional tone",
      "Avoid technical jargon when possible",
      "Focus on customer benefits rather than features",
      "Use inclusive language throughout all communications",
      "Keep sentences clear and concise",
    ]);

    // Mock version history
    setVersions([
      {
        id: 1,
        timestamp: "2025-05-09T14:30:00",
        user: "Sarah Thompson",
        summary: "Initial draft created",
      },
      {
        id: 2,
        timestamp: "2025-05-09T15:45:00",
        user: "Sarah Thompson",
        summary: "Updated introduction",
      },
    ]);
  }, []);

  const handleGenerate = () => {
    if (!draftTitle.trim() || !prompt.trim()) {
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      setAiOutput(
        `# ${draftTitle}\n\nWelcome to our innovative approach to content marketing.\n\n` +
          `As experts in the field, we understand the challenges you face when trying to create content that resonates with your audience. ` +
          `That's why we've developed a system that combines human creativity with AI precision.\n\n` +
          `Our platform offers several key benefits:\n\n` +
          `- Increased content production efficiency\n` +
          `- Consistent brand voice across all channels\n` +
          `- Real-time tone and compliance checking\n` +
          `- Seamless integration with your existing workflows\n\n` +
          `Let's explore how we can transform your content strategy together.`
      );

      // Simulate tone and drift scores
      setToneScore(87);
      setDriftScore(4);

      // Simulate governance checks
      setGovernanceWarnings([
        {
          severity: "low",
          message:
            "Consider simplifying the technical description in paragraph 2",
        },
      ]);

      setIsGenerating(false);
    }, 2000);
  };

  const handleSaveDraft = () => {
    // In a real implementation, this would save to backend
    alert("Draft saved successfully!");
    navigate("/dashboard/studio/listview");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Create New Draft
          </h1>
          <div className="space-x-2">
            <button
              onClick={() => setShowMemoryDrawer(!showMemoryDrawer)}
              className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              <BookOpen className="w-4 h-4 inline-block mr-1" /> Memory Drawer
            </button>
            <button
              onClick={() => setShowVersionHistory(!showVersionHistory)}
              className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              <Clock className="w-4 h-4 inline-block mr-1" /> Version History
            </button>
            <button
              onClick={handleSaveDraft}
              disabled={!aiOutput}
              className={`px-4 py-2 text-sm text-white rounded-md shadow-sm ${
                aiOutput
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-300 cursor-not-allowed"
              }`}
            >
              <Save className="w-4 h-4 inline-block mr-1" /> Save Draft
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Draft title */}
              <div>
                <label
                  htmlFor="draft-title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Draft Title
                </label>
                <input
                  type="text"
                  id="draft-title"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a descriptive title"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Required: 3-100 characters
                </p>
              </div>

              {/* Tone selection */}
              <div>
                <label
                  htmlFor="tone-selection"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tone Selection
                </label>
                <select
                  id="tone-selection"
                  value={toneSelection}
                  onChange={(e) => setToneSelection(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Friendly</option>
                  <option value="authoritative">Authoritative</option>
                  <option value="empathetic">Empathetic</option>
                </select>
              </div>

              {/* Prompt input */}
              <div>
                <label
                  htmlFor="prompt-input"
                  className="block text-sm font-medium text-gray-700"
                >
                  Prompt Input
                </label>
                <textarea
                  id="prompt-input"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={5}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe what you want the AI to generate"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Required: at least 10 characters
                </p>
              </div>

              {/* Brand guidelines preview */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Brand Guidelines Preview
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {brandGuidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Generate button */}
              <div className="text-center">
                <button
                  onClick={handleGenerate}
                  disabled={
                    isGenerating || !draftTitle.trim() || !prompt.trim()
                  }
                  className={`px-6 py-3 text-white rounded-md shadow-sm ${
                    isGenerating || !draftTitle.trim() || !prompt.trim()
                      ? "bg-indigo-300 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 inline-block mr-1" /> Generate
                    </>
                  )}
                </button>
              </div>

              {/* AI Output Editor */}
              {aiOutput && (
                <div className="border border-gray-300 rounded-md shadow-sm bg-white">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300 bg-gray-50">
                    <div className="text-sm font-medium text-gray-700">
                      AI Output Editor
                    </div>
                    <div className="flex space-x-4">
                      {toneScore !== null && (
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 mr-1">
                            Tone Score:
                          </span>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              toneScore >= 80
                                ? "bg-green-100 text-green-800"
                                : toneScore >= 60
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {toneScore}
                          </span>
                        </div>
                      )}
                      {driftScore !== null && (
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 mr-1">
                            Drift Score:
                          </span>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              driftScore <= 5
                                ? "bg-green-100 text-green-800"
                                : driftScore <= 15
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {driftScore}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <textarea
                    value={aiOutput}
                    onChange={(e) => setAiOutput(e.target.value)}
                    rows={12}
                    className="block w-full border-0 p-4 focus:ring-0 focus:outline-none"
                  />
                </div>
              )}

              {/* Governance Checklist */}
              {governanceWarnings.length > 0 && (
                <div className="border border-yellow-300 bg-yellow-50 rounded-md p-4">
                  <h3 className="text-sm font-medium text-yellow-800 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" /> Governance
                    Checklist
                  </h3>
                  <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                    {governanceWarnings.map((warning, index) => (
                      <li key={index} className="flex items-start">
                        <span
                          className={`inline-block w-2 h-2 rounded-full mt-1 mr-2 ${
                            warning.severity === "high"
                              ? "bg-red-500"
                              : warning.severity === "medium"
                              ? "bg-yellow-500"
                              : "bg-yellow-300"
                          }`}
                        ></span>
                        <span>{warning.message}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Memory Drawer */}
          {showMemoryDrawer && (
            <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Memory Drawer
                </h3>
                <button
                  onClick={() => setShowMemoryDrawer(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Brand Terms
                  </h4>
                  <div className="space-y-2">
                    {[
                      "Marketing OS",
                      "Signal Studio",
                      "Memory Loom",
                      "Signal Flow",
                      "Signal Core",
                    ].map((term, index) => (
                      <div
                        key={index}
                        className="p-2 bg-blue-50 border border-blue-100 rounded-md text-sm text-blue-700 cursor-pointer hover:bg-blue-100"
                      >
                        {term}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Suggested Snippets
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                      Transform your marketing with AI-powered content creation
                    </div>
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                      Maintain brand consistency across all channels
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Version History */}
          {showVersionHistory && (
            <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Version History
                </h3>
                <button
                  onClick={() => setShowVersionHistory(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                {versions.map((version) => (
                  <div
                    key={version.id}
                    className="p-3 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-700">
                        Version {version.id}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(version.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {version.user}
                    </div>
                    <div className="text-sm text-gray-700 mt-2">
                      {version.summary}
                    </div>
                    <div className="mt-2">
                      <button className="text-xs text-blue-600 hover:text-blue-800">
                        Restore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEditDraftPage;
