import { Plus, Upload, AlertTriangle, User, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for KPI tiles
const kpiData = [
  { title: "Drafts", count: 24, trend: "+12%" },
  { title: "Memory Objects", count: 156, trend: "+5%" },
  { title: "Journeys Active", count: 8, trend: "+3%" },
  { title: "Growth Signals", count: 47, trend: "+18%" },
  { title: "External Signals", count: 92, trend: "+7%" },
];

// Mock data for recent activity
const recentActivity = [
  {
    timestamp: "10:24 AM",
    module: "Signal Studio",
    action: "Draft Approved",
    actor: "Maria Chen",
  },
  {
    timestamp: "09:15 AM",
    module: "Memory Loom",
    action: "Codex Uploaded",
    actor: "Raj Kumar",
  },
  {
    timestamp: "08:42 AM",
    module: "Signal Flow",
    action: "Journey Activated",
    actor: "Lisa Johnson",
  },
  {
    timestamp: "Yesterday",
    module: "SignalCore",
    action: "Simulation Run",
    actor: "Carlos Rodriguez",
  },
  {
    timestamp: "Yesterday",
    module: "SignalScope",
    action: "Entity Added",
    actor: "You",
  },
];

const notifications = [
  {
    id: 1,
    message: 'Draft "Q2 Campaign Headline" requires approval',
    type: "approval",
  },
  {
    id: 2,
    message: "New journey triggered 18 signals in the last hour",
    type: "alert",
  },
  {
    id: 3,
    message: "Memory Loom detected potential brand drift in recent content",
    type: "warning",
  },
  {
    id: 4,
    message: "System maintenance scheduled for tonight at 2 AM",
    type: "system",
  },
  {
    id: 5,
    message: "SignalCore optimized 3 new growth triggers",
    type: "success",
  },
];

const systemHealth = {
  apiUptime: "99.98%",
  lastSyncStatus: "Completed 24 min ago",
  warningMessage: "System Maintenance at 2 AM",
};
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            KPI Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {kpiData.map((kpi, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border"
              >
                <div className="text-sm text-gray-500">{kpi.title}</div>
                <div className="mt-1 flex items-baseline justify-between">
                  <div className="text-2xl font-semibold">{kpi.count}</div>
                  {/* Tier 2: Trend indicators */}
                  <div className="text-xs text-green-600">{kpi.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Quick Actions */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button
                className="flex items-center w-full px-3 py-2 text-left bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100"
                onClick={() => {
                  navigate("/dashboard/studio/editor");
                }}
              >
                <Plus size={16} className="mr-2" /> Create Draft
              </button>
              <button
                className="flex items-center w-full px-3 py-2 text-left bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100"
                onClick={() => {
                  navigate("codex");
                }}
              >
                <Upload size={16} className="mr-2" /> Upload Codex
              </button>
              <button
                className="flex items-center w-full px-3 py-2 text-left bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100"
                onClick={() => {
                  navigate("journeybuilder");
                }}
              >
                <Plus size={16} className="mr-2" /> New Journey
              </button>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white p-4 rounded-lg shadow-sm border md:col-span-2">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Recent Activity
            </h2>
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {recentActivity.map((activity, index) => (
                  <li key={index} className="py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.module} • {activity.actor}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.timestamp}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Notifications Snapshot */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-800">
                Notifications
              </h2>
              <button className="text-xs text-blue-600">View all</button>
            </div>
            <div className="space-y-3">
              {notifications.slice(0, 5).map((notification, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  {notification.type === "warning" && (
                    <AlertTriangle
                      size={16}
                      className="text-amber-500 mt-0.5"
                    />
                  )}
                  {notification.type === "approval" && (
                    <User size={16} className="text-blue-500 mt-0.5" />
                  )}
                  {notification.type === "alert" && (
                    <Bell size={16} className="text-red-500 mt-0.5" />
                  )}
                  {notification.type === "system" && (
                    <AlertTriangle size={16} className="text-gray-500 mt-0.5" />
                  )}
                  {notification.type === "success" && (
                    <Bell size={16} className="text-green-500 mt-0.5" />
                  )}
                  <span>{notification.message}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2 features in separate card */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="mb-4">
              {/* Role/Permissions Widget */}
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                Role Access
              </h2>
              <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <User size={18} className="text-gray-500 mr-2" />
                  <div>
                    <span className="text-sm font-medium">Admin</span>
                    <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                      Full Access
                    </span>
                  </div>
                </div>
                <a
                  href="/dashboard/rolepermission"
                  className="text-xs text-blue-600"
                >
                  <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                    Manage Roles
                  </span>
                </a>
              </div>

              {/* System Health */}
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                System Health
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">API Uptime</span>
                  <span className="font-medium text-green-600">
                    {systemHealth.apiUptime}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Sync Status</span>
                  <span className="font-medium">
                    {systemHealth.lastSyncStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Dashboard;
