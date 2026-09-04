import React, { useEffect, useRef, useState } from "react";
import {
  UserPlus,
  Search,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Rocket,
} from "lucide-react";

const CarrierWork = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // =========================================================
  // INTERSECTION OBSERVER
  // =========================================================

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // =========================================================
  // STEPS
  // =========================================================

  const steps = [
    {
      id: 1,
      title: "Create Your Profile",
      shortTitle: "Create Profile",
      description:
        "Build your professional profile with your skills, experience and career preferences.",
      icon: UserPlus,
      color: "blue",
    },
    {
      id: 2,
      title: "Browse & Discover",
      shortTitle: "Discover Jobs",
      description:
        "Explore relevant opportunities from companies that match your career goals.",
      icon: Search,
      color: "purple",
    },
    {
      id: 3,
      title: "Apply & Get Matched",
      shortTitle: "Apply & Match",
      description:
        "Apply to suitable jobs and connect with employers looking for your skills.",
      icon: Briefcase,
      color: "emerald",
    },
    {
      id: 4,
      title: "Land Your Dream Job",
      shortTitle: "Get Hired",
      description:
        "Track your applications, attend interviews and start your next career journey.",
      icon: CheckCircle,
      color: "amber",
    },
  ];

  // =========================================================
  // COLOR MAP
  // =========================================================

  const colors = {
    blue: {
      iconBg: "bg-blue-50",
      iconText: "text-blue-600",
      iconBorder: "border-blue-100",
      number: "bg-blue-600",
      glow: "bg-blue-500/10",
    },

    purple: {
      iconBg: "bg-purple-50",
      iconText: "text-purple-600",
      iconBorder: "border-purple-100",
      number: "bg-purple-600",
      glow: "bg-purple-500/10",
    },

    emerald: {
      iconBg: "bg-emerald-50",
      iconText: "text-emerald-600",
      iconBorder: "border-emerald-100",
      number: "bg-emerald-600",
      glow: "bg-emerald-500/10",
    },

    amber: {
      iconBg: "bg-amber-50",
      iconText: "text-amber-600",
      iconBorder: "border-amber-100",
      number: "bg-amber-500",
      glow: "bg-amber-500/10",
    },
  };

  return (
    <>
      {/* =====================================================
          CUSTOM CSS
      ===================================================== */}

      <style>
        {`
          @keyframes careerFadeUp {
            from {
              opacity: 0;
              transform: translateY(25px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes careerFloat {
            0%,
            100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-7px);
            }
          }

          @keyframes careerPulse {
            0%,
            100% {
              transform: scale(1);
              opacity: 1;
            }

            50% {
              transform: scale(1.08);
              opacity: 0.8;
            }
          }

          @keyframes lineGrow {
            from {
              transform: scaleX(0);
            }

            to {
              transform: scaleX(1);
            }
          }

          .career-step {
            opacity: 0;
          }

          .career-step.show {
            animation: careerFadeUp 0.65s ease forwards;
          }

          .career-floating {
            animation: careerFloat 4s ease-in-out infinite;
          }

          .career-pulse {
            animation: careerPulse 2.5s ease-in-out infinite;
          }

          .career-line {
            transform-origin: left center;
          }

          .career-line.show {
            animation: lineGrow 1.2s ease forwards;
          }

          .career-card {
            transition:
              transform 0.35s ease,
              box-shadow 0.35s ease,
              border-color 0.35s ease;
          }

          .career-card:hover {
            transform: translateY(-6px);
            box-shadow:
              0 24px 50px -20px rgba(15, 23, 42, 0.22);
          }

          @media (prefers-reduced-motion: reduce) {
            .career-step,
            .career-line,
            .career-floating,
            .career-pulse {
              animation: none !important;
              opacity: 1 !important;
            }

            .career-card {
              transition: none !important;
            }
          }
        `}
      </style>

      {/* =====================================================
          SECTION
      ===================================================== */}

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/40 py-4 sm:py-4 lg:py-4"
      >
        {/* ===================================================
            BACKGROUND DECORATIONS
        ==================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />

          <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-purple-100/40 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-50/40 blur-3xl" />
        </div>

        {/* ===================================================
            MAIN CONTAINER
        ==================================================== */}

        <div className="relative mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-11">
            {/* Badge */}

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 shadow-sm sm:px-4">
              <Sparkles
                size={13}
                className="text-blue-600"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600 sm:text-xs">
                How It Works
              </span>
            </div>

            {/* Heading */}

            <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
              Your Journey to{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Career Success
              </span>
            </h2>

            {/* Description */}

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              From creating your profile to landing your dream job,
              CareerSphere makes your career journey simple and
              straightforward.
            </p>
          </div>

          {/* =================================================
              DESKTOP JOURNEY
          ================================================== */}

          <div className="relative mx-auto hidden max-w-6xl lg:block">
            {/* Connecting Line */}

            <div className="absolute left-[12%] right-[12%] top-[48px] h-[2px] overflow-hidden bg-slate-200">
              <div
                className={`career-line h-full origin-left bg-gradient-to-r from-blue-500 via-purple-500 via-emerald-500 to-amber-500 ${
                  isVisible ? "show" : ""
                }`}
              />
            </div>

            {/* Steps */}

            <div className="relative grid grid-cols-4 gap-5">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const color = colors[step.color];

                return (
                  <div
                    key={step.id}
                    className={`career-step ${
                      isVisible ? "show" : ""
                    }`}
                    style={{
                      animationDelay: `${index * 130}ms`,
                    }}
                  >
                    {/* Top Icon */}

                    <div className="relative z-10 mx-auto flex w-fit">
                      <div
                        className={`flex h-24 w-24 items-center justify-center rounded-full border-8 border-white ${color.iconBg} shadow-lg`}
                      >
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-full ${color.number} text-white shadow-md`}
                        >
                          <Icon size={25} />
                        </div>
                      </div>

                      {/* Number */}

                      <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-[10px] font-black text-white shadow-md">
                        0{step.id}
                      </div>
                    </div>

                    {/* Card */}

                    <div
                      className={`career-card relative mt-5 min-h-[210px] rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm`}
                    >
                      {/* Glow */}

                      <div
                        className={`pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full ${color.glow} blur-2xl`}
                      />

                      <div className="relative">
                        <span
                          className={`inline-flex rounded-full ${color.iconBg} px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${color.iconText}`}
                        >
                          Step {step.id}
                        </span>

                        <h3 className="mt-3 text-base font-bold leading-snug text-slate-900">
                          {step.title}
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {step.description}
                        </p>

                        <div
                          className={`mx-auto mt-4 h-1 w-8 rounded-full ${color.number}`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =================================================
              MOBILE / TABLET JOURNEY
          ================================================== */}

          <div className="relative mx-auto max-w-2xl lg:hidden">
            {/* Vertical Line */}

            <div className="absolute bottom-8 left-[25px] top-8 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 via-emerald-500 to-amber-500 opacity-20 sm:left-[29px]" />

            <div className="space-y-4 sm:space-y-5">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const color = colors[step.color];

                return (
                  <div
                    key={step.id}
                    className={`career-step relative flex gap-3 sm:gap-4 ${
                      isVisible ? "show" : ""
                    }`}
                    style={{
                      animationDelay: `${index * 130}ms`,
                    }}
                  >
                    {/* Timeline Icon */}

                    <div className="relative z-10 shrink-0">
                      <div
                        className={`flex h-[52px] w-[52px] items-center justify-center rounded-full border-4 border-white ${color.iconBg} shadow-md sm:h-[60px] sm:w-[60px]`}
                      >
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full ${color.number} text-white sm:h-11 sm:w-11`}
                        >
                          <Icon
                            size={17}
                            className="sm:h-5 sm:w-5"
                          />
                        </div>
                      </div>

                      {/* Number */}

                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[8px] font-black text-white sm:h-6 sm:w-6 sm:text-[9px]">
                        {step.id}
                      </span>
                    </div>

                    {/* Card */}

                    <div
                      className={`career-card min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <span
                            className={`inline-flex rounded-full ${color.iconBg} px-2 py-1 text-[8px] font-bold uppercase tracking-wider ${color.iconText} sm:text-[9px]`}
                          >
                            Step {step.id}
                          </span>

                          <h3 className="mt-2 text-sm font-bold leading-snug text-slate-900 sm:text-base">
                            {step.title}
                          </h3>
                        </div>

                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${color.iconBg} ${color.iconText}`}
                        >
                          <Icon size={16} />
                        </div>
                      </div>

                      <p className="mt-2 text-[11px] leading-5 text-slate-500 sm:text-xs sm:leading-5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

  
          {/* =================================================
              CTA
          ================================================== */}

          <div className="mt-6 text-center sm:mt-7">
            <a
              href="/subscription"
              className="group inline-flex w-full max-w-[250px] items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-slate-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-xl sm:w-auto sm:max-w-none sm:px-6 sm:py-3.5 sm:text-sm"
            >
              <Zap
                size={15}
                className="fill-current"
              />

              <span>Get Started Now</span>

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <p className="mt-2 text-[9px] text-slate-400 sm:text-[10px]">
              Join 10,000+ professionals on CareerSphere
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarrierWork;