
import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileText,
  HelpCircle,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const TermCondition = () => {
  const [activeSection, setActiveSection] = useState("acceptance");

  const sections = [
    {
      id: "acceptance",
      number: "01",
      title: "Acceptance of Terms",
    },
    {
      id: "using-platform",
      number: "02",
      title: "Using CareerSphere",
    },
    {
      id: "accounts",
      number: "03",
      title: "User Accounts",
    },
    {
      id: "jobs",
      number: "04",
      title: "Job Listings & Applications",
    },
    {
      id: "responsibilities",
      number: "05",
      title: "User Responsibilities",
    },
    {
      id: "payments",
      number: "06",
      title: "Subscriptions & Payments",
    },
    {
      id: "intellectual-property",
      number: "07",
      title: "Intellectual Property",
    },
    {
      id: "privacy",
      number: "08",
      title: "Privacy",
    },
    {
      id: "liability",
      number: "09",
      title: "Limitation of Liability",
    },
    {
      id: "third-party",
      number: "10",
      title: "Third-Party Services",
    },
    {
      id: "changes",
      number: "11",
      title: "Changes to These Terms",
    },
    {
      id: "termination",
      number: "12",
      title: "Account Termination",
    },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);

    const element = document.getElementById(id);

    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full overflow-hidden bg-white text-slate-900">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <div className="relative overflow-hidden border-b border-slate-100 bg-slate-50">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 -top-20 h-80 w-80 rounded-full bg-indigo-100/70 blur-3xl" />

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-blue-600 shadow-sm sm:text-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50">
                <FileText size={14} />
              </span>

              Legal Information
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Terms &
              <span className="text-blue-600"> Conditions</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7 lg:text-lg">
              Please read these terms carefully before using CareerSphere.
              They explain your rights, responsibilities, and the rules that
              apply when using our platform.
            </p>

            {/* Last Updated */}
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm ring-1 ring-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Last Updated: September 2026
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          QUICK INFO
      ====================================================== */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-px bg-slate-100 sm:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck size={19} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  Transparent Terms
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Clear and easy to understand
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <LockKeyhole size={19} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  Your Privacy Matters
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  We value your information
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <HelpCircle size={19} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  Need Help?
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Our support team is here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8 lg:py-4">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[290px_minmax(0,1fr)]">
          {/* =================================================
              LEFT SIDEBAR
          ================================================== */}
          <aside className="min-w-0">
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Sidebar Header */}
                <div className="border-b border-slate-100 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                    On This Page
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    Terms & Conditions
                  </p>
                </div>

                {/* Navigation */}
                <nav className="max-h-[520px] overflow-y-auto p-2">
                  {sections.map((section) => {
                    const isActive = activeSection === section.id;

                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
                          isActive
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-black ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                          }`}
                        >
                          {section.number}
                        </span>

                        <span className="min-w-0 flex-1 text-xs font-bold leading-4">
                          {section.title}
                        </span>

                        <ChevronRight
                          size={14}
                          className={`shrink-0 transition-transform ${
                            isActive
                              ? "translate-x-0 text-blue-600"
                              : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }`}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Sidebar Contact Card */}
              <div className="mt-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white shadow-lg shadow-blue-600/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <HelpCircle size={19} />
                </div>

                <h3 className="mt-4 text-base font-extrabold">
                  Have questions?
                </h3>

                <p className="mt-2 text-xs leading-5 text-blue-100">
                  If you need clarification about these terms, our team is
                  happy to help.
                </p>

                <Link
                  to="/contact"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-blue-600 transition hover:bg-blue-50"
                >
                  Contact Support
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </aside>

          {/* =================================================
              TERMS CONTENT
          ================================================== */}
          <main className="min-w-0">
            {/* Intro Card */}
            <div className="mb-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-5 sm:p-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <FileText size={18} />
                </div>

                <div>
                  <h2 className="text-base font-extrabold text-slate-900 sm:text-lg">
                    Welcome to CareerSphere
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    These Terms & Conditions govern your access to and use of
                    CareerSphere, including our website, job listings,
                    applications, profiles, subscriptions, and related
                    services.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 01 */}
            <section
              id="acceptance"
              className="scroll-mt-24 border-b border-slate-100 pb-4 sm:pb-4"
            >
              <SectionHeading number="01" title="Acceptance of Terms" />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                By accessing or using CareerSphere, you agree to be bound by
                these Terms & Conditions and all applicable laws and
                regulations.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                If you do not agree with any part of these terms, you should
                not access or use our website or services.
              </p>

              <InfoBox>
                Your continued use of CareerSphere after changes to these terms
                are published means that you accept the updated terms.
              </InfoBox>
            </section>

            {/* Section 02 */}
            <section
              id="using-platform"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading number="02" title="Using CareerSphere" />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                CareerSphere provides an online platform that helps job
                seekers discover employment opportunities, create professional
                profiles, save jobs, submit applications, and access
                career-related services.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                You agree to use the platform only for lawful and legitimate
                purposes.
              </p>

              <h3 className="mt-6 text-sm font-extrabold text-slate-800">
                You must not:
              </h3>

              <BulletList
                items={[
                  "Use the platform for fraudulent, misleading, or unlawful activities.",
                  "Provide false or misleading information.",
                  "Attempt to access another user's account.",
                  "Upload malicious files, harmful software, or unauthorized content.",
                  "Interfere with the security or operation of the platform.",
                  "Use automated systems to collect platform data without permission.",
                  "Use CareerSphere to distribute spam or unauthorized advertisements.",
                ]}
              />
            </section>

            {/* Section 03 */}
            <section
              id="accounts"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading number="03" title="User Accounts" />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Certain features of CareerSphere require you to create an
                account. You are responsible for maintaining the accuracy and
                security of your account information.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <MiniPoint title="Accurate Information">
                  Keep your profile and account information accurate and
                  updated.
                </MiniPoint>

                <MiniPoint title="Account Security">
                  Keep your password and login credentials confidential.
                </MiniPoint>

                <MiniPoint title="Authorized Access">
                  Do not allow unauthorized people to access your account.
                </MiniPoint>

                <MiniPoint title="Report Issues">
                  Notify us if you believe your account has been compromised.
                </MiniPoint>
              </div>
            </section>

            {/* Section 04 */}
            <section
              id="jobs"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading
                number="04"
                title="Job Listings & Applications"
              />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                CareerSphere may display job opportunities provided by
                companies, recruiters, partners, or other sources.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Although we aim to provide useful and accurate information,
                CareerSphere does not guarantee that every job listing will
                remain available or that all information will remain unchanged.
              </p>

              <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5">
                <p className="text-sm font-extrabold text-amber-800">
                  Important Notice
                </p>

                <p className="mt-2 text-sm leading-6 text-amber-700">
                  Users should independently verify important employment
                  information, including salary, benefits, employer details,
                  job requirements, and employment conditions before making
                  decisions.
                </p>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                CareerSphere does not make hiring decisions on behalf of
                employers. The final decision regarding interviews, selection,
                employment, salary, and other conditions belongs to the
                employer.
              </p>
            </section>

            {/* Section 05 */}
            <section
              id="responsibilities"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading number="05" title="User Responsibilities" />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                You are responsible for all information and content that you
                submit to CareerSphere.
              </p>

              <BulletList
                items={[
                  "Profile information",
                  "Resume or CV",
                  "Skills and work experience",
                  "Job applications",
                  "Messages and communications",
                  "Uploaded documents",
                ]}
              />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                You must ensure that submitted information is truthful,
                accurate, and does not violate applicable laws or the rights of
                another person or organization.
              </p>
            </section>

            {/* Section 06 */}
            <section
              id="payments"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading number="06" title="Subscriptions & Payments" />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Certain CareerSphere features may be available through paid
                subscription plans.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Before purchasing a subscription, users should review the
                applicable plan price, features, duration, usage limits,
                renewal conditions, cancellation rules, and refund policy.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <MiniPoint title="Plan Price">
                  Review the applicable price before completing a purchase.
                </MiniPoint>

                <MiniPoint title="Plan Features">
                  Subscription features may differ between available plans.
                </MiniPoint>

                <MiniPoint title="Payment Provider">
                  Payments may be processed through supported third-party
                  providers.
                </MiniPoint>

                <MiniPoint title="Pricing Changes">
                  Subscription pricing and features may change from time to
                  time.
                </MiniPoint>
              </div>
            </section>

            {/* Section 07 */}
            <section
              id="intellectual-property"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading number="07" title="Intellectual Property" />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                CareerSphere and its original content, design, branding,
                graphics, logos, software, and functionality are protected by
                applicable intellectual property laws.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                You may use CareerSphere for personal and legitimate
                career-related purposes. You may not reproduce, modify,
                distribute, sell, or commercially exploit proprietary
                CareerSphere content without appropriate authorization.
              </p>

              <InfoBox>
                User-submitted content remains the responsibility of the user
                who submitted it.
              </InfoBox>
            </section>

            {/* Section 08 */}
            <section
              id="privacy"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading number="08" title="Privacy" />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Your privacy is important to us. Information collected through
                CareerSphere may be used to provide, maintain, improve, and
                secure our services.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Your use of CareerSphere is also subject to our Privacy Policy.
                We encourage you to review the Privacy Policy to understand how
                information is collected and handled.
              </p>

              <Link
                to="/privacy-policy"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700"
              >
                Read Privacy Policy
                <ArrowRight size={15} />
              </Link>
            </section>

            {/* Section 09 */}
            <section
              id="liability"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading
                number="09"
                title="Limitation of Liability"
              />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                CareerSphere provides its services on an "as available" basis.
                To the extent permitted by applicable law, CareerSphere is not
                responsible for losses or damages resulting from:
              </p>

              <BulletList
                items={[
                  "Incorrect, incomplete, or outdated job information.",
                  "Employer decisions or actions.",
                  "Rejection of job applications.",
                  "Temporary service interruptions.",
                  "Third-party websites or services.",
                  "Unauthorized access resulting from compromised user credentials.",
                  "Information provided by other users or third parties.",
                ]}
              />
            </section>

            {/* Section 10 */}
            <section
              id="third-party"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading number="10" title="Third-Party Services" />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                CareerSphere may contain links or integrations to third-party
                websites, payment providers, recruitment services, or other
                external platforms.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                CareerSphere does not control third-party services and is not
                responsible for their content, availability, policies, or
                practices.
              </p>

              <InfoBox>
                Your use of third-party services may be subject to their own
                terms and privacy policies.
              </InfoBox>
            </section>

            {/* Section 11 */}
            <section
              id="changes"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading number="11" title="Changes to These Terms" />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                CareerSphere may update these Terms & Conditions from time to
                time.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                When significant changes are made, we may provide appropriate
                notice through the platform or other communication channels.
                Updated terms will become effective when published unless
                otherwise stated.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                We recommend reviewing this page periodically to stay informed
                about any changes.
              </p>
            </section>

            {/* Section 12 */}
            <section
              id="termination"
              className="scroll-mt-24 py-4 sm:py-4"
            >
              <SectionHeading number="12" title="Account Termination" />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                CareerSphere may restrict, suspend, or terminate access to an
                account if we reasonably believe that the user has violated
                these Terms & Conditions or misused the platform.
              </p>

              <h3 className="mt-6 text-sm font-extrabold text-slate-800">
                This may include:
              </h3>

              <BulletList
                items={[
                  "Violation of these Terms & Conditions.",
                  "Providing false or misleading information.",
                  "Misuse of the CareerSphere platform.",
                  "Attempts to compromise platform security.",
                  "Fraudulent or unlawful activities.",
                ]}
              />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Users may also stop using their CareerSphere account at any
                time, subject to applicable subscription and payment terms.
              </p>
            </section>

            {/* Agreement Box */}
            <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 sm:text-base">
                    Your Agreement
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    By continuing to access or use CareerSphere, you
                    acknowledge that you have read, understood, and agreed to
                    these Terms & Conditions.
                  </p>
                </div>
              </div>
            </div>
          </main>
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
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <HelpCircle size={23} />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                Need clarification?
              </p>

              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                We're Here to Help
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                If you have questions about our Terms & Conditions, feel free
                to reach out to our support team.
              </p>

              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl"
              >
                Contact Support
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

const SectionHeading = ({ number, title }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xs font-black text-white shadow-sm shadow-blue-600/20">
        {number}
      </div>

      <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
        {title}
      </h2>
    </div>
  );
};

const BulletList = ({ items }) => {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <CheckCircle2 size={13} />
          </span>

          <span className="text-sm leading-6 text-slate-600">{item}</span>
        </li>
      ))}
    </ul>
  );
};

const InfoBox = ({ children }) => {
  return (
    <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-4">
      <div className="flex gap-3">
        <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />

        <p className="text-sm leading-6 text-blue-800">{children}</p>
      </div>
    </div>
  );
};

const MiniPoint = ({ title, children }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-bold text-slate-800">{title}</p>

      <p className="mt-1 text-xs leading-5 text-slate-500">{children}</p>
    </div>
  );
};

export default TermCondition;

