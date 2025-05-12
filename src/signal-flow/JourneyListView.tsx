import {
  AlertCircle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react";
import { useState } from "react";

const JourneyListView = () => {
  const [journeys, setJourneys] = useState([
    {
      id: 1,
      name: "New Customer Welcome",
      status: "Active",
      triggerCount: 3,
      stepCount: 8,
      lastUpdated: "2025-05-08",
      createdBy: "Alex Kim",
      exported: true,
    },
    {
      id: 2,
      name: "Product Onboarding",
      status: "Active",
      triggerCount: 2,
      stepCount: 6,
      lastUpdated: "2025-05-07",
      createdBy: "Jordan Lee",
      exported: true,
    },
    {
      id: 3,
      name: "Re-engagement Campaign",
      status: "Draft",
      triggerCount: 0,
      stepCount: 4,
      lastUpdated: "2025-05-05",
      createdBy: "Alex Kim",
      exported: false,
    },
    {
      id: 4,
      name: "Renewal Sequence",
      status: "Paused",
      triggerCount: 2,
      stepCount: 5,
      lastUpdated: "2025-05-02",
      createdBy: "Taylor Wong",
      exported: true,
    },
    {
      id: 5,
      name: "Feedback Collection",
      status: "Completed",
      triggerCount: 1,
      stepCount: 3,
      lastUpdated: "2025-04-28",
      createdBy: "Jordan Lee",
      exported: true,
    },
    {
      id: 6,
      name: "Abandoned Cart",
      status: "Active",
      triggerCount: 1,
      stepCount: 7,
      lastUpdated: "2025-05-07",
      createdBy: "Taylor Wong",
      exported: false,
    },
  ]);

  const [selectedJourneys, setSelectedJourneys] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [channelFilter, setChannelFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="text-green-500" size={16} />;
      case "Draft":
        return <Clock className="text-gray-500" size={16} />;
      case "Paused":
        return <AlertCircle className="text-yellow-500" size={16} />;
      case "Completed":
        return <CheckCircle className="text-blue-500" size={16} />;
      default:
        return null;
    }
  };

  const handleSelectAll = (e: { target: { checked: any; }; }) => {
    if (e.target.checked) {
      setSelectedJourneys(filteredJourneys.map((journey) => journey.id));
    } else {
      setSelectedJourneys([]);
    }
  };

  const handleSelectJourney = (journeyId: number) => {
    if (selectedJourneys.includes(journeyId)) {
      setSelectedJourneys(selectedJourneys.filter((id) => id !== journeyId));
    } else {
      setSelectedJourneys([...selectedJourneys, journeyId]);
    }
  };

  const filteredJourneys = journeys.filter((journey) => {
    const matchesStatus =
      statusFilter === "All" || journey.status === statusFilter;
    const matchesSearch = journey.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleBulkAction = (action: string) => {
    if (selectedJourneys.length === 0) return;

    if (action === "pause") {
      const confirmed = window.confirm(
        `Are you sure you want to pause ${selectedJourneys.length} selected journeys?`
      );
      if (confirmed) {
        setJourneys(
          journeys.map((journey) =>
            selectedJourneys.includes(journey.id)
              ? { ...journey, status: "Paused" }
              : journey
          )
        );
        setSelectedJourneys([]);
      }
    } else if (action === "delete") {
      const confirmed = window.confirm(
        `Are you sure you want to delete ${selectedJourneys.length} selected journeys?`
      );
      if (confirmed) {
        setJourneys(
          journeys.filter((journey) => !selectedJourneys.includes(journey.id))
        );
        setSelectedJourneys([]);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Journey List</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <PlusCircle size={18} className="mr-2" />
          New Journey
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search journeys"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <select
            className="border rounded-md px-3 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Paused">Paused</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            className="border rounded-md px-3 py-2"
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
          >
            <option value="All">All Channels</option>
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
            <option value="Push">Push</option>
            <option value="Web">Web</option>
          </select>
        </div>
      </div>

      {selectedJourneys.length > 0 && (
        <div className="bg-gray-50 p-3 rounded-md mb-4 flex items-center justify-between">
          <span className="text-gray-700">
            {selectedJourneys.length} journeys selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkAction("pause")}
              className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm"
            >
              Pause Selected
            </button>
            <button
              onClick={() => handleBulkAction("delete")}
              className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="w-10 px-3 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={
                    selectedJourneys.length === filteredJourneys.length &&
                    filteredJourneys.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Triggers
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Steps
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Updated
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created By
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredJourneys.map((journey) => (
              <tr key={journey.id} className="hover:bg-gray-50">
                <td className="px-3 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="rounded"
                    checked={selectedJourneys.includes(journey.id)}
                    onChange={() => handleSelectJourney(journey.id)}
                  />
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-1">
                      <div className="font-medium text-gray-900">
                        {journey.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(journey.status)}
                    <span
                      className={`ml-1.5 ${
                        journey.status === "Active"
                          ? "text-green-800"
                          : journey.status === "Paused"
                          ? "text-yellow-800"
                          : journey.status === "Completed"
                          ? "text-blue-800"
                          : "text-gray-800"
                      }`}
                    >
                      {journey.status}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-gray-700">
                  {journey.triggerCount}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-gray-700">
                  {journey.stepCount}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-gray-700">
                  {journey.lastUpdated}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-gray-700">
                  {journey.createdBy}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-right text-sm">
                  <div className="flex justify-center">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredJourneys.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No journeys found matching your filters.
          </p>
        </div>
      )}

      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <div>
          Showing {filteredJourneys.length} of {journeys.length} journeys
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border rounded-md">Previous</button>
          <button className="px-3 py-1 border rounded-md bg-blue-50">1</button>
          <button className="px-3 py-1 border rounded-md">Next</button>
        </div>
      </div>
    </div>
  );
};

export default JourneyListView;
