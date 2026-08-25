import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  Bookmark,
  BookmarkCheck,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  X,
  Check,
  CircleDollarSign,
  CalendarDays,
  Sparkles,
  Zap,
  Users,
} from "lucide-react";

// =========================================================
// JOB DATA
// =========================================================

const jobs = [
  {
    id: 1,
    title: "Hub Lead",
    company: "Paytm",
    location: "Noida",
    experience: "0-3 Yrs",
    salary: "₹6-12 LPA",
    type: "Full Time",
    workMode: "Work from office",
    department: "Operations",
    role: "Operations",
    stipend: null,
    posted: "2 days ago",
    applicants: "120+ applicants",
    description:
      "Coordinate and manage operational activities while ensuring smooth day-to-day hub operations.",
    skills: [
      "Operations Management",
      "Team Handling",
      "Inventory Management",
    ],
    logo: "P",
    logoClass: "bg-blue-50 text-blue-600",
  },

  {
    id: 2,
    title: "Hub Lead - Manager - Device Inventory",
    company: "Paytm",
    location: "Noida",
    experience: "2-5 Yrs",
    salary: "₹8-14 LPA",
    type: "Full Time",
    workMode: "Work from office",
    department: "Operations",
    role: "Operations",
    stipend: null,
    posted: "3 days ago",
    applicants: "80+ applicants",
    description:
      "Manage device inventory and ensure proper coordination between teams and operations.",
    skills: [
      "Inventory Management",
      "Team Management",
      "Operations",
    ],
    logo: "P",
    logoClass: "bg-blue-50 text-blue-600",
  },

  {
    id: 3,
    title: "Dy. Manager - Store & SAP",
    company: "Hindalco",
    location: "Gujarat",
    experience: "6-11 Yrs",
    salary: "₹6-15 LPA",
    type: "Full Time",
    workMode: "Work from office",
    department: "Engineering",
    role: "Operations",
    stipend: null,
    posted: "1 day ago",
    applicants: "35+ applicants",
    description:
      "Job responsibility includes managing inventory, store operations and SAP related activities.",
    skills: [
      "SAP",
      "Inventory",
      "Store Management",
      "Operations",
    ],
    logo: "H",
    logoClass: "bg-indigo-50 text-indigo-600",
    featured: true,
  },

  {
    id: 4,
    title: "Lead - Commercial Contract",
    company: "Adani Natural Resources",
    location: "Ahmedabad",
    experience: "8-12 Yrs",
    salary: "₹18-25 LPA",
    type: "Full Time",
    workMode: "Hybrid",
    department: "Sales & Business Development",
    role: "Sales & Marketing",
    stipend: null,
    posted: "Today",
    applicants: "60+ applicants",
    description:
      "Manage commercial contracts, negotiations and business relationships with key stakeholders.",
    skills: [
      "Contract Management",
      "Negotiation",
      "Commercial",
    ],
    logo: "A",
    logoClass: "bg-orange-50 text-orange-600",
    urgent: true,
  },

  {
    id: 5,
    title: "Operations Supervisor",
    company: "Marico",
    location: "Gurgaon",
    experience: "1-2 Yrs",
    salary: "₹4-7 LPA",
    type: "Full Time",
    workMode: "Work from office",
    department: "Operations",
    role: "Operations",
    stipend: null,
    posted: "4 days ago",
    applicants: "90+ applicants",
    description:
      "Supervise daily operations and coordinate with different teams to achieve operational targets.",
    skills: [
      "Operations",
      "Team Management",
      "Coordination",
    ],
    logo: "M",
    logoClass: "bg-cyan-50 text-cyan-600",
  },

  {
    id: 6,
    title: "Procurement Operations New Associate",
    company: "Accenture",
    location: "Pune",
    experience: "0-1 Yrs",
    salary: "₹3-6 LPA",
    type: "Full Time",
    workMode: "Hybrid",
    department: "Sales & Business Development",
    role: "Procurement & Purchase",
    stipend: null,
    posted: "5 days ago",
    applicants: "150+ applicants",
    description:
      "Support procurement operations and manage purchase-related activities and documentation.",
    skills: [
      "Procurement",
      "Purchase",
      "Operations",
    ],
    logo: "A",
    logoClass: "bg-purple-50 text-purple-600",
  },

  {
    id: 7,
    title: "Frontend Developer",
    company: "Infosys",
    location: "Bangalore",
    experience: "1-3 Yrs",
    salary: "₹5-9 LPA",
    type: "Full Time",
    workMode: "Hybrid",
    department: "Information Technology",
    role: "Software & IT",
    stipend: null,
    posted: "1 day ago",
    applicants: "200+ applicants",
    description:
      "Build responsive web applications using modern frontend technologies and reusable components.",
    skills: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    logo: "I",
    logoClass: "bg-blue-50 text-blue-700",
  },
];

// =========================================================
// FILTER DATA
// =========================================================

const filters = {
  department: [
    ["Information Technology", "314"],
    ["Engineering", "277"],
    ["Sales & Business Development", "1092"],
    ["Operations", "640"],
  ],

  workMode: [
    ["Work from office", "2300"],
    ["Hybrid", "672"],
    ["Remote", "320"],
  ],

  experience: [
    ["0-1 Yrs", "845"],
    ["1-3 Yrs", "1260"],
    ["3-5 Yrs", "920"],
    ["5-10 Yrs", "680"],
  ],

  location: [
    ["Noida", "517"],
    ["Gurgaon", "428"],
    ["Bangalore", "684"],
    ["Pune", "392"],
    ["Gujarat", "300"],
    ["Ahmedabad", "250"],
  ],

  salary: [
    ["0-3 Lakh", "125"],
    ["3-6 Lakh", "890"],
    ["6-10 Lakh", "730"],
    ["10-20 Lakh", "510"],
    ["20+ Lakh", "250"],
  ],

  company: [
    ["Paytm", "420"],
    ["Infosys", "315"],
    ["Accenture", "286"],
    ["Hindalco", "250"],
    ["Marico", "190"],
  ],

  role: [
    ["Procurement & Purchase", "532"],
    ["Software & IT", "892"],
    ["Sales & Marketing", "765"],
    ["Operations", "420"],
  ],

  stipend: [
    ["Unpaid", "54"],
    ["₹5K-10K", "230"],
    ["₹10K-20K", "420"],
    ["₹20K-30K", "165"],
  ],
};

// =========================================================
// INITIAL FILTER STATE
// =========================================================

const initialSelectedFilters = {
  department: [],
  workMode: [],
  experience: [],
  location: [],
  salary: [],
  company: [],
  role: [],
  stipend: [],
};

// =========================================================
// COMPONENT
// =========================================================

const Jobs = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const [mobileFilters, setMobileFilters] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Relevance");

  const [savedJobs, setSavedJobs] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState(
    initialSelectedFilters
  );

  const [openFilters, setOpenFilters] = useState({
    department: true,
    workMode: true,
    experience: true,
    location: true,
    salary: true,
    company: true,
    role: true,
    stipend: true,
  });

  // =========================================================
  // TOGGLE FILTER SECTION
  // =========================================================

  const toggleFilter = (filter) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  // =========================================================
  // SELECT / UNSELECT FILTER
  // =========================================================

  const handleFilterChange = (filterKey, value) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[filterKey];

      return {
        ...prev,
        [filterKey]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  // =========================================================
  // RESET FILTERS
  // =========================================================

  const resetFilters = () => {
    setSelectedFilters(initialSelectedFilters);
    setSearch("");
    setLocation("");
  };

  // =========================================================
  // SAVE JOB
  // =========================================================

  const toggleSaveJob = (id) => {
    setSavedJobs((prev) =>
      prev.includes(id)
        ? prev.filter((jobId) => jobId !== id)
        : [...prev, id]
    );
  };

  // =========================================================
  // SALARY HELPER
  // =========================================================

  const getSalaryRange = (salary) => {
    const numbers = salary.match(/\d+/g)?.map(Number) || [];

    const min = numbers[0] || 0;
    const max = numbers[1] || min;

    return { min, max };
  };

  // =========================================================
  // EXPERIENCE HELPER
  // =========================================================

  const getExperienceStart = (experience) => {
    return parseInt(experience.match(/\d+/)?.[0] || "0", 10);
  };

  // =========================================================
  // CHECK SALARY FILTER
  // =========================================================

  const matchesSalary = (job, selectedSalary) => {
    if (!selectedSalary.length) return true;

    const { min, max } = getSalaryRange(job.salary);

    return selectedSalary.some((range) => {
      if (range === "0-3 Lakh") {
        return min <= 3;
      }

      if (range === "3-6 Lakh") {
        return min <= 6 && max >= 3;
      }

      if (range === "6-10 Lakh") {
        return min <= 10 && max >= 6;
      }

      if (range === "10-20 Lakh") {
        return min <= 20 && max >= 10;
      }

      if (range === "20+ Lakh") {
        return max >= 20;
      }

      return true;
    });
  };

  // =========================================================
  // CHECK EXPERIENCE FILTER
  // =========================================================

  const matchesExperience = (job, selectedExperience) => {
    if (!selectedExperience.length) return true;

    const jobStart = getExperienceStart(job.experience);

    return selectedExperience.some((range) => {
      if (range === "0-1 Yrs") {
        return jobStart <= 1;
      }

      if (range === "1-3 Yrs") {
        return jobStart >= 1 && jobStart <= 3;
      }

      if (range === "3-5 Yrs") {
        return jobStart >= 3 && jobStart <= 5;
      }

      if (range === "5-10 Yrs") {
        return jobStart >= 5 && jobStart <= 10;
      }

      return true;
    });
  };

  // =========================================================
  // FILTER JOBS
  // =========================================================

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.department.toLowerCase().includes(query) ||
          job.role.toLowerCase().includes(query) ||
          job.skills.some((skill) =>
            skill.toLowerCase().includes(query)
          )
      );
    }

    if (location.trim()) {
      const query = location.toLowerCase().trim();

      result = result.filter((job) =>
        job.location.toLowerCase().includes(query)
      );
    }

    if (selectedFilters.department.length) {
      result = result.filter((job) =>
        selectedFilters.department.includes(job.department)
      );
    }

    if (selectedFilters.workMode.length) {
      result = result.filter((job) =>
        selectedFilters.workMode.includes(job.workMode)
      );
    }

    if (selectedFilters.experience.length) {
      result = result.filter((job) =>
        matchesExperience(job, selectedFilters.experience)
      );
    }

    if (selectedFilters.location.length) {
      result = result.filter((job) =>
        selectedFilters.location.includes(job.location)
      );
    }

    if (selectedFilters.salary.length) {
      result = result.filter((job) =>
        matchesSalary(job, selectedFilters.salary)
      );
    }

    if (selectedFilters.company.length) {
      result = result.filter((job) =>
        selectedFilters.company.includes(job.company)
      );
    }

    if (selectedFilters.role.length) {
      result = result.filter((job) =>
        selectedFilters.role.includes(job.role)
      );
    }

    if (selectedFilters.stipend.length) {
      result = result.filter((job) => {
        if (!job.stipend) return false;

        return selectedFilters.stipend.includes(job.stipend);
      });
    }

    if (sortBy === "Newest") {
      result = [...result].reverse();
    }

    if (sortBy === "Salary: High to Low") {
      result.sort((a, b) => {
        const aSalary = parseInt(
          a.salary.replace(/[^\d]/g, ""),
          10
        );

        const bSalary = parseInt(
          b.salary.replace(/[^\d]/g, ""),
          10
        );

        return bSalary - aSalary;
      });
    }

    return result;
  }, [
    search,
    location,
    selectedFilters,
    sortBy,
  ]);

  // =========================================================
  // JOB DETAIL
  // =========================================================

  const openJobDetail = (job) => {
    navigate(`/jobs/${job.id}`, {
      state: {
        job,
      },
    });
  };

  // =========================================================
  // FILTER SECTION
  // =========================================================

  const FilterSection = ({
    title,
    filterKey,
    items,
  }) => {
    const isOpen = openFilters[filterKey];

    return (
      <div className="border-b border-slate-200 py-4 last:border-b-0">
        <button
          type="button"
          onClick={() => toggleFilter(filterKey)}
          className="flex w-full min-w-0 items-center justify-between gap-3 text-left"
        >
          <span className="min-w-0 break-words text-sm font-bold text-slate-800">
            {title}
          </span>

          {isOpen ? (
            <ChevronUp
              size={17}
              className="shrink-0 text-slate-500"
            />
          ) : (
            <ChevronDown
              size={17}
              className="shrink-0 text-slate-500"
            />
          )}
        </button>

        {isOpen && (
          <div className="mt-3 space-y-3">
            {items.map(([label, count]) => {
              const checked =
                selectedFilters[filterKey].includes(label);

              return (
                <label
                  key={label}
                  className="group flex min-w-0 cursor-pointer items-start gap-2.5"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      handleFilterChange(
                        filterKey,
                        label
                      )
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span
                    className={`min-w-0 flex-1 break-words text-xs leading-5 transition ${
                      checked
                        ? "font-semibold text-blue-600"
                        : "text-slate-600 group-hover:text-blue-600"
                    }`}
                  >
                    {label}
                  </span>

                  <span className="shrink-0 whitespace-nowrap text-[11px] font-medium text-slate-400">
                    ({count})
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // =========================================================
  // FILTER CONTENT
  // =========================================================

  const FilterContent = () => (
    <div className="min-w-0">
      <div className="flex min-w-0 items-start justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-900">
            All Filters
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Refine your job search
          </p>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="shrink-0 whitespace-nowrap text-xs font-bold text-blue-600 hover:text-blue-700"
        >
          Reset All
        </button>
      </div>

      <FilterSection
        title="Department"
        filterKey="department"
        items={filters.department}
      />

      <FilterSection
        title="Work Mode"
        filterKey="workMode"
        items={filters.workMode}
      />

      <FilterSection
        title="Experience"
        filterKey="experience"
        items={filters.experience}
      />

      <FilterSection
        title="Location"
        filterKey="location"
        items={filters.location}
      />

      <FilterSection
        title="Salary"
        filterKey="salary"
        items={filters.salary}
      />

      <FilterSection
        title="Company"
        filterKey="company"
        items={filters.company}
      />

      <FilterSection
        title="Role Category"
        filterKey="role"
        items={filters.role}
      />

      <FilterSection
        title="Stipend"
        filterKey="stipend"
        items={filters.stipend}
      />
    </div>
  );

  // =========================================================
  // JOB CARD
  // =========================================================

  const JobCard = ({ job }) => {
    const saved = savedJobs.includes(job.id);

    return (
      <article
        onClick={() => openJobDetail(job)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openJobDetail(job);
          }
        }}
        tabIndex={0}
        role="button"
        className={`group relative w-full min-w-0 cursor-pointer overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-slate-200/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          job.featured
            ? "border-blue-100"
            : "border-slate-200"
        }`}
      >
        {/* Featured */}
        {job.featured && (
          <div className="flex min-w-0 items-center gap-1.5 border-b border-blue-100 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 sm:px-4">
            <Sparkles size={13} className="shrink-0" />
            <span className="truncate">
              Featured Job
            </span>
          </div>
        )}

        {/* Urgent */}
        {job.urgent && (
          <div className="border-b border-orange-100 bg-orange-50 px-3 py-2.5 sm:px-4">
            <div className="flex min-w-0 items-center gap-1.5 text-xs font-bold text-orange-600">
              <Zap size={13} className="shrink-0" />

              <span className="truncate">
                We're urgently hiring
              </span>
            </div>

            <p className="mt-0.5 break-words text-[11px] text-orange-500">
              Hiring for immediate joining
            </p>
          </div>
        )}

        <div className="min-w-0 p-3 sm:p-5">
          {/* TOP */}
          <div className="flex min-w-0 items-start gap-2.5 sm:gap-3.5">
            {/* Logo */}
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-100 text-base font-black shadow-sm sm:h-12 sm:w-12 ${job.logoClass}`}
            >
              {job.logo}
            </div>

            {/* Job info */}
            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 items-start gap-2">
                <div className="min-w-0 flex-1 pr-0.5">
                  <h2 className="break-words text-sm font-bold leading-5 text-slate-900 transition group-hover:text-blue-600 sm:text-base">
                    {job.title}
                  </h2>

                  <p className="mt-1 break-words text-xs font-semibold leading-5 text-slate-600 sm:text-sm">
                    {job.company}
                  </p>
                </div>

                {/* Save */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveJob(job.id);
                  }}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                    saved
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                  aria-label={
                    saved ? "Unsave job" : "Save job"
                  }
                >
                  {saved ? (
                    <BookmarkCheck size={18} />
                  ) : (
                    <Bookmark size={18} />
                  )}
                </button>
              </div>

              {/* META */}
              <div className="mt-3 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-slate-600 sm:gap-x-4 sm:text-xs">
                <span className="flex min-w-0 items-center gap-1.5">
                  <BriefcaseBusiness
                    size={13}
                    className="shrink-0 text-slate-400"
                  />

                  <span className="break-words">
                    {job.experience}
                  </span>
                </span>

                <span className="flex min-w-0 items-center gap-1.5">
                  <CircleDollarSign
                    size={13}
                    className="shrink-0 text-slate-400"
                  />

                  <span className="break-words">
                    {job.salary}
                  </span>
                </span>

                <span className="flex min-w-0 items-center gap-1.5">
                  <MapPin
                    size={13}
                    className="shrink-0 text-slate-400"
                  />

                  <span className="break-words">
                    {job.location}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-4 line-clamp-2 break-words text-xs leading-5 text-slate-600 sm:text-sm">
            {job.description}
          </p>

          {/* SKILLS */}
          <div className="mt-4 flex min-w-0 flex-wrap gap-1.5 sm:gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="max-w-full break-words rounded-md bg-slate-100 px-2 py-1.5 text-[10px] font-semibold leading-4 text-slate-600 sm:px-2.5 sm:text-xs"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* BOTTOM */}
          <div className="mt-4 flex min-w-0 flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-[10px] text-slate-500 sm:gap-x-4 sm:text-xs">
              <span className="flex min-w-0 items-center gap-1.5">
                <Clock3 size={13} className="shrink-0" />

                <span className="break-words">
                  {job.posted}
                </span>
              </span>

              <span className="flex min-w-0 items-center gap-1.5">
                <Users size={13} className="shrink-0" />

                <span className="break-words">
                  {job.applicants}
                </span>
              </span>

              <span className="flex min-w-0 items-center gap-1.5">
                <CalendarDays
                  size={13}
                  className="shrink-0"
                />

                <span className="break-words">
                  {job.type}
                </span>
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openJobDetail(job);
              }}
              className="w-full shrink-0 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md sm:w-auto"
            >
              View Details
            </button>
          </div>
        </div>
      </article>
    );
  };

  // =========================================================
  // ACTIVE FILTER COUNT
  // =========================================================

  const activeFilterCount = Object.values(
    selectedFilters
  ).reduce(
    (total, values) => total + values.length,
    0
  );

  // =========================================================
  // SORT OPTIONS
  // =========================================================

  const sortOptions = [
    "Relevance",
    "Newest",
    "Salary: High to Low",
  ];

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-hidden bg-slate-50">
      <div className="mx-auto w-full max-w-7xl min-w-0 px-2.5 py-3 sm:px-4 sm:py-5 md:px-5 lg:px-6 xl:px-0">

        {/* =====================================================
            SEARCH HEADER
        ====================================================== */}

        <section className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm sm:p-4">
          <div className="flex min-w-0 flex-col gap-2.5 sm:gap-3 md:flex-row">

            {/* Search */}
            <div className="relative min-w-0 flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search jobs, skills, companies..."
                className="h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:pr-4"
              />
            </div>

            {/* Location */}
            <div className="relative min-w-0 md:w-52 lg:w-60">
              <MapPin
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="Search location"
                className="h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:pr-4"
              />
            </div>

            {/* Search Button */}
            <button
              type="button"
              className="flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md sm:px-6 md:w-auto"
            >
              <Search size={17} />
              Search
            </button>
          </div>
        </section>

        {/* =====================================================
            MOBILE ACTIONS
        ====================================================== */}

        <div className="mt-3 flex w-full min-w-0 gap-2 lg:hidden">
          {/* FILTER */}
          <button
            type="button"
            onClick={() => setMobileFilters(true)}
            className="relative flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-3 text-xs font-bold text-slate-700 shadow-sm sm:px-4 sm:text-sm"
          >
            <SlidersHorizontal
              size={16}
              className="shrink-0"
            />

            <span className="truncate">
              Filters
            </span>

            {activeFilterCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* SORT */}
          <div className="relative min-w-0 flex-1">
            <button
              type="button"
              onClick={() =>
                setSortOpen((prev) => !prev)
              }
              className="flex w-full min-w-0 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-3 text-xs font-bold text-slate-700 shadow-sm sm:gap-2 sm:px-4 sm:text-sm"
            >
              <ChevronDown
                size={16}
                className="shrink-0"
              />

              <span className="truncate">
                {sortBy}
              </span>
            </button>

            {sortOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] z-30 w-full min-w-[170px] overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-xl">
                {sortOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSortBy(item);
                      setSortOpen(false);
                    }}
                    className="flex w-full items-center justify-between gap-2 rounded-md px-3 py-3 text-left text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 sm:text-sm"
                  >
                    <span className="break-words">
                      {item}
                    </span>

                    {sortBy === item && (
                      <Check
                        size={15}
                        className="shrink-0"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="mt-4 grid min-w-0 gap-4 sm:gap-5 lg:grid-cols-[270px_minmax(0,1fr)] xl:grid-cols-[285px_minmax(0,1fr)]">

          {/* ===================================================
              DESKTOP SIDEBAR
          ==================================================== */}

          <aside className="hidden min-w-0 lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] min-w-0 overflow-y-auto overflow-x-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <FilterContent />
            </div>
          </aside>

          {/* ===================================================
              JOB LIST
          ==================================================== */}

          <section className="min-w-0 w-full">

            {/* HEADER */}
            <div className="mb-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Latest Jobs
                </h1>

                <p className="mt-1 break-words text-xs text-slate-500 sm:text-sm">
                  Showing{" "}
                  <span className="font-bold text-slate-700">
                    {filteredJobs.length}
                  </span>{" "}
                  jobs matching your search
                </p>
              </div>

              {/* DESKTOP SORT */}
              <div className="relative hidden shrink-0 sm:block">
                <button
                  type="button"
                  onClick={() =>
                    setSortOpen((prev) => !prev)
                  }
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 shadow-sm"
                >
                  Sort by:

                  <span className="text-slate-900">
                    {sortBy}
                  </span>

                  <ChevronDown size={15} />
                </button>

                {sortOpen && (
                  <div className="absolute right-0 top-12 z-30 w-52 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-xl">
                    {sortOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setSortBy(item);
                          setSortOpen(false);
                        }}
                        className="flex w-full items-center justify-between gap-2 rounded-md px-3 py-3 text-left text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <span>{item}</span>

                        {sortBy === item && (
                          <Check size={15} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* =================================================
                ACTIVE FILTERS
            ================================================== */}

            {activeFilterCount > 0 && (
              <div className="mb-4 flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="mr-1 text-xs font-bold text-slate-600">
                  Active filters:
                </span>

                {Object.entries(selectedFilters).map(
                  ([key, values]) =>
                    values.map((value) => (
                      <button
                        key={`${key}-${value}`}
                        type="button"
                        onClick={() =>
                          handleFilterChange(
                            key,
                            value
                          )
                        }
                        className="flex max-w-full min-w-0 items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1.5 text-[10px] font-semibold text-blue-700 sm:px-3 sm:text-xs"
                      >
                        <span className="max-w-[180px] break-words sm:max-w-[250px]">
                          {value}
                        </span>

                        <X
                          size={12}
                          className="shrink-0"
                        />
                      </button>
                    ))
                )}

                <button
                  type="button"
                  onClick={resetFilters}
                  className="shrink-0 text-xs font-bold text-red-500 hover:text-red-600"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* =================================================
                JOBS
            ================================================== */}

            <div className="w-full min-w-0 space-y-3.5 sm:space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                  />
                ))
              ) : (
                <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-12 text-center sm:px-5 sm:py-16">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                    <Search
                      size={22}
                      className="text-slate-400"
                    />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-slate-800">
                    No jobs found
                  </h3>

                  <p className="mx-auto mt-2 max-w-md break-words text-sm leading-6 text-slate-500">
                    We couldn't find jobs matching your
                    selected filters. Try changing or
                    clearing some filters.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* =================================================
                PAGINATION
            ================================================== */}

            <div className="mt-6 flex w-full items-center justify-center gap-1.5 overflow-x-auto px-1 sm:gap-2">
              <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm text-slate-500">
                1
              </button>

              <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">
                2
              </button>

              <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600">
                3
              </button>

              <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-blue-50 hover:text-blue-600">
                <ChevronRight size={16} />
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* =====================================================
          MOBILE FILTER DRAWER
      ====================================================== */}

      {mobileFilters && (
        <div className="fixed inset-0 z-[100] h-[100dvh] w-full lg:hidden">

          {/* Overlay */}
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFilters(false)}
            className="absolute inset-0 h-full w-full bg-slate-900/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <aside className="absolute bottom-0 left-0 top-0 flex h-[100dvh] w-[calc(100%-28px)] max-w-sm flex-col overflow-hidden bg-white shadow-2xl sm:w-[88%]">

            {/* HEADER */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3.5 sm:px-5 sm:py-4">
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-slate-900">
                  Filters
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Refine your job search
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileFilters(false)
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* FILTER BODY */}
            <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-2 sm:p-5">
              <FilterContent />
            </div>

            {/* BOTTOM */}
            <div className="shrink-0 border-t border-slate-200 bg-white p-3.5 sm:p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="min-w-0 text-xs font-semibold text-slate-600 sm:text-sm">
                  {activeFilterCount} filters selected
                </span>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="shrink-0 text-xs font-bold text-red-500"
                >
                  Clear All
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMobileFilters(false)
                }
                className="w-full rounded-lg bg-blue-600 py-3.5 text-sm font-bold text-white shadow-md hover:bg-blue-700"
              >
                Show {filteredJobs.length} Jobs
              </button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
};

export default Jobs;