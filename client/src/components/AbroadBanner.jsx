import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Globe2,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

const AbroadBanner = () => {
  const navigate = useNavigate();

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const banners = [
    {
      title: "Build Your Global Career in America",
      highlight: "with Visa & Travel Support",
      description:
        "Discover international career opportunities with trusted companies offering visa and travel support. No prior international experience required.",
      location: "New York, USA",
      image:
        "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1800&q=85",
    },
    {
      title: "Unlock Global Career Opportunities",
      highlight: "with Visa & Travel Support",
      description:
        "Find verified international jobs and take your career beyond borders with trusted employers and complete career support.",
      location: "New York City, USA",
      image:
        "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1800&q=85",
    },
    {
      title: "Launch Your Global Career",
      highlight: "with Trusted Career Support",
      description:
        "Explore global opportunities, connect with international employers, and get the support you need to start your career abroad.",
      location: "San Francisco, USA",
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1800&q=85",
    },
  ];

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, banners.length]);

  const goToPrevious = () => {
    setActiveSlide(
      (prev) => (prev - 1 + banners.length) % banners.length
    );
  };

  const goToNext = () => {
    setActiveSlide((prev) => (prev + 1) % banners.length);
  };

  return (
    <section
      className="relative w-full overflow-visible bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* HERO WRAPPER */}
      <div className="relative min-h-[370px] sm:min-h-[550px] lg:h-[560px] lg:min-h-0">
        {/* BACKGROUND SLIDES */}
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${activeSlide === index
              ? "z-10 opacity-100"
              : "z-0 opacity-0"
              }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-slate-950/30" />

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 via-slate-950/65 to-slate-950/25" />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
          </div>
        ))}

        {/* HERO CONTENT */}
        <div
          className="
            relative z-20 mx-auto flex
            min-h-[310px]
            max-w-7xl
            items-start
            px-4
            pb-6
            pt-5
            sm:min-h-[550px]
            sm:items-center
            sm:px-6
            sm:py-10
            sm:pb-24
            lg:h-[560px]
            lg:min-h-0
            lg:px-8
          "
        >
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            {/* LEFT CONTENT */}
            <div className="max-w-3xl">
              {/* LOCATION + SPONSORED */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                  <MapPin size={13} />
                  {bannerSafe(banners[activeSlide]?.location)}
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-100 backdrop-blur-md">
                  <Plane size={13} />
                  Visa Sponsored
                </div>
              </div>

              {/* SMALL LABEL */}
              <div className="mb-1 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-900/30">
                  <Globe2 size={15} />
                </span>

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
                  Global Career Opportunities
                </span>
              </div>

              {/* HEADING */}
              <h1 className="max-w-3xl text-2xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-3xl lg:text-5xl xl:text-6xl">
                {banners[activeSlide].title}
                <span className="mt-1 block text-blue-400">
                  {banners[activeSlide].highlight}
                </span>
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base sm:leading-7">
                {banners[activeSlide].description}
              </p>

              {/* BUTTONS */}
              <div className="mt-2 flex flex-nowrap gap-2 sm:flex-wrap sm:gap-3">
                {/* REGISTER FREE */}
                <button
                  onClick={() => navigate("/register")}
                  className="
      inline-flex min-w-0 flex-1
      items-center justify-center gap-1.5
      rounded-xl
      bg-blue-600
      px-2.5 py-2.5
      text-white
      shadow-lg shadow-blue-950/30
      transition
      hover:bg-blue-500
      sm:flex-none sm:gap-2 sm:px-5
    "
                >
                  <Users
                    size={17}
                    strokeWidth={2.2}
                    className="shrink-0"
                  />

                  <span className="flex min-w-0 flex-col items-start justify-center leading-tight">
                    <span className="whitespace-nowrap text-[11px] font-bold sm:text-sm">
                      Register Free
                    </span>

                    <span className="whitespace-nowrap text-[8px] font-medium text-blue-100 sm:text-[11px]">
                      Start Your Global Journey Today
                    </span>
                  </span>

                  <ArrowRight
                    size={15}
                    className="shrink-0"
                  />
                </button>

                {/* EXPLORE PREMIUM */}
                <button
                  onClick={() => navigate("/subscription")}
                  className="
      inline-flex min-w-0 flex-1
      items-center justify-center gap-1.5
      rounded-xl
      border border-white/20
      bg-white/10
      px-2.5 py-2.5
      text-white
      backdrop-blur-md
      transition
      hover:bg-white/15
      sm:flex-none sm:gap-2 sm:px-5
    "
                >
                  <Sparkles
                    size={17}
                    className="shrink-0"
                  />

                  <span className="flex min-w-0 flex-col items-start justify-center leading-tight">
                    <span className="whitespace-nowrap text-[11px] font-bold sm:text-sm">
                      Explore Premium
                    </span>

                    <span className="whitespace-nowrap text-[8px] font-medium text-slate-200 sm:text-[11px]">
                      Unlock More Opportunities
                    </span>
                  </span>
                </button>
              </div>

              {/* TRUST POINTS */}
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-200">
                  <Check size={14} className="text-emerald-400" />
                  Visa Guidance
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-200">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  Trusted Companies
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-200">
                  <Zap size={14} className="text-amber-400" />
                  No Prior Experience
                </div>
              </div>
            </div>

            {/* RIGHT PREMIUM CARD */}
            <div className="hidden lg:flex lg:justify-end">
              <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                      CareerSphere Premium
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-white">
                      Go Global Faster
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/80 text-white">
                    <BriefcaseBusiness size={21} />
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "Visa sponsored opportunities",
                    "International employers",
                    "Premium career support",
                    "Global job alerts",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-slate-100"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15">
                        <Check
                          size={12}
                          className="text-emerald-400"
                        />
                      </span>

                      {item}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate("/subscription")}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                >
                  View Premium Plans
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            STATS CARD
            HALF INSIDE HERO + HALF OUTSIDE
        ========================================== */}
        <div
          className="
            absolute
            bottom-0
            left-3
            right-3
            z-[20]
            translate-y-1/2
            sm:left-6
            sm:right-6
            lg:left-8
            lg:right-8
          "
        >
          <div
            className="
              mx-auto
              max-w-7xl
              rounded-xl
              border border-slate-200
              bg-white
              px-2
              py-2
              shadow-[0_10px_40px_rgba(15,23,42,0.10)]
              sm:rounded-2xl
              sm:px-4
              sm:py-3
              lg:px-6
              lg:py-4
            "
          >
            <div className="grid grid-cols-4 divide-x divide-slate-200">
              {/* STAT 1 */}
              <div className="flex flex-col items-center justify-center gap-1 px-1 text-center sm:flex-row sm:gap-2 sm:px-3 sm:text-left">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:h-9 sm:w-9">
                  <Plane size={14} className="sm:h-[17px] sm:w-[17px]" />
                </div>

                <div className="min-w-0">
                  <p className="text-[12px] font-extrabold leading-none text-slate-900 sm:text-lg lg:text-xl">
                    50K+
                  </p>

                  <p className="mt-1 truncate text-[6px] font-medium leading-none text-slate-500 sm:text-[10px] lg:text-xs">
                    Global Jobs
                  </p>
                </div>
              </div>

              {/* STAT 2 */}
              <div className="flex flex-col items-center justify-center gap-1 px-1 text-center sm:flex-row sm:gap-2 sm:px-3 sm:text-left">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 sm:h-9 sm:w-9">
                  <Building2
                    size={14}
                    className="sm:h-[17px] sm:w-[17px]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[12px] font-extrabold leading-none text-slate-900 sm:text-lg lg:text-xl">
                    500+
                  </p>

                  <p className="mt-1 truncate text-[6px] font-medium leading-none text-slate-500 sm:text-[10px] lg:text-xs">
                    Trusted Companies
                  </p>
                </div>
              </div>

              {/* STAT 3 */}
              <div className="flex flex-col items-center justify-center gap-1 px-1 text-center sm:flex-row sm:gap-2 sm:px-3 sm:text-left">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 sm:h-9 sm:w-9">
                  <Users size={14} className="sm:h-[17px] sm:w-[17px]" />
                </div>

                <div className="min-w-0">
                  <p className="text-[12px] font-extrabold leading-none text-slate-900 sm:text-lg lg:text-xl">
                    100+
                  </p>

                  <p className="mt-1 truncate text-[6px] font-medium leading-none text-slate-500 sm:text-[10px] lg:text-xs">
                    Countries
                  </p>
                </div>
              </div>

              {/* STAT 4 */}
              <div className="flex flex-col items-center justify-center gap-1 px-1 text-center sm:flex-row sm:gap-2 sm:px-3 sm:text-left">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 sm:h-9 sm:w-9">
                  <Trophy
                    size={14}
                    className="sm:h-[17px] sm:w-[17px]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[12px] font-extrabold leading-none text-slate-900 sm:text-lg lg:text-xl">
                    95%
                  </p>

                  <p className="mt-1 truncate text-[6px] font-medium leading-none text-slate-500 sm:text-[10px] lg:text-xs">
                    Success Stories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP PREVIOUS BUTTON */}
        <button
          onClick={goToPrevious}
          className="
            absolute left-4 top-1/2 z-[110]
            hidden -translate-y-1/2
            items-center justify-center
            rounded-full border border-white/20
            bg-black/20 p-2.5
            text-white backdrop-blur-md
            transition hover:bg-black/40
            lg:flex
          "
          aria-label="Previous slide"
        >
          <ArrowLeft size={19} />
        </button>

        {/* DESKTOP NEXT BUTTON */}
        <button
          onClick={goToNext}
          className="
            absolute right-4 top-1/2 z-[110]
            hidden -translate-y-1/2
            items-center justify-center
            rounded-full border border-white/20
            bg-black/20 p-2.5
            text-white backdrop-blur-md
            transition hover:bg-black/40
            lg:flex
          "
          aria-label="Next slide"
        >
          <ArrowRight size={19} />
        </button>

        {/* SLIDER DOTS */}
        <div
          className="
            absolute
            bottom-2
            left-1/2
            z-[120]
            flex
            -translate-x-1/2
            items-center
            gap-1.5
          "
        >
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-1.5 rounded-full transition-all ${activeSlide === index
                ? "w-6 bg-white"
                : "w-1.5 bg-white/50"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const bannerSafe = (location) => location || "Global Opportunities";

export default AbroadBanner;