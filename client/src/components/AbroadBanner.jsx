import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Globe2,
  MapPin,
  Plane,
  Sparkles,
} from "lucide-react";

const banners = [
  {
    id: 1,
    title: "Build Your Career in America",
    description:
      "Discover exciting career opportunities, grow your skills, and take your professional journey global.",
    button: "Explore Jobs",
    icon: Globe2,
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 2,
    title: "Your Skills Can Take You Abroad",
    description:
      "Find international opportunities that match your skills, experience, and career goals.",
    button: "Find Jobs",
    icon: BriefcaseBusiness,
    location: "New York City, USA",
    image:
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 3,
    title: "Work Abroad. Grow Globally.",
    description:
      "Take the next step toward an international career and discover new possibilities around the world.",
    button: "Start Your Journey",
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
  // AUTO SLIDE
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
  // NEXT
  // =====================================================

  const nextSlide = () => {
    setActiveSlide((prev) =>
      prev === banners.length - 1 ? 0 : prev + 1
    );
  };

  // =====================================================
  // PREVIOUS
  // =====================================================

  const previousSlide = () => {
    setActiveSlide((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  // =====================================================
  // GO TO SLIDE
  // =====================================================

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const currentBanner = banners[activeSlide];
  const BannerIcon = currentBanner.icon;

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =====================================================
          SLIDES
      ===================================================== */}

      <div className="relative min-h-[560px] sm:min-h-[600px] lg:min-h-[650px]">
        {banners.map((banner, index) => {
          const Icon = banner.icon;

          return (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === activeSlide
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }`}
            >
              {/* BACKGROUND IMAGE */}

              <img
                src={banner.image}
                alt={banner.title}
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
                  index === activeSlide
                    ? "scale-105"
                    : "scale-100"
                }`}
              />

              {/* DARK OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20" />

              {/* MOBILE OVERLAY */}

              <div className="absolute inset-0 bg-slate-950/25 lg:hidden" />

              {/* CONTENT */}

              <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-4 py-4 sm:min-h-[600px] sm:px-6 lg:min-h-[650px] lg:px-8">
                <div className="w-full max-w-2xl pt-4 sm:pt-0">

                  {/* LOCATION BADGE */}

                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white backdrop-blur-md sm:mb-6 sm:px-4">
                    <MapPin
                      size={14}
                      className="text-blue-300"
                    />

                    <span>{banner.location}</span>
                  </div>

                  {/* SMALL LABEL */}

                  <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-300 sm:text-sm">
                    <Sparkles size={16} />

                    <span>Global Career Opportunity</span>
                  </div>

                  {/* HEADING */}

                  <h1 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                    {banner.title}
                  </h1>

                  {/* DESCRIPTION */}

                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
                    {banner.description}
                  </p>

                  {/* BUTTONS */}

                  <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">

                    <button
                      type="button"
                      onClick={() => navigate("/jobs")}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-900/30 transition duration-300 hover:-translate-y-1 hover:bg-blue-700 sm:px-7"
                    >
                      <Icon size={18} />

                      {banner.button}

                      <ArrowRight size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate("/about")}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition duration-300 hover:bg-white/20 sm:px-7"
                    >
                      Learn More
                    </button>

                  </div>

                  {/* FEATURES */}

                  <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 border-t border-white/15 pt-6 sm:mt-10 sm:gap-6 sm:pt-7">

                    <div>
                      <p className="text-lg font-black text-white sm:text-2xl">
                        Global
                      </p>

                      <p className="mt-1 text-[10px] text-slate-300 sm:text-xs">
                        Opportunities
                      </p>
                    </div>

                    <div className="border-l border-white/15 pl-3 sm:pl-6">
                      <p className="text-lg font-black text-white sm:text-2xl">
                        Better
                      </p>

                      <p className="mt-1 text-[10px] text-slate-300 sm:text-xs">
                        Career Growth
                      </p>
                    </div>

                    <div className="border-l border-white/15 pl-3 sm:pl-6">
                      <p className="text-lg font-black text-white sm:text-2xl">
                        New
                      </p>

                      <p className="mt-1 text-[10px] text-slate-300 sm:text-xs">
                        Possibilities
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {/* =====================================================
            DESKTOP ARROWS
        ===================================================== */}

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900 lg:flex"
        >
          <ArrowLeft size={19} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900 lg:flex"
        >
          <ArrowRight size={19} />
        </button>

        {/* =====================================================
            BOTTOM SLIDER CONTROLS
        ===================================================== */}

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-8">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* =====================================================
            SLIDE NUMBER
        ===================================================== */}

        <div className="absolute bottom-6 right-4 z-20 hidden items-center gap-2 text-xs font-semibold text-white/80 sm:flex lg:bottom-8 lg:right-8">
          <span>
            {String(activeSlide + 1).padStart(2, "0")}
          </span>

          <span className="text-white/30">/</span>

          <span>
            {String(banners.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default AbroadBanner;