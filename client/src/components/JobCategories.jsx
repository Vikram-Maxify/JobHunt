
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight, Sparkles, Clock } from "lucide-react";

import { getCategories } from "../redux/slicer/categorySlice";

const JobCategories = () => {
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(getCategories());

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const gradientColors = [
    "from-blue-500 via-blue-400 to-blue-600",
    "from-purple-500 via-purple-400 to-purple-600",
    "from-emerald-500 via-emerald-400 to-emerald-600",
    "from-amber-500 via-amber-400 to-amber-600",
    "from-rose-500 via-rose-400 to-rose-600",
    "from-indigo-500 via-indigo-400 to-indigo-600",
    "from-orange-500 via-orange-400 to-orange-600",
    "from-teal-500 via-teal-400 to-teal-600",
  ];

  const delays = [
    100,
    150,
    200,
    250,
    300,
    350,
    400,
    450,
  ];

  return (
    <>
      <style>
        {`
          @keyframes floatImage {
            0%, 100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-6px);
            }
          }

          @keyframes fadeUp {
            0% {
              opacity: 0;
              transform: translateY(40px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .category-card {
            opacity: 0;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            box-shadow: 0 4px 16px -8px rgba(0, 0, 0, 0.08);
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .category-card.animate-in {
            animation: fadeUp 0.8s ease forwards;
          }

          {/* .category-image {
            animation: floatImage 3s ease-in-out infinite;
          } */}

          .category-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
            border-color: #93c5fd;
          }

          .section-bg {
            background: linear-gradient(
              180deg,
              #f8fafc 0%,
              #ffffff 100%
            );
          }
        `}
      </style>

      <section className="section-bg relative py-6 sm:py-8 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />

          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
              <Sparkles
                size={14}
                className="text-blue-600"
              />

              <span className="text-xs font-medium text-blue-600 tracking-wider uppercase">
                Explore Categories
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Find Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Perfect Match
              </span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover opportunities across different industries.
              Your next career move starts here.
            </p>
          </div>

          {/* =========================
              LOADING
          ========================== */}
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
          )}

          {/* =========================
              ERROR
          ========================== */}
          {!loading && error && (
            <div className="flex justify-center py-12">
              <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl text-sm font-medium">
                {error}
              </div>
            </div>
          )}

          {/* =========================
              NO CATEGORIES
          ========================== */}
          {!loading &&
            !error &&
            categories?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No categories available.
                </p>
              </div>
            )}

          {/* =========================
              CATEGORIES
          ========================== */}
          {!loading &&
            !error &&
            categories?.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">

                {categories.map((category, index) => {
                  const gradient =
                    gradientColors[index % gradientColors.length];

                  return (
                    <div
                      key={category._id || category.id}
                      className={`category-card ${
                        isVisible ? "animate-in" : ""
                      } relative group rounded-2xl p-4 sm:p-6 lg:p-8 cursor-pointer`}
                      style={{
                        animationDelay: `${delays[index] || 100}ms`,
                      }}
                    >
                      {/* Active Badge */}
                      {category.isActive !== false && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-1 rounded-full shadow-lg z-20">
                          Active
                        </div>
                      )}

                      <div className="flex flex-col items-center text-center">

                        {/* =====================
                            CATEGORY IMAGE
                        ====================== */}
                       <div className="relative">
  <div
    className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br ${gradient} p-[3px] shadow-md group-hover:shadow-xl transition-all duration-300`}
  >
    <div className="w-full h-full rounded-2xl bg-white overflow-hidden">
      {category.image ? (
        <img
          src={category.image}
          alt={category.name || "Category"}
          className="block w-full h-full object-cover rounded-2xl"
          loading="lazy"
          onLoad={() => {
            // console.log("IMAGE LOADED:", category.image);
          }}
          onError={(e) => {
            // console.log("IMAGE FAILED:", category.image);
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
          No Image
        </div>
      )}
    </div>
  </div>
</div>

                        {/* =====================
                            CATEGORY NAME
                        ====================== */}
                        <h3 className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {category.name}
                        </h3>

                        {/* =====================
                            DESCRIPTION
                        ====================== */}
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2 min-h-[32px] sm:min-h-[40px]">
                          {category.shortDescription ||
                            "Explore job opportunities in this category."}
                        </p>

                        {/* =====================
                            JOB COUNT
                        ====================== */}
                        <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2">
                          <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900">
                            {Number(
                              category.jobCount || 0
                            ).toLocaleString()}

                            <span className="text-xs sm:text-sm font-medium text-gray-400 ml-1">
                              +
                            </span>
                          </p>
                        </div>

                        <p className="text-[10px] sm:text-xs text-gray-500">
                          open positions
                        </p>

                        {/* =====================
                            EXPLORE
                        ====================== */}
                        <div className="mt-3 sm:mt-4 flex items-center gap-1 text-[10px] sm:text-xs text-gray-400 group-hover:text-blue-600 transition-colors">
                          <Clock size={11} />

                          <span>
                            Explore opportunities
                          </span>
                        </div>
                      </div>

                      {/* =====================
                          HOVER ARROW
                      ====================== */}
                      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <ArrowRight
                          size={18}
                          className="text-blue-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          {/* =========================
              BROWSE ALL
          ========================== */}
          {/* {!loading &&
            !error &&
            categories?.length > 0 && (
              <div className="text-center mt-8 sm:mt-10">
                <button
                  type="button"
                  className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
                >
                  <span>
                    Browse All Categories
                  </span>

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1.5 transition-transform"
                  />
                </button>

                <p className="text-xs text-gray-400 mt-3">
                  Explore all available job categories
                </p>
              </div>
            )} */}

        </div>
      </section>
    </>
  );
};

export default JobCategories;

