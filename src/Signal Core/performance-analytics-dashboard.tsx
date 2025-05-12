import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  Filter,
  BarChart2,
  TrendingUp,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const PerformanceAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("30d");

  // Mock performance data
  const performanceData = [
    { date: "Jan 1", conversionRate: 2.4, revenue: 8400, signalStrength: 82 },
    { date: "Jan 8", conversionRate: 2.7, revenue: 9200, signalStrength: 85 },
    { date: "Jan 15", conversionRate: 3.1, revenue: 10800, signalStrength: 88 },
    { date: "Jan 22", conversionRate: 2.9, revenue: 10200, signalStrength: 86 },
    { date: "Jan 29", conversionRate: 3.5, revenue: 12400, signalStrength: 92 },
    { date: "Feb 5", conversionRate: 3.8, revenue: 13600, signalStrength: 94 },
    { date: "Feb 12", conversionRate: 3.6, revenue: 13100, signalStrength: 91 },
    { date: "Feb 19", conversionRate: 4.1, revenue: 14800, signalStrength: 96 },
  ];

  // Performance metrics by channel
  const channelData = [
    { name: "Email", conversionRate: 3.5, revenue: 42800, signalStrength: 90 },
    { name: "Social", conversionRate: 2.8, revenue: 31600, signalStrength: 85 },
    { name: "Search", conversionRate: 4.2, revenue: 39100, signalStrength: 93 },
    {
      name: "Display",
      conversionRate: 1.9,
      revenue: 21300,
      signalStrength: 78,
    },
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            SignalCore Performance Analytics
          </h1>
          <p className="text-gray-500">
            Track, analyze, and optimize revenue signals
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-white p-2 rounded-md border border-gray-200">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              className="outline-none border-none text-sm"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="ytd">Year to date</option>
            </select>
          </div>
          <button className="flex items-center gap-2 bg-white p-2 rounded-md border border-gray-200">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm">Filters</span>
          </button>
          <button className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm">
            Export
          </button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard
          title="Avg. Signal Strength"
          value="92"
          change="+4.2%"
          isPositive={true}
          icon={<TrendingUp className="w-5 h-5 text-blue-500" />}
        />
        <KpiCard
          title="Conversion Rate"
          value="3.8%"
          change="+0.7%"
          isPositive={true}
          icon={<BarChart2 className="w-5 h-5 text-green-500" />}
        />
        <KpiCard
          title="Revenue"
          value="$92,400"
          change="+12.3%"
          isPositive={true}
          icon={<PieChart className="w-5 h-5 text-purple-500" />}
        />
        <KpiCard
          title="Cost Per Acquisition"
          value="$24.12"
          change="-8.5%"
          isPositive={true}
          icon={<TrendingUp className="w-5 h-5 text-teal-500" />}
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "overview"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "channels"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("channels")}
        >
          Channel Performance
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "signals"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("signals")}
        >
          Signal Analysis
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "recommendations"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("recommendations")}
        >
          AI Recommendations
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-4">
              Signal Strength Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="signalStrength"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Signal Strength"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-4">
              Conversion Rate & Revenue
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" domain={[1, 5]} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[5000, 15000]}
                />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="conversionRate"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Conversion Rate (%)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  name="Revenue ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === "channels" && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-4">
              Channel Performance - Conversion Rate
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="conversionRate"
                  fill="#10b981"
                  name="Conversion Rate (%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-4">
              Channel Performance - Signal Strength
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="signalStrength"
                  fill="#3b82f6"
                  name="Signal Strength"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === "signals" && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-4">Signal Analysis</h3>
          <p className="text-gray-500 mb-8">
            This view would show detailed analysis of signal quality, drift
            detection, and performance correlations.
          </p>

          <div className="flex justify-center items-center h-64">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <p className="text-gray-700">
                Signal Analysis features would be available in this tab
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Configure additional settings in the SignalCore module
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-4">AI Recommendations</h3>

          <div className="space-y-4">
            <RecommendationCard
              title="Increase email frequency for high-value segment"
              description="Based on signal analysis, increasing email touchpoints for the high-value customer segment could improve conversion rates by an estimated 12-18%."
              impact="Medium"
              confidence={92}
            />

            <RecommendationCard
              title="Optimize search ad spend allocation"
              description="Current performance signals indicate shifting 15% of display budget to search could improve overall ROAS by 22%."
              impact="High"
              confidence={87}
            />

            <RecommendationCard
              title="Refine social media targeting parameters"
              description="Signal analysis shows current targeting is too broad. Narrowing demographic focus could reduce CPA by 24-30%."
              impact="Medium"
              confidence={79}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// KPI Card Component
const KpiCard = ({ title, value, change, isPositive, icon }: any) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        </div>
        <div className="p-2 rounded-full bg-gray-50">{icon}</div>
      </div>
      <div
        className={`flex items-center mt-2 ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {isPositive ? (
          <ArrowUpRight className="w-4 h-4 mr-1" />
        ) : (
          <ArrowDownRight className="w-4 h-4 mr-1" />
        )}
        <span className="text-sm font-medium">{change}</span>
      </div>
    </div>
  );
};

// Recommendation Card Component
const RecommendationCard = ({
  title,
  description,
  impact,
  confidence,
}: any) => {
  const impactColor =
    impact === "High"
      ? "bg-red-100 text-red-800"
      : impact === "Medium"
      ? "bg-amber-100 text-amber-800"
      : "bg-blue-100 text-blue-800";

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${impactColor}`}>
            {impact} impact
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
            {confidence}% confidence
          </span>
        </div>
      </div>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>
      <div className="mt-4 flex justify-end gap-2">
        <button className="text-gray-500 text-sm px-3 py-1 border border-gray-200 rounded-md">
          Dismiss
        </button>
        <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md">
          Apply
        </button>
      </div>
    </div>
  );
};

export default PerformanceAnalyticsDashboard;
