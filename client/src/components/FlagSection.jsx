
import React from "react";
import { Globe2 } from "lucide-react";

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
    <section className="overflow-hidden bg-white py-4 sm:py-4 lg:py-4">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600 sm:text-sm">
            <Globe2 size={15} />
            Global Opportunities
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Find Jobs Across
            <span className="text-blue-600"> The World</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
            Explore career opportunities in leading countries and
            discover your next opportunity around the world.
          </p>
        </div>

        {/* COUNTRIES */}
        <div
          className="
            mt-4
            grid
            grid-cols-3
            gap-x-4
            gap-y-8

            sm:grid-cols-4
            sm:gap-x-6
            sm:gap-y-6

            md:grid-cols-6
            md:gap-x-6

            lg:grid-cols-8
            lg:gap-x-6
            lg:gap-y-6
          "
        >
          {countries.map((country) => (
            <div
              key={country.name}
              className="
                group
                flex
                cursor-pointer
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              {/* FLAG IMAGE */}
              <div
                className="
                  flex
                  h-12
                  w-[72px]
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-md
                  bg-slate-100
                  shadow-sm
                  transition-all
                  duration-300
                  group-hover:scale-110
                  group-hover:shadow-md

                  sm:h-14
                  sm:w-[84px]

                  md:h-14
                  md:w-[88px]

                  lg:h-16
                  lg:w-[96px]
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
                    duration-300
                    group-hover:scale-105
                  "
                />
              </div>

              {/* COUNTRY NAME */}
              <p
                className="
                  mt-3
                  max-w-[100px]
                  text-[11px]
                  font-semibold
                  leading-4
                  text-slate-600
                  transition-colors
                  duration-300
                  group-hover:text-blue-600

                  sm:text-xs
                  md:text-sm
                "
              >
                {country.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FlagSection;

