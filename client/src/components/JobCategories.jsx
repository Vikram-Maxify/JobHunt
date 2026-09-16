import { ArrowRight, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCategories } from "../redux/slicer/categorySlice";

const JobCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading, error } = useSelector(
    (state) => state.categories,
  );

  const [isVisible, setIsVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);

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

  // ================================
  // CATEGORY LIMITS
  // ================================

  const desktopLimit = 8;
  const mobileLimit = 4;

  const desktopCategories = showAll
    ? categories
    : categories?.slice(0, desktopLimit);

  const mobileCategories = showAll
    ? categories
    : categories?.slice(0, mobileLimit);

  // ================================
  // CATEGORY CLICK
  // ================================

const handleCategoryClick = (category) => {
  if (!category) return;

  const slug =
    category.slug ||
    category.categoryId?.slug ||
    category.name
      ?.toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

  if (!slug) return;

  navigate(`/jobs?category=${encodeURIComponent(slug)}`);
};

  // ================================
  // CATEGORY CARD
  // ================================

  const CategoryCard = ({ category, index }) => {
    const gradient = gradientColors[index % gradientColors.length];

    const jobCount = Number(category.jobCount || 0);

    const positions = jobCount.toLocaleString();

    return (
      <div
        key={category._id || category.id}
        onClick={() => handleCategoryClick(category)}
        className={`category-card ${
          isVisible ? "animate-in" : ""
        } group relative cursor-pointer rounded-2xl p-3.5 sm:p-4`}
        style={{
          animationDelay: `${delays[index % delays.length] || 100}ms`,
        }}
      >
        {/* ================= POSITION BADGE ================= */}

        <div className="absolute right-3 -top-4 z-20 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[9px] font-bold text-blue-600 shadow-sm sm:right-3.5 sm:top-3.5 sm:text-[10px]">
          {positions} {jobCount === 1 ? "Position" : "Positions"}
        </div>

        {/* ================= CARD CONTENT ================= */}

        <div className="flex items-center gap-3 sm:gap-4">
          {/* ================= IMAGE ================= */}

          <div className="relative shrink-0">
            <div
              className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${gradient} p-[3px] shadow-sm transition-all duration-300 group-hover:shadow-lg sm:h-[88px] sm:w-[88px]`}
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

            <h3 className=" text-xs font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 sm:text-base lg:text-lg">
              {category.name}
            </h3>

            {/* DESCRIPTION */}

            <p className="mt-1.5 line-clamp-1 text-[11px] leading-4.5 text-gray-500 sm:text-xs lg:text-sm">
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
  };

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
              <p className="text-sm text-gray-500">
                No categories available.
              </p>
            </div>
          )}

          {/* ================= CATEGORIES ================= */}

          {!loading && !error && categories?.length > 0 && (
            <>
              {/* =====================================================
                  DESKTOP / TABLET
                  8 CATEGORIES DEFAULT
              ====================================================== */}

              <div className="hidden grid-cols-2 gap-4 sm:grid sm:gap-5 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
                {desktopCategories.map((category, index) => (
                  <CategoryCard
                    key={category._id || category.id}
                    category={category}
                    index={index}
                  />
                ))}
              </div>

              {/* =====================================================
                  MOBILE
                  4 CATEGORIES DEFAULT
                  2 COLUMN GRID
              ====================================================== */}

              <div className="grid grid-cols-2 gap-3 sm:hidden">
                {mobileCategories.map((category, index) => (
                  <CategoryCard
                    key={category._id || category.id}
                    category={category}
                    index={index}
                  />
                ))}
              </div>

              {/* =====================================================
                  LOAD MORE / LOAD LESS
              ====================================================== */}

              {/* Desktop button */}

              {categories.length > desktopLimit && (
                <div className="mt-6 hidden justify-center sm:flex">
                  <button
                    type="button"
                    onClick={() => setShowAll((prev) => !prev)}
                    className="group inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
                  >
                    {showAll ? "Load Less" : "Load More"}

                    {showAll ? (
                      <ChevronUp
                        size={17}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5"
                      />
                    ) : (
                      <ChevronDown
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-y-0.5"
                      />
                    )}
                  </button>
                </div>
              )}

              {/* Mobile button */}

              {categories.length > mobileLimit && (
                <div className="mt-5 flex justify-center sm:hidden">
                  <button
                    type="button"
                    onClick={() => setShowAll((prev) => !prev)}
                    className="group inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-2.5 text-xs font-semibold text-blue-600 shadow-sm transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
                  >
                    {showAll ? "Load Less" : "Load More"}

                    {showAll ? (
                      <ChevronUp
                        size={16}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5"
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-y-0.5"
                      />
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default JobCategories;