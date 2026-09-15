import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategories } from "../redux/slicer/categorySlice";

const JobCategories = () => {
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector(
    (state) => state.categories,
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

  const delays = [100, 150, 200, 250, 300, 350, 400, 450];

  return (
    <>
      <style>
        {`
          @keyframes fadeUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
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
            box-shadow: 0 4px 16px -8px rgba(15, 23, 42, 0.10);
            transition:
              transform 0.3s ease,
              box-shadow 0.3s ease,
              border-color 0.3s ease;
          }

          .category-card.animate-in {
            animation: fadeUp 0.65s ease forwards;
          }

          .category-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 18px 35px -14px rgba(15, 23, 42, 0.20);
            border-color: #bfdbfe;
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

      <section className="section-bg relative overflow-hidden py-4 sm:py-4 lg:py-4">
        {/* ================= BACKGROUND ================= */}

        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />

          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-purple-100/40 blur-3xl" />
        </div>

        <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
          {/* ================= HEADER ================= */}

          <div className="mb-4 text-center sm:mb-4">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5">
              <Sparkles size={14} className="text-blue-600" />

              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Explore Categories
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Find Your{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Perfect Match
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base lg:text-lg">
              Discover opportunities across different industries. Your next
              career move starts here.
            </p>
          </div>

          {/* ================= LOADING ================= */}

          {loading && (
            <div className="flex items-center justify-center py-14">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
            </div>
          )}

          {/* ================= ERROR ================= */}

          {!loading && error && (
            <div className="flex justify-center py-10">
              <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-600 shadow-sm">
                {error}
              </div>
            </div>
          )}

          {/* ================= NO CATEGORIES ================= */}

          {!loading && !error && categories?.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-sm text-gray-500">No categories available.</p>
            </div>
          )}

          {/* ================= CATEGORIES ================= */}

          {!loading && !error && categories?.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
              {categories.map((category, index) => {
                const gradient = gradientColors[index % gradientColors.length];

                const jobCount = Number(category.jobCount || 0);

                const positions = jobCount.toLocaleString();

                return (
                  <div
                    key={category._id || category.id}
                    className={`category-card ${
                      isVisible ? "animate-in" : ""
                    } group relative cursor-pointer rounded-2xl p-3.5 sm:p-4`}
                    style={{
                      animationDelay: `${delays[index] || 100}ms`,
                    }}
                  >
                    {/* ================= POSITION BADGE ================= */}

                    <div className="absolute right-3 top-3 z-20 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[9px] font-bold text-blue-600 shadow-sm sm:right-3.5 sm:top-3.5 sm:text-[10px]">
                      {positions} {jobCount === 1 ? "Position" : "Positions"}
                    </div>

                    {/* ================= CARD CONTENT ================= */}

                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* ================= IMAGE ================= */}

                      <div className="relative shrink-0">
                        <div
                          className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${gradient} p-[3px] shadow-sm transition-all duration-300 group-hover:shadow-lg sm:h-[88px] sm:w-[88px]`}
                        >
                          <div className="h-full w-full overflow-hidden rounded-[14px] bg-white">
                            {category.image ? (
                              <img
                                src={category.image}
                                alt={category.name || "Category"}
                                loading="lazy"
                                className="block h-full w-full rounded-[14px] object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
                                No Image
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* ================= RIGHT CONTENT ================= */}

                      <div className="min-w-0 flex-1 pr-10">
                        {/* CATEGORY NAME */}

                        <h3 className="line-clamp-1 text-sm font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 sm:text-base lg:text-lg">
                          {category.name}
                        </h3>

                        {/* DESCRIPTION */}

                        <p className="mt-1.5 line-clamp-2 text-[11px] leading-4.5 text-gray-500 sm:text-xs lg:text-sm">
                          {category.shortDescription ||
                            "Explore job opportunities in this category."}
                        </p>
                      </div>

                      {/* ================= ARROW ================= */}

                      <div className="absolute bottom-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </div>
                    </div>

                    {/* ================= BOTTOM ACCENT ================= */}

                    <div className="absolute bottom-0 left-6 right-6 h-[2px] scale-x-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-transform duration-300 group-hover:scale-x-100" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default JobCategories;
