import { useState } from "react";
import {
  BellRing,
  X,
  Check,
  Settings,
  Filter,
  ChevronDown,
} from "lucide-react";

// Sample notification data
const initialNotifications = [
  {
    id: 1,
    type: "info",
    message: 'New draft created: "Summer Campaign 2025"',
    timestamp: "2 mins ago",
    read: false,
    module: "Signal Studio",
  },
  {
    id: 2,
    type: "warning",
    message: 'Drift detected in "Q2 Product Launch" content',
    timestamp: "1 hour ago",
    read: false,
    module: "Memory Loom",
  },
  {
    id: 3,
    type: "success",
    message: 'Journey "New Customer Onboarding" is now active',
    timestamp: "3 hours ago",
    read: false,
    module: "Signal Flow",
  },
  {
    id: 4,
    type: "error",
    message: 'Brand guideline violation in draft "Promotional Email"',
    timestamp: "Yesterday",
    read: true,
    module: "Signal Studio",
  },
  {
    id: 5,
    type: "info",
    message: 'New memory objects extracted from "Brand Guidelines 2025"',
    timestamp: "Yesterday",
    read: true,
    module: "Memory Loom",
  },
];

// Available modules for filtering
const modules = [
  "All Modules",
  "Signal Studio",
  "Memory Loom",
  "Signal Flow",
  "SignalCore",
  "SignalScope",
];

const NotificationsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedModule, setSelectedModule] = useState("All Modules");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const togglePanel = () => setIsOpen(!isOpen);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  // Get filtered notifications based on module and status selections
  const getFilteredNotifications = () => {
    return notifications.filter((notification) => {
      const moduleMatch =
        selectedModule === "All Modules" ||
        notification.module === selectedModule;
      const statusMatch =
        selectedStatus === "All" ||
        (selectedStatus === "Read" && notification.read) ||
        (selectedStatus === "Unread" && !notification.read);
      return moduleMatch && statusMatch;
    });
  };

  const filteredNotifications = getFilteredNotifications();

  // UI helpers for notification type styling
  const getTypeIcon = (type) => {
    switch (type) {
      case "info":
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <BellRing size={16} className="text-blue-500" />
          </div>
        );
      case "warning":
        return (
          <div className="bg-yellow-100 p-2 rounded-full">
            <BellRing size={16} className="text-yellow-500" />
          </div>
        );
      case "error":
        return (
          <div className="bg-red-100 p-2 rounded-full">
            <BellRing size={16} className="text-red-500" />
          </div>
        );
      case "success":
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <BellRing size={16} className="text-green-500" />
          </div>
        );
      default:
        return <BellRing size={16} />;
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell with Unread Count Badge */}
      <button
        onClick={togglePanel}
        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        aria-label="Notifications"
      >
        <BellRing size={24} className="text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-md shadow-lg z-50 max-h-[80vh] flex flex-col border border-gray-200">
          {/* Panel Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">Notifications</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-1 rounded hover:bg-gray-100"
                title="Filter notifications"
              >
                <Filter size={18} className="text-gray-600" />
              </button>
              <button
                className="p-1 rounded hover:bg-gray-100"
                title="Notification settings"
              >
                <Settings size={18} className="text-gray-600" />
              </button>
              <button
                onClick={togglePanel}
                className="p-1 rounded hover:bg-gray-100"
                title="Close"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Filter Controls (Tier 2) */}
          {showFilters && (
            <div className="p-3 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2 items-center">
                  <span className="text-sm text-gray-500 w-16">Module:</span>
                  <div className="relative w-full">
                    <select
                      className="w-full p-2 pr-8 text-sm border rounded-md appearance-none bg-white"
                      value={selectedModule}
                      onChange={(e) => setSelectedModule(e.target.value)}
                    >
                      {modules.map((module) => (
                        <option key={module} value={module}>
                          {module}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown size={14} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 items-center">
                  <span className="text-sm text-gray-500 w-16">Status:</span>
                  <div className="relative w-full">
                    <select
                      className="w-full p-2 pr-8 text-sm border rounded-md appearance-none bg-white"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Read">Read</option>
                      <option value="Unread">Unread</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronDown size={14} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="p-2 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <span className="text-xs text-gray-500">
              {filteredNotifications.length} notifications
            </span>
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-600 hover:text-blue-800"
              disabled={!unreadCount}
            >
              Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-grow">
            {filteredNotifications.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {filteredNotifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 flex ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="mr-3 mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <p
                          className={`text-sm ${
                            !notification.read ? "font-semibold" : ""
                          }`}
                        >
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {notification.timestamp}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                            {notification.module}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 rounded hover:bg-gray-200"
                              title="Mark as read"
                            >
                              <Check size={14} className="text-green-600" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 rounded hover:bg-gray-200"
                            title="Delete"
                          >
                            <X size={14} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>No notifications found</p>
              </div>
            )}
          </div>

          {/* Settings Link (Tier 2) */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 flex justify-center"
            >
              Notification Preferences
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;
