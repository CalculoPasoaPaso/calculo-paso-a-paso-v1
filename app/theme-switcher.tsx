"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
      aria-label="Toggle theme"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="block size-5 dark:hidden">
        <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 4.343a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM6.464 13.536a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM17.75 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM13.536 6.464a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM4.343 5.404a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06L4.343 6.464a.75.75 0 010-1.06z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="hidden size-5 dark:block">
        <path fillRule="evenodd" d="M7.455 2.104a.75.75 0 00-.455.692V4.5a.75.75 0 001.5 0V3.362a8.976 8.976 0 015.59 5.59H13.5a.75.75 0 000 1.5h1.254a8.976 8.976 0 01-5.59 5.59V15.5a.75.75 0 00-1.5 0v.704a.75.75 0 00.455.692 10.476 10.476 0 0010.245-10.245.75.75 0 00-.692-.455H7.455z" clipRule="evenodd" />
      </svg>
    </button>
  );
}