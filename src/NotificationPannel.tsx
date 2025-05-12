import { useState } from "react";
import {
  Bell,
  CheckSquare,
  Filter,
  Settings,
  X,
  AlertTriangle,
  FileText,
  ChevronDown,
  CheckCircle,
  MessageCircle,
} from "lucide-react";

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "alert",
      message: 'Signal Studio: "Q1 Campaign" draft requires approval',
      timestamp: "Just now",
      read: false,
      module: "Signal Studio",
    },
    {
      id: 2,
      type: "validation",
      message: "Memory Loom: New brand terms added to lexicon",
      timestamp: "2 hours ago",
      read: false,
      module: "Memory Loom",
    },
    {
      id: 3,
      type: "alert",
      message: "SignalCore: Performance threshold exceeded for Journey #234",
      timestamp: "3 hours ago",
      read: false,
      module: "SignalCore",
    },
    {
      id: 4,
      type: "drift",
      message: "Brand drift detected in recent content - review suggested",
      timestamp: "Yesterday",
      read: true,
      module: "Signal Studio",
    },
    {
      id: 5,
      type: "system",
      message: 'Signal Flow journey "Customer Onboarding" is now active',
      timestamp: "Yesterday",
      read: true,
      module: "Signal Flow",
    },
    {
      id: 6,
      type: "system",
      message: "Weekly performance report is now available",
      timestamp: "3 days ago",
      read: true,
      module: "SignalScope",
    },
  ]);

  const [moduleFilter, setModuleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Get icon based on notification type
  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "validation":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "drift":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "system":
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // Mark single notification as read
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Delete notification
  const deleteNotification = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    const moduleMatch =
      moduleFilter === "All" || notification.module === moduleFilter;
    const statusMatch =
      statusFilter === "All" ||
      (statusFilter === "Unread" && !notification.read) ||
      (statusFilter === "Read" && notification.read);
    return moduleMatch && statusMatch;
  });

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // Available modules for filter
  const modules = [
    "All",
    "Signal Studio",
    "Memory Loom",
    "Signal Flow",
    "SignalCore",
    "SignalScope",
  ];

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg w-full max-w-md border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
          {unreadCount > 0 && (
            <span className="px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full"
            aria-label="Filter"
          >
            <Filter className="w-5 h-5" />
          </button>
          <button
            onClick={markAllAsRead}
            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full"
            aria-label="Mark all as read"
          >
            <CheckSquare className="w-5 h-5" />
          </button>
          <button
            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Module
              </label>
              <div className="relative">
                <select
                  value={moduleFilter}
                  onChange={(e) => setModuleFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {modules.map((module) => (
                    <option key={module} value={module}>
                      {module}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Status
              </label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All">All</option>
                  <option value="Read">Read</option>
                  <option value="Unread">Unread</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification List */}
      <div className="overflow-y-auto max-h-96">
        {filteredNotifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications match your filters
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <li
                key={notification.id}
                className={`px-4 py-3 hover:bg-gray-50 ${
                  !notification.read ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div>
                      <p
                        className={`text-sm ${
                          !notification.read ? "font-medium" : "text-gray-800"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.timestamp} · {notification.module}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-full"
                        aria-label="Mark as read"
                      >
                        <CheckSquare className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-full"
                      aria-label="Delete"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 text-right border-t border-gray-200 rounded-b-lg">
        <a
          href="#"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Notification Settings
        </a>
      </div>
    </div>
  );
};

export default NotificationsPanel;
