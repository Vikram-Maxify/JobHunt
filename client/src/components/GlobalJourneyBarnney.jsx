import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Globe2,
  MapPin,
  Plane,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const GlobalJourneyBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6">
      <div className="mx-auto w-full max-w-7xl">
        {/* =================================================
            MAIN BANNER
        ================================================= */}
        <div className="relative overflow-hidden rounded-2xl bg-blue-700 shadow-xl sm:rounded-3xl">
          {/* Decorative Background */}
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl sm:h-64 sm:w-64" />

          <div className="absolute -bottom-20 left-1/3 h-60 w-60 rounded-full bg-cyan-400/20 blur-3xl sm:h-72 sm:w-72" />

          <div className="absolute -right-20 -top-16 h-60 w-60 rounded-full bg-indigo-900/30 blur-3xl sm:h-72 sm:w-72" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            {/* =================================================
                LEFT CONTENT
            ================================================= */}
            <div className="flex flex-col justify-center p-5 sm:p-7 md:p-8 lg:p-9 xl:p-11">
              {/* Badge */}
              <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-sm sm:mb-4 sm:px-3.5 sm:py-2 sm:text-xs">
                <Sparkles
                  size={12}
                  className="shrink-0 text-yellow-300 sm:h-[14px] sm:w-[14px]"
                />

                Start Your International Journey
              </div>

              {/* Heading */}
              <h2 className="max-w-xl text-2xl font-black leading-[1.12] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px]">
                Your Dream Job
                <span className="block text-cyan-300">
                  Could Be Abroad
                </span>
              </h2>

              {/* Description */}
              <p className="mt-3 max-w-xl text-xs leading-6 text-blue-100 sm:mt-4 sm:text-sm sm:leading-6 md:text-base">
                Take the next step in your career with opportunities from
                leading companies across Australia, USA, Japan, Europe and
                other global destinations.
              </p>

              {/* Destination Pills */}
              <div className="mt-4 flex min-w-0 flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
                <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm sm:px-3 sm:py-2 sm:text-xs">
                  <MapPin size={12} />
                  Australia
                </div>

                <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm sm:px-3 sm:py-2 sm:text-xs">
                  <MapPin size={12} />
                  USA
                </div>

                <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm sm:px-3 sm:py-2 sm:text-xs">
                  <MapPin size={12} />
                  Japan
                </div>

                <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm sm:px-3 sm:py-2 sm:text-xs">
                  <Globe2 size={12} />
                  Europe
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 sm:mt-5 sm:gap-3">
                <div className="flex min-w-0 items-center gap-1.5 text-[10px] font-medium text-white sm:text-xs md:text-sm">
                  <CheckCircle2
                    size={14}
                    className="shrink-0 text-cyan-300 sm:h-[17px] sm:w-[17px]"
                  />

                  <span className="truncate">
                    Verified Opportunities
                  </span>
                </div>

                <div className="flex min-w-0 items-center gap-1.5 text-[10px] font-medium text-white sm:text-xs md:text-sm">
                  <CheckCircle2
                    size={14}
                    className="shrink-0 text-cyan-300 sm:h-[17px] sm:w-[17px]"
                  />

                  <span className="truncate">
                    Global Employers
                  </span>
                </div>

                <div className="flex min-w-0 items-center gap-1.5 text-[10px] font-medium text-white sm:text-xs md:text-sm">
                  <CheckCircle2
                    size={14}
                    className="shrink-0 text-cyan-300 sm:h-[17px] sm:w-[17px]"
                  />

                  <span className="truncate">
                    Career Assistance
                  </span>
                </div>

                <div className="flex min-w-0 items-center gap-1.5 text-[10px] font-medium text-white sm:text-xs md:text-sm">
                  <CheckCircle2
                    size={14}
                    className="shrink-0 text-cyan-300 sm:h-[17px] sm:w-[17px]"
                  />

                  <span className="truncate">
                    Easy Job Search
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/jobs")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-extrabold text-blue-700 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50 sm:w-auto sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm"
                >
                  Find Jobs Abroad

                  <ArrowRight
                    size={15}
                    className="sm:h-[17px] sm:w-[17px]"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/about")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-sm transition duration-300 hover:bg-white/15 sm:w-auto sm:rounded-xl sm:px-5 sm:py-3 sm:text-sm"
                >
                  Explore More
                </button>
              </div>
            </div>

            {/* =================================================
                RIGHT IMAGE
            ================================================= */}
            <div className="relative min-h-[220px] overflow-hidden sm:min-h-[300px] md:min-h-[350px] lg:min-h-[430px]">
              <img
                src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1400&q=85"
                alt="Sydney Australia international career destination"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-700/70 via-blue-700/10 to-transparent lg:bg-gradient-to-r lg:from-blue-700/80 lg:via-blue-700/20 lg:to-transparent" />

              {/* =================================================
                  FLOATING CARD
                  HIDDEN ON MOBILE
              ================================================= */}
              <div className="absolute bottom-5 left-5 right-5 hidden sm:block sm:bottom-6 sm:left-6 sm:right-auto">
                <div className="w-full rounded-2xl border border-white/20 bg-white/95 p-3.5 shadow-2xl backdrop-blur-md sm:w-[250px] sm:p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:h-11 sm:w-11">
                      <Plane size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Popular Destination
                      </p>

                      <h3 className="mt-0.5 text-xs font-black text-slate-900 sm:text-sm">
                        Sydney, Australia
                      </h3>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center gap-2 border-t border-slate-100 pt-2.5 sm:mt-3 sm:pt-3">
                    <BriefcaseBusiness
                      size={13}
                      className="shrink-0 text-blue-600"
                    />

                    <span className="text-[10px] font-semibold text-slate-600 sm:text-xs">
                      Growing career opportunities
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            STATS
        ================================================= */}
        <div className="relative z-10 mx-auto -mt-4 grid max-w-5xl grid-cols-2 gap-1.5 px-2 sm:-mt-6 sm:grid-cols-4 sm:gap-3 sm:px-3">
          <div className="rounded-xl border border-slate-200 bg-white p-2.5 text-center shadow-md sm:rounded-2xl sm:p-4">
            <p className="text-base font-black text-blue-600 sm:text-2xl">
              50+
            </p>

            <p className="mt-0.5 text-[9px] font-semibold text-slate-500 sm:text-xs">
              Countries
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-2.5 text-center shadow-md sm:rounded-2xl sm:p-4">
            <p className="text-base font-black text-blue-600 sm:text-2xl">
              10K+
            </p>

            <p className="mt-0.5 text-[9px] font-semibold text-slate-500 sm:text-xs">
              Opportunities
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-2.5 text-center shadow-md sm:rounded-2xl sm:p-4">
            <p className="text-base font-black text-blue-600 sm:text-2xl">
              500+
            </p>

            <p className="mt-0.5 text-[9px] font-semibold text-slate-500 sm:text-xs">
              Companies
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-2.5 text-center shadow-md sm:rounded-2xl sm:p-4">
            <p className="text-base font-black text-blue-600 sm:text-2xl">
              24/7
            </p>

            <p className="mt-0.5 text-[9px] font-semibold text-slate-500 sm:text-xs">
              Career Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalJourneyBanner;