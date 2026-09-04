import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getSavedJobs,
  unsaveJob,
} from "../redux/slicer/jobApplicationSlice";

import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  BookmarkCheck,
  CalendarDays,
  CircleDollarSign,
  Building2,
  ChevronDown,
  ExternalLink,
  X,
  Loader2,
  FileText,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

// =========================================================
// STATUS CONFIG
// =========================================================

const statusConfig = {
  pending: {
    label: "Applied",
    icon: FileText,
    className: "bg-blue-50 text-blue-700 border-blue-100",
  },

  applied: {
    label: "Applied",
    icon: FileText,
    className: "bg-blue-50 text-blue-700 border-blue-100",
  },

  "under review": {
    label: "Under Review",
    icon: Clock3,
    className: "bg-amber-50 text-amber-700 border-amber-100",
  },

  shortlisted: {
    label: "Interview",
    icon: FileText,
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },

  interview: {
    label: "Interview",
    icon: FileText,
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },

  rejected: {
    label: "Rejected",
    icon: X,
    className: "bg-red-50 text-red-600 border-red-100",
  },
};

// =========================================================
// HELPERS
// =========================================================

const formatDate = (date) => {
  if (!date) return "Recently";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusDetails = (status) => {
  const normalizedStatus = String(status || "pending")
    .toLowerCase()
    .trim();

  return (
    statusConfig[normalizedStatus] || {
      label:
        normalizedStatus.charAt(0).toUpperCase() +
        normalizedStatus.slice(1),
      icon: FileText,
      className:
        "bg-slate-50 text-slate-600 border-slate-100",
    }
  );
};

// =========================================================
// COMPONENT
// =========================================================

const SavedApplication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    savedJobs = [],
    savedJobsLoading,
    savedJobsError,
    unsaving,
  } = useSelector((state) => state.application);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Applications");

  const [statusOpen, setStatusOpen] = useState(false);
  const [removingJobId, setRemovingJobId] = useState(null);

  // =======================================================
  // GET SAVED JOBS
  // =======================================================

  useEffect(() => {
    dispatch(getSavedJobs());
  }, [dispatch]);

  // =======================================================
  // REMOVE SAVED JOB
  // =======================================================

  const removeApplication = async (jobId) => {
    if (!jobId) return;

    try {
      setRemovingJobId(jobId);

      await dispatch(unsaveJob(jobId)).unwrap();

      // No local filtering required.
      // Redux unsaveJob reducer should remove it from savedJobs.
    } catch (error) {
      console.error("Remove saved job error:", error);
    } finally {
      setRemovingJobId(null);
    }
  };

  // =======================================================
  // NORMALIZE BACKEND DATA
  // =======================================================

  const normalizedJobs = useMemo(() => {
    return savedJobs.map((item) => {
      /*
       * Depending on your SavedJob controller,
       * item may directly contain job fields
       * OR contain a populated `job` object.
       */

      const backendJob = item?.job || item;

      const companyName =
        backendJob?.company?.name ||
        backendJob?.companyName ||
        (typeof backendJob?.company === "string"
          ? backendJob.company
          : "") ||
        "Company";

      const jobTitle =
        backendJob?.title ||
        backendJob?.jobTitle ||
        "Job Opportunity";

      const location =
        backendJob?.location ||
        backendJob?.jobLocation ||
        "Location not specified";

      const jobType =
        backendJob?.jobType ||
        backendJob?.type ||
        "Full Time";

      const workMode =
        backendJob?.workMode ||
        backendJob?.workType ||
        "Not specified";

      const experience =
        backendJob?.experience ||
        backendJob?.experienceLevel ||
        "Not specified";

      const salary =
        backendJob?.salary ||
        backendJob?.salaryRange ||
        "Not disclosed";

      const companyLogo =
        backendJob?.companyLogo?.displayUrl ||
        backendJob?.companyLogo?.url ||
        backendJob?.companyLogo ||
        null;

      const jobId =
        backendJob?._id ||
        backendJob?.id ||
        item?._id;

      /*
       * If your SavedJob model stores createdAt,
       * this is the saved date.
       */
      const savedDate =
        item?.createdAt ||
        item?.savedAt ||
        item?.savedDate;

      /*
       * If the saved job also has application information,
       * use that status/date.
       */
      const applicationStatus =
        item?.application?.status ||
        item?.status ||
        backendJob?.applicationStatus ||
        null;

      const appliedDate =
        item?.application?.appliedAt ||
        item?.appliedAt ||
        backendJob?.appliedAt ||
        null;

      return {
        ...item,

        id: jobId,
        title: jobTitle,
        company: companyName,
        location,
        experience,
        salary,
        type: jobType,
        workMode,

        logo:
          companyLogo ||
          companyName?.charAt(0)?.toUpperCase() ||
          "C",

        logoUrl: companyLogo,

        savedDate: formatDate(savedDate),
        appliedDate: appliedDate
          ? formatDate(appliedDate)
          : "Not applied",

        status: applicationStatus,
      };
    });
  }, [savedJobs]);

  // =======================================================
  // FILTER OPTIONS
  // =======================================================

  const statusOptions = [
    "All Applications",
    "Applied",
    "Under Review",
    "Interview",
    "Rejected",
  ];

  // =======================================================
  // FILTER SAVED JOBS
  // =======================================================

  const filteredApplications = useMemo(() => {
    const query = search.toLowerCase().trim();

    return normalizedJobs.filter((application) => {
      const matchesSearch =
        !query ||
        application.title
          .toLowerCase()
          .includes(query) ||
        application.company
          .toLowerCase()
          .includes(query) ||
        application.location
          .toLowerCase()
          .includes(query);

      const statusDetails = getStatusDetails(
        application.status
      );

      const matchesStatus =
        statusFilter === "All Applications" ||
        statusDetails.label === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [
    normalizedJobs,
    search,
    statusFilter,
  ]);

  // =======================================================
  // STATUS COUNTS
  // =======================================================

  const getStatusCount = (status) => {
    if (status === "All Applications") {
      return normalizedJobs.length;
    }

    return normalizedJobs.filter((application) => {
      const statusDetails = getStatusDetails(
        application.status
      );

      return statusDetails.label === status;
    }).length;
  };

  // =======================================================
  // APPLICATION CARD
  // =======================================================

  const ApplicationCard = ({ application }) => {
    const statusDetails = getStatusDetails(
      application.status
    );

    const StatusIcon = statusDetails.icon;

    const isRemoving =
      removingJobId === application.id || unsaving;

    return (
      <article className="group w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/60">

        {/* =================================================
            TOP STATUS BAR
        ================================================== */}

        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/70 px-4 py-2.5 sm:px-5">

          {application.status ? (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold sm:text-xs ${statusDetails.className}`}
            >
              <StatusIcon size={13} />
              {statusDetails.label}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500 sm:text-xs">
              <BookmarkCheck size={13} />
              Saved
            </span>
          )}

          <span className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 sm:text-xs">
            <Clock3 size={13} />
            Saved {application.savedDate}
          </span>
        </div>

        {/* =================================================
            CARD BODY
        ================================================== */}

        <div className="min-w-0 p-4 sm:p-5">

          {/* TOP INFORMATION */}

          <div className="flex min-w-0 items-start gap-3 sm:gap-4">

            {/* LOGO */}

            {application.logoUrl ? (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm sm:h-14 sm:w-14">
                <img
                  src={application.logoUrl}
                  alt={application.company}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-blue-50 text-lg font-black text-blue-600 shadow-sm sm:h-14 sm:w-14 sm:text-xl">
                {application.logo}
              </div>
            )}

            {/* JOB INFORMATION */}

            <div className="min-w-0 flex-1">

              <div className="flex min-w-0 items-start justify-between gap-2">

                <div className="min-w-0">

                  <h2 className="break-words text-sm font-bold leading-5 text-slate-900 transition group-hover:text-blue-600 sm:text-base">
                    {application.title}
                  </h2>

                  <p className="mt-1 flex min-w-0 items-center gap-1.5 text-xs font-semibold text-slate-600 sm:text-sm">
                    <Building2
                      size={13}
                      className="shrink-0 text-slate-400"
                    />

                    <span className="break-words">
                      {application.company}
                    </span>
                  </p>
                </div>

                {/* REMOVE */}

                <button
                  type="button"
                  onClick={() =>
                    removeApplication(application.id)
                  }
                  disabled={isRemoving}
                  aria-label="Remove saved job"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isRemoving ? (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <X size={17} />
                  )}
                </button>

              </div>

              {/* JOB META */}

              <div className="mt-3 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-[10px] text-slate-500 sm:gap-x-4 sm:text-xs">

                <span className="flex items-center gap-1.5">
                  <MapPin
                    size={13}
                    className="shrink-0 text-slate-400"
                  />
                  <span className="break-words">
                    {application.location}
                  </span>
                </span>

                <span className="flex items-center gap-1.5">
                  <BriefcaseBusiness
                    size={13}
                    className="shrink-0 text-slate-400"
                  />
                  <span>
                    {application.experience}
                  </span>
                </span>

                <span className="flex items-center gap-1.5">
                  <CircleDollarSign
                    size={13}
                    className="shrink-0 text-slate-400"
                  />
                  <span>
                    {application.salary}
                  </span>
                </span>

              </div>

            </div>
          </div>

          {/* =================================================
              JOB DETAILS
          ================================================== */}

          <div className="mt-4 grid min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-3">

            <div className="min-w-0 rounded-lg bg-slate-50 px-3 py-2.5">
              <p className="text-[10px] font-medium text-slate-400">
                Job Type
              </p>

              <p className="mt-1 break-words text-xs font-semibold text-slate-700">
                {application.type}
              </p>
            </div>

            <div className="min-w-0 rounded-lg bg-slate-50 px-3 py-2.5">
              <p className="text-[10px] font-medium text-slate-400">
                Work Mode
              </p>

              <p className="mt-1 break-words text-xs font-semibold text-slate-700">
                {application.workMode}
              </p>
            </div>

            <div className="min-w-0 rounded-lg bg-slate-50 px-3 py-2.5">
              <p className="text-[10px] font-medium text-slate-400">
                Applied On
              </p>

              <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <CalendarDays
                  size={13}
                  className="shrink-0 text-slate-400"
                />

                {application.appliedDate}
              </p>
            </div>

          </div>

          {/* =================================================
              ACTIONS
          ================================================== */}

          <div className="mt-4 flex min-w-0 flex-col gap-2.5 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-[10px] text-slate-400 sm:text-xs">
              Saved job
            </p>

            <div className="flex w-full min-w-0 gap-2 sm:w-auto">

              <button
                type="button"
                onClick={() =>
                  removeApplication(application.id)
                }
                disabled={isRemoving}
                className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-4"
              >
                {isRemoving ? (
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                ) : (
                  <BookmarkCheck
                    size={15}
                    className="shrink-0"
                  />
                )}

                <span>
                  {isRemoving ? "Removing..." : "Saved"}
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(`/jobs/${application.id}`)
                }
                className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md sm:flex-none sm:px-4"
              >
                <span>View Details</span>

                <ExternalLink
                  size={14}
                  className="shrink-0"
                />
              </button>

            </div>
          </div>

        </div>
      </article>
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (savedJobsLoading && savedJobs.length === 0) {
    return (
      <main className="min-h-screen w-full bg-slate-50">
        <div className="flex min-h-[70vh] items-center justify-center px-4">

          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
              <Loader2
                size={28}
                className="animate-spin text-blue-600"
              />
            </div>

            <h2 className="mt-4 text-base font-bold text-slate-900">
              Loading saved jobs...
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Please wait while we fetch your saved jobs.
            </p>

          </div>

        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (savedJobsError && savedJobs.length === 0) {
    return (
      <main className="min-h-screen w-full bg-slate-50">
        <div className="flex min-h-[70vh] items-center justify-center px-4">

          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <AlertCircle size={27} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Failed to load saved jobs
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {savedJobsError}
            </p>

            <button
              type="button"
              onClick={() => dispatch(getSavedJobs())}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 sm:text-sm"
            >
              <RefreshCw size={15} />
              Try Again
            </button>

          </div>

        </div>
      </main>
    );
  }

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-50">

      <div className="mx-auto w-full max-w-7xl min-w-0 px-3 py-5 sm:px-5 sm:py-7 lg:px-6 xl:px-0">

        {/* =================================================
            PAGE HEADER
        ================================================== */}

        <section className="mb-5 min-w-0">

          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div className="min-w-0">

              <div className="mb-2 flex items-center gap-2">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <BookmarkCheck size={19} />
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  My Applications
                </span>

              </div>

              <h1 className="break-words text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Saved Applications
              </h1>

              <p className="mt-1.5 max-w-2xl break-words text-xs leading-5 text-slate-500 sm:text-sm">
                Keep track of jobs you've saved and manage
                your applications from one place.
              </p>

            </div>

            {/* COUNT */}

            <div className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

              <BookmarkCheck
                size={18}
                className="text-blue-600"
              />

              <div>

                <p className="text-lg font-black leading-none text-slate-900">
                  {normalizedJobs.length}
                </p>

                <p className="mt-1 text-[10px] font-medium text-slate-400">
                  Saved Jobs
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            SEARCH + FILTER
        ================================================== */}

        <section className="mb-5 min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">

          <div className="flex min-w-0 flex-col gap-2.5 sm:flex-row">

            {/* SEARCH */}

            <div className="relative min-w-0 flex-1">

              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search saved jobs or companies..."
                className="h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-xs font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:text-sm"
              />

            </div>

            {/* STATUS FILTER */}

            <div className="relative min-w-0 sm:w-52">

              <button
                type="button"
                onClick={() =>
                  setStatusOpen((prev) => !prev)
                }
                className="flex h-11 w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-white sm:text-sm"
              >

                <span className="min-w-0 truncate">
                  {statusFilter}
                </span>

                <ChevronDown
                  size={16}
                  className={`shrink-0 text-slate-400 transition-transform ${
                    statusOpen ? "rotate-180" : ""
                  }`}
                />

              </button>

              {statusOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">

                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        setStatusFilter(status);
                        setStatusOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition sm:text-sm ${
                        statusFilter === status
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >

                      <span>{status}</span>

                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">
                        {getStatusCount(status)}
                      </span>

                    </button>
                  ))}

                </div>
              )}

            </div>

          </div>

        </section>

        {/* =================================================
            RESULTS HEADER
        ================================================== */}

        <div className="mb-4 flex min-w-0 items-center justify-between gap-3">

          <div className="min-w-0">

            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              Your Saved Jobs
            </h2>

            <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">
              {filteredApplications.length} job
              {filteredApplications.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>

          </div>

          {statusFilter !== "All Applications" && (
            <button
              type="button"
              onClick={() =>
                setStatusFilter("All Applications")
              }
              className="shrink-0 text-[11px] font-bold text-blue-600 hover:text-blue-700 sm:text-xs"
            >
              Clear filter
            </button>
          )}

        </div>

        {/* =================================================
            APPLICATION LIST
        ================================================== */}

        {filteredApplications.length > 0 ? (

          <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-2">

            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
              />
            ))}

          </div>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================== */

          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:py-20">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-500">
              <BookmarkCheck size={28} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              No saved jobs found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500 sm:text-sm">
              {search
                ? "We couldn't find any saved jobs matching your search."
                : "You don't have any saved jobs yet."}
            </p>

            {(search ||
              statusFilter !== "All Applications") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All Applications");
                }}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 sm:text-sm"
              >
                Clear Search & Filter
              </button>
            )}

          </div>

        )}

      </div>
    </main>
  );
};

export default SavedApplication;