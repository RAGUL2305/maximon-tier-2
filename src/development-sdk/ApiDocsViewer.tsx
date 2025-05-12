import React, { useState } from "react";

const ApiDocumentationViewer = () => {
  const [activeModule, setActiveModule] = useState("overview");
  const [expandedSection, setExpandedSection] = useState(null);

  const modules = [
    { id: "overview", name: "Overview" },
    { id: "signal-studio", name: "Signal Studio" },
    { id: "memory-loom", name: "Memory Loom" },
    { id: "signal-flow", name: "Signal Flow" },
    { id: "signal-core", name: "SignalCore" },
    { id: "signal-scope", name: "SignalScope" },
    { id: "sdk", name: "Developer SDK" },
  ];

  const apiEndpoints = {
    overview: [
      {
        title: "Marketing OS Overview",
        description:
          "The complete hybrid intelligence marketing system that transforms how marketing is executed by integrating AI, human oversight, and semantic memory.",
        sections: [
          {
            title: "Core Modules",
            content: [
              "Signal Studio (Content AI): Creates brand-aligned content at scale",
              "Memory Loom (Semantic Memory): Serves as the cognitive substrate for brand intelligence",
              "Signal Flow (Journey Orchestration AI): Designs and executes adaptive customer journeys",
              "SignalCore (Revenue AI): Transforms performance data into optimized decisions",
              "SignalScope (Marketing Intelligence AI): Monitors external perceptions and market signals",
            ],
          },
          {
            title: "Integration Architecture",
            content: [
              "Common Semantic Memory: Each product reads from and writes to Memory Loom",
              "Unified Governance Layer: Shared rules, permissions, and escalation logic",
              "Consistent Protocol Roles: The same human and AI roles exist across all products",
              "Signal as Common Currency: All products produce and consume structured signal objects",
              "8-Step Workflow Alignment: Each product supports stages of the unified workflow",
            ],
          },
        ],
      },
    ],
    "signal-studio": [
      {
        title: "Content Creation",
        endpoint: "/api/v1/signal-studio/drafts",
        method: "POST",
        description: "Create new content drafts with AI assistance",
        request:
          '{\n  "title": "string",\n  "prompt": "string",\n  "tone": "string",\n  "brandGuidelines": "boolean"\n}',
        response:
          '{\n  "draftId": "string",\n  "content": "string",\n  "toneScore": "number",\n  "status": "draft"\n}',
        sections: [
          {
            title: "Structured Draft Editor",
            content: [
              "AI-powered content creation interface",
              "Real-time tone scoring",
              "Brand voice guardrails",
              "Required parameters: title, prompt",
            ],
          },
        ],
      },
      {
        title: "Draft Validation",
        endpoint: "/api/v1/signal-studio/drafts/{draftId}/validate",
        method: "POST",
        description: "Validate draft content against brand guidelines",
        request: '{\n  "draftId": "string"\n}',
        response:
          '{\n  "isValid": "boolean",\n  "issues": ["array"],\n  "suggestions": ["array"]\n}',
        sections: [
          {
            title: "Signal Validator",
            content: [
              "QA with approval workflows",
              "Automatic compliance checking",
              "Brand alignment validation",
              "Returns validation status and improvement suggestions",
            ],
          },
        ],
      },
      {
        title: "Export Content",
        endpoint: "/api/v1/signal-studio/drafts/{draftId}/export",
        method: "POST",
        description: "Export approved content in various formats",
        request:
          '{\n  "draftId": "string",\n  "format": "string" // HTML, Markdown, JSON\n}',
        response:
          '{\n  "exportId": "string",\n  "content": "string",\n  "format": "string"\n}',
        sections: [
          {
            title: "Signal Export Hub",
            content: [
              "Multi-format content delivery",
              "Content optimization metadata",
              "Supports HTML, Markdown, and JSON formats",
              "Links to activation platforms",
            ],
          },
        ],
      },
    ],
    "memory-loom": [
      {
        title: "Upload Documents",
        endpoint: "/api/v1/memory-loom/codex",
        method: "POST",
        description: "Upload brand documents to build semantic memory",
        request:
          'multipart/form-data\n{\n  "file": "binary",\n  "title": "string",\n  "tags": ["array"]\n}',
        response: '{\n  "codexId": "string",\n  "status": "processing"\n}',
        sections: [
          {
            title: "Codex Uploader",
            content: [
              "Supports PDF, DOCX, TXT formats",
              "Auto-extracts semantic content",
              "Builds knowledge graph",
              "Maximum file size: 20MB",
            ],
          },
        ],
      },
      {
        title: "Query Memory",
        endpoint: "/api/v1/memory-loom/query",
        method: "POST",
        description: "Search semantic brand memory",
        request:
          '{\n  "query": "string",\n  "limit": "number",\n  "threshold": "number"\n}',
        response:
          '{\n  "results": [\n    {\n      "term": "string",\n      "definition": "string",\n      "confidence": "number",\n      "source": "string"\n    }\n  ]\n}',
        sections: [
          {
            title: "Semantic API",
            content: [
              "Natural language querying",
              "Vector similarity search",
              "Confidence scoring",
              "Source attribution",
            ],
          },
        ],
      },
      {
        title: "Brand Lexicon",
        endpoint: "/api/v1/memory-loom/lexicon",
        method: "GET",
        description: "Retrieve canonical brand vocabulary and tone",
        request: '{\n  "category": "string" // optional\n}',
        response:
          '{\n  "terms": [\n    {\n      "term": "string",\n      "usage": "string",\n      "approved": "boolean"\n    }\n  ]\n}',
        sections: [
          {
            title: "Brand Vocabulary System",
            content: [
              "Canonical terms dictionary",
              "Approved usage guidelines",
              "Tone and voice attributes",
              "Category filtering",
            ],
          },
        ],
      },
    ],
    "signal-flow": [
      {
        title: "Create Journey",
        endpoint: "/api/v1/signal-flow/journeys",
        method: "POST",
        description: "Create new customer journey",
        request:
          '{\n  "name": "string",\n  "description": "string",\n  "nodes": ["array"],\n  "connections": ["array"]\n}',
        response: '{\n  "journeyId": "string",\n  "status": "draft"\n}',
        sections: [
          {
            title: "Signal Builder",
            content: [
              "Graph-based journey construction",
              "Node and connection definitions",
              "Journey metadata",
              "Initial draft status",
            ],
          },
        ],
      },
      {
        title: "Configure Triggers",
        endpoint: "/api/v1/signal-flow/journeys/{journeyId}/triggers",
        method: "POST",
        description: "Define journey activation triggers",
        request:
          '{\n  "name": "string",\n  "type": "string",\n  "condition": "string",\n  "source": "string"\n}',
        response: '{\n  "triggerId": "string",\n  "status": "active"\n}',
        sections: [
          {
            title: "Trigger Configurator",
            content: [
              "Event source definition",
              "Conditional logic",
              "Trigger activation rules",
              "Source system integration",
            ],
          },
        ],
      },
      {
        title: "Journey Metrics",
        endpoint: "/api/v1/signal-flow/journeys/{journeyId}/metrics",
        method: "GET",
        description: "Retrieve journey performance data",
        request: '{\n  "timeframe": "string",\n  "metrics": ["array"]\n}',
        response:
          '{\n  "entries": "number",\n  "completions": "number",\n  "conversionRate": "number",\n  "pathPerformance": ["array"]\n}',
        sections: [
          {
            title: "Signal Monitor",
            content: [
              "Journey performance tracking",
              "Path analysis",
              "Conversion metrics",
              "Time-based filtering",
            ],
          },
        ],
      },
    ],
    "signal-core": [
      {
        title: "Ingest Signals",
        endpoint: "/api/v1/signal-core/intake",
        method: "POST",
        description: "Ingest performance signals for optimization",
        request:
          '{\n  "source": "string",\n  "signalType": "string",\n  "data": "object"\n}',
        response: '{\n  "signalId": "string",\n  "status": "received"\n}',
        sections: [
          {
            title: "Signal Intake Console",
            content: [
              "Multi-source signal collection",
              "Automatic data normalization",
              "Performance event logging",
              "Data validation",
            ],
          },
        ],
      },
      {
        title: "Map Growth Signal",
        endpoint: "/api/v1/signal-core/mapper",
        method: "POST",
        description: "Transform raw data into optimization objects",
        request: '{\n  "signalId": "string",\n  "mappingType": "string"\n}',
        response: '{\n  "mappedSignal": "object",\n  "score": "number"\n}',
        sections: [
          {
            title: "Growth Signal Mapper",
            content: [
              "Signal classification",
              "Structured transformation",
              "Revenue impact scoring",
              "Optimization opportunity tagging",
            ],
          },
        ],
      },
      {
        title: "Decision Engine",
        endpoint: "/api/v1/signal-core/decisions",
        method: "POST",
        description: "Generate optimization decisions",
        request:
          '{\n  "context": "object",\n  "options": ["array"],\n  "constraints": "object"\n}',
        response:
          '{\n  "decision": "string",\n  "confidence": "number",\n  "rationale": "string"\n}',
        sections: [
          {
            title: "Optimization Framework",
            content: [
              "Context-aware decision logic",
              "Multi-option evaluation",
              "Confidence scoring",
              "Constraint satisfaction",
            ],
          },
        ],
      },
    ],
    "signal-scope": [
      {
        title: "Collect External Signals",
        endpoint: "/api/v1/signal-scope/intake",
        method: "POST",
        description: "Collect signals from external sources",
        request:
          '{\n  "source": "string",\n  "signalType": "string",\n  "content": "string"\n}',
        response: '{\n  "signalId": "string",\n  "status": "received"\n}',
        sections: [
          {
            title: "Signal Intake Interface",
            content: [
              "Multi-channel signal collection",
              "Source classification",
              "Input normalization",
              "Initial signal routing",
            ],
          },
        ],
      },
      {
        title: "Score Perception",
        endpoint: "/api/v1/signal-scope/scoring",
        method: "POST",
        description: "Evaluate external signals against brand intent",
        request: '{\n  "signalId": "string"\n}',
        response:
          '{\n  "trust": "number",\n  "tone": "number",\n  "alignment": "number",\n  "overall": "number"\n}',
        sections: [
          {
            title: "Signal Scoring Engine",
            content: [
              "Multi-factor signal evaluation",
              "Trust calculation",
              "Tone analysis",
              "Brand alignment assessment",
            ],
          },
        ],
      },
      {
        title: "Route Insights",
        endpoint: "/api/v1/signal-scope/router",
        method: "POST",
        description: "Route validated signals to appropriate systems",
        request: '{\n  "signalId": "string",\n  "destination": "string"\n}',
        response: '{\n  "status": "routed",\n  "destination": "string"\n}',
        sections: [
          {
            title: "Insight Router",
            content: [
              "Intelligent signal routing",
              "Cross-module distribution",
              "Priority-based handling",
              "Destination validation",
            ],
          },
        ],
      },
    ],
    sdk: [
      {
        title: "Generate Signal",
        endpoint: "/api/v1/sdk/signals",
        method: "POST",
        description: "Generate a new signal object",
        request:
          '{\n  "type": "string",\n  "content": "object",\n  "metadata": "object"\n}',
        response: '{\n  "signalId": "string",\n  "signal": "object"\n}',
        sections: [
          {
            title: "Signal Object Interface",
            content: [
              "Standard signal generation",
              "Automatic schema validation",
              "Metadata enrichment",
              "Cross-module compatibility",
            ],
          },
        ],
      },
      {
        title: "Access Memory",
        endpoint: "/api/v1/sdk/memory",
        method: "POST",
        description: "Query semantic memory from any application",
        request: '{\n  "query": "string",\n  "context": "object"\n}',
        response: '{\n  "results": ["array"],\n  "confidence": "number"\n}',
        sections: [
          {
            title: "Semantic Memory Access",
            content: [
              "Cross-application memory queries",
              "Context-aware retrieval",
              "Confidence scoring",
              "Memory injection capability",
            ],
          },
        ],
      },
      {
        title: "Scan Drift",
        endpoint: "/api/v1/sdk/drift",
        method: "POST",
        description: "Detect drift in signals against brand memory",
        request: '{\n  "content": "string",\n  "baseline": "string"\n}',
        response: '{\n  "driftScore": "number",\n  "issues": ["array"]\n}',
        sections: [
          {
            title: "Drift Detection",
            content: [
              "Brand alignment checking",
              "Semantic drift scoring",
              "Issue identification",
              "Threshold notification",
            ],
          },
        ],
      },
    ],
  };

  const handleModuleChange = (moduleId) => {
    setActiveModule(moduleId);
    setExpandedSection(null);
  };

  const toggleSection = (index) => {
    if (expandedSection === index) {
      setExpandedSection(null);
    } else {
      setExpandedSection(index);
    }
  };

  const currentEndpoints = apiEndpoints[activeModule] || [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-800 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">Marketing OS API Documentation</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-gray-100 border-r overflow-y-auto p-4">
          <div className="font-medium text-gray-500 mb-2">Modules</div>
          <ul>
            {modules.map((module) => (
              <li key={module.id} className="mb-1">
                <button
                  onClick={() => handleModuleChange(module.id)}
                  className={`w-full text-left px-4 py-2 rounded transition-colors ${
                    activeModule === module.id
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {module.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {currentEndpoints.map((endpoint, index) => (
              <div
                key={index}
                className="mb-8 bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div
                  className="flex items-center justify-between p-4 bg-gray-50 border-b cursor-pointer"
                  onClick={() => toggleSection(index)}
                >
                  <div>
                    <h2 className="text-xl font-semibold">{endpoint.title}</h2>
                    {endpoint.endpoint && (
                      <div className="flex items-center mt-2">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-bold rounded mr-2 ${
                            endpoint.method === "GET"
                              ? "bg-green-100 text-green-800"
                              : endpoint.method === "POST"
                              ? "bg-blue-100 text-blue-800"
                              : endpoint.method === "PUT"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {endpoint.endpoint}
                        </code>
                      </div>
                    )}
                  </div>
                  <div className="text-gray-500">
                    {expandedSection === index ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    )}
                  </div>
                </div>

                {expandedSection === index && (
                  <div className="p-4">
                    <p className="text-gray-700 mb-4">{endpoint.description}</p>

                    {endpoint.request && (
                      <div className="mb-4">
                        <h3 className="font-medium text-gray-900 mb-2">
                          Request
                        </h3>
                        <pre className="bg-gray-800 text-green-300 p-3 rounded overflow-x-auto text-sm">
                          {endpoint.request}
                        </pre>
                      </div>
                    )}

                    {endpoint.response && (
                      <div className="mb-4">
                        <h3 className="font-medium text-gray-900 mb-2">
                          Response
                        </h3>
                        <pre className="bg-gray-800 text-blue-300 p-3 rounded overflow-x-auto text-sm">
                          {endpoint.response}
                        </pre>
                      </div>
                    )}

                    {endpoint.sections &&
                      endpoint.sections.map((section, sIdx) => (
                        <div key={sIdx} className="mt-6">
                          <h3 className="font-medium text-gray-900 mb-2">
                            {section.title}
                          </h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {section.content.map((item, iIdx) => (
                              <li key={iIdx} className="text-gray-700">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApiDocumentationViewer;
