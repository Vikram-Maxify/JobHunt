import React, { useMemo, useState } from "react";
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
} from "lucide-react";

const MyAppication = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // =========================================================
  // DEMO APPLICATION DATA
  // Replace this with localStorage / API data later
  // =========================================================

  const applications = [
    {
      id: 1,
      jobTitle: "Frontend Developer",
      company: "TechNova Solutions",
      location: "Delhi, India",
      type: "Full Time",
      salary: "₹6 - ₹9 LPA",
      appliedDate: "25 Aug 2026",
      status: "Applied",
      logo: "T",
    },
    {
      id: 2,
      jobTitle: "MERN Stack Developer",
      company: "CodeCraft Technologies",
      location: "Bangalore, India",
      type: "Full Time",
      salary: "₹7 - ₹12 LPA",
      appliedDate: "22 Aug 2026",
      status: "Under Review",
      logo: "C",
    },
    {
      id: 3,
      jobTitle: "React JS Developer",
      company: "DigitalWorks",
      location: "Remote",
      type: "Full Time",
      salary: "₹5 - ₹8 LPA",
      appliedDate: "18 Aug 2026",
      status: "Shortlisted",
      logo: "D",
    },
    {
      id: 4,
      jobTitle: "Junior Web Developer",
      company: "WebSphere Pvt Ltd",
      location: "Mumbai, India",
      type: "Full Time",
      salary: "₹4 - ₹6 LPA",
      appliedDate: "12 Aug 2026",
      status: "Rejected",
      logo: "W",
    },
    {
      id: 5,
      jobTitle: "Software Developer Intern",
      company: "Innovate Labs",
      location: "Pune, India",
      type: "Internship",
      salary: "₹20K - ₹30K / Month",
      appliedDate: "08 Aug 2026",
      status: "Interview",
      logo: "I",
    },
  ];

  // =========================================================
  // FILTER APPLICATIONS
  // =========================================================

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.jobTitle
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        application.company
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        application.location
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

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

  const totalApplications = applications.length;

  const underReview = applications.filter(
    (item) => item.status === "Under Review"
  ).length;

  const shortlisted = applications.filter(
    (item) =>
      item.status === "Shortlisted" ||
      item.status === "Interview"
  ).length;

  const rejected = applications.filter(
    (item) => item.status === "Rejected"
  ).length;

  return (
    <main className="min-h-[calc(100vh-68px)] overflow-x-hidden bg-slate-50">

      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-9">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-5 shadow-lg sm:p-7 lg:p-8">

          {/* Background Decorations */}

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
                  Track all your job applications and stay updated
                  with your application progress.
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

            {/* SEARCH */}

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

            {/* FILTER */}

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

          {/* APPLICATION CARDS */}

          {filteredApplications.length > 0 ? (
            <div className="space-y-4">

              {filteredApplications.map(
                (application) => {
                  const status =
                    getStatusConfig(
                      application.status
                    );

                  const StatusIcon = status.icon;

                  return (
                    <article
                      key={application.id}
                      className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5"
                    >

                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        {/* LEFT SIDE */}

                        <div className="flex min-w-0 gap-3 sm:gap-4">

                          {/* COMPANY LOGO */}

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white shadow-sm sm:h-14 sm:w-14 sm:text-xl">
                            {application.logo}
                          </div>

                          {/* JOB DETAILS */}

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                              <h3 className="truncate text-sm font-bold text-slate-800 sm:text-base">
                                {application.jobTitle}
                              </h3>

                              {/* STATUS */}

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

                        {/* RIGHT SIDE */}

                        <div className="flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center lg:border-t-0 lg:pt-0">

                          {/* APPLIED DATE */}

                          <div className="flex items-center gap-2 text-xs text-slate-400 lg:mr-3">

                            <CalendarDays
                              size={14}
                            />

                            <span>
                              Applied{" "}
                              {application.appliedDate}
                            </span>

                          </div>

                          {/* VIEW BUTTON */}

                          <button
                            type="button"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-600 transition hover:bg-blue-600 hover:text-white sm:w-auto"
                          >
                            View Details
                            <ArrowUpRight
                              size={14}
                            />
                          </button>

                        </div>

                      </div>

                    </article>
                  );
                }
              )}

            </div>
          ) : (

            /* =================================================
               EMPTY STATE
            ================================================= */

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <FileText size={25} />
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-800">
                No applications found
              </h3>

              <p className="mx-auto mt-1.5 max-w-sm text-xs leading-5 text-slate-400">
                We couldn't find any applications matching
                your search or selected filter.
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