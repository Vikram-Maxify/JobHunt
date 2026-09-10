
import {
  Calendar,
  CheckCircle2,
  Crown,
  History,
  Sparkles,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  cancelSubscription,
  fetchMySubscription,
  fetchSubscriptionHistory,
  resetCancelState,
} from "../redux/slicer/userSubscriptionSlice";

const iconMap = {
  Free: Zap,
  Advanced: Sparkles,
  Premium: Crown,
};

const MySubscription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const {
    mySubscription,
    myLoading,
    myError,
    history,
    historyLoading,
    cancelLoading,
    cancelError,
    cancelSuccess,
  } = useSelector((state) => state.userSubscription);

  // =========================================================
  // FETCH SUBSCRIPTION DATA
  // =========================================================

  useEffect(() => {
    dispatch(fetchMySubscription());
    dispatch(fetchSubscriptionHistory());
  }, [dispatch]);

  // =========================================================
  // CANCEL SUCCESS
  // =========================================================

  useEffect(() => {
    if (cancelSuccess) {
      setShowCancelConfirm(false);
      setCancelReason("");

      dispatch(fetchMySubscription());
      dispatch(fetchSubscriptionHistory());
      dispatch(resetCancelState());
    }
  }, [cancelSuccess, dispatch]);

  // =========================================================
  // CANCEL SUBSCRIPTION
  // =========================================================

  const handleCancelConfirm = () => {
    dispatch(
      cancelSubscription({
        cancellationReason: cancelReason || undefined,
      })
    );
  };

  // =========================================================
  // PLAN NAME
  // =========================================================

  const planName =
    mySubscription?.subscriptionDetails?.planName ||
    mySubscription?.subscription?.planName;

  const PlanIcon = iconMap[planName] || Sparkles;

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";

    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50">
      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div className="mb-6 sm:mb-7">
          <div className="flex items-center gap-3">
            {/* Icon */}

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#A0E9FF]/40 text-[#159FEF] sm:h-12 sm:w-12">
              <Crown className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>

            {/* Heading */}

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-[#159FEF]">
                Account
              </p>

              <h1 className="mt-1 text-xl font-black tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
                My Subscription
              </h1>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Manage your current plan and subscription history.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            CURRENT SUBSCRIPTION CARD
        ====================================================== */}

        <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="w-full p-5 sm:p-6 lg:p-8">
            {/* =================================================
                LOADING
            ================================================== */}

            {myLoading && (
              <div className="w-full">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 animate-pulse rounded-2xl bg-slate-200 sm:h-14 sm:w-14" />

                  <div className="min-w-0 flex-1">
                    <div className="h-5 w-36 max-w-full animate-pulse rounded bg-slate-200" />

                    <div className="mt-2 h-4 w-24 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="h-16 w-full animate-pulse rounded-2xl bg-slate-100" />
                  <div className="h-16 w-full animate-pulse rounded-2xl bg-slate-100" />
                </div>
              </div>
            )}

            {/* =================================================
                ERROR
            ================================================== */}

            {!myLoading && myError && (
              <div className="w-full rounded-2xl border border-red-100 bg-red-50 p-4">
                <p className="text-sm leading-6 text-red-600 break-words">
                  {myError}
                </p>
              </div>
            )}

            {/* =================================================
                NO SUBSCRIPTION
            ================================================== */}

            {!myLoading && !myError && !mySubscription && (
              <div className="flex flex-col items-center justify-center px-2 py-10 text-center sm:py-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A0E9FF]/40 text-[#159FEF] sm:h-16 sm:w-16">
                  <Sparkles className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>

                <h2 className="mt-4 text-xl font-black text-slate-900 sm:text-2xl">
                  No Active Subscription
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Abhi aapke account par koi active subscription nahi hai.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/subscription")}
                  className="mt-6 rounded-xl bg-[#30AFFF] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#159FEF] hover:shadow-lg active:scale-[0.98]"
                >
                  Plans Dekho
                </button>
              </div>
            )}

            {/* =================================================
                ACTIVE SUBSCRIPTION
            ================================================== */}

            {!myLoading && !myError && mySubscription && (
              <div className="w-full">
                {/* TOP SECTION */}

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  {/* PLAN INFO */}

                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#30AFFF] text-white shadow-lg shadow-[#30AFFF]/20 sm:h-14 sm:w-14">
                      <PlanIcon className="h-6 w-6" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-black leading-6 text-slate-900 sm:text-lg lg:text-xl">
                          {planName || "Subscription"} Plan
                        </h2>

                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 sm:text-xs">
                          <CheckCircle2 className="h-3 w-3" />
                          Active
                        </span>
                      </div>

                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        Your current subscription plan
                      </p>
                    </div>
                  </div>

                  {/* CANCEL BUTTON */}

                  <div className="w-full sm:w-auto sm:shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setCancelReason("");
                        setShowCancelConfirm(true);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-500 transition-all hover:border-red-300 hover:bg-red-50 active:scale-[0.98] sm:w-auto"
                    >
                      <XCircle className="h-4 w-4 shrink-0" />

                      <span>Cancel Subscription</span>
                    </button>
                  </div>
                </div>

                {/* DIVIDER */}

                <div className="my-5 h-px w-full bg-slate-100 sm:my-6" />

                {/* DATES */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* STARTED ON */}

                  <div className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-[#30AFFF]/20 hover:bg-[#A0E9FF]/10">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#159FEF] shadow-sm">
                      <Calendar className="h-[18px] w-[18px]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-400">
                        Started On
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-800 break-words">
                        {formatDate(mySubscription.startDate)}
                      </p>
                    </div>
                  </div>

                  {/* VALID UNTIL */}

                  <div className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-[#30AFFF]/20 hover:bg-[#A0E9FF]/10">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#159FEF] shadow-sm">
                      <Calendar className="h-[18px] w-[18px]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-400">
                        Valid Until
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-800 break-words">
                        {formatDate(mySubscription.endDate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CANCEL ERROR */}

                {cancelError && (
                  <div className="mt-4 w-full rounded-2xl border border-red-100 bg-red-50 p-4">
                    <p className="text-sm leading-6 text-red-500 break-words">
                      {cancelError}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            SUBSCRIPTION HISTORY
        ====================================================== */}

        <section className="mt-12 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-14">
          {/* HEADER */}

          <div className="w-full border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A0E9FF]/40 text-[#159FEF]">
                <History className="h-[18px] w-[18px]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[#159FEF]">
                  Account History
                </p>

                <h2 className="mt-1 text-base font-black text-slate-900 sm:text-lg">
                  Subscription History
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  Aapke previous subscription plans
                </p>
              </div>
            </div>
          </div>

          {/* HISTORY CONTENT */}

          <div className="w-full p-5 sm:p-6">
            {/* LOADING */}

            {historyLoading ? (
              <div className="w-full space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-16 w-full animate-pulse rounded-2xl bg-slate-100"
                  />
                ))}
              </div>
            ) : !history || history.length === 0 ? (
              /* EMPTY */

              <div className="flex flex-col items-center justify-center py-10 text-center sm:py-12">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <History className="h-6 w-6" />
                </div>

                <p className="mt-4 text-sm font-bold text-slate-700 sm:text-base">
                  No Subscription History
                </p>

                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Abhi koi purani subscription nahi hai.
                </p>
              </div>
            ) : (
              /* HISTORY LIST */

              <div className="w-full space-y-3">
                {history.map((item) => {
                  const itemPlanName = item.subscription?.planName || "-";

                  const ItemIcon =
                    iconMap[itemPlanName] || Sparkles;

                  return (
                    <div
                      key={item._id}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#30AFFF]/30 hover:bg-[#A0E9FF]/10 hover:shadow-sm"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* PLAN INFORMATION */}

                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#159FEF] shadow-sm">
                            <ItemIcon className="h-[18px] w-[18px]" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-black text-slate-900 break-words">
                              {itemPlanName}
                            </p>

                            <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-slate-500">
                              <span className="break-words">
                                {formatDate(item.startDate)}
                              </span>

                              <span className="shrink-0 text-slate-300">
                                •
                              </span>

                              <span className="break-words">
                                {formatDate(item.endDate)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* STATUS */}

                        <div className="w-full shrink-0 sm:w-auto">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                              item.isActive
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                item.isActive
                                  ? "bg-emerald-500"
                                  : "bg-slate-400"
                              }`}
                            />

                            <span className="whitespace-nowrap">
                              {item.isActive ? "Active" : "Ended"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            SMALL CTA / INFORMATION CARD
        ====================================================== */}

        <section className="relative mt-12 overflow-hidden rounded-2xl bg-slate-900 p-6 sm:mt-14 sm:p-8 lg:p-10">
          <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#30AFFF]/20 blur-3xl" />

          <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[#A0E9FF]/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-[#A0E9FF]">
                <Sparkles size={17} />

                <span className="text-xs font-bold uppercase tracking-wider">
                  Subscription Benefits
                </span>
              </div>

              <h2 className="mt-3 text-xl font-black text-white sm:text-2xl">
                Make the most of your subscription.
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Continue using your plan benefits and explore opportunities
                available with your current subscription.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/subscription")}
              className="inline-flex w-full shrink-0 items-center justify-center rounded-xl bg-[#30AFFF] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#159FEF] hover:shadow-lg hover:shadow-[#30AFFF]/20 sm:w-fit"
            >
              View Plans
            </button>
          </div>
        </section>
      </div>

      {/* =====================================================
          CANCEL MODAL
      ====================================================== */}

      {showCancelConfirm && (
        <div className="fixed inset-0 z-[9999] flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-slate-950/60 p-4 backdrop-blur-sm sm:p-5">
          <div className="flex max-h-[94dvh] w-full max-w-[420px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:max-h-[90dvh] sm:rounded-3xl">
            {/* MODAL HEADER */}

            <div className="w-full shrink-0 border-b border-slate-100 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <XCircle className="h-[20px] w-[20px]" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-black text-slate-900 sm:text-lg">
                    Subscription cancel karni hai?
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    Ye action aapki current plan ko cancel kar dega.
                  </p>
                </div>
              </div>
            </div>

            {/* MODAL BODY */}

            <div className="w-full flex-1 overflow-y-auto p-5">
              <label className="text-xs font-bold text-slate-700 sm:text-sm">
                Cancellation Reason{" "}
                <span className="font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Reason likho (optional)"
                rows={4}
                className="mt-2 block min-h-[100px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#30AFFF] focus:bg-white focus:ring-4 focus:ring-[#A0E9FF]/30"
              />

              {cancelError && (
                <div className="mt-3 w-full rounded-2xl border border-red-100 bg-red-50 p-3">
                  <p className="text-xs leading-5 text-red-500 sm:text-sm break-words">
                    {cancelError}
                  </p>
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}

            <div className="w-full shrink-0 border-t border-slate-100 bg-slate-50 p-4">
              <div className="flex flex-col gap-2.5 sm:flex-row">
                {/* BACK */}

                <button
                  type="button"
                  onClick={() => {
                    if (!cancelLoading) {
                      setShowCancelConfirm(false);
                    }
                  }}
                  disabled={cancelLoading}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1"
                >
                  Wapas Jao
                </button>

                {/* CONFIRM */}

                <button
                  type="button"
                  onClick={handleCancelConfirm}
                  disabled={cancelLoading}
                  className="w-full rounded-xl bg-red-500 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-600 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:flex-1"
                >
                  {cancelLoading ? "Cancelling..." : "Haan, Cancel Karo"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MySubscription;

