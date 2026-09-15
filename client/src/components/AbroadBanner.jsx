
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Globe2,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const banners = [
  {
    id: 1,
    title: "Build Your Global Career in America",
    highlight: "with Visa & Travel Support",
    description:
      "Explore international career opportunities designed to help you start your journey with trusted companies and selected roles requiring no prior experience.",
    icon: Globe2,
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 2,
    title: "Unlock Global Career Opportunities",
    highlight: "with Visa & Travel Support",
    description:
      "Take the next step toward an international career with opportunities open to candidates with no prior experience.",
    icon: BriefcaseBusiness,
    location: "New York City, USA",
    image:
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 3,
    title: "Launch Your Global Career",
    highlight: "with Trusted Career Support",
    description:
      "Discover exciting international career opportunities and take your professional journey to the next level with selected global roles.",
    icon: Plane,
    location: "San Francisco, USA",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2000&q=85",
  },
];

const AbroadBanner = () => {
  const navigate = useNavigate();

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // =====================================================
  // AUTO SLIDER
  // =====================================================

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // =====================================================
  // SLIDER CONTROLS
  // =====================================================

  const nextSlide = () => {
    setActiveSlide((prev) =>
      prev === banners.length - 1 ? 0 : prev + 1
    );
  };

  const previousSlide = () => {
    setActiveSlide((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const currentBanner = banners[activeSlide];

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =====================================================
          HERO
      ===================================================== */}

      <div className="relative min-h-[540px] sm:min-h-[525px] lg:h-[560px] lg:min-h-0">

        {/* =====================================================
            SLIDES
        ===================================================== */}

        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide
                ? "z-10 opacity-100"
                : "z-0 opacity-0"
            }`}
          >
            {/* =================================================
                BACKGROUND IMAGE
            ================================================= */}

            <img
              src={banner.image}
              alt={banner.title}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                index === activeSlide
                  ? "scale-105"
                  : "scale-100"
              }`}
            />

            {/* =================================================
                IMAGE OVERLAY
                No blur - image remains clearly visible
            ================================================= */}

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-slate-950/10" />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-slate-950/10" />
          </div>
        ))}

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="relative z-20 mx-auto flex min-h-[540px] max-w-7xl items-center px-4 py-8 sm:min-h-[550px] sm:px-6 sm:py-10 lg:h-[560px] lg:min-h-0 lg:px-8">

          <div className="grid w-full grid-cols-1 items-center gap-7 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="max-w-3xl">

              {/* =================================================
                  TOP BADGES
              ================================================= */}

              <div className="flex w-full flex-wrap items-center gap-2">

                {/* Location */}

                <div className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-slate-950/35 px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg backdrop-blur-md sm:text-xs">
                  <MapPin
                    size={13}
                    className="shrink-0 text-blue-300"
                  />

                  <span>{currentBanner.location}</span>
                </div>

                {/* Company Sponsored */}

                <div className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-300/30 bg-emerald-400/15 px-3 py-1.5 text-[10px] font-semibold text-emerald-100 shadow-lg backdrop-blur-md sm:text-xs">
                  <Check
                    size={12}
                    className="shrink-0"
                  />

                  <span>Company Sponsored</span>
                </div>
              </div>

              {/* =================================================
                  LABEL
              ================================================= */}

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/15 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-blue-200 backdrop-blur-md sm:mt-5 sm:text-xs">
                <Sparkles
                  size={13}
                  className="shrink-0"
                />

                <span>Global Career Opportunity</span>
              </div>

              {/* =================================================
                  HEADING
              ================================================= */}

              <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.04] tracking-[-0.03em] text-white sm:mt-4 sm:text-5xl lg:text-[3.7rem]">

                {currentBanner.title}

                <span className="mt-1 block bg-gradient-to-r from-blue-200 via-cyan-100 to-white bg-clip-text text-transparent">
                  {currentBanner.highlight}
                </span>
              </h1>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p className="mt-4 max-w-2xl text-xs leading-5 text-slate-100 sm:mt-5 sm:text-sm sm:leading-6 lg:text-[15px]">
                {currentBanner.description}
              </p>

              {/* =================================================
                  CTA BUTTONS
              ================================================= */}

              <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:gap-3">

                {/* Register Free */}

                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 sm:w-auto sm:px-6 sm:text-sm"
                >
                  <Users
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  Register Free

                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                {/* Premium */}

                <button
                  type="button"
                  onClick={() => navigate("/subscription")}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/15 px-5 py-3 text-xs font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/25 sm:w-auto sm:px-6 sm:text-sm"
                >
                  <Sparkles
                    size={16}
                    className="shrink-0 text-blue-200 transition-transform duration-300 group-hover:rotate-12"
                  />

                  Explore Premium

                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>

              {/* =================================================
                  TRUST POINTS
              ================================================= */}

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[9px] text-white/90 sm:text-[11px]">

                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <Check
                    size={12}
                    className="shrink-0 text-emerald-300"
                  />

                  Free Registration
                </div>

                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <ShieldCheck
                    size={12}
                    className="shrink-0 text-blue-200"
                  />

                  Trusted Opportunities
                </div>

                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <Globe2
                    size={12}
                    className="shrink-0 text-cyan-200"
                  />

                  Global Jobs
                </div>
              </div>

              {/* =================================================
                  STATS
              ================================================= */}

              <div className="mt-4 max-w-2xl border-t border-white/20 pt-4 sm:mt-5 sm:pt-5">
  <div className="grid grid-cols-3">

    {/* Stat 1 */}
    <div className="min-w-0 pr-3 sm:pr-6">
      <p className="text-base font-black tracking-tight text-white sm:text-xl">
        12K+
      </p>

      <p className="mt-0.5 truncate text-[8px] text-white/65 sm:text-[10px]">
        Global Jobs
      </p>
    </div>

    {/* Stat 2 */}
    <div className="min-w-0 border-l border-white/20 pl-3 sm:pl-6">
      <p className="text-base font-black tracking-tight text-white sm:text-xl">
        500+
      </p>

      <p className="mt-0.5 truncate text-[8px] text-white/65 sm:text-[10px]">
        Hiring Companies
      </p>
    </div>

    {/* Stat 3 */}
    <div className="min-w-0 border-l border-white/20 pl-3 sm:pl-6">
      <p className="text-base font-black tracking-tight text-white sm:text-xl">
        50+
      </p>

      <p className="mt-0.5 truncate text-[8px] text-white/65 sm:text-[10px]">
        Countries
      </p>
    </div>

  </div>
</div>
            </div>

            {/* =================================================
                RIGHT PREMIUM CARD
            ================================================= */}

            <div className="hidden lg:block">

              <div className="relative ml-auto w-full max-w-[310px]">

                {/* Glow */}

                <div className="absolute -inset-3 rounded-[28px] bg-blue-500/15 blur-xl" />

                {/* Card */}

                <div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-slate-950/60 p-5 shadow-2xl backdrop-blur-lg">

                  {/* Top */}

                  <div className="flex items-center justify-between">

                    <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-300/20 bg-blue-400/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-blue-200">
                      <Sparkles size={11} />

                      Premium
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10">
                      <Zap
                        size={15}
                        className="text-blue-200"
                      />
                    </div>
                  </div>

                  {/* Heading */}

                  <h2 className="mt-4 text-xl font-black leading-tight text-white">
                    Unlock More
                    <span className="block text-blue-300">
                      Global Opportunities
                    </span>
                  </h2>

                  <p className="mt-2 text-[11px] leading-5 text-slate-300">
                    Access premium career features and discover more
                    international opportunities.
                  </p>

                  {/* Benefits */}

                  <div className="mt-4 space-y-2.5">

                    <div className="flex items-center gap-2.5">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10">
                        <Check
                          size={12}
                          className="text-emerald-300"
                        />
                      </div>

                      <span className="text-[10px] font-medium text-slate-200">
                        Premium job opportunities
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-400/10">
                        <Check
                          size={12}
                          className="text-blue-300"
                        />
                      </div>

                      <span className="text-[10px] font-medium text-slate-200">
                        Enhanced career visibility
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                        <Check
                          size={12}
                          className="text-cyan-300"
                        />
                      </div>

                      <span className="text-[10px] font-medium text-slate-200">
                        Faster access to opportunities
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-400/10">
                        <Check
                          size={12}
                          className="text-indigo-300"
                        />
                      </div>

                      <span className="text-[10px] font-medium text-slate-200">
                        Global career support
                      </span>
                    </div>
                  </div>

                  {/* CTA */}

                  <button
                    type="button"
                    onClick={() => navigate("/subscription")}
                    className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[10px] font-extrabold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
                  >
                    Explore Premium Plans

                    <ArrowRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>

                  {/* Note */}

                  <div className="mt-3 flex items-center justify-center gap-1.5 text-[8px] text-slate-400">
                    <ShieldCheck size={10} />

                    Secure & flexible subscription
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            DESKTOP PREVIOUS
        ===================================================== */}

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-40 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-slate-900 lg:flex"
        >
          <ArrowLeft size={17} />
        </button>

        {/* =====================================================
            DESKTOP NEXT
        ===================================================== */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-40 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-slate-900 lg:flex"
        >
          <ArrowRight size={17} />
        </button>

        {/* =====================================================
            SLIDER DOTS
        ===================================================== */}

        <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === activeSlide
                  ? "w-7 bg-white"
                  : "w-1.5 bg-white/45 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* =====================================================
            MOBILE PREMIUM BAR
        ===================================================== */}

        <div className="absolute bottom-10 left-4 right-4 z-30 lg:hidden">

          <button
            type="button"
            onClick={() => navigate("/subscription")}
            className="flex w-full items-center justify-between rounded-xl border border-white/20 bg-slate-950/65 px-3.5 py-2.5 shadow-xl backdrop-blur-md"
          >
            <div className="flex min-w-0 items-center gap-2.5">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/15">
                <Sparkles
                  size={15}
                  className="text-blue-200"
                />
              </div>

              <div className="min-w-0 text-left">
                <p className="truncate text-[10px] font-bold text-white">
                  Unlock Premium Career Access
                </p>

                <p className="mt-0.5 truncate text-[8px] text-slate-400">
                  Explore premium opportunities
                </p>
              </div>
            </div>

            <ArrowRight
              size={15}
              className="ml-2 shrink-0 text-white"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AbroadBanner;

