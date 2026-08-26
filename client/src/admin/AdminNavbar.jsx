import React from "react";
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  UserRound,
} from "lucide-react";

const AdminNavbar = ({ setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-30 flex h-20 shrink-0 items-center border-b border-slate-200 bg-white/95 px-3 backdrop-blur sm:px-5 lg:px-8">
      <div className="flex w-full items-center justify-between gap-3">
        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-3">
          {/* MOBILE MENU */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-slate-800 sm:text-lg">
              Admin Dashboard
            </h2>

            <p className="hidden text-xs text-slate-400 sm:block">
              Manage your CareerSphere platform
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* SEARCH */}
          <div className="hidden items-center rounded-xl border border-slate-200 bg-slate-50 px-3 lg:flex">
            <Search
              size={16}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-36 bg-transparent px-2 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 xl:w-52"
            />
          </div>

          {/* SEARCH MOBILE */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 lg:hidden"
          >
            <Search size={18} />
          </button>

          {/* NOTIFICATION */}
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-blue-600"
          >
            <Bell size={18} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* ADMIN */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 transition hover:bg-slate-50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
              <UserRound size={16} />
            </div>

            <div className="hidden text-left md:block">
              <p className="text-xs font-bold text-slate-700">
                Admin
              </p>

              <p className="text-[10px] text-slate-400">
                Super Admin
              </p>
            </div>

            <ChevronDown
              size={15}
              className="mr-1 hidden text-slate-400 md:block"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;