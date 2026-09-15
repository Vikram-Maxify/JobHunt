
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  Globe2,
  Quote,
  Rocket,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const successStories = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    company: "TechNova Solutions",
    location: "Bangalore, India",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    quote:
      "DreamGoGlobal helped me find the right opportunity and made my job search much easier. I received multiple interview calls within weeks.",
    result: "Got hired in 21 days",
    salary: "₹12 LPA",
  },
  {
    name: "Priya Singh",
    role: "UI/UX Designer",
    company: "Creative Labs",
    location: "Delhi, India",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    quote:
      "The quality of jobs and the simple application process made a huge difference. I finally found a role that matched my skills.",
    result: "Career switch successful",
    salary: "₹9.5 LPA",
  },
  {
    name: "Amit Verma",
    role: "Cloud Engineer",
    company: "CloudSphere",
    location: "Hyderabad, India",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    quote:
      "I was looking for an international career opportunity. DreamGoGlobal helped me discover a role that perfectly matched my experience.",
    result: "International placement",
    salary: "₹15 LPA",
  },
  {
    name: "Neha Patel",
    role: "Business Analyst",
    company: "GlobalSoft",
    location: "Pune, India",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    quote:
      "I loved how easy it was to explore different companies and opportunities. The platform helped me become more confident during my search.",
    result: "New role in 18 days",
    salary: "₹8.8 LPA",
  },
  {
    name: "Vikram Mehta",
    role: "Product Manager",
    company: "InnovateX",
    location: "Mumbai, India",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
    quote:
      "DreamGoGlobal gave me access to opportunities that I would have otherwise missed. I highly recommend it to anyone serious about their career.",
    result: "Promoted to leadership",
    salary: "₹18 LPA",
  },
  {
    name: "Ananya Gupta",
    role: "Data Analyst",
    company: "DataWorks",
    location: "Noida, India",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
    quote:
      "From discovering the job to getting selected, the entire experience was smooth. DreamGoGlobal helped me take the next step in my career.",
    result: "Hired in 14 days",
    salary: "₹10.2 LPA",
  },
];

const journeySteps = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Build a professional profile that highlights your skills, experience and career goals.",
    icon: Users,
  },
  {
    number: "02",
    title: "Discover Opportunities",
    description:
      "Explore relevant jobs from trusted companies across different industries and locations.",
    icon: BriefcaseBusiness,
  },
  {
    number: "03",
    title: "Apply With Confidence",
    description:
      "Find the right role and apply with a profile designed to showcase your strengths.",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Start Your New Journey",
    description:
      "Get closer to your dream career and take the next step toward your professional goals.",
    icon: Award,
  },
];

const countries = [
  {
    name: "India",
    jobs: "8,400+ Jobs",
    flag: "🇮🇳",
  },
  {
    name: "United States",
    jobs: "2,100+ Jobs",
    flag: "🇺🇸",
  },
  {
    name: "United Kingdom",
    jobs: "1,200+ Jobs",
    flag: "🇬🇧",
  },
  {
    name: "Canada",
    jobs: "980+ Jobs",
    flag: "🇨🇦",
  },
  {
    name: "Australia",
    jobs: "760+ Jobs",
    flag: "🇦🇺",
  },
  {
    name: "Germany",
    jobs: "620+ Jobs",
    flag: "🇩🇪",
  },
];

const stats = [
  {
    value: "12,400+",
    label: "Jobs Filled",
    icon: BriefcaseBusiness,
  },
  {
    value: "8,500+",
    label: "Happy Candidates",
    icon: Users,
  },
  {
    value: "94%",
    label: "Success Rate",
    icon: TrendingUp,
  },
  {
    value: "512+",
    label: "Hiring Companies",
    icon: Globe2,
  },
];

const SuccessStories = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Background Decorations */}
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
          <div className="mx-auto max-w-3xl text-center">
            {/* Small Label */}
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
              <Star size={15} fill="currentColor" />
              Real People. Real Careers. Real Success.
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Success Stories That
              <span className="block text-blue-600">
                Inspire Careers
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Discover how professionals across different industries found
              better opportunities, changed their careers and achieved their
              goals with DreamGoGlobal.
            </p>

            {/* Buttons */}
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/jobs")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:w-auto"
              >
                Find Your Dream Job
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:w-auto"
              >
                Create Your Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS SECTION
      ====================================================== */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-md"
                >
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    {stat.value}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED SUCCESS STORY
      ====================================================== */}
      <section className="bg-slate-50/70 py-6 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto mb-6 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Featured Success
            </span>

            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              From Searching to Succeeding
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Every career journey is different. Here is one of the many
              journeys made possible through DreamGoGlobal.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
            <div className="grid lg:grid-cols-2">
              {/* Image */}
              <div className="relative min-h-[320px] overflow-hidden lg:min-h-[460px]">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85"
                  alt="Professional team"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
                    <CheckCircle2 size={14} />
                    Successfully Placed
                  </div>

                  <h3 className="mt-3 text-2xl font-bold">
                    Rahul Sharma
                  </h3>

                  <p className="mt-1 text-sm text-white/80">
                    Software Engineer · TechNova Solutions
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <Quote
                  size={38}
                  className="text-blue-100"
                  fill="currentColor"
                />

                <blockquote className="mt-4 text-xl font-semibold leading-8 text-slate-800 sm:text-2xl">
                  “DreamGoGlobal helped me find the right opportunity and made
                  my job search much easier.”
                </blockquote>

                <p className="mt-5 text-sm leading-7 text-slate-600">
                  Rahul was looking for a software engineering opportunity that
                  offered both career growth and a better work environment.
                  After creating his profile and exploring relevant openings,
                  he received multiple interview calls and successfully joined
                  TechNova Solutions.
                </p>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-medium text-slate-500">
                      New Position
                    </p>
                    <p className="mt-1 text-lg font-bold text-blue-600">
                      Software Engineer
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                    <p className="text-xs font-medium text-slate-500">
                      New Salary
                    </p>
                    <p className="mt-1 text-lg font-bold text-emerald-600">
                      ₹12 LPA
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                    Hired in 21 days
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                    Career Growth
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SUCCESS STORIES GRID
      ====================================================== */}
      <section className="bg-white py-4 sm:py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Candidate Stories
              </span>

              <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                More Careers, More Success
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Meet professionals who took their next career step with
                DreamGoglobal.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Explore Jobs
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Cards */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {successStories.map((story) => (
              <article
                key={story.name}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-100/30"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span className="text-xs font-semibold text-slate-700">
                      Successfully Hired
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* User */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {story.name}
                      </h3>

                      <p className="mt-0.5 text-sm font-medium text-blue-600">
                        {story.role}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-bold text-amber-600">
                      <Star size={12} fill="currentColor" />
                      5.0
                    </div>
                  </div>

                  {/* Company */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>{story.company}</span>
                    <span>•</span>
                    <span>{story.location}</span>
                  </div>

                  {/* Quote */}
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    “{story.quote}”
                  </p>

                  {/* Results */}
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[11px] font-medium text-slate-400">
                        Result
                      </p>
                      <p className="mt-1 text-xs font-bold text-slate-700">
                        {story.result}
                      </p>
                    </div>

                    <div className="rounded-xl bg-blue-50 p-3">
                      <p className="text-[11px] font-medium text-slate-400">
                        Salary
                      </p>
                      <p className="mt-1 text-xs font-bold text-blue-600">
                        {story.salary}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SUCCESS JOURNEY
      ====================================================== */}
      <section className="bg-slate-50 py-4 sm:py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Your Journey
            </span>

            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Your Success Story Starts Here
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Take four simple steps toward your next career opportunity.
            </p>
          </div>

          <div className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* Desktop Line */}
            <div className="absolute left-[12%] right-[12%] top-10 hidden h-px bg-blue-100 lg:block" />

            {journeySteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-md"
                >
                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border-8 border-blue-50 bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    <Icon size={25} />
                  </div>

                  <span className="mt-5 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600">
                    STEP {step.number}
                  </span>

                  <h3 className="mt-3 text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          GLOBAL SUCCESS
      ====================================================== */}
      <section className="bg-white py-4 sm:py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-10 text-white shadow-xl shadow-blue-200 sm:px-10 lg:px-14">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold backdrop-blur">
                  <Globe2 size={15} />
                  Global Opportunities
                </div>

                <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                  Success Has No
                  <span className="block text-blue-100">
                    Boundaries
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                  DreamGoGlobal connects job seekers with opportunities across
                  countries, industries and career levels.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/jobs")}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-lg transition hover:bg-blue-50"
                >
                  Explore Global Jobs
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Countries */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {countries.map((country) => (
                  <div
                    key={country.name}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition hover:bg-white/15"
                  >
                    <div className="text-2xl">{country.flag}</div>

                    <h3 className="mt-2 text-sm font-bold">
                      {country.name}
                    </h3>

                    <p className="mt-1 text-xs text-blue-100">
                      {country.jobs}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TESTIMONIAL STRIP
      ====================================================== */}
      <section className="border-y border-slate-100 bg-slate-50/70 py-4">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Quote
            size={42}
            className="mx-auto text-blue-100"
            fill="currentColor"
          />

          <p className="mt-4 text-xl font-semibold leading-8 text-slate-800 sm:text-2xl">
            “The best career move I made was taking the first step. DreamGoglobal
            helped me turn that step into a real opportunity.”
          </p>

          <div className="mt-5 flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((item) => (
              <Star
                key={item}
                size={17}
                className="text-amber-400"
                fill="currentColor"
              />
            ))}
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-600">
            — DreamGoglobal Community
          </p>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="bg-white py-4 sm:py-4">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6 py-6 text-center shadow-sm sm:px-10 sm:py-6">
            {/* Decorations */}
            <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-blue-100/60 blur-2xl" />
            <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-indigo-100/60 blur-2xl" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <Rocket size={25} />
              </div>

              <h2 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Ready to Write Your Success Story?
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Your next opportunity could be closer than you think. Explore
                thousands of jobs and take the next step in your career today.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/jobs")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:w-auto"
                >
                  Explore Jobs
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:w-auto"
                >
                  Join DreamGoGlobal
                </button>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Trusted Opportunities
                </span>

                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Easy Applications
                </span>

                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Career Growth
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;

