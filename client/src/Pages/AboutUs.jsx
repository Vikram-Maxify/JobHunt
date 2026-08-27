import React from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  UserCheck,
  Building2,
  Globe2,
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const stats = [
    {
      number: "50K+",
      label: "Active Job Seekers",
      icon: Users,
    },
    {
      number: "10K+",
      label: "Job Opportunities",
      icon: BriefcaseBusiness,
    },
    {
      number: "2K+",
      label: "Hiring Companies",
      icon: Building2,
    },
    {
      number: "95%",
      label: "User Satisfaction",
      icon: HeartHandshake,
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Career Focused",
      description:
        "We help job seekers discover meaningful opportunities that match their skills, goals and ambitions.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Platform",
      description:
        "We focus on creating a secure and reliable environment for professionals and employers.",
    },
    {
      icon: Lightbulb,
      title: "Smart Opportunities",
      description:
        "Our platform makes it easier to discover relevant jobs and connect with the right organizations.",
    },
    {
      icon: TrendingUp,
      title: "Growth Driven",
      description:
        "We believe every professional deserves the right opportunities to grow and build a successful career.",
    },
  ];

  const services = [
    {
      icon: Search,
      title: "Find Your Dream Job",
      description:
        "Explore thousands of opportunities from companies looking for talented professionals.",
    },
    {
      icon: UserCheck,
      title: "Build Your Profile",
      description:
        "Create a professional profile that highlights your skills, experience and career goals.",
    },
    {
      icon: GraduationCap,
      title: "Learn & Grow",
      description:
        "Discover learning resources that can help you improve your skills and stay career-ready.",
    },
    {
      icon: Building2,
      title: "Hire Great Talent",
      description:
        "Employers can discover skilled candidates and build strong teams for their organizations.",
    },
  ];

  return (
    <div className=" overflow-x-hidden bg-slate-50">
   {/* =====================================================
    COMPACT PREMIUM ABOUT US HERO SECTION
====================================================== */}
<section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/40">

  {/* Grid */}
  <div
    className="absolute inset-0 opacity-[0.04]"
    style={{
      backgroundImage:
        "linear-gradient(rgba(30,41,59,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.35) 1px, transparent 1px)",
      backgroundSize: "45px 45px",
    }}
  />

  {/* Glow */}
  <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
  <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

  <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    <div className="grid min-h-[430px] items-center gap-8 py-6 sm:min-h-[480px] sm:py-12 lg:grid-cols-[1fr_0.9fr] lg:gap-12 lg:py-14">

      {/* =================================================
          LEFT CONTENT
      ================================================= */}
      <div className="relative z-20 max-w-2xl text-center lg:text-left">

        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-600 shadow-sm sm:text-sm">

          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
            <Sparkles size={12} />
          </span>

          About CareerSphere

        </div>

        {/* Heading */}
        <h1 className="text-3xl font-black leading-[1.08] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">

          Empowering People

          <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            To Build Better Careers
          </span>

        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-slate-600 sm:text-sm sm:leading-7 lg:mx-0 lg:text-base">
          CareerSphere connects ambitious professionals with
          meaningful opportunities, trusted companies and the
          resources they need to move their careers forward.
        </p>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap justify-center gap-5 sm:gap-7 lg:justify-start">

          {/* Stat 1 */}
          <div>
            <p className="text-xl font-black text-slate-900 sm:text-2xl">
              50K+
            </p>

            <p className="text-[10px] text-slate-500 sm:text-xs">
              Professionals
            </p>
          </div>

          <div className="h-8 w-px bg-slate-300" />

          {/* Stat 2 */}
          <div>
            <p className="text-xl font-black text-slate-900 sm:text-2xl">
              10K+
            </p>

            <p className="text-[10px] text-slate-500 sm:text-xs">
              Opportunities
            </p>
          </div>

          <div className="h-8 w-px bg-slate-300" />

          {/* Stat 3 */}
          <div>
            <p className="text-xl font-black text-slate-900 sm:text-2xl">
              2K+
            </p>

            <p className="text-[10px] text-slate-500 sm:text-xs">
              Companies
            </p>
          </div>

        </div>

        {/* Trust */}
        <div className="mt-5 flex items-center justify-center gap-2.5 lg:justify-start">

          <div className="flex -space-x-2">

            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-[9px] font-bold text-white shadow-sm">
              A
            </div>

            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-indigo-500 text-[9px] font-bold text-white shadow-sm">
              R
            </div>

            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-purple-500 text-[9px] font-bold text-white shadow-sm">
              S
            </div>

            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-700 text-[9px] font-bold text-white shadow-sm">
              +
            </div>

          </div>

          <p className="text-[10px] text-slate-500 sm:text-xs">
            Trusted by thousands of professionals
          </p>

        </div>

      </div>

      {/* =================================================
          RIGHT IMAGE
      ================================================= */}
      <div className="relative z-10 mx-auto w-full max-w-md lg:max-w-none">

        {/* Glow */}
        <div className="absolute -inset-4 rounded-[2rem] bg-blue-500/15 blur-2xl" />

        {/* Image Card */}
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/70 p-1.5 shadow-2xl backdrop-blur-sm">

          <div className="relative h-[250px] overflow-hidden rounded-[1.2rem] sm:h-[300px] lg:h-[340px]">

            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=90"
              alt="CareerSphere professionals collaborating"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

            {/* Bottom Text */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-300 sm:text-[10px]">
                Career • Growth • Opportunity
              </p>

              <h3 className="mt-1 text-base font-bold text-white sm:text-lg">
                Your journey. Your opportunity.
              </h3>

            </div>

          </div>

        </div>

        {/* Floating Card - Top */}
        <div className="absolute -right-2 -top-4 hidden rounded-xl border border-slate-100 bg-white p-3 shadow-xl sm:block lg:-right-5">

          <div className="flex items-center gap-2.5">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <p className="text-xs font-bold text-slate-900">
                Trusted Platform
              </p>

              <p className="text-[9px] text-slate-400">
                Built for professionals
              </p>
            </div>

          </div>

        </div>

        {/* Floating Card - Bottom */}
        <div className="absolute -bottom-4 -left-2 hidden rounded-xl border border-slate-100 bg-white p-3 shadow-xl sm:block lg:-left-5">

          <div className="flex items-center gap-2.5">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <TrendingUp size={18} />
            </div>

            <div>
              <p className="text-base font-black text-slate-900">
                95%
              </p>

              <p className="text-[9px] text-slate-400">
                User Satisfaction
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

      {/* =====================================================
          INTRODUCTION SECTION
      ===================================================== */}
      <section className="px-4 py-8 sm:px-6 sm:py-8 lg:px-8 lg:py-8">

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Left Content */}
          <div>

            <div className="mb-3 flex items-center gap-2">

              <div className="h-1 w-8 rounded-full bg-blue-600" />

              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 sm:text-sm">
                Who We Are
              </span>

            </div>

            <h2 className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl">
              Building A Better
              <span className="block text-blue-600">
                Future For Careers
              </span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-gray-500 sm:text-base">
              CareerSphere was created with one simple idea:
              finding the right career opportunity should be easier,
              faster and more meaningful.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-gray-500 sm:text-base">
              We bring job seekers, professionals, recruiters and
              companies together on one modern platform. Whether
              you're starting your career, looking for your next
              opportunity or searching for talented people, CareerSphere
              helps you move forward.
            </p>

            {/* Points */}
            <div className="mt-6 space-y-3">

              {[
                "Connect professionals with relevant opportunities",
                "Help companies discover skilled talent",
                "Support continuous career growth",
                "Create a trusted professional community",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <p className="text-sm font-medium text-gray-700">
                    {item}
                  </p>
                </div>
              ))}

            </div>

          </div>

          {/* Right Visual */}
          <div className="relative">

            <div className="relative overflow-hidden rounded-3xl hidden sm:block bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-6 shadow-2xl sm:p-8">

              {/* Decorative circles */}
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-blue-300/10 blur-2xl" />

              <div className="relative">

                {/* Main Card */}
                <div className="rounded-2xl bg-white p-5 shadow-xl sm:p-6">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs font-medium text-gray-400">
                        Career Growth
                      </p>

                      <h3 className="mt-1 text-xl font-bold text-gray-900">
                        Your Future Starts Here
                      </h3>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <TrendingUp size={22} />
                    </div>

                  </div>

                  {/* Progress */}
                  <div className="mt-7">

                    <div className="mb-2 flex justify-between text-xs">
                      <span className="font-medium text-gray-500">
                        Career Progress
                      </span>

                      <span className="font-bold text-blue-600">
                        85%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                      <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />

                    </div>

                  </div>

                  {/* Mini Cards */}
                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-blue-50 p-4">

                      <BriefcaseBusiness
                        size={20}
                        className="text-blue-600"
                      />

                      <p className="mt-3 text-lg font-bold text-gray-900">
                        10K+
                      </p>

                      <p className="text-xs text-gray-500">
                        Opportunities
                      </p>

                    </div>

                    <div className="rounded-xl bg-indigo-50 p-4">

                      <Users
                        size={20}
                        className="text-indigo-600"
                      />

                      <p className="mt-3 text-lg font-bold text-gray-900">
                        50K+
                      </p>

                      <p className="text-xs text-gray-500">
                        Professionals
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          STATS SECTION
      ===================================================== */}
      <section className="px-4 pb-8 sm:px-6 sm:pb-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
                >

                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-4 text-2xl font-black text-gray-900 sm:text-3xl">
                    {stat.number}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    {stat.label}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          MISSION & VISION
      ===================================================== */}
      <section className="bg-white px-4 py-6 sm:px-6 sm:py-6 lg:px-8 lg:py-6">

        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">

            <div className="mb-3 flex items-center justify-center gap-2">

              <div className="h-1 w-8 rounded-full bg-blue-600" />

              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 sm:text-sm">
                Our Purpose
              </span>

              <div className="h-1 w-8 rounded-full bg-blue-600" />

            </div>

            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">
              Mission & Vision
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-gray-500 sm:text-base">
              We are building a platform where every professional
              can discover opportunities and every company can find
              the talent it needs.
            </p>

          </div>

          {/* Cards */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Mission */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl sm:p-8">

              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                  <Target size={23} />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Our Mission
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-blue-100 sm:text-base">
                  Our mission is to simplify the job search and
                  recruitment experience by creating meaningful
                  connections between talented people and great
                  organizations.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-white">
                  <CheckCircle2 size={17} />
                  Connecting people with possibilities
                </div>

              </div>

            </div>

            {/* Vision */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-xl sm:p-8">

              <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                  <Globe2 size={23} />
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Our Vision
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-indigo-100 sm:text-base">
                  We envision a world where finding the right
                  career opportunity is simple, transparent and
                  accessible to everyone.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-white">
                  <CheckCircle2 size={17} />
                  Creating the future of careers
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          OUR VALUES
      ===================================================== */}
      <section className="px-4 py-8 sm:px-6 sm:py-8 lg:px-8 lg:py-6">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-2">

                <div className="h-1 w-8 rounded-full bg-blue-600" />

                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 sm:text-sm">
                  What We Believe
                </span>

              </div>

              <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">
                Our Core Values
              </h2>

            </div>

            <p className="max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base lg:text-right">
              Everything we build is guided by values that put
              people, trust and career growth first.
            </p>

          </div>

          {/* Values Grid */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl sm:p-6"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {value.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* =====================================================
          HOW WE HELP
      ===================================================== */}
      <section className="bg-slate-900 px-4 py-8 sm:px-6 sm:py-8 lg:px-8 lg:py-8">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <div className="mb-3 flex items-center justify-center gap-2">

              <div className="h-1 w-8 rounded-full bg-blue-500" />

              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 sm:text-sm">
                What We Do
              </span>

              <div className="h-1 w-8 rounded-full bg-blue-500" />

            </div>

            <h2 className="text-3xl font-black text-white sm:text-4xl">
              Everything You Need
              <span className="block text-blue-400">
                To Grow Your Career
              </span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
              CareerSphere brings everything together in one
              professional ecosystem.
            </p>

          </div>

          {/* Services */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 sm:p-6"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                      <Icon size={21} />
                    </div>

                    <span className="text-2xl font-black text-white/10">
                      0{index + 1}
                    </span>

                  </div>

                  <h3 className="mt-5 text-lg font-bold text-white">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    {service.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-blue-400">
                    Learn More
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* =====================================================
          TEAM / COMMUNITY SECTION
      ===================================================== */}
      <section className="bg-white px-4 py-8 sm:px-6 sm:py-8 lg:px-8 lg:py-8">

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Visual */}
          <div className="relative order-2 lg:order-1">

            <div className="grid grid-cols-2 gap-4">

              {/* Card 1 */}
              <div className="rounded-3xl bg-blue-50 p-5 sm:p-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Users size={23} />
                </div>

                <h3 className="mt-5 text-2xl font-black text-gray-900">
                  50K+
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Professionals
                </p>

              </div>

              {/* Card 2 */}
              <div className="mt-8 rounded-3xl bg-indigo-50 p-5 sm:p-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <Building2 size={23} />
                </div>

                <h3 className="mt-5 text-2xl font-black text-gray-900">
                  2K+
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Companies
                </p>

              </div>

              {/* Card 3 */}
              <div className="-mt-2 rounded-3xl bg-purple-50 p-5 sm:p-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white">
                  <BriefcaseBusiness size={23} />
                </div>

                <h3 className="mt-5 text-2xl font-black text-gray-900">
                  10K+
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Jobs
                </p>

              </div>

              {/* Card 4 */}
              <div className="rounded-3xl bg-slate-100 p-5 sm:p-6">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <Globe2 size={23} />
                </div>

                <h3 className="mt-5 text-2xl font-black text-gray-900">
                  24/7
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Platform Access
                </p>

              </div>

            </div>

          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">

            <div className="mb-3 flex items-center gap-2">

              <div className="h-1 w-8 rounded-full bg-blue-600" />

              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 sm:text-sm">
                Our Community
              </span>

            </div>

            <h2 className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl">
              More Than A Job
              <span className="block text-blue-600">
                Search Platform
              </span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-gray-500 sm:text-base">
              CareerSphere is a growing professional community
              where people connect, learn, discover opportunities
              and build relationships that can shape their future.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-gray-500 sm:text-base">
              We believe careers are more than just job titles.
              They are journeys filled with learning, growth,
              connections and opportunities.
            </p>

            <Link to='/subscription'>
              <button
                type="button"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl"
              >
                Join Our Community

                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </Link>

          </div>

        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-10 text-center sm:px-10 sm:py-14 lg:px-16 lg:py-16">

          {/* Decorations */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              <Sparkles size={14} />
              Your Future Starts Today
            </div>

            <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
              Ready To Take The Next
              <span className="text-blue-100">
                {" "}Step?
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-blue-100/80 sm:text-base">
              Discover opportunities, connect with professionals
              and start building the career you've always wanted.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

              <Link to='/jobs'>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-600 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:px-8"
                >
                  Explore Jobs
                  <ArrowRight size={17} />
                </button>
              </Link>

              <Link to='/contact'>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:px-8"
                >
                  Contact Us
                  <ArrowRight size={17} />
                </button>
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default AboutUs;