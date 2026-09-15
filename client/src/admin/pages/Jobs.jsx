import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  AlertTriangle,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock3,
  MapPin,
  Pencil,
  Plus,
  PlusCircle,
  RefreshCw,
  Save,
  Search,
  Trash2,
  Users,
  X,
  Zap,
} from "lucide-react";

import {
  deleteJob,
  getAllJobsAdmin,
  toggleJobStatus,
  toggleUrgent,
  updateJob,
} from "../../redux/slicer/jobSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobs = useSelector((state) => state.jobs?.adminJobs || []);
  const loading = useSelector((state) => state.jobs?.loading || false);
  const error = useSelector((state) => state.jobs?.error || null);

  const deleteLoading = useSelector(
    (state) => state.jobs?.deleteLoading || false,
  );

  const updateLoading = useSelector(
    (state) => state.jobs?.updateLoading || false,
  );

  const successMessage = useSelector(
    (state) => state.jobs?.successMessage || null,
  );

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [sortOrder, setSortOrder] = useState("newest");

  const [editingJob, setEditingJob] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [deleteJobData, setDeleteJobData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [urgentLoadingId, setUrgentLoadingId] = useState(null);
  const [statusLoadingId, setStatusLoadingId] = useState(null);

  const fetchJobs = useCallback(async () => {
    try {
      await dispatch(getAllJobsAdmin()).unwrap();
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set();

    jobs.forEach((job) => {
      const category =
        job?.categoryName ||
        job?.categoryId?.name ||
        job?.category ||
        "";

      if (category) {
        uniqueCategories.add(category);
      }
    });

    return [
      "All Categories",
      ...Array.from(uniqueCategories).sort(),
    ];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    const searchValue = search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter((job) => {
        const title = job?.title?.toLowerCase() || "";
        const company = job?.company?.toLowerCase() || "";
        const location = job?.location?.toLowerCase() || "";

        const category =
          job?.categoryName?.toLowerCase() ||
          job?.categoryId?.name?.toLowerCase() ||
          job?.category?.toLowerCase() ||
          "";

        return (
          title.includes(searchValue) ||
          company.includes(searchValue) ||
          location.includes(searchValue) ||
          category.includes(searchValue)
        );
      });
    }

    if (categoryFilter !== "All Categories") {
      result = result.filter((job) => {
        const category =
          job?.categoryName ||
          job?.categoryId?.name ||
          job?.category ||
          "";

        return category === categoryFilter;
      });
    }

    result.sort((a, b) => {
      switch (sortOrder) {
        case "oldest":
          return (
            new Date(a?.createdAt || 0) -
            new Date(b?.createdAt || 0)
          );

        case "title":
          return (a?.title || "").localeCompare(b?.title || "");

        case "company":
          return (a?.company || "").localeCompare(
            b?.company || "",
          );

        case "applicants":
          return (
            Number(b?.applicantCount || 0) -
            Number(a?.applicantCount || 0)
          );

        case "newest":
        default:
          return (
            new Date(b?.createdAt || 0) -
            new Date(a?.createdAt || 0)
          );
      }
    });

    return result;
  }, [jobs, search, categoryFilter, sortOrder]);

  const totalJobs = jobs.length;

  const activeJobs = jobs.filter(
    (job) => job?.status?.toLowerCase() === "active",
  ).length;

  const urgentJobs = jobs.filter(
    (job) => job?.isUrgent === true,
  ).length;

  const totalApplicants = jobs.reduce(
    (total, job) =>
      total + Number(job?.applicantCount || 0),
    0,
  );

  const jobsThisMonth = jobs.filter((job) => {
    if (!job?.createdAt) return false;

    const createdDate = new Date(job.createdAt);
    const now = new Date();

    return (
      createdDate.getMonth() === now.getMonth() &&
      createdDate.getFullYear() === now.getFullYear()
    );
  }).length;

  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDeadline = (date) => {
    if (!date) return null;

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isDeadlinePassed = (date) => {
    if (!date) return false;

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return false;
    }

    return parsedDate < new Date();
  };

  const handleAddJob = () => {
    navigate("/admin/jobs/create");
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsEditModalOpen(true);
  };

  const handleSaveJob = async (formData) => {
    try {
      const jobId = editingJob?._id || editingJob?.id;

      if (!jobId) return;

      await dispatch(
        updateJob({
          id: jobId,
          jobData: formData,
        }),
      ).unwrap();

      setIsEditModalOpen(false);
      setEditingJob(null);

      await fetchJobs();
    } catch (err) {
      console.error("Failed to update job:", err);
    }
  };

  const handleDeleteClick = (job) => {
    setDeleteJobData(job);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteJob = async () => {
    try {
      const jobId =
        deleteJobData?._id || deleteJobData?.id;

      if (!jobId) return;

      await dispatch(deleteJob(jobId)).unwrap();

      setIsDeleteModalOpen(false);
      setDeleteJobData(null);

      await fetchJobs();
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  const handleToggleStatus = async (job) => {
    try {
      const jobId = job?._id || job?.id;

      if (!jobId) return;

      setStatusLoadingId(jobId);

      await dispatch(toggleJobStatus(jobId)).unwrap();

      await fetchJobs();
    } catch (err) {
      console.error("Failed to toggle job status:", err);
    } finally {
      setStatusLoadingId(null);
    }
  };

  const handleToggleUrgent = async (job) => {
    try {
      const jobId = job?._id || job?.id;

      if (!jobId) return;

      setUrgentLoadingId(jobId);

      await dispatch(toggleUrgent(jobId)).unwrap();

      await fetchJobs();
    } catch (err) {
      console.error("Failed to toggle urgent status:", err);
    } finally {
      setUrgentLoadingId(null);
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setCategoryFilter("All Categories");
    setSortOrder("newest");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
              <Briefcase size={17} />
              Job Management
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Jobs
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage job vacancies, applications and hiring
              priorities.
            </p>
          </div>

          {/* ADD JOB + REFRESH */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAddJob}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
            >
              <Plus size={18} />
              Add Job
            </button>

            <button
              type="button"
              onClick={fetchJobs}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* ================= SUCCESS ================= */}
        {successMessage && (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            <CheckCircle2 size={18} />
            {successMessage}
          </div>
        )}

        {/* ================= ERROR ================= */}
        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <AlertCircle size={18} />

            {typeof error === "string"
              ? error
              : "Something went wrong while loading jobs."}
          </div>
        )}

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
          <StatCard
            icon={<Briefcase size={19} />}
            label="Total Jobs"
            value={totalJobs}
          />

          <StatCard
            icon={<CheckCircle2 size={19} />}
            label="Active Jobs"
            value={activeJobs}
          />

          <StatCard
            icon={<Zap size={19} />}
            label="Urgent Hiring"
            value={urgentJobs}
            urgent
          />

          <StatCard
            icon={<Users size={19} />}
            label="Applicants"
            value={totalApplicants}
          />

          <StatCard
            icon={<Calendar size={19} />}
            label="This Month"
            value={jobsThisMonth}
          />
        </div>

        {/* ================= FILTERS ================= */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by job title, company, location..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="title">Title A-Z</option>
              <option value="company">Company A-Z</option>
              <option value="applicants">
                Most Applicants
              </option>
            </select>

            {(search ||
              categoryFilter !== "All Categories" ||
              sortOrder !== "newest") && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <X size={16} />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Job
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Location
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Experience
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Salary
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Applicants
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Posted
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <TableLoader />
                ) : filteredJobs.length === 0 ? (
                  <EmptyTable />
                ) : (
                  filteredJobs.map((job) => {
                    const jobId = job?._id || job?.id;

                    const deadline = formatDeadline(
                      job?.applicationDeadline,
                    );

                    const deadlinePassed =
                      isDeadlinePassed(
                        job?.applicationDeadline,
                      );

                    return (
                      <tr
                        key={jobId}
                        className="transition hover:bg-slate-50/80"
                      >
                        {/* JOB */}
                        <td className="px-5 py-4">
                          <div className="min-w-[270px]">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-semibold text-slate-900">
                                {job?.title || "Untitled Job"}
                              </p>

                              {job?.isUrgent && (
                                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-red-600">
                                  <Zap size={11} />
                                  Urgent Hiring
                                </span>
                              )}
                            </div>

                            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                              <Building2 size={13} />
                              {job?.company ||
                                "Company not available"}
                            </p>

                            {deadline && (
                              <div
                                className={`mt-2 inline-flex items-center gap-1.5 text-xs font-semibold ${
                                  deadlinePassed
                                    ? "text-red-600"
                                    : "text-amber-600"
                                }`}
                              >
                                <Calendar size={13} />

                                {deadlinePassed
                                  ? `Deadline passed · ${deadline}`
                                  : `Deadline · ${deadline}`}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* CATEGORY */}
                        <td className="px-5 py-4">
                          <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700">
                            {job?.categoryName ||
                              job?.categoryId?.name ||
                              job?.category ||
                              "Uncategorized"}
                          </span>
                        </td>

                        {/* LOCATION */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-slate-600">
                            <MapPin
                              size={15}
                              className="text-slate-400"
                            />

                            {job?.location || "N/A"}
                          </div>
                        </td>

                        {/* EXPERIENCE */}
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {job?.experience || "N/A"}
                        </td>

                        {/* SALARY */}
                        <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                          {job?.salary || "N/A"}
                        </td>

                        {/* APPLICANTS */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                            <Users
                              size={15}
                              className="text-blue-500"
                            />

                            {job?.applicantCount || 0}
                          </div>
                        </td>

                        {/* POSTED */}
                        <td className="px-5 py-4 text-sm text-slate-500">
                          {formatDate(job?.createdAt)}
                        </td>

                        {/* ACTIONS */}
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {/* URGENT */}
                            <button
                              type="button"
                              title={
                                job?.isUrgent
                                  ? "Remove urgent hiring"
                                  : "Mark as urgent hiring"
                              }
                              disabled={
                                urgentLoadingId === jobId
                              }
                              onClick={() =>
                                handleToggleUrgent(job)
                              }
                              className={`rounded-lg p-2 transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                job?.isUrgent
                                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                                  : "text-slate-400 hover:bg-red-50 hover:text-red-600"
                              }`}
                            >
                              <Zap
                                size={17}
                                className={
                                  urgentLoadingId === jobId
                                    ? "animate-pulse"
                                    : ""
                                }
                              />
                            </button>

                            {/* EDIT */}
                            <button
                              type="button"
                              title="Edit Job"
                              onClick={() =>
                                handleEditJob(job)
                              }
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Pencil size={17} />
                            </button>

                            {/* STATUS */}
                            <button
                              type="button"
                              title={
                                job?.status === "active"
                                  ? "Deactivate"
                                  : "Activate"
                              }
                              disabled={
                                statusLoadingId === jobId
                              }
                              onClick={() =>
                                handleToggleStatus(job)
                              }
                              className={`rounded-lg p-2 transition disabled:opacity-50 ${
                                job?.status === "active"
                                  ? "text-emerald-500 hover:bg-emerald-50"
                                  : "text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                              }`}
                            >
                              {statusLoadingId === jobId ? (
                                <RefreshCw
                                  size={17}
                                  className="animate-spin"
                                />
                              ) : (
                                <CheckCircle2 size={17} />
                              )}
                            </button>

                            {/* DELETE */}
                            <button
                              type="button"
                              title="Delete Job"
                              onClick={() =>
                                handleDeleteClick(job)
                              }
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="space-y-4 lg:hidden">
          {loading ? (
            <MobileLoader />
          ) : filteredJobs.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <Briefcase
                size={34}
                className="mx-auto mb-3 text-slate-300"
              />

              <h3 className="font-semibold text-slate-800">
                No jobs found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const jobId = job?._id || job?.id;

              const deadline = formatDeadline(
                job?.applicationDeadline,
              );

              const deadlinePassed = isDeadlinePassed(
                job?.applicationDeadline,
              );

              return (
                <div
                  key={jobId}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div
                    className={`border-l-4 p-4 ${
                      job?.isUrgent
                        ? "border-red-500"
                        : "border-blue-500"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-900">
                            {job?.title || "Untitled Job"}
                          </h3>

                          {job?.isUrgent && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-red-600">
                              <Zap size={10} />
                              Urgent Hiring
                            </span>
                          )}
                        </div>

                        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                          <Building2 size={14} />

                          {job?.company ||
                            "Company not available"}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                          job?.status === "active"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {job?.status || "inactive"}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <InfoItem
                        icon={<MapPin size={14} />}
                        label="Location"
                        value={job?.location || "N/A"}
                      />

                      <InfoItem
                        icon={<Clock3 size={14} />}
                        label="Experience"
                        value={job?.experience || "N/A"}
                      />

                      <InfoItem
                        icon={<Users size={14} />}
                        label="Applicants"
                        value={job?.applicantCount || 0}
                      />

                      <InfoItem
                        icon={<Briefcase size={14} />}
                        label="Category"
                        value={
                          job?.categoryName ||
                          job?.categoryId?.name ||
                          job?.category ||
                          "N/A"
                        }
                      />
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-xs text-slate-400">
                          Salary
                        </p>

                        <p className="text-sm font-bold text-slate-800">
                          {job?.salary || "N/A"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Posted
                        </p>

                        <p className="text-sm font-semibold text-slate-700">
                          {formatDate(job?.createdAt)}
                        </p>
                      </div>

                      {deadline && (
                        <div>
                          <p className="text-xs text-slate-400">
                            Application Deadline
                          </p>

                          <p
                            className={`text-sm font-bold ${
                              deadlinePassed
                                ? "text-red-600"
                                : "text-amber-600"
                            }`}
                          >
                            {deadline}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
                      <button
                        type="button"
                        onClick={() =>
                          handleToggleUrgent(job)
                        }
                        disabled={
                          urgentLoadingId === jobId
                        }
                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                          job?.isUrgent
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-600"
                        }`}
                      >
                        <Zap size={15} />

                        {urgentLoadingId === jobId
                          ? "Updating..."
                          : job?.isUrgent
                            ? "Urgent"
                            : "Mark Urgent"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleEditJob(job)
                        }
                        className="rounded-xl bg-blue-50 p-2.5 text-blue-600 transition hover:bg-blue-100"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteClick(job)
                        }
                        className="rounded-xl bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* RESULT COUNT */}
        {!loading && (
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing{" "}
              <strong className="text-slate-700">
                {filteredJobs.length}
              </strong>{" "}
              of{" "}
              <strong className="text-slate-700">
                {totalJobs}
              </strong>{" "}
              jobs
            </span>
          </div>
        )}
      </div>

      {/* ================= EDIT MODAL ================= */}
      {isEditModalOpen && editingJob && (
        <JobModal
          job={editingJob}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingJob(null);
          }}
          onSave={handleSaveJob}
          loading={updateLoading}
        />
      )}

      {/* ================= DELETE MODAL ================= */}
      {isDeleteModalOpen && deleteJobData && (
        <DeleteModal
          job={deleteJobData}
          loading={deleteLoading}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeleteJobData(null);
          }}
          onConfirm={handleDeleteJob}
        />
      )}
    </div>
  );
};

/* =====================================================
   STAT CARD
===================================================== */

const StatCard = ({
  icon,
  label,
  value,
  urgent = false,
}) => {
  return (
    <div
      className={`rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        urgent
          ? "border-red-100"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            urgent
              ? "bg-red-50 text-red-600"
              : "bg-blue-50 text-blue-600"
          }`}
        >
          {icon}
        </div>

        {urgent && value > 0 && (
          <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">
            Priority
          </span>
        )}
      </div>

      <p className="mt-4 text-xs font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
};

/* =====================================================
   INFO ITEM
===================================================== */

const InfoItem = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="flex items-center gap-1.5 text-slate-400">
        {icon}

        <span className="text-[10px] font-bold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-1 truncate text-xs font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
};

/* =====================================================
   JOB MODAL
===================================================== */

const JobModal = ({
  job,
  onClose,
  onSave,
  loading,
}) => {
  const [formData, setFormData] = useState({
    title: job?.title || "",
    company: job?.company || "",

    categoryId:
      job?.categoryId?._id ||
      job?.categoryId ||
      job?.category ||
      "",

    location: job?.location || "",
    jobType: job?.jobType || "Full Time",
    experience:
      job?.experience || "Select Experience",
    salary: job?.salary || "",
    description: job?.description || "",

    responsibilities:
      Array.isArray(job?.responsibilities) &&
      job.responsibilities.length
        ? job.responsibilities
        : [""],

    requirements:
      Array.isArray(job?.requirements) &&
      job.requirements.length
        ? job.requirements
        : [""],

    skills: Array.isArray(job?.skills)
      ? job.skills
      : [],

    status: job?.status || "active",

    /* NEW */
    isUrgent: Boolean(job?.isUrgent),

    applicationDeadline: job?.applicationDeadline
      ? new Date(job.applicationDeadline)
          .toISOString()
          .split("T")[0]
      : "",
  });

  const [skillInput, setSkillInput] = useState("");

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleArrayChange = (
    field,
    index,
    value,
  ) => {
    setFormData((prev) => {
      const updated = [...prev[field]];

      updated[index] = value;

      return {
        ...prev,
        [field]: updated,
      };
    });
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [
        ...prev[field],
        "",
      ],
    }));
  };

  const removeArrayItem = (
    field,
    index,
  ) => {
    setFormData((prev) => {
      const updated = prev[field].filter(
        (_, i) => i !== index,
      );

      return {
        ...prev,
        [field]:
          updated.length > 0
            ? updated
            : [""],
      };
    });
  };

  const addSkill = () => {
    const value = skillInput.trim();

    if (!value) return;

    const alreadyExists =
      formData.skills.some(
        (skill) =>
          skill.toLowerCase() ===
          value.toLowerCase(),
      );

    if (!alreadyExists) {
      setFormData((prev) => ({
        ...prev,
        skills: [
          ...prev.skills,
          value,
        ],
      }));
    }

    setSkillInput("");
  };

  const removeSkill = (
    skillToRemove,
  ) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter(
        (skill) =>
          skill !== skillToRemove,
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryObjectId =
      typeof formData.categoryId ===
      "object"
        ? formData.categoryId?._id
        : formData.categoryId;

    const jobData = {
      title: formData.title.trim(),

      company:
        formData.company.trim(),

      categoryId:
        categoryObjectId,

      categoryName:
        job?.categoryName ||
        job?.categoryId?.name ||
        job?.category ||
        "Deleted Category",

      location:
        formData.location.trim(),

      jobType:
        formData.jobType,

      experience:
        formData.experience,

      salary:
        formData.salary.trim(),

      description:
        formData.description.trim(),

      responsibilities:
        formData.responsibilities.filter(
          (item) =>
            item.trim(),
        ),

      requirements:
        formData.requirements.filter(
          (item) =>
            item.trim(),
        ),

      skills:
        formData.skills,

      status:
        formData.status,

      /* NEW */
      isUrgent:
        Boolean(formData.isUrgent),

      applicationDeadline:
        formData.applicationDeadline ||
        null,
    };

    onSave(jobData);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Job Management
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
              Edit Job
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto p-5 sm:p-6"
        >
          <div className="space-y-6">
            {/* BASIC INFORMATION */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Briefcase size={16} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Basic Information
                  </h3>

                  <p className="text-xs text-slate-500">
                    Update the main job details.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Job Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="Category ID"
                  name="categoryId"
                  value={
                    typeof formData.categoryId ===
                    "object"
                      ? formData.categoryId?._id ||
                        ""
                      : formData.categoryId
                  }
                  onChange={handleChange}
                  required
                />

                <InputField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />

                <SelectField
                  label="Job Type"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  options={[
                    "Full Time",
                    "Part Time",
                    "Contract",
                    "Temporary",
                    "Internship",
                  ]}
                />

                <SelectField
                  label="Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  options={[
                    "Select Experience",
                    "Fresher",
                    "0-1 Years",
                    "1-2 Years",
                    "2-3 Years",
                    "3-5 Years",
                    "5+ Years",
                  ]}
                />

                <InputField
                  label="Salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. ₹25,000 - ₹40,000"
                />

                <SelectField
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={[
                    "active",
                    "inactive",
                    "closed",
                  ]}
                />
              </div>
            </section>

            {/* HIRING PRIORITY */}
            <section className="rounded-2xl border border-red-100 bg-red-50/50 p-4 sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600">
                  <Zap size={17} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Hiring Priority
                  </h3>

                  <p className="text-xs text-slate-500">
                    Highlight this vacancy when hiring
                    is urgent.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* URGENT */}
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-red-100 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        formData.isUrgent
                          ? "bg-red-100 text-red-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <AlertTriangle size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Urgent Hiring
                      </p>

                      <p className="text-xs text-slate-500">
                        Show urgent badge on this job.
                      </p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    name="isUrgent"
                    checked={formData.isUrgent}
                    onChange={handleChange}
                    className="h-5 w-5 cursor-pointer accent-red-600"
                  />
                </label>

                {/* DEADLINE */}
                <div className="rounded-xl border border-red-100 bg-white p-4">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                    Application Deadline
                  </label>

                  <div className="relative">
                    <Calendar
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="date"
                      name="applicationDeadline"
                      value={
                        formData.applicationDeadline
                      }
                      onChange={handleChange}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </div>
              </div>

              {formData.isUrgent && (
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-white px-3 py-3 text-xs text-red-600">
                  <AlertCircle
                    size={15}
                    className="mt-0.5 shrink-0"
                  />

                  <p>
                    This job will be highlighted as{" "}
                    <strong>
                      URGENT HIRING
                    </strong>{" "}
                    on the jobs listing.
                  </p>
                </div>
              )}
            </section>

            {/* DESCRIPTION */}
            <section>
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Job Description
                </h3>
              </div>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Enter job description..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </section>

            {/* RESPONSIBILITIES */}
            <ArraySection
              title="Responsibilities"
              items={
                formData.responsibilities
              }
              field="responsibilities"
              onChange={
                handleArrayChange
              }
              onAdd={addArrayItem}
              onRemove={
                removeArrayItem
              }
              placeholder="Enter responsibility..."
            />

            {/* REQUIREMENTS */}
            <ArraySection
              title="Requirements"
              items={
                formData.requirements
              }
              field="requirements"
              onChange={
                handleArrayChange
              }
              onAdd={addArrayItem}
              onRemove={
                removeArrayItem
              }
              placeholder="Enter requirement..."
            />

            {/* SKILLS */}
            <section>
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Skills
                </h3>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) =>
                    setSkillInput(
                      e.target.value,
                    )
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter"
                    ) {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Add a skill..."
                  className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={addSkill}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  <Plus size={17} />
                  Add
                </button>
              </div>

              {formData.skills.length >
                0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.skills.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                      >
                        {skill}

                        <button
                          type="button"
                          onClick={() =>
                            removeSkill(
                              skill,
                            )
                          }
                          className="text-blue-400 transition hover:text-red-500"
                        >
                          <X size={13} />
                        </button>
                      </span>
                    ),
                  )}
                </div>
              )}
            </section>
          </div>

          {/* FOOTER */}
          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <RefreshCw
                    size={17}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =====================================================
   INPUT FIELD
===================================================== */

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
};

/* =====================================================
   SELECT FIELD
===================================================== */

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

/* =====================================================
   ARRAY SECTION
===================================================== */

const ArraySection = ({
  title,
  items,
  field,
  onChange,
  onAdd,
  onRemove,
  placeholder,
}) => {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>

        <button
          type="button"
          onClick={() => onAdd(field)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
        >
          <PlusCircle size={16} />
          Add
        </button>
      </div>

      <div className="space-y-3">
        {items.map(
          (item, index) => (
            <div
              key={`${field}-${index}`}
              className="flex gap-2"
            >
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  onChange(
                    field,
                    index,
                    e.target.value,
                  )
                }
                placeholder={placeholder}
                className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />

              <button
                type="button"
                onClick={() =>
                  onRemove(
                    field,
                    index,
                  )
                }
                className="rounded-xl border border-slate-200 px-3 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

/* =====================================================
   DELETE MODAL
===================================================== */

const DeleteModal = ({
  job,
  loading,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <Trash2 size={21} />
        </div>

        <h2 className="mt-5 text-lg font-bold text-slate-900">
          Delete Job?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Are you sure you want to delete{" "}
          <strong className="text-slate-700">
            {job?.title ||
              "this job"}
          </strong>
          ? This action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? (
              <>
                <RefreshCw
                  size={16}
                  className="animate-spin"
                />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete Job
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* =====================================================
   TABLE LOADER
===================================================== */

const TableLoader = () => {
  return (
    <tr>
      <td
        colSpan="8"
        className="px-5 py-16 text-center"
      >
        <RefreshCw
          size={28}
          className="mx-auto animate-spin text-blue-600"
        />

        <p className="mt-3 text-sm font-medium text-slate-500">
          Loading jobs...
        </p>
      </td>
    </tr>
  );
};

/* =====================================================
   EMPTY TABLE
===================================================== */

const EmptyTable = () => {
  return (
    <tr>
      <td
        colSpan="8"
        className="px-5 py-16 text-center"
      >
        <Briefcase
          size={36}
          className="mx-auto text-slate-300"
        />

        <h3 className="mt-3 font-semibold text-slate-800">
          No jobs found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or filters.
        </p>
      </td>
    </tr>
  );
};

/* =====================================================
   MOBILE LOADER
===================================================== */

const MobileLoader = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <RefreshCw
        size={28}
        className="mx-auto animate-spin text-blue-600"
      />

      <p className="mt-3 text-sm font-medium text-slate-500">
        Loading jobs...
      </p>
    </div>
  );
};

export default Jobs;