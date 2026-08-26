import React, { useMemo, useState } from "react";
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
  CheckCircle2,
  Clock4,
  XCircle,
  FileText,
} from "lucide-react";

// =========================================================
// SAVED APPLICATION DATA
// =========================================================

const savedApplications = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Infosys",
    location: "Bangalore",
    experience: "1-3 Yrs",
    salary: "₹5-9 LPA",
    type: "Full Time",
    workMode: "Hybrid",
    appliedDate: "24 Aug 2026",
    savedDate: "25 Aug 2026",
    status: "Applied",
    logo: "I",
    logoClass: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    title: "Hub Lead",
    company: "Paytm",
    location: "Noida",
    experience: "0-3 Yrs",
    salary: "₹6-12 LPA",
    type: "Full Time",
    workMode: "Work from office",
    appliedDate: "22 Aug 2026",
    savedDate: "23 Aug 2026",
    status: "Under Review",
    logo: "P",
    logoClass: "bg-indigo-50 text-indigo-600",
  },
  {
    id: 3,
    title: "Software Engineer",
    company: "Accenture",
    location: "Pune",
    experience: "1-4 Yrs",
    salary: "₹6-11 LPA",
    type: "Full Time",
    workMode: "Hybrid",
    appliedDate: "20 Aug 2026",
    savedDate: "21 Aug 2026",
    status: "Interview",
    logo: "A",
    logoClass: "bg-purple-50 text-purple-600",
  },
  {
    id: 4,
    title: "Operations Supervisor",
    company: "Marico",
    location: "Gurgaon",
    experience: "1-2 Yrs",
    salary: "₹4-7 LPA",
    type: "Full Time",
    workMode: "Work from office",
    appliedDate: "18 Aug 2026",
    savedDate: "20 Aug 2026",
    status: "Applied",
    logo: "M",
    logoClass: "bg-cyan-50 text-cyan-600",
  },
  {
    id: 5,
    title: "React Developer",
    company: "TCS",
    location: "Mumbai",
    experience: "2-5 Yrs",
    salary: "₹7-13 LPA",
    type: "Full Time",
    workMode: "Remote",
    appliedDate: "15 Aug 2026",
    savedDate: "17 Aug 2026",
    status: "Rejected",
    logo: "T",
    logoClass: "bg-orange-50 text-orange-600",
  },
];

// =========================================================
// STATUS CONFIG
// =========================================================

const statusConfig = {
  Applied: {
    icon: FileText,
    className: "bg-blue-50 text-blue-700 border-blue-100",
  },
  "Under Review": {
    icon: Clock4,
    className: "bg-amber-50 text-amber-700 border-amber-100",
  },
  Interview: {
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  Rejected: {
    icon: XCircle,
    className: "bg-red-50 text-red-600 border-red-100",
  },
};

// =========================================================
// COMPONENT
// =========================================================

const SavedApplication = () => {
  const [applications, setApplications] =
    useState(savedApplications);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Applications");

  const [statusOpen, setStatusOpen] =
    useState(false);

  // =======================================================
  // REMOVE APPLICATION
  // =======================================================

  const removeApplication = (id) => {
    setApplications((prev) =>
      prev.filter((application) => application.id !== id)
    );
  };

  // =======================================================
  // FILTER APPLICATIONS
  // =======================================================

  const filteredApplications = useMemo(() => {
    const query = search.toLowerCase().trim();

    return applications.filter((application) => {
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

      const matchesStatus =
        statusFilter === "All Applications" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  // =======================================================
  // STATUS OPTIONS
  // =======================================================

  const statusOptions = [
    "All Applications",
    "Applied",
    "Under Review",
    "Interview",
    "Rejected",
  ];

  // =======================================================
  // STATUS COUNTS
  // =======================================================

  const getStatusCount = (status) => {
    if (status === "All Applications") {
      return applications.length;
    }

    return applications.filter(
      (application) => application.status === status
    ).length;
  };

  // =======================================================
  // APPLICATION CARD
  // =======================================================

  const ApplicationCard = ({ application }) => {
    const StatusIcon =
      statusConfig[application.status]?.icon || FileText;

    const statusClass =
      statusConfig[application.status]?.className ||
      "bg-slate-50 text-slate-600 border-slate-100";

    return (
      <article className="group w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/60">

        {/* =================================================
            TOP STATUS BAR
        ================================================== */}

        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/70 px-4 py-2.5 sm:px-5">

          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold sm:text-xs ${statusClass}`}
          >
            <StatusIcon size={13} />
            {application.status}
          </span>

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

            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-100 text-lg font-black shadow-sm sm:h-14 sm:w-14 sm:text-xl ${application.logoClass}`}
            >
              {application.logo}
            </div>

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
                  aria-label="Remove saved application"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                >
                  <X size={17} />
                </button>

              </div>

              {/* JOB META */}

              <div className="mt-3 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-[10px] text-slate-500 sm:gap-x-4 sm:text-xs">

                <span className="flex items-center gap-1.5">
                  <MapPin
                    size={13}
                    className="shrink-0 text-slate-400"
                  />
                  {application.location}
                </span>

                <span className="flex items-center gap-1.5">
                  <BriefcaseBusiness
                    size={13}
                    className="shrink-0 text-slate-400"
                  />
                  {application.experience}
                </span>

                <span className="flex items-center gap-1.5">
                  <CircleDollarSign
                    size={13}
                    className="shrink-0 text-slate-400"
                  />
                  {application.salary}
                </span>

              </div>

            </div>
          </div>

          {/* =================================================
              APPLICATION DETAILS
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
              Application saved for later
            </p>

            <div className="flex w-full min-w-0 gap-2 sm:w-auto">

              <button
                type="button"
                className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:flex-none sm:px-4"
              >
                <BookmarkCheck
                  size={15}
                  className="shrink-0"
                />

                <span>Saved</span>
              </button>

              <button
                type="button"
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
                  {applications.length}
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
              {filteredApplications.length} application
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
              No saved applications found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500 sm:text-sm">
              {search
                ? "We couldn't find any saved applications matching your search."
                : "You don't have any saved applications in this category yet."}
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