import React, { useEffect, useRef, useState } from "react";
import {
  UserPlus,
  Search,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
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
        threshold: 0.1,
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
      description:
        "Sign up and build your professional profile. Add your skills, experience, and career preferences to get personalized job recommendations.",
      icon: UserPlus,
      color: "blue",
    },
    {
      id: 2,
      title: "Browse & Discover",
      description:
        "Explore thousands of job listings from top companies. Use smart filters to find roles that match your skills and career goals.",
      icon: Search,
      color: "purple",
    },
    {
      id: 3,
      title: "Apply & Get Matched",
      description:
        "Apply to your dream jobs with one click. Our AI-powered matching system connects you with the best opportunities.",
      icon: Briefcase,
      color: "green",
    },
    {
      id: 4,
      title: "Land Your Dream Job",
      description:
        "Receive interview calls, track your applications, and get hired. Start your new career journey with CareerSphere.",
      icon: CheckCircle,
      color: "amber",
    },
  ];

  // =========================================================
  // COLOR MAP
  // =========================================================

  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
      gradient: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-500/20",
    },

    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-600",
      gradient: "from-purple-500 to-purple-600",
      shadow: "shadow-purple-500/20",
    },

    green: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-600",
      gradient: "from-emerald-500 to-emerald-600",
      shadow: "shadow-emerald-500/20",
    },

    amber: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-600",
      gradient: "from-amber-500 to-amber-600",
      shadow: "shadow-amber-500/20",
    },
  };

  const delays = [100, 150, 200, 250];

  return (
    <>
      {/* =====================================================
          CUSTOM CSS
      ====================================================== */}

      <style>
        {`
          /* ===================================================
             ANIMATIONS
          =================================================== */

          @keyframes fadeInLeft {
            0% {
              opacity: 0;
              transform: translateX(-25px);
            }

            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInRight {
            0% {
              opacity: 0;
              transform: translateX(25px);
            }

            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulseDot {
            0% {
              transform: scale(1);
              opacity: 1;
            }

            50% {
              transform: scale(1.15);
              opacity: 0.8;
            }

            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          .timeline-item {
            opacity: 0;
          }

          .timeline-item.animate-in-left {
            animation: fadeInLeft 0.6s ease forwards;
          }

          .timeline-item.animate-in-right {
            animation: fadeInRight 0.6s ease forwards;
          }

          .timeline-item.animate-in-up {
            animation: fadeInUp 0.6s ease forwards;
          }

          /* ===================================================
             TIMELINE
          =================================================== */

          .timeline-line {
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;

            width: 3px;

            background:
              linear-gradient(
                180deg,
                #3b82f6 0%,
                #8b5cf6 35%,
                #10b981 70%,
                #f59e0b 100%
              );

            transform: translateX(-50%);

            border-radius: 999px;

            opacity: 0.22;
          }

          .timeline-dot {
            position: absolute;

            left: 50%;

            width: 18px;
            height: 18px;

            border-radius: 50%;

            transform: translateX(-50%);

            border: 3px solid white;

            box-shadow:
              0 0 0 4px rgba(59, 130, 246, 0.12),
              0 4px 10px rgba(0, 0, 0, 0.08);

            z-index: 5;

            background: #3b82f6;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 9px;
            font-weight: 700;

            color: white;

            transition: all 0.3s ease;
          }

          .timeline-dot:hover {
            transform: translateX(-50%) scale(1.15);
          }

          /* ===================================================
             SECTION
          =================================================== */

          .section-bg {
            background:
              linear-gradient(
                180deg,
                #f8fafc 0%,
                #ffffff 50%,
                #f0f9ff 100%
              );
          }

          /* ===================================================
             CARD
          =================================================== */

          .timeline-card {
            position: relative;

            width: 100%;
            max-width: 440px;

            padding: 1.1rem 1.25rem;

            background: rgba(255, 255, 255, 0.95);

            border: 1px solid #e5e7eb;

            border-radius: 1rem;

            box-shadow:
              0 4px 15px -8px rgba(15, 23, 42, 0.12);

            overflow: hidden;

            transition:
              transform 0.3s ease,
              box-shadow 0.3s ease,
              border-color 0.3s ease;
          }

          .timeline-card::before {
            content: "";

            position: absolute;

            inset: -1px;

            border-radius: inherit;

            padding: 1px;

            background:
              linear-gradient(
                135deg,
                rgba(59, 130, 246, 0.35),
                rgba(139, 92, 246, 0.35),
                rgba(16, 185, 129, 0.35),
                rgba(245, 158, 11, 0.35)
              );

            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);

            mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);

            -webkit-mask-composite: xor;
            mask-composite: exclude;

            opacity: 0;

            transition: opacity 0.3s ease;

            pointer-events: none;
          }

          .timeline-card:hover::before {
            opacity: 1;
          }

          .timeline-card:hover {
            transform: translateY(-5px);

            box-shadow:
              0 18px 35px -15px rgba(15, 23, 42, 0.2);

            border-color: transparent;
          }

          /* ===================================================
             ICON
          =================================================== */

          .icon-wrap {
            flex-shrink: 0;

            width: 42px;
            height: 42px;

            padding: 0.6rem;

            border-radius: 0.75rem;

            display: flex;
            align-items: center;
            justify-content: center;

            transition:
              transform 0.3s ease,
              box-shadow 0.3s ease;
          }

          .icon-wrap svg {
            width: 1.2rem;
            height: 1.2rem;
          }

          .timeline-card:hover .icon-wrap {
            transform: scale(1.08) rotate(-2deg);
          }

          /* ===================================================
             STEP BADGE
          =================================================== */

          .step-badge {
            display: inline-flex;

            align-items: center;
            justify-content: center;

            flex-shrink: 0;

            font-size: 0.65rem;

            font-weight: 700;

            color: #64748b;

            background: #f8fafc;

            border: 1px solid #e2e8f0;

            border-radius: 9999px;

            padding: 0.15rem 0.55rem;

            transition: all 0.3s ease;
          }

          .timeline-card:hover .step-badge {
            background: #dbeafe;
            color: #2563eb;
            border-color: #93c5fd;
          }

          /* ===================================================
             CARD TITLE
          =================================================== */

          .timeline-card h3 {
            margin: 0;

            font-size: 1rem;

            font-weight: 700;

            line-height: 1.35;

            color: #0f172a;

            display: flex;

            align-items: center;

            gap: 0.5rem;

            flex-wrap: wrap;
          }

          /* ===================================================
             CARD DESCRIPTION
          =================================================== */

          .timeline-card p {
            margin-top: 0.4rem;

            font-size: 0.82rem;

            line-height: 1.55;

            color: #64748b;
          }

          /* ===================================================
             TABLET
          =================================================== */

          @media (min-width: 640px) {
            .timeline-card {
              padding: 1.25rem 1.4rem;
            }

            .icon-wrap {
              width: 46px;
              height: 46px;
            }

            .icon-wrap svg {
              width: 1.3rem;
              height: 1.3rem;
            }

            .timeline-card h3 {
              font-size: 1.08rem;
            }

            .timeline-card p {
              font-size: 0.88rem;
              line-height: 1.6;
            }
          }

          /* ===================================================
             MOBILE
          =================================================== */

          @media (max-width: 1023px) {
            .timeline-line,
            .timeline-dot {
              display: none;
            }

            .timeline-item.animate-in-left,
            .timeline-item.animate-in-right {
              animation: fadeInUp 0.6s ease forwards;
            }
          }

          @media (max-width: 639px) {
            .timeline-card {
              max-width: none;

              padding: 1rem;

              border-radius: 1rem;

              box-shadow:
                0 4px 15px -7px rgba(15, 23, 42, 0.12);
            }

            .timeline-card:hover {
              transform: translateY(-2px);
            }

            .icon-wrap {
              width: 40px;
              height: 40px;

              padding: 0.55rem;
            }

            .icon-wrap svg {
              width: 1.1rem;
              height: 1.1rem;
            }

            .timeline-card h3 {
              font-size: 0.92rem;

              line-height: 1.4;

              gap: 0.4rem;
            }

            .timeline-card p {
              font-size: 0.79rem;

              line-height: 1.55;

              margin-top: 0.45rem;
            }

            .step-badge {
              font-size: 0.62rem;

              padding:
                0.12rem
                0.48rem;
            }
          }

          /* ===================================================
             VERY SMALL DEVICES
          =================================================== */

          @media (max-width: 380px) {
            .timeline-card {
              padding: 0.85rem;
            }

            .icon-wrap {
              width: 38px;
              height: 38px;
            }

            .timeline-card h3 {
              font-size: 0.88rem;
            }

            .timeline-card p {
              font-size: 0.75rem;
            }

            .step-badge {
              font-size: 0.58rem;
            }
          }

          /* ===================================================
             REDUCED MOTION
          =================================================== */

          @media (prefers-reduced-motion: reduce) {
            .timeline-item {
              opacity: 1 !important;
              animation: none !important;
            }

            .timeline-card,
            .icon-wrap {
              transition: none !important;
            }
          }
        `}
      </style>

      {/* =====================================================
          SECTION
      ====================================================== */}

      <section
        ref={sectionRef}
        className="
          section-bg
          relative
          w-full
          overflow-hidden
          py-10
          sm:py-6
          md:py-6
          lg:py-4
          xl:py-4
        "
      >
        {/* ===================================================
            BACKGROUND DECORATION
        ==================================================== */}

        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Blue glow */}

          <div
            className="
              absolute
              -left-20
              top-1/4
              h-48
              w-48
              rounded-full
              bg-blue-100/30
              blur-3xl

              sm:h-64
              sm:w-64
            "
          />

          {/* Purple glow */}

          <div
            className="
              absolute
              -right-20
              bottom-1/4
              h-48
              w-48
              rounded-full
              bg-purple-100/30
              blur-3xl

              sm:h-64
              sm:w-64
            "
          />

          {/* Center glow */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              hidden
              h-80
              w-80
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-blue-50/40
              blur-3xl

              lg:block
            "
          />
        </div>

        {/* ===================================================
            MAIN CONTAINER
        ==================================================== */}

        <div
          className="
            mx-auto
            w-full
            max-w-[90rem]
            px-4

            sm:px-6

            lg:px-8
          "
        >
          {/* =================================================
              HEADER
          ================================================== */}

          <div
            className="
              mx-auto
              mb-8
              max-w-3xl
              text-center

              sm:mb-10

              lg:mb-12
            "
          >
            {/* Badge */}

            <div
              className="
                mb-3
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-blue-100
                bg-blue-50
                px-3
                py-1

                sm:mb-4
                sm:px-4
                sm:py-1.5
              "
            >
              <Sparkles
                size={12}
                className="text-blue-600 sm:h-3.5 sm:w-3.5"
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-blue-600

                  sm:text-xs
                "
              >
                How It Works
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                text-2xl
                font-bold
                leading-tight
                text-gray-900

                sm:text-3xl

                md:text-4xl

                lg:text-5xl
              "
            >
              Your Journey to{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-blue-600
                  via-indigo-600
                  to-purple-600
                  bg-clip-text
                  text-transparent
                "
              >
                Career Success
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mx-auto
                mt-3
                max-w-2xl
                px-2
                text-sm
                leading-6
                text-gray-600

                sm:mt-4
                sm:text-base
                sm:leading-7
              "
            >
              Four simple steps to find your dream job and
              build the career you deserve.
            </p>
          </div>

          {/* =================================================
              TIMELINE
          ================================================== */}

          <div
            className="
              relative
              mx-auto
              max-w-5xl
            "
          >
            {/* Desktop timeline line */}

            <div className="timeline-line hidden lg:block" />

            {steps.map((step, index) => {
              const Icon = step.icon;

              const colors = colorMap[step.color];

              const isEven = index % 2 === 0;

              const animationClass = isEven
                ? "animate-in-left"
                : "animate-in-right";

              return (
                <div
                  key={step.id}
                  className={`
                    timeline-item
                    ${
                      isVisible
                        ? animationClass
                        : ""
                    }

                    mb-4
                    flex
                    w-full
                    flex-col
                    items-stretch
                    gap-3

                    sm:mb-5

                    lg:mb-7
                    lg:flex-row
                    lg:items-center
                    lg:gap-0

                    last:mb-0
                  `}
                  style={{
                    animationDelay: `${delays[index]}ms`,
                  }}
                >
                  {/* =================================================
                      EVEN / LEFT CARD
                  ================================================== */}

                  {isEven ? (
                    <>
                      {/* LEFT */}

                      <div
                        className="
                          flex
                          w-full
                          flex-1
                          justify-start

                          lg:justify-end
                          lg:pr-8
                        "
                      >
                        <div className="timeline-card">
                          <div className="flex items-start gap-3 sm:gap-4">
                            {/* Icon */}

                            <div
                              className={`
                                icon-wrap
                                ${colors.bg}
                                border
                                ${colors.border}
                              `}
                            >
                              <Icon
                                className={
                                  colors.text
                                }
                              />
                            </div>

                            {/* Content */}

                            <div className="min-w-0 flex-1">
                              <h3>
                                <span>
                                  {step.title}
                                </span>

                                <span className="step-badge">
                                  0{step.id}
                                </span>
                              </h3>

                              <p>
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CENTER DOT */}

                      <div
                        className="
                          hidden
                          w-8
                          shrink-0
                          justify-center
                          lg:flex
                        "
                      >
                        <div className="timeline-dot">
                          {step.id}
                        </div>
                      </div>

                      {/* RIGHT EMPTY */}

                      <div className="hidden flex-1 lg:block" />
                    </>
                  ) : (
                    <>
                      {/* LEFT EMPTY */}

                      <div className="hidden flex-1 lg:block" />

                      {/* CENTER DOT */}

                      <div
                        className="
                          hidden
                          w-8
                          shrink-0
                          justify-center
                          lg:flex
                        "
                      >
                        <div className="timeline-dot">
                          {step.id}
                        </div>
                      </div>

                      {/* RIGHT CARD */}

                      <div
                        className="
                          flex
                          w-full
                          flex-1
                          justify-start

                          lg:pl-8
                        "
                      >
                        <div className="timeline-card">
                          <div className="flex items-start gap-3 sm:gap-4">
                            {/* Icon */}

                            <div
                              className={`
                                icon-wrap
                                ${colors.bg}
                                border
                                ${colors.border}
                              `}
                            >
                              <Icon
                                className={
                                  colors.text
                                }
                              />
                            </div>

                            {/* Content */}

                            <div className="min-w-0 flex-1">
                              <h3>
                                <span>
                                  {step.title}
                                </span>

                                <span className="step-badge">
                                  0{step.id}
                                </span>
                              </h3>

                              <p>
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* =================================================
              BOTTOM STATS
          ================================================== */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-4
              gap-y-2

              sm:mt-10
              sm:gap-x-6
            "
          >
            {/* Professionals */}

            <span
              className="
                flex
                items-center
                gap-1.5
                text-[11px]
                text-gray-500

                sm:text-xs
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              10k+ professionals
            </span>

            {/* Rating */}

            <span
              className="
                flex
                items-center
                gap-1.5
                text-[11px]
                text-gray-500

                sm:text-xs
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

              4.9/5 rating
            </span>

            {/* Success */}

            <span
              className="
                flex
                items-center
                gap-1.5
                text-[11px]
                text-gray-500

                sm:text-xs
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />

              95% success
            </span>
          </div>

          {/* =================================================
              CTA
          ================================================== */}

          <div
            className="
              mt-5
              text-center

              sm:mt-6
            "
          >
            <a
              href="#"
              className="
                group
                inline-flex
                w-full
                max-w-[260px]
                items-center
                justify-center
                gap-2
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-blue-500/20
                transition-all
                duration-300
                hover:scale-[1.03]
                hover:shadow-xl
                hover:shadow-blue-500/30

                sm:w-auto
                sm:max-w-none
                sm:px-7
                sm:py-3.5
                sm:text-base
              "
            >
              <Zap
                size={16}
                className="fill-white sm:h-[18px] sm:w-[18px]"
              />

              <span>Get Started Now</span>

              <ArrowRight
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1

                  sm:h-[18px]
                  sm:w-[18px]
                "
              />
            </a>

            <p
              className="
                mt-2
                text-[10px]
                text-gray-400

                sm:text-[11px]
              "
            >
              Join 10,000+ professionals on CareerSphere
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarrierWork;