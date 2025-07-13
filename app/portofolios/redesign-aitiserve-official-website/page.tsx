import React from "react";
import Image from "next/image";

import Navbar from "@/app/_components/Navbar";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import Papyrusphoto from "@/public/Thumbnail_Papyrusphoto.jpg";

export default function page() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100 dark:bg-black mt-24">
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="flex gap-2 w-full mb-12 items-center cursor-pointer text-gray-500 hover:text-gray-800">
            <MdOutlineArrowRightAlt
              size={24}
              className="dark:text-gray-300 rotate-180"
            />
            <p className="text-lg font-medium">Back to Home</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-lg text-gray-500 font-medium">
              Personal Project
            </p>
            <h1 className="text-6xl font-bold text-black dark:text-white mb-4 uppercase">
              Redesign Official Website of{" "}
              <a
                href="https://aitiserve.co.id"
                className="cursor-pointer italic"
                target="_blank"
              >
                AITISERVE.CO.ID
              </a>
            </h1>
          </div>
          <p className="text-lg text-gray-800 dark:text-gray-500">
            A complete website redesign for PT. Aitiserve Djaya Naraya
            (AITISERVE), guided by UX laws and supported with full design and
            handoff documentation.
          </p>
          <div className="w-full max-h-[600px] bg-black dark:bg-gray-100 rounded-3xl lg:rounded-4xl overflow-hidden my-8">
            <Image
              src={Papyrusphoto}
              alt="CMS Product Catalog by Telkom Indonesia"
              width={1600}
              height={1200}
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg text-gray-800 dark:text-gray-500">
              This project will demonstrate my expertise in these three crucial
              domains:
            </p>
            <div className="flex gap-8">
              <p className="text-lg font-medium text-gray-800 dark:text-gray-500">
                Design Thinking
              </p>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-500">
                Wireframe
              </p>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-500">
                Product Design
              </p>
            </div>
          </div>

          <div className="flex gap-16 mt-8">
            <div className="flex flex-col">
              <p className="text-lg text-gray-500 dark:text-gray-500">
                Project
              </p>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-500">
                Redesign
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg text-gray-500 dark:text-gray-500">
                Duration
              </p>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-500">
                June 2024 (3 Weeks)
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg text-gray-500 dark:text-gray-500">Link</p>
              <a
                href="https://aitiserve.co.id"
                className="cursor-pointer"
                target="_blank"
              >
                <p className="text-lg font-medium text-gray-800 dark:text-gray-500 italic">
                  Aitiserve.co.id
                </p>
              </a>
            </div>
          </div>
          <div className="flex mt-8 gap-4 w-full">
            {/* Left Side */}
            <div className="flex flex-col gap-1 text-lg text-gray-500 dark:text-gray-500 w-1/5">
              <p>In a Nutshell</p>
              <p>Context</p>
              <p>Problem Discovery</p>
              <p>Problem #1</p>
              <p>Solution #1</p>
              <p>Problem #2</p>
              <p>Solution #2 #2</p>
              <p>Full Design</p>
              <p>Reflection</p>
            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-4 w-4/5">
              {/* Content 1 */}
              <div className="flex flex-col">
                <p className="text-lg text-gray-500 dark:text-gray-500">
                  In a Nutshell
                </p>
                <h1 className="text-2xl font-bold text-black dark:text-white uppercase">
                  Revamping the official website with full design and
                  development documentation.
                </h1>
              </div>
              <p className="text-lg text-black dark:text-white">
                Enhancing the AITISERVE website to meet stakeholder requirements
                and support the company&apos;s long-term objectives.
              </p>
              <div className="w-full max-h-[600px] bg-black dark:bg-gray-100 rounded-3xl lg:rounded-4xl overflow-hidden my-4">
                <Image
                  src={Papyrusphoto}
                  alt="CMS Product Catalog by Telkom Indonesia"
                  width={1600}
                  height={1200}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg text-black dark:text-white">
                  The main product flow includes:
                </p>
                <ul className="list-decimal ms-8 text-lg text-black dark:text-white space-y-1">
                  <li>
                    <span className="font-medium">Landing Page</span> :
                    Introduces users to AITISERVE and provides an overview of
                    who we are.
                  </li>
                  <li>
                    <span className="font-medium">Services</span> : Showcases
                    the products and services offered by AITISERVE.
                  </li>
                  <li>
                    <span className="font-medium">Portofolios</span> :
                    Highlights legacy projects that demonstrate AITISERVE&apos;s
                    capabilities and experience.
                  </li>
                  <li>
                    <span className="font-medium">Blogs</span> : Allows users to
                    explore articles, insights, and knowledge shared by our
                    team.
                  </li>
                  <li>
                    <span className="font-medium">About Us</span> : Offers a
                    deeper understanding of AITISERVE&apos;’s vision, mission,
                    and team.
                  </li>
                  <li>
                    <span className="font-medium">Career</span> : Displays
                    current job openings and the benefits of joining AITISERVE.
                  </li>
                  <li>
                    <span className="font-medium">Contact Us</span> : Provides
                    various ways for users to get in touch with AITISERVE.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
