import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GUEST_POPUP_STORAGE_KEY = "careerSphere_apply_popup_guest_viewed";

const ApplyNowPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // ==========================================
  // GET CURRENT USER
  // ==========================================
  const { user } = useSelector((state) => state.auth);

  // ==========================================
  // AUTO OPEN
  // ==========================================
  useEffect(() => {
    // ------------------------------------------
    // GET USER ID
    // ------------------------------------------
    const userId = user?._id || user?.id;

    // ------------------------------------------
    // ADMIN SHOULD NEVER SEE POPUP
    // ------------------------------------------
    if (user?.role === "admin") {
      return;
    }

    // ------------------------------------------
    // USER-SPECIFIC STORAGE KEY
    // ------------------------------------------
    const storageKey = userId
      ? `careerSphere_apply_popup_viewed_${userId}`
      : GUEST_POPUP_STORAGE_KEY;

    const hasViewedPopup = localStorage.getItem(storageKey);

    // Already viewed
    if (hasViewedPopup === "true") {
      return;
    }

    // ------------------------------------------
    // SHOW POPUP AFTER 3 SECONDS
    // ------------------------------------------
    const timer = setTimeout(() => {
      setIsOpen(true);

      // Mark as viewed
      localStorage.setItem(storageKey, "true");
    }, 3000);

    return () => clearTimeout(timer);
  }, [user]);

  // ==========================================
  // LOCK BACKGROUND SCROLL
  // ==========================================
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // ==========================================
  // GET STORAGE KEY
  // ==========================================
  const getPopupStorageKey = () => {
    const userId = user?._id || user?.id;

    if (userId) {
      return `careerSphere_apply_popup_viewed_${userId}`;
    }

    return GUEST_POPUP_STORAGE_KEY;
  };

  // ==========================================
  // CLOSE POPUP
  // ==========================================
  const handleClose = () => {
    localStorage.setItem(getPopupStorageKey(), "true");

    setIsOpen(false);
  };

  // ==========================================
  // APPLY NOW
  // ==========================================
  const handleApplyNow = () => {
    localStorage.setItem(getPopupStorageKey(), "true");

    setIsOpen(false);

    navigate("/jobs");
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[99999]
        flex
        items-center
        justify-center
        bg-slate-950/45
        px-4
        py-6
        backdrop-blur-[3px]
      "
    >
      <div
        className="
          relative
          w-full
          max-w-[410px]
          overflow-hidden
          rounded-[26px]
          border
          border-white
          bg-white
          shadow-[0_25px_70px_rgba(15,23,42,0.28)]
        "
      >
        {/* Decorative Circle */}
        <div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-36
            w-36
            rounded-full
            bg-blue-400/20
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-16
            -left-16
            h-36
            w-36
            rounded-full
            bg-indigo-400/10
          "
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close popup"
          className="
            absolute
            right-4
            top-4
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/15
            text-white
            backdrop-blur-md
            transition
            hover:bg-white/25
          "
        >
          <X size={18} strokeWidth={2.2} />
        </button>

        {/* Header */}
        <div
          className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-blue-600
            via-blue-600
            to-indigo-600
            px-6
            pb-6
            pt-7
            text-white
          "
        >
          <div
            className="
              mb-4
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-white/15
              shadow-lg
              backdrop-blur-sm
            "
          >
            <BriefcaseBusiness size={24} strokeWidth={2} />
          </div>

          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
            Career Opportunity
          </p>

          <h2 className="max-w-[320px] text-2xl font-bold leading-tight">
            Find your next career opportunity.
          </h2>

          <p className="mt-2 max-w-[340px] text-sm leading-5 text-blue-100">
            Discover exciting jobs and take the next step toward your dream
            career.
          </p>
        </div>

        {/* Content */}
        <div className="relative px-6 py-5">
          {/* Stats */}
          <div className="mb-5 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-100 bg-slate-50 py-3">
            <div className="text-center">
              <p className="text-lg font-bold text-slate-900">12K+</p>

              <p className="mt-0.5 text-[11px] text-slate-500">Jobs</p>
            </div>

            <div className="text-center">
              <p className="text-lg font-bold text-slate-900">500+</p>

              <p className="mt-0.5 text-[11px] text-slate-500">Companies</p>
            </div>

            <div className="text-center">
              <p className="text-lg font-bold text-slate-900">50+</p>

              <p className="mt-0.5 text-[11px] text-slate-500">Countries</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-5 space-y-2.5">
            <div className="flex items-center gap-3">
              <CheckCircle2
                size={18}
                className="shrink-0 text-blue-600"
                strokeWidth={2}
              />

              <span className="text-sm font-medium text-slate-700">
                Find jobs matching your skills
              </span>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck
                size={18}
                className="shrink-0 text-blue-600"
                strokeWidth={2}
              />

              <span className="text-sm font-medium text-slate-700">
                Trusted companies and opportunities
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Globe2
                size={18}
                className="shrink-0 text-blue-600"
                strokeWidth={2}
              />

              <span className="text-sm font-medium text-slate-700">
                Local and international opportunities
              </span>
            </div>
          </div>

          {/* Apply Button */}
          <button
            type="button"
            onClick={handleApplyNow}
            className="
              group
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-blue-600/20
              transition-all
              duration-200
              hover:bg-blue-700
              hover:shadow-xl
            "
          >
            Explore Jobs & Apply
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>

          {/* Maybe Later */}
          <button
            type="button"
            onClick={handleClose}
            className="
              mt-2
              w-full
              rounded-xl
              px-5
              py-2.5
              text-sm
              font-semibold
              text-slate-500
              transition
              hover:bg-slate-50
              hover:text-slate-700
            "
          >
            Maybe Later
          </button>

          {/* Trust Text */}
          <p className="mt-3 text-center text-[11px] text-slate-400">
            Your next opportunity could be just one click away.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplyNowPopup;
