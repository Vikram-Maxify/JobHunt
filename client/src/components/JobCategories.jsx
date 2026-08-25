import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Code,
  PenTool,
  BarChart,
  Users,
  ShoppingBag,
  GraduationCap,
  Heart,
  ArrowRight,
  Zap,
  TrendingUp,
  Sparkles,
  Clock,
} from "lucide-react";

const JobCategories = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 1, name: "Technology", icon: Code, count: 1240, color: "blue", trend: "rising" },
    { id: 2, name: "Design", icon: PenTool, count: 856, color: "purple", trend: "stable" },
    { id: 3, name: "Marketing", icon: BarChart, count: 723, color: "green", trend: "rising" },
    { id: 4, name: "Finance", icon: Briefcase, count: 512, color: "amber", trend: "stable" },
    { id: 5, name: "Healthcare", icon: Heart, count: 645, color: "rose", trend: "rising" },
    { id: 6, name: "Education", icon: GraduationCap, count: 390, color: "indigo", trend: "falling" },
    { id: 7, name: "Retail", icon: ShoppingBag, count: 284, color: "orange", trend: "stable" },
    { id: 8, name: "Consulting", icon: Users, count: 218, color: "teal", trend: "rising" },
  ];

  const gradientMap = {
    blue: "from-blue-500 via-blue-400 to-blue-600",
    purple: "from-purple-500 via-purple-400 to-purple-600",
    green: "from-emerald-500 via-emerald-400 to-emerald-600",
    amber: "from-amber-500 via-amber-400 to-amber-600",
    rose: "from-rose-500 via-rose-400 to-rose-600",
    indigo: "from-indigo-500 via-indigo-400 to-indigo-600",
    orange: "from-orange-500 via-orange-400 to-orange-600",
    teal: "from-teal-500 via-teal-400 to-teal-600",
  };

  const trendColors = {
    rising: "text-emerald-600",
    stable: "text-blue-600",
    falling: "text-rose-600",
  };

  const delays = [100, 150, 200, 250, 300, 350, 400, 450];

  return (
    <>
      <style>
        {`
          @keyframes floatIcon {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes countPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .category-card {
            opacity: 0;
            transition: all 0.3s ease;
          }
          .category-card.animate-in {
            animation: fadeUp 0.8s ease forwards;
          }
          .icon-float {
            animation: floatIcon 3s ease-in-out infinite;
          }
          .count-badge {
            animation: countPulse 2s ease-in-out infinite;
          }
          .category-card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            box-shadow: 0 4px 16px -8px rgba(0, 0, 0, 0.08);
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .category-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
            border-color: #93c5fd;
          }
          .popular-badge {
            background: linear-gradient(135deg, #f59e0b, #ef4444);
          }
          .trending-badge {
            background: linear-gradient(135deg, #8b5cf6, #3b82f6);
          }
          .section-bg {
            background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
          }
        `}
      </style>

      <section className="section-bg relative py-6 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-xs font-medium text-blue-600 tracking-wider uppercase">Explore Categories</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Find Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Perfect Match
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover opportunities across the most in‑demand industries. Your next career move starts here.
            </p>
          </div>

          {/* Categories Grid - Changed to 2 columns on all small screens, 4 on large */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isTrending = category.trend === "rising";
              const isPopular = category.count > 700;

              return (
                <div
                  key={category.id}
                  className={`category-card ${isVisible ? "animate-in" : ""} relative group rounded-2xl p-6 sm:p-8 cursor-pointer`}
                  style={{ animationDelay: `${delays[index]}ms` }}
                >
                  {/* Trending Badge */}
                  {isTrending && (
                    <div className="trending-badge absolute -top-2 -right-2 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 z-20">
                      <TrendingUp size={10} className="fill-white" />
                      Trending
                    </div>
                  )}

                  {/* Popular Badge */}
                  {isPopular && !isTrending && (
                    <div className="popular-badge absolute -top-2 -right-2 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 z-20">
                      <Zap size={10} className="fill-white" />
                      Popular
                    </div>
                  )}

                  <div className="flex flex-col items-center text-center">
                    {/* Icon Container */}
                    <div className="relative">
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${gradientMap[category.color]} p-[3px] shadow-md group-hover:shadow-xl transition-all duration-300`}>
                        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center icon-float">
                          <Icon size={32} className="sm:size-[36px] text-gray-800" />
                        </div>
                      </div>
                    </div>

                    <h3 className="mt-5 text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>

                    <div className="flex items-center justify-center gap-2 mt-1.5">
                      <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 count-badge">
                        {category.count.toLocaleString()}
                        <span className="text-sm sm:text-base font-medium text-gray-400 ml-1">+</span>
                      </p>
                      <span className={`text-xs font-medium ${trendColors[category.trend]}`}>
                        {category.trend === "rising" && "↑"}
                        {category.trend === "falling" && "↓"}
                        {category.trend === "stable" && "→"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">open positions</p>

                    <div className="mt-4 flex items-center gap-1 text-xs text-gray-400 group-hover:text-blue-600 transition-colors">
                      <Clock size={12} />
                      <span>Updated recently</span>
                    </div>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowRight size={20} className="text-blue-500" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Browse All Button */}
          <div className="text-center mt-6">
            <a
              href="#"
              className="group inline-flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
            >
              <span>Browse All Categories</span>
              <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </a>
            <p className="text-xs text-gray-400 mt-3">Explore 50+ more categories</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobCategories;