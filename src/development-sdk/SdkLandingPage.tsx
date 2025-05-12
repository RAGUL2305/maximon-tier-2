import React, { useState } from "react";

const SDKLandingPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const modules = [
    {
      id: "signal-studio",
      name: "Signal Studio",
      description: "Content AI for brand-aligned creation",
      features: [
        "Structured Draft Editor",
        "Brand Voice Governance",
        "Signal Validator",
      ],
    },
    {
      id: "memory-loom",
      name: "Memory Loom",
      description: "Semantic Memory for brand intelligence",
      features: ["Vector DB Layer", "Brand Lexicon", "Memory Access API"],
    },
    {
      id: "signal-flow",
      name: "Signal Flow",
      description: "Journey Orchestration AI",
      features: [
        "Signal Builder",
        "Trigger Configurator",
        "Orchestration Engine",
      ],
    },
    {
      id: "signalcore",
      name: "SignalCore",
      description: "Revenue Intelligence Engine",
      features: [
        "Signal Intake Console",
        "Growth Signal Mapper",
        "Decision Engine",
      ],
    },
    {
      id: "signalscope",
      name: "SignalScope",
      description: "Marketing Intelligence Engine",
      features: [
        "Signal Intake Interface",
        "Signal Scoring Engine",
        "Insight Router",
      ],
    },
  ];

  const tiers = [
    {
      id: "tier1",
      name: "Tier 1: Baseline Foundational",
      description: "Essential components required for basic functionality",
      features: [
        "Core API Interfaces",
        "Signal Object Schema",
        "Authentication & Access Control",
        "Basic Documentation",
        "Error Handling Framework",
      ],
    },
    {
      id: "tier2",
      name: "Tier 2: Advanced",
      description: "Enhanced capabilities for greater efficiency",
      features: [
        "Client Libraries",
        "Webhooks System",
        "CLI Tools",
        "Custom Schema Extensions",
        "Governance Integration",
        "Sandbox Environment",
      ],
    },
    {
      id: "tier3",
      name: "Tier 3: Full Easy Button",
      description: "Complete automation for maximum impact",
      features: [
        "React Component Library",
        "Drift Detection Hooks",
        "Workflow Templates",
        "Memory Query Builder",
        "Custom Agent Framework",
        "Analytics Dashboard Components",
      ],
    },
  ];

  const codeExample = `// Connect to Marketing OS
// Standard fetch approach - no external library needed
const API_KEY = 'your_api_key';
const BASE_URL = 'https://api.marketingos.example.com/v1';

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json'
    }
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  const response = await fetch(\`\${BASE_URL}/\${endpoint}\`, options);
  
  if (!response.ok) {
    throw new Error(\`API error: \${response.status}\`);
  }
  
  return response.json();
};

// Create a signal using Signal Studio
const createContent = async () => {
  const signal = await apiCall('signal-studio/signals', 'POST', {
    title: 'Summer Campaign',
    prompt: 'Promotional message for summer sale',
    tone: 'friendly'
  });
  
  // Validate the signal against brand guidelines
  const validationResult = await apiCall(\`signal-studio/validate/\${signal.id}\`, 'GET');
  
  if (validationResult.isValid) {
    // Export the signal to your channels
    await apiCall(\`signal-studio/signals/\${signal.id}/export\`, 'POST', {
      channels: ['email', 'web']
    });
  }
};

// Query Memory Loom for brand knowledge
const getBrandKnowledge = async (query) => {
  const results = await apiCall('memory-loom/query', 'POST', { query });
  return results;
};

// Create a customer journey in Signal Flow
const createJourney = async () => {
  const journey = await apiCall('signal-flow/journeys', 'POST', {
    name: 'New Customer Onboarding',
    triggers: ['user_signup'],
    nodes: [
      {
        type: 'action',
        name: 'Send Welcome Email',
        content: { signalId: 'welcome-email-signal-id' }
      },
      {
        type: 'condition',
        name: 'Check First Purchase',
        paths: [
          { condition: 'made_purchase', targetNode: 'thank-you' },
          { condition: 'default', targetNode: 'reminder' }
        ]
      }
    ]
  });
  
  return journey;
};`;

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            Marketing OS Developer SDK
          </h1>
          <p className="text-xl">
            The extensibility layer for the AI-native Marketing OS platform
          </p>
        </div>
      </header>

      <nav className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-6 py-3">
          <ul className="flex space-x-8">
            <li>
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-2 ${
                  activeTab === "overview"
                    ? "font-bold text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600"
                }`}
              >
                Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("modules")}
                className={`py-2 ${
                  activeTab === "modules"
                    ? "font-bold text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600"
                }`}
              >
                Modules
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("implementation")}
                className={`py-2 ${
                  activeTab === "implementation"
                    ? "font-bold text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600"
                }`}
              >
                Implementation
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("code")}
                className={`py-2 ${
                  activeTab === "code"
                    ? "font-bold text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600"
                }`}
              >
                Code Examples
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {activeTab === "overview" && (
          <div>
            <div className="max-w-3xl mb-10">
              <h2 className="text-2xl font-bold mb-4">
                Integrate, Customize, and Extend Marketing OS
              </h2>
              <p className="text-gray-700 mb-6">
                The Marketing OS Developer SDK enables developers to harness the
                power of AI-native marketing through a complete, self-contained
                interface that enforces semantic governance and mitigates risk.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                <h3 className="text-lg font-semibold mb-3">
                  SDK Core Structure
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>
                    • <span className="font-medium">Client Libraries:</span>{" "}
                    JS/TS, Python, Go
                  </li>
                  <li>
                    • <span className="font-medium">CLI Tools:</span>{" "}
                    Command-line validation and scanning
                  </li>
                  <li>
                    • <span className="font-medium">Schemas:</span> Signal
                    Object specifications, memory rules
                  </li>
                  <li>
                    • <span className="font-medium">UI Components:</span>{" "}
                    Drop-in React widgets
                  </li>
                  <li>
                    • <span className="font-medium">Governance:</span> Built-in
                    guardrails and escalation
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                <h3 className="font-bold text-lg text-blue-800 mb-2">
                  Signal Object Interface
                </h3>
                <p className="text-gray-700">
                  Generate, validate, and score structured signal objects across
                  the Marketing OS ecosystem.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg border border-green-100">
                <h3 className="font-bold text-lg text-green-800 mb-2">
                  Semantic Memory Access
                </h3>
                <p className="text-gray-700">
                  Query and inject brand knowledge through the bi-directional
                  memory interface.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100">
                <h3 className="font-bold text-lg text-purple-800 mb-2">
                  Risk Control
                </h3>
                <p className="text-gray-700">
                  Built-in drift detection, governance enforcement, and
                  alignment protection.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setActiveTab("implementation")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition duration-150"
              >
                Explore Implementation Tiers
              </button>
            </div>
          </div>
        )}

        {activeTab === "modules" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Marketing OS Modules</h2>
            <p className="text-gray-700 mb-8">
              The SDK provides specialized interfaces for each of the five core
              modules, allowing developers to focus on the most relevant
              integration points for their specific needs.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-lg mb-2">{module.name}</h3>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <h4 className="font-medium text-sm text-gray-500 mb-2">
                    Core Features:
                  </h4>
                  <ul className="text-gray-700 space-y-1">
                    {module.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "implementation" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Implementation Tiers</h2>
            <p className="text-gray-700 mb-8">
              For organizations implementing the Marketing OS SDK, we recommend
              a phased approach that allows for maximum value while managing
              change and resource requirements.
            </p>

            <div className="space-y-8">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
                >
                  <h3 className="font-bold text-xl mb-2 text-indigo-700">
                    {tier.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-2">
                        Key Features:
                      </h4>
                      <ul className="text-gray-700 space-y-1">
                        {tier.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-sm text-gray-500 mb-2">
                        Human vs AI:
                      </h4>
                      {tier.id === "tier1" && (
                        <p className="text-gray-700">
                          Humans implement connections; AI processes requests
                          and enforces structure.
                        </p>
                      )}
                      {tier.id === "tier2" && (
                        <p className="text-gray-700">
                          Humans configure triggers and workflows; AI executes
                          callbacks and validates operations.
                        </p>
                      )}
                      {tier.id === "tier3" && (
                        <p className="text-gray-700">
                          Humans define agent behavior and integrate components;
                          AI powers execution and identifies drift.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "code" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Code Examples</h2>
            <p className="text-gray-700 mb-6">
              See how to integrate Marketing OS SDK into your applications.
              These examples demonstrate core functionality across modules.
            </p>

            <div className="bg-gray-800 text-gray-200 p-6 rounded-lg shadow-md overflow-x-auto">
              <pre>
                <code>{codeExample}</code>
              </pre>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg mb-2">Human vs AI Roles</h3>
                <p className="text-gray-600 mb-4">
                  Across Marketing OS, there is a clear division of labor
                  between humans and AI:
                </p>
                <ul className="space-y-3">
                  <li className="flex">
                    <span className="font-medium mr-2 text-blue-600">
                      AI handles:
                    </span>
                    <span className="text-gray-700">
                      Data processing, pattern recognition, content generation,
                      routing, monitoring
                    </span>
                  </li>
                  <li className="flex">
                    <span className="font-medium mr-2 text-purple-600">
                      Humans manage:
                    </span>
                    <span className="text-gray-700">
                      Strategy, final approvals, exception handling, creative
                      direction, governance
                    </span>
                  </li>
                  <li className="flex">
                    <span className="font-medium mr-2 text-green-600">
                      Developers bridge:
                    </span>
                    <span className="text-gray-700">
                      Using the SDK to connect human intentions with AI
                      capabilities
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg mb-2">Implementation Path</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>
                    Start with Tier 1 features across all modules for a complete
                    but basic system
                  </li>
                  <li>
                    Prioritize Tier 2 and 3 features in the modules most
                    critical to your business needs
                  </li>
                  <li>
                    Gradually expand to full Tier 3 implementation across all
                    modules
                  </li>
                  <li>
                    Leverage the SDK at each step to integrate with existing
                    systems
                  </li>
                </ol>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-600">
                    This hybrid approach leverages the strengths of both
                    artificial and human intelligence to create a system greater
                    than the sum of its parts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold mb-2">Marketing OS Developer SDK</h3>
              <p className="text-gray-300">
                The infrastructure surface area for Marketing OS
              </p>
            </div>
            <div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition duration-150">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SDKLandingPage;
