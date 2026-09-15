import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Search,
  MessageCircleQuestion,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "What is DreamGoGlobal?",
      answer:
        "DreamGoGlobal is a job search platform that helps job seekers discover relevant opportunities, connect with companies, and take the next step in their career.",
    },
    {
      question: "How can I search for jobs?",
      answer:
        "You can search for jobs using keywords such as job title, skills, company name, or location. You can also use filters like experience, salary, work mode, department, and role category to find suitable opportunities.",
    },
    {
      question: "Do I need to create an account to apply for jobs?",
      answer:
        "Yes. Creating an account allows you to manage your profile, save jobs, track applications, and access other CareerSphere features.",
    },
    {
      question: "How do I apply for a job?",
      answer:
        "Open the job you are interested in, review the job details and requirements, and click the Apply button. Follow the application steps provided for that particular opportunity.",
    },
    {
      question: "Can I save jobs for later?",
      answer:
        "Yes. You can save interesting jobs using the bookmark option. Your saved jobs can be accessed later so you can review and apply when you are ready.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const query = searchTerm.toLowerCase().trim();

    if (!query) return true;

    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    );
  });

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  const handleSearch = (value) => {
    setSearchTerm(value);

    if (value.trim()) {
      setOpenIndex(0);
    }
  };

  return (
    <section className="w-full bg-white text-slate-900">
      {/* =====================================================
          HERO
      ====================================================== */}
      <div className="relative overflow-hidden border-b border-slate-100 bg-slate-50">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 -top-20 h-80 w-80 rounded-full bg-indigo-100/70 blur-3xl" />

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-blue-100/30 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-blue-600 shadow-sm sm:text-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50">
                <HelpCircle size={14} />
              </span>

              Help Center
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Frequently Asked
              <span className="block text-blue-600">Questions</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7 lg:text-lg">
              Find quick answers about jobs, applications, profiles,
              subscriptions, and everything you need to know about
              DreamGoGlobal.
            </p>

            {/* Search */}
            {/* <div className="mx-auto mt-3 max-w-2xl">
              <div className="group flex items-center rounded-2xl border border-slate-200 bg-white p-1.5 shadow-lg shadow-slate-900/5 transition-all duration-300 focus-within:border-blue-300 focus-within:shadow-xl focus-within:shadow-blue-900/10">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center text-slate-400">
                  <Search size={20} />
                </div>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search your question..."
                  className="min-w-0 flex-1 bg-transparent px-1 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setOpenIndex(0);
                    }}
                    className="mr-1 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                  >
                    Clear
                  </button>
                )}

                <div className="hidden rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white sm:block">
                  Search
                </div>
              </div>
            </div> */}

            {/* Quick Stats */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Quick Answers
              </div>

              <div className="hidden h-4 w-px bg-slate-200 sm:block" />

              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Easy to Understand
              </div>

              <div className="hidden h-4 w-px bg-slate-200 sm:block" />

              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-500" />
                24/7 Access
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FAQ CONTENT
      ====================================================== */}
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[320px_minmax(0,1fr)]">
          {/* =================================================
              LEFT SUPPORT
          ================================================== */}
          <div className="min-w-0">
            <div className="lg:sticky lg:top-24">
              {/* Support Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 p-6 text-white shadow-xl shadow-blue-600/15 sm:p-7">
                {/* Decorative Circles */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full border border-white/10 bg-white/10" />

                <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full border border-white/10 bg-white/5" />

                <div className="relative">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 shadow-inner">
                    <MessageCircleQuestion size={24} />
                  </div>

                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-blue-100">
                    Need assistance?
                  </p>

                  <h2 className="mt-2 text-2xl font-black leading-tight">
                    Can't find what you're looking for?
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-blue-100">
                    Our support team is ready to help you with your questions
                    and guide you through your job search journey.
                  </p>

                  {/* Button */}
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl"
                  >
                    Contact Support
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Quick Help Card */}
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <Sparkles size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Quick & Easy
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Search or browse our FAQs to find answers in seconds.
                    </p>
                  </div>
                </div>
              </div>

              {/* Small Trust Box */}
              <div className="mt-4 hidden rounded-2xl border border-slate-200 bg-white p-5 lg:block">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Support
                </p>

                <p className="mt-2 text-sm font-bold text-slate-800">
                  We're here when you need us.
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Get help with your account, applications, and job search.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT FAQ
          ================================================== */}
          <div className="min-w-0">
            {/* Heading */}
            <div className="mb-4 flex flex-col gap-2 border-b border-slate-100 pb-5 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  Help Center
                </p>

                <h2 className="mt-1.5 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  How can we help?
                </h2>
              </div>

              <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
                {filteredFaqs.length}{" "}
                {filteredFaqs.length === 1 ? "Question" : "Questions"}
              </div>
            </div>

            {/* FAQ List */}
            {filteredFaqs.length > 0 ? (
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={faq.question}
                      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                        isOpen
                          ? "border-blue-200 bg-blue-50/50 shadow-md shadow-blue-900/5"
                          : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-md hover:shadow-slate-900/5"
                      }`}
                    >
                      {/* Question */}
                      <button
                        type="button"
                        onClick={() => handleToggle(index)}
                        className="flex w-full min-w-0 items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-5"
                        aria-expanded={isOpen}
                      >
                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                          {/* Number */}
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-all duration-300 ${
                              isOpen
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          {/* Question */}
                          <span
                            className={`min-w-0 break-words text-sm font-bold leading-5 sm:text-base sm:leading-6 ${
                              isOpen
                                ? "text-blue-700"
                                : "text-slate-800"
                            }`}
                          >
                            {faq.question}
                          </span>
                        </div>

                        {/* Arrow */}
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            isOpen
                              ? "rotate-180 border-blue-600 bg-blue-600 text-white"
                              : "border-slate-200 bg-white text-slate-500"
                          }`}
                        >
                          <ChevronDown size={17} />
                        </div>
                      </button>

                      {/* Answer */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="border-t border-blue-100 px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pl-[76px]">
                            <p className="text-sm leading-6 text-slate-500 sm:text-[15px] sm:leading-7">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* No Results */
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                  <Search size={22} />
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-800 sm:text-lg">
                  No questions found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  We couldn't find any FAQ matching your search. Try using
                  different keywords.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setOpenIndex(0);
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-700"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      <div className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-5 py-4 text-center sm:px-8 sm:py-4 lg:px-12">
            {/* Decorations */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              {/* Icon */}
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <MessageCircleQuestion size={23} />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                We're here to help
              </p>

              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Still Have Questions?
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Can't find the answer you need? Get in touch with our team and
                we'll be happy to help.
              </p>

              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl"
              >
                Get in Touch
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;