import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const destinations = [
  {
    id: 1,
    country: "United States",
    city: "USA",
    jobs: "1,250+",
    flag: "https://flagcdn.com/w80/us.png",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    country: "Canada",
    city: "Toronto",
    jobs: "760+",
    flag: "https://flagcdn.com/w80/ca.png",
    image:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    country: "United Kingdom",
    city: "London",
    jobs: "850+",
    flag: "https://flagcdn.com/w80/gb.png",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85",
  },
   {
    id: 4,
    country: "Australia",
    city: "Sydney",
    jobs: "640+",
    flag: "https://flagcdn.com/w80/au.png",
    image:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    country: "Germany",
    city: "Berlin",
    jobs: "520+",
    flag: "https://flagcdn.com/w80/de.png",
    image:
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=85",
  },
   {
    id: 6,
    country: "United Arab Emirates",
    city: "Dubai",
    jobs: "980+",
    flag: "https://flagcdn.com/w80/ae.png",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 7,
    country: "France",
    city: "Paris",
    jobs: "490+",
    flag: "https://flagcdn.com/w80/fr.png",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 8,
    country: "Italy",
    city: "Rome",
    jobs: "430+",
    flag: "https://flagcdn.com/w80/it.png",
    image:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 9,
    country: "Singapore",
    city: "Singapore",
    jobs: "410+",
    flag: "https://flagcdn.com/w80/sg.png",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 10,
    country: "Japan",
    city: "Tokyo",
    jobs: "390+",
    flag: "https://flagcdn.com/w80/jp.png",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 11,
    country: "Netherlands",
    city: "Amsterdam",
    jobs: "360+",
    flag: "https://flagcdn.com/w80/nl.png",
    image:
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 12,
    country: "Switzerland",
    city: "Zurich",
    jobs: "340+",
    flag: "https://flagcdn.com/w80/ch.png",
    image:
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 13,
    country: "New Zealand",
    city: "Auckland",
    jobs: "310+",
    flag: "https://flagcdn.com/w80/nz.png",
    image:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 14,
    country: "Ireland",
    city: "Dublin",
    jobs: "290+",
    flag: "https://flagcdn.com/w80/ie.png",
    image:
      "https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 15,
    country: "Spain",
    city: "Barcelona",
    jobs: "270+",
    flag: "https://flagcdn.com/w80/es.png",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 16,
    country: "Portugal",
    city: "Lisbon",
    jobs: "250+",
    flag: "https://flagcdn.com/w80/pt.png",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=85",
  },
];

const PopularDestinations = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const handleDestinationClick = (destination) => {
    const location = destination?.city || destination?.country;

    if (!location) return;

    navigate(`/jobs?location=${encodeURIComponent(location)}`);
  };

  const visibleDestinations = showAll
    ? destinations
    : destinations.slice(0, 8);

  return (
    <section className="w-full bg-white py-4 sm:py-4 lg:py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-2 pt-8 flex items-center justify-between gap-2 sm:mb-4 sm:flex-row sm:items-end">
          <div className="min-w-0 max-w-2xl">
            {/* Heading */}
            <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Popular{" "}
              <span className="text-blue-600">
                Destinations
              </span>
            </h2>
          </div>

          {/* View All Button */}
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[10px] font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <span className="whitespace-nowrap">
              {showAll ? "Show Less" : "View All Destinations"}
            </span>

            <ArrowRight
              size={14}
              className={`shrink-0 transition-transform duration-300 sm:h-[15px] sm:w-[15px] ${
                showAll
                  ? "rotate-180"
                  : "group-hover:translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-4 gap-3 sm:gap-5 lg:grid-cols-8 lg:gap-6">
          {visibleDestinations.map((destination) => (
            <button
              key={destination.id}
              type="button"
              onClick={() => handleDestinationClick(destination)}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-200/70"
            >
              <div className="relative h-[120px] overflow-hidden sm:h-[140px] lg:h-[160px]">

                {/* Destination Image */}
                <img
                  src={destination.image}
                  alt={`${destination.city}, ${destination.country}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85";
                  }}
                />

                {/* Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />

                {/* Country Flag */}
                <div className="absolute left-2.5 top-2.5 sm:left-4 sm:top-4">
                  <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white shadow-lg sm:h-9 sm:w-9">
                    <img
                      src={destination.flag}
                      alt={`${destination.country} flag`}
                      className="h-full w-full object-cover"
                    />
                  </span>
                </div>

                {/* Destination Details */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <p className="text-[8px] font-semibold uppercase tracking-wider text-blue-200 sm:text-[10px]">
                    {destination.country}
                  </p>

                  <h3 className="mt-0.5 text-lg font-black text-white sm:text-2xl">
                    {destination.city}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularDestinations;