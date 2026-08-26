import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  IndianRupee,
  Building2,
  CalendarDays,
  Bookmark,
  BookmarkCheck,
  Share2,
  CheckCircle2,
  Users,
  X,
  Upload,
  FileText,
  User,
  Mail,
  Phone,
  Globe,
  Send,
  Camera,
  ShieldCheck,
} from "lucide-react";

const JobDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const job = location.state?.job;

  // =========================================================
  // APPLICATION MODAL
  // =========================================================

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationStep, setApplicationStep] = useState("options");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // =========================================================
  // SAVE JOB
  // =========================================================

  const [savedJob, setSavedJob] = useState(false);

  // =========================================================
  // APPLICATION FORM
  // =========================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experienceType: "Fresher",
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
  // LOCK BACKGROUND SCROLL WHEN MODAL IS OPEN
  // =========================================================

  useEffect(() => {
    if (showApplyModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showApplyModal]);

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files?.[0] || null;

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // FILE SIZE VALIDATION
  // =========================================================

  const validateFileSize = (file, maxSizeMB) => {
    if (!file) return true;

    const maxSize = maxSizeMB * 1024 * 1024;

    if (file.size > maxSize) {
      alert(
        `${file.name} is too large. Maximum allowed size is ${maxSizeMB}MB.`
      );

      return false;
    }

    return true;
  };

  // =========================================================
  // PROFILE PHOTO CHANGE
  // =========================================================

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files?.[0] || null;

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload JPG, JPEG or PNG image only.");
      e.target.value = "";
      return;
    }

    if (!validateFileSize(file, 2)) {
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      profilePhoto: file,
    }));
  };

  // =========================================================
  // GOVERNMENT DOCUMENT CHANGE
  // =========================================================

  const handleGovernmentDocumentChange = (e) => {
    const file = e.target.files?.[0] || null;

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload JPG, JPEG, PNG or PDF document only.");
      e.target.value = "";
      return;
    }

    if (!validateFileSize(file, 5)) {
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      governmentDocument: file,
    }));
  };

  // =========================================================
  // RESUME CHANGE
  // =========================================================

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0] || null;

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload PDF, DOC or DOCX file only.");
      e.target.value = "";
      return;
    }

    if (!validateFileSize(file, 5)) {
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  // =========================================================
  // SAVE APPLICATION
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

    localStorage.setItem(
      "careerSphereApplication",
      JSON.stringify(dataToSave)
    );

    alert("Application details saved successfully!");
  };

  // =========================================================
  // LOAD SAVED APPLICATION
  // =========================================================

  const loadSavedApplication = () => {
    const savedApplication = localStorage.getItem(
      "careerSphereApplication"
    );

    if (!savedApplication) {
      alert(
        "No saved application found. Please fill the application manually."
      );

      setApplicationStep("manual");
      return;
    }

    try {
      const savedData = JSON.parse(savedApplication);

      setFormData((prev) => ({
        ...prev,
        ...savedData,

        // File objects cannot be restored from localStorage
        profilePhoto: null,
        governmentDocument: null,
        resume: null,
      }));

      setApplicationStep("manual");
    } catch (error) {
      console.error("Saved application error:", error);

      alert(
        "Unable to load saved application. Please fill the form manually."
      );

      setApplicationStep("manual");
    }
  };

  // =========================================================
  // SUBMIT APPLICATION
  // =========================================================

  const submitApplication = (e) => {
    e.preventDefault();

    if (!formData.resume) {
      alert("Please upload your resume.");
      return;
    }

    if (!formData.profilePhoto) {
      alert("Please upload your profile photo.");
      return;
    }

    if (!formData.governmentDocument) {
      alert("Please upload your government ID document.");
      return;
    }

    // =====================================================
    // FORM DATA FOR BACKEND
    // =====================================================

    const applicationData = new FormData();

    applicationData.append("name", formData.name);
    applicationData.append("email", formData.email);
    applicationData.append("phone", formData.phone);

    applicationData.append(
      "experienceType",
      formData.experienceType
    );

    applicationData.append(
      "experience",
      formData.experience
    );

    applicationData.append(
      "skills",
      formData.skills
    );

    applicationData.append(
      "currentLocation",
      formData.currentLocation
    );

    applicationData.append(
      "expectedSalary",
      formData.expectedSalary
    );

    applicationData.append(
      "noticePeriod",
      formData.noticePeriod
    );

    applicationData.append(
      "linkedin",
      formData.linkedin
    );

    applicationData.append(
      "portfolio",
      formData.portfolio
    );

    applicationData.append(
      "coverLetter",
      formData.coverLetter
    );

    applicationData.append(
      "additionalInfo",
      formData.additionalInfo
    );

    // Job information
    applicationData.append(
      "jobId",
      job?._id || job?.id || ""
    );

    applicationData.append(
      "jobTitle",
      job?.title || ""
    );

    applicationData.append(
      "company",
      job?.company || ""
    );

    // Files
    applicationData.append(
      "profilePhoto",
      formData.profilePhoto
    );

    applicationData.append(
      "governmentDocument",
      formData.governmentDocument
    );

    applicationData.append(
      "resume",
      formData.resume
    );

    // =====================================================
    // DEBUG
    // =====================================================

    console.log("Application Data:", formData);
    console.log("Applied Job:", job);

    for (const [key, value] of applicationData.entries()) {
      console.log(key, value);
    }

    // Backend API will go here

    setIsSubmitted(true);
  };

  // =========================================================
  // CLOSE APPLICATION MODAL
  // =========================================================

  const closeApplicationModal = () => {
    setShowApplyModal(false);

    setTimeout(() => {
      setApplicationStep("options");
      setIsSubmitted(false);
    }, 200);
  };

  // =========================================================
  // JOB NOT FOUND
  // =========================================================

  if (!job) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <h1 className="text-xl font-bold text-slate-900">
            Job not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            This job may no longer be available.
          </p>

          <button
            onClick={() => navigate("/jobs")}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            Back to Jobs
          </button>

        </div>
      </main>
    );
  }

  return (
    <>
      {/* =====================================================
          JOB DETAIL PAGE
      ====================================================== */}

      <main className="min-h-screen bg-slate-50 py-5 sm:py-8">

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* BACK BUTTON */}

          <button
            onClick={() => navigate("/jobs")}
            className="mb-5 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-blue-50 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Jobs
          </button>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* =================================================
                LEFT CONTENT
            ================================================== */}

            <div className="space-y-6 lg:col-span-2">

              {/* HEADER */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                  <div className="flex min-w-0 gap-4">

                    {/* LOGO */}

                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-xl font-black shadow-sm sm:h-20 sm:w-20 ${job.logoClass}`}
                    >
                      {job.logo}
                    </div>

                    <div className="min-w-0">

                      <h1 className="break-words text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                        {job.title}
                      </h1>

                      <p className="mt-2 flex items-center gap-2 text-sm font-bold text-blue-600 sm:text-base">
                        <Building2 size={17} />
                        {job.company}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600">

                        <span className="flex items-center gap-1.5">
                          <MapPin size={16} />
                          {job.location}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <BriefcaseBusiness size={16} />
                          {job.experience}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Clock3 size={16} />
                          {job.type}
                        </span>

                      </div>

                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        setSavedJob((prev) => !prev)
                      }
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                        savedJob
                          ? "border-blue-200 bg-blue-50 text-blue-600"
                          : "border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                      title={
                        savedJob
                          ? "Remove saved job"
                          : "Save Job"
                      }
                    >
                      {savedJob ? (
                        <BookmarkCheck size={18} />
                      ) : (
                        <Bookmark size={18} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: job.title,
                            text: `Check this job at ${job.company}`,
                            url: window.location.href,
                          });
                        } else {
                          navigator.clipboard.writeText(
                            window.location.href
                          );

                          alert(
                            "Job link copied to clipboard!"
                          );
                        }
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                      title="Share Job"
                    >
                      <Share2 size={18} />
                    </button>

                  </div>

                </div>

                {/* STATS */}

                <div className="mt-2 grid grid-cols-3 gap-2 border-t border-slate-100 pt-5 sm:gap-3">

                  {/* SALARY */}

                  <div className="min-w-0 rounded-xl bg-slate-50 p-3 sm:p-4">

                    <p className="text-[10px] font-medium text-slate-500 sm:text-xs">
                      Salary
                    </p>

                    <p className="mt-1 flex min-w-0 items-center gap-1 text-xs font-bold text-slate-900 sm:text-sm">

                      <IndianRupee
                        size={13}
                        className="shrink-0 sm:h-[15px] sm:w-[15px]"
                      />

                      <span className="truncate">
                        {job.salary}
                      </span>

                    </p>

                  </div>

                  {/* POSTED */}

                  <div className="min-w-0 rounded-xl bg-slate-50 p-3 sm:p-4">

                    <p className="text-[10px] font-medium text-slate-500 sm:text-xs">
                      Posted
                    </p>

                    <p className="mt-1 truncate text-xs font-bold text-slate-900 sm:text-sm">
                      {job.posted}
                    </p>

                  </div>

                  {/* APPLICANTS */}

                  <div className="min-w-0 rounded-xl bg-slate-50 p-3 sm:p-4">

                    <p className="text-[10px] font-medium text-slate-500 sm:text-xs">
                      Applicants
                    </p>

                    <p className="mt-1 flex min-w-0 items-center gap-1 text-xs font-bold text-slate-900 sm:text-sm">

                      <Users
                        size={13}
                        className="shrink-0 sm:h-[15px] sm:w-[15px]"
                      />

                      <span className="truncate">
                        {job.applicants}
                      </span>

                    </p>

                  </div>

                </div>

              </section>

              {/* DESCRIPTION */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                <h2 className="text-xl font-bold text-slate-900">
                  Job Description
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  {job.description}
                </p>

              </section>

              {/* RESPONSIBILITIES */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                <h2 className="text-xl font-bold text-slate-900">
                  Responsibilities
                </h2>

                <div className="mt-5 space-y-3">

                  {[
                    "Manage daily activities and coordinate with different teams.",
                    "Maintain smooth communication with internal stakeholders.",
                    "Monitor operational performance and achieve targets.",
                    "Prepare reports and maintain required documentation.",
                    "Work collaboratively with team members and management.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600 sm:text-base"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-1 shrink-0 text-blue-600"
                      />

                      <span>{item}</span>
                    </div>
                  ))}

                </div>

              </section>

              {/* REQUIREMENTS */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                <h2 className="text-xl font-bold text-slate-900">
                  Requirements
                </h2>

                <div className="mt-5 space-y-3">

                  {[
                    "Good communication and interpersonal skills.",
                    "Ability to work independently and as part of a team.",
                    "Strong problem-solving and analytical skills.",
                    "Relevant experience in the required field.",
                    "Good understanding of the job responsibilities.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-600 sm:text-base"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-1 shrink-0 text-blue-600"
                      />

                      <span>{item}</span>
                    </div>
                  ))}

                </div>

              </section>

              {/* SKILLS */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                <h2 className="text-xl font-bold text-slate-900">
                  Skills Required
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">

                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 sm:text-sm"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </section>

            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================== */}

            <aside className="h-fit lg:sticky lg:top-24">

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                {/* APPLY BUTTON */}

                <button
                  type="button"
                  onClick={() => {
                    setShowApplyModal(true);
                    setApplicationStep("options");
                    setIsSubmitted(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Send size={17} />
                  Apply for this Job
                </button>

                {/* JOB OVERVIEW */}

                <div className="mt-6 border-t border-slate-100 pt-5">

                  <h3 className="text-base font-bold text-slate-900">
                    Job Overview
                  </h3>

                  <div className="mt-5 space-y-5">

                    {/* EXPERIENCE */}

                    <div className="flex gap-3">

                      <BriefcaseBusiness
                        size={19}
                        className="shrink-0 text-blue-600"
                      />

                      <div>

                        <p className="text-xs text-slate-500">
                          Experience
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {job.experience}
                        </p>

                      </div>

                    </div>

                    {/* LOCATION */}

                    <div className="flex gap-3">

                      <MapPin
                        size={19}
                        className="shrink-0 text-blue-600"
                      />

                      <div>

                        <p className="text-xs text-slate-500">
                          Location
                        </p>

                        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                          {job.location}
                        </p>

                      </div>

                    </div>

                    {/* SALARY */}

                    <div className="flex gap-3">

                      <IndianRupee
                        size={19}
                        className="shrink-0 text-blue-600"
                      />

                      <div>

                        <p className="text-xs text-slate-500">
                          Salary
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {job.salary}
                        </p>

                      </div>

                    </div>

                    {/* POSTED */}

                    <div className="flex gap-3">

                      <CalendarDays
                        size={19}
                        className="shrink-0 text-blue-600"
                      />

                      <div>

                        <p className="text-xs text-slate-500">
                          Posted
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {job.posted}
                        </p>

                      </div>

                    </div>

                    {/* COMPANY */}

                    <div className="flex gap-3">

                      <Building2
                        size={19}
                        className="shrink-0 text-blue-600"
                      />

                      <div>

                        <p className="text-xs text-slate-500">
                          Company
                        </p>

                        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                          {job.company}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </main>

      {/* =====================================================
          APPLICATION MODAL
      ====================================================== */}

      {showApplyModal && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-slate-950/60 p-3 backdrop-blur-sm sm:p-5"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeApplicationModal();
            }
          }}
        >

          {/* =================================================
              MODAL CONTAINER
          ================================================== */}

          <div className="relative flex h-full max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* =================================================
                MODAL HEADER
            ================================================== */}

            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">

              <div className="min-w-0 pr-4">

                <h2 className="truncate text-base font-bold text-slate-900 sm:text-lg">
                  Apply for {job.title}
                </h2>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {job.company} • {job.location}
                </p>

              </div>

              <button
                type="button"
                onClick={closeApplicationModal}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
                aria-label="Close application modal"
              >
                <X size={18} />
              </button>

            </div>

            {/* =================================================
                SUCCESS
            ================================================== */}

            {isSubmitted ? (

              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-12 text-center sm:px-8">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 size={34} />
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  Application Submitted!
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">

                  Your application for{" "}

                  <span className="font-semibold text-slate-700">
                    {job.title}
                  </span>{" "}

                  at{" "}

                  <span className="font-semibold text-slate-700">
                    {job.company}
                  </span>{" "}

                  has been submitted successfully.

                </p>

                <button
                  type="button"
                  onClick={closeApplicationModal}
                  className="mt-7 rounded-xl bg-blue-600 px-7 py-3 text-sm font-bold text-white hover:bg-blue-700"
                >
                  Done
                </button>

              </div>

            ) : (

              <>
                {/* =================================================
                    APPLICATION OPTIONS
                ================================================== */}

                {applicationStep === "options" && (

                  <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">

                    <div className="text-center">

                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <FileText size={25} />
                      </div>

                      <h3 className="mt-4 text-lg font-bold text-slate-900">
                        How would you like to apply?
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Choose an application method to continue.
                      </p>

                    </div>

                    <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">

                      {/* SAVED APPLICATION */}

                      <button
                        type="button"
                        onClick={loadSavedApplication}
                        className="group rounded-2xl border-2 border-slate-200 bg-white p-5 text-left transition hover:border-blue-500 hover:bg-blue-50"
                      >

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                          <FileText size={22} />
                        </div>

                        <h4 className="mt-4 text-base font-bold text-slate-900">
                          Saved Application
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Use your previously saved application details and apply quickly.
                        </p>

                        <span className="mt-4 block text-xs font-bold text-blue-600">
                          Use Saved Details →
                        </span>

                      </button>

                      {/* MANUAL APPLICATION */}

                      <button
                        type="button"
                        onClick={() =>
                          setApplicationStep("manual")
                        }
                        className="group rounded-2xl border-2 border-slate-200 bg-white p-5 text-left transition hover:border-blue-500 hover:bg-blue-50"
                      >

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                          <User size={22} />
                        </div>

                        <h4 className="mt-4 text-base font-bold text-slate-900">
                          Manual Application
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          Fill in your personal information and upload your photo, government document and resume.
                        </p>

                        <span className="mt-4 block text-xs font-bold text-blue-600">
                          Fill Application →
                        </span>

                      </button>

                    </div>

                    <div className="mt-6 rounded-xl bg-blue-50 p-4">

                      <p className="text-xs leading-5 text-blue-700">

                        <strong>Tip:</strong> Save your application once.
                        Next time you can use the saved details to apply
                        much faster.

                      </p>

                    </div>

                  </div>

                )}

                {/* =================================================
                    MANUAL APPLICATION FORM
                ================================================== */}

                {applicationStep === "manual" && (

                  <form
                    onSubmit={submitApplication}
                    className="flex min-h-0 flex-1 flex-col overflow-hidden"
                  >

                    {/* =================================================
                        SCROLLABLE FORM CONTENT
                    ================================================== */}

                    <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">

                      {/* FORM HEADING */}

                      <div className="mb-6">

                        <h3 className="text-lg font-bold text-slate-900">
                          Application Details
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Complete your information to apply for this job.
                        </p>

                      </div>

                      {/* =================================================
                          PERSONAL INFORMATION
                      ================================================== */}

                      <div>

                        <h4 className="text-sm font-bold text-slate-900">
                          Personal Information
                        </h4>

                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                          {/* NAME */}

                          <div>

                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                              Full Name *
                            </label>

                            <div className="relative">

                              <User
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                              />

                              <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                              />

                            </div>

                          </div>

                          {/* EMAIL */}

                          <div>

                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                              Email Address *
                            </label>

                            <div className="relative">

                              <Mail
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                              />

                              <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                              />

                            </div>

                          </div>

                          {/* PHONE */}

                          <div>

                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                              Phone Number *
                            </label>

                            <div className="relative">

                              <Phone
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                              />

                              <input
                                required
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                              />

                            </div>

                          </div>

                          {/* LOCATION */}

                          <div>

                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                              Current Location *
                            </label>

                            <div className="relative">

                              <MapPin
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                              />

                              <input
                                required
                                type="text"
                                name="currentLocation"
                                value={formData.currentLocation}
                                onChange={handleChange}
                                placeholder="City, State"
                                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                              />

                            </div>

                          </div>

                        </div>

                      </div>

                      {/* =================================================
                          EXPERIENCE
                      ================================================== */}

                      <div className="mt-7">

                        <h4 className="text-sm font-bold text-slate-900">
                          Experience
                        </h4>

                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                          {/* FRESHER */}

                          <label
                            className={`cursor-pointer rounded-xl border-2 p-4 transition ${
                              formData.experienceType === "Fresher"
                                ? "border-blue-500 bg-blue-50"
                                : "border-slate-200 bg-white"
                            }`}
                          >

                            <input
                              type="radio"
                              name="experienceType"
                              value="Fresher"
                              checked={
                                formData.experienceType ===
                                "Fresher"
                              }
                              onChange={handleChange}
                              className="sr-only"
                            />

                            <div className="flex items-center gap-3">

                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                                  formData.experienceType ===
                                  "Fresher"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                <User size={17} />
                              </div>

                              <div>

                                <p className="text-sm font-bold text-slate-800">
                                  Fresher
                                </p>

                                <p className="mt-0.5 text-[11px] text-slate-500">
                                  I have no professional experience
                                </p>

                              </div>

                            </div>

                          </label>

                          {/* EXPERIENCED */}

                          <label
                            className={`cursor-pointer rounded-xl border-2 p-4 transition ${
                              formData.experienceType ===
                              "Experienced"
                                ? "border-blue-500 bg-blue-50"
                                : "border-slate-200 bg-white"
                            }`}
                          >

                            <input
                              type="radio"
                              name="experienceType"
                              value="Experienced"
                              checked={
                                formData.experienceType ===
                                "Experienced"
                              }
                              onChange={handleChange}
                              className="sr-only"
                            />

                            <div className="flex items-center gap-3">

                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                                  formData.experienceType ===
                                  "Experienced"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                <BriefcaseBusiness size={17} />
                              </div>

                              <div>

                                <p className="text-sm font-bold text-slate-800">
                                  Experienced
                                </p>

                                <p className="mt-0.5 text-[11px] text-slate-500">
                                  I have professional experience
                                </p>

                              </div>

                            </div>

                          </label>

                        </div>

                        {/* EXPERIENCE YEARS */}

                        {formData.experienceType ===
                          "Experienced" && (
                          <div className="mt-4">

                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                              Total Experience *
                            </label>

                            <input
                              required
                              type="text"
                              name="experience"
                              value={formData.experience}
                              onChange={handleChange}
                              placeholder="Example: 2 Years 6 Months"
                              className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />

                          </div>
                        )}

                      </div>

                      {/* =================================================
                          PROFILE PHOTO
                      ================================================== */}

                      <div className="mt-7">

                        <h4 className="text-sm font-bold text-slate-900">
                          Profile Photo
                        </h4>

                        <p className="mt-1 text-xs text-slate-500">
                          Upload a clear recent photo of yourself.
                        </p>

                        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-7 text-center transition hover:border-blue-400 hover:bg-blue-50">

                          {formData.profilePhoto ? (
                            <>

                              <div className="relative">

                                <img
                                  src={URL.createObjectURL(
                                    formData.profilePhoto
                                  )}
                                  alt="Profile preview"
                                  className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
                                />

                                <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white ring-2 ring-white">
                                  <CheckCircle2 size={15} />
                                </div>

                              </div>

                              <span className="mt-3 max-w-full truncate text-sm font-bold text-green-700">
                                {formData.profilePhoto.name}
                              </span>

                              <span className="mt-1 text-xs text-slate-500">
                                Click to change photo
                              </span>

                            </>
                          ) : (
                            <>

                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <Camera size={22} />
                              </div>

                              <span className="mt-3 text-sm font-bold text-slate-700">
                                Upload your profile photo *
                              </span>

                              <span className="mt-1 text-xs text-slate-500">
                                JPG, JPEG or PNG • Max 2MB
                              </span>

                            </>
                          )}

                          <input
                            required
                            type="file"
                            name="profilePhoto"
                            accept="image/jpeg,image/jpg,image/png"
                            onChange={handleProfilePhotoChange}
                            className="hidden"
                          />

                        </label>

                      </div>

                      {/* =================================================
                          GOVERNMENT DOCUMENT
                      ================================================== */}

                      <div className="mt-7">

                        <h4 className="text-sm font-bold text-slate-900">
                          Government ID Document
                        </h4>

                        <p className="mt-1 text-xs text-slate-500">
                          Upload a valid government-issued identity document.
                        </p>

                        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">

                          <div className="flex items-start gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                              <ShieldCheck size={20} />
                            </div>

                            <div>

                              <p className="text-sm font-bold text-blue-900">
                                Identity Verification
                              </p>

                              <p className="mt-1 text-xs leading-5 text-blue-700">
                                Please upload a valid government-issued
                                document for verification.
                              </p>

                            </div>

                          </div>

                        </div>

                        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-7 text-center transition hover:border-blue-400 hover:bg-blue-50">

                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <FileText size={22} />
                          </div>

                          <span className="mt-3 text-sm font-bold text-slate-700">
                            Upload government document *
                          </span>

                          <span className="mt-1 text-xs text-slate-500">
                            Aadhaar, PAN, Passport, Driving Licence • PDF, JPG, PNG • Max 5MB
                          </span>

                          <input
                            required
                            type="file"
                            name="governmentDocument"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={
                              handleGovernmentDocumentChange
                            }
                            className="hidden"
                          />

                          {formData.governmentDocument && (
                            <div className="mt-4 flex max-w-full items-center gap-2 rounded-lg bg-green-50 px-3 py-2">

                              <ShieldCheck
                                size={15}
                                className="shrink-0 text-green-600"
                              />

                              <span className="max-w-[260px] truncate text-xs font-semibold text-green-700">
                                {formData.governmentDocument.name}
                              </span>

                            </div>
                          )}

                        </label>

                      </div>

                      {/* =================================================
                          RESUME
                      ================================================== */}

                      <div className="mt-7">

                        <h4 className="text-sm font-bold text-slate-900">
                          Resume
                        </h4>

                        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-7 text-center transition hover:border-blue-400 hover:bg-blue-50">

                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <Upload size={22} />
                          </div>

                          <span className="mt-3 text-sm font-bold text-slate-700">
                            Upload your resume *
                          </span>

                          <span className="mt-1 text-xs text-slate-500">
                            PDF, DOC or DOCX • Max 5MB
                          </span>

                          <input
                            required
                            type="file"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeChange}
                            className="hidden"
                          />

                          {formData.resume && (
                            <div className="mt-4 flex max-w-full items-center gap-2 rounded-lg bg-green-50 px-3 py-2">

                              <FileText
                                size={15}
                                className="shrink-0 text-green-600"
                              />

                              <span className="max-w-[220px] truncate text-xs font-semibold text-green-700">
                                {formData.resume.name}
                              </span>

                            </div>
                          )}

                        </label>

                      </div>

                      {/* =================================================
                          PROFESSIONAL DETAILS
                      ================================================== */}

                      <div className="mt-7">

                        <h4 className="text-sm font-bold text-slate-900">
                          Professional Details
                        </h4>

                        <div className="mt-4 space-y-4">

                          {/* SKILLS */}

                          <div>

                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                              Skills *
                            </label>

                            <input
                              required
                              type="text"
                              name="skills"
                              value={formData.skills}
                              onChange={handleChange}
                              placeholder="React, JavaScript, Node.js, MongoDB..."
                              className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />

                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            {/* EXPECTED SALARY */}

                            <div>

                              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                Expected Salary
                              </label>

                              <div className="relative">

                                <IndianRupee
                                  size={16}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                  type="text"
                                  name="expectedSalary"
                                  value={
                                    formData.expectedSalary
                                  }
                                  onChange={handleChange}
                                  placeholder="Example: ₹8 LPA"
                                  className="h-11 w-full rounded-lg border border-slate-200 pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                />

                              </div>

                            </div>

                            {/* NOTICE PERIOD */}

                            <div>

                              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                                Notice Period
                              </label>

                              <select
                                name="noticePeriod"
                                value={
                                  formData.noticePeriod
                                }
                                onChange={handleChange}
                                className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                              >

                                <option value="">
                                  Select notice period
                                </option>

                                <option value="Immediate">
                                  Immediate
                                </option>

                                <option value="15 Days">
                                  15 Days
                                </option>

                                <option value="30 Days">
                                  30 Days
                                </option>

                                <option value="60 Days">
                                  60 Days
                                </option>

                                <option value="90 Days">
                                  90 Days
                                </option>

                              </select>

                            </div>

                          </div>

                        </div>

                      </div>

                      {/* =================================================
                          ONLINE PROFILES
                      ================================================== */}

                      <div className="mt-7">

                        <h4 className="text-sm font-bold text-slate-900">
                          Online Profiles
                        </h4>

                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                          {/* LINKEDIN */}

                          <div>

                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                              LinkedIn Profile
                            </label>

                            <input
                              type="url"
                              name="linkedin"
                              value={formData.linkedin}
                              onChange={handleChange}
                              placeholder="https://linkedin.com/in/..."
                              className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            />

                          </div>

                          {/* PORTFOLIO */}

                          <div>

                            <label className="mb-1.5 block text-xs font-bold text-slate-700">
                              Portfolio / Website
                            </label>

                            <div className="relative">

                              <Globe
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                              />

                              <input
                                type="url"
                                name="portfolio"
                                value={formData.portfolio}
                                onChange={handleChange}
                                placeholder="https://yourwebsite.com"
                                className="h-11 w-full rounded-lg border border-slate-200 pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                              />

                            </div>

                          </div>

                        </div>

                      </div>

                      {/* =================================================
                          COVER LETTER
                      ================================================== */}

                      <div className="mt-7">

                        <label className="mb-1.5 block text-xs font-bold text-slate-700">
                          Cover Letter
                        </label>

                        <textarea
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Tell the recruiter why you are a good fit for this position..."
                          className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />

                      </div>

                      {/* =================================================
                          ADDITIONAL INFORMATION
                      ================================================== */}

                      <div className="mt-4">

                        <label className="mb-1.5 block text-xs font-bold text-slate-700">
                          Additional Information
                        </label>

                        <textarea
                          name="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Anything else you want the recruiter to know..."
                          className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />

                      </div>

                    </div>

                    {/* =================================================
                        FORM FOOTER
                    ================================================== */}

                    <div className="shrink-0 border-t border-slate-200 bg-white p-4 sm:px-7">

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        {/* BACK */}

                        <button
                          type="button"
                          onClick={() =>
                            setApplicationStep("options")
                          }
                          className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                        >
                          Back
                        </button>

                        <div className="flex flex-col gap-2 sm:flex-row">

                          {/* SAVE */}

                          <button
                            type="button"
                            onClick={saveApplication}
                            className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-bold text-blue-600 transition hover:bg-blue-100"
                          >
                            Save Application
                          </button>

                          {/* SUBMIT */}

                          <button
                            type="submit"
                            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
                          >
                            <Send size={16} />
                            Submit Application
                          </button>

                        </div>

                      </div>

                    </div>

                  </form>
                )}

              </>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default JobDetail;