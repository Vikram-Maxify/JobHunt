
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Users,
  BriefcaseBusiness,
  FileText,
  CreditCard,
  ArrowUpRight,
  UserPlus,
  Plus,
  Eye,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  IndianRupee,
} from "lucide-react";

import StatCard from "../components/StateCard";

import { getAllUsersAdmin } from "../../redux/slicer/adminUserSlice";
import { getAllJobsAdmin } from "../../redux/slicer/jobSlice";
import { getAllSubscriptionsAdmin } from "../../redux/slicer/adminsubscriptionSlice";

const AdminDashboard = () => {
  /* =========================================================
     REDUX
  ========================================================= */

  const dispatch = useDispatch();

  const {
    users,
    total: totalUsers,
    count: userCount,
    fetchLoading: usersLoading,
  } = useSelector((state) => state.adminUser);

  const {
    adminJobs,
    adminCount,
    adminLoading: jobsLoading,
  } = useSelector((state) => state.jobs);

  const {
    adminSubscriptions,
    adminSubscriptionsCount,
    loading: subscriptionsLoading,
  } = useSelector((state) => state.subscription);

  /* =========================================================
     FETCH DASHBOARD DATA
  ========================================================= */

  useEffect(() => {
    dispatch(getAllUsersAdmin());
    dispatch(getAllJobsAdmin());
    dispatch(getAllSubscriptionsAdmin());
  }, [dispatch]);

  /* =========================================================
     USER DATA
  ========================================================= */

  const totalUsersValue =
    totalUsers || userCount || users?.length || 0;

  /* =========================================================
     JOB DATA
  ========================================================= */

  const totalJobsValue =
    adminCount || adminJobs?.length || 0;

  /* =========================================================
     SUBSCRIPTION DATA
  ========================================================= */

  const totalSubscriptionsValue =
    adminSubscriptionsCount ||
    adminSubscriptions?.length ||
    0;

  const activeSubscriptions =
    adminSubscriptions?.filter(
      (subscription) =>
        subscription?.isActive === true ||
        subscription?.status === "active" ||
        subscription?.status === "Active"
    ).length || 0;

  const expiredSubscriptions =
    adminSubscriptions?.filter(
      (subscription) =>
        subscription?.status === "expired" ||
        subscription?.status === "Expired"
    ).length || 0;

  /* =========================================================
     RECENT USERS
  ========================================================= */

  const recentUsers = (users || []).slice(0, 5).map((user) => ({
    name:
      user?.name ||
      user?.fullName ||
      "Unknown User",

    email:
      user?.email ||
      "No email",

    role:
      user?.role ||
      user?.jobTitle ||
      "User",

    status:
      user?.isActive === false
        ? "Inactive"
        : user?.isVerified === false
          ? "Pending"
          : "Active",

    initial:
      (
        user?.name ||
        user?.fullName ||
        "U"
      )
        .charAt(0)
        .toUpperCase(),
  }));

  /* =========================================================
     FALLBACK RECENT USERS
  ========================================================= */

  const displayRecentUsers =
    recentUsers.length > 0
      ? recentUsers
      : [
        {
          name: "No users found",
          email: "No registered users",
          role: "—",
          status: "Pending",
          initial: "U",
        },
      ];

  /* =========================================================
     STATS
  ========================================================= */

  const stats = [
    {
      title: "Total Users",
      value: usersLoading ? "..." : totalUsersValue.toLocaleString(),
      description: "Registered users",
      icon: Users,
      iconClass: "bg-blue-50 text-blue-600",
      trend: "+12.5%",
      trendPositive: true,
    },
    {
      title: "Total Jobs",
      value: jobsLoading ? "..." : totalJobsValue.toLocaleString(),
      description: "Jobs listed",
      icon: BriefcaseBusiness,
      iconClass: "bg-purple-50 text-purple-600",
      trend: "+8.2%",
      trendPositive: true,
    },
    {
      title: "Applications",
      value: "8,642",
      description: "Total applications",
      icon: FileText,
      iconClass: "bg-orange-50 text-orange-600",
      trend: "+15.4%",
      trendPositive: true,
    },
    {
      title: "Revenue",
      value: "₹4.82L",
      description: "This month's revenue",
      icon: CreditCard,
      iconClass: "bg-green-50 text-green-600",
      trend: "+10.8%",
      trendPositive: true,
    },
  ];

  /* =========================================================
     RECENT APPLICATIONS
     TEMPORARY DATA
  ========================================================= */

  const recentApplications = [
    {
      name: "Aman Kumar",
      job: "React Developer",
      company: "TechNova Solutions",
      status: "Shortlisted",
      date: "26 Aug 2026",
    },
    {
      name: "Priya Sharma",
      job: "UI/UX Designer",
      company: "Creative Labs",
      status: "Pending",
      date: "26 Aug 2026",
    },
    {
      name: "Rahul Singh",
      job: "Node.js Developer",
      company: "CodeWorks",
      status: "Accepted",
      date: "25 Aug 2026",
    },
    {
      name: "Neha Gupta",
      job: "Frontend Developer",
      company: "WebSphere",
      status: "Rejected",
      date: "25 Aug 2026",
    },
  ];

  /* =========================================================
     STATUS CLASS
  ========================================================= */

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
      case "Accepted":
        return "bg-green-50 text-green-600";

      case "Pending":
        return "bg-amber-50 text-amber-600";

      case "Shortlisted":
        return "bg-blue-50 text-blue-600";

      case "Rejected":
      case "Inactive":
      case "Expired":
        return "bg-red-50 text-red-500";

      default:
        return "bg-slate-50 text-slate-500";
    }
  };

  return (
    <div className="min-h-full bg-slate-50">
      <div className="mx-auto w-full max-w-[1600px] px-3 py-5 sm:px-5 sm:py-6 lg:px-8 lg:py-8">

        {/* PAGE HEADER */}
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Overview
            </p>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Welcome back, Admin 👋
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Here's what's happening on CareerSphere today.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                window.location.href = "http://localhost:5173/";
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <Eye size={16} />
              View Website
            </button>

            {/* <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Plus size={17} />
              Add New Job
            </button> */}
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              {...stat}
            />
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

          {/* APPLICATION OVERVIEW */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
            <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Application Overview
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Application activity for the last 7 days
                </p>
              </div>

              <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
              </select>
            </div>

            {/* CHART */}
            <div className="p-5 sm:p-6">
              <div className="flex h-64 items-end gap-2 sm:gap-4">
                {[45, 62, 52, 78, 64, 88, 72].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <div className="relative flex h-[85%] w-full items-end justify-center">
                        <div
                          className="w-full max-w-10 rounded-t-lg bg-gradient-to-t from-blue-600 to-indigo-400 transition-all duration-300 group-hover:from-blue-700 group-hover:to-indigo-500"
                          style={{
                            height: `${height}%`,
                          }}
                        />
                      </div>

                      <span className="text-[10px] font-medium text-slate-400">
                        {
                          [
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                          ][index]
                        }
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* LEGEND */}
              <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                  <span className="text-xs text-slate-500">
                    Applications
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-500">
                    Successful
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* QUICK STATS */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Quick Statistics
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Platform performance
              </p>
            </div>

            <div className="mt-5 space-y-4">

              <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                  <UserPlus size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-500">
                    New Users Today
                  </p>

                  <p className="mt-0.5 text-lg font-black text-slate-800">
                    {usersLoading ? "..." : totalUsersValue}
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="text-green-500"
                />
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-purple-50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-purple-600 shadow-sm">
                  <BriefcaseBusiness size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-500">
                    Jobs Posted Today
                  </p>

                  <p className="mt-0.5 text-lg font-black text-slate-800">
                    {jobsLoading ? "..." : totalJobsValue}
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="text-green-500"
                />
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-orange-50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-orange-600 shadow-sm">
                  <FileText size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-500">
                    Applications Today
                  </p>

                  <p className="mt-0.5 text-lg font-black text-slate-800">
                    284
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="text-green-500"
                />
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-green-600 shadow-sm">
                  <IndianRupee size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-500">
                    Revenue Today
                  </p>

                  <p className="mt-0.5 text-lg font-black text-slate-800">
                    ₹18,450
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="text-green-500"
                />
              </div>

            </div>
          </section>
        </div>

        {/* RECENT DATA */}
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">

          {/* RECENT USERS */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Recent Users
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Recently registered users
                </p>
              </div>

              <button
                type="button"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {displayRecentUsers.map((user, index) => (
                <div
                  key={`${user.email}-${index}`}
                  className="flex items-center gap-3 p-4 transition hover:bg-slate-50 sm:px-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                    {user.initial}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-700">
                      {user.name}
                    </p>

                    <p className="truncate text-[10px] text-slate-400 sm:text-xs">
                      {user.email}
                    </p>
                  </div>

                  <div className="hidden min-w-0 flex-1 sm:block">
                    <p className="truncate text-xs font-medium text-slate-600">
                      {user.role}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${getStatusClass(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* RECENT APPLICATIONS */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Recent Applications
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Latest job applications
                </p>
              </div>

              <button
                type="button"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recentApplications.map(
                (application, index) => (
                  <div
                    key={`${application.name}-${index}`}
                    className="flex items-center gap-3 p-4 transition hover:bg-slate-50 sm:px-6"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-blue-600">
                      <FileText size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-700">
                        {application.name}
                      </p>

                      <p className="truncate text-xs text-blue-600">
                        {application.job}
                      </p>

                      <p className="mt-1 hidden items-center gap-1 text-[10px] text-slate-400 sm:flex">
                        <span>{application.company}</span>
                        <span>•</span>
                        <span>{application.date}</span>
                      </p>
                    </div>

                    <span
                      className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold sm:inline-flex ${getStatusClass(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>

                    <button
                      type="button"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                      <MoreHorizontal size={17} />
                    </button>
                  </div>
                )
              )}
            </div>
          </section>
        </div>

        {/* BOTTOM CARDS */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* ACTIVE SUBSCRIPTIONS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 size={19} />
              </div>

              <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-bold text-green-600">
                Active
              </span>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Active Subscriptions
            </p>

            <h3 className="mt-1 text-2xl font-black text-slate-800">
              {subscriptionsLoading
                ? "..."
                : activeSubscriptions}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Currently active plans
            </p>
          </div>

          {/* EXPIRED */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <XCircle size={19} />
              </div>

              <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-500">
                Expired
              </span>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Expired Subscriptions
            </p>

            <h3 className="mt-1 text-2xl font-black text-slate-800">
              {subscriptionsLoading
                ? "..."
                : expiredSubscriptions}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Need renewal
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

