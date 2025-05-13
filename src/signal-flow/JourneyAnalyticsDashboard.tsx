import { AlertTriangle, Calendar, Download, Filter, Info } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock data - would be replaced with API calls in a real implementation
const mockJourneyData = [
  { name: "Jan", completedJourneys: 65, successRate: 78 },
  { name: "Feb", completedJourneys: 59, successRate: 82 },
  { name: "Mar", completedJourneys: 80, successRate: 85 },
  { name: "Apr", completedJourneys: 81, successRate: 87 },
  { name: "May", completedJourneys: 56, successRate: 76 },
  { name: "Jun", completedJourneys: 55, successRate: 74 },
  { name: "Jul", completedJourneys: 40, successRate: 68 },
];

const journeyOptions = [
  { id: 1, name: "Onboarding Journey" },
  { id: 2, name: "Renewal Campaign" },
  { id: 3, name: "Win-back Flow" },
  { id: 4, name: "Upsell Sequence" },
  { id: 5, name: "NPS Survey Flow" },
];

const triggerOptions = [
  { id: 1, name: "Email Open" },
  { id: 2, name: "Page Visit" },
  { id: 3, name: "Purchase" },
  { id: 4, name: "Subscription Renewal" },
];

const JourneyAnalyticsDashboard = () => {
  const [selectedJourney, setSelectedJourney] = useState("all");
  const [selectedTrigger, setSelectedTrigger] = useState("all");
  const [dateRange, setDateRange] = useState("last7days");
  const [kpiData, setKpiData] = useState({
    completedJourneys: 436,
    avgSuccessRate: 78.6,
  });

  // Simulate loading data when filters change
  useEffect(() => {
    // In a real implementation, this would fetch data based on filters
    console.log("Filters changed, would fetch data with:", {
      selectedJourney,
      selectedTrigger,
      dateRange,
    });
  }, [selectedJourney, selectedTrigger, dateRange]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Journey Analytics Dashboard
          </h1>

          <div className="flex space-x-2">
            <button className="bg-white border border-gray-300 rounded-md px-3 py-2 flex items-center text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Journey
            </label>
            <select
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700"
              value={selectedJourney}
              onChange={(e) => setSelectedJourney(e.target.value)}
            >
              <option value="all">All Journeys</option>
              {journeyOptions.map((journey) => (
                <option key={journey.id} value={journey.id}>
                  {journey.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trigger
            </label>
            <select
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700"
              value={selectedTrigger}
              onChange={(e) => setSelectedTrigger(e.target.value)}
            >
              <option value="all">All Triggers</option>
              {triggerOptions.map((trigger) => (
                <option key={trigger.id} value={trigger.id}>
                  {trigger.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <div className="relative">
              <select
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 appearance-none"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="last90days">Last 90 Days</option>
                <option value="ytd">Year to Date</option>
                <option value="custom">Custom Range</option>
              </select>
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div className="flex items-end">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex justify-center items-center">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </button>
          </div>
        </div>

        {/* KPI Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Completed Journeys
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {kpiData.completedJourneys}
                </p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded">
                +12% vs prev
              </span>
            </div>
            <div className="mt-4 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockJourneyData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <Bar
                    dataKey="completedJourneys"
                    fill="#4f46e5"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Avg. Success Rate
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {kpiData.avgSuccessRate}%
                </p>
              </div>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded">
                -3.2% vs prev
              </span>
            </div>
            <div className="mt-4 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockJourneyData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <Line
                    type="monotone"
                    dataKey="successRate"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Journey Performance Over Time
            </h2>
            <div className="flex items-center text-sm text-gray-500">
              <span className="h-3 w-3 bg-blue-500 rounded-full mr-1"></span>{" "}
              Success
              <span className="h-3 w-3 bg-purple-500 rounded-full ml-4 mr-1"></span>{" "}
              Completion
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockJourneyData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="successRate"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="completedJourneys"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Journey Path Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Top Performing Journey Paths
            </h2>
            <div className="overflow-hidden rounded-md border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Journey Path
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Success
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Conv. Rate
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      Email → Landing Page → Purchase
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      86%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      12.3%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Optimal
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      Social → Product Page → Cart
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      74%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      8.7%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Review
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      Remarketing → Checkout
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      92%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      23.5%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Optimal
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      Email → Blog → Newsletter
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      63%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      5.2%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        At Risk
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Trigger Performance
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Email Open
                  </span>
                  <span className="text-sm font-medium text-gray-700">76%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "76%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Page Visit
                  </span>
                  <span className="text-sm font-medium text-gray-700">62%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "62%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Purchase
                  </span>
                  <span className="text-sm font-medium text-gray-700">94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "94%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Subscription
                  </span>
                  <span className="text-sm font-medium text-gray-700">48%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "48%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center text-yellow-500 bg-yellow-50 p-3 rounded-md">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <p className="text-sm">2 triggers showing performance drift</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center">
            <Info className="h-4 w-4 mr-1" />
            <span>Data refreshed 15 min ago</span>
          </div>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            View detailed report
          </button>
        </div>
      </div>
    </div>
  );
};

export default JourneyAnalyticsDashboard;
