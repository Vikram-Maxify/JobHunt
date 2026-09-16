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
        className="mx-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
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
    <span className="mx-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
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
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8fafc] px-4">
        <p className="text-center text-sm font-medium text-slate-500">
          Loading plans...
        </p>
      </main>
    );
  }

  if (fetchError) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f8fafc] px-4">
        <p className="text-center text-sm font-medium text-red-500">
          {fetchError}
        </p>
      </main>
    );
  }

  return (
    <main className="w-full overflow-x-hidden bg-[#f8fafc] text-slate-900">
      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-white px-4 pb-6 pt-4 sm:px-6 sm:pb-7 sm:pt-4 md:px-8 lg:px-10 lg:pb-8 lg:pt-4">
        <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-indigo-100/60 blur-3xl sm:h-64 sm:w-64" />

        <div className="relative mx-auto w-full max-w-4xl text-center">
          <div className="mb-2 inline-flex max-w-full items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 sm:px-4 sm:py-2 sm:text-sm">
            <Sparkles size={14} className="shrink-0 sm:size-[16px]" />
            <span className="truncate">
              DreamGoGlobal Plans
            </span>
          </div>

          <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl xl:text-6xl">
            Choose the plan that
            <span className="block text-indigo-600">
              fits your career
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-slate-500 sm:mt-4 sm:text-base sm:leading-8 lg:text-lg">
            Start free and unlock powerful career tools as you grow. Find
            opportunities, build skills, and take your career to the next
            level.
          </p>
        </div>
      </section>

      {/* ======================================================
          PRICING CARDS
      ====================================================== */}

      <section className="w-full px-4 pb-5 sm:px-6 sm:pb-6 md:px-8 lg:px-10 lg:pb-6">
        {!subscriptions ||
          subscriptions.length === 0 ? (
          <p className="py-4 text-center text-sm text-slate-500">
            Abhi koi plan available nahi hai.
          </p>
        ) : (
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                    "relative flex min-w-0 cursor-pointer flex-col rounded-3xl border bg-white p-5 transition duration-300 hover:-translate-y-1 sm:p-6 md:p-7 lg:p-8 " +
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
                  {/* ==================================================
                      BADGE
                  ================================================== */}

                  {plan.badge && (
                    <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
                      <span
                        className="block max-w-[calc(100vw-4rem)] whitespace-nowrap rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-lg sm:px-5 sm:py-2 sm:text-xs"
                        style={{
                          backgroundColor: accent,
                        }}
                      >
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* ==================================================
                      SELECTED
                  ================================================== */}

                  {isSelected && (
                    <div
                      className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[9px] font-bold text-white sm:right-5 sm:top-5 sm:px-3 sm:text-[10px]"
                      style={{
                        backgroundColor: accent,
                      }}
                    >
                      Selected
                    </div>
                  )}

                  {/* ==================================================
                      PLAN INFO
                  ================================================== */}

                  <div className="min-w-0">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12"
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

                    <h2 className="mt-4 break-words text-xl font-bold text-slate-900 sm:text-2xl">
                      {plan.planName}
                    </h2>

                    <p className="mt-1 line-clamp-2 break-words text-sm leading-6 text-slate-500">
                      {plan.description}
                    </p>
                  </div>

                  {/* ==================================================
                      PRICE
                  ================================================== */}

                  <div className="mt-5 sm:mt-6 lg:mt-7">
                    <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
                      <span className="max-w-full break-all text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
  {plan.formattedPrice}
</span>

                      {hasDiscount && (
                        <span className="mb-1 text-sm text-slate-400 line-through">
                          ₹
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
                    className="mt-5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold text-white transition hover:opacity-90 sm:py-3.5"
                    style={{
                      backgroundColor:
                        isAlreadyPurchased
                          ? "#94a3b8"
                          : accent,
                    }}
                  >
                    <span className="truncate">
                      {isAlreadyPurchased
                        ? "Already Purchased"
                        : `Go ${plan.planName}`}
                    </span>

                    {!isAlreadyPurchased && (
                      <ArrowRight
                        size={16}
                        className="shrink-0 sm:size-[17px]"
                      />
                    )}
                  </button>

                  <div className="my-5 h-px bg-slate-100 sm:my-6 lg:my-7" />

                  {/* ==================================================
                      FEATURES
                  ================================================== */}

                  <div className="min-w-0 flex-1">
                    <p className="mb-3 text-sm font-bold text-slate-900 sm:mb-5">
                      What's included
                    </p>

                    {/* COUNTRY BADGE */}

                    <div className="flex w-fit max-w-full items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm sm:px-4 sm:text-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-sm">
                        {plan.countries?.[0] ||
                          plan.numberOfCountries ||
                          1}
                      </span>

                      <span className="min-w-0 break-words">
                        Apply for Jobs in{" "}
                        {plan.countries?.[0] ||
                          plan.numberOfCountries ||
                          1}{" "}
                        {Number(
                          plan.countries?.[0] ||
                          plan.numberOfCountries ||
                          1
                        ) === 1
                          ? "Country"
                          : "Countries"}
                      </span>
                    </div>

                    {/* ==================================================
                        FEATURES LIST
                    ================================================== */}

                    <ul
                      className={`pt-4 ${isExpanded
                          ? "flex flex-col gap-3"
                          : "flex flex-col gap-3"
                        }`}
                    >
                      {features.map(
                        (feature, featureIndex) => {
                          const showOnMobile =
                            isExpanded ||
                            featureIndex < 3;

                          return (
                            <li
                              key={`${feature}-${featureIndex}`}
                              className={`items-start gap-3 text-sm leading-5 text-slate-600 ${showOnMobile
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

                              <span className="min-w-0 break-words">
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
                        className="mt-4 inline-flex min-h-[36px] items-center gap-1.5 rounded-md text-sm font-semibold transition sm:hidden"
                        style={{
                          color: accent,
                        }}
                      >
                        {isExpanded
                          ? "See Less"
                          : "See More"}

                        {isExpanded ? (
                          <ChevronUp size={16} />
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

                    {plan.countries?.length >
                      0 && (
                        <p className="mt-3 break-words text-xs leading-5 text-slate-500">
                          Available in:{" "}
                          {plan.countries.join(", ")}
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
          <section className="w-full px-3 pb-6 pt-3 sm:px-6 sm:pb-7 md:px-8 lg:px-10 lg:pb-6">
            <div className="mx-auto w-full max-w-6xl">
              {/* ==================================================
                  HEADING
              ================================================== */}

              <div className="mb-5 px-1 text-center sm:mb-8">
                <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-600">
                  <Check size={14} className="shrink-0" />
                  <span>Compare Plans</span>
                </div>

                <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  Find the plan that's right
                  for you
                </h2>

                <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                  Compare the features and
                  benefits available with each
                  plan before making your choice.
                </p>
              </div>

              {/* ==================================================
                  COMPARISON TABLE
              ================================================== */}

              <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
                {/* ==================================================
      MOBILE SCROLL HINT
  ================================================== */}

                <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-3 py-2.5 sm:hidden">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <ArrowRight size={12} />
                    </span>

                    <span className="text-[11px] font-semibold text-slate-600">
                      Compare Plans
                    </span>
                  </div>

                  <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold text-indigo-500 shadow-sm">
                    Swipe →
                  </span>
                </div>

                {/* ==================================================
      TABLE WRAPPER
  ================================================== */}

                <div
                  className="
      w-full
      overflow-x-auto
      overscroll-x-contain
      scrollbar-thin
      scrollbar-thumb-slate-300
      scrollbar-track-transparent
    "
                >
                  <table
                    className="
        w-full
        min-w-[520px]
        border-collapse
        sm:min-w-[650px]
      "
                  >
                    {/* ==================================================
          HEADER
      ================================================== */}

                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        {/* FEATURE COLUMN */}

                        <th
                          className="
              sticky left-0 z-30
              w-[125px]
              min-w-[125px]
              bg-slate-50
              px-2.5 py-3
              text-left
              text-[10px]
              font-bold
              text-slate-800
              shadow-[3px_0_6px_-5px_rgba(15,23,42,0.25)]

              sm:w-auto
              sm:min-w-[230px]
              sm:px-6
              sm:py-5
              sm:text-sm
            "
                        >
                          Features
                        </th>

                        {/* PLAN HEADERS */}

                        {subscriptions.map(
                          (plan, index) => {
                            /*
                              Third comparison card color
                              first card ke color ke same.
                            */

                            const firstPlanColor =
                              subscriptions?.[0]?.color ||
                              "#4F46E5";

                            const accent =
                              index === 2
                                ? firstPlanColor
                                : plan.color || "#4F46E5";

                            return (
                              <th
                                key={plan._id}
                                className="
                    w-[132px]
                    min-w-[132px]
                    px-2
                    py-3
                    text-center

                    sm:w-auto
                    sm:min-w-[190px]
                    sm:px-6
                    sm:py-5
                  "
                              >
                                <div className="flex flex-col items-center justify-center">
                                  {/* POPULAR */}

                                  {plan.isPopular && (
                                    <span
                                      className="
                          mb-1
                          rounded-full
                          px-2
                          py-0.5
                          text-[7px]
                          font-bold
                          uppercase
                          tracking-wide
                          text-white

                          sm:mb-2
                          sm:px-2.5
                          sm:py-1
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

                                  {/* PLAN NAME */}

                                  <span
                                    className="
                        max-w-[110px]
                        break-words
                        text-[11px]
                        font-bold
                        leading-4
                        text-slate-900

                        sm:max-w-none
                        sm:text-base
                      "
                                  >
                                    {plan.planName}
                                  </span>

                                  {/* PRICE */}

                                  <span
                                    className="
                        mt-0.5
                        text-sm
                        font-black

                        sm:mt-1
                        sm:text-xl
                      "
                                    style={{
                                      color: accent,
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

                    {/* ==================================================
          BODY
      ================================================== */}

                    <tbody>
                      {comparisonData.map((row) => (
                        <tr
                          key={row.label}
                          className="
              border-b
              border-slate-100
              last:border-b-0
            "
                        >
                          {/* ==================================================
                FEATURE NAME
            ================================================== */}

                          <td
                            className="
                sticky left-0 z-20
                w-[125px]
                min-w-[125px]
                bg-white
                px-2.5
                py-3
                text-left
                text-[10px]
                font-semibold
                leading-4
                text-slate-700
                shadow-[3px_0_6px_-5px_rgba(15,23,42,0.25)]

                sm:w-auto
                sm:min-w-[230px]
                sm:px-6
                sm:py-4
                sm:text-sm
              "
                          >
                            {row.label}
                          </td>

                          {/* ==================================================
                VALUES
            ================================================== */}

                          {subscriptions.map(
                            (plan, index) => {
                              const firstPlanColor =
                                subscriptions?.[0]?.color ||
                                "#4F46E5";

                              const accent =
                                index === 2
                                  ? firstPlanColor
                                  : plan.color || "#4F46E5";

                              const value =
                                row.values[
                                Math.min(
                                  index,
                                  row.values.length - 1
                                )
                                ];

                              return (
                                <td
                                  key={plan._id}
                                  className="
                      w-[132px]
                      min-w-[132px]
                      px-2
                      py-3
                      text-center

                      sm:w-auto
                      sm:min-w-[190px]
                      sm:px-6
                      sm:py-4
                    "
                                >
                                  {typeof value ===
                                    "boolean" ? (
                                    <div className="flex justify-center">
                                      <ComparisonStatus
                                        available={value}
                                        accent={accent}
                                      />
                                    </div>
                                  ) : (
                                    <span
                                      className="
                          inline-flex
                          min-w-[52px]
                          items-center
                          justify-center
                          rounded-lg
                          px-2
                          py-1
                          text-[10px]
                          font-bold

                          sm:min-w-[70px]
                          sm:px-2.5
                          sm:py-1.5
                          sm:text-sm
                        "
                                      style={{
                                        backgroundColor: `${accent}0D`,
                                        color: accent,
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
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ==================================================
      MOBILE HELPER
  ================================================== */}

                <div className="border-t border-slate-100 bg-slate-50 px-3 py-2.5 sm:hidden">
                  <p className="text-center text-[9px] font-medium text-slate-400">
                    Swipe horizontally to view all plans
                  </p>
                </div>
              </div>

              {/* ==================================================
                  MOBILE HELPER
              ================================================== */}

              <div className="mt-3 flex items-center justify-center gap-1.5 sm:hidden">
                <span className="text-center text-[10px] leading-4 text-slate-400">
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

      <section className="border-y border-slate-200 bg-white px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-6 sm:text-left">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <ShieldCheck
              size={20}
              className="sm:size-[21px]"
            />
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-slate-900">
              Simple, transparent pricing
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
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