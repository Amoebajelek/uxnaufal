import React from "react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  return (
    <div className="flex px-6 lg:px-16 py-6 min-w-full justify-between items-center bg-gray-100 dark:bg-black shadow fixed top-0 z-10">
      <a href="/">
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          uxnaufal
        </h1>
      </a>
      <ModeToggle />
    </div>
  );
}
