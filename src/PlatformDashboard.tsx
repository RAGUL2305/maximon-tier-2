import { useState } from "react";
import {
  Bell,
  User,
  Search,
  Home,
  FileText,
  Brain,
  GitBranch,
  LineChart,
  Radio,
  Code,
  Plus,
  Upload,
  AlertTriangle,
} from "lucide-react";

const PlatformDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Mock data for notifications
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

  // Mock system health data
  const systemHealth = {
    apiUptime: "99.98%",
    lastSyncStatus: "Completed 24 min ago",
    warningMessage: "System Maintenance at 2 AM",
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-16 md:w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 flex items-center justify-center md:justify-start">
          <div className="h-10 w-10 rounded-md bg-blue-500 flex items-center justify-center">
            <span className="font-bold">MOS</span>
          </div>
          <span className="hidden md:block ml-3 font-bold">Marketing OS</span>
        </div>

        <nav className="mt-8 flex-1">
          <ul>
            {[
              { icon: <Home size={20} />, label: "Dashboard", active: true },
              { icon: <FileText size={20} />, label: "Studio", active: false },
              { icon: <Brain size={20} />, label: "Loom", active: false },
              { icon: <GitBranch size={20} />, label: "Flow", active: false },
              { icon: <LineChart size={20} />, label: "Core", active: false },
              { icon: <Radio size={20} />, label: "Scope", active: false },
              { icon: <Code size={20} />, label: "SDK", active: false },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center px-4 py-3 ${
                    item.active ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                >
                  <span className="text-gray-300">{item.icon}</span>
                  <span className="hidden md:block ml-3">{item.label}</span>
                  {item.active && (
                    <span className="hidden md:block ml-auto h-2 w-2 rounded-full bg-blue-500"></span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="hidden md:block ml-3">
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-gray-400">View Profile</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Platform Dashboard
            </h1>

            <div className="flex items-center space-x-4">
              {/* Tier 2: Global search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search across modules..."
                  className="w-64 pl-10 pr-4 py-2 border rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Search size={18} />
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    5
                  </span>
                </button>

                {/* Notifications Panel */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                    <div className="p-3 border-b flex justify-between items-center">
                      <h3 className="font-medium">Notifications</h3>
                      <button className="text-xs text-blue-600">
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-3 border-b hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                              {notification.type === "warning" && (
                                <AlertTriangle
                                  size={16}
                                  className="text-amber-500"
                                />
                              )}
                              {notification.type === "approval" && (
                                <User size={16} className="text-blue-500" />
                              )}
                              {notification.type === "alert" && (
                                <Bell size={16} className="text-red-500" />
                              )}
                              {notification.type === "system" && (
                                <AlertTriangle
                                  size={16}
                                  className="text-gray-500"
                                />
                              )}
                              {notification.type === "success" && (
                                <Bell size={16} className="text-green-500" />
                              )}
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm text-gray-800">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Just now
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Tier 2: Filter controls */}
                    <div className="p-2 border-t flex justify-between items-center bg-gray-50">
                      <div className="text-xs">
                        <select className="text-xs border p-1 rounded">
                          <option>All Modules</option>
                          <option>Signal Studio</option>
                          <option>Memory Loom</option>
                          <option>Signal Flow</option>
                        </select>
                      </div>
                      <button className="text-xs text-blue-600">
                        Settings
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Tier 2: System alert banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle size={18} className="text-amber-500 mr-2" />
            <span className="text-sm text-amber-700">
              {systemHealth.warningMessage}
            </span>
          </div>
          <button className="text-xs text-amber-700">Dismiss</button>
        </div>

        {/* Main dashboard content */}
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
                <button className="flex items-center w-full px-3 py-2 text-left bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100">
                  <Plus size={16} className="mr-2" /> Create Draft
                </button>
                <button className="flex items-center w-full px-3 py-2 text-left bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100">
                  <Upload size={16} className="mr-2" /> Upload Codex
                </button>
                <button className="flex items-center w-full px-3 py-2 text-left bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100">
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
                  <div
                    key={index}
                    className="flex items-start space-x-2 text-sm"
                  >
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
                      <AlertTriangle
                        size={16}
                        className="text-gray-500 mt-0.5"
                      />
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
                  <a href="#" className="text-xs text-blue-600">
                    Manage Roles
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
      </div>
    </div>
  );
};

export default PlatformDashboard;
