import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BarChart2,
  CheckCircle,
  Eye,
  Info,
  Zap,
} from "lucide-react";
import { useState } from "react";

const TrustScoreOverlay = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("drafts");

  // Mock data for demonstration
  const mockData = {
    drafts: {
      score: 72,
      total: 24,
      drifted: 8,
      items: [
        {
          id: 1,
          name: "Q2 Product Launch Email",
          score: 42,
          threshold: 75,
          issues: ["Tone inconsistency", "Unapproved messaging"],
        },
        {
          id: 2,
          name: "Customer Onboarding Sequence",
          score: 68,
          threshold: 75,
          issues: ["Brand terminology drift"],
        },
        {
          id: 3,
          name: "Black Friday Promotion",
          score: 55,
          threshold: 75,
          issues: ["Messaging alignment", "Off-brand visuals"],
        },
      ],
    },
    journeys: {
      score: 81,
      total: 12,
      drifted: 3,
      items: [
        {
          id: 1,
          name: "New Customer Welcome",
          score: 66,
          threshold: 75,
          issues: ["Step sequence deviation"],
        },
        {
          id: 2,
          name: "Abandoned Cart Recovery",
          score: 69,
          threshold: 75,
          issues: ["Tone inconsistency in follow-up"],
        },
      ],
    },
    signals: {
      score: 88,
      total: 36,
      drifted: 4,
      items: [
        {
          id: 1,
          name: "Social Listening Signal #A128",
          score: 62,
          threshold: 75,
          issues: ["Perception misalignment"],
        },
        {
          id: 2,
          name: "Product Review Aggregator",
          score: 71,
          threshold: 75,
          issues: ["Feature messaging drift"],
        },
      ],
    },
  };

  const getStatusColor = (score) => {
    if (score >= 85) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getIconByScore = (score) => {
    if (score >= 85) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (score >= 70)
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <AlertCircle className="h-5 w-5 text-red-500" />;
  };

  const getTrustScoreText = (score) => {
    if (score >= 85) return "Aligned";
    if (score >= 70) return "Caution";
    return "Critical Drift";
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-medium text-gray-800">
            Trust Score Overlay
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            {showDetails ? "Hide Details" : "Show Details"}
            <ArrowRight
              className={`h-4 w-4 ml-1 transition-transform ${
                showDetails ? "rotate-90" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Trust Score Summary */}
      <div className="p-4 grid grid-cols-3 gap-4 border-b border-gray-200">
        {Object.keys(mockData).map((category) => {
          const data = mockData[category];
          return (
            <div
              key={category}
              className={`p-4 rounded-lg cursor-pointer border ${
                activeTab === category
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(category)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium capitalize">{category}</h3>
                {getIconByScore(data.score)}
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">{data.score}</div>
                  <div className="text-xs text-gray-500">Trust Score</div>
                </div>
                {data.drifted > 0 && (
                  <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                    {data.drifted} drifted
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Warning Banner - Only show if there's drift in the active category */}
      {mockData[activeTab].drifted > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-amber-700 font-medium">
                <span className="font-bold">
                  {mockData[activeTab].drifted} {activeTab}
                </span>{" "}
                have drifted beyond threshold
              </p>
              <p className="text-xs text-amber-600 mt-1">
                Click on items below to view details and take corrective action.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Detailed View */}
      {showDetails && (
        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">
            Drift Details - {activeTab}
          </h3>

          <div className="space-y-4">
            {mockData[activeTab].items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center">
                    {getIconByScore(item.score)}
                    <span className="ml-2 font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        item.score
                      )}`}
                    >
                      {getTrustScoreText(item.score)}
                    </span>
                    <div className="text-sm">
                      <span className="font-bold">{item.score}</span>
                      <span className="text-gray-500">/100</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">
                      Trust Score
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          item.score >= 85
                            ? "bg-green-500"
                            : item.score >= 70
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0</span>
                      <span>Threshold: {item.threshold}</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Issues */}
                  <div className="mt-4">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">
                      Identified Issues:
                    </h4>
                    <ul className="space-y-1">
                      {item.issues.map((issue, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-xs text-red-600"
                        >
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex space-x-2">
                    <button className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700">
                      Review
                    </button>
                    <button className="px-3 py-1 text-xs rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
                      Ignore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-t border-gray-200">
        <div className="flex items-center text-xs text-gray-500">
          <Info className="h-4 w-4 mr-1" />
          Last updated: 10 minutes ago
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center text-xs text-blue-600 hover:text-blue-800">
            <BarChart2 className="h-4 w-4 mr-1" />
            View Dashboard
          </button>
          <button className="flex items-center text-xs text-blue-600 hover:text-blue-800">
            <Zap className="h-4 w-4 mr-1" />
            Run Scan
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrustScoreOverlay;
