import React, { useState } from "react";
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
//   Linkedin,
  Globe,
  Send,
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
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "file"
          ? files?.[0] || null
          : value,
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

    console.log("Application Data:", formData);
    console.log("Applied Job:", job);

    setIsSubmitted(true);
  };

  // =========================================================
  // RESET APPLICATION
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

          {/* Back */}
          <button
            onClick={() => navigate("/jobs")}
            className="mb-5 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-blue-50 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Jobs
          </button>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* =================================================
                LEFT
            ================================================== */}

            <div className="space-y-6 lg:col-span-2">

              {/* Header */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                  <div className="flex min-w-0 gap-4">

                    {/* Logo */}
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

                  {/* Actions */}
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

                {/* Stats */}
                <div className="mt-6 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3">

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-medium text-slate-500">
                      Salary
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-sm font-bold text-slate-900">
                      <IndianRupee size={15} />
                      {job.salary}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-medium text-slate-500">
                      Posted
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {job.posted}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-medium text-slate-500">
                      Applicants
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-sm font-bold text-slate-900">
                      <Users size={15} />
                      {job.applicants}
                    </p>
                  </div>

                </div>
              </section>

              {/* Description */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                <h2 className="text-xl font-bold text-slate-900">
                  Job Description
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                  {job.description}
                </p>

              </section>

              {/* Responsibilities */}
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

              {/* Requirements */}
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

              {/* Skills */}
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

                <div className="mt-6 border-t border-slate-100 pt-5">

                  <h3 className="text-base font-bold text-slate-900">
                    Job Overview
                  </h3>

                  <div className="mt-5 space-y-5">

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
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-5">

          <div className="relative flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

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
              >
                <X size={18} />
              </button>

            </div>

            {/* =================================================
                SUCCESS
            ================================================== */}

            {isSubmitted ? (
              <div className="overflow-y-auto px-5 py-12 text-center sm:px-8">

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
                    OPTIONS
                ================================================== */}

                {applicationStep === "options" && (
                  <div className="overflow-y-auto p-5 sm:p-7">

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
                          Fill in your personal information and upload your resume.
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
                    className="overflow-y-auto"
                  >

                    <div className="p-5 sm:p-7">

                      {/* Form heading */}
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
                            Upload your resume
                          </span>

                          <span className="mt-1 text-xs text-slate-500">
                            PDF, DOC or DOCX • Max 5MB
                          </span>

                          <input
                            required
                            type="file"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            onChange={handleChange}
                            className="hidden"
                          />

                          {formData.resume && (
                            <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2">

                              <FileText
                                size={15}
                                className="text-green-600"
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
                          LINKS
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

                            <div className="relative">

                              {/* <Linkedin
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                              /> */}

                              <input
                                type="url"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/..."
                                className="h-11 w-full rounded-lg border border-slate-200 pl-10 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                              />

                            </div>
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

                    <div className="sticky bottom-0 border-t border-slate-200 bg-white p-4 sm:px-7">

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

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