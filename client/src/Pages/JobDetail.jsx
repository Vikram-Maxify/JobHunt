import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getJobByIdUser } from "../redux/slicer/jobSlice";

import {
  applyToJob,
  clearApplicationError,
  resetApplicationState,
  saveJob,
  unsaveJob,
} from "../redux/slicer/jobApplicationSlice";
import { fetchMySubscription } from "../redux/slicer/userSubscriptionSlice";

import {
  AlertCircle,
  ArrowLeft,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Globe,
  IndianRupee,
  Mail,
  MapPin,
  Phone,
  Send,
  Share2,
  Upload,
  User,
  Users,
  X,
} from "lucide-react";

const JobDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // =========================================================
  // JOB STATE
  // =========================================================

  const { selectedJob, jobLoading, jobError } = useSelector(
    (state) => state.jobs,
  );

  // =========================================================
  // APPLICATION STATE
  // =========================================================

  const {
    applying,
    success: applicationSuccess,
    error: applicationError,
    message: applicationMessage,
    saving,
    unsaving,
  } = useSelector((state) => state.application || {});

  // =========================================================
  // LOCAL STATE
  // =========================================================

  const [showApplyModal, setShowApplyModal] = useState(false);

  const [applicationBlockMessage, setApplicationBlockMessage] = useState("");

  const [applicationStep, setApplicationStep] = useState("options");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  // =========================================================
  // FORM DATA
  // =========================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experienceType: "",
    experience: "",
    profilePhoto: null,
    governmentDocument: null,
    resume: null,
    skills: "",
    currentLocation: "",
    expectedSalary: "",
    noticePeriod: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
    additionalInfo: "",
  });

  // =========================================================
  // GET JOB
  // =========================================================

  useEffect(() => {
    if (id) {
      dispatch(getJobByIdUser(id));
    }
  }, [dispatch, id]);

  // =========================================================
  // JOB DATA
  // =========================================================

  const backendJob = selectedJob;

  const job = backendJob
    ? {
        ...backendJob,

        id: backendJob._id || backendJob.id,

        type: backendJob.jobType || "Full Time",

        posted: backendJob.daysAgo || "Recently",

        applicants: backendJob.applicantCount ?? 0,

        logo:
          backendJob.companyLogo?.displayUrl ||
          backendJob.companyLogo?.url ||
          backendJob.company?.charAt(0)?.toUpperCase() ||
          "C",

        logoClass: "bg-blue-100 text-blue-600",

        responsibilities: backendJob.responsibilities || [],

        requirements: backendJob.requirements || [],

        skills: backendJob.skills || [],
      }
    : null;

  // =========================================================
  // LOAD SAVED APPLICATION DETAILS
  // =========================================================

  useEffect(() => {
    const savedApplication = localStorage.getItem("jobApplication");

    if (!savedApplication) return;

    try {
      const parsedData = JSON.parse(savedApplication);

      setFormData((prev) => ({
        ...prev,

        name: parsedData.name || "",
        email: parsedData.email || "",
        phone: parsedData.phone || "",

        experienceType: parsedData.experienceType || "",

        experience: parsedData.experience || "",

        skills: parsedData.skills || "",

        currentLocation: parsedData.currentLocation || "",

        expectedSalary: parsedData.expectedSalary || "",

        noticePeriod: parsedData.noticePeriod || "",

        linkedin: parsedData.linkedin || "",

        portfolio: parsedData.portfolio || "",

        coverLetter: parsedData.coverLetter || "",

        additionalInfo: parsedData.additionalInfo || "",
      }));
    } catch (error) {
      console.error("Error loading saved application:", error);
    }
  }, []);

  // =========================================================
  // SCROLL LOCK
  // =========================================================

  useEffect(() => {
    if (showApplyModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showApplyModal]);

  // =========================================================
  // CHECK BACKEND SAVED STATUS
  // =========================================================
  //
  // If your getJobByIdUser API returns isSaved, this will
  // automatically show the correct bookmark state.
  //
  // If backend does not return isSaved, it stays false.
  //
  // =========================================================

  useEffect(() => {
    if (!backendJob) return;

    if (typeof backendJob.isSaved === "boolean") {
      setIsSaved(backendJob.isSaved);
    } else if (typeof backendJob.saved === "boolean") {
      setIsSaved(backendJob.saved);
    }
  }, [backendJob]);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (applicationError) {
      dispatch(clearApplicationError());
    }
  };

  // =========================================================
  // FILE VALIDATION
  // =========================================================

  const validateFile = (file, allowedTypes, maxSize) => {
    if (!file) return false;

    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Please select a supported file.");
      return false;
    }

    if (file.size > maxSize) {
      alert(`File size should not exceed ${maxSize / (1024 * 1024)} MB.`);
      return false;
    }

    return true;
  };

  // =========================================================
  // PROFILE PHOTO
  // =========================================================

  const handleProfilePhoto = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (!validateFile(file, allowedTypes, 5 * 1024 * 1024)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      profilePhoto: file,
    }));

    if (applicationError) {
      dispatch(clearApplicationError());
    }
  };

  // =========================================================
  // GOVERNMENT DOCUMENT
  // =========================================================

  const handleGovernmentDocument = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "application/pdf",
    ];

    if (!validateFile(file, allowedTypes, 10 * 1024 * 1024)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      governmentDocument: file,
    }));

    if (applicationError) {
      dispatch(clearApplicationError());
    }
  };

  // =========================================================
  // RESUME
  // =========================================================

  const handleResume = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validateFile(file, allowedTypes, 10 * 1024 * 1024)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));

    if (applicationError) {
      dispatch(clearApplicationError());
    }
  };

  // =========================================================
  // SAVE APPLICATION DETAILS LOCALLY
  // =========================================================

  const saveApplication = () => {
    const dataToSave = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      experienceType: formData.experienceType,
      experience: formData.experience,
      skills: formData.skills,
      currentLocation: formData.currentLocation,
      expectedSalary: formData.expectedSalary,
      noticePeriod: formData.noticePeriod,
      linkedin: formData.linkedin,
      portfolio: formData.portfolio,
      coverLetter: formData.coverLetter,
      additionalInfo: formData.additionalInfo,
    };

    localStorage.setItem("jobApplication", JSON.stringify(dataToSave));
  };

  // =========================================================
  // SAVE / UNSAVE JOB
  // =========================================================

  const handleSaveToggle = async () => {
    if (!job?._id) {
      console.error("Job ID is missing");
      return;
    }

    try {
      if (isSaved) {
        await dispatch(unsaveJob(job._id)).unwrap();

        setIsSaved(false);

        console.log("Job removed from saved jobs");
      } else {
        await dispatch(saveJob(job._id)).unwrap();

        setIsSaved(true);

        console.log("Job saved successfully");
      }
    } catch (error) {
      console.error("Save/Unsave job error:", error);
    }
  };

  // =========================================================
  // SUBMIT APPLICATION
  // =========================================================

  const submitApplication = async (e) => {
    e.preventDefault();

    if (!job?._id) {
      alert("Job information is missing.");
      return;
    }

    dispatch(clearApplicationError());

    try {
      // Save user's form details locally
      saveApplication();

      console.log("Submitting application for job:", job._id);

      // Backend currently accepts only jobId
      const result = await dispatch(applyToJob(job._id)).unwrap();

      console.log("Application submitted successfully:", result);

      setIsSubmitted(true);
    } catch (error) {
      console.error("Application submission error:", error);

      setIsSubmitted(false);
    }
  };

  // =========================================================
  // OPEN APPLY MODAL
  // =========================================================

  const openApplyModal = () => {
    dispatch(resetApplicationState());

    setIsSubmitted(false);
    setApplicationStep("options");
    setApplicationBlockMessage("");
    setShowApplyModal(true);

    dispatch(fetchMySubscription())
      .unwrap()
      .then((subscription) => {
        if (!subscription) {
          setApplicationBlockMessage(
            "Please purchase an active plan before applying for jobs.",
          );
        }
      })
      .catch((error) => {
        setApplicationBlockMessage(
          error || "Unable to verify your active plan. Please try again.",
        );
      });
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {
    if (applying) return;

    setShowApplyModal(false);
    setApplicationStep("options");
    setIsSubmitted(false);
    setApplicationBlockMessage("");

    dispatch(resetApplicationState());
  };

  // =========================================================
  // SHARE JOB
  // =========================================================

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: job?.title,
          text: `${job?.title} at ${job?.company}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);

        alert("Job link copied!");
      }
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (jobLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Loading Job...
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please wait while job details are loading.
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // JOB NOT FOUND
  // =========================================================

  if (!job) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Job not found</h1>

          <p className="mt-2 text-sm text-slate-500">
            {jobError || "This job may no longer be available."}
          </p>

          <button
            onClick={() => navigate("/jobs")}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Back to Jobs
          </button>
        </div>
      </main>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <main className="min-h-screen bg-slate-50">
      {/* =====================================================
          BACK BUTTON
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/jobs")}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Jobs
        </button>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="lg:col-span-2">
            {/* JOB HEADER */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-2xl font-bold ${job.logoClass}`}
                  >
                    {job.logo}
                  </div>

                  <div>
                    <h1 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                      {job.title}
                    </h1>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Building2 size={16} />
                        {job.company}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <MapPin size={16} />
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="flex items-center gap-2">
                  {/* SAVE */}

                  <button
                    type="button"
                    onClick={handleSaveToggle}
                    disabled={saving || unsaving}
                    title={isSaved ? "Unsave Job" : "Save Job"}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                      isSaved
                        ? "border-blue-200 bg-blue-50 text-blue-600"
                        : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-blue-600"
                    } ${
                      saving || unsaving ? "cursor-not-allowed opacity-60" : ""
                    }`}
                  >
                    {saving || unsaving ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                    ) : (
                      <Bookmark
                        size={19}
                        fill={isSaved ? "currentColor" : "none"}
                      />
                    )}
                  </button>

                  {/* SHARE */}

                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:text-blue-600"
                    title="Share Job"
                  >
                    <Share2 size={19} />
                  </button>
                </div>
              </div>

              {/* META */}

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  <BriefcaseBusiness size={17} className="text-blue-600" />
                  {job.experience}
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  <Clock3 size={17} className="text-blue-600" />
                  {job.type}
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  <MapPin size={17} className="text-blue-600" />
                  {job.location}
                </div>
              </div>

              {/* STATS */}

              <div className="mt-6 grid grid-cols-1 divide-y divide-slate-200 border-t border-slate-200 pt-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <div className="pb-4 sm:px-4 sm:pb-0 sm:first:pl-0">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <IndianRupee size={15} />
                    Salary
                  </div>

                  <p className="mt-1 font-bold text-slate-900">{job.salary}</p>
                </div>

                <div className="py-4 sm:px-4 sm:py-0">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <Clock3 size={15} />
                    Posted
                  </div>

                  <p className="mt-1 font-bold text-slate-900">{job.posted}</p>
                </div>

                <div className="pt-4 sm:px-4 sm:pt-0">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <Users size={15} />
                    Applicants
                  </div>

                  <p className="mt-1 font-bold text-slate-900">
                    {job.applicants}
                  </p>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-xl font-bold text-slate-900">
                Job Description
              </h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                {job.description}
              </p>
            </div>

            {/* RESPONSIBILITIES */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-xl font-bold text-slate-900">
                Responsibilities
              </h2>

              <div className="mt-5 space-y-4">
                {job.responsibilities?.length > 0 ? (
                  job.responsibilities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600 sm:text-base"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-1 shrink-0 text-blue-600"
                      />

                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    No responsibilities specified.
                  </p>
                )}
              </div>
            </div>

            {/* REQUIREMENTS */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-xl font-bold text-slate-900">Requirements</h2>

              <div className="mt-5 space-y-4">
                {job.requirements?.length > 0 ? (
                  job.requirements.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600 sm:text-base"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-1 shrink-0 text-blue-600"
                      />

                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    No requirements specified.
                  </p>
                )}
              </div>
            </div>

            {/* SKILLS */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-xl font-bold text-slate-900">Skills</h2>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.skills?.length > 0 ? (
                  job.skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No skills specified.</p>
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              {/* APPLY */}

              <button
                onClick={openApplyModal}
                disabled={applying}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Apply Now
                <Send size={17} />
              </button>

              {/* OVERVIEW */}

              <div className="mt-7">
                <h2 className="text-lg font-bold text-slate-900">
                  Job Overview
                </h2>

                <div className="mt-5 space-y-5">
                  {/* EXPERIENCE */}

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <BriefcaseBusiness size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Experience
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {job.experience}
                      </p>
                    </div>
                  </div>

                  {/* LOCATION */}

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {job.location}
                      </p>
                    </div>
                  </div>

                  {/* SALARY */}

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <IndianRupee size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Salary
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {job.salary}
                      </p>
                    </div>
                  </div>

                  {/* POSTED */}

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Clock3 size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Posted
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {job.posted}
                      </p>
                    </div>
                  </div>

                  {/* COMPANY */}

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Building2 size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Company
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {job.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          APPLICATION MODAL
      ===================================================== */}

      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="relative flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Apply for {job.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">{job.company}</p>
              </div>

              <button
                onClick={closeModal}
                disabled={applying}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* SUCCESS */}

            {applicationBlockMessage ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <AlertCircle size={34} />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  Plan required
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                  {applicationBlockMessage}
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/subscription")}
                  className="mt-7 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  View Plans
                </button>
              </div>
            ) : isSubmitted ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 size={34} />
                </div>

                <h3 className="mt-5 text-2xl font-bold text-slate-900">
                  Application Submitted!
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                  {applicationMessage ||
                    "Your application has been submitted successfully. The employer will review your application."}
                </p>

                <button
                  onClick={closeModal}
                  className="mt-7 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* ERROR */}

                {applicationError && (
                  <div className="mx-5 mt-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 sm:mx-6">
                    <AlertCircle
                      size={19}
                      className="mt-0.5 shrink-0 text-red-600"
                    />

                    <div>
                      <p className="text-sm font-semibold text-red-800">
                        Application Failed
                      </p>

                      <p className="mt-1 text-sm text-red-700">
                        {applicationError}
                      </p>
                    </div>
                  </div>
                )}

                {/* OPTIONS */}

                {applicationStep === "options" && (
                  <div className="overflow-y-auto px-5 py-6 sm:px-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* MANUAL */}

                      <button
                        type="button"
                        onClick={() => {
                          dispatch(clearApplicationError());
                          setApplicationStep("manual");
                        }}
                        className="rounded-xl border border-slate-200 p-5 text-left transition hover:border-blue-300 hover:bg-blue-50/50"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <User size={21} />
                        </div>

                        <h3 className="mt-4 font-bold text-slate-900">
                          Apply Manually
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Fill in your details and submit your application.
                        </p>
                      </button>

                      {/* SAVED DETAILS */}

                      <button
                        type="button"
                        onClick={() => {
                          dispatch(clearApplicationError());
                          setApplicationStep("manual");
                        }}
                        className="rounded-xl border border-slate-200 p-5 text-left transition hover:border-blue-300 hover:bg-blue-50/50"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <FileText size={21} />
                        </div>

                        <h3 className="mt-4 font-bold text-slate-900">
                          Use Saved Details
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Continue with your previously saved application
                          details.
                        </p>
                      </button>
                    </div>
                  </div>
                )}

                {/* MANUAL FORM */}

                {applicationStep === "manual" && (
                  <form
                    onSubmit={submitApplication}
                    className="overflow-y-auto px-5 py-6 sm:px-6"
                  >
                    {/* PERSONAL INFORMATION */}

                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Personal Information
                      </h3>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {/* NAME */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Full Name *
                          </label>

                          <div className="relative">
                            <User
                              size={17}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              placeholder="Enter your full name"
                              className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </div>
                        </div>

                        {/* EMAIL */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Email *
                          </label>

                          <div className="relative">
                            <Mail
                              size={17}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              placeholder="Enter your email"
                              className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </div>
                        </div>

                        {/* PHONE */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Phone *
                          </label>

                          <div className="relative">
                            <Phone
                              size={17}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              placeholder="Enter your phone number"
                              className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </div>
                        </div>

                        {/* LOCATION */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Current Location *
                          </label>

                          <div className="relative">
                            <MapPin
                              size={17}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                              type="text"
                              name="currentLocation"
                              value={formData.currentLocation}
                              onChange={handleInputChange}
                              required
                              placeholder="City, State"
                              className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* EXPERIENCE */}

                    <div className="mt-7">
                      <h3 className="text-base font-bold text-slate-900">
                        Experience
                      </h3>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Experience Type *
                          </label>

                          <select
                            name="experienceType"
                            value={formData.experienceType}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          >
                            <option value="">Select experience type</option>

                            <option value="Fresher">Fresher</option>

                            <option value="Experienced">Experienced</option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Years of Experience
                          </label>

                          <input
                            type="text"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            placeholder="e.g. 2 years"
                            className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      </div>
                    </div>

                    {/* DOCUMENTS */}

                    <div className="mt-7">
                      <h3 className="text-base font-bold text-slate-900">
                        Documents
                      </h3>

                      <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        {/* PROFILE PHOTO */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Profile Photo
                          </label>

                          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 p-4 text-center transition hover:border-blue-400 hover:bg-blue-50/40">
                            <Upload size={20} className="text-slate-400" />

                            <span className="mt-2 max-w-full truncate text-xs font-medium text-slate-500">
                              {formData.profilePhoto
                                ? formData.profilePhoto.name
                                : "Upload Photo"}
                            </span>

                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/jpg,image/webp"
                              onChange={handleProfilePhoto}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* GOVERNMENT DOCUMENT */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Government Document
                          </label>

                          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 p-4 text-center transition hover:border-blue-400 hover:bg-blue-50/40">
                            <FileText size={20} className="text-slate-400" />

                            <span className="mt-2 max-w-full truncate text-xs font-medium text-slate-500">
                              {formData.governmentDocument
                                ? formData.governmentDocument.name
                                : "Upload Document"}
                            </span>

                            <input
                              type="file"
                              accept=".pdf,image/jpeg,image/png,image/jpg,image/webp"
                              onChange={handleGovernmentDocument}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* RESUME */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Resume *
                          </label>

                          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 p-4 text-center transition hover:border-blue-400 hover:bg-blue-50/40">
                            <FileText size={20} className="text-slate-400" />

                            <span className="mt-2 max-w-full truncate text-xs font-medium text-slate-500">
                              {formData.resume
                                ? formData.resume.name
                                : "Upload Resume"}
                            </span>

                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleResume}
                              required
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* PROFESSIONAL INFORMATION */}

                    <div className="mt-7">
                      <h3 className="text-base font-bold text-slate-900">
                        Professional Information
                      </h3>

                      <div className="mt-4 space-y-4">
                        {/* SKILLS */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Skills *
                          </label>

                          <input
                            type="text"
                            name="skills"
                            value={formData.skills}
                            onChange={handleInputChange}
                            required
                            placeholder="React, JavaScript, Node.js..."
                            className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        {/* SALARY / NOTICE */}

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                              Expected Salary
                            </label>

                            <input
                              type="text"
                              name="expectedSalary"
                              value={formData.expectedSalary}
                              onChange={handleInputChange}
                              placeholder="e.g. ₹6 LPA"
                              className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </div>

                          <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                              Notice Period
                            </label>

                            <input
                              type="text"
                              name="noticePeriod"
                              value={formData.noticePeriod}
                              onChange={handleInputChange}
                              placeholder="e.g. 30 days"
                              className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </div>
                        </div>

                        {/* LINKEDIN / PORTFOLIO */}

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                              LinkedIn
                            </label>

                            <input
                              type="url"
                              name="linkedin"
                              value={formData.linkedin}
                              onChange={handleInputChange}
                              placeholder="LinkedIn URL"
                              className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                          </div>

                          <div>
                            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                              Portfolio
                            </label>

                            <div className="relative">
                              <Globe
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                              />

                              <input
                                type="url"
                                name="portfolio"
                                value={formData.portfolio}
                                onChange={handleInputChange}
                                placeholder="Portfolio URL"
                                className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                              />
                            </div>
                          </div>
                        </div>

                        {/* COVER LETTER */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Cover Letter
                          </label>

                          <textarea
                            name="coverLetter"
                            value={formData.coverLetter}
                            onChange={handleInputChange}
                            rows={5}
                            placeholder="Write a short cover letter..."
                            className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>

                        {/* ADDITIONAL INFO */}

                        <div>
                          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                            Additional Information
                          </label>

                          <textarea
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Anything else you want the employer to know..."
                            className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      </div>
                    </div>

                    {/* NOTICE */}

                    <div className="mt-6 flex items-start gap-3 rounded-lg bg-blue-50 p-4">
                      <AlertCircle
                        size={18}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <p className="text-xs leading-5 text-blue-700 sm:text-sm">
                        Please make sure all information provided is accurate
                        before submitting your application.
                      </p>
                    </div>

                    {/* ACTIONS */}

                    <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        disabled={applying}
                        onClick={() => setApplicationStep("options")}
                        className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={applying}
                        className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {applying ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <Send size={17} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default JobDetail;
