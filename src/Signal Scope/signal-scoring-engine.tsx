import { AlertCircle, BarChart2, Check, Info, Sliders } from "lucide-react";
import { useState } from "react";

export default function SignalScoringEngine() {
  const [signals, setSignals] = useState([
    {
      id: 1,
      name: "Social Media Mention",
      source: "Twitter",
      content: "Love the new product features from this brand!",
      scores: { trust: 82, tone: 78, truth: 90, alignment: 85 },
      status: "processed",
      timestamp: "10 min ago",
    },
    {
      id: 2,
      name: "Customer Review",
      source: "Product Review",
      content: "The service was good but product quality needs improvement.",
      scores: { trust: 75, tone: 55, truth: 80, alignment: 60 },
      status: "processed",
      timestamp: "15 min ago",
    },
    {
      id: 3,
      name: "Market Analysis",
      source: "Industry Report",
      content:
        "Brand perception is increasingly positive among key demographics.",
      scores: { trust: 90, tone: 85, truth: 95, alignment: 92 },
      status: "processed",
      timestamp: "25 min ago",
    },
    {
      id: 4,
      name: "LLM Reference",
      source: "ChatGPT",
      content: "This brand is known for innovation and customer service.",
      scores: { trust: 65, tone: 88, truth: 70, alignment: 75 },
      status: "processed",
      timestamp: "30 min ago",
    },
    {
      id: 5,
      name: "New Market Signal",
      source: "Competitive Analysis",
      content: "New emerging need in target market related to brand offerings.",
      scores: { trust: 0, tone: 0, truth: 0, alignment: 0 },
      status: "pending",
      timestamp: "Just now",
    },
  ]);

  const [selectedSignal, setSelectedSignal] = useState<any | null>(null);
  const [thresholds, setThresholds] = useState<any | null>({
    trust: 70,
    tone: 60,
    truth: 75,
    alignment: 65,
  });
  const [processingSignal, setProcessingSignal] = useState(false);

  const handleSignalSelect = (signal: any) => {
    setSelectedSignal(signal);
  };

  const handleThresholdChange = (metric: any, value: any) => {
    setThresholds({ ...thresholds, [metric]: parseInt(value) });
  };

  const processNewSignal = () => {
    if (processingSignal) return;

    setProcessingSignal(true);

    setTimeout(() => {
      const newSignals = [...signals];
      const pendingSignalIndex = newSignals.findIndex(
        (s) => s.status === "pending"
      );

      if (pendingSignalIndex >= 0) {
        newSignals[pendingSignalIndex] = {
          ...newSignals[pendingSignalIndex],
          scores: {
            trust: Math.floor(Math.random() * 30) + 65,
            tone: Math.floor(Math.random() * 30) + 60,
            truth: Math.floor(Math.random() * 25) + 70,
            alignment: Math.floor(Math.random() * 35) + 60,
          },
          status: "processed",
        };

        setSignals(newSignals);
        setSelectedSignal(newSignals[pendingSignalIndex]);
      }

      setProcessingSignal(false);
    }, 2000);
  };

  const getScoreColor = (score:any, threshold: any) => {
    if (score === 0) return "bg-gray-200";
    if (score >= 90) return "bg-green-500";
    if (score >= threshold) return "bg-green-400";
    if (score >= threshold - 15) return "bg-yellow-400";
    return "bg-red-400";
  };

  const getSignalStatus = (signal:any) => {
    if (signal.status === "pending") return "pending";

    const { trust, tone, truth, alignment } = signal.scores;
    const {
      trust: trustThreshold,
      tone: toneThreshold,
      truth: truthThreshold,
      alignment: alignmentThreshold,
    } = thresholds;

    if (
      trust >= trustThreshold &&
      tone >= toneThreshold &&
      truth >= truthThreshold &&
      alignment >= alignmentThreshold
    ) {
      return "pass";
    }

    if (
      trust < trustThreshold - 15 ||
      tone < toneThreshold - 15 ||
      truth < truthThreshold - 15 ||
      alignment < alignmentThreshold - 15
    ) {
      return "fail";
    }

    return "review";
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-6xl mx-auto">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Signal Scoring Engine
            </h1>
            <p className="text-gray-600">SignalScope Module - Marketing OS</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center">
              <BarChart2 className="text-blue-600 mr-2" size={20} />
              <div>
                <div className="text-sm text-blue-800 font-medium">
                  Active Signals
                </div>
                <div className="text-xl font-bold text-blue-700">
                  {signals.filter((s) => s.status === "processed").length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Incoming Signals
            </h2>
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {signals.length} total
            </span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {signals.map((signal) => (
              <div
                key={signal.id}
                onClick={() => handleSignalSelect(signal)}
                className={`p-3 rounded-md cursor-pointer border transition ${
                  selectedSignal?.id === signal.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-100"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-800">
                      {signal.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      Source: {signal.source}
                    </div>
                  </div>
                  {signal.status === "pending" ? (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Pending
                    </span>
                  ) : getSignalStatus(signal) === "pass" ? (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Pass
                    </span>
                  ) : getSignalStatus(signal) === "review" ? (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Review
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Fail
                    </span>
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {signal.content}
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  {signal.timestamp}
                </div>
              </div>
            ))}
          </div>

          {signals.some((s) => s.status === "pending") && (
            <button
              onClick={processNewSignal}
              disabled={processingSignal}
              className={`mt-4 w-full py-2 px-4 rounded-md text-white font-medium ${
                processingSignal
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {processingSignal ? "Processing..." : "Process Pending Signal"}
            </button>
          )}
        </div>

        <div className="lg:col-span-2">
          {selectedSignal ? (
            <div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {selectedSignal.name}
                </h3>
                <div className="text-sm text-gray-500 mb-1">
                  Source: {selectedSignal.source}
                </div>
                <div className="text-gray-700 mb-4 border-l-4 border-gray-200 pl-3 py-1 italic">
                  "{selectedSignal.content}"
                </div>

                {selectedSignal.status === "processed" ? (
                  <div>
                    <div className="font-medium text-gray-700 mb-2 flex items-center">
                      <BarChart2 size={16} className="mr-1" />
                      Signal Scores
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {Object.entries(selectedSignal.scores).map(
                        ([metric, score]:any) => (
                          <div
                            key={metric}
                            className="bg-gray-50 p-3 rounded-md"
                          >
                            <div className="text-sm text-gray-600 capitalize">
                              {metric}
                            </div>
                            <div className="flex items-center mt-1">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                <div
                                  className={`h-2.5 rounded-full ${getScoreColor(
                                    score,
                                    thresholds[metric]
                                  )}`}
                                  style={{ width: `${score}%` }}
                                ></div>
                              </div>
                              <span
                                className={`text-xs font-medium ${
                                  score >= thresholds[metric]
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {score}
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    <div className="mt-4 flex items-center">
                      <div className="font-medium text-gray-700 mr-2">
                        Overall Status:
                      </div>
                      {getSignalStatus(selectedSignal) === "pass" ? (
                        <div className="flex items-center text-green-600">
                          <Check size={18} className="mr-1" />
                          <span className="font-medium">Pass Thresholds</span>
                        </div>
                      ) : getSignalStatus(selectedSignal) === "review" ? (
                        <div className="flex items-center text-yellow-600">
                          <Info size={18} className="mr-1" />
                          <span className="font-medium">Needs Review</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600">
                          <AlertCircle size={18} className="mr-1" />
                          <span className="font-medium">Below Thresholds</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 text-xs text-gray-500">
                      Processed: {selectedSignal.timestamp}
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-3 rounded-md text-yellow-800 text-sm">
                    This signal is pending processing. Click "Process Pending
                    Signal" to evaluate it.
                  </div>
                )}
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800 flex items-center mb-3">
                  <Sliders size={16} className="mr-1" />
                  Threshold Settings
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Adjust the threshold values to determine when signals require
                  human review or escalation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(thresholds).map(([metric, value]:any) => (
                    <div key={metric} className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {metric} Threshold: {value}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) =>
                          handleThresholdChange(metric, e.target.value)
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-blue-50 p-3 rounded-md">
                  <div className="text-sm font-medium text-blue-800">
                    Governance Rules
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    <p>
                      • Signals below thresholds trigger alerts for human review
                    </p>
                    <p>
                      • High-risk signals (15+ points below threshold) are
                      escalated to admin
                    </p>
                    <p>
                      • All signals feed into Memory Loom for semantic pattern
                      analysis
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-400 mb-2">
                  <BarChart2 size={48} className="inline-block" />
                </div>
                <h3 className="text-gray-700 font-medium text-lg">
                  Select a signal
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Choose a signal from the list to view its detailed scoring
                  analysis
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-2">
          About Signal Scoring Engine
        </h3>
        <p className="text-sm text-gray-600">
          The Signal Scoring Engine is a key component of the SignalScope module
          in Marketing OS. It evaluates external signals based on four key
          metrics: trust, tone, truth, and alignment with brand standards. This
          engine helps organizations detect, interpret, and act on signals
          across systems, models, and channels without losing brand alignment or
          insight fidelity.
        </p>
      </div>
    </div>
  );
}
