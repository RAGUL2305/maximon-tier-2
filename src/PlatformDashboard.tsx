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
  Settings,
  Users,
  Shield,
  LogOut,
  Lock,
  Database,
  Server,
  Mail,
} from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import NotificationsPanel from "./admin-tools/NotificationPannel";

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
  { icon: <FileText size={20} />, label: "Studio" },
  { icon: <Brain size={20} />, label: "Loom" },
  { icon: <GitBranch size={20} />, label: "Flow" },
  { icon: <LineChart size={20} />, label: "Core" },
  { icon: <Radio size={20} />, label: "Scope" },
  { icon: <Code size={20} />, label: "SDK" },
];

const subMenus: Record<string, { title: string; path: string }[]> = {
  Studio: [
    { title: "Launcher", path: "/studio/launcher" },
    { title: "Edit Draft Page", path: "/studio/editor" },
    { title: "Visual Assest Studio", path: "/studio/visualasseststudio" },
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
    { title: "MemoryDrawer", path: "/memorydrawer" },
    { title: "MemoryLoom Dahboard", path: "/memoryloomdashboard" },
    { title: "Object Detail", path: "/memoryobjectdetails" },
    { title: "Object List ", path: "/memoryobjectlist" },
    { title: "Seasrch Console", path: "/searchconsole" },
    { title: "Message Automizer", path: "/messageautomizer" },
  ],
  Flow: [
    { title: "Fallback escalation", path: "/fallbackescalation" },
    { title: "Journey Analytics dashboard", path: "/journeyanalytics" },
    { title: "Journey Builder", path: "/journeybuilder" },
    { title: "Journey Detailview", path: "/journeydetail" },
    { title: "Journey Listview", path: "/journeylist" },
    { title: "Journey Validator", path: "/journeyvalidator" },
    { title: "Personal Channelmap", path: "/personalchannel" },
    { title: "Signal flow dashboard", path: "/signalflow" },
    { title: "Signal monitor dashboard", path: "/signalmonitor" },
    { title: "Trigger Configurator", path: "/triggerconfigurator" },
  ],
  Core: [
    { title: "SignalCore", path: "/core/signal-core" },
    {
      title: "DecisionEngineDashboard",
      path: "/core/decision-engine-dashboard",
    },
    { title: "GrowthSignalMapper", path: "/core/growth-signal-mapper" },
    {
      title: "PerformanceAnalyticsDashboard",
      path: "/core/performance-analytics-dashboard",
    },
    { title: "PersonaTriggerMatrix", path: "/core/persona-trigger-matrix" },
    { title: "SignalCoreExportHub", path: "/core/signal-core-exportHub" },
    { title: "SignalIntakeConsole", path: "/core/signal-intake-console" },
    { title: "SimulationStudio", path: "/core/simulation-studio" },
  ],
  Scope: [
    { title: "SignalScope", path: "/scope/signal-scope" },
    { title: "DriftInsightDashboard", path: "/scope/drift-insight-dashboard" },
    {
      title: "EntityRecognitionConfig",
      path: "/scope/entity-recognition-config",
    },
    { title: "EscalationLayer", path: "/scope/escalation-layer" },
    { title: "InsightRouter", path: "/scope/insight-router" },
    { title: "MemoryLookupConsole", path: "/scope/memory-lookup-console" },
    { title: "SignalIntakeList", path: "/scope/signal-intake-list" },
    { title: "SignalScoringEngine", path: "/scope/signal-scoring-engine" },
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

// Admin submenu items
const adminSubMenus = [
  {
    title: "Escalation Manager",
    path: "/escalation",
    icon: <User size={16} className="mr-2" />,
  },
  {
    title: "Governance Guarddrail",
    path: "/governance",
    icon: <Lock size={16} className="mr-2" />,
  },
  {
    title: "Memorysync Panel",
    path: "/memorysync",
    icon: <Users size={16} className="mr-2" />,
  },
  {
    title: "Notification Pannel",
    path: "/notification",
    icon: <Shield size={16} className="mr-2" />,
  },
  {
    title: "Role Permissions",
    path: "/rolepermission",
    icon: <Settings size={16} className="mr-2" />,
  },
  {
    title: "Trust Score",
    path: "/trustscoreoverlay",
    icon: <Database size={16} className="mr-2" />,
  },
  {
    title: "Version History",
    path: "/versionhistory",
    icon: <Server size={16} className="mr-2" />,
  },
  // {
  //   title: "User Profile",
  //   path: "/admin/profile",
  //   icon: <User size={16} className="mr-2" />
  // },
  // {
  //   title: "Account Security",
  //   path: "/admin/security",
  //   icon: <Lock size={16} className="mr-2" />
  // },
  // {
  //   title: "Team Management",
  //   path: "/admin/team",
  //   icon: <Users size={16} className="mr-2" />
  // },
  // {
  //   title: "Admin Console",
  //   path: "/admin/console",
  //   icon: <Shield size={16} className="mr-2" />
  // },
  // {
  //   title: "System Settings",
  //   path: "/admin/settings",
  //   icon: <Settings size={16} className="mr-2" />
  // },
  // {
  //   title: "Database Management",
  //   path: "/admin/database",
  //   icon: <Database size={16} className="mr-2" />
  // },
  // {
  //   title: "Server Status",
  //   path: "/admin/server",
  //   icon: <Server size={16} className="mr-2" />
  // },
  // {
  //   title: "Email Configuration",
  //   path: "/admin/email",
  //   icon: <Mail size={16} className="mr-2" />
  // },
  // {
  //   title: "Log Out",
  //   path: "/logout",
  //   icon: <LogOut size={16} className="mr-2" />,
  //   className: "border-t border-gray-600 mt-2 pt-2",
  // },
];

const systemHealth = {
  apiUptime: "99.98%",
  lastSyncStatus: "Completed 24 min ago",
  warningMessage: "System Maintenance at 2 AM",
};

const PlatformDashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<string | null>("Dashboard");
  const [showAdminMenu, setShowAdminMenu] = useState(false);

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
                    setActiveItem((prev) =>
                      prev === item.label ? null : item.label
                    );
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

        {/* Admin Section with Submenu */}
        <div className="p-4 relative">
          <button
            onClick={() => setShowAdminMenu(!showAdminMenu)}
            className={`flex items-center w-full p-2 rounded-md ${
              showAdminMenu ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="hidden md:block ml-3 text-left">
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-gray-400">View Profile</div>
            </div>
          </button>

          {/* Admin Submenu */}
          {showAdminMenu && (
            <div className="absolute bottom-16 left-4 right-4 bg-gray-700 rounded-md shadow-lg overflow-hidden z-20">
              <ul className="py-1">
                {adminSubMenus.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        navigate(`/dashboard${item.path}`);
                        setShowAdminMenu(false);
                      }}
                      className={`flex items-center w-full px-4 py-2 text-left hover:bg-gray-600 ${
                        item.className || ""
                      }`}
                    >
                      {item.icon}
                      <span className="text-sm">{item.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-semibold text-white">
              Platform Dashboard
            </h1>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search across modules..."
                  className="w-64 pl-10 pr-4 py-2 border rounded-md bg-gray-700 text-white placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Search size={18} />
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <NotificationsPanel />
              </div>
            </div>
          </div>
        </header>

        {/* System Alert */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle size={18} className="text-amber-500 mr-2" />
            <span className="text-sm text-amber-700">
              {systemHealth.warningMessage}
            </span>
          </div>
          <button className="text-xs text-amber-700">Dismiss</button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PlatformDashboard;
