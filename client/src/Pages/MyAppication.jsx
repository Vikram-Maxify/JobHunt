
import React, { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  MapPin,
  Search,
  XCircle,
  ChevronDown,
  Building2,
  ArrowUpRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getMyApplications } from "../redux/slicer/jobApplicationSlice";

const MyAppication = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // =========================================================
  // REDUX STATE
  // =========================================================

  const {
  applications = [],
  loading,
  error,
} = useSelector((state) => state.application);

  // =========================================================
  // FETCH MY APPLICATIONS
  // =========================================================

  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

  // =========================================================
  // FORMAT BACKEND APPLICATION DATA
  // =========================================================

  const formattedApplications = useMemo(() => {
    if (!Array.isArray(applications)) {
      return [];
    }

    return applications.map((application) => {
      const job = application.job || {};

      const companyName =
        job.company?.name ||
        job.companyName ||
        job.company ||
        "Company";

      const location =
        job.location?.city ||
        job.location ||
        job.jobLocation ||
        "Location not specified";

      const jobType =
        job.jobType ||
        job.type ||
        job.employmentType ||
        "Full Time";

      let salary = "Salary not specified";

      if (job.salary) {
        if (typeof job.salary === "string") {
          salary = job.salary;
        } else if (
          typeof job.salary === "object"
        ) {
          if (
            job.salary.min !== undefined &&
            job.salary.max !== undefined
          ) {
            salary = `₹${job.salary.min} - ₹${job.salary.max}`;
          } else if (job.salary.amount) {
            salary = `₹${job.salary.amount}`;
          }
        }
      }

      const rawStatus =
        application.status || "pending";

      // Backend status -> UI status
      const statusMap = {
        pending: "Applied",
        applied: "Applied",
        review: "Under Review",
        reviewed: "Under Review",
        "under-review": "Under Review",
        shortlisted: "Shortlisted",
        interview: "Interview",
        rejected: "Rejected",
        accepted: "Shortlisted",
      };

      const displayStatus =
        statusMap[
          String(rawStatus).toLowerCase()
        ] || rawStatus;

      return {
        id: application._id,

        jobId:
          typeof application.job === "object"
            ? application.job?._id
            : application.job,

        jobTitle:
          job.title ||
          job.jobTitle ||
          "Job Title",

        company: companyName,

        location,

        type: jobType,

        salary,

        appliedDate: application.appliedAt
          ? new Date(
              application.appliedAt
            ).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "Date not available",

        status: displayStatus,

        logo:
          companyName
            ?.charAt(0)
            ?.toUpperCase() || "J",
      };
    });
  }, [applications]);

  // =========================================================
  // FILTER APPLICATIONS
  // =========================================================

  const filteredApplications = useMemo(() => {
    return formattedApplications.filter(
      (application) => {
        const search =
          searchTerm.toLowerCase().trim();

        const matchesSearch =
          application.jobTitle
            .toLowerCase()
            .includes(search) ||
          application.company
            .toLowerCase()
            .includes(search) ||
          application.location
            .toLowerCase()
            .includes(search);

        const matchesStatus =
          statusFilter === "All" ||
          application.status === statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );
  }, [
    formattedApplications,
    searchTerm,
    statusFilter,
  ]);

  // =========================================================
  // STATUS CONFIG
  // =========================================================

  const getStatusConfig = (status) => {
    switch (status) {
      case "Applied":
        return {
          icon: Clock3,
          text: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-100",
        };

      case "Under Review":
        return {
          icon: Eye,
          text: "text-amber-600",
          bg: "bg-amber-50",
          border: "border-amber-100",
        };

      case "Shortlisted":
        return {
          icon: CheckCircle2,
          text: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-100",
        };

      case "Interview":
        return {
          icon: CalendarDays,
          text: "text-purple-600",
          bg: "bg-purple-50",
          border: "border-purple-100",
        };

      case "Rejected":
        return {
          icon: XCircle,
          text: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-100",
        };

      default:
        return {
          icon: Clock3,
          text: "text-slate-600",
          bg: "bg-slate-50",
          border: "border-slate-100",
        };
    }
  };

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalApplications =
    formattedApplications.length;

  const underReview =
    formattedApplications.filter(
      (item) =>
        item.status === "Under Review"
    ).length;

  const shortlisted =
    formattedApplications.filter(
      (item) =>
        item.status === "Shortlisted" ||
        item.status === "Interview"
    ).length;

  const rejected =
    formattedApplications.filter(
      (item) =>
        item.status === "Rejected"
    ).length;

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-68px)] bg-slate-50">
        <div className="mx-auto flex min-h-[60vh] w-full max-w-7xl items-center justify-center px-4">
          <div className="flex flex-col items-center gap-3">
            <Loader2
              size={36}
              className="animate-spin text-blue-600"
            />

            <p className="text-sm font-medium text-slate-500">
              Loading your applications...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <main className="min-h-[calc(100vh-68px)] bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-9">
          <div className="rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertCircle size={26} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-800">
              Failed to load applications
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {typeof error === "string"
                ? error
                : "Something went wrong while loading your applications."}
            </p>

            <button
              type="button"
              onClick={() =>
                dispatch(getMyApplications())
              }
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-68px)] overflow-x-hidden bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-9">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-5 shadow-lg sm:p-7 lg:p-8">

          <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <div className="flex items-start gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm sm:h-12 sm:w-12">
                <BriefcaseBusiness size={21} />
              </div>

              <div className="min-w-0">
                <h1 className="text-xl font-black text-white sm:text-2xl lg:text-3xl">
                  My Applications
                </h1>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-blue-100 sm:text-sm">
                  Track all your job applications and stay updated with your application progress.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">

          <StatCard
            icon={FileText}
            label="Total Applications"
            value={totalApplications}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />

          <StatCard
            icon={Clock3}
            label="Under Review"
            value={underReview}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />

          <StatCard
            icon={CheckCircle2}
            label="Shortlisted"
            value={shortlisted}
            iconBg="bg-green-50"
            iconColor="text-green-600"
          />

          <StatCard
            icon={XCircle}
            label="Rejected"
            value={rejected}
            iconBg="bg-red-50"
            iconColor="text-red-600"
          />

        </section>

        {/* =====================================================
            SEARCH + FILTER
        ===================================================== */}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

          <div className="flex flex-col gap-3 md:flex-row">

            <div className="relative min-w-0 flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search by job title, company or location..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="relative w-full md:w-52">

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="All">
                  All Applications
                </option>

                <option value="Applied">
                  Applied
                </option>

                <option value="Under Review">
                  Under Review
                </option>

                <option value="Shortlisted">
                  Shortlisted
                </option>

                <option value="Interview">
                  Interview
                </option>

                <option value="Rejected">
                  Rejected
                </option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

            </div>

          </div>
        </section>

        {/* =====================================================
            APPLICATION LIST
        ===================================================== */}

        <section className="mt-5">

          <div className="mb-4 flex items-center justify-between gap-3">

            <div>
              <h2 className="text-base font-bold text-slate-800 sm:text-lg">
                Your Applications
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                {filteredApplications.length} application
                {filteredApplications.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>
            </div>

          </div>

          {filteredApplications.length > 0 ? (

            <div className="space-y-4">

              {filteredApplications.map(
                (application) => {
                  const status =
                    getStatusConfig(
                      application.status
                    );

                  const StatusIcon =
                    status.icon;

                  return (
                    <article
                      key={application.id}
                      className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5"
                    >

                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        {/* LEFT */}

                        <div className="flex min-w-0 gap-3 sm:gap-4">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white shadow-sm sm:h-14 sm:w-14 sm:text-xl">
                            {application.logo}
                          </div>

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                              <h3 className="truncate text-sm font-bold text-slate-800 sm:text-base">
                                {application.jobTitle}
                              </h3>

                              <span
                                className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${status.bg} ${status.text} ${status.border}`}
                              >
                                <StatusIcon size={12} />
                                {application.status}
                              </span>

                            </div>

                            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">

                              <span className="inline-flex items-center gap-1">
                                <Building2 size={13} />
                                {application.company}
                              </span>

                              <span className="hidden text-slate-300 sm:inline">
                                •
                              </span>

                              <span className="inline-flex items-center gap-1">
                                <MapPin size={13} />
                                {application.location}
                              </span>

                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">

                              <span>
                                {application.type}
                              </span>

                              <span className="text-slate-300">
                                •
                              </span>

                              <span>
                                {application.salary}
                              </span>

                            </div>

                          </div>
                        </div>

                        {/* RIGHT */}

                        <div className="flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center lg:border-t-0 lg:pt-0">

                          <div className="flex items-center gap-2 text-xs text-slate-400 lg:mr-3">

                            <CalendarDays size={14} />

                            <span>
                              Applied{" "}
                              {application.appliedDate}
                            </span>

                          </div>

                          <button
                            type="button"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-600 transition hover:bg-blue-600 hover:text-white sm:w-auto"
                          >
                            View Details
                            <ArrowUpRight size={14} />
                          </button>

                        </div>

                      </div>

                    </article>
                  );
                }
              )}

            </div>

          ) : (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <FileText size={25} />
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-800">
                No applications found
              </h3>

              <p className="mx-auto mt-1.5 max-w-sm text-xs leading-5 text-slate-400">
                We couldn't find any applications matching your search or selected filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
              >
                Clear Filters
              </button>

            </div>
          )}

        </section>

      </div>
    </main>
  );
};

// =============================================================
// STAT CARD
// =============================================================

const StatCard = ({
  icon: Icon,
  label,
  value,
  iconBg,
  iconColor,
}) => {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:p-4">

      <div className="flex items-center gap-3">

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          <Icon size={18} />
        </div>

        <div className="min-w-0">

          <p className="truncate text-[10px] font-semibold text-slate-400 sm:text-xs">
            {label}
          </p>

          <p className="mt-0.5 text-lg font-black text-slate-800 sm:text-xl">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
};

export default MyAppication;

