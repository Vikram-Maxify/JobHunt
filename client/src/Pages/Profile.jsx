import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock3,
  Code2,
  FileText,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  ShieldCheck,
  Target,
  Upload,
  User,
  UserRound,
  VenusAndMars,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const Profile = () => {
  // =========================================================
  // USER STATE
  // =========================================================

  const [user, setUser] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);

  const [saveMessage, setSaveMessage] = useState("");

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    dateOfBirth: "",
    gender: "",
    qualification: "",
    university: "",
    graduationYear: "",
    experience: "",
    currentCompany: "",
    jobTitle: "",
    skills: "",
    bio: "",
    linkedin: "",
    github: "",
    portfolio: "",
    preferredJobRole: "",
    preferredLocation: "",
    employmentType: "",
    salaryExpectation: "",
    resume: "",

    // PROFILE PHOTO
    profilePhoto: "",

    // GOVERNMENT DOCUMENT
    governmentDocumentType: "",
    governmentDocument: "",
    governmentDocumentName: "",
  });

  // =========================================================
  // GET USER FROM LOCAL STORAGE
  // =========================================================

  const loadUser = () => {
    try {
      const storedUser = localStorage.getItem("careerSphereCurrentUser");

      if (!storedUser) {
        setUser(null);
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser);

      setFormData({
        name: parsedUser?.name || parsedUser?.fullName || "",
        email: parsedUser?.email || "",
        phone: parsedUser?.phone || parsedUser?.mobile || "",
        location: parsedUser?.location || "",
        dateOfBirth: parsedUser?.dateOfBirth || parsedUser?.dob || "",
        gender: parsedUser?.gender || "",
        qualification: parsedUser?.qualification || parsedUser?.education || "",
        university: parsedUser?.university || parsedUser?.college || "",
        graduationYear: parsedUser?.graduationYear || "",
        experience: parsedUser?.experience || "",
        currentCompany: parsedUser?.currentCompany || parsedUser?.company || "",
        jobTitle: parsedUser?.jobTitle || parsedUser?.designation || "",
        skills: Array.isArray(parsedUser?.skills)
          ? parsedUser.skills.join(", ")
          : parsedUser?.skills || "",
        bio: parsedUser?.bio || parsedUser?.about || "",
        linkedin: parsedUser?.linkedin || parsedUser?.linkedinUrl || "",
        github: parsedUser?.github || parsedUser?.githubUrl || "",
        portfolio: parsedUser?.portfolio || parsedUser?.portfolioUrl || "",
        preferredJobRole: parsedUser?.preferredJobRole || "",
        preferredLocation: parsedUser?.preferredLocation || "",
        employmentType: parsedUser?.employmentType || "",
        salaryExpectation: parsedUser?.salaryExpectation || "",
        resume: parsedUser?.resume || parsedUser?.resumeUrl || "",

        // PROFILE PHOTO
        profilePhoto: parsedUser?.profilePhoto || "",

        // GOVERNMENT DOCUMENT
        governmentDocumentType: parsedUser?.governmentDocumentType || "",

        governmentDocument: parsedUser?.governmentDocument || "",

        governmentDocumentName: parsedUser?.governmentDocumentName || "",
      });
    } catch (error) {
      console.error("Profile loading error:", error);
      setUser(null);
    }
  };

  // =========================================================
  // LOAD USER
  // =========================================================

  useEffect(() => {
    loadUser();
  }, []);

  // =========================================================
  // LOCK BACKGROUND SCROLL WHEN MODAL IS OPEN
  // =========================================================

  useEffect(() => {
    if (showEditModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showEditModal]);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // PROFILE PHOTO UPLOAD
  // =========================================================

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Only image files
    if (!file.type.startsWith("image/")) {
      setSaveMessage("Please select a valid image file.");
      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setSaveMessage("Profile photo size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: reader.result,
      }));

      setSaveMessage("");
    };

    reader.onerror = () => {
      setSaveMessage("Unable to upload profile photo.");
    };

    reader.readAsDataURL(file);
  };

  // =========================================================
  // GOVERNMENT DOCUMENT UPLOAD
  // =========================================================

  const handleGovernmentDocumentUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!formData.governmentDocumentType) {
      setSaveMessage("Please select a government document type first.");

      e.target.value = "";
      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      setSaveMessage("Government document size should be less than 5MB.");

      e.target.value = "";
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      setSaveMessage("Please upload JPG, PNG or PDF document.");

      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        governmentDocument: reader.result,
        governmentDocumentName: file.name,
      }));

      setSaveMessage("");
    };

    reader.onerror = () => {
      setSaveMessage("Unable to upload government document.");
    };

    reader.readAsDataURL(file);
  };

  // =========================================================
  // GET USER NAME
  // =========================================================

  const getUserName = () => {
    return (
      user?.name ||
      user?.fullName ||
      user?.username ||
      user?.email?.split("@")[0] ||
      "User"
    );
  };

  // =========================================================
  // USER INITIAL
  // =========================================================

  const getInitial = () => {
    return getUserName().charAt(0).toUpperCase();
  };

  // =========================================================
  // SKILLS
  // =========================================================

  const skills = useMemo(() => {
    if (!formData.skills) return [];

    if (Array.isArray(formData.skills)) {
      return formData.skills;
    }

    return formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }, [formData.skills]);

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  const handleEditProfile = () => {
    setSaveMessage("");
    setShowEditModal(true);
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSaveMessage("");
  };

  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const handleSaveProfile = (e) => {
    e.preventDefault();

    try {
      const oldUser = user || {};

      const updatedUser = {
        ...oldUser,

        name: formData.name.trim(),
        email: formData.email.trim(),

        phone: formData.phone.trim(),
        location: formData.location.trim(),

        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,

        qualification: formData.qualification.trim(),

        university: formData.university.trim(),

        graduationYear: formData.graduationYear,

        experience: formData.experience.trim(),

        currentCompany: formData.currentCompany.trim(),

        jobTitle: formData.jobTitle.trim(),

        skills: skills,

        bio: formData.bio.trim(),

        linkedin: formData.linkedin.trim(),

        github: formData.github.trim(),

        portfolio: formData.portfolio.trim(),

        preferredJobRole: formData.preferredJobRole.trim(),

        preferredLocation: formData.preferredLocation.trim(),

        employmentType: formData.employmentType,

        salaryExpectation: formData.salaryExpectation.trim(),

        resume: formData.resume.trim(),

        // SAVE PROFILE PHOTO
        profilePhoto: formData.profilePhoto,

        // SAVE GOVERNMENT DOCUMENT
        governmentDocumentType: formData.governmentDocumentType,

        governmentDocument: formData.governmentDocument,

        governmentDocumentName: formData.governmentDocumentName,
      };

      // =====================================================
      // SAVE CURRENT USER
      // =====================================================

      localStorage.setItem(
        "careerSphereCurrentUser",
        JSON.stringify(updatedUser),
      );

      // =====================================================
      // UPDATE USERS ARRAY
      // =====================================================

      const storedUsers =
        JSON.parse(localStorage.getItem("careerSphereUsers")) || [];

      if (Array.isArray(storedUsers)) {
        const updatedUsers = storedUsers.map((existingUser) => {
          const sameUser =
            existingUser?.email?.toLowerCase() ===
            oldUser?.email?.toLowerCase();

          return sameUser
            ? {
                ...existingUser,
                ...updatedUser,
              }
            : existingUser;
        });

        localStorage.setItem("careerSphereUsers", JSON.stringify(updatedUsers));
      }

      // =====================================================
      // UPDATE UI
      // =====================================================

      setUser(updatedUser);

      // =====================================================
      // NOTIFY NAVBAR
      // =====================================================

      window.dispatchEvent(new Event("careerSphereAuthChanged"));

      setSaveMessage("Profile updated successfully!");

      setTimeout(() => {
        setShowEditModal(false);
        setSaveMessage("");
      }, 1000);
    } catch (error) {
      console.error("Profile update error:", error);

      setSaveMessage("Unable to update profile. Please try again.");
    }
  };

  // =========================================================
  // NOT LOGGED IN
  // =========================================================

  if (!user) {
    return (
      <main className="min-h-[calc(100vh-68px)] bg-slate-50 px-4 py-10">
        <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <UserRound size={30} />
            </div>

            <h1 className="mt-5 text-xl font-bold text-slate-800">
              Login Required
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Please login to view your profile.
            </p>

            <a
              href="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <UserRound size={17} />
              Login
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-[calc(100vh-68px)] overflow-x-hidden bg-slate-50">
        {/* =====================================================
            PAGE CONTAINER
        ===================================================== */}

        <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-9">
          {/* ===================================================
              PROFILE HEADER
          =================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* COVER */}

            <div className="relative h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 sm:h-40 lg:h-48">
              <div className="absolute -left-10 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <div className="absolute -bottom-20 right-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/10 blur-3xl" />
            </div>

            {/* PROFILE HEADER CONTENT */}

            <div className="relative px-4 pb-5 sm:px-6 sm:pb-6 lg:px-8">
              <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
                {/* AVATAR + USER INFO */}

                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end">
                  {/* AVATAR */}

                  <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-gradient-to-br from-blue-600 to-indigo-600 text-3xl font-black text-white shadow-lg sm:h-28 sm:w-28 sm:text-4xl">
                    {formData.profilePhoto ? (
                      <img
                        src={formData.profilePhoto}
                        alt={getUserName()}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      getInitial()
                    )}

                    <button
                      type="button"
                      onClick={handleEditProfile}
                      className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-md transition hover:bg-blue-700"
                      title="Edit Profile"
                    >
                      <Camera size={14} />
                    </button>
                  </div>

                  {/* USER DETAILS */}

                  <div className="min-w-0 pb-1">
                    <h1 className="truncate text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                      {getUserName()}
                    </h1>

                    <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                      <Mail size={14} />

                      <span className="truncate">
                        {user?.email || "No email added"}
                      </span>
                    </p>

                    {formData.jobTitle && (
                      <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-blue-600">
                        <BriefcaseBusiness size={14} />
                        {formData.jobTitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* EDIT BUTTON */}

                <button
                  type="button"
                  onClick={handleEditProfile}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
                >
                  <Pencil size={16} />
                  Edit Profile
                </button>
              </div>
            </div>
          </section>

          {/* ===================================================
              PROFILE CONTENT
          =================================================== */}

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="space-y-5 lg:col-span-2">
              {/* ABOUT */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <UserRound size={19} />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-slate-800">
                      About Me
                    </h2>

                    <p className="text-xs text-slate-400">
                      Professional summary
                    </p>
                  </div>
                </div>

                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {formData.bio ||
                    "Add a professional summary to tell employers about yourself, your experience and your career goals."}
                </p>
              </section>

              {/* PERSONAL INFORMATION */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <User size={19} />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-slate-800">
                      Personal Information
                    </h2>

                    <p className="text-xs text-slate-400">
                      Basic personal details
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoItem
                    icon={Mail}
                    label="Email Address"
                    value={formData.email}
                  />

                  <InfoItem
                    icon={Phone}
                    label="Phone Number"
                    value={formData.phone}
                  />

                  <InfoItem
                    icon={MapPin}
                    label="Location"
                    value={formData.location}
                  />

                  <InfoItem
                    icon={CalendarDays}
                    label="Date of Birth"
                    value={formData.dateOfBirth}
                  />

                  <InfoItem
                    icon={VenusAndMars}
                    label="Gender"
                    value={formData.gender}
                  />
                </div>
              </section>

              {/* EDUCATION */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <GraduationCap size={20} />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-slate-800">
                      Education
                    </h2>

                    <p className="text-xs text-slate-400">
                      Academic background
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoItem
                    icon={GraduationCap}
                    label="Qualification"
                    value={formData.qualification}
                  />

                  <InfoItem
                    icon={Building2}
                    label="University / College"
                    value={formData.university}
                  />

                  <InfoItem
                    icon={CalendarDays}
                    label="Graduation Year"
                    value={formData.graduationYear}
                  />
                </div>
              </section>

              {/* EXPERIENCE */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <BriefcaseBusiness size={19} />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-slate-800">
                      Experience
                    </h2>

                    <p className="text-xs text-slate-400">
                      Professional experience
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoItem
                    icon={BriefcaseBusiness}
                    label="Job Title"
                    value={formData.jobTitle}
                  />

                  <InfoItem
                    icon={Building2}
                    label="Current Company"
                    value={formData.currentCompany}
                  />

                  <InfoItem
                    icon={Clock3}
                    label="Experience"
                    value={formData.experience}
                  />
                </div>
              </section>

              {/* SKILLS */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Code2 size={19} />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-slate-800">
                      Skills
                    </h2>

                    <p className="text-xs text-slate-400">
                      Technical and professional skills
                    </p>
                  </div>
                </div>

                {skills.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-5 text-sm text-slate-400">
                    No skills added yet.
                  </p>
                )}
              </section>
            </div>

            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <div className="space-y-5">
              {/* CAREER PREFERENCES */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Target size={19} />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-slate-800">
                      Career Preferences
                    </h2>

                    <p className="text-xs text-slate-400">
                      Your job preferences
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <InfoItem
                    icon={Target}
                    label="Preferred Job Role"
                    value={formData.preferredJobRole}
                  />

                  <InfoItem
                    icon={MapPin}
                    label="Preferred Location"
                    value={formData.preferredLocation}
                  />

                  <InfoItem
                    icon={BriefcaseBusiness}
                    label="Employment Type"
                    value={formData.employmentType}
                  />

                  <InfoItem
                    icon={Award}
                    label="Salary Expectation"
                    value={formData.salaryExpectation}
                  />
                </div>
              </section>

              {/* RESUME */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                    <FileText size={19} />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-slate-800">
                      Resume
                    </h2>

                    <p className="text-xs text-slate-400">Your latest resume</p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-red-500 shadow-sm">
                      <FileText size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-700">
                        {formData.resume
                          ? "Resume Uploaded"
                          : "No Resume Added"}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {formData.resume
                          ? "Your resume is available"
                          : "Upload your resume from Edit Profile"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* GOVERNMENT DOCUMENT */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-slate-800">
                      Government Document
                    </h2>

                    <p className="text-xs text-slate-400">
                      Identity verification document
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  {formData.governmentDocument ? (
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                        <FileText size={20} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-700">
                          {formData.governmentDocumentType}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-slate-400">
                          {formData.governmentDocumentName ||
                            "Document uploaded"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm">
                        <ShieldCheck size={20} />
                      </div>

                      <p className="mt-2 text-sm font-semibold text-slate-600">
                        No document added
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Add your document from Edit Profile
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* SOCIAL LINKS */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Globe size={19} />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-slate-800">
                      Social Profiles
                    </h2>

                    <p className="text-xs text-slate-400">Professional links</p>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <SocialLink
                    icon={Globe}
                    label="Portfolio"
                    value={formData.portfolio}
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* =======================================================
          EDIT PROFILE MODAL
      ======================================================= */}

      {showEditModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-900/60 p-3 backdrop-blur-sm sm:p-5"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div className="relative my-auto flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Pencil size={18} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-800 sm:text-lg">
                    Edit Profile
                  </h2>

                  <p className="text-[11px] text-slate-400 sm:text-xs">
                    Update your professional information
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSaveProfile}
              className="flex min-h-0 flex-1 flex-col"
            >
              {/* FORM BODY */}

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6">
                {/* PROFILE PHOTO */}

                <FormSection
                  icon={Camera}
                  title="Profile Photo"
                  description="Upload your professional profile photo"
                >
                  <div className="sm:col-span-2">
                    <div className="flex flex-col items-center gap-5 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:flex-row">
                      {/* PHOTO PREVIEW */}

                      <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-3xl font-black text-white shadow-md">
                        {formData.profilePhoto ? (
                          <img
                            src={formData.profilePhoto}
                            alt="Profile Preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          getInitial()
                        )}
                      </div>

                      {/* UPLOAD */}

                      <div className="min-w-0 flex-1 text-center sm:text-left">
                        <p className="text-sm font-semibold text-slate-700">
                          Upload Profile Photo
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          JPG, JPEG or PNG. Maximum size 5MB.
                        </p>

                        <label
                          htmlFor="profilePhoto"
                          className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        >
                          <Camera size={15} />
                          Choose Photo
                        </label>

                        <input
                          id="profilePhoto"
                          type="file"
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={handleProfilePhotoUpload}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </FormSection>

                {/* PERSONAL INFORMATION */}

                <FormSection
                  icon={User}
                  title="Personal Information"
                  description="Enter your basic personal details"
                >
                  <InputField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    icon={UserRound}
                    required
                  />

                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    icon={Mail}
                    required
                  />

                  <InputField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    icon={Phone}
                  />

                  <InputField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State, Country"
                    icon={MapPin}
                  />

                  <InputField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    icon={CalendarDays}
                  />

                  <SelectField
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    icon={VenusAndMars}
                    options={["Male", "Female", "Other", "Prefer not to say"]}
                  />
                </FormSection>

                {/* EDUCATION */}

                <FormSection
                  icon={GraduationCap}
                  title="Education"
                  description="Add your academic qualifications"
                >
                  <InputField
                    label="Highest Qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="e.g. B.Tech Computer Science"
                    icon={GraduationCap}
                  />

                  <InputField
                    label="University / College"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    placeholder="Enter university or college"
                    icon={Building2}
                  />

                  <InputField
                    label="Graduation Year"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    placeholder="e.g. 2025"
                    icon={CalendarDays}
                  />
                </FormSection>

                {/* EXPERIENCE */}

                <FormSection
                  icon={BriefcaseBusiness}
                  title="Professional Experience"
                  description="Tell employers about your experience"
                >
                  <InputField
                    label="Job Title"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Developer"
                    icon={BriefcaseBusiness}
                  />

                  <InputField
                    label="Current Company"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    icon={Building2}
                  />

                  <InputField
                    label="Total Experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. Fresher / 2 Years"
                    icon={Clock3}
                  />
                </FormSection>

                {/* SKILLS */}

                <FormSection
                  icon={Code2}
                  title="Skills"
                  description="Add your technical and professional skills"
                >
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Skills
                    </label>

                    <div className="relative">
                      <Code2
                        size={16}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />

                      <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="React, JavaScript, Node.js, MongoDB"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>

                    <p className="mt-1.5 text-[10px] text-slate-400">
                      Separate multiple skills with commas.
                    </p>
                  </div>
                </FormSection>

                {/* ABOUT */}

                <FormSection
                  icon={BookOpen}
                  title="About You"
                  description="Write a short professional summary"
                >
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Professional Bio
                    </label>

                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Write something about yourself, your experience, strengths and career goals..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>
                </FormSection>

                {/* CAREER PREFERENCE */}

                <FormSection
                  icon={Target}
                  title="Job Preferences"
                  description="Tell us what kind of job you are looking for"
                >
                  <InputField
                    label="Preferred Job Role"
                    name="preferredJobRole"
                    value={formData.preferredJobRole}
                    onChange={handleChange}
                    placeholder="e.g. MERN Stack Developer"
                    icon={Target}
                  />

                  <InputField
                    label="Preferred Location"
                    name="preferredLocation"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    placeholder="e.g. Delhi / Remote"
                    icon={MapPin}
                  />

                  <SelectField
                    label="Employment Type"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    icon={BriefcaseBusiness}
                    options={[
                      "Full Time",
                      "Part Time",
                      "Internship",
                      "Contract",
                      "Freelance",
                    ]}
                  />

                  <InputField
                    label="Expected Salary"
                    name="salaryExpectation"
                    value={formData.salaryExpectation}
                    onChange={handleChange}
                    placeholder="e.g. ₹6 LPA"
                    icon={Award}
                  />
                </FormSection>

                {/* GOVERNMENT DOCUMENT */}

                <FormSection
                  icon={ShieldCheck}
                  title="Government Document"
                  description="Upload one government identity document"
                >
                  <div className="sm:col-span-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      {/* DOCUMENT TYPE */}

                      <label
                        htmlFor="governmentDocumentType"
                        className="mb-1.5 block text-xs font-semibold text-slate-700"
                      >
                        Document Type
                      </label>

                      <div className="relative">
                        <ShieldCheck
                          size={16}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <select
                          id="governmentDocumentType"
                          name="governmentDocumentType"
                          value={formData.governmentDocumentType}
                          onChange={handleChange}
                          className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-8 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        >
                          <option value="">Select Government Document</option>

                          <option value="Aadhaar Card">Aadhaar Card</option>

                          <option value="PAN Card">PAN Card</option>

                          <option value="Driving Licence">
                            Driving Licence
                          </option>

                          <option value="Passport">Passport</option>
                        </select>

                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                          ▼
                        </span>
                      </div>

                      {/* DOCUMENT UPLOAD */}

                      <div className="mt-4">
                        <label
                          htmlFor="governmentDocument"
                          className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-4 text-sm font-semibold transition ${
                            formData.governmentDocumentType
                              ? "border-blue-200 bg-blue-50/50 text-blue-600 hover:bg-blue-50"
                              : "cursor-not-allowed border-slate-200 bg-white text-slate-400"
                          }`}
                        >
                          <Upload size={17} />

                          {formData.governmentDocument
                            ? "Change Document"
                            : "Upload Document"}
                        </label>

                        <input
                          id="governmentDocument"
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleGovernmentDocumentUpload}
                          disabled={!formData.governmentDocumentType}
                          className="hidden"
                        />
                      </div>

                      {/* DOCUMENT INFO */}

                      {formData.governmentDocument && (
                        <div className="mt-3 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-green-600 shadow-sm">
                            <CheckCircle2 size={17} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-green-700">
                              {formData.governmentDocumentType}
                            </p>

                            <p className="mt-0.5 truncate text-[10px] text-green-600">
                              {formData.governmentDocumentName}
                            </p>
                          </div>
                        </div>
                      )}

                      <p className="mt-2 text-[10px] text-slate-400">
                        You can upload only one document. Supported formats:
                        JPG, JPEG, PNG and PDF. Maximum size 5MB.
                      </p>
                    </div>
                  </div>
                </FormSection>

                {/* SOCIAL */}

                <FormSection
                  icon={Globe}
                  title="Professional Links"
                  description="Add your professional online profiles"
                >
                  <InputField
                    label="Portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                    icon={Globe}
                  />

                  <InputField
                    label="Resume URL"
                    name="resume"
                    value={formData.resume}
                    onChange={handleChange}
                    placeholder="Paste resume URL"
                    icon={Upload}
                  />
                </FormSection>
              </div>

              {/* =================================================
                  MODAL FOOTER
              ================================================= */}

              <div className="flex shrink-0 flex-col gap-3 border-t border-slate-100 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="min-h-5 text-xs">
                  {saveMessage && (
                    <span
                      className={`flex items-center gap-1.5 font-medium ${
                        saveMessage.includes("successfully")
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {saveMessage.includes("successfully") && (
                        <CheckCircle2 size={14} />
                      )}

                      {saveMessage}
                    </span>
                  )}
                </div>

                <div className="flex w-full gap-2 sm:w-auto">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:flex-none"
                  >
                    <X size={16} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg sm:flex-none"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// =============================================================
// INFO ITEM
// =============================================================

const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
          <Icon size={16} />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-1 break-words text-sm font-semibold text-slate-700">
            {value || "Not added"}
          </p>
        </div>
      </div>
    </div>
  );
};

// =============================================================
// SOCIAL LINK
// =============================================================

const SocialLink = ({ icon: Icon, label, value }) => {
  if (!value) {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm">
          <Icon size={16} />
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-600">{label}</p>

          <p className="text-[10px] text-slate-400">Not added</p>
        </div>
      </div>
    );
  }

  return (
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 transition hover:bg-blue-50"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-700">{label}</p>

        <p className="truncate text-[10px] text-blue-500">{value}</p>
      </div>
    </a>
  );
};

// =============================================================
// FORM SECTION
// =============================================================

const FormSection = ({ icon: Icon, title, description, children }) => {
  return (
    <div className="mb-7 last:mb-0">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon size={17} />
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>

          <p className="text-[10px] text-slate-400">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
};

// =============================================================
// INPUT FIELD
// =============================================================

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
}) => {
  return (
    <div className="min-w-0">
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-semibold text-slate-700"
      >
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
            Icon ? "pl-10 pr-3" : "px-3"
          }`}
        />
      </div>
    </div>
  );
};

// =============================================================
// SELECT FIELD
// =============================================================

const SelectField = ({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  options = [],
}) => {
  return (
    <div className="min-w-0">
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
            Icon ? "pl-10 pr-8" : "px-3 pr-8"
          }`}
        >
          <option value="">Select {label}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
          ▼
        </span>
      </div>
    </div>
  );
};

export default Profile;
