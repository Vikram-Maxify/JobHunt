import React from "react";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Plane,
} from "lucide-react";

const ChooseUs = () => {
  const features = [
    {
      icon: BriefcaseBusiness,
      title: "Thousands of Opportunities",
      description:
        "Discover relevant job opportunities from startups, growing companies and leading organizations.",
    },
    {
      icon: Users,
      title: "Professional Network",
      description:
        "Connect with professionals, recruiters and companies to grow your career network.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Companies",
      description:
        "Explore opportunities from verified companies and build your career with confidence.",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description:
        "Access resources, insights and opportunities designed to help you achieve your career goals.",
    },
    {
      icon: Plane,
      title: "No Experience? Start Here",
      description:
        "Explore selected international opportunities where no prior experience is needed, with visa and ticket support sponsored by the company.",
    },
    {
      icon: Award,
      title: "Built For Your Success",
      description:
        "Powerful tools and a simple experience to help you move forward in your professional journey.",
    },
  ];

  return (
    <section className="overflow-hidden bg-white py-2 sm:py-2 lg:py-2">
      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600 sm:text-sm">
            <Sparkles size={15} />
            Why Choose CareerSphere
          </div>

          {/* Heading */}

          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Everything You Need to
            <span className="block text-blue-600">
              Build Your Career
            </span>
          </h2>

          {/* Description */}

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
            CareerSphere brings jobs, professionals and career resources
            together in one powerful platform designed to help you discover
            opportunities and grow professionally.
          </p>
        </div>

        {/* =================================================
            PREMIUM COMPACT FEATURE CARDS
        ================================================= */}

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200/80
                  bg-white
                  p-5
                  shadow-[0_4px_20px_rgba(15,23,42,0.04)]
                  transition-all
                  duration-400
                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:shadow-[0_15px_35px_rgba(37,99,235,0.10)]
                  sm:p-5
                "
              >
                {/* =================================================
                    SOFT BACKGROUND GLOW
                ================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-12
                    -top-12
                    h-28
                    w-28
                    rounded-full
                    bg-blue-50
                    opacity-60
                    transition-all
                    duration-500
                    group-hover:scale-125
                    group-hover:bg-blue-100
                  "
                />

                {/* =================================================
                    TOP
                ================================================= */}

                <div className="relative flex items-center justify-between">
                  {/* Icon */}

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-blue-100
                      bg-gradient-to-br
                      from-blue-50
                      to-indigo-50
                      text-blue-600
                      transition-all
                      duration-300
                      group-hover:border-blue-600
                      group-hover:bg-blue-600
                      group-hover:text-white
                      group-hover:shadow-md
                      group-hover:shadow-blue-500/20
                    "
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  {/* Number */}

                  <span
                    className="
                      rounded-full
                      bg-slate-50
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      tracking-wider
                      text-slate-400
                      transition-colors
                      duration-300
                      group-hover:bg-blue-50
                      group-hover:text-blue-600
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="relative mt-5">
                  <h3
                    className="
                      text-base
                      font-bold
                      tracking-tight
                      text-slate-900
                      transition-colors
                      duration-300
                      group-hover:text-blue-600
                      sm:text-[17px]
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-slate-500
                      sm:text-[13px]
                      sm:leading-6
                    "
                  >
                    {feature.description}
                  </p>
                </div>

                {/* =================================================
                    FOOTER
                ================================================= */}

                <div
                  className="
                    relative
                    mt-4
                    flex
                    items-center
                    justify-between
                    border-t
                    border-slate-100
                    pt-3
                  "
                >
                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-slate-400
                      transition-colors
                      duration-300
                      group-hover:text-blue-600
                    "
                  >
                    Learn More
                  </span>

                  <div
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-200
                      text-slate-400
                      transition-all
                      duration-300
                      group-hover:border-blue-600
                      group-hover:bg-blue-600
                      group-hover:text-white
                    "
                  >
                    <ArrowRight
                      size={13}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                      "
                    />
                  </div>
                </div>

                {/* =================================================
                    BOTTOM ACCENT
                ================================================= */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-[2px]
                    w-0
                    -translate-x-1/2
                    rounded-full
                    bg-gradient-to-r
                    from-blue-500
                    via-indigo-500
                    to-purple-500
                    transition-all
                    duration-500
                    group-hover:w-1/3
                  "
                />
              </div>
            );
          })}
        </div>

        {/* =================================================
            BOTTOM HIGHLIGHT
        ================================================= */}

        <div className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 sm:mt-12">
          <div className="relative px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
            {/* Decorations */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              {/* Text */}

              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2
                    size={18}
                    className="text-blue-100"
                  />

                  <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
                    Your Career Starts Here
                  </span>
                </div>

                <h3 className="text-2xl font-black leading-tight text-white sm:text-3xl">
                  Find the opportunity that
                  <span className="text-blue-100">
                    {" "}moves you forward.
                  </span>
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100/80 sm:text-base">
                  Create your profile, explore opportunities and take the
                  next step toward your professional goals.
                </p>
              </div>

              {/* Stats */}

              <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-[330px]">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-4 text-center backdrop-blur-md sm:px-5">
                  <p className="text-xl font-black text-white sm:text-2xl">
                    50K+
                  </p>

                  <p className="mt-1 text-[10px] text-blue-100/70 sm:text-xs">
                    Professionals
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-4 text-center backdrop-blur-md sm:px-5">
                  <p className="text-xl font-black text-white sm:text-2xl">
                    10K+
                  </p>

                  <p className="mt-1 text-[10px] text-blue-100/70 sm:text-xs">
                    Jobs
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-4 text-center backdrop-blur-md sm:px-5">
                  <p className="text-xl font-black text-white sm:text-2xl">
                    2K+
                  </p>

                  <p className="mt-1 text-[10px] text-blue-100/70 sm:text-xs">
                    Companies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;