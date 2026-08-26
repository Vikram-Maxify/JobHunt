import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Search,
  CreditCard,
  Images,
  Phone,
  Info,
  LogIn,
  UserPlus,
  Menu,
  X,
  UserRound,
  FileText,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { FaBookmark } from "react-icons/fa";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [mobileUserMenu, setMobileUserMenu] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const userMenuRef = useRef(null);

  // =========================================================
  // NAV ITEMS
  // =========================================================

  const navItems = [
    {
      name: "Find Jobs",
      path: "/jobs",
      icon: Search,
    },
    {
      name: "Subscription",
      path: "/subscription",
      icon: CreditCard,
    },
    {
      name: "Gallery",
      path: "/gallery",
      icon: Images,
    },
    {
      name: "Contact Us",
      path: "/contact",
      icon: Phone,
    },
    {
      name: "About Us",
      path: "/about",
      icon: Info,
    },
  ];

  // =========================================================
  // CHECK AUTH
  // =========================================================

  const checkAuth = () => {
    try {
      const loggedInStatus = localStorage.getItem("careerSphereIsLoggedIn");
      const loggedInUser = localStorage.getItem("careerSphereCurrentUser");

      if (loggedInStatus === "true" && loggedInUser) {
        const parsedUser = JSON.parse(loggedInUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  // =========================================================
  // CHECK AUTH ON LOAD / ROUTE CHANGE
  // =========================================================

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  // =========================================================
  // LISTEN FOR AUTH CHANGE
  // =========================================================

  useEffect(() => {
    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("careerSphereAuthChanged", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener(
        "careerSphereAuthChanged",
        handleAuthChange
      );
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  // =========================================================
  // ACTIVE ROUTE
  // =========================================================

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  // =========================================================
  // CLOSE MENUS ON ROUTE CHANGE
  // =========================================================

  useEffect(() => {
    setMobileMenu(false);
    setUserMenu(false);
    setMobileUserMenu(false);
  }, [location.pathname]);

  // =========================================================
  // CLICK OUTSIDE USER MENU
  // =========================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================================================
  // ESC KEY
  // =========================================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenu(false);
        setUserMenu(false);
        setMobileUserMenu(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // =========================================================
  // MOBILE MENU TOGGLE
  // =========================================================

  const toggleMobileMenu = () => {
    setMobileMenu((prev) => !prev);
    setMobileUserMenu(false);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("careerSphereCurrentUser");
    localStorage.removeItem("careerSphereIsLoggedIn");

    setUser(null);
    setIsLoggedIn(false);

    setUserMenu(false);
    setMobileUserMenu(false);
    setMobileMenu(false);

    window.dispatchEvent(new Event("careerSphereAuthChanged"));

    navigate("/login");
  };

  // =========================================================
  // USER NAME & INITIAL
  // =========================================================

  const getUserName = () => {
    if (!user) return "User";

    return (
      user.name ||
      user.fullName ||
      user.username ||
      user.email?.split("@")[0] ||
      "User"
    );
  };

  const getUserInitial = () => {
    return getUserName().charAt(0).toUpperCase();
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}

      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10">
          <div className="flex min-h-[64px] items-center justify-between gap-3 sm:min-h-[68px]">

            {/* LOGO */}

            <Link
              to="/"
              className="group flex min-w-0 shrink-0 items-center gap-2"
              aria-label="CareerSphere Home"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md transition-all duration-300 group-hover:shadow-lg sm:h-10 sm:w-10">
                <BriefcaseBusiness
                  size={20}
                  strokeWidth={2}
                  className="text-white sm:h-[22px] sm:w-[22px]"
                />
              </div>

              <div className="truncate text-lg font-bold tracking-tight sm:text-xl md:text-2xl">
                <span className="text-slate-800">Career</span>
                <span className="text-blue-600">Sphere</span>
              </div>
            </Link>

            {/* DESKTOP NAV */}

            <div className="hidden min-w-0 flex-1 justify-center lg:flex">
              <div className="flex items-center gap-0.5 xl:gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`relative flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 xl:gap-2 xl:px-3.5 xl:text-sm ${
                        active
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-600 hover:bg-blue-50/70 hover:text-blue-600"
                      }`}
                    >
                      <Icon
                        size={16}
                        strokeWidth={2}
                        className="shrink-0"
                      />

                      <span>{item.name}</span>

                      {active && (
                        <span className="absolute bottom-0.5 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-blue-600" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* DESKTOP RIGHT SIDE */}

            <div
              ref={userMenuRef}
              className="relative hidden shrink-0 items-center gap-1.5 lg:flex xl:gap-2"
            >
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 xl:gap-2 xl:px-4 xl:text-sm ${
                      isActive("/login")
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-blue-50/70 hover:text-blue-600"
                    }`}
                  >
                    <LogIn size={16} strokeWidth={2} />
                    <span>Login</span>
                  </Link>

                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg xl:gap-2 xl:px-5 xl:text-sm"
                  >
                    <UserPlus size={16} strokeWidth={2} />
                    <span>Sign Up</span>
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserMenu((prev) => !prev)}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                    aria-label="Open user menu"
                    aria-expanded={userMenu}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-sm">
                      {getUserInitial()}
                    </div>

                    <div className="hidden max-w-[120px] text-left xl:block">
                      <p className="truncate text-xs font-bold text-slate-800">
                        {getUserName()}
                      </p>

                      <p className="text-[10px] text-slate-400">
                        My Account
                      </p>
                    </div>

                    <ChevronDown
                      size={15}
                      className={`text-slate-400 transition-transform duration-200 ${
                        userMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {userMenu && (
                    <div className="absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-300/40">

                      <div className="mb-1 rounded-xl bg-slate-50 p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white">
                            {getUserInitial()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-slate-800">
                              {getUserName()}
                            </p>

                            <p className="truncate text-xs text-slate-400">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-600"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <UserRound size={17} />
                        </span>

                        <div>
                          <p className="font-semibold">Profile</p>
                          <p className="text-[10px] text-slate-400">
                            View your profile
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/applications"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-600"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <FileText size={17} />
                        </span>

                        <div>
                          <p className="font-semibold">My Applications</p>
                          <p className="text-[10px] text-slate-400">
                            Track your applications
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/savedapplication"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-600"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <FaBookmark size={17} />
                        </span>

                        <div>
                          <p className="font-semibold">
                            Saved Application
                          </p>

                          <p className="text-[10px] text-slate-400">
                            View your save application
                          </p>
                        </div>
                      </Link>

                      <div className="my-1 h-px bg-slate-100" />

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-500 transition-all hover:bg-red-50"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
                          <LogOut size={17} />
                        </span>

                        <div>
                          <p className="font-semibold">Logout</p>

                          <p className="text-[10px] text-red-400">
                            Sign out from account
                          </p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={mobileMenu ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenu}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 active:scale-95 lg:hidden"
            >
              {mobileMenu ? (
                <X size={25} strokeWidth={2} />
              ) : (
                <Menu size={25} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* =====================================================
          MOBILE SIDEBAR
          RIGHT TO LEFT DRAWER
      ====================================================== */}

      {/* Overlay */}

      <div
        className={`fixed inset-0 z-[55] bg-black/50 transition-opacity duration-300 lg:hidden ${
          mobileMenu
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileMenu(false)}
      />

      {/* Sliding Drawer */}

      <div
        className={`fixed right-0 top-0 z-[60] flex h-full w-[300px] max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenu
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <span className="text-lg font-bold text-slate-800">
            Menu
          </span>

          <button
            type="button"
            onClick={() => setMobileMenu(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <X size={25} strokeWidth={2} />
          </button>
        </div>

        {/* Drawer Content */}

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenu(false)}
                  className={`flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 sm:py-4 ${
                    active
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-700 hover:bg-blue-50/70 hover:text-blue-600"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      active
                        ? "bg-white text-blue-600 shadow-sm"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </span>

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="my-3 h-px bg-slate-100 sm:my-4" />

          {!isLoggedIn ? (
            <div className="space-y-2">

              {/* Login */}

              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className={`flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 sm:py-4 ${
                  isActive("/login")
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:bg-blue-50/70 hover:text-blue-600"
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <LogIn size={18} strokeWidth={2} />
                </span>

                <span>Login</span>
              </Link>

              {/* Sign Up */}

              <Link
                to="/register"
                onClick={() => setMobileMenu(false)}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg active:scale-[0.99] sm:py-4"
              >
                <UserPlus size={19} strokeWidth={2} />

                <span>Sign Up</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">

              {/* Mobile User Header */}

              <button
                type="button"
                onClick={() =>
                  setMobileUserMenu((prev) => !prev)
                }
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
                    {getUserInitial()}
                  </div>

                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-800">
                      {getUserName()}
                    </p>

                    <p className="max-w-[200px] truncate text-[11px] text-slate-400">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <ChevronDown
                  size={18}
                  className={`text-slate-400 transition-transform ${
                    mobileUserMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Mobile User Menu */}

              {mobileUserMenu && (
                <div className="space-y-1 rounded-xl bg-slate-50 p-2">

                  {/* Profile */}

                  <Link
                    to="/profile"
                    onClick={() => {
                      setMobileMenu(false);
                      setMobileUserMenu(false);
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-white hover:text-blue-600"
                  >
                    <UserRound
                      size={18}
                      className="text-blue-600"
                    />

                    <span>Profile</span>
                  </Link>

                  {/* Applications */}

                  <Link
                    to="/applications"
                    onClick={() => {
                      setMobileMenu(false);
                      setMobileUserMenu(false);
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-white hover:text-blue-600"
                  >
                    <FileText
                      size={18}
                      className="text-indigo-600"
                    />

                    <span>My Applications</span>
                  </Link>

                  {/* Saved Application */}

                  <Link
                    to="/savedapplication"
                    onClick={() => {
                      setMobileMenu(false);
                      setMobileUserMenu(false);
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-white hover:text-blue-600"
                  >
                    <FaBookmark
                      size={18}
                      className="text-indigo-600"
                    />

                    <span>Saved Application</span>
                  </Link>

                  {/* Logout */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-500 hover:bg-white"
                  >
                    <LogOut size={18} />

                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;