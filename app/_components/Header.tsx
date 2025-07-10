import React from "react";

import { MdOutlineArrowDownward } from "react-icons/md";

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-black">
      <div className="flex gap-0 lg:gap-8 mt-32">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold lg:font-bold text-black dark:text-white mb-4">
          HI! I&apos;M NAUFAL
        </h1>
        <p className="hidden lg:block text-base text-gray-500 w-96 mt-6">
          I&apos;ve been in the design industy since +3 years. I craft digital
          product that are useful & enjoyable for the final users.
        </p>
      </div>
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold lg:font-bold text-black dark:text-white mb-8 lg:mb-32">UI/UX DESIGNER</h1>
      <p className="block lg:hidden text-base text-start md:text-center md:text-xl text-gray-500 w-full md:w-8/12">
          I&apos;ve been in the design industy since +3 years. I craft digital
          product that are useful & enjoyable for the final users.
        </p>
      <div className="flex flex-col gap-4 items-center">
        <p className="text-xl text-black dark:text-white w-96 text-center mt-24">
          SEE MY WORKS
        </p>
        <MdOutlineArrowDownward size={24} className="text-gray-500 dark:text-white" />
      </div>
    </div>
  );
}
