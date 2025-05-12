import {
  AlertTriangle,
  Bookmark,
  Brain,
  Clock,
  Code,
  Database,
  ExternalLink,
  FileText,
  Filter,
  GitBranch,
  Hash,
  Home,
  LineChart,
  Lock,
  Paperclip,
  Pin,
  PlusCircle,
  Radio,
  Search,
  Server,
  Settings,
  Shield,
  Star,
  User,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
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
    // { title: "Edit Draft Page", path: "/studio/editor" },
    { title: "Visual Asset Studio", path: "/studio/visualasseststudio" },
    { title: "Propmt Library", path: "/studio/prompt" },
    { title: "Export Hub", path: "/studio/exporthub" },
    // { title: "Governence", path: "/studio/governence" },
    // { title: "Drift DashBoard", path: "/studio/drift" },
    // { title: "Draft DetailsView", path: "/studio/detailview" },
    { title: "Signal List", path: "/studio/listview" },
  ],
  Loom: [
    { title: "Audit Trail", path: "/audittrails" },
    // { title: "Brand Lexicon", path: "/brandlexicon" },
    // { title: "Codex Upload", path: "/codex" },
    // { title: "MemoryLoom Dahboard", path: "/memoryloomdashboard" },
    // { title: "Object Detail", path: "/memoryobjectdetails" },
    // { title: "Object List ", path: "/memoryobjectlist" },
    { title: "Seasrch Console", path: "/searchconsole" },
    { title: "Message Automizer", path: "/messageautomizer" },
  ],
  Flow: [
    { title: "Fallback escalation", path: "/fallbackescalation" },
    // { title: "Journey Analytics dashboard", path: "/journeyanalytics" },
    // { title: "Journey Builder", path: "/journeybuilder" },
    // { title: "Journey Detailview", path: "/journeydetail" },
    // { title: "Journey Listview", path: "/journeylist" },
    // { title: "Journey Validator", path: "/journeyvalidator" },
    { title: "Persona Channelmap", path: "/personachannel" },
    // { title: "Signal flow dashboard", path: "/signalflow" },
    // { title: "Signal monitor dashboard", path: "/signalmonitor" },
    // { title: "Trigger Configurator", path: "/triggerconfigurator" },
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

const memoryItems = [
  {
    id: "mem1",
    title: "Q2 Campaign Headline",
    type: "snippet",
    lastUsed: "3h ago",
    toneScore: 87,
    tags: ["headline", "promotion"],
  },
  {
    id: "mem2",
    title: "Product Feature Description",
    type: "snippet",
    lastUsed: "Yesterday",
    toneScore: 82,
    tags: ["product", "features"],
  },
  {
    id: "mem3",
    title: "Customer Pain Points",
    type: "prompt",
    lastUsed: "2d ago",
    toneScore: 88,
    tags: ["research", "customer"],
  },
  {
    id: "mem4",
    title: "Brand Voice Guidelines",
    type: "asset",
    lastUsed: "1w ago",
    toneScore: 90,
    tags: ["brand", "tone"],
  },
  {
    id: "mem5",
    title: "Email Signature Generator",
    type: "prompt",
    lastUsed: "3d ago",
    toneScore: 85,
    tags: ["email", "signature"],
  },
  {
    id: "mem6",
    title: "Social Media CTA Examples",
    type: "snippet",
    lastUsed: "6h ago",
    toneScore: 89,
    tags: ["social", "cta"],
  },
  {
    id: "mem7",
    title: "Compliance Checklist",
    type: "asset",
    lastUsed: "4d ago",
    toneScore: 94,
    tags: ["legal", "compliance"],
  },
  {
    id: "mem8",
    title: "Customer Testimonial Template",
    type: "snippet",
    lastUsed: "5d ago",
    toneScore: 86,
    tags: ["testimonial", "customer"],
  },
];

const PlatformDashboard = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("recent");
  const [pinnedItems, setPinnedItems] = useState([
    {
      id: "pin1",
      title: "Welcome Email Template",
      type: "snippet",
      lastUsed: "2d ago",
      toneScore: 92,
      tags: ["email", "onboarding"],
    },
    {
      id: "pin2",
      title: "Legal Disclaimer v2",
      type: "snippet",
      lastUsed: "5d ago",
      toneScore: 95,
      tags: ["legal", "compliance"],
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<string | null>("Dashboard");
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  // Filter items based on search query
  const filteredItems = searchQuery
    ? memoryItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : memoryItems;

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

  const handlePinItem = (item: {
    id: string;
    title?: string;
    type?: string;
    lastUsed?: string;
    toneScore?: number;
    tags?: string[];
  }) => {
    // Check if already pinned
    const isPinned = pinnedItems.some(
      (pinnedItem) => pinnedItem.id === item.id
    );

    if (isPinned) {
      // Unpin
      setPinnedItems(
        pinnedItems.filter((pinnedItem) => pinnedItem.id !== item.id)
      );
    } else {
      // Pin
      setPinnedItems([
        ...pinnedItems,
        {
          id: item.id,
          title: item.title || "",
          type: item.type || "",
          lastUsed: item.lastUsed || "",
          toneScore: item.toneScore || 0,
          tags: item.tags || [],
        },
      ]);
    }
  };

  const isItemPinned = (itemId: string) => {
    return pinnedItems.some((item) => item.id === itemId);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <button
        className={`fixed right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-12 w-12 bg-indigo-600 text-white rounded-l-md shadow-md transition hover:bg-indigo-700 z-10 ${
          isDrawerOpen ? "hidden" : "flex"
        }`}
        onClick={toggleDrawer}
        aria-label="Open Memory Drawer"
      >
        <Brain className="w-6 h-6" />
      </button>
      {/* Semantic Memory Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-20 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              <Brain className="w-5 h-5 text-indigo-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-800">
                Memory Drawer
              </h2>
            </div>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={toggleDrawer}
              aria-label="Close Memory Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search snippets, prompts, assets..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>

            {/* Natural Language Prompt Examples */}
            {!searchQuery && (
              <div className="mt-2 flex flex-wrap gap-2">
                <button className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md hover:bg-gray-200">
                  Find last quarter's welcome email intro
                </button>
                <button className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md hover:bg-gray-200">
                  Show legal disclaimers
                </button>
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-3 text-sm font-medium text-center ${
                activeTab === "recent"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("recent")}
            >
              <div className="flex items-center justify-center">
                <Clock className="w-4 h-4 mr-1.5" />
                Recent
              </div>
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium text-center ${
                activeTab === "pinned"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("pinned")}
            >
              <div className="flex items-center justify-center">
                <Pin className="w-4 h-4 mr-1.5" />
                Pinned
              </div>
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium text-center ${
                activeTab === "all"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("all")}
            >
              <div className="flex items-center justify-center">
                <Filter className="w-4 h-4 mr-1.5" />
                All Memory
              </div>
            </button>
          </div>

          {/* Memory Content */}
          <div className="flex-grow overflow-y-auto p-4">
            {activeTab === "pinned" && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Pinned Items
                  </h3>
                  <span className="text-xs text-gray-500">
                    {pinnedItems.length} items
                  </span>
                </div>

                {pinnedItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Pin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p>No pinned items yet</p>
                    <p className="text-sm mt-1">
                      Pin frequently used items for quick access
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pinnedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer group"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="ml-3 flex-grow min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {item.title}
                            </h4>
                            <button
                              className="text-yellow-500 hover:text-yellow-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePinItem(item);
                              }}
                            >
                              <Star className="w-4 h-4 fill-current" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Last used: {item.lastUsed} • Tone: {item.toneScore}
                            /100
                          </p>
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {(activeTab === "recent" || activeTab === "all" || searchQuery) && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    {searchQuery
                      ? "Search Results"
                      : activeTab === "recent"
                      ? "Recently Used"
                      : "All Memory Items"}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {filteredItems.length} items
                  </span>
                </div>

                {filteredItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p>No items found</p>
                    <p className="text-sm mt-1">
                      Try different search terms or filters
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {(activeTab === "recent"
                      ? filteredItems.slice(0, 5)
                      : filteredItems
                    ).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer group"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="ml-3 flex-grow min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {item.title}
                            </h4>
                            <button
                              className={`${
                                isItemPinned(item.id)
                                  ? "text-yellow-500"
                                  : "text-gray-400 opacity-0 group-hover:opacity-100"
                              } hover:text-yellow-600`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePinItem(item);
                              }}
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  isItemPinned(item.id) ? "fill-current" : ""
                                }`}
                              />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Last used: {item.lastUsed} • Tone: {item.toneScore}
                            /100
                          </p>
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "recent" &&
                  filteredItems.length > 5 &&
                  !searchQuery && (
                    <div className="mt-4 text-center">
                      <button
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        onClick={() => setActiveTab("all")}
                      >
                        View all {filteredItems.length} items
                      </button>
                    </div>
                  )}
              </>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700">
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Create Snippet
              </button>
              <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700">
                <ExternalLink className="w-4 h-4 mr-1.5" />
                Memory Zone
              </button>
            </div>

            {/* AI Suggestions */}
            <div className="mt-4 border-t border-gray-200 pt-3">
              <div className="text-xs text-gray-500 mb-2">AI Suggestions</div>
              <div className="text-sm text-gray-700">
                You've reused this asset 4 times—want to refresh it?
              </div>
            </div>
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
