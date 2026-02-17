import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { courseContent } from "../data/moduleRegistry";

export default function CourseLayout() {
  const location = useLocation();
  const currentTopicId = location.pathname.split("/").pop();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on navigation (mobile)
  const handleLinkClick = () => setIsSidebarOpen(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between z-20 px-4">
        <span className="font-bold text-gray-800">Markdown Course</span>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
                fixed inset-y-0 left-0 z-40
                w-72 bg-white border-r border-slate-200 
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                flex flex-col h-screen overflow-y-auto
            `}
      >
        <div className="p-6 border-b border-slate-100 hidden md:block select-none">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Markdown Mastery
          </h2>
          <p className="text-xs text-slate-500 mt-1">Foundations to Advanced</p>
        </div>

        <div className="px-4 pt-4">
          <Link
            to="/playground"
            onClick={handleLinkClick}
            className={`block px-3 py-2 rounded-md text-sm font-bold transition-all border ${location.pathname === "/playground"
              ? "bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              }`}
          >
            <div className="flex items-center justify-between">
              <span>Interactive Playground</span>
              <span className="text-lg">✨</span>
            </div>
          </Link>
        </div>

        <div className="flex-1 p-4 space-y-8">
          {/* Spacer for mobile header */}
          <div className="md:h-12 md:hidden"></div>

          <div>
            <h3 className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Beginner
            </h3>
            <ul className="space-y-1">
              {courseContent
                .filter((t) => t.level === "Beginner")
                .map((topic, index) => (
                  <li key={topic.id}>
                    <Link
                      to={`/${topic.id}`}
                      onClick={handleLinkClick}
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-all ${currentTopicId === topic.id
                        ? "bg-teal-50 text-teal-700 shadow-sm border border-teal-100"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-2 opacity-50 text-xs text-teal-500">
                          {index + 1}.
                        </span>
                        <span className="truncate">{topic.title}</span>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Intermediate
            </h3>
            <ul className="space-y-1">
              {courseContent
                .filter((t) => t.level === "Intermediate")
                .map((topic, index) => (
                  <li key={topic.id}>
                    <Link
                      to={`/${topic.id}`}
                      onClick={handleLinkClick}
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-all ${currentTopicId === topic.id
                        ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-2 opacity-50 text-xs text-blue-500">
                          {index + 1}.
                        </span>
                        <span className="truncate">{topic.title}</span>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Advanced
            </h3>
            <ul className="space-y-1">
              {courseContent
                .filter((t) => t.level === "Advanced")
                .map((topic, index) => (
                  <li key={topic.id}>
                    <Link
                      to={`/${topic.id}`}
                      onClick={handleLinkClick}
                      className={`block px-3 py-2 rounded-md text-sm font-medium transition-all ${currentTopicId === topic.id
                        ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-2 opacity-50 text-xs text-indigo-500">
                          {index + 1}.
                        </span>
                        <span className="truncate">{topic.title}</span>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full md:ml-72 pt-16 md:pt-0 min-h-screen bg-indigo-50">
        <div className="w-full max-w-none p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
