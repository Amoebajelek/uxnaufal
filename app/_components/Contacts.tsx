import React from "react";

import { MdOutlineArrowRightAlt } from "react-icons/md";

export default function Contacts() {
  return (
    <div className="flex justify-center items-center py-24 bg-gray-100 dark:bg-gray-200">
      <div className="flex flex-col md:flex-row w-10/12 lg:w-8/12 gap-12">
        <h1 className="text-2xl font-bold text-black w-full lg:w-1/3">
          @uxnaufal
        </h1>
        <div className="flex flex-col gap-8 w-full lg:w-2/3">
          <a
            href="https://www.linkedin.com/in/naufalabdussyakur/"
            className="cursor-pointer"
            target="_blank"
          >
            <div className="flex border-b-2 w-full justify-between items-center pb-3">
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-black">LinkedIn</h1>
                <p className="text-lg text-gray-500">Naufal Abdussyakur</p>
              </div>
              <MdOutlineArrowRightAlt size={24} className="text-black" />
            </div>
          </a>
          <a
            href="https://www.instagram.com/uxnaufal"
            className="cursor-pointer"
            target="_blank"
          >
            <div className="flex border-b-2 w-full justify-between items-center pb-3">
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-black">Instagram</h1>
                <p className="text-lg text-gray-500">500K+ followers</p>
              </div>
              <MdOutlineArrowRightAlt size={24} className="text-black" />
            </div>
          </a>
          <a
            href="https://www.threads.com/@uxnaufal"
            className="cursor-pointer"
            target="_blank"
          >
            <div className="flex border-b-2 w-full justify-between items-center pb-3">
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-black">Threads</h1>
                <p className="text-lg text-gray-500">400K+ followers</p>
              </div>
              <MdOutlineArrowRightAlt size={24} className="text-black" />
            </div>
          </a>
          <a
            href="https://www.tiktok.com/@uxnaufal"
            className="cursor-pointer"
            target="_blank"
          >
            <div className="flex border-b-2 w-full justify-between items-center pb-3">
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-black">TikTok</h1>
                <p className="text-lg text-gray-500">300K+ followes</p>
              </div>
              <MdOutlineArrowRightAlt size={24} className="text-black" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
