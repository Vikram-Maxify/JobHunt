import {
  ArrowRight,
  Check,
  ShieldCheck,
  Sparkles,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllSubscriptions,
  fetchMySubscription,
} from "../redux/slicer/userSubscriptionSlice";

const ComparisonStatus = ({ available, accent }) => {
  if (available) {
    return (
      <span
        className="mx-auto flex h-7 w-7 items-center justify-center rounded-full"
        style={{
          backgroundColor: `${accent}1A`,
          color: accent,
        }}
      >
        <Check size={15} strokeWidth={3} />
      </span>
    );
  }

  return (
    <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-400">
      <X size={15} strokeWidth={2.5} />
    </span>
  );
};

const ComparisonRow = ({ label, children }) => {
  return (
    <tr className="border-b border-slate-100 last:border-b-0">
      <td className="sticky left-0 z-10 bg-white px-4 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6">
        {label}
      </td>

      {children}
    </tr>
  );
};

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Mobile card details expand/collapse
  const [expandedPlans, setExpandedPlans] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(
    (state) => state.auth || {}
  );

  const {
    subscriptions,
    fetchLoading,
    fetchError,
    mySubscription,
  } = useSelector(
    (state) => state.userSubscription
  );

  useEffect(() => {
    dispatch(fetchAllSubscriptions());

    if (isAuthenticated) {
      dispatch(fetchMySubscription());
    }
  }, [dispatch, isAuthenticated]);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan.planName);
  };

  // ============================================================
  // MOBILE PLAN DETAILS TOGGLE
  // ============================================================

  const togglePlanDetails = (planId) => {
    setExpandedPlans((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  // ============================================================
  // PLAN CLICK
  // ============================================================

  const handlePlanClick = (plan) => {
    const activePlanId =
      mySubscription?.subscription?._id;

    if (
      activePlanId &&
      activePlanId === plan._id
    ) {
      return;
    }

    navigate("/purchases", {
      state: {
        subscriptionId: plan._id,
        planName: plan.planName,
        price: plan.price,
        features: plan.features,
      },
    });
  };

  /*
    Dummy comparison data

    IMPORTANT:
    Ye data sirf comparison UI ke liye hai.
    Isme countries, job posts, applications ya backend limits
    use nahi kiye gaye hain.
  */

  const comparisonData = [
    {
      label: "Job Search",
      values: [true, true, true],
    },
    {
      label: "Advanced Job Filters",
      values: [true, true, true],
    },
    {
      label: "Profile Visibility",
      values: [
        "Basic",
        "Enhanced",
        "Priority",
      ],
    },
    {
      label: "Waiting Time in days",
      values: [45, 30, 15],
    },
    {
      label: "Job Alerts",
      values: [true, true, true],
    },
    {
      label: "Application Tracking",
      values: [true, true, true],
    },
    {
      label: "Career Insights",
      values: [false, true, true],
    },
    {
      label: "Priority Support",
      values: [false, true, true],
    },
    {
      label: "Country",
      values: [2, 4, 8],
    },
    {
      label: "Personalized Recommendations",
      values: [false, true, true],
    },
  ];

  if (fetchLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8fafc]">
        <p className="text-sm font-medium text-slate-500">
          Loading plans...
        </p>
      </main>
    );
  }

  if (fetchError) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8fafc]">
        <p className="text-sm font-medium text-red-500">
          {fetchError}
        </p>
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden bg-[#f8fafc] text-slate-900">
      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-white px-5 pb-6 pt-4 sm:px-8 lg:px-10 lg:pb-8 lg:pt-4">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
            <Sparkles size={16} />
            DreamGoGlobal Plans
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-6xl">
            Choose the plan that
            <span className="block text-indigo-600">
              fits your career
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8 lg:text-lg">
            Start free and unlock powerful career tools as you grow. Find
            opportunities, build skills, and take your career to the next
            level.
          </p>
        </div>
      </section>

      {/* ======================================================
          PRICING CARDS
      ====================================================== */}

      <section className="px-5 pb-4 sm:px-8 lg:px-10 lg:pb-6">
        {!subscriptions ||
          subscriptions.length === 0 ? (
          <p className="text-center text-sm text-slate-500">
            Abhi koi plan available nahi hai.
          </p>
        ) : (
          <div className="mx-auto grid max-w-6xl items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subscriptions.map((plan, index) => {
              const isSelected =
                selectedPlan === plan.planName;

              const isPopular = plan.isPopular;

              const isAlreadyPurchased =
                mySubscription?.subscription?._id ===
                plan._id;

              /*
                ==================================================
                THIRD CARD COLOR FIX
                ==================================================

                Third card ka color first card ke color ke
                same rakha gaya hai.

                Agar first card ka color available nahi hai,
                to default indigo use hoga.
              */

              const firstPlanColor =
                subscriptions?.[0]?.color ||
                "#4F46E5";

              const accent =
                index === 2
                  ? firstPlanColor
                  : plan.color || "#4F46E5";

              const hasDiscount =
                plan.discountPercentage > 0;

              const originalPrice =
                hasDiscount
                  ? Math.round(
                    plan.price /
                    (1 -
                      plan.discountPercentage /
                      100)
                  )
                  : null;

              const features =
                Array.isArray(plan.features)
                  ? plan.features
                  : [];

              const isExpanded =
                Boolean(
                  expandedPlans[plan._id]
                );

              /*
                Mobile par first 3 details.
                Desktop par complete details.
              */
              const mobileVisibleFeatures =
                isExpanded
                  ? features
                  : features.slice(0, 3);

              const hasMoreFeatures =
                features.length > 3;

              return (
                <div
                  key={plan._id}
                  onClick={() =>
                    handlePlanSelect(plan)
                  }
                  className={
                    "relative flex cursor-pointer flex-col rounded-3xl border bg-white p-5 transition duration-300 hover:-translate-y-1 sm:p-6 md:p-7 lg:p-8 " +
                    (isSelected
                      ? "shadow-2xl ring-2"
                      : isPopular
                        ? "shadow-2xl"
                        : "border-slate-200 shadow-sm")
                  }
                  style={
                    isSelected || isPopular
                      ? {
                        borderColor: accent,
                        boxShadow: `0 20px 40px -10px ${accent}33`,
                      }
                      : undefined
                  }
                >
                  {/* BADGE */}

                  {plan.badge && (
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                      <span
                        className="whitespace-nowrap rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg sm:px-5 sm:py-2 sm:text-xs"
                        style={{
                          backgroundColor:
                            accent,
                        }}
                      >
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* SELECTED */}

                  {isSelected && (
                    <div
                      className="absolute right-5 top-5 rounded-full px-3 py-1 text-[10px] font-bold text-white"
                      style={{
                        backgroundColor:
                          accent,
                      }}
                    >
                      Selected
                    </div>
                  )}

                  {/* ==================================================
                      PLAN INFO
                  ================================================== */}

                  <div>
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12"
                      style={{
                        backgroundColor: `${accent}1A`,
                        color: accent,
                      }}
                    >
                      <Sparkles
                        size={18}
                        className="sm:size-[22px]"
                      />
                    </div>

                    <h2 className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">
                      {plan.planName}
                    </h2>

                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                      {plan.description}
                    </p>
                  </div>

                  {/* ==================================================
                      PRICE
                  ================================================== */}

                  <div className="mt-5 sm:mt-6 lg:mt-7">
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {plan.formattedPrice?.replace(
                          "₹",
                          "$"
                        )}
                      </span>

                      {hasDiscount && (
                        <span className="mb-1 text-sm text-slate-400 line-through">
                          $
                          {originalPrice.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      )}
                    </div>

                    {hasDiscount && (
                      <p className="mt-1 text-xs font-medium text-emerald-600 sm:mt-2">
                        {plan.discountPercentage}%
                        off
                      </p>
                    )}
                  </div>

                  {/* ==================================================
                      BUTTON
                  ================================================== */}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      handlePlanClick(plan);
                    }}
                    disabled={isAlreadyPurchased}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition hover:opacity-90 sm:py-3.5"
                    style={{
                      backgroundColor:
                        isAlreadyPurchased
                          ? "#94a3b8"
                          : accent,
                    }}
                  >
                    {isAlreadyPurchased
                      ? "Already Purchased"
                      : `Go ${plan.planName}`}

                    {!isAlreadyPurchased && (
                      <ArrowRight
                        size={16}
                        className="sm:size-[17px]"
                      />
                    )}
                  </button>

                  <div className="my-5 h-px bg-slate-100 sm:my-6 lg:my-7" />

                  {/* ==================================================
                      FEATURES
                  ================================================== */}

                  <div className="flex-1">
                    <p className="mb-4 text-sm font-bold text-slate-900 sm:mb-5">
                      What's included
                    </p>

                    {/* DESKTOP:
                        All features

                        MOBILE:
                        First 3 / expanded features
                    */}

                    <ul className="space-y-3 sm:space-y-4">
                      {features.map(
                        (feature, featureIndex) => {
                          const showOnMobile =
                            isExpanded ||
                            featureIndex < 3;

                          return (
                            <li
                              key={`${feature}-${featureIndex}`}
                              className={`items-start gap-3 text-sm text-slate-600 ${showOnMobile
                                  ? "flex"
                                  : "hidden sm:flex"
                                }`}
                            >
                              <span
                                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                                style={{
                                  backgroundColor: `${accent}1A`,
                                  color: accent,
                                }}
                              >
                                <Check
                                  size={13}
                                  strokeWidth={3}
                                />
                              </span>

                              <span>
                                {String(
                                  feature
                                ).trim()}
                              </span>
                            </li>
                          );
                        }
                      )}
                    </ul>

                    {/* ==================================================
                        SEE MORE / SEE LESS
                    ================================================== */}

                    {hasMoreFeatures && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();

                          togglePlanDetails(
                            plan._id
                          );
                        }}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition sm:hidden"
                        style={{
                          color: accent,
                        }}
                      >
                        {isExpanded
                          ? "See Less"
                          : "See More"}

                        {isExpanded ? (
                          <ChevronUp
                            size={16}
                          />
                        ) : (
                          <ChevronDown
                            size={16}
                          />
                        )}
                      </button>
                    )}

                    {/* ==================================================
                        PLAN META
                    ================================================== */}


                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                        {plan.numberOfCountries || plan.countries?.length || 1}
                      </span>

                      <span>
                        Apply in one country
                      </span>
                    </div>



                    {plan.countries?.length >
                      0 && (
                        <p className="mt-3 text-xs text-slate-500">
                          Available in:{" "}
                          {plan.countries.join(
                            ", "
                          )}
                        </p>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* =====================================================
                          PLAN COMPARISON
      ===================================================== */}

      {subscriptions &&
        subscriptions.length > 0 && (
          <section className="px-3 pb-5 pt-3 sm:px-8 lg:px-10 lg:pb-6">
            <div className="mx-auto max-w-6xl">
              {/* Heading */}

              <div className="mb-5 text-center sm:mb-8">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-600">
                  <Check size={14} />
                  Compare Plans
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  Find the plan that's right
                  for you
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                  Compare the features and
                  benefits available with each
                  plan before making your choice.
                </p>
              </div>

              {/* Comparison Table */}

              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
                {/* Mobile scroll hint */}

                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2.5 sm:hidden">
                  <span className="text-[11px] font-medium text-slate-500">
                    Compare all plans
                  </span>

                  <span className="text-[10px] font-semibold text-indigo-500">
                    ← Swipe →
                  </span>
                </div>

                <div className="overflow-x-auto overscroll-x-contain">
                  <table className="w-full min-w-[650px] border-collapse">
                    {/* HEADER */}

                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        {/* Feature column */}

                        <th
                          className="
                            sticky left-0 z-30
                            min-w-[145px]
                            bg-slate-50
                            px-3 py-4
                            text-left
                            text-xs font-bold
                            text-slate-800
                            shadow-[3px_0_6px_-5px_rgba(15,23,42,0.25)]
                            sm:min-w-[230px]
                            sm:px-6 sm:py-5
                            sm:text-sm
                          "
                        >
                          Features
                        </th>

                        {subscriptions.map(
                          (plan, index) => {
                            /*
                              Third comparison card ka
                              color bhi first card ke
                              color ke same rakha hai.
                            */

                            const firstPlanColor =
                              subscriptions?.[0]
                                ?.color ||
                              "#4F46E5";

                            const accent =
                              index === 2
                                ? firstPlanColor
                                : plan.color ||
                                "#4F46E5";

                            return (
                              <th
                                key={plan._id}
                                className="
                                  min-w-[165px]
                                  px-3 py-4
                                  text-center
                                  sm:min-w-[190px]
                                  sm:px-6 sm:py-5
                                "
                              >
                                <div className="flex flex-col items-center">
                                  {plan.isPopular && (
                                    <span
                                      className="
                                        mb-1.5
                                        rounded-full
                                        px-2 py-0.5
                                        text-[8px]
                                        font-bold
                                        uppercase
                                        tracking-wide
                                        text-white
                                        sm:mb-2
                                        sm:px-2.5 sm:py-1
                                        sm:text-[9px]
                                      "
                                      style={{
                                        backgroundColor:
                                          accent,
                                      }}
                                    >
                                      Popular
                                    </span>
                                  )}

                                  <span className="text-xs font-bold text-slate-900 sm:text-base">
                                    {
                                      plan.planName
                                    }
                                  </span>

                                  <span
                                    className="mt-1 text-base font-black sm:text-xl"
                                    style={{
                                      color:
                                        accent,
                                    }}
                                  >
                                    {plan.formattedPrice?.replace(
                                      "₹",
                                      "$"
                                    )}
                                  </span>
                                </div>
                              </th>
                            );
                          }
                        )}
                      </tr>
                    </thead>

                    {/* BODY */}

                    <tbody>
                      {comparisonData.map(
                        (row) => (
                          <tr
                            key={row.label}
                            className="border-b border-slate-100 last:border-b-0"
                          >
                            {/* Feature name */}

                            <td
                              className="
                                sticky left-0 z-20
                                min-w-[145px]
                                bg-white
                                px-3 py-3.5
                                text-left
                                text-[11px]
                                font-semibold
                                leading-4
                                text-slate-700
                                shadow-[3px_0_6px_-5px_rgba(15,23,42,0.25)]
                                sm:min-w-[230px]
                                sm:px-6 sm:py-4
                                sm:text-sm
                              "
                            >
                              {row.label}
                            </td>

                            {/* Values */}

                            {subscriptions.map(
                              (plan, index) => {
                                const firstPlanColor =
                                  subscriptions?.[0]
                                    ?.color ||
                                  "#4F46E5";

                                const accent =
                                  index === 2
                                    ? firstPlanColor
                                    : plan.color ||
                                    "#4F46E5";

                                const value =
                                  row.values[
                                  Math.min(
                                    index,
                                    row
                                      .values
                                      .length -
                                    1
                                  )
                                  ];

                                return (
                                  <td
                                    key={plan._id}
                                    className="
                                      min-w-[165px]
                                      px-3 py-3.5
                                      text-center
                                      sm:min-w-[190px]
                                      sm:px-6 sm:py-4
                                    "
                                  >
                                    {typeof value ===
                                      "boolean" ? (
                                      <div className="flex justify-center">
                                        <ComparisonStatus
                                          available={
                                            value
                                          }
                                          accent={
                                            accent
                                          }
                                        />
                                      </div>
                                    ) : (
                                      <span
                                        className="
                                          inline-flex
                                          min-w-[70px]
                                          items-center
                                          justify-center
                                          rounded-lg
                                          px-2.5 py-1.5
                                          text-[11px]
                                          font-bold
                                          sm:text-sm
                                        "
                                        style={{
                                          backgroundColor: `${accent}0D`,
                                          color:
                                            accent,
                                        }}
                                      >
                                        {value}
                                      </span>
                                    )}
                                  </td>
                                );
                              }
                            )}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile helper */}

              <div className="mt-3 flex items-center justify-center gap-1.5 sm:hidden">
                <span className="text-[10px] text-slate-400">
                  Swipe left or right to compare
                  plans
                </span>
              </div>
            </div>
          </section>
        )}

      {/* ======================================================
          TRUST BAR
      ====================================================== */}

      <section className="border-y border-slate-200 bg-white px-5 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <ShieldCheck
              size={20}
              className="sm:size-[21px]"
            />
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              Simple, transparent pricing
            </p>

            <p className="mt-1 text-sm text-slate-500">
              No hidden charges. Upgrade or cancel
              whenever you want.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Subscription;