import React from "react";

import { MdOutlineArrowRightAlt } from "react-icons/md";

export default function Portofolios() {
  return (
    <div className="flex flex-col justify-center items-center mt-12 lg:mt-0 bg-gray-100 dark:bg-black">
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-center w-10/12 lg:w-8/12">
        <div className="w-full lg:w-1/2 h-[400px] bg-black dark:bg-gray-100 rounded-4xl"></div>
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="flex flex-col gap-2">
            <p className="text-base text-gray-500 font-medium">
              Personal Project
            </p>
            <h1 className="text-4xl font-bold text-black dark:text-white mb-4 uppercase">
              Redesign Official Website
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg text-gray-800 dark:text-gray-500">
              A complete website redesign for aitiserve.co.id, guided by UX laws
              and supported with full design and handoff documentation.
            </p>
            <div className="flex justify-center items-center px-6 py-4 w-full lg:w-fit gap-2 lg:gap-6 bg-black dark:bg-white dark:hover:bg-gray-200 cursor-pointer rounded-full">
              <p className="text-lg text-white dark:text-black font-medium">View</p>
              <MdOutlineArrowRightAlt size={24} className="text-white dark:text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
