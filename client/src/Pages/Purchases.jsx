import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CreditCard,
  ShieldCheck,
  LockKeyhole,
  Sparkles,
  Crown,
  Zap,
  BadgeCheck,
  WalletCards,
} from "lucide-react";

const Purchases = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const selectedPlan = location.state?.plan || "Pro";
  const billing = location.state?.billing || "monthly";

  const monthlyPrice = location.state?.monthlyPrice ?? 499;
  const yearlyPrice = location.state?.yearlyPrice ?? 4990;

  const planDetails = {
    Free: {
      icon: Zap,
      description: "Perfect for getting started",
      features: [
        "Create professional profile",
        "Basic job search",
        "Save jobs",
        "Basic career resources",
        "Limited applications",
      ],
    },
    Pro: {
      icon: Sparkles,
      description: "For active job seekers",
      features: [
        "AI career matching",
        "Advanced skill analysis",
        "Professional resume builder",
        "Unlimited job applications",
        "Advanced job filters",
        "Application tracking",
      ],
    },
    Premium: {
      icon: Crown,
      description: "Complete career support",
      features: [
        "Personal career guidance",
        "Mentor sessions",
        "Resume review",
        "Interview preparation",
        "Priority opportunities",
        "Exclusive jobs",
      ],
    },
  };

  const currentPlan = planDetails[selectedPlan] || planDetails.Pro;
  const PlanIcon = currentPlan.icon;

  const price = useMemo(() => {
    if (selectedPlan === "Free") return 0;

    return billing === "yearly"
      ? yearlyPrice
      : monthlyPrice;
  }, [selectedPlan, billing, monthlyPrice, yearlyPrice]);

  const tax = Math.round(price * 0.18);
  const total = price + tax;

  const billingLabel =
    billing === "yearly" ? "Yearly billing" : "Monthly billing";

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Payment process started!");
    }, 1200);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-900">
      {/* =====================================================
          TOP HEADER
      ====================================================== */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <button
            onClick={() => navigate("/subscription")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
          >
            <ArrowLeft size={18} />
            <span>Back to Plans</span>
          </button>

          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <LockKeyhole size={15} />
            </div>
            <span className="hidden sm:block">Secure Checkout</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <section className="px-5 pb-7 pt-8 sm:px-8 sm:pt-10 lg:px-10 lg:pb-9">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-600 sm:text-sm">
              <Sparkles size={15} />
              CareerSphere Checkout
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Complete your
              <span className="block text-indigo-600">
                subscription
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              You're one step away from unlocking powerful career tools
              designed to help you find better opportunities and grow faster.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CHECKOUT
      ====================================================== */}
      <section className="px-5 pb-12 sm:px-8 lg:px-10 lg:pb-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_400px] lg:items-start xl:grid-cols-[1fr_430px]">
          {/* =================================================
              LEFT SIDE
          ================================================== */}
          <div className="space-y-6">
            {/* Selected Plan */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                    <PlanIcon size={25} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        {selectedPlan} Plan
                      </h2>

                      {selectedPlan === "Pro" && (
                        <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                          Popular
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      {currentPlan.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/subscription")}
                  className="self-start text-sm font-bold text-indigo-600 transition hover:text-indigo-700 sm:self-center"
                >
                  Change plan
                </button>
              </div>

              <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
                {currentPlan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Check size={12} strokeWidth={3} />
                    </span>

                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Billing */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Billing information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your subscription billing cycle
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {billingLabel}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {billing === "yearly"
                        ? "You'll be charged once every year."
                        : "You'll be charged once every month."}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-indigo-600">
                      ₹{price.toLocaleString("en-IN")}
                    </p>

                    <p className="text-xs text-slate-500">
                      {billing === "yearly" ? "/year" : "/month"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Payment method
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select your preferred payment method
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {/* Card */}
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-2xl border p-4 text-left transition ${
                    paymentMethod === "card"
                      ? "border-indigo-500 bg-indigo-50/60 shadow-sm"
                      : "border-slate-200 bg-white hover:border-indigo-200"
                  }`}
                >
                  <CreditCard
                    size={21}
                    className={
                      paymentMethod === "card"
                        ? "text-indigo-600"
                        : "text-slate-500"
                    }
                  />

                  <p className="mt-3 text-sm font-bold text-slate-900">
                    Card
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Credit / Debit
                  </p>
                </button>

                {/* UPI */}
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`rounded-2xl border p-4 text-left transition ${
                    paymentMethod === "upi"
                      ? "border-indigo-500 bg-indigo-50/60 shadow-sm"
                      : "border-slate-200 bg-white hover:border-indigo-200"
                  }`}
                >
                  <WalletCards
                    size={21}
                    className={
                      paymentMethod === "upi"
                        ? "text-indigo-600"
                        : "text-slate-500"
                    }
                  />

                  <p className="mt-3 text-sm font-bold text-slate-900">
                    UPI
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Google Pay / PhonePe
                  </p>
                </button>

                {/* Net Banking */}
                <button
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`rounded-2xl border p-4 text-left transition ${
                    paymentMethod === "netbanking"
                      ? "border-indigo-500 bg-indigo-50/60 shadow-sm"
                      : "border-slate-200 bg-white hover:border-indigo-200"
                  }`}
                >
                  <BadgeCheck
                    size={21}
                    className={
                      paymentMethod === "netbanking"
                        ? "text-indigo-600"
                        : "text-slate-500"
                    }
                  />

                  <p className="mt-3 text-sm font-bold text-slate-900">
                    Net Banking
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    All major banks
                  </p>
                </button>
              </div>

              {/* Card Form */}
              {paymentMethod === "card" && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Card number
                    </label>

                    <div className="relative">
                      <CreditCard
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Expiry date
                    </label>

                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      CVV
                    </label>

                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Name on card
                    </label>

                    <input
                      type="text"
                      placeholder="Enter name as shown on card"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                    />
                  </div>
                </div>
              )}

              {/* UPI */}
              {paymentMethod === "upi" && (
                <div className="mt-6">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    UPI ID
                  </label>

                  <input
                    type="text"
                    placeholder="yourname@upi"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Enter your valid UPI ID to continue.
                  </p>
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === "netbanking" && (
                <div className="mt-6">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Select your bank
                  </label>

                  <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50">
                    <option>Select bank</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Punjab National Bank</option>
                    <option>Bank of Baroda</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE - ORDER SUMMARY
          ================================================== */}
          <div className="lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              {/* Summary Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white sm:p-7">
                <p className="text-sm font-medium text-indigo-100">
                  Order summary
                </p>

                <div className="mt-2 flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold">
                    {selectedPlan} Plan
                  </h2>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <PlanIcon size={22} />
                  </div>
                </div>

                <p className="mt-1 text-sm text-indigo-100">
                  {billingLabel}
                </p>
              </div>

              {/* Price */}
              <div className="p-5 sm:p-7">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      {selectedPlan} subscription
                    </span>

                    <span className="font-semibold text-slate-900">
                      ₹{price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      GST (18%)
                    </span>

                    <span className="font-semibold text-slate-900">
                      ₹{tax.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="h-px bg-slate-100" />

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-indigo-600">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <LockKeyhole size={17} />
                      Pay ₹{total.toLocaleString("en-IN")}
                    </>
                  )}
                </button>

                {/* Security */}
                <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <ShieldCheck size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Secure payment
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Your payment information is encrypted and securely
                        processed.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
                  By continuing, you agree to CareerSphere's terms and
                  subscription policy.
                </p>
              </div>
            </div>

            {/* Support */}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-center">
              <p className="text-sm font-semibold text-slate-700">
                Need help?
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Contact CareerSphere support if you have any questions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Purchases;