import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllSubscriptions } from "../redux/slicer/userSubscriptionSlice"; // apna actual path daal dena

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { subscriptions, fetchLoading, fetchError } = useSelector(
    (state) => state.userSubscription,
  );

  useEffect(() => {
    dispatch(fetchAllSubscriptions());
  }, [dispatch]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan.planName);
  };

  // Button click -> /purchases pe navigate, wahan payment ke baad buySubscription API call hogi
  const handlePlanClick = (plan) => {
    navigate("/purchases", {
      state: {
        subscriptionId: plan._id,
        planName: plan.planName,
        price: plan.price,
        features: plan.features,
      },
    });
  };

  if (fetchLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8fafc]">
        <p className="text-sm font-medium text-slate-500">Loading plans...</p>
      </main>
    );
  }

  if (fetchError) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8fafc]">
        <p className="text-sm font-medium text-red-500">{fetchError}</p>
      </main>
    );
  }

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
            <span className="block text-indigo-600">fits your career</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8 lg:text-lg">
            Start free and unlock powerful career tools as you grow. Find
            opportunities, build skills, and take your career to the next level.
          </p>
        </div>
      </section>

      {/* =====================================================
          PRICING CARDS
      ====================================================== */}
      <section className="px-5 pb-8 sm:px-8 lg:px-10 lg:pb-8">
        {!subscriptions || subscriptions.length === 0 ? (
          <p className="text-center text-sm text-slate-500">
            Abhi koi plan available nahi hai.
          </p>
        ) : (
          <div className="mx-auto grid max-w-6xl items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subscriptions.map((plan) => {
              const isSelected = selectedPlan === plan.planName;
              const isPopular = plan.isPopular;
              const accent = plan.color || "#4F46E5";

              // discount hai to original price wapas nikal ke strikethrough dikhao
              const hasDiscount = plan.discountPercentage > 0;
              const originalPrice = hasDiscount
                ? Math.round(plan.price / (1 - plan.discountPercentage / 100))
                : null;

              return (
                <div
                  key={plan._id}
                  onClick={() => handlePlanSelect(plan)}
                  className={`relative flex cursor-pointer flex-col rounded-3xl border bg-white p-5 transition duration-300 hover:-translate-y-1 sm:p-6 md:p-7 lg:p-8 ${
                    isSelected
                      ? "shadow-2xl ring-2"
                      : isPopular
                        ? "shadow-2xl"
                        : "border-slate-200 shadow-sm"
                  }`}
                  style={
                    isSelected || isPopular
                      ? {
                          borderColor: accent,
                          boxShadow: `0 20px 40px -10px ${accent}33`,
                        }
                      : undefined
                  }
                >
                  {plan.badge && (
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                      <span
                        className="whitespace-nowrap rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg sm:px-5 sm:py-2 sm:text-xs"
                        style={{ backgroundColor: accent }}
                      >
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {isSelected && (
                    <div
                      className="absolute right-5 top-5 rounded-full px-3 py-1 text-[10px] font-bold text-white"
                      style={{ backgroundColor: accent }}
                    >
                      Selected
                    </div>
                  )}

                  <div>
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12"
                      style={{ backgroundColor: `${accent}1A`, color: accent }}
                    >
                      <Sparkles size={18} className="sm:size-[22px]" />
                    </div>

                    <h2 className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">
                      {plan.planName}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mt-5 sm:mt-6 lg:mt-7">
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {plan.formattedPrice}
                      </span>

                      {hasDiscount && (
                        <span className="mb-1 text-sm text-slate-400 line-through">
                          ₹{originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {hasDiscount && (
                      <p className="mt-1 text-xs font-medium text-emerald-600 sm:mt-2">
                        {plan.discountPercentage}% off
                      </p>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanClick(plan);
                    }}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition sm:py-3.5 hover:opacity-90"
                    style={{ backgroundColor: accent }}
                  >
                    Go {plan.planName}
                    <ArrowRight size={16} className="sm:size-[17px]" />
                  </button>

                  <div className="my-5 h-px bg-slate-100 sm:my-6 lg:my-7" />

                  <div className="flex-1">
                    <p className="mb-4 text-sm font-bold text-slate-900 sm:mb-5">
                      What's included
                    </p>

                    <ul className="space-y-3 sm:space-y-4">
                      {(plan.features || []).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm text-slate-600"
                        >
                          <span
                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                            style={{
                              backgroundColor: `${accent}1A`,
                              color: accent,
                            }}
                          >
                            <Check size={13} strokeWidth={3} />
                          </span>
                          <span>{feature.trim()}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex gap-4 text-xs text-slate-400">
                      <span>{plan.maxJobs} job posts</span>
                      <span>•</span>
                      <span>{plan.maxApplications} applications</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
    </main>
  );
};

export default Subscription;