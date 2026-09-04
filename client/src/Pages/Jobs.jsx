import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  X,
  Heart,
  Users,
  Building2,
  IndianRupee,
  ArrowUpDown,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

import { getAllJobsUser } from "../redux/slicer/jobSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ============================================================
  // REDUX
  // ============================================================

  const {
    jobs: backendJobs = [],
    loading,
    error,
    page = 1,
    totalPages = 1,
    total = 0,
  } = useSelector((state) => state.jobs);

  // ============================================================
  // LOCAL STATES
  // ============================================================

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  // Mobile search state
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [mobileFilters, setMobileFilters] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const [savedJobs, setSavedJobs] = useState([]);

  // IMPORTANT:
  // Every filter has its own independent array.
  const [selectedFilters, setSelectedFilters] = useState({
    department: [],
    workMode: [],
    experience: [],
    location: [],
    salary: [],
    company: [],
    role: [],
  });

  const [openFilters, setOpenFilters] = useState({
    department: true,
    workMode: true,
    experience: true,
    location: true,
    salary: true,
    company: true,
    role: true,
  });

  // ============================================================
  // FETCH JOBS
  // 6 JOBS PER PAGE
  // ============================================================

  useEffect(() => {
    dispatch(
      getAllJobsUser({
        page: 1,
        limit: 6,
      })
    );
  }, [dispatch]);

  // ============================================================
  // NORMALIZE VALUE
  // ============================================================

  const normalizeValue = (value) => {
    if (value === null || value === undefined) {
      return "";
    }

    if (typeof value === "object") {
      if (value.name !== undefined) {
        return String(value.name).trim();
      }

      if (value.title !== undefined) {
        return String(value.title).trim();
      }

      if (value.label !== undefined) {
        return String(value.label).trim();
      }

      if (value.value !== undefined) {
        return String(value.value).trim();
      }

      return "";
    }

    return String(value).trim();
  };

  // ============================================================
  // GET CATEGORY NAME
  // ============================================================

  const getCategoryName = (job) => {
    return (
      normalizeValue(job?.categoryName) ||
      normalizeValue(job?.category?.name) ||
      normalizeValue(job?.category?.title) ||
      normalizeValue(job?.category) ||
      "Other"
    );
  };

  // ============================================================
  // GET ROLE NAME
  // ============================================================

  const getRoleName = (job) => {
    return (
      normalizeValue(job?.role) ||
      normalizeValue(job?.roleName) ||
      normalizeValue(job?.role?.name) ||
      normalizeValue(job?.role?.title) ||
      "Other"
    );
  };

  // ============================================================
  // GET COMPANY NAME
  // ============================================================

  const getCompanyName = (job) => {
    return (
      normalizeValue(job?.company) ||
      normalizeValue(job?.companyName) ||
      normalizeValue(job?.company?.name) ||
      "Company"
    );
  };

  // ============================================================
  // GET LOCATION
  // ============================================================

  const getLocationName = (job) => {
    return (
      normalizeValue(job?.location) ||
      normalizeValue(job?.jobLocation) ||
      normalizeValue(job?.city) ||
      "Location not specified"
    );
  };

  // ============================================================
  // MAP BACKEND JOB
  // ============================================================

  const mapJob = (job) => {
    const companyName = getCompanyName(job);
    const jobLocation = getLocationName(job);
    const departmentName = getCategoryName(job);
    const roleName = getRoleName(job);

    const logoUrl =
      normalizeValue(job?.companyLogo?.displayUrl) ||
      normalizeValue(job?.companyLogo?.url) ||
      normalizeValue(job?.companyLogo?.thumb) ||
      normalizeValue(job?.companyLogo);

    return {
      id: job?._id,

      title: normalizeValue(job?.title) || "Untitled Job",

      company: companyName,

      location: jobLocation,

      experience: normalizeValue(job?.experience) || "0-3 Yrs",

      salary: normalizeValue(job?.salary) || "Salary not disclosed",

      type: normalizeValue(job?.jobType) || "Full Time",

      workMode: normalizeValue(job?.jobType) || "Full Time",

      // Department
      department: departmentName,

      // Role
      role: roleName,

      posted: normalizeValue(job?.daysAgo) || "Recently",

      applicants: `${job?.applicantCount || 0} applicants`,

      description:
        normalizeValue(job?.description) ||
        "No description available for this job.",

      skills: Array.isArray(job?.skills) ? job.skills : [],

      featured: Boolean(job?.isFeatured),

      urgent: Boolean(job?.isUrgent),

      logoUrl,

      logo: companyName?.charAt(0)?.toUpperCase() || "C",

      logoClass: "bg-blue-50 text-blue-600",

      tags: Array.isArray(job?.tags) ? job.tags : [],

      createdAt: job?.createdAt || null,

      rawJob: job,
    };
  };

  // ============================================================
  // MAPPED JOBS
  // ============================================================

  const jobs = useMemo(() => {
    if (!Array.isArray(backendJobs)) {
      return [];
    }

    return backendJobs.map(mapJob);
  }, [backendJobs]);

  // ============================================================
  // GET UNIQUE FILTER VALUES
  // ============================================================

  const getDynamicFilter = (key) => {
    const uniqueValues = new Map();

    jobs.forEach((job) => {
      const value = normalizeValue(job?.[key]);

      if (!value) return;

      const normalizedKey = value.toLowerCase();

      if (!uniqueValues.has(normalizedKey)) {
        uniqueValues.set(normalizedKey, value);
      }
    });

    return Array.from(uniqueValues.values())
      .sort((a, b) => a.localeCompare(b))
      .map((value) => [value, value]);
  };

  // ============================================================
  // FILTER OPTIONS
  // ============================================================

  const filters = useMemo(() => {
    return {
      department: getDynamicFilter("department"),

      workMode: getDynamicFilter("workMode"),

      experience: [
        ["0-3 Yrs", "0-3 Yrs"],
        ["1-3 Yrs", "1-3 Yrs"],
        ["3-5 Yrs", "3-5 Yrs"],
        ["5+ Yrs", "5+ Yrs"],
      ],

      location: getDynamicFilter("location"),

      salary: [
        ["₹0 - ₹3 LPA", "0-3"],
        ["₹3 - ₹6 LPA", "3-6"],
        ["₹6 - ₹10 LPA", "6-10"],
        ["₹10 - ₹20 LPA", "10-20"],
        ["₹20+ LPA", "20+"],
      ],

      company: getDynamicFilter("company"),

      role: getDynamicFilter("role"),
    };
  }, [jobs]);

  // ============================================================
  // TOGGLE FILTER SECTION
  // ============================================================

  const toggleFilter = (filterName) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  // ============================================================
  // HANDLE FILTER CHANGE
  // ============================================================

  const handleFilterChange = (filterName, value) => {
    const cleanValue = normalizeValue(value);

    if (!cleanValue) return;

    setSelectedFilters((prev) => {
      const currentValues = Array.isArray(prev[filterName])
        ? prev[filterName]
        : [];

      const alreadySelected = currentValues.some(
        (item) =>
          normalizeValue(item).toLowerCase() ===
          cleanValue.toLowerCase()
      );

      // Only THIS filter changes.
      return {
        ...prev,

        [filterName]: alreadySelected
          ? currentValues.filter(
              (item) =>
                normalizeValue(item).toLowerCase() !==
                cleanValue.toLowerCase()
            )
          : [...currentValues, cleanValue],
      };
    });
  };

  // ============================================================
  // RESET FILTERS
  // ============================================================

  const resetFilters = () => {
    setSelectedFilters({
      department: [],
      workMode: [],
      experience: [],
      location: [],
      salary: [],
      company: [],
      role: [],
    });

    setSearch("");
    setLocation("");
  };

  // ============================================================
  // CHECK IF FILTER VALUE IS SELECTED
  // ============================================================

  const isFilterSelected = (filterName, value) => {
    const selectedValues = selectedFilters[filterName] || [];

    return selectedValues.some(
      (item) =>
        normalizeValue(item).toLowerCase() ===
        normalizeValue(value).toLowerCase()
    );
  };

  // ============================================================
  // SAVE JOB
  // ============================================================

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) => {
      if (prev.includes(jobId)) {
        return prev.filter((id) => id !== jobId);
      }

      return [...prev, jobId];
    });
  };

  // ============================================================
  // SALARY RANGE
  // ============================================================

  const getSalaryRange = (salary) => {
    if (!salary) return null;

    const text = String(salary).toLowerCase().replace(/,/g, "");

    const numbers = text.match(/\d+(\.\d+)?/g);

    if (!numbers?.length) {
      return null;
    }

    const nums = numbers.map(Number);

    if (text.includes("lpa")) {
      return {
        min: Math.min(...nums),
        max: Math.max(...nums),
      };
    }

    if (text.includes("k")) {
      return {
        min: Math.min(...nums) / 100,
        max: Math.max(...nums) / 100,
      };
    }

    if (text.includes("cr") || text.includes("crore")) {
      return {
        min: Math.min(...nums) * 100,
        max: Math.max(...nums) * 100,
      };
    }

    return {
      min: Math.min(...nums),
      max: Math.max(...nums),
    };
  };

  // ============================================================
  // SALARY MATCH
  // ============================================================

  const matchesSalary = (salary, selectedRange) => {
    const range = getSalaryRange(salary);

    if (!range) return false;

    switch (selectedRange) {
      case "0-3":
        return range.min <= 3;

      case "3-6":
        return range.max >= 3 && range.min <= 6;

      case "6-10":
        return range.max >= 6 && range.min <= 10;

      case "10-20":
        return range.max >= 10 && range.min <= 20;

      case "20+":
        return range.max >= 20;

      default:
        return true;
    }
  };

  // ============================================================
  // EXPERIENCE
  // ============================================================

  const getExperienceStart = (experience) => {
    const match = String(experience || "").match(/\d+/);

    return match ? Number(match[0]) : 0;
  };

  const matchesExperience = (
    jobExperience,
    selectedExperience
  ) => {
    if (
      normalizeValue(jobExperience).toLowerCase() ===
      normalizeValue(selectedExperience).toLowerCase()
    ) {
      return true;
    }

    return (
      getExperienceStart(jobExperience) ===
      getExperienceStart(selectedExperience)
    );
  };

  // ============================================================
  // EXACT TEXT MATCH
  // ============================================================

  const exactMatch = (jobValue, selectedValue) => {
    return (
      normalizeValue(jobValue).toLowerCase() ===
      normalizeValue(selectedValue).toLowerCase()
    );
  };

  // ============================================================
  // FILTER JOBS
  // ============================================================

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // ==========================================================
    // SEARCH
    // ==========================================================

    if (search.trim()) {
      const searchText = search.toLowerCase().trim();

      result = result.filter((job) => {
        return (
          job.title?.toLowerCase().includes(searchText) ||
          job.company?.toLowerCase().includes(searchText) ||
          job.department?.toLowerCase().includes(searchText) ||
          job.role?.toLowerCase().includes(searchText) ||
          job.description?.toLowerCase().includes(searchText) ||
          job.skills?.some((skill) =>
            normalizeValue(skill)
              .toLowerCase()
              .includes(searchText)
          )
        );
      });
    }

    // ==========================================================
    // LOCATION SEARCH
    // ==========================================================

    if (location.trim()) {
      const locationText = location.toLowerCase().trim();

      result = result.filter((job) =>
        job.location?.toLowerCase().includes(locationText)
      );
    }

    // ==========================================================
    // DEPARTMENT
    // ==========================================================

    if (selectedFilters.department.length > 0) {
      result = result.filter((job) =>
        selectedFilters.department.some((selectedValue) =>
          exactMatch(job.department, selectedValue)
        )
      );
    }

    // ==========================================================
    // WORK MODE
    // ==========================================================

    if (selectedFilters.workMode.length > 0) {
      result = result.filter((job) =>
        selectedFilters.workMode.some((selectedValue) =>
          exactMatch(job.workMode, selectedValue)
        )
      );
    }

    // ==========================================================
    // EXPERIENCE
    // ==========================================================

    if (selectedFilters.experience.length > 0) {
      result = result.filter((job) =>
        selectedFilters.experience.some((selectedValue) =>
          matchesExperience(job.experience, selectedValue)
        )
      );
    }

    // ==========================================================
    // LOCATION FILTER
    // ==========================================================

    if (selectedFilters.location.length > 0) {
      result = result.filter((job) =>
        selectedFilters.location.some((selectedValue) =>
          exactMatch(job.location, selectedValue)
        )
      );
    }

    // ==========================================================
    // SALARY FILTER
    // ==========================================================

    if (selectedFilters.salary.length > 0) {
      result = result.filter((job) =>
        selectedFilters.salary.some((selectedValue) =>
          matchesSalary(job.salary, selectedValue)
        )
      );
    }

    // ==========================================================
    // COMPANY FILTER
    // ==========================================================

    if (selectedFilters.company.length > 0) {
      result = result.filter((job) =>
        selectedFilters.company.some((selectedValue) =>
          exactMatch(job.company, selectedValue)
        )
      );
    }

    // ==========================================================
    // ROLE
    // ==========================================================

    if (selectedFilters.role.length > 0) {
      result = result.filter((job) =>
        selectedFilters.role.some((selectedValue) =>
          exactMatch(job.role, selectedValue)
        )
      );
    }

    // ==========================================================
    // SORT
    // ==========================================================

    if (sortBy === "latest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );
    }

    if (sortBy === "salary-high") {
      result.sort((a, b) => {
        const salaryA =
          getSalaryRange(a.salary)?.max || 0;

        const salaryB =
          getSalaryRange(b.salary)?.max || 0;

        return salaryB - salaryA;
      });
    }

    if (sortBy === "salary-low") {
      result.sort((a, b) => {
        const salaryA =
          getSalaryRange(a.salary)?.min || 0;

        const salaryB =
          getSalaryRange(b.salary)?.min || 0;

        return salaryA - salaryB;
      });

      return result;
    }

    return result;
  }, [
    jobs,
    search,
    location,
    selectedFilters,
    sortBy,
  ]);

  // ============================================================
  // JOB DETAIL
  // ============================================================

  const openJobDetail = (job) => {
    navigate(`/jobs/${job.id}`);
  };

  // ============================================================
  // PAGINATION
  // ============================================================

  const handlePageChange = (newPage) => {
    if (
      newPage < 1 ||
      newPage > totalPages ||
      loading
    ) {
      return;
    }

    dispatch(
      getAllJobsUser({
        page: newPage,
        limit: 6,
      })
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // FILTER SECTION
  // ============================================================

  const FilterSection = ({
    title,
    filterKey,
    children,
  }) => {
    const isOpen = openFilters[filterKey];

    return (
      <div className="border-b border-slate-200 last:border-b-0">
        <button
          type="button"
          onClick={() => toggleFilter(filterKey)}
          className="w-full flex items-center justify-between py-4 text-left"
        >
          <span className="font-semibold text-slate-800">
            {title}
          </span>

          {isOpen ? (
            <ChevronUp
              size={18}
              className="text-slate-500"
            />
          ) : (
            <ChevronDown
              size={18}
              className="text-slate-500"
            />
          )}
        </button>

        {isOpen && (
          <div className="pb-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  // ============================================================
  // FILTER CONTENT
  // ============================================================

  const FilterContent = ({
    filterKey,
    items,
  }) => {
    if (!items?.length) {
      return (
        <p className="text-xs text-slate-400">
          No options available
        </p>
      );
    }

    return (
      <div className="space-y-3">
        {items.map(([label, value], index) => {
          const checked = isFilterSelected(
            filterKey,
            value
          );

          return (
            <label
              key={`${filterKey}-${String(
                value
              )}-${index}`}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  handleFilterChange(
                    filterKey,
                    value
                  )
                }
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />

              <span
                className={`text-sm transition ${
                  checked
                    ? "text-blue-600 font-medium"
                    : "text-slate-600 group-hover:text-blue-600"
                }`}
              >
                {label}
              </span>
            </label>
          );
        })}
      </div>
    );
  };

  // ============================================================
  // JOB CARD
  // ============================================================

  const JobCard = ({ job }) => {
    const isSaved = savedJobs.includes(job.id);

    return (
      <div
        onClick={() => openJobDetail(job)}
        className="group bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        {/* TOP */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0">
            {/* LOGO */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-blue-50 text-blue-600 font-bold text-lg">
              {job.logoUrl ? (
                <img
                  src={job.logoUrl}
                  alt={job.company}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display =
                      "none";

                    e.currentTarget.parentElement.innerHTML =
                      `<span>${job.logo}</span>`;
                  }}
                />
              ) : (
                job.logo
              )}
            </div>

            {/* TITLE */}
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-blue-600 transition line-clamp-2">
                {job.title}
              </h3>

              <div className="flex items-center gap-2 mt-1">
                <Building2
                  size={15}
                  className="text-slate-400 shrink-0"
                />

                <span className="text-sm text-slate-500 truncate">
                  {job.company}
                </span>
              </div>
            </div>
          </div>

          {/* SAVE */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();

              toggleSaveJob(job.id);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition ${
              isSaved
                ? "bg-red-50 text-red-500"
                : "bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <Heart
              size={18}
              fill={
                isSaved
                  ? "currentColor"
                  : "none"
              }
            />
          </button>
        </div>

        {/* BADGES */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {job.featured && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-600">
              Featured
            </span>
          )}

          {job.urgent && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-600">
              Urgent
            </span>
          )}

          {job.type && (
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
              {job.type}
            </span>
          )}
        </div>

        {/* META */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock3
              size={16}
              className="text-blue-500 shrink-0"
            />

            <span>{job.experience}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <IndianRupee
              size={16}
              className="text-blue-500 shrink-0"
            />

            <span className="truncate">
              {job.salary}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin
              size={16}
              className="text-blue-500 shrink-0"
            />

            <span className="truncate">
              {job.location}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <BriefcaseBusiness
              size={16}
              className="text-blue-500 shrink-0"
            />

            <span className="truncate">
              {job.workMode}
            </span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm text-slate-500 leading-6 mt-5 line-clamp-2">
          {job.description}
        </p>

        {/* SKILLS */}
        {job.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {job.skills.slice(0, 5).map(
              (skill, index) => (
                <span
                  key={`${normalizeValue(
                    skill
                  )}-${index}`}
                  className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-xs font-medium"
                >
                  {normalizeValue(skill)}
                </span>
              )
            )}
          </div>
        )}

        {/* BOTTOM */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5 pt-5 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400">
            <span>{job.posted}</span>

            <span className="flex items-center gap-1.5">
              <Users size={14} />
              {job.applicants}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();

              openJobDetail(job);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading && jobs.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2
            size={42}
            className="mx-auto text-blue-600 animate-spin"
          />

          <h2 className="mt-4 text-lg font-semibold text-slate-800">
            Loading jobs...
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Please wait while we fetch the latest jobs.
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error && jobs.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-red-100 p-6 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-red-50 text-red-500 flex items-center justify-center">
            <AlertCircle size={24} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Unable to load jobs
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              dispatch(
                getAllJobsUser({
                  page: 1,
                  limit: 6,
                })
              )
            }
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // MAIN UI
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ========================================================
          HEADER
      ======================================================== */}

      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Find Your Dream Job
            </h1>

            <p className="mt-2 text-sm sm:text-base text-slate-500">
              Explore the latest opportunities and find the right job for you.
            </p>
          </div>

          {/* ====================================================
              SEARCH
          ==================================================== */}

          <div className="mt-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-2">
            <div className="flex items-center gap-1.5 md:grid md:grid-cols-[1fr_1fr_auto] md:gap-2">
              
              {/* KEYWORD */}
              <div
                className="flex min-w-0 flex-1 items-center gap-2 px-2 py-2.5 md:px-3"
                onClick={() =>
                  setMobileSearchOpen(true)
                }
              >
                <Search
                  size={20}
                  className="text-slate-400 shrink-0"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  onFocus={() =>
                    setMobileSearchOpen(true)
                  }
                  placeholder="Job title, skills, company..."
                  className="w-full min-w-0 outline-none text-sm text-slate-700 placeholder:text-slate-400"
                />
              </div>

              {/* LOCATION */}
              <div
                className={`${
                  mobileSearchOpen
                    ? "flex"
                    : "hidden"
                } md:flex min-w-0 flex-1 items-center gap-2 border-l border-slate-200 px-2 py-2.5 md:px-3`}
              >
                <MapPin
                  size={20}
                  className="text-slate-400 shrink-0"
                />

                <input
                  type="text"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  placeholder="Location"
                  className="w-full min-w-0 outline-none text-sm text-slate-700 placeholder:text-slate-400"
                />
              </div>

              {/* SEARCH BUTTON */}
              <button
                type="button"
                onClick={() =>
                  setMobileSearchOpen(true)
                }
                className={`${
                  mobileSearchOpen
                    ? "flex"
                    : "hidden"
                } md:flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700 sm:px-6 sm:text-sm`}
              >
                <span className="sm:hidden">
                  Search
                </span>

                <span className="hidden sm:inline">
                  Search Jobs
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CONTENT
      ======================================================== */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* TOP */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredJobs.length}
              </span>{" "}
              jobs

              {total > 0 && (
                <>
                  {" "}
                  of{" "}
                  <span className="font-semibold text-slate-700">
                    {total}
                  </span>
                </>
              )}
            </p>
          </div>

          {/* MOBILE FILTER */}
          <button
            type="button"
            onClick={() =>
              setMobileFilters(true)
            }
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold"
          >
            <SlidersHorizontal size={17} />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* ====================================================
              DESKTOP FILTER
          ==================================================== */}

          <aside className="hidden lg:block">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sticky top-24">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-slate-900">
                  Filters
                </h2>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Reset
                </button>
              </div>

              <FilterSection
                title="Department"
                filterKey="department"
              >
                <FilterContent
                  filterKey="department"
                  items={filters.department}
                />
              </FilterSection>

              <FilterSection
                title="Work Mode"
                filterKey="workMode"
              >
                <FilterContent
                  filterKey="workMode"
                  items={filters.workMode}
                />
              </FilterSection>

              <FilterSection
                title="Experience"
                filterKey="experience"
              >
                <FilterContent
                  filterKey="experience"
                  items={filters.experience}
                />
              </FilterSection>

              <FilterSection
                title="Location"
                filterKey="location"
              >
                <FilterContent
                  filterKey="location"
                  items={filters.location}
                />
              </FilterSection>

              <FilterSection
                title="Salary"
                filterKey="salary"
              >
                <FilterContent
                  filterKey="salary"
                  items={filters.salary}
                />
              </FilterSection>

              <FilterSection
                title="Company"
                filterKey="company"
              >
                <FilterContent
                  filterKey="company"
                  items={filters.company}
                />
              </FilterSection>

              <FilterSection
                title="Role"
                filterKey="role"
              >
                <FilterContent
                  filterKey="role"
                  items={filters.role}
                />
              </FilterSection>
            </div>
          </aside>

          {/* ====================================================
              JOB LIST
          ==================================================== */}

          <main className="min-w-0">
            {/* SORT */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="hidden sm:block text-sm text-slate-500">
                {filteredJobs.length} matching jobs
              </p>

              <div className="relative ml-auto">
                <button
                  type="button"
                  onClick={() =>
                    setSortOpen((prev) => !prev)
                  }
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700"
                >
                  <ArrowUpDown size={16} />

                  {sortBy === "relevance"
                    ? "Relevance"
                    : sortBy === "latest"
                    ? "Latest"
                    : sortBy === "salary-high"
                    ? "Salary: High to Low"
                    : "Salary: Low to High"}

                  <ChevronDown size={16} />
                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-lg z-30 overflow-hidden">
                    {[
                      ["relevance", "Relevance"],
                      ["latest", "Latest"],
                      [
                        "salary-high",
                        "Salary: High to Low",
                      ],
                      [
                        "salary-low",
                        "Salary: Low to High",
                      ],
                    ].map(
                      ([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            setSortBy(value);
                            setSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-50 ${
                            sortBy === value
                              ? "text-blue-600 font-semibold bg-blue-50"
                              : "text-slate-600"
                          }`}
                        >
                          {label}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* PAGINATION LOADING */}
            {loading && jobs.length > 0 && (
              <div className="mb-4 flex items-center gap-2 text-sm text-blue-600">
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Updating jobs...
              </div>
            )}

            {/* JOBS */}
            {filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center">
                  <Search
                    size={25}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  No jobs found
                </h3>

                <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
                  Try changing your search or removing some filters to see more jobs.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* ==================================================
                PAGINATION
            ================================================== */}

            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                <button
                  type="button"
                  disabled={page <= 1 || loading}
                  onClick={() =>
                    handlePageChange(page - 1)
                  }
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  Previous
                </button>

                {Array.from(
                  {
                    length: Math.min(
                      totalPages,
                      5
                    ),
                  },
                  (_, index) => {
                    let pageNumber =
                      index + 1;

                    if (
                      totalPages > 5 &&
                      page > 3
                    ) {
                      pageNumber = Math.min(
                        page - 2 + index,
                        totalPages - 4
                      );
                    }

                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          handlePageChange(
                            pageNumber
                          )
                        }
                        className={`w-10 h-10 rounded-lg text-sm font-semibold ${
                          page === pageNumber
                            ? "bg-blue-600 text-white"
                            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                )}

                <button
                  type="button"
                  disabled={
                    page >= totalPages ||
                    loading
                  }
                  onClick={() =>
                    handlePageChange(page + 1)
                  }
                  className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* ========================================================
          MOBILE FILTER DRAWER
      ======================================================== */}

      {mobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setMobileFilters(false)
            }
          />

          <div className="absolute right-0 top-0 h-full w-[90%] max-w-sm bg-white shadow-2xl overflow-y-auto">
            {/* HEADER */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between z-10">
              <h2 className="font-bold text-slate-900">
                Filters
              </h2>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-blue-600"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setMobileFilters(false)
                  }
                  className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* FILTER CONTENT */}
            <div className="px-5">
              <FilterSection
                title="Department"
                filterKey="department"
              >
                <FilterContent
                  filterKey="department"
                  items={filters.department}
                />
              </FilterSection>

              <FilterSection
                title="Work Mode"
                filterKey="workMode"
              >
                <FilterContent
                  filterKey="workMode"
                  items={filters.workMode}
                />
              </FilterSection>

              <FilterSection
                title="Experience"
                filterKey="experience"
              >
                <FilterContent
                  filterKey="experience"
                  items={filters.experience}
                />
              </FilterSection>

              <FilterSection
                title="Location"
                filterKey="location"
              >
                <FilterContent
                  filterKey="location"
                  items={filters.location}
                />
              </FilterSection>

              <FilterSection
                title="Salary"
                filterKey="salary"
              >
                <FilterContent
                  filterKey="salary"
                  items={filters.salary}
                />
              </FilterSection>

              <FilterSection
                title="Company"
                filterKey="company"
              >
                <FilterContent
                  filterKey="company"
                  items={filters.company}
                />
              </FilterSection>

              <FilterSection
                title="Role"
                filterKey="role"
              >
                <FilterContent
                  filterKey="role"
                  items={filters.role}
                />
              </FilterSection>
            </div>

            {/* APPLY */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4">
              <button
                type="button"
                onClick={() =>
                  setMobileFilters(false)
                }
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;