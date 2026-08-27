// src/admin/pages/Applications.jsx
import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Trash2,
  X,
  Eye,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  Users,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import StateCard from "../components/StateCard";
import { useJobCategories } from "../context/JobCategoryContext";
import { useApplications } from "../context/ApplicationContext";

const Applications = () => {
  const navigate = useNavigate();
  const { categories, activeCategories } = useJobCategories();
  const { applications, loading, error, fetchApplications, deleteApplication } =
    useApplications();

  // State Management
  const [searchTerm, setSearchTerm] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deletingApplication, setDeletingApplication] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalApplications = applications.length;
    const freshers = applications.filter(
      (app) => app.experienceType === "Fresher",
    ).length;
    const experienced = applications.filter(
      (app) => app.experienceType === "Experienced",
    ).length;
    const shortlisted = applications.filter(
      (app) => app.status === "shortlisted",
    ).length;

    return { totalApplications, freshers, experienced, shortlisted };
  }, [applications]);

  // Category name resolution
  const categoryNameById = useMemo(() => {
    return categories.reduce((lookup, category) => {
      lookup[category.id] = category.name;
      return lookup;
    }, {});
  }, [categories]);

  const getApplicationCategoryName = useCallback(
    (application) =>
      categoryNameById[application.categoryId] ||
      application.categoryName ||
      "Deleted Category",
    [categoryNameById],
  );

  // Filter and search applications
  const filteredApplications = useMemo(() => {
    let result = [...applications];

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(
        (app) =>
          app.fullName.toLowerCase().includes(searchLower) ||
          app.email.toLowerCase().includes(searchLower) ||
          app.phoneNumber.toLowerCase().includes(searchLower) ||
          app.currentLocation.toLowerCase().includes(searchLower),
      );
    }

    if (experienceFilter !== "all") {
      result = result.filter((app) => app.experienceType === experienceFilter);
    }

    if (categoryFilter !== "all") {
      result = result.filter((app) => app.categoryId === categoryFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((app) => app.status === statusFilter);
    }

    result.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));

    return result;
  }, [
    applications,
    searchTerm,
    experienceFilter,
    categoryFilter,
    statusFilter,
  ]);

  // Handle view application
  const handleViewApplication = (applicationId) => {
    navigate(`/admin/applications/${applicationId}`);
  };

  // Handle delete application
  const handleDeleteApplication = (application) => {
    setDeletingApplication(application);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!deletingApplication) return;

    const result = await deleteApplication(deletingApplication.id);
    if (result.success) {
      setIsDeleteModalOpen(false);
      setDeletingApplication(null);
      showNotification("Application deleted successfully", "success");
    } else {
      showNotification("Failed to delete application", "error");
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setExperienceFilter("all");
    setCategoryFilter("all");
    setStatusFilter("all");
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "shortlisted":
        return "bg-green-50 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  // Loading state
  if (loading) return <ApplicationsLoadingState />;

  // Error state
  if (error)
    return <ApplicationsErrorState error={error} onRetry={fetchApplications} />;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          Application Management
        </p>
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
          Manage Applications
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          View and manage all job applications submitted to CareerSphere.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StateCard
          title="Total Applications"
          value={statistics.totalApplications}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          description="All applications"
          iconBg="bg-blue-50"
        />
        <StateCard
          title="Freshers"
          value={statistics.freshers}
          icon={<GraduationCap className="w-6 h-6 text-indigo-600" />}
          description="Fresh graduates"
          iconBg="bg-indigo-50"
        />
        <StateCard
          title="Experienced"
          value={statistics.experienced}
          icon={<Briefcase className="w-6 h-6 text-purple-600" />}
          description="Experienced candidates"
          iconBg="bg-purple-50"
        />
        <StateCard
          title="Shortlisted"
          value={statistics.shortlisted}
          icon={<CheckCircle2 className="w-6 h-6 text-green-600" />}
          description="Shortlisted candidates"
          iconBg="bg-green-50"
        />
      </div>

      {/* Applications Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                All Applications
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Showing {filteredApplications.length} application
                {filteredApplications.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-700"
              >
                <option value="all">All Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="Experienced">Experienced</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-700"
              >
                <option value="all">All Categories</option>
                {activeCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-700"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>

              {(searchTerm ||
                experienceFilter !== "all" ||
                categoryFilter !== "all" ||
                statusFilter !== "all") && (
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

        {/* Content */}
        {filteredApplications.length === 0 ? (
          <ApplicationsEmptyState
            hasFilters={
              searchTerm ||
              experienceFilter !== "all" ||
              categoryFilter !== "all" ||
              statusFilter !== "all"
            }
            onClear={clearFilters}
          />
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full min-w-[1100px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[250px] w-[30%]">
                      Applicant
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[150px] w-[15%]">
                      Phone
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[150px] w-[15%]">
                      Location
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[110px] w-[12%]">
                      Experience
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[180px] w-[18%]">
                      Category
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[110px] w-[10%]">
                      Status
                    </th>
                    <th className="text-right px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap w-[100px] min-w-[100px]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredApplications.map((application) => (
                    <tr
                      key={application.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Applicant */}
                      <td className="px-4 py-4 min-w-[250px]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {getInitials(application.fullName)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-800 truncate">
                              {application.fullName}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {application.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-4 min-w-[150px]">
                        <p className="text-sm text-slate-700 whitespace-nowrap">
                          {application.phoneNumber}
                        </p>
                      </td>

                      {/* Location */}
                      <td className="px-4 py-4 min-w-[150px]">
                        <p className="text-sm text-slate-700 flex items-center gap-1.5 whitespace-nowrap">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span className="truncate">
                            {application.currentLocation}
                          </span>
                        </p>
                      </td>

                      {/* Experience */}
                      <td className="px-4 py-4 min-w-[110px]">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            application.experienceType === "Fresher"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-purple-50 text-purple-700"
                          }`}
                        >
                          {application.experienceType}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-4 min-w-[180px]">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 whitespace-nowrap max-w-full truncate">
                          {getApplicationCategoryName(application)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 min-w-[110px]">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusBadge(
                            application.status,
                          )}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              application.status === "shortlisted"
                                ? "bg-green-500"
                                : application.status === "rejected"
                                  ? "bg-red-500"
                                  : "bg-amber-500"
                            }`}
                          ></span>
                          {application.status.charAt(0).toUpperCase() +
                            application.status.slice(1)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 w-[100px] min-w-[100px]">
                        <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                          <button
                            onClick={() =>
                              handleViewApplication(application.id)
                            }
                            className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors flex-shrink-0"
                            title="View application"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteApplication(application)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0"
                            title="Delete application"
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

            {/* Mobile/Tablet Cards */}
            <div className="lg:hidden divide-y divide-slate-100">
              {filteredApplications.map((application) => (
                <div key={application.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {getInitials(application.fullName)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800">
                          {application.fullName}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {application.email}
                        </p>
                        <p className="text-xs text-slate-500">
                          {application.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleViewApplication(application.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteApplication(application)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {application.currentLocation}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        application.experienceType === "Fresher"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-purple-50 text-purple-700"
                      }`}
                    >
                      {application.experienceType}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {getApplicationCategoryName(application)}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        application.status,
                      )}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          application.status === "shortlisted"
                            ? "bg-green-500"
                            : application.status === "rejected"
                              ? "bg-red-500"
                              : "bg-amber-500"
                        }`}
                      ></span>
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && deletingApplication && (
        <DeleteApplicationModal
          application={deletingApplication}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingApplication(null);
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

// Delete Application Modal
const DeleteApplicationModal = ({ application, onClose, onConfirm }) => {
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
                Delete Application?
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Are you sure you want to delete the application from{" "}
                {application.fullName}? This action cannot be undone.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
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
              {isDeleting ? "Deleting..." : "Delete Application"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading State
const ApplicationsLoadingState = () => (
  <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-slate-200 rounded w-32"></div>
      <div className="h-8 bg-slate-200 rounded w-64"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="h-4 bg-slate-200 rounded w-24 mb-4"></div>
          <div className="h-8 bg-slate-200 rounded w-16"></div>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="h-8 bg-slate-200 rounded w-full mb-6"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-slate-100 rounded-xl mb-3"></div>
      ))}
    </div>
  </div>
);

// Error State
const ApplicationsErrorState = ({ error, onRetry }) => (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-red-50 rounded-full p-4 mb-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        Failed to Load Applications
      </h3>
      <p className="text-sm text-slate-500 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </div>
  </div>
);

// Empty State
const ApplicationsEmptyState = ({ hasFilters, onClear }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="bg-slate-100 rounded-full p-4 mb-4">
      {hasFilters ? (
        <Search className="w-12 h-12 text-slate-400" />
      ) : (
        <Users className="w-12 h-12 text-slate-400" />
      )}
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-1">
      {hasFilters ? "No matching applications" : "No applications yet"}
    </h3>
    <p className="text-sm text-slate-500 text-center mb-4 max-w-sm">
      {hasFilters
        ? "Try adjusting your search or filter criteria."
        : "When users apply for jobs, their applications will appear here."}
    </p>
    {hasFilters && (
      <button
        onClick={onClear}
        className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl"
      >
        Clear all filters
      </button>
    )}
  </div>
);

export default Applications;
