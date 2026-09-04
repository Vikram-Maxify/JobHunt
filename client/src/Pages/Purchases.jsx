import {
  ArrowLeft,
  Check,
  Crown,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  buySubscription,
  createSubscriptionOrder,
  fetchMySubscription,
  verifySubscriptionPayment,
} from "../redux/slicer/userSubscriptionSlice";
import FeedbackModal from "../components/FeedbackModal";

const iconMap = {
  Free: Zap,
  Advanced: Sparkles,
  Premium: Crown,
};

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Purchases = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const subscriptionId = location.state?.subscriptionId;
  const planName = location.state?.planName;
  const price = location.state?.price ?? 0;
  const features = location.state?.features || [];

  useEffect(() => {
    if (!subscriptionId) {
      navigate("/subscription");
    }
  }, [subscriptionId, navigate]);

  const PlanIcon = iconMap[planName] || Sparkles;
  const isFree = price <= 0;

  const tax = Math.round(price * 0.18);
  const total = price + tax;

  const handleFreeActivation = async () => {
    setProcessing(true);
    setErrorMsg(null);

    try {
      await dispatch(
        buySubscription({
          subscriptionId,
          paymentMethod: "free",
          paymentId: `FREE-${Date.now()}`,
          autoRenew: false,
        }),
      ).unwrap();

      await dispatch(fetchMySubscription()).unwrap();
      setFeedback({
        title: "Purchase successful",
        message: `${planName} plan is now active. A confirmation email has been sent to your registered email address.`,
        type: "success",
      });
      setTimeout(() => navigate("/my-subscription"), 1200);
    } catch (err) {
      setErrorMsg(err || "Activation failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handlePayment = async () => {
    setProcessing(true);
    setErrorMsg(null);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        setErrorMsg(
          "Unable to load the secure payment gateway. Please check your internet connection and try again.",
        );
        setProcessing(false);
        return;
      }

      const order = await dispatch(
        createSubscriptionOrder({ subscriptionId }),
      ).unwrap();

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "CareerSphere",
        description: `${planName} Plan Subscription`,
        order_id: order.orderId,

        handler: async function (response) {
          try {
            await dispatch(
              verifySubscriptionPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                subscriptionId,
                autoRenew: false,
              }),
            ).unwrap();

            await dispatch(fetchMySubscription()).unwrap();
            setFeedback({
              title: "Payment successful",
              message:
                "Your subscription is now active. A confirmation email has been sent to your registered email address.",
              type: "success",
            });
            setTimeout(() => navigate("/my-subscription"), 1200);
          } catch (err) {
            setErrorMsg(err || "Payment verification failed.");
          } finally {
            setProcessing(false);
          }
        },

        modal: {
          ondismiss: function () {
            setProcessing(false);
          },
        },

        theme: {
          color: "#2563EB",
        },
      };

      const razorpayObject = new window.Razorpay(options);

      razorpayObject.on("payment.failed", function (response) {
        setErrorMsg(
          response.error?.description || "Payment failed. Please try again.",
        );
        setProcessing(false);
      });

      razorpayObject.open();
    } catch (err) {
      setErrorMsg(err || "Unable to start payment. Please try again.");
      setProcessing(false);
    }
  };

  if (!subscriptionId) return null;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f8ff] text-[#0f172a]">
      {/* Header */}
      <header className="border-b border-[#dbe4f0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
          <button
            onClick={() => navigate("/subscription")}
            className="group flex items-center gap-2 rounded-lg px-1 py-2 text-sm font-semibold text-[#64748b] transition hover:text-[#2563eb]"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            <span>Back to Plans</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#bfdbfe] bg-[#eff6ff] text-[#2563eb]">
              <LockKeyhole size={16} />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-[#172033]">
                Secure Checkout
              </p>
              <p className="text-[11px] text-[#94a3b8]">Protected payment</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#e2e8f0] bg-white">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#60a5fa]/10 blur-3xl" />
        <div className="absolute -left-28 bottom-[-180px] h-80 w-80 rounded-full bg-[#2563eb]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-6 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:pb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#2563eb]">
              <Sparkles size={14} />
              CareerSphere Premium Checkout
            </div>

            <h1 className="mt-4 text-[29px] font-black leading-[1.08] tracking-[-0.035em] text-[#0f172a] sm:mt-5 sm:text-4xl lg:text-5xl">
              Complete your
              <span className="block bg-gradient-to-r from-[#1d4ed8] to-[#1d4ed8] bg-clip-text text-transparent">
                subscription securely.
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-[13px] leading-5.5 text-[#64748b] sm:text-base sm:leading-7">
              Unlock premium career tools with a secure and seamless checkout
              experience designed for every device.
            </p>
          </div>
        </div>
      </section>

      {/* Checkout */}
      <section className="px-3.5 py-4.5 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_410px] xl:grid-cols-[minmax(0,1fr)_440px] ">
          {/* Left column */}

          <aside className="lg:sticky lg:top-5 lg:self-start">
            <div className="overflow-hidden rounded-[22px] border border-[#bfdbfe] bg-white shadow-[0_12px_36px_rgba(30,64,175,0.12)] sm:rounded-[28px]">
              <div className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6] p-6 text-white sm:p-7">
                <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full border-[22px] border-white/10" />
                <div className="absolute -bottom-20 -left-12 h-40 w-40 rounded-full border-[18px] border-white/10" />

                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#dbeafe]">
                    Order Summary
                  </p>

                  <div className="mt-2.5 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-[22px] font-black tracking-tight sm:text-2xl">
                        {planName}
                      </h2>
                      <p className="mt-1 text-sm text-[#dbeafe]">
                        Premium subscription
                      </p>
                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                      <PlanIcon size={22} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-7">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-[#64748b]">
                      {planName} subscription
                    </span>
                    <span className="font-bold text-[#0f172a]">
                      ₹{price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {!isFree && (
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-[#64748b]">GST (18%)</span>
                      <span className="font-bold text-[#0f172a]">
                        ₹{tax.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  <div className="h-px bg-[#e2e8f0]" />

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
                        Total payable
                      </p>
                    </div>
                    <span className="text-[28px] font-black tracking-tight text-[#2563eb] sm:text-3xl">
                      ₹{isFree ? 0 : total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={isFree ? handleFreeActivation : handlePayment}
                  disabled={processing}
                  className="mt-6 flex min-h-12 w-full sm:mt-7 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] py-4 text-sm font-black text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)] transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {processing ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <LockKeyhole size={17} />
                      {isFree
                        ? "Activate for Free"
                        : `Pay ₹${total.toLocaleString("en-IN")}`}
                    </>
                  )}
                </button>

                <div className="mt-4 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-3.5 sm:mt-5 sm:p-4">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-[#2563eb]">
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-black text-[#172033]">
                        Secure & Protected
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#64748b]">
                        Your payment details are encrypted and securely
                        processed by Razorpay. CareerSphere does not store your
                        card details.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-medium text-[#94a3b8]">
                  <LockKeyhole size={12} />
                  <span>Secure checkout • Encrypted payment</span>
                </div>

                <p className="mt-3 text-center text-[10px] leading-5 text-[#94a3b8]">
                  By continuing, you agree to CareerSphere's Terms of Service
                  and Subscription Policy.
                </p>
              </div>
            </div>
          </aside>

          <div className="space-y-5">
            {/* Selected plan */}
            <div className="overflow-hidden rounded-[22px] border border-[#dbe3ef] bg-white shadow-[0_10px_30px_rgba(30,64,175,0.07)] sm:rounded-[26px]">
              <div className="h-1.5 bg-gradient-to-r from-[#1d4ed8] via-[#60a5fa] to-[#1d4ed8]" />

              <div className="p-4 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14 border border-[#bfdbfe] bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] text-[#2563eb] shadow-sm">
                      <PlanIcon size={25} strokeWidth={2.1} />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2563eb]">
                        Selected Plan
                      </p>
                      <h2 className="mt-1 text-xl font-black text-[#0f172a] sm:text-2xl">
                        {planName} Plan
                      </h2>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/subscription")}
                    className="self-start rounded-xl border border-[#dbe3ef] px-4 py-2 text-sm font-bold text-[#1d4ed8] transition hover:border-[#60a5fa] hover:bg-[#eff6ff] sm:self-center"
                  >
                    Change Plan
                  </button>
                </div>

                <div className="mt-5 border-t border-[#edf2f7] pt-4 sm:mt-6 sm:pt-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
                    Included benefits
                  </p>

                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2.5 rounded-xl bg-[#f8fafc] px-3 py-2.5 text-[13px] leading-5 text-[#475569]"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#dbeafe] text-[#2563eb]">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span>{feature.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment information */}
            {!isFree && (
              <div className="rounded-[26px] border border-[#dbe3ef] bg-white p-5 shadow-[0_14px_45px_rgba(30,64,175,0.05)] sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-[#2563eb]">
                    <ShieldCheck size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-[#0f172a] sm:text-xl">
                      Secure Payment
                    </h2>
                    <p className="mt-1.5 text-sm leading-6 text-[#64748b]">
                      Select your preferred payment method in the secure
                      Razorpay checkout. You can pay using UPI, cards, or net
                      banking.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {["UPI", "Credit / Debit Cards", "Net Banking"].map(
                    (method) => (
                      <div
                        key={method}
                        className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-3 text-center text-xs font-bold text-[#6c6356]"
                      >
                        {method}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-600">
                {errorMsg}
              </div>
            )}
          </div>

          {/* Order summary */}
        </div>
      </section>
      {feedback && (
        <FeedbackModal {...feedback} onClose={() => setFeedback(null)} />
      )}
    </main>
  );
};

export default Purchases;
