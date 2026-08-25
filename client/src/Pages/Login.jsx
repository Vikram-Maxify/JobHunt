import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  EyeOff,
  Globe2,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  // =========================================================
  // HANDLE LOGIN
  // =========================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // =======================================================
    // GET REGISTERED USERS
    // =======================================================

    let users = [];

    try {
      users =
        JSON.parse(
          localStorage.getItem("careerSphereUsers")
        ) || [];
    } catch (error) {
      console.error("Users data error:", error);

      setError(
        "Something went wrong. Please try again."
      );

      return;
    }

    // =======================================================
    // CHECK USERS
    // =======================================================

    if (!Array.isArray(users) || users.length === 0) {
      setError(
        "No account found. Please create an account first."
      );

      return;
    }

    // =======================================================
    // GET LOGIN VALUES
    // =======================================================

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    // =======================================================
    // FIND USER
    // =======================================================

    const user = users.find((item) => {
      const userEmail = item?.email
        ?.trim()
        ?.toLowerCase();

      return (
        userEmail === email &&
        item?.password === password
      );
    });

    // =======================================================
    // INVALID LOGIN
    // =======================================================

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    // =======================================================
    // SAVE CURRENT LOGGED-IN USER
    // IMPORTANT:
    // Navbar also uses this same key
    // =======================================================

    localStorage.setItem(
      "careerSphereCurrentUser",
      JSON.stringify(user)
    );

    // =======================================================
    // SAVE LOGIN STATUS
    // =======================================================

    localStorage.setItem(
      "careerSphereIsLoggedIn",
      "true"
    );

    // =======================================================
    // NOTIFY NAVBAR
    // This makes Navbar update immediately
    // without refreshing the page
    // =======================================================

    window.dispatchEvent(
      new Event("careerSphereAuthChange")
    );

    // =======================================================
    // SUCCESS MESSAGE
    // =======================================================

    setSuccess(
      "Login successful! Redirecting..."
    );

    // =======================================================
    // REDIRECT TO HOME
    // =======================================================

    setTimeout(() => {
      navigate("/");
    }, 700);
  };

  return (
    <main className="min-h-[calc(100vh-72px)] overflow-x-hidden bg-slate-50">

      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">

        <div className="grid min-h-[calc(100vh-120px)] grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/60 lg:grid-cols-2">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <section className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 lg:flex">

            {/* Background Decorations */}

            <div className="pointer-events-none absolute inset-0">

              <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

              <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/10 blur-3xl" />

            </div>

            {/* Content */}

            <div className="relative flex min-h-full w-full flex-col justify-between p-6 xl:p-9">

              {/* =================================================
                  TOP CONTENT
              ================================================= */}

              <div>

                {/* Logo */}

                <div className="flex items-center gap-2.5">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-md">

                    <BriefcaseBusiness size={20} />

                  </div>

                  <div>

                    <h2 className="text-lg font-black tracking-tight text-white">
                      CareerSphere
                    </h2>

                    <p className="text-[11px] text-blue-100/70">
                      Your Career. Your Future.
                    </p>

                  </div>

                </div>

                {/* Hero Content */}

                <div className="mt-12 max-w-md xl:mt-14">

                  {/* Badge */}

                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">

                    <Sparkles size={13} />

                    Welcome Back

                  </div>

                  {/* Heading */}

                  <h1 className="text-3xl font-black leading-[1.1] tracking-tight text-white xl:text-4xl">

                    Continue Your

                    <span className="block text-blue-100">
                      Career Journey
                    </span>

                  </h1>

                  <p className="mt-4 max-w-sm text-xs leading-6 text-blue-100/80 xl:text-sm">

                    Sign in to access your personalized career
                    opportunities, professional network and
                    everything CareerSphere has to offer.

                  </p>

                </div>

                {/* Features */}

                <div className="mt-7 space-y-2.5">

                  {[
                    "Discover personalized job opportunities",
                    "Connect with professionals and companies",
                    "Manage your professional profile",
                    "Track your career growth",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-2.5"
                    >

                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">

                        <CheckCircle2
                          size={14}
                          className="text-white"
                        />

                      </div>

                      <span className="text-xs font-medium text-white/90">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

              {/* =================================================
                  BOTTOM STATS
              ================================================= */}

              <div className="mt-8 grid grid-cols-3 gap-2.5 xl:mt-10">

                <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">

                  <p className="text-lg font-black text-white">
                    50K+
                  </p>

                  <p className="mt-0.5 text-[10px] text-blue-100/70">
                    Professionals
                  </p>

                </div>

                <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">

                  <p className="text-lg font-black text-white">
                    10K+
                  </p>

                  <p className="mt-0.5 text-[10px] text-blue-100/70">
                    Jobs
                  </p>

                </div>

                <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">

                  <p className="text-lg font-black text-white">
                    2K+
                  </p>

                  <p className="mt-0.5 text-[10px] text-blue-100/70">
                    Companies
                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <section className="flex items-center justify-center px-4 py-6 sm:px-7 sm:py-8 lg:px-8 xl:px-12">

            <div className="w-full max-w-sm">

              {/* Mobile Logo */}

              <div className="mb-5 flex items-center justify-center gap-2.5 lg:hidden">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">

                  <BriefcaseBusiness size={20} />

                </div>

                <div>

                  <h2 className="text-lg font-black text-gray-900">
                    CareerSphere
                  </h2>

                  <p className="text-[11px] text-gray-400">
                    Your Career. Your Future.
                  </p>

                </div>

              </div>

              {/* =================================================
                  LOGIN HEADING
              ================================================= */}

              <div className="text-center">

                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                  <UserRound size={20} />

                </div>

                <h2 className="text-xl font-black tracking-tight text-gray-900 sm:text-2xl">
                  Welcome Back
                </h2>

                <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-gray-500 sm:text-sm">
                  Sign in to continue your CareerSphere journey
                </p>

              </div>

              {/* =================================================
                  LOGIN CARD
              ================================================= */}

              <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-md shadow-gray-200/40 sm:p-5">

                {/* Error */}

                {error && (
                  <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600">
                    {error}
                  </div>
                )}

                {/* Success */}

                {success && (
                  <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 text-xs font-medium text-green-600">
                    {success}
                  </div>
                )}

                {/* Google Login */}

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/40 sm:text-sm"
                >

                  <Globe2
                    size={17}
                    className="text-blue-600"
                  />

                  Continue with Google

                </button>

                {/* Divider */}

                <div className="my-4 flex items-center gap-3">

                  <div className="h-px flex-1 bg-gray-200" />

                  <span className="text-[10px] font-semibold text-gray-400">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-gray-200" />

                </div>

                {/* =================================================
                    FORM
                ================================================= */}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-3.5"
                >

                  {/* Email */}

                  <div>

                    <label
                      htmlFor="email"
                      className="mb-1 block text-xs font-semibold text-gray-700"
                    >
                      Email Address
                    </label>

                    <div className="relative">

                      <Mail
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-xs text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:text-sm"
                      />

                    </div>

                  </div>

                  {/* Password */}

                  <div>

                    <div className="mb-1 flex items-center justify-between">

                      <label
                        htmlFor="password"
                        className="text-xs font-semibold text-gray-700"
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          navigate("/forgot-password")
                        }
                        className="text-[10px] font-semibold text-blue-600 transition hover:text-blue-700 sm:text-xs"
                      >
                        Forgot Password?
                      </button>

                    </div>

                    <div className="relative">

                      <LockKeyhole
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="password"
                        name="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-xs text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 sm:text-sm"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-blue-600"
                        aria-label="Toggle password visibility"
                      >

                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}

                      </button>

                    </div>

                  </div>

                  {/* Remember Me */}

                  <div className="flex items-center gap-2 pt-0.5">

                    <input
                      id="remember"
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />

                    <label
                      htmlFor="remember"
                      className="text-xs text-gray-500"
                    >
                      Remember me
                    </label>

                  </div>

                  {/* Submit */}

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg sm:text-sm"
                  >

                    Sign In

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />

                  </button>

                </form>

                {/* Register */}

                <div className="mt-4 text-center">

                  <p className="text-xs text-gray-500 sm:text-sm">

                    Don't have an account?{" "}

                    <button
                      type="button"
                      onClick={() => navigate("/register")}
                      className="font-bold text-blue-600 transition hover:text-blue-700"
                    >
                      Create Account
                    </button>

                  </p>

                </div>

              </div>

              {/* Security */}

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 sm:text-[11px]">

                <LockKeyhole size={12} />

                Your information is securely protected

              </div>

            </div>

          </section>

        </div>

      </div>

    </main>
  );
};

export default Login;