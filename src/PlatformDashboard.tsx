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
  AlertTriangle,
} from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

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

const sidebarItems = [
  {
    icon: <FileText size={20} />,
    label: "Studio",
  },
  {
    icon: <Brain size={20} />,
    label: "Loom",
  },
  {
    icon: <GitBranch size={20} />,
    label: "Flow",
  },
  {
    icon: <LineChart size={20} />,
    label: "Core",
  },
  {
    icon: <Radio size={20} />,
    label: "Scope",
  },
  {
    icon: <Code size={20} />,
    label: "SDK",
  },
];

const subMenus: Record<string, { title: string; path: string }[]> = {
  Studio: [
    { title: "Launcher", path: "/studio/launcher" },
    { title: "Edit Draft Page", path: "/studio/editor" },
    { title: "Visual Assest Studio", path: "/studio/visualasseststudio" },
    { title: "Snippet", path: "/studio/snippet" },
    { title: "Propmt", path: "/studio/prompt" },
    { title: "Export Hub", path: "/studio/exporthub" },
    { title: "Governence", path: "/studio/governence" },
    { title: "Drift DashBoard", path: "/studio/drift" },
    { title: "Draft DetailsView", path: "/studio/detailview" },
    { title: "Draft ListView", path: "/studio/listview" },
  ],
  Loom: [
    { title: "Audit Trail", path: "/audittrails" },
    { title: "Brand Lexicon", path: "/brandlexicon" },
    { title: "Codex Upload", path: "/codex" },
    { title: "Snippets", path: "/memoryzone/snippets" },
    { title: "MemoryDrawer", path: "/memorydrawer" },
    { title: "MemoryLoom Dahboard", path: "/memoryloomdashboard" },
    { title: "Object Detail", path: "/memoryobjectdetails" },
    { title: "Object List ", path: "/memoryobjectlist" },
    { title: "Seasrch Console", path: "/searchconsole" },
    { title: "Message Automizer", path: "/messageautomizer" },
  ],
  Flow: [
    { title: "Export Hub", path: "/publishzone/export" },
    { title: "Integration", path: "/publishzone/integration" },
    { title: "CLI/SDK", path: "/publishzone/cli" },
    { title: "Protocol Viewer", path: "/publishzone/protocol" },
  ],
  Core: [
    { title: "SignalCore", path: "/analytics/SignalCore" },
    {
      title: "DecisionEngineDashboard",
      path: "/analytics/DecisionEngineDashboard",
    },
    { title: "GrowthSignalMapper", path: "/analytics/GrowthSignalMapper" },
    {
      title: "PerformanceAnalyticsDashboard",
      path: "/analytics/PerformanceAnalyticsDashboard",
    },
    { title: "PersonaTriggerMatrix", path: "/analytics/PersonaTriggerMatrix" },
    { title: "SignalCoreExportHub", path: "/analytics/SignalCoreExportHub" },
    { title: "SignalIntakeConsole", path: "/analytics/SignalIntakeConsole" },
    { title: "SimulationStudio", path: "/analytics/SimulationStudio" },
  ],
  Scope: [
    { title: "Memory Management", path: "/admintools/memorymanageement" },
    { title: "Team Management", path: "/admintools/team" },
    { title: "AI Config", path: "/admintools/aiconfig" },
    { title: "Access Control", path: "/admintools/access" },
  ],
  SDK: [
    { title: "Api Docs Viewer", path: "/sdk/apidocs" },
    { title: "Api Error Log", path: "/sdk/apierror" },
    { title: "Api Tokens Page", path: "/sdk/apitokens" },
    { title: "Cli Access Config", path: "/sdk/cliaccess" },
    { title: "Sdk Landing Page", path: "/sdk/landing" },
    { title: "Web Hooks Config", path: "/sdk/webhooks" },
  ],
};

const systemHealth = {
  apiUptime: "99.98%",
  lastSyncStatus: "Completed 24 min ago",
  warningMessage: "System Maintenance at 2 AM",
};

const PlatformDashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState("Dashboard");

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
            <li>
              <button
                onClick={() => {
                  setActiveItem("Dashboard");
                  navigate("/dashboard");
                }}
                className={`flex items-center w-full px-4 py-3 text-left ${
                  activeItem === "Dashboard"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                <span className="text-gray-300">{<Home size={20} />}</span>
                <span className="hidden md:block ml-3 text-gray-200">
                  Dashboard
                </span>
                {activeItem === "Dashboard" && (
                  <span className="hidden md:block ml-auto h-2 w-2 rounded-full bg-blue-500"></span>
                )}
              </button>
            </li>
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setActiveItem(item.label);
                  }}
                  className={`flex items-center w-full px-4 py-3 text-left ${
                    activeItem === item.label
                      ? "bg-gray-700"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <span className="text-gray-300">{item.icon}</span>
                  <span className="hidden md:block ml-3 text-gray-200">
                    {item.label}
                  </span>
                  {activeItem === item.label && (
                    <span className="hidden md:block ml-auto h-2 w-2 rounded-full bg-blue-500"></span>
                  )}
                </button>

                {/* Submenu */}
                {subMenus[item.label] && activeItem === item.label && (
                  <ul className="ml-10 mt-1">
                    {subMenus[item.label].map((sub) => (
                      <li key={sub.title}>
                        <button
                          onClick={() => navigate(`/dashboard${sub.path}`)}
                          className="text-sm text-left p-1 hover:text-indigo-400 text-gray-300 w-full"
                        >
                          {sub.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
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
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PlatformDashboard;
