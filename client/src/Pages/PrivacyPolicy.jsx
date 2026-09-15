
import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileText,
  HelpCircle,
  LockKeyhole,
  ShieldCheck,
  UserRound,
  Database,
  Cookie,
  Globe2,
} from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("information");

  const sections = [
    {
      id: "information",
      number: "01",
      title: "Information We Collect",
    },
    {
      id: "automatic",
      number: "02",
      title: "Information Collected Automatically",
    },
    {
      id: "usage",
      number: "03",
      title: "How We Use Your Information",
    },
    {
      id: "employers",
      number: "04",
      title: "Job Applications & Employers",
    },
    {
      id: "sharing",
      number: "05",
      title: "How We Share Information",
    },
    {
      id: "cookies",
      number: "06",
      title: "Cookies & Technologies",
    },
    {
      id: "security",
      number: "07",
      title: "Data Security",
    },
    {
      id: "retention",
      number: "08",
      title: "Data Retention",
    },
    {
      id: "choices",
      number: "09",
      title: "Your Privacy Choices",
    },
    {
      id: "children",
      number: "10",
      title: "Children's Privacy",
    },
    {
      id: "third-party",
      number: "11",
      title: "Third-Party Services",
    },
    {
      id: "transfers",
      number: "12",
      title: "International Data Transfers",
    },
    {
      id: "changes",
      number: "13",
      title: "Changes to This Policy",
    },
    {
      id: "contact",
      number: "14",
      title: "Contact Us",
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
                <LockKeyhole size={14} />
              </span>

              Privacy & Security
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Privacy
              <span className="text-blue-600"> Policy</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7 lg:text-lg">
              Your privacy matters to us. Learn how CareerSphere collects,
              uses, protects, and manages your personal information.
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
          PRIVACY HIGHLIGHTS
      ====================================================== */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-px bg-slate-100 sm:grid-cols-3">
          {/* Highlight 1 */}
          <div className="bg-white px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck size={19} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  Your Data Matters
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  We take privacy seriously
                </p>
              </div>
            </div>
          </div>

          {/* Highlight 2 */}
          <div className="bg-white px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <LockKeyhole size={19} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  Secure Information
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Designed with security in mind
                </p>
              </div>
            </div>
          </div>

          {/* Highlight 3 */}
          <div className="bg-white px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <UserRound size={19} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-800">
                  Your Choices
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Manage your information
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
              {/* Navigation Card */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="border-b border-slate-100 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                    On This Page
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    Privacy Policy
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

              {/* Contact Card */}
              <div className="mt-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white shadow-lg shadow-blue-600/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <HelpCircle size={19} />
                </div>

                <h3 className="mt-4 text-base font-extrabold">
                  Privacy Questions?
                </h3>

                <p className="mt-2 text-xs leading-5 text-blue-100">
                  Need help understanding how your information is handled?
                  We're here to help.
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
              POLICY CONTENT
          ================================================== */}
          <main className="min-w-0">
            {/* Intro */}
            <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50/50 p-5 sm:p-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <h2 className="text-base font-extrabold text-slate-900 sm:text-lg">
                    Your Privacy Matters
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    This Privacy Policy explains what information CareerSphere
                    collects, why we collect it, how we use it, and the choices
                    available to you.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                01. INFORMATION WE COLLECT
            ================================================== */}
            <section
              id="information"
              className="scroll-mt-24 border-b border-slate-100 pb-4 sm:pb-4"
            >
              <SectionHeading
                number="01"
                title="Information We Collect"
              />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                We may collect information that you provide directly when
                creating or using your CareerSphere account and services.
              </p>

              <h3 className="mt-6 text-sm font-extrabold text-slate-800">
                Account Information
              </h3>

              <BulletList
                items={[
                  "Full name",
                  "Email address",
                  "Mobile number",
                  "Password or authentication information",
                  "Location",
                  "Profile information",
                ]}
              />

              <h3 className="mt-6 text-sm font-extrabold text-slate-800">
                Professional Information
              </h3>

              <BulletList
                items={[
                  "Resume or CV",
                  "Educational qualifications",
                  "Work experience",
                  "Skills",
                  "Current company",
                  "Job title",
                  "Professional preferences",
                  "Salary expectations",
                  "Portfolio or professional profile links",
                ]}
              />

              <h3 className="mt-6 text-sm font-extrabold text-slate-800">
                Uploaded Documents
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                You may choose to upload documents such as resumes, profile
                photos, or other documents required for specific platform
                features.
              </p>
            </section>

            {/* =================================================
                02. AUTOMATIC INFORMATION
            ================================================== */}
            <section
              id="automatic"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading
                number="02"
                title="Information Collected Automatically"
              />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                When you access CareerSphere, certain technical information may
                be collected automatically.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <MiniPoint
                  icon={<Globe2 size={17} />}
                  title="Device & Browser"
                >
                  Browser type, operating system, and device-related
                  information.
                </MiniPoint>

                <MiniPoint
                  icon={<Database size={17} />}
                  title="Technical Data"
                >
                  IP address and technical logs may be collected.
                </MiniPoint>

                <MiniPoint
                  icon={<FileText size={17} />}
                  title="Usage Information"
                >
                  Pages visited and interactions with our platform.
                </MiniPoint>

                <MiniPoint
                  icon={<ShieldCheck size={17} />}
                  title="Security Logs"
                >
                  Information that helps us detect and prevent security issues.
                </MiniPoint>
              </div>
            </section>

            {/* =================================================
                03. HOW WE USE
            ================================================== */}
            <section
              id="usage"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading
                number="03"
                title="How We Use Your Information"
              />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                We may use collected information to provide, maintain,
                personalize, improve, and secure CareerSphere services.
              </p>

              <BulletList
                items={[
                  "Create and manage your CareerSphere account.",
                  "Provide job search and application services.",
                  "Show relevant job opportunities.",
                  "Process and manage job applications.",
                  "Allow you to save and manage jobs.",
                  "Provide subscription-related services.",
                  "Communicate with you about your account.",
                  "Respond to support requests.",
                  "Improve our website and services.",
                  "Detect fraud, abuse, and security threats.",
                  "Maintain the security and reliability of the platform.",
                  "Comply with applicable legal requirements.",
                ]}
              />
            </section>

            {/* =================================================
                04. EMPLOYERS
            ================================================== */}
            <section
              id="employers"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading
                number="04"
                title="Job Applications & Employers"
              />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                CareerSphere may facilitate interactions between job seekers
                and employers.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                When you apply for a job, information included in your
                application may be made available to the relevant employer or
                recruiter for the purpose of evaluating your application.
              </p>

              <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-5">
                <p className="text-sm font-extrabold text-amber-800">
                  Important
                </p>

                <p className="mt-2 text-sm leading-6 text-amber-700">
                  Employers and recruiters may handle your information
                  according to their own privacy policies and practices. We
                  recommend reviewing their privacy practices before submitting
                  sensitive information.
                </p>
              </div>
            </section>

            {/* =================================================
                05. SHARING
            ================================================== */}
            <section
              id="sharing"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading
                number="05"
                title="How We Share Information"
              />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                We do not share personal information indiscriminately.
                Information may be shared when necessary to provide our
                services or meet legal obligations.
              </p>

              <div className="mt-6 space-y-3">
                <InfoRow
                  title="Employers & Recruiters"
                  description="Information may be shared with an employer or recruiter when you submit a job application or choose to interact with them."
                />

                <InfoRow
                  title="Service Providers"
                  description="Trusted providers may help us operate hosting, payments, analytics, communications, security, and technical services."
                />

                <InfoRow
                  title="Legal Requirements"
                  description="Information may be disclosed when required by applicable law, regulation, legal process, or legitimate governmental request."
                />
              </div>
            </section>

            {/* =================================================
                06. COOKIES
            ================================================== */}
            <section
              id="cookies"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading
                number="06"
                title="Cookies & Similar Technologies"
              />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                CareerSphere may use cookies and similar technologies to
                improve your experience and maintain platform functionality.
              </p>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <Cookie size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Cookies may help us:
                    </p>

                    <BulletList
                      items={[
                        "Keep you signed in.",
                        "Remember preferences.",
                        "Understand website usage.",
                        "Improve website performance.",
                        "Maintain platform security.",
                        "Provide relevant functionality.",
                      ]}
                    />
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                You may be able to control or disable cookies through your
                browser settings. Some platform features may not work properly
                if certain cookies are disabled.
              </p>
            </section>

            {/* =================================================
                07. SECURITY
            ================================================== */}
            <section
              id="security"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading number="07" title="Data Security" />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                We take reasonable measures designed to protect your personal
                information against unauthorized access, alteration,
                disclosure, or destruction.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <MiniPoint title="Access Controls">
                  Access to information is restricted where appropriate.
                </MiniPoint>

                <MiniPoint title="Authentication">
                  Authentication mechanisms help protect accounts.
                </MiniPoint>

                <MiniPoint title="Secure Transmission">
                  Appropriate security measures may be used when transmitting
                  information.
                </MiniPoint>

                <MiniPoint title="Monitoring">
                  Systems may be monitored to identify potential security
                  threats.
                </MiniPoint>
              </div>

              <InfoBox>
                No internet-based service can guarantee complete security. You
                should also protect your account credentials and password.
              </InfoBox>
            </section>

            {/* =================================================
                08. RETENTION
            ================================================== */}
            <section
              id="retention"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading number="08" title="Data Retention" />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                We retain information for as long as reasonably necessary to
                provide our services, maintain business records, comply with
                legal obligations, resolve disputes, enforce agreements, and
                protect our platform.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                The specific retention period may vary depending on the type of
                information and the purpose for which it was collected.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                When information is no longer required, we may delete or
                anonymize it where appropriate.
              </p>
            </section>

            {/* =================================================
                09. YOUR CHOICES
            ================================================== */}
            <section
              id="choices"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading
                number="09"
                title="Your Privacy Choices"
              />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Depending on applicable laws and available platform features,
                you may have choices regarding your personal information.
              </p>

              <BulletList
                items={[
                  "Update your profile information.",
                  "Correct inaccurate information.",
                  "Manage your account.",
                  "Request information about data we hold.",
                  "Request deletion where applicable.",
                  "Manage communication preferences.",
                  "Control certain browser cookies.",
                ]}
              />

              <InfoBox>
                To make a privacy-related request, please contact our support
                team.
              </InfoBox>
            </section>

            {/* =================================================
                10. CHILDREN
            ================================================== */}
            <section
              id="children"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading number="10" title="Children's Privacy" />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                CareerSphere is intended for users who are legally permitted
                to use employment and career-related services.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                We do not knowingly collect personal information from children
                where such collection is prohibited by applicable law.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                If you believe that a child has provided personal information
                to us improperly, please contact us so that appropriate action
                can be taken.
              </p>
            </section>

            {/* =================================================
                11. THIRD PARTY
            ================================================== */}
            <section
              id="third-party"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading
                number="11"
                title="Third-Party Services"
              />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                CareerSphere may contain links to third-party websites,
                applications, payment services, or other external platforms.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                These third parties may have their own privacy policies and
                practices. CareerSphere is not responsible for the privacy
                practices, content, or security of third-party services.
              </p>

              <InfoBox>
                We recommend reviewing third-party privacy policies before
                providing personal information.
              </InfoBox>
            </section>

            {/* =================================================
                12. INTERNATIONAL TRANSFERS
            ================================================== */}
            <section
              id="transfers"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading
                number="12"
                title="International Data Transfers"
              />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Depending on where CareerSphere, its service providers, or
                business partners operate, your information may be processed
                or stored in locations outside your country.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Where required, appropriate safeguards may be applied to
                protect personal information during such transfers.
              </p>
            </section>

            {/* =================================================
                13. CHANGES
            ================================================== */}
            <section
              id="changes"
              className="scroll-mt-24 border-b border-slate-100 py-4 sm:py-4"
            >
              <SectionHeading
                number="13"
                title="Changes to This Privacy Policy"
              />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                We may update this Privacy Policy from time to time to reflect
                changes in our services, technology, legal requirements, or
                privacy practices.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                When important changes are made, we may provide appropriate
                notice through the platform or other communication channels.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                The updated Privacy Policy will become effective when
                published unless otherwise stated.
              </p>

              <InfoBox>
                We encourage you to review this page periodically to stay
                informed about changes.
              </InfoBox>
            </section>

            {/* =================================================
                14. CONTACT
            ================================================== */}
            <section
              id="contact"
              className="scroll-mt-24 py-4 sm:py-4"
            >
              <SectionHeading number="14" title="Contact Us" />

              <p className="mt-5 text-sm leading-7 text-slate-600">
                If you have questions, concerns, or requests regarding this
                Privacy Policy or your personal information, please contact
                our support team.
              </p>

              {/* Contact Card */}
              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <HelpCircle size={20} />
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">
                        We're here to help
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Have a privacy-related question? Our team is ready to
                        assist you.
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
                  >
                    Contact Us
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Final Agreement */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex gap-3">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />

                  <p className="text-sm leading-6 text-slate-500">
                    By using CareerSphere, you acknowledge that you have read
                    and understood this Privacy Policy.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      <div className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-4 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-5 py-4 text-center sm:px-8 sm:py-4 lg:px-12">
            {/* Decorative */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <LockKeyhole size={23} />
              </div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                Privacy comes first
              </p>

              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Your Privacy Matters
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Have questions about how your personal information is handled?
                Our support team is ready to help.
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

          <span className="text-sm leading-6 text-slate-600">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
};

const InfoBox = ({ children }) => {
  return (
    <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-4">
      <div className="flex gap-3">
        <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />

        <p className="text-sm leading-6 text-blue-800">
          {children}
        </p>
      </div>
    </div>
  );
};

const MiniPoint = ({ icon, title, children }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
            {icon}
          </div>
        )}

        <div>
          <p className="text-sm font-bold text-slate-800">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ title, description }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <CheckCircle2 size={13} />
        </div>

        <div>
          <p className="text-sm font-bold text-slate-800">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

