import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Globe2,
  MapPin,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const AbroadCareerBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white px-4 py-6 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto max-w-7xl">

        {/* MAIN BANNER */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 shadow-2xl">

          {/* Background Effects */}
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2">

            {/* =================================================
                LEFT CONTENT
            ================================================= */}
            <div className="flex flex-col justify-center p-6 sm:p-4 lg:p-6 xl:p-6">

              {/* Badge */}
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300">
                <Globe2 size={14} />
                Your Next Career Destination
              </div>

              {/* Heading */}
              <h2 className="max-w-xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Take Your Skills
                <span className="block text-blue-400">
                  To The World
                </span>
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Turn your skills into international opportunities. Find
                exciting roles with global employers and take the next step
                toward an international career.
              </p>

              {/* Benefits */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-blue-400"
                  />
                  International Exposure
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-blue-400"
                  />
                  Career Advancement
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-blue-400"
                  />
                  Work With Global Teams
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-blue-400"
                  />
                  New Life Experiences
                </div>

              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={() => navigate("/jobs")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Find Your Opportunity
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/about")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Discover More
                </button>

              </div>

            </div>

            {/* =================================================
                RIGHT IMAGE AREA
            ================================================= */}
            <div className="relative min-h-[360px] overflow-hidden sm:min-h-[430px] lg:min-h-[500px]">

              {/* Tokyo Japan Image */}
              <img
                src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=85"
                alt="Tokyo Japan international career destination"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/30 to-transparent lg:from-slate-950/80 lg:via-slate-950/10 lg:to-transparent" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

/* =============================================================
   DESTINATION CARD
============================================================= */

const DestinationCard = ({
  image,
  country,
  city,
  description,
  onClick,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}
      <div className="relative h-48 overflow-hidden">

        <img
          src={image}
          alt={`${city}, ${country}`}
          className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Country */}
        <div className="absolute left-4 top-4">

          <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-slate-700 shadow-sm">
            {country}
          </span>

        </div>

        {/* City */}
        <div className="absolute bottom-4 left-4">

          <div className="flex items-center gap-1.5 text-white">

            <MapPin size={15} />

            <h3 className="text-xl font-black">
              {city}
            </h3>

          </div>

        </div>

      </div>

      {/* Content */}
      <div className="p-4">

        <p className="line-clamp-2 text-xs leading-5 text-slate-500">
          {description}
        </p>

        <button
          type="button"
          onClick={onClick}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 transition hover:text-blue-700"
        >
          Explore Opportunities
          <ArrowRight size={14} />
        </button>

      </div>

    </div>
  );
};

export default AbroadCareerBanner;