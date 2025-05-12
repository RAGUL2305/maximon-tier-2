import { useState, useEffect } from "react";
import {
  Search,
  Pin,
  PinOff,
  Info,
  Bookmark,
  Clock,
  AlertTriangle,
  ChevronRight,
  X,
} from "lucide-react";

const MemoryDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [memoryObjects, setMemoryObjects] = useState([]);
  const [pinnedItems, setPinnedItems] = useState([]);
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

  const togglePin = (id) => {
    const updatedObjects = memoryObjects.map((obj) => {
      if (obj.id === id) {
        const newPinned = !obj.isPinned;

        // Update pinned items list
        if (newPinned) {
          setPinnedItems([...pinnedItems, obj]);
        } else {
          setPinnedItems(pinnedItems.filter((item) => item.id !== id));
        }

        return { ...obj, isPinned: newPinned };
      }
      return obj;
    });

    setMemoryObjects(updatedObjects);
  };

  const filteredMemory = memoryObjects.filter(
    (obj) =>
      obj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obj.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayItems =
    activeTab === "pinned"
      ? pinnedItems
      : activeTab === "recent"
      ? filteredMemory.sort((a, b) =>
          a.lastAccessed.localeCompare(b.lastAccessed)
        )
      : filteredMemory;

  // Type icon mapping
  const getTypeIcon = (type) => {
    switch (type) {
      case "document":
        return <Bookmark className="h-4 w-4 text-blue-500" />;
      case "snippet":
        return <Info className="h-4 w-4 text-green-500" />;
      case "lexicon":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="fixed right-0 top-24 h-screen z-50 flex">
      {/* Drawer tab */}
      <div
        className="bg-blue-600 text-white p-2 rounded-l-md shadow-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col items-center">
          <Memory className="h-6 w-6 mb-2" />
          <span className="text-xs font-semibold writing-mode-vertical transform rotate-180">
            Memory Drawer
          </span>
        </div>
      </div>

      {/* Main drawer */}
      <div
        className={`bg-white border-l border-gray-200 shadow-lg transition-all duration-300 flex flex-col ${
          isOpen ? "w-80" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="font-bold text-lg text-blue-700">Memory Drawer</h3>
          <button
            onClick={() => setIsOpen(false)}
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
            displayItems.map((item) => (
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
  );
};

// Helper component for the vertical text on the tab
const Memory = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    <path d="M12 8v4l3 3" />
  </svg>
);

export default MemoryDrawer;
