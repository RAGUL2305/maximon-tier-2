import {
  AlertTriangle,
  Bookmark,
  Brain,
  ChevronRight,
  Clock,
  Code,
  Database,
  FileText,
  GitBranch,
  Hash,
  Home,
  LineChart,
  Lock,
  Paperclip,
  Pin,
  PinOff,
  Radio,
  Search,
  Server,
  Settings,
  Shield,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NotificationsPanel from "./admin-tools/NotificationPannel";

const sidebarItems = [
  {
    icon: <Home size={20} />,
    label: "Dashboard",
    path: "/dashboard",
  },
  { icon: <FileText size={20} />, label: "Studio", path: "/studio/launcher" },
  { icon: <Brain size={20} />, label: "Loom", path: "/memoryloomdashboard" },
  { icon: <GitBranch size={20} />, label: "Flow", path: "/signalflow" },
  { icon: <LineChart size={20} />, label: "Core", path: "/core/signal-core" },
  { icon: <Radio size={20} />, label: "Scope", path: "/scope/signal-scope" },
  { icon: <Code size={20} />, label: "SDK", path: "/sdk/apidocs" },
];

const subMenus: Record<string, { title: string; path: string }[]> = {
  Studio: [
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<string | null>("Dashboard");
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [memoryObjects, setMemoryObjects] = useState<any>([]);
  const [pinnedItems, setPinnedItems] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration purposes
  useEffect(() => {
    // In a real implementation, this would fetch from Memory Loom API
    setTimeout(() => {
      setMemoryObjects([
        {
          id: "1",
          title: "Brand Voice Guidelines",
          type: "document",
          content:
            "Our brand voice is professional yet approachable, using simple language to explain complex concepts.",
          confidence: 0.95,
          lastAccessed: "2 hours ago",
          isPinned: true,
        },
        {
          id: "2",
          title: "Product Launch Messaging",
          type: "snippet",
          content:
            "Our new platform simplifies workflow automation while maintaining enterprise-grade security.",
          confidence: 0.88,
          lastAccessed: "1 day ago",
          isPinned: true,
        },
        {
          id: "3",
          title: "Target Audience Personas",
          type: "document",
          content:
            "Primary persona: Technical Decision Makers aged 35-55 with budget authority.",
          confidence: 0.92,
          lastAccessed: "3 days ago",
          isPinned: false,
        },
        {
          id: "4",
          title: "Competitive Positioning",
          type: "document",
          content:
            "We differentiate through our integrated approach to knowledge and workflow management.",
          confidence: 0.85,
          lastAccessed: "5 days ago",
          isPinned: false,
        },
        {
          id: "5",
          title: "Feature Terminology",
          type: "lexicon",
          content:
            'Use "Signal Intelligence" not "AI Insights" when referring to automated pattern detection.',
          confidence: 0.97,
          lastAccessed: "2 days ago",
          isPinned: false,
        },
      ]);
      setPinnedItems([
        {
          id: "1",
          title: "Brand Voice Guidelines",
          type: "document",
          content:
            "Our brand voice is professional yet approachable, using simple language to explain complex concepts.",
          confidence: 0.95,
          lastAccessed: "2 hours ago",
        },
        {
          id: "2",
          title: "Product Launch Messaging",
          type: "snippet",
          content:
            "Our new platform simplifies workflow automation while maintaining enterprise-grade security.",
          confidence: 0.88,
          lastAccessed: "1 day ago",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const togglePin = (id: any) => {
    const updatedObjects = memoryObjects.map(
      (obj: { id: any; isPinned: any }) => {
        if (obj.id === id) {
          const newPinned = !obj.isPinned;

          // Update pinned items list
          if (newPinned) {
            setPinnedItems([...pinnedItems, obj]);
          } else {
            setPinnedItems(
              pinnedItems.filter((item: { id: any }) => item.id !== id)
            );
          }

          return { ...obj, isPinned: newPinned };
        }
        return obj;
      }
    );

    setMemoryObjects(updatedObjects);
  };

  const filteredMemory = memoryObjects.filter(
    (obj: { title: string; content: string }) =>
      obj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obj.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayItems =
    activeTab === "pinned"
      ? pinnedItems
      : activeTab === "recent"
      ? filteredMemory.sort(
          (a: { lastAccessed: string }, b: { lastAccessed: any }) =>
            a.lastAccessed.localeCompare(b.lastAccessed)
        )
      : filteredMemory;
  // Filter items based on search query

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "prompt":
        return <Hash className="w-4 h-4 text-purple-500" />;
      case "snippet":
        return <Paperclip className="w-4 h-4 text-blue-500" />;
      case "asset":
        return <Bookmark className="w-4 h-4 text-green-500" />;
      default:
        return <Paperclip className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Semantic Memory Drawer */}
      <div className="fixed right-0 top-24 h-screen z-50 flex">
        {/* Drawer tab */}
        <button
          className={`fixed right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-12 w-12 bg-indigo-600 text-white rounded-l-md shadow-md transition hover:bg-indigo-700 z-10 ${
            isDrawerOpen ? "hidden" : "flex"
          }`}
          onClick={toggleDrawer}
          aria-label="Open Memory Drawer"
        >
          <Brain className="w-6 h-6" />
        </button>

        {/* Main drawer */}
        <div
          className={`bg-white border-l border-gray-200 shadow-lg transition-all duration-300 flex flex-col ${
            isDrawerOpen ? "w-80" : "w-0 overflow-hidden"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="font-bold text-lg text-blue-700">Memory Drawer</h3>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Search */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search memory..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium ${
                activeTab === "recent"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("recent")}
            >
              <div className="flex items-center justify-center">
                <Clock className="h-4 w-4 mr-1" />
                Recent
              </div>
            </button>
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium ${
                activeTab === "pinned"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("pinned")}
            >
              <div className="flex items-center justify-center">
                <Pin className="h-4 w-4 mr-1" />
                Pinned
              </div>
            </button>
          </div>

          {/* Memory items */}
          <div className="flex-1 overflow-y-auto p-2">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
              </div>
            ) : displayItems.length > 0 ? (
              displayItems.map((item: any) => (
                <div
                  key={item.id}
                  className="mb-2 border border-gray-200 rounded-md p-3 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-2">
                      {getTypeIcon(item.type)}
                      <div>
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-500">
                          {item.type} • Last accessed: {item.lastAccessed}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePin(item.id);
                      }}
                      className="text-gray-400 hover:text-blue-600"
                    >
                      {item.isPinned ? (
                        <PinOff className="h-4 w-4" />
                      ) : (
                        <Pin className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-gray-700 border-l-2 border-gray-200 pl-2">
                    {item.content}
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Confidence: {(item.confidence * 100).toFixed(0)}%
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No memory items found
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-3 text-xs text-gray-500 flex justify-between">
            <span>Memory Loom Integration</span>
            <span className="text-blue-600">View in Memory Loom →</span>
          </div>
        </div>
      </div>

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
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setActiveItem((prev) =>
                      prev === item.label ? null : item.label
                    );
                    navigate(
                      item.label === "Dashboard"
                        ? `${item.path}`
                        : `/dashboard${item.path}`
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
                {adminSubMenus.map((item: any, index) => (
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
