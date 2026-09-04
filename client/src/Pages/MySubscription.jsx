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

  useEffect(() => {
    dispatch(fetchMySubscription());
    dispatch(fetchSubscriptionHistory());
  }, [dispatch]);

  useEffect(() => {
    if (cancelSuccess) {
      setShowCancelConfirm(false);
      setCancelReason("");
      dispatch(fetchSubscriptionHistory());
      dispatch(resetCancelState());
    }
  }, [cancelSuccess, dispatch]);

  const handleCancelConfirm = () => {
    dispatch(
      cancelSubscription({
        cancellationReason: cancelReason || undefined,
      })
    );
  };

  const planName =
    mySubscription?.subscriptionDetails?.planName ||
    mySubscription?.subscription?.planName;

  const PlanIcon = iconMap[planName] || Sparkles;

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}
      <div className="mx-auto w-full max-w-[1200px] px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
        
        {/* =====================================================
            PAGE HEADER
        ====================================================== */}
        <div className="mb-4 sm:mb-6 md:mb-7">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 sm:h-11 sm:w-11 md:h-12 md:w-12 md:rounded-2xl">
              <Crown className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-extrabold leading-tight text-slate-900 sm:text-xl md:text-2xl lg:text-3xl">
                My Subscription
              </h1>
              <p className="mt-0.5 text-xs leading-5 text-slate-500 sm:text-sm">
                Manage your current plan and subscription history.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            CURRENT SUBSCRIPTION
        ====================================================== */}
        <section className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl md:rounded-3xl">
          <div className="w-full p-4 sm:p-5 md:p-6 lg:p-8">
            
            {/* =================================================
                LOADING
            ================================================== */}
            {myLoading && (
              <div className="w-full">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-slate-200 sm:h-14 sm:w-14 md:h-16 md:w-16 md:rounded-2xl" />
                  <div className="min-w-0 flex-1">
                    <div className="h-5 w-32 max-w-full animate-pulse rounded bg-slate-200" />
                    <div className="mt-2 h-4 w-20 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="h-14 w-full animate-pulse rounded-xl bg-slate-100 sm:h-16" />
                  <div className="h-14 w-full animate-pulse rounded-xl bg-slate-100 sm:h-16" />
                </div>
              </div>
            )}

            {/* =================================================
                ERROR
            ================================================== */}
            {!myLoading && myError && (
              <div className="w-full rounded-xl border border-red-100 bg-red-50 p-3 sm:p-4">
                <p className="text-sm leading-6 text-red-600 break-words">
                  {myError}
                </p>
              </div>
            )}

            {/* =================================================
                NO SUBSCRIPTION
            ================================================== */}
            {!myLoading && !myError && !mySubscription && (
              <div className="flex flex-col items-center justify-center px-2 py-8 text-center sm:py-10 md:py-12">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 sm:h-14 sm:w-14 md:h-16 md:w-16">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                </div>
                <h2 className="mt-3 text-base font-extrabold text-slate-900 sm:text-lg md:text-xl">
                  No Active Subscription
                </h2>
                <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm">
                  Abhi aapke account par koi active subscription nahi hai.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/subscription")}
                  className="mt-5 w-full max-w-xs rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-indigo-700 active:scale-[0.98] touch-manipulation"
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
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start md:items-center md:justify-between">
                  {/* Plan Info */}
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-500/20 sm:h-14 sm:w-14 md:h-16 md:w-16 md:rounded-2xl">
                      <PlanIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-extrabold leading-tight text-slate-900 sm:text-lg md:text-xl lg:text-2xl break-words">
                          {planName || "Subscription"} Plan
                        </h2>
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 sm:text-xs">
                          <CheckCircle2 className="h-3 w-3" />
                          Active
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] leading-5 text-slate-500 sm:text-xs">
                        Your current subscription plan
                      </p>
                    </div>
                  </div>

                  {/* Cancel Button */}
                  <div className="w-full sm:w-auto sm:shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowCancelConfirm(true)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-bold text-red-500 transition hover:border-red-300 hover:bg-red-50 active:scale-[0.98] touch-manipulation sm:w-auto sm:px-5 sm:py-3 sm:text-sm"
                    >
                      <XCircle className="h-4 w-4 shrink-0" />
                      <span>Cancel Subscription</span>
                    </button>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="my-4 h-px w-full bg-slate-100 sm:my-5 md:my-6" />

                {/* DATES */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Started On */}
                  <div className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 sm:rounded-2xl sm:p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-500 shadow-sm sm:h-10 sm:w-10">
                      <Calendar className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium text-slate-400 sm:text-xs">
                        Started On
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-slate-800 sm:text-sm break-words">
                        {formatDate(mySubscription.startDate)}
                      </p>
                    </div>
                  </div>

                  {/* Valid Until */}
                  <div className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 sm:rounded-2xl sm:p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-500 shadow-sm sm:h-10 sm:w-10">
                      <Calendar className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium text-slate-400 sm:text-xs">
                        Valid Until
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-slate-800 sm:text-sm break-words">
                        {formatDate(mySubscription.endDate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CANCEL ERROR */}
                {cancelError && (
                  <div className="mt-4 w-full rounded-xl border border-red-100 bg-red-50 p-3 sm:p-4">
                    <p className="text-xs leading-5 text-red-500 sm:text-sm break-words">
                      {cancelError}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            HISTORY
        ====================================================== */}
        <section className="mt-5 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:mt-6 sm:rounded-2xl md:mt-7 md:rounded-3xl">
          {/* Header */}
          <div className="w-full border-b border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4 md:px-6 md:py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 sm:h-10 sm:w-10">
                <History className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-extrabold text-slate-900 sm:text-base md:text-lg">
                  Subscription History
                </h2>
                <p className="mt-0.5 text-[10px] leading-5 text-slate-500 sm:text-xs">
                  Aapke previous subscription plans
                </p>
              </div>
            </div>
          </div>

          {/* History Content */}
          <div className="w-full p-4 sm:p-5 md:p-6">
            {historyLoading ? (
              <div className="w-full space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-14 w-full animate-pulse rounded-xl bg-slate-100 sm:h-16 sm:rounded-2xl"
                  />
                ))}
              </div>
            ) : !history || history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center sm:py-10">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400 sm:h-12 sm:w-12 sm:rounded-2xl">
                  <History className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-600">
                  No Subscription History
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Abhi koi purani subscription nahi hai.
                </p>
              </div>
            ) : (
              <div className="w-full space-y-3">
                {history.map((item) => {
                  const itemPlanName = item.subscription?.planName || "-";
                  const ItemIcon = iconMap[itemPlanName] || Sparkles;

                  return (
                    <div
                      key={item._id}
                      className="w-full rounded-xl border border-slate-100 bg-slate-50 p-3 transition hover:border-indigo-100 hover:bg-indigo-50/30 sm:rounded-2xl sm:p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        {/* Plan Information */}
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-500 shadow-sm sm:h-10 sm:w-10">
                            <ItemIcon className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-extrabold text-slate-900 sm:text-sm break-words">
                              {itemPlanName}
                            </p>
                            <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] text-slate-500 sm:text-xs">
                              <span className="break-words">
                                {formatDate(item.startDate)}
                              </span>
                              <span className="shrink-0 text-slate-300">•</span>
                              <span className="break-words">
                                {formatDate(item.endDate)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="w-full shrink-0 sm:w-auto">
                          <span
                            className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold sm:text-xs ${
                              item.isActive
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                item.isActive ? "bg-emerald-500" : "bg-slate-400"
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
      </div>

      {/* =====================================================
          CANCEL MODAL
      ====================================================== */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-[9999] flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-slate-950/60 p-4 backdrop-blur-sm sm:p-5">
          <div className="flex max-h-[94dvh] w-full max-w-[420px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[90dvh] sm:rounded-3xl">
            {/* Modal Header */}
            <div className="w-full shrink-0 border-b border-slate-100 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 sm:h-10 sm:w-10">
                  <XCircle className="h-4 w-4 sm:h-[22px] sm:w-[22px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-extrabold text-slate-900 sm:text-lg break-words">
                    Subscription cancel karni hai?
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm break-words">
                    Ye action aapki current plan ko cancel kar dega.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="w-full flex-1 overflow-y-auto p-4 sm:p-5">
              <label className="text-xs font-bold text-slate-700 sm:text-sm">
                Cancellation Reason{" "}
                <span className="font-normal text-slate-400">(Optional)</span>
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Reason likho (optional)"
                rows={4}
                className="mt-2 block min-h-[100px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs leading-5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 sm:rounded-2xl sm:px-4 sm:text-sm"
              />
              {cancelError && (
                <div className="mt-3 w-full rounded-xl border border-red-100 bg-red-50 p-3">
                  <p className="text-xs leading-5 text-red-500 sm:text-sm break-words">
                    {cancelError}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="w-full shrink-0 border-t border-slate-100 bg-slate-50 p-3 sm:p-4">
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowCancelConfirm(false)}
                  disabled={cancelLoading}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] touch-manipulation disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1 sm:text-sm"
                >
                  Wapas Jao
                </button>
                <button
                  type="button"
                  onClick={handleCancelConfirm}
                  disabled={cancelLoading}
                  className="w-full rounded-xl bg-red-500 py-3 text-xs font-bold text-white shadow-md transition hover:bg-red-600 active:scale-[0.98] touch-manipulation disabled:cursor-not-allowed disabled:opacity-70 sm:flex-1 sm:text-sm"
                >
                  {cancelLoading ? "Cancelling..." : "Haan, Cancel Karo"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySubscription;