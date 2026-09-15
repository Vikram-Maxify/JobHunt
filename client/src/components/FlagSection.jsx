
import React from "react";
import { ArrowUpRight, Globe2 } from "lucide-react";

const FlagSection = () => {
  const countries = [
    {
      name: "United States",
      flag: "https://flagcdn.com/w320/us.png",
    },
    {
      name: "United Kingdom",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    {
      name: "Canada",
      flag: "https://flagcdn.com/w320/ca.png",
    },
    {
      name: "Australia",
      flag: "https://flagcdn.com/w320/au.png",
    },
    {
      name: "Germany",
      flag: "https://flagcdn.com/w320/de.png",
    },
    {
      name: "France",
      flag: "https://flagcdn.com/w320/fr.png",
    },
    {
      name: "Japan",
      flag: "https://flagcdn.com/w320/jp.png",
    },
    {
      name: "India",
      flag: "https://flagcdn.com/w320/in.png",
    },
    {
      name: "Netherlands",
      flag: "https://flagcdn.com/w320/nl.png",
    },
    {
      name: "Switzerland",
      flag: "https://flagcdn.com/w320/ch.png",
    },
    {
      name: "New Zealand",
      flag: "https://flagcdn.com/w320/nz.png",
    },
    {
      name: "Singapore",
      flag: "https://flagcdn.com/w320/sg.png",
    },
    {
      name: "Ireland",
      flag: "https://flagcdn.com/w320/ie.png",
    },
    {
      name: "Sweden",
      flag: "https://flagcdn.com/w320/se.png",
    },
    {
      name: "Norway",
      flag: "https://flagcdn.com/w320/no.png",
    },
    {
      name: "Denmark",
      flag: "https://flagcdn.com/w320/dk.png",
    },
    {
      name: "Finland",
      flag: "https://flagcdn.com/w320/fi.png",
    },
    {
      name: "Italy",
      flag: "https://flagcdn.com/w320/it.png",
    },
    {
      name: "Spain",
      flag: "https://flagcdn.com/w320/es.png",
    },
    {
      name: "United Arab Emirates",
      flag: "https://flagcdn.com/w320/ae.png",
    },
    {
      name: "South Korea",
      flag: "https://flagcdn.com/w320/kr.png",
    },
    {
      name: "Belgium",
      flag: "https://flagcdn.com/w320/be.png",
    },
    {
      name: "Austria",
      flag: "https://flagcdn.com/w320/at.png",
    },
    {
      name: "Portugal",
      flag: "https://flagcdn.com/w320/pt.png",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-4 sm:py-4 lg:py-4">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute left-0 top-20 h-56 w-56 rounded-full bg-blue-50/70 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-indigo-50/60 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600 sm:text-sm">
            <Globe2 size={15} />
            Global Opportunities
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Find Jobs Across
            <span className="text-blue-600"> The World</span>
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
            Explore career opportunities in leading countries and discover
            your next opportunity around the world.
          </p>
        </div>

        {/* ================= COUNTRIES ================= */}
        <div
          className="
            mt-4
            grid
            grid-cols-2
            gap-3

            sm:mt-4
            sm:grid-cols-3
            sm:gap-4

            md:grid-cols-4

            lg:grid-cols-6
            lg:gap-5

            xl:grid-cols-8
          "
        >
          {countries.map((country) => (
            <div
              key={country.name}
              className="
                group
                relative
                cursor-pointer
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-3
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg
                sm:p-4
              "
            >
              {/* Hover Background */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-blue-50/0
                  via-white
                  to-blue-50/70
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />

              <div className="relative">
                {/* Flag */}
                <div
                  className="
                    relative
                    mx-auto
                    flex
                    aspect-[1.5/1]
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    bg-slate-100
                    ring-1
                    ring-slate-100
                    transition-all
                    duration-300
                    group-hover:ring-blue-100
                  "
                >
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  {/* Hover Icon */}
                  <div
                    className="
                      absolute
                      right-2
                      top-2
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      bg-white/95
                      text-blue-600
                      opacity-0
                      shadow-sm
                      transition-all
                      duration-300
                      group-hover:opacity-100
                    "
                  >
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                {/* Country Info */}
                <div className="mt-3 flex items-center justify-between gap-2">
                  <p
                    className="
                      min-w-0
                      truncate
                      text-[11px]
                      font-bold
                      text-slate-700
                      transition-colors
                      duration-300
                      group-hover:text-blue-600
                      sm:text-xs
                    "
                    title={country.name}
                  >
                    {country.name}
                  </p>

                  <span
                    className="
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full
                      bg-slate-200
                      transition-colors
                      duration-300
                      group-hover:bg-blue-500
                    "
                  />
                </div>

                <p className="mt-1 text-[10px] font-medium text-slate-400 sm:text-[11px]">
                  Explore opportunities
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= BOTTOM INFO ================= */}
        <div className="mt-4 flex flex-col items-center justify-center gap-2 text-center sm:mt-4 sm:flex-row">
          <div className="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500">
            <Globe2 size={14} className="text-blue-600" />
            <span>
              Opportunities across {countries.length}+ countries
            </span>
          </div>

          <span className="hidden text-slate-300 sm:block">•</span>

          <p className="text-xs text-slate-400">
            Your next career opportunity could be anywhere.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FlagSection;



