// src/admin/pages/Users.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Users as UsersIcon,
  Search,
  CreditCard,
  UserX,
  UserPlus,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  Save,
  Calendar,
  MapPin,
  Briefcase,
  Phone,
} from "lucide-react";
import StateCard from "../components/StateCard";

// Temporary mock data - Replace with API integration
const mockUsersData = [
  {
    id: "USR001",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    role: "Software Engineer",
    profession: "Engineering",
    location: "Bangalore, India",
    joinedDate: "2024-01-15",
    status: "active",
    subscription: {
      plan: "Premium",
      status: "active",
      startDate: "2024-01-20",
      expiresAt: "2025-01-20",
    },
  },
  {
    id: "USR002",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 98765 43211",
    role: "UX Designer",
    profession: "Design",
    location: "Mumbai, India",
    joinedDate: "2024-02-01",
    status: "active",
    subscription: {
      plan: "Professional",
      status: "active",
      startDate: "2024-02-05",
      expiresAt: "2024-08-05",
    },
  },
  {
    id: "USR003",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "+91 98765 43212",
    role: "Data Analyst",
    profession: "Analytics",
    location: "Delhi, India",
    joinedDate: "2024-02-15",
    status: "active",
    subscription: null,
  },
  {
    id: "USR004",
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    phone: "+91 98765 43213",
    role: "Marketing Manager",
    profession: "Marketing",
    location: "Hyderabad, India",
    joinedDate: "2024-03-01",
    status: "active",
    subscription: {
      plan: "Premium",
      status: "active",
      startDate: "2024-03-05",
      expiresAt: "2025-03-05",
    },
  },
  {
    id: "USR005",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 98765 43214",
    role: "Product Manager",
    profession: "Product",
    location: "Pune, India",
    joinedDate: "2024-03-15",
    status: "inactive",
    subscription: null,
  },
  {
    id: "USR006",
    name: "Ananya Iyer",
    email: "ananya.iyer@example.com",
    phone: "+91 98765 43215",
    role: "Frontend Developer",
    profession: "Engineering",
    location: "Chennai, India",
    joinedDate: "2024-04-01",
    status: "active",
    subscription: {
      plan: "Professional",
      status: "active",
      startDate: "2024-04-05",
      expiresAt: "2024-10-05",
    },
  },
  {
    id: "USR007",
    name: "Karthik Nair",
    email: "karthik.nair@example.com",
    phone: "+91 98765 43216",
    role: "DevOps Engineer",
    profession: "Engineering",
    location: "Kochi, India",
    joinedDate: "2024-04-15",
    status: "active",
    subscription: {
      plan: "Premium",
      status: "expired",
      startDate: "2023-04-15",
      expiresAt: "2024-04-15",
    },
  },
  {
    id: "USR008",
    name: "Meera Krishnan",
    email: "meera.krishnan@example.com",
    phone: "+91 98765 43217",
    role: "HR Specialist",
    profession: "Human Resources",
    location: "Ahmedabad, India",
    joinedDate: "2024-05-01",
    status: "active",
    subscription: null,
  },
  {
    id: "USR009",
    name: "Arjun Desai",
    email: "arjun.desai@example.com",
    phone: "+91 98765 43218",
    role: "Full Stack Developer",
    profession: "Engineering",
    location: "Jaipur, India",
    joinedDate: "2024-05-15",
    status: "active",
    subscription: {
      plan: "Basic",
      status: "active",
      startDate: "2024-05-20",
      expiresAt: "2024-11-20",
    },
  },
  {
    id: "USR010",
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    phone: "+91 98765 43219",
    role: "Content Writer",
    profession: "Content",
    location: "Lucknow, India",
    joinedDate: "2024-06-01",
    status: "active",
    subscription: null,
  },
];

const Users = () => {
  // State Management
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch users - Replace with actual API call
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // When backend is ready, replace with actual API call
      setUsers(mockUsersData);
    } catch (err) {
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Calculate statistics dynamically
  const statistics = useMemo(() => {
    const totalUsers = users.length;

    const activeSubscriptions = users.filter(
      (user) => user.subscription?.status === "active",
    ).length;

    const withoutSubscription = users.filter(
      (user) =>
        !user.subscription ||
        user.subscription.status === "none" ||
        user.subscription.status === "expired",
    ).length;

    const recentlyRegistered = users.filter((user) => {
      const joinDate = new Date(user.joinedDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return joinDate >= thirtyDaysAgo;
    }).length;

    return {
      totalUsers,
      activeSubscriptions,
      withoutSubscription,
      recentlyRegistered,
    };
  }, [users]);

  // Filter and search users
  const filteredUsers = useMemo(() => {
    let result = [...users];

    // Apply search
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower),
      );
    }

    // Apply subscription filter
    switch (filterType) {
      case "subscribed":
        result = result.filter(
          (user) => user.subscription?.status === "active",
        );
        break;
      case "no-subscription":
        result = result.filter(
          (user) =>
            !user.subscription ||
            user.subscription.status === "none" ||
            user.subscription.status === "expired",
        );
        break;
      case "expired":
        result = result.filter(
          (user) => user.subscription?.status === "expired",
        );
        break;
      default:
        break;
    }

    // Apply sort
    if (sortOrder === "newest") {
      result.sort((a, b) => new Date(b.joinedDate) - new Date(a.joinedDate));
    } else if (sortOrder === "oldest") {
      result.sort((a, b) => new Date(a.joinedDate) - new Date(b.joinedDate));
    } else if (sortOrder === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [users, searchTerm, filterType, sortOrder]);

  // Handle edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  // Handle save edited user
  const handleSaveUser = async (updatedUser) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        ),
      );
      setIsEditModalOpen(false);
      setEditingUser(null);
      showNotification("User updated successfully", "success");
    } catch (err) {
      showNotification("Failed to update user", "error");
    }
  };

  // Handle delete user
  const handleDeleteUser = (user) => {
    setDeletingUser(user);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete user
  const handleConfirmDelete = async () => {
    if (!deletingUser) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== deletingUser.id),
      );
      setIsDeleteModalOpen(false);
      setDeletingUser(null);
      showNotification("User deleted successfully", "success");
    } catch (err) {
      showNotification("Failed to delete user", "error");
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("all");
    setSortOrder("newest");
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return <UsersLoadingState />;
  }

  // Error state
  if (error) {
    return <UsersErrorState error={error} onRetry={fetchUsers} />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            User Management
          </p>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            Manage Users
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View, manage and monitor all registered CareerSphere users.
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Statistics Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StateCard
          title="Total Users"
          value={statistics.totalUsers}
          icon={<UsersIcon className="w-6 h-6 text-blue-600" />}
          description="Registered users"
          iconBg="bg-blue-50"
        />
        <StateCard
          title="Active Subscriptions"
          value={statistics.activeSubscriptions}
          icon={<CreditCard className="w-6 h-6 text-green-600" />}
          description="Currently subscribed"
          iconBg="bg-green-50"
        />
        <StateCard
          title="Without Subscription"
          value={statistics.withoutSubscription}
          icon={<UserX className="w-6 h-6 text-slate-600" />}
          description="No active plan"
          iconBg="bg-slate-50"
        />
        <StateCard
          title="Recently Registered"
          value={statistics.recentlyRegistered}
          icon={<UserPlus className="w-6 h-6 text-indigo-600" />}
          description="New users"
          iconBg="bg-indigo-50"
        />
      </div>

      {/* Users Management Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        {/* Card Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                All Users
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Showing {filteredUsers.length} registered user
                {filteredUsers.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Search and Filters - Mobile First */}
            <div className="flex flex-col gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-colors"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-700"
                >
                  <option value="all">All Users</option>
                  <option value="subscribed">Subscribed</option>
                  <option value="no-subscription">No Subscription</option>
                  <option value="expired">Expired</option>
                </select>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-700"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name A-Z</option>
                </select>

                {(searchTerm ||
                  filterType !== "all" ||
                  sortOrder !== "newest") && (
                  <button
                    onClick={clearFilters}
                    className="w-full sm:w-auto p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                    title="Clear filters"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                    <span className="sm:hidden text-sm text-slate-600">
                      Clear
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Table - Hidden on mobile */}
        {filteredUsers.length === 0 ? (
          <UsersEmptyState
            hasFilters={searchTerm || filterType !== "all"}
            onClear={clearFilters}
          />
        ) : (
          <>
            {/* Desktop Table View (md and up) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Profile / Role
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Subscription
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Joined Date
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      {/* User */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {getUserInitials(user.name)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">
                              {user.name}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Profile / Role */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm text-slate-700 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                            {user.role || "Not specified"}
                          </p>
                          <p className="text-xs text-slate-500 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {user.location || "Not specified"}
                          </p>
                        </div>
                      </td>

                      {/* Subscription */}
                      <td className="px-6 py-4">
                        {user.subscription?.status === "active" ? (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                              <CheckCircle2 className="w-3 h-3" />
                              {user.subscription.plan || "Active"}
                            </span>
                            {user.subscription.expiresAt && (
                              <p className="text-xs text-slate-500">
                                Expires:{" "}
                                {formatDate(user.subscription.expiresAt)}
                              </p>
                            )}
                          </div>
                        ) : user.subscription?.status === "expired" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                            <AlertCircle className="w-3 h-3" />
                            Expired
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                            No Subscription
                          </span>
                        )}
                      </td>

                      {/* Joined Date */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {formatDate(user.joinedDate)}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            user.status === "active"
                              ? "bg-green-50 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {user.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit user"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (below md) */}
            <div className="md:hidden divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-4 space-y-3">
                  {/* User Info */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {getUserInitials(user.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {user.email}
                        </p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <Briefcase className="w-3 h-3" />
                          {user.role || "Not specified"}
                        </p>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {user.location || "Not specified"}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit user"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Subscription & Status */}
                  <div className="flex flex-wrap items-center gap-2">
                    {user.subscription?.status === "active" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <CheckCircle2 className="w-3 h-3" />
                        {user.subscription.plan || "Active"}
                      </span>
                    ) : user.subscription?.status === "expired" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                        <AlertCircle className="w-3 h-3" />
                        Expired
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        No Subscription
                      </span>
                    )}

                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.status === "active"
                          ? "bg-green-50 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {user.status === "active" ? "Active" : "Inactive"}
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-600">
                      <Calendar className="w-3 h-3" />
                      {formatDate(user.joinedDate)}
                    </span>
                  </div>

                  {/* Subscription Expiry */}
                  {user.subscription?.status === "active" &&
                    user.subscription.expiresAt && (
                      <p className="text-xs text-slate-500">
                        Expires: {formatDate(user.subscription.expiresAt)}
                      </p>
                    )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingUser(null);
          }}
          onSave={handleSaveUser}
        />
      )}

      {/* Delete User Modal */}
      {isDeleteModalOpen && deletingUser && (
        <DeleteUserModal
          user={deletingUser}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingUser(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Notification */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-xl shadow-lg text-sm font-medium z-50 ${
            notification.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

// Loading State Component
const UsersLoadingState = () => (
  <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-slate-200 rounded w-32"></div>
      <div className="h-8 bg-slate-200 rounded w-64"></div>
      <div className="h-4 bg-slate-200 rounded w-48"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
        >
          <div className="h-4 bg-slate-200 rounded w-24 mb-4"></div>
          <div className="h-8 bg-slate-200 rounded w-16"></div>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200">
      <div className="h-8 bg-slate-200 rounded w-full mb-6"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-slate-100 rounded-xl mb-3"></div>
      ))}
    </div>
  </div>
);

// Error State Component
const UsersErrorState = ({ error, onRetry }) => (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-red-50 rounded-full p-4 mb-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        Failed to Load Users
      </h3>
      <p className="text-sm text-slate-500 mb-4 text-center max-w-md px-4">
        {error}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-shadow"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </div>
  </div>
);

// Empty State Component
const UsersEmptyState = ({ hasFilters, onClear }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="bg-slate-100 rounded-full p-4 mb-4">
      {hasFilters ? (
        <Search className="w-12 h-12 text-slate-400" />
      ) : (
        <UsersIcon className="w-12 h-12 text-slate-400" />
      )}
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-1">
      {hasFilters ? "No matching users found" : "No users yet"}
    </h3>
    <p className="text-sm text-slate-500 text-center mb-4 max-w-sm">
      {hasFilters
        ? "Try adjusting your search or filter criteria to find what you're looking for."
        : "When users register on CareerSphere, they will appear here."}
    </p>
    {hasFilters && (
      <button
        onClick={onClear}
        className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
      >
        Clear all filters
      </button>
    )}
  </div>
);

// Edit User Modal Component
const EditUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    role: user.role || "",
    location: user.location || "",
    status: user.status || "active",
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    await onSave({ ...user, ...formData });
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 sticky top-0 bg-white">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Edit User</h3>
            <p className="text-sm text-slate-500 mt-0.5">
              Update user information
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.name ? "border-red-300" : "border-slate-200"
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.email ? "border-red-300" : "border-slate-200"
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Role / Profession
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
              placeholder="e.g., Software Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
              placeholder="e.g., Bangalore, India"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-shadow disabled:opacity-50 w-full sm:w-auto"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete User Modal Component
const DeleteUserModal = ({ user, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="bg-red-50 rounded-full p-3 flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">
                Delete User?
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Are you sure you want to delete {user.name}? This action cannot
                be undone.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="mt-4 p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                {user.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 w-full sm:w-auto"
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? "Deleting..." : "Delete User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
