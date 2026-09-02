import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Crown,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    monthly: 0,
    yearly: 0,
    icon: Zap,
    button: "Get Started",
    popular: false,
    features: [
      "Create professional profile",
      "Basic job search",
      "Save jobs",
      "Basic career resources",
      "Limited applications",
    ],
  },
  {
    name: "Pro",
    description: "For active job seekers",
    monthly: 499,
    yearly: 4990,
    icon: Sparkles,
    button: "Start Pro",
    popular: true,
    features: [
      "Everything in Free",
      "AI career matching",
      "Advanced skill analysis",
      "Professional resume builder",
      "Unlimited job applications",
      "Advanced job filters",
      "Application tracking",
      "Personalized career roadmap",
    ],
  },
  {
    name: "Premium",
    description: "Complete career support",
    monthly: 999,
    yearly: 9990,
    icon: Crown,
    button: "Go Premium",
    popular: false,
    features: [
      "Everything in Pro",
      "Personal career guidance",
      "Mentor sessions",
      "Resume review",
      "Interview preparation",
      "Priority opportunities",
      "Advanced career analytics",
      "Exclusive jobs",
    ],
  },
];

const comparison = [
  ["Professional Profile", true, true, true],
  ["Job Search", true, true, true],
  ["Save Jobs", true, true, true],
  ["Career Matching", "Basic", "Advanced", "AI Powered"],
  ["Resume Builder", false, true, true],
  ["Skill Analysis", false, true, true],
  ["Job Applications", "Limited", "Unlimited", "Unlimited"],
  ["Application Tracking", false, true, true],
  ["Career Roadmap", false, true, true],
  ["Mentor Sessions", false, false, true],
  ["Resume Review", false, false, true],
  ["Interview Preparation", false, false, true],
  ["Career Analytics", "Basic", "Advanced", "Advanced"],
];

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. You can cancel your subscription at any time from your account settings.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes. You can upgrade or downgrade your CareerSphere plan whenever you need.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The Free plan gives you access to essential CareerSphere features without a subscription.",
  },
  {
    question: "Do yearly plans offer discounts?",
    answer:
      "Yes. Yearly plans are designed to provide better value compared with paying every month.",
  },
  {
    question: "Can I use CareerSphere without a subscription?",
    answer:
      "Absolutely. You can start with the Free plan and upgrade whenever you need additional career tools.",
  },
];

const Subscription = () => {
  const [billing, setBilling] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);

  // Added only for selecting the card
  const [selectedPlan, setSelectedPlan] = useState(null);

  const navigate = useNavigate();

  const getPrice = (plan) => {
    if (plan.monthly === 0) return 0;

    return billing === "monthly"
      ? plan.monthly
      : Math.round(plan.yearly / 12);
  };

  // Card click will ONLY select the plan
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan.name);
  };

  // Button click will navigate
  const handlePlanClick = (plan) => {
    navigate("/purchases", {
      state: {
        plan: plan.name,
        billing,
        monthlyPrice: plan.monthly,
        yearlyPrice: plan.yearly,
      },
    });
  };

  return (
    <main className="overflow-x-hidden bg-[#f8fafc] text-slate-900">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-white px-5 pb-6 pt-8 sm:px-8 lg:px-10 lg:pb-8 lg:pt-8">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
            <Sparkles size={16} />
            CareerSphere Plans
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-6xl">
            Choose the plan that
            <span className="block text-indigo-600">
              fits your career
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8 lg:text-lg">
            Start free and unlock powerful career tools as you grow.
            Find opportunities, build skills, and take your career to the
            next level.
          </p>

          {/* Billing Toggle */}
          <div className="mt-4 inline-flex rounded-full border border-slate-200 bg-slate-100 p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition sm:px-5 sm:py-2.5 ${
                billing === "monthly"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition sm:px-5 sm:py-2.5 ${
                billing === "yearly"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Yearly

              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                SAVE
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRICING CARDS – FULLY RESPONSIVE
      ====================================================== */}
      <section className="px-5 pb-8 sm:px-8 lg:px-10 lg:pb-8">
        <div className="mx-auto grid max-w-6xl items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = getPrice(plan);
            const isSelected = selectedPlan === plan.name;

            return (
              <div
                key={plan.name}
                onClick={() => handlePlanSelect(plan)}
                className={`relative flex cursor-pointer flex-col rounded-3xl border bg-white p-5 transition duration-300 hover:-translate-y-1 sm:p-6 md:p-7 lg:p-8 ${
                  isSelected
                    ? "border-indigo-600 shadow-2xl shadow-indigo-100 ring-2 ring-indigo-100"
                    : plan.popular
                    ? "border-indigo-500 shadow-2xl shadow-indigo-100"
                    : "border-slate-200 shadow-sm"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <span className="whitespace-nowrap rounded-full bg-indigo-600 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg shadow-indigo-200 sm:px-5 sm:py-2 sm:text-xs">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Selected Badge */}
                {isSelected && (
                  <div className="absolute right-5 top-5 rounded-full bg-indigo-600 px-3 py-1 text-[10px] font-bold text-white">
                    Selected
                  </div>
                )}

                {/* Plan Header */}
                <div>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${
                      plan.popular
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Icon size={18} className="sm:size-[22px]" />
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">
                    {plan.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mt-5 sm:mt-6 lg:mt-7">
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                      ₹{price.toLocaleString("en-IN")}
                    </span>

                    {price > 0 && (
                      <span className="mb-1 text-sm text-slate-400">
                        /month
                      </span>
                    )}
                  </div>

                  {billing === "yearly" && plan.monthly > 0 && (
                    <p className="mt-1 text-xs font-medium text-emerald-600 sm:mt-2">
                      Billed annually at ₹
                      {plan.yearly.toLocaleString("en-IN")}
                    </p>
                  )}
                </div>

                {/* Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanClick(plan);
                  }}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition sm:py-3.5 ${
                    plan.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border border-slate-200 bg-white text-slate-900 hover:border-indigo-200 hover:bg-indigo-50"
                  }`}
                >
                  {plan.button}
                  <ArrowRight size={16} className="sm:size-[17px]" />
                </button>

                {/* Divider */}
                <div className="my-5 h-px bg-slate-100 sm:my-6 lg:my-7" />

                {/* Features */}
                <div className="flex-1">
                  <p className="mb-4 text-sm font-bold text-slate-900 sm:mb-5">
                    What's included
                  </p>

                  <ul className="space-y-3 sm:space-y-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            plan.popular
                              ? "bg-indigo-100 text-indigo-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          <Check size={13} strokeWidth={3} />
                        </span>

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          TRUST BAR
      ====================================================== */}
      <section className="border-y border-slate-200 bg-white px-5 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <ShieldCheck size={20} className="sm:size-[21px]" />
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              Simple, transparent pricing
            </p>

            <p className="mt-1 text-sm text-slate-500">
              No hidden charges. Upgrade or cancel whenever you want.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY UPGRADE
      ====================================================== */}
      <section className="px-5 py-6 sm:px-8 sm:py-6 lg:px-10 lg:py-6">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
              <Sparkles size={15} />
              Unlock More
            </span>

            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Grow faster with powerful career tools
            </h2>

            <p className="mt-3 text-sm text-slate-500 sm:text-base">
              Get everything you need to build skills, find opportunities,
              and make smarter career decisions.
            </p>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:mt-6">
            {[
              {
                icon: Sparkles,
                title: "Personalized Matching",
                text: "Discover careers and jobs that match your profile.",
              },
              {
                icon: ShieldCheck,
                title: "Professional Resume",
                text: "Build a polished and professional resume.",
              },
              {
                icon: Zap,
                title: "Career Analytics",
                text: "Track your skills and career progress.",
              },
              {
                icon: Crown,
                title: "Expert Guidance",
                text: "Get support from experienced career mentors.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white sm:h-12 sm:w-12">
                    <Icon size={18} className="sm:size-[21px]" />
                  </div>

                  <h3 className="mt-4 font-bold text-slate-900 sm:mt-6">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500 sm:mt-2">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          COMPARISON
      ====================================================== */}
      <section className="bg-white px-5 py-6 sm:px-8 sm:py-6 lg:px-10 lg:py-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
              Compare Plans
            </span>

            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Find the right plan for you
            </h2>
          </div>

          <div className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 md:mt-6">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-4 text-sm font-bold text-slate-900 sm:px-6 sm:py-5">
                    Features
                  </th>

                  <th className="px-4 py-4 text-center text-sm font-bold sm:px-6 sm:py-5">
                    Free
                  </th>

                  <th className="bg-indigo-50 px-4 py-4 text-center text-sm font-bold text-indigo-600 sm:px-6 sm:py-5">
                    Pro
                  </th>

                  <th className="px-4 py-4 text-center text-sm font-bold sm:px-6 sm:py-5">
                    Premium
                  </th>
                </tr>
              </thead>

              <tbody>
                {comparison.map(([feature, free, pro, premium]) => (
                  <tr key={feature} className="border-t border-slate-100">
                    <td className="px-4 py-3 text-sm font-medium text-slate-700 sm:px-6 sm:py-4">
                      {feature}
                    </td>

                    {[free, pro, premium].map((value, index) => (
                      <td
                        key={index}
                        className={`px-4 py-3 text-center text-sm ${
                          index === 1 ? "bg-indigo-50/40" : ""
                        } sm:px-6 sm:py-4`}
                      >
                        {typeof value === "boolean" ? (
                          value ? (
                            <Check
                              size={16}
                              className="mx-auto text-emerald-500 sm:size-[18px]"
                            />
                          ) : (
                            <span className="text-slate-300">—</span>
                          )
                        ) : (
                          <span className="text-slate-500">{value}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Subscription;