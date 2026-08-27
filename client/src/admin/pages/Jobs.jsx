// src/admin/pages/Jobs.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  Save,
  Briefcase,
  Calendar,
  MapPin,
  Building2,
  Users,
  Clock,
  IndianRupee,
  Eye,
  Filter,
  ChevronDown,
  PlusCircle,
  Trash,
  Tag,
  ListChecks,
  FileText,
} from "lucide-react";
import StateCard from "../components/StateCard";
import { useJobCategories } from "../context/JobCategoryContext";

// Mock Jobs data - Replace with API integration
const mockJobsData = [
  {
    id: "JOB001",
    title: "Frontend Developer",
    company: "Infosys",
    categoryId: "CAT001",
    categoryName: "Information Technology",
    location: "Bangalore, India",
    jobType: "Full Time",
    experience: "0-3 Yrs",
    salary: "₹5-9 LPA",
    description:
      "Build responsive web applications using modern frontend technologies and reusable components.",
    responsibilities: [
      "Manage daily activities and coordinate with different teams.",
      "Maintain smooth communication with internal stakeholders.",
      "Monitor operational performance and achieve targets.",
      "Prepare reports and maintain required documentation.",
      "Work collaboratively with team members and management.",
    ],
    requirements: [
      "Good communication and interpersonal skills.",
      "Ability to work independently and as part of a team.",
      "Strong problem-solving and analytical skills.",
      "Relevant experience in the required field.",
      "Good understanding of the job responsibilities.",
    ],
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind"],
    applicantCount: 156,
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "JOB002",
    title: "Backend Developer",
    company: "TCS",
    categoryId: "CAT001",
    categoryName: "Information Technology",
    location: "Mumbai, India",
    jobType: "Full Time",
    experience: "3-5 Yrs",
    salary: "₹8-15 LPA",
    description:
      "Design and develop scalable backend services and APIs for enterprise applications.",
    responsibilities: [
      "Design and implement RESTful APIs.",
      "Optimize database queries and performance.",
      "Collaborate with frontend developers.",
      "Write clean, maintainable code.",
      "Participate in code reviews.",
    ],
    requirements: [
      "Strong knowledge of Node.js or Java.",
      "Experience with databases like PostgreSQL or MongoDB.",
      "Understanding of microservices architecture.",
      "Good problem-solving skills.",
      "Team player with good communication.",
    ],
    skills: ["Node.js", "Express", "MongoDB", "SQL", "Docker"],
    applicantCount: 89,
    status: "active",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
  {
    id: "JOB003",
    title: "UI/UX Designer",
    company: "Wipro",
    categoryId: "CAT006",
    categoryName: "Design",
    location: "Remote",
    jobType: "Full Time",
    experience: "1-3 Yrs",
    salary: "₹4-8 LPA",
    description:
      "Create user-centered designs for web and mobile applications.",
    responsibilities: [
      "Create wireframes and prototypes.",
      "Conduct user research and testing.",
      "Design user interfaces and interactions.",
      "Collaborate with developers.",
      "Maintain design systems.",
    ],
    requirements: [
      "Proficiency in Figma or Adobe XD.",
      "Understanding of user-centered design principles.",
      "Portfolio demonstrating design work.",
      "Good visual design skills.",
      "Ability to accept and implement feedback.",
    ],
    skills: ["Figma", "Adobe XD", "Prototyping", "UI Design", "UX Research"],
    applicantCount: 67,
    status: "active",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01",
  },
  {
    id: "JOB004",
    title: "Digital Marketing Manager",
    company: "Accenture",
    categoryId: "CAT002",
    categoryName: "Marketing",
    location: "Delhi, India",
    jobType: "Full Time",
    experience: "5+ Yrs",
    salary: "₹12-20 LPA",
    description: "Lead digital marketing campaigns and drive brand growth.",
    responsibilities: [
      "Develop marketing strategies.",
      "Manage social media campaigns.",
      "Analyze marketing metrics.",
      "Lead a team of marketers.",
      "Coordinate with external agencies.",
    ],
    requirements: [
      "Proven experience in digital marketing.",
      "Strong analytical skills.",
      "Experience with marketing tools.",
      "Leadership abilities.",
      "Excellent communication skills.",
    ],
    skills: ["SEO", "SEM", "Social Media", "Analytics", "Content Strategy"],
    applicantCount: 45,
    status: "active",
    createdAt: "2024-02-10",
    updatedAt: "2024-02-10",
  },
  {
    id: "JOB005",
    title: "Data Analyst",
    company: "Cognizant",
    categoryId: "CAT001",
    categoryName: "Information Technology",
    location: "Chennai, India",
    jobType: "Full Time",
    experience: "1-3 Yrs",
    salary: "₹4-7 LPA",
    description:
      "Analyze data to provide actionable insights for business decisions.",
    responsibilities: [
      "Collect and analyze data.",
      "Create reports and dashboards.",
      "Identify trends and patterns.",
      "Present findings to stakeholders.",
      "Collaborate with teams.",
    ],
    requirements: [
      "Proficiency in SQL and Excel.",
      "Experience with data visualization tools.",
      "Strong analytical mindset.",
      "Attention to detail.",
      "Good communication skills.",
    ],
    skills: ["SQL", "Python", "Excel", "Power BI", "Statistics"],
    applicantCount: 78,
    status: "draft",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-01",
  },
  {
    id: "JOB006",
    title: "Sales Executive",
    company: "HDFC Bank",
    categoryId: "CAT005",
    categoryName: "Sales",
    location: "Pune, India",
    jobType: "Full Time",
    experience: "0-3 Yrs",
    salary: "₹3-6 LPA",
    description: "Generate leads and close sales for banking products.",
    responsibilities: [
      "Identify potential customers.",
      "Present products to clients.",
      "Negotiate and close deals.",
      "Maintain customer relationships.",
      "Achieve sales targets.",
    ],
    requirements: [
      "Good communication skills.",
      "Sales-oriented mindset.",
      "Ability to work under pressure.",
      "Customer service experience.",
      "Goal-driven attitude.",
    ],
    skills: ["Communication", "Negotiation", "CRM", "Lead Generation"],
    applicantCount: 34,
    status: "active",
    createdAt: "2024-03-10",
    updatedAt: "2024-03-10",
  },
  {
    id: "JOB007",
    title: "Content Writer",
    company: "Zoho",
    categoryId: "CAT002",
    categoryName: "Marketing",
    location: "Remote",
    jobType: "Part Time",
    experience: "0-3 Yrs",
    salary: "₹2-4 LPA",
    description:
      "Create engaging content for blogs, websites, and social media.",
    responsibilities: [
      "Write blog posts and articles.",
      "Create social media content.",
      "Edit and proofread content.",
      "Research industry topics.",
      "Optimize content for SEO.",
    ],
    requirements: [
      "Excellent writing skills.",
      "Understanding of SEO.",
      "Ability to meet deadlines.",
      "Creative thinking.",
      "Basic knowledge of content tools.",
    ],
    skills: ["Writing", "SEO", "Editing", "Research", "WordPress"],
    applicantCount: 23,
    status: "active",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-15",
  },
  {
    id: "JOB008",
    title: "HR Recruiter",
    company: "Amazon",
    categoryId: "CAT007",
    categoryName: "Human Resources",
    location: "Hyderabad, India",
    jobType: "Full Time",
    experience: "3-5 Yrs",
    salary: "₹6-10 LPA",
    description: "Manage recruitment process and talent acquisition.",
    responsibilities: [
      "Source and screen candidates.",
      "Conduct interviews.",
      "Coordinate with hiring managers.",
      "Maintain candidate database.",
      "Ensure smooth onboarding.",
    ],
    requirements: [
      "Experience in recruitment.",
      "Good communication skills.",
      "Understanding of HR processes.",
      "Ability to multitask.",
      "Professional attitude.",
    ],
    skills: ["Recruitment", "Interviewing", "HR Software", "Communication"],
    applicantCount: 12,
    status: "closed",
    createdAt: "2024-04-01",
    updatedAt: "2024-04-01",
  },
];

const Jobs = () => {
  const navigate = useNavigate();
  // State Management
  const [jobs, setJobs] = useState([]);
  const { categories, activeCategories } = useJobCategories();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [editingJob, setEditingJob] = useState(null);
  const [deletingJob, setDeletingJob] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch jobs - Replace with actual API call
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setJobs(mockJobsData);
    } catch (err) {
      setError("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Calculate statistics dynamically
  const statistics = useMemo(() => {
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter((job) => job.status === "active").length;
    const totalApplicants = jobs.reduce(
      (sum, job) => sum + (job.applicantCount || 0),
      0,
    );
    const jobsThisMonth = jobs.filter((job) => {
      const jobDate = new Date(job.createdAt);
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return jobDate >= firstDayOfMonth;
    }).length;

    return {
      totalJobs,
      activeJobs,
      totalApplicants,
      jobsThisMonth,
    };
  }, [jobs]);

  const categoryNameById = useMemo(() => {
    return categories.reduce((lookup, category) => {
      lookup[category.id] = category.name;
      return lookup;
    }, {});
  }, [categories]);

  const getJobCategoryName = useCallback(
    (job) =>
      categoryNameById[job.categoryId] ||
      job.categoryName ||
      "Deleted Category",
    [categoryNameById],
  );

  // Filter and search jobs
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Apply search
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.location.toLowerCase().includes(searchLower) ||
          getJobCategoryName(job).toLowerCase().includes(searchLower),
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((job) => job.categoryId === categoryFilter);
    }

    // Apply sort
    switch (sortOrder) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "company":
        result.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case "applicants":
        result.sort((a, b) => b.applicantCount - a.applicantCount);
        break;
      default:
        break;
    }

    return result;
  }, [jobs, searchTerm, categoryFilter, sortOrder, getJobCategoryName]);

  // Handle edit job
  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsEditModalOpen(true);
  };

  // Handle save edited job
  const handleSaveJob = async (updatedJob) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)),
      );
      setIsEditModalOpen(false);
      setEditingJob(null);
      showNotification("Job updated successfully", "success");
    } catch (err) {
      showNotification("Failed to update job", "error");
    }
  };

  // Handle delete job
  const handleDeleteJob = (job) => {
    setDeletingJob(job);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete job
  const handleConfirmDelete = async () => {
    if (!deletingJob) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setJobs((prevJobs) =>
        prevJobs.filter((job) => job.id !== deletingJob.id),
      );
      setIsDeleteModalOpen(false);
      setDeletingJob(null);
      showNotification("Job deleted successfully", "success");
    } catch (err) {
      showNotification("Failed to delete job", "error");
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
    setCategoryFilter("all");
    setSortOrder("newest");
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format applicants count
  const formatApplicants = (count) => {
    if (count >= 200) return "200+";
    return count.toString();
  };

  // Loading state
  if (loading) {
    return <JobsLoadingState />;
  }

  // Error state
  if (error) {
    return <JobsErrorState error={error} onRetry={fetchJobs} />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            Job Management
          </p>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            Manage Jobs
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create, manage and monitor job opportunities on CareerSphere.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/jobs/create")}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          Add New Job
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StateCard
          title="Total Jobs"
          value={statistics.totalJobs}
          icon={<Briefcase className="w-6 h-6 text-blue-600" />}
          description="All job postings"
          iconBg="bg-blue-50"
        />
        <StateCard
          title="Active Jobs"
          value={statistics.activeJobs}
          icon={<CheckCircle2 className="w-6 h-6 text-green-600" />}
          description="Currently active"
          iconBg="bg-green-50"
        />
        <StateCard
          title="Total Applicants"
          value={statistics.totalApplicants}
          icon={<Users className="w-6 h-6 text-indigo-600" />}
          description="Across all jobs"
          iconBg="bg-indigo-50"
        />
        <StateCard
          title="Jobs This Month"
          value={statistics.jobsThisMonth}
          icon={<Calendar className="w-6 h-6 text-purple-600" />}
          description="Posted this month"
          iconBg="bg-purple-50"
        />
      </div>

      {/* Jobs Management Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        {/* Card Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">All Jobs</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Showing {filteredJobs.length} job
                {filteredJobs.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title, company, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-colors"
                />
              </div>

              {/* Filters - Only Category and Sort */}
              <div className="flex flex-col sm:flex-row gap-2">
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
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-700"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title A-Z</option>
                  <option value="company">Company A-Z</option>
                  <option value="applicants">Most Applicants</option>
                </select>

                {(searchTerm ||
                  categoryFilter !== "all" ||
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

        {/* Jobs Table */}
        {filteredJobs.length === 0 ? (
          <JobsEmptyState
            hasFilters={searchTerm || categoryFilter !== "all"}
            onClear={clearFilters}
            onAdd={() => navigate("/admin/jobs/create")}
          />
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[200px]">
                      Job
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[180px]">
                      Category
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[150px]">
                      Location
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[110px]">
                      Experience
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[110px]">
                      Salary
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">
                      Applicants
                    </th>
                    <th className="text-left px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[120px]">
                      Posted
                    </th>
                    <th className="text-right px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap min-w-[100px]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      {/* Job */}
                      <td className="px-4 py-4 min-w-[200px]">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">
                            {job.title}
                          </p>
                          <p className="text-xs text-slate-500 truncate flex items-center gap-1 whitespace-nowrap">
                            <Building2 className="w-3 h-3 flex-shrink-0" />
                            {job.company}
                          </p>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-4 min-w-[180px]">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 whitespace-nowrap">
                          {getJobCategoryName(job)}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="px-4 py-4 min-w-[150px]">
                        <p className="text-sm text-slate-700 flex items-center gap-1.5 whitespace-nowrap">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          {job.location}
                        </p>
                      </td>

                      {/* Experience */}
                      <td className="px-4 py-4 min-w-[110px]">
                        <span className="text-sm text-slate-700 whitespace-nowrap">
                          {job.experience}
                        </span>
                      </td>

                      {/* Salary */}
                      <td className="px-4 py-4 min-w-[110px]">
                        <p className="text-sm text-slate-700 flex items-center gap-1 whitespace-nowrap">
                          <IndianRupee className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          {job.salary}
                        </p>
                      </td>

                      {/* Applicants */}
                      <td className="px-4 py-4 min-w-[120px]">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 whitespace-nowrap">
                          <Users className="w-3.5 h-3.5 flex-shrink-0" />
                          {formatApplicants(job.applicantCount)}
                        </span>
                      </td>

                      {/* Posted Date */}
                      <td className="px-4 py-4 min-w-[120px]">
                        <p className="text-sm text-slate-700 whitespace-nowrap">
                          {formatDate(job.createdAt)}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 min-w-[100px]">
                        <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                          <button
                            onClick={() => handleEditJob(job)}
                            className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors flex-shrink-0"
                            title="Edit job"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0"
                            title="Delete job"
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

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden divide-y divide-slate-100">
              {filteredJobs.map((job) => (
                <div key={job.id} className="p-4 space-y-3">
                  {/* Job Info */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">
                        {job.title}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3" />
                        {job.company}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs text-slate-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span className="text-xs text-slate-600">
                          {job.experience}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleEditJob(job)}
                        className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Edit job"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete job"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {getJobCategoryName(job)}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      <Users className="w-3 h-3" />
                      {formatApplicants(job.applicantCount)} applicants
                    </span>
                    <span className="text-xs text-slate-600 flex items-center gap-1">
                      <IndianRupee className="w-3 h-3" />
                      {job.salary}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {formatDate(job.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Edit Job Modal */}
      {isEditModalOpen && editingJob && (
        <JobModal
          mode="edit"
          job={editingJob}
          categories={categories.filter(
            (category) =>
              category.status === "active" ||
              category.id === editingJob.categoryId,
          )}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingJob(null);
          }}
          onSave={handleSaveJob}
          existingJobs={jobs}
        />
      )}

      {/* Delete Job Modal */}
      {isDeleteModalOpen && deletingJob && (
        <DeleteJobModal
          job={deletingJob}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingJob(null);
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

// Job Modal Component (Edit only)
const JobModal = ({ mode, job, categories, onClose, onSave, existingJobs }) => {
  const [formData, setFormData] = useState({
    title: job?.title || "",
    company: job?.company || "",
    categoryId: job?.categoryId || "",
    location: job?.location || "",
    jobType: job?.jobType || "Full Time",
    experience: job?.experience || "0-3 Yrs",
    salary: job?.salary || "",
    description: job?.description || "",
    responsibilities: job?.responsibilities || [""],
    requirements: job?.requirements || [""],
    skills: job?.skills || [],
    status: job?.status || "active",
  });
  const [newSkill, setNewSkill] = useState("");
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const hasSelectedCategory = categories.some(
    (category) => category.id === formData.categoryId,
  );

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.company.trim())
      newErrors.company = "Company name is required";
    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.salary.trim()) newErrors.salary = "Salary is required";
    if (!formData.description.trim())
      newErrors.description = "Job description is required";

    const validResponsibilities = formData.responsibilities.filter((r) =>
      r.trim(),
    );
    if (validResponsibilities.length === 0)
      newErrors.responsibilities = "At least one responsibility is required";

    const validRequirements = formData.requirements.filter((r) => r.trim());
    if (validRequirements.length === 0)
      newErrors.requirements = "At least one requirement is required";

    if (formData.skills.length === 0)
      newErrors.skills = "At least one skill is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);

    const selectedCategory = categories.find(
      (c) => c.id === formData.categoryId,
    );
    const jobData = {
      ...formData,
      id: job?.id || `JOB${String(Date.now()).slice(-6)}`,
      categoryName:
        selectedCategory?.name || job?.categoryName || "Deleted Category",
      responsibilities: formData.responsibilities.filter((r) => r.trim()),
      requirements: formData.requirements.filter((r) => r.trim()),
      applicantCount: job?.applicantCount || 0,
      createdAt: job?.createdAt || new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    await onSave(jobData);
    setIsSaving(false);
  };

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[index] = value;
    setFormData({ ...formData, responsibilities: newResponsibilities });
  };

  const addResponsibility = () => {
    setFormData({
      ...formData,
      responsibilities: [...formData.responsibilities, ""],
    });
  };

  const removeResponsibility = (index) => {
    const newResponsibilities = formData.responsibilities.filter(
      (_, i) => i !== index,
    );
    setFormData({ ...formData, responsibilities: newResponsibilities });
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({ ...formData, requirements: newRequirements });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ""],
    });
  };

  const removeRequirement = (index) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, requirements: newRequirements });
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Edit Job</h3>
            <p className="text-sm text-slate-500 mt-0.5">
              Update job information
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-800">
              Basic Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.title ? "border-red-300" : "border-slate-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                  placeholder="e.g., Frontend Developer"
                />
                {errors.title && (
                  <p className="text-xs text-red-600 mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.company ? "border-red-300" : "border-slate-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                  placeholder="e.g., Infosys"
                />
                {errors.company && (
                  <p className="text-xs text-red-600 mt-1">{errors.company}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.categoryId ? "border-red-300" : "border-slate-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                >
                  <option value="">Select Category</option>
                  {mode === "edit" &&
                    formData.categoryId &&
                    !hasSelectedCategory && (
                      <option value={formData.categoryId}>
                        {job?.categoryName || "Deleted Category"}
                      </option>
                    )}
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.categoryId}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.location ? "border-red-300" : "border-slate-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                  placeholder="e.g., Bangalore, India"
                />
                {errors.location && (
                  <p className="text-xs text-red-600 mt-1">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Job Type *
                </label>
                <select
                  value={formData.jobType}
                  onChange={(e) =>
                    setFormData({ ...formData, jobType: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Experience *
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                >
                  <option value="0-3 Yrs">0-3 Yrs</option>
                  <option value="1-3 Yrs">1-3 Yrs</option>
                  <option value="3-5 Yrs">3-5 Yrs</option>
                  <option value="5+ Yrs">5+ Yrs</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Salary *
                </label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.salary ? "border-red-300" : "border-slate-200"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                  placeholder="e.g., ₹5-9 LPA"
                />
                {errors.salary && (
                  <p className="text-xs text-red-600 mt-1">{errors.salary}</p>
                )}
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
                  <option value="draft">Draft</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-800">
              Job Description
            </h4>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  errors.description ? "border-red-300" : "border-slate-200"
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
                rows="3"
                placeholder="Brief description of the job"
              />
              {errors.description && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Responsibilities */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-800">
                Responsibilities *
              </h4>
              <button
                type="button"
                onClick={addResponsibility}
                className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                <PlusCircle className="w-4 h-4" />
                Add
              </button>
            </div>
            {formData.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={responsibility}
                  onChange={(e) =>
                    handleResponsibilityChange(index, e.target.value)
                  }
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                  placeholder="Enter responsibility"
                />
                {formData.responsibilities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeResponsibility(index)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {errors.responsibilities && (
              <p className="text-xs text-red-600">{errors.responsibilities}</p>
            )}
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-800">
                Requirements *
              </h4>
              <button
                type="button"
                onClick={addRequirement}
                className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                <PlusCircle className="w-4 h-4" />
                Add
              </button>
            </div>
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) =>
                    handleRequirementChange(index, e.target.value)
                  }
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                  placeholder="Enter requirement"
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {errors.requirements && (
              <p className="text-xs text-red-600">{errors.requirements}</p>
            )}
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-800">
              Skills Required *
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
                placeholder="Type a skill and press Enter"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700"
              >
                Add
              </button>
            </div>
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {errors.skills && (
              <p className="text-xs text-red-600">{errors.skills}</p>
            )}
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

// Delete Job Modal Component
const DeleteJobModal = ({ job, onClose, onConfirm }) => {
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
                Delete Job?
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Are you sure you want to delete "{job.title}"? This action
                cannot be undone.
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
            <p className="text-sm text-slate-700">{job.title}</p>
            <p className="text-xs text-slate-500">{job.company}</p>
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
              {isDeleting ? "Deleting..." : "Delete Job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading State Component
const JobsLoadingState = () => (
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
const JobsErrorState = ({ error, onRetry }) => (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-red-50 rounded-full p-4 mb-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        Failed to Load Jobs
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
const JobsEmptyState = ({ hasFilters, onClear, onAdd }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="bg-slate-100 rounded-full p-4 mb-4">
      {hasFilters ? (
        <Search className="w-12 h-12 text-slate-400" />
      ) : (
        <Briefcase className="w-12 h-12 text-slate-400" />
      )}
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-1">
      {hasFilters ? "No matching jobs found" : "No jobs yet"}
    </h3>
    <p className="text-sm text-slate-500 text-center mb-4 max-w-sm">
      {hasFilters
        ? "Try adjusting your search or filter criteria to find what you're looking for."
        : "Start by adding your first job posting on CareerSphere."}
    </p>
    {hasFilters ? (
      <button
        onClick={onClear}
        className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
      >
        Clear all filters
      </button>
    ) : (
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-shadow"
      >
        <Plus className="w-4 h-4" />
        Add New Job
      </button>
    )}
  </div>
);

export default Jobs;
