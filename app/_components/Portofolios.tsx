import React from "react";

import Image from "next/image";
import Papyrusphoto from "@/public/Thumbnail_Papyrusphoto.jpg";
import CMSProductCatalog from "@/public/Thumbnail_CMS_Product_Catalog.jpg";
import Balesenibarli from "@/public/Thumbnail_Bale_Seni_Barli.jpg";
import Amalacademy from "@/public/Thumbnail_Amal_Acardemy_Mobile_Version.jpg";
import Aitiserve from "@/public/Thumbnail_Aitiserve.jpg";
import { MdOutlineArrowRightAlt } from "react-icons/md";

export default function Portofolios() {
  return (
    <div className="flex flex-col gap-18 justify-center items-center mt-12 lg:mt-0 bg-gray-100 dark:bg-black">
      {/* Portofolio #0 - Aitiserve */}
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-center w-10/12 lg:w-8/12">
        <div className="w-full lg:max-w-1/2 max-h-[400px] bg-black dark:bg-gray-100 rounded-3xl lg:rounded-4xl overflow-hidden border border-solid border-gray-100">
          <Image src={Aitiserve} alt="Aitiserve" width={1600} height={1200} />
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="flex flex-col gap-2">
            <p className="text-lg text-gray-500 font-medium">Redesign</p>
            <h1 className="text-4xl font-bold text-black dark:text-white mb-4 uppercase">
              Official Website of Aitiserve
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg text-gray-800 dark:text-gray-500">
              A complete website redesign for Aitiserve, guided by UX laws and
              supported with full design and handoff documentation.
            </p>
            <a
              href="/portofolios/aitiserve"
              className="cursor-pointer"
              target="_blank"
            >
              <div className="flex justify-center items-center px-6 py-4 w-full lg:w-fit gap-2 lg:gap-4 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-200 cursor-pointer rounded-full">
                <p className="text-lg text-white dark:text-black font-medium">
                  View
                </p>
                <MdOutlineArrowRightAlt
                  size={24}
                  className="text-white dark:text-black"
                />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Portofolio #1 - Papyrusphoto */}
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-center w-10/12 lg:w-8/12">
        <div className="w-full lg:max-w-1/2 max-h-[400px] bg-black dark:bg-gray-100 rounded-3xl lg:rounded-4xl overflow-hidden border border-solid border-gray-100">
          <Image
            src={Papyrusphoto}
            alt="CMS Product Catalog by Telkom Indonesia"
            width={1600}
            height={1200}
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="flex flex-col gap-2">
            <p className="text-lg text-gray-500 font-medium">Redesign</p>
            <h1 className="text-4xl font-bold text-black dark:text-white mb-4 uppercase">
              Mobile Application by Papyrusphoto
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg text-gray-800 dark:text-gray-500">
              A complete website redesign for Papyrusphoto, guided by UX laws
              and supported with full design and handoff documentation.
            </p>
            <a
              href="https://naufalabdussyakur.notion.site/PAPYRUS-PHOTO-Tablet-Application-1865d9ae1b9c808887a3e91b34d9031a?pvs=25"
              className="cursor-pointer"
              target="_blank"
            >
              <div className="flex justify-center items-center px-6 py-4 w-full lg:w-fit gap-2 lg:gap-4 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-200 cursor-pointer rounded-full">
                <p className="text-lg text-white dark:text-black font-medium">
                  View
                </p>
                <MdOutlineArrowRightAlt
                  size={24}
                  className="text-white dark:text-black"
                />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Portofolio #2 - CMS Product Catalog by Telkom Indonesia */}
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-center w-10/12 lg:w-8/12">
        <div className="w-full lg:max-w-1/2 max-h-[400px] bg-black dark:bg-gray-100 rounded-3xl lg:rounded-4xl overflow-hidden border border-solid border-gray-100">
          <Image
            src={CMSProductCatalog}
            alt="CMS Product Catalog by Telkom Indonesia"
            width={1600}
            height={1200}
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="flex flex-col gap-2">
            <p className="text-lg text-gray-500 font-medium">Redesign</p>
            <h1 className="text-4xl font-bold text-black dark:text-white mb-4 uppercase">
              Product Catalog by Telkom Indonesia
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg text-gray-800 dark:text-gray-500">
              A complete website redesign for productcatalog.telkom.com, guided
              by UX laws and supported with full design and handoff
              documentation.
            </p>
            <a
              href="https://naufalabdussyakur.notion.site/CMS-Product-Catalog-Telkom-Product-Catalog-Website-1865d9ae1b9c8003a98fc129586a3b86?pvs=25"
              className="cursor-pointer"
              target="_blank"
            >
              <div className="flex justify-center items-center px-6 py-4 w-full lg:w-fit gap-2 lg:gap-4 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-200 cursor-pointer rounded-full">
                <p className="text-lg text-white dark:text-black font-medium">
                  View
                </p>
                <MdOutlineArrowRightAlt
                  size={24}
                  className="text-white dark:text-black"
                />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Portofolio #3 - Bale Seni Barli by Kota Baru Parahyangan */}
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-center w-10/12 lg:w-8/12">
        <div className="w-full lg:max-w-1/2 max-h-[400px] bg-black dark:bg-gray-100 rounded-3xl lg:rounded-4xl overflow-hidden border border-solid border-gray-100">
          <Image
            src={Balesenibarli}
            alt="Bale Seni Barli"
            width={1600}
            height={1200}
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="flex flex-col gap-2">
            <p className="text-lg text-gray-500 font-medium">Redesign</p>
            <h1 className="text-4xl font-bold text-black dark:text-white mb-4 uppercase">
              Bale Seni Barli by Kota Baru Parahyangan
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg text-gray-800 dark:text-gray-500">
              A complete website redesign for balesenibarli.blogspot.com, guided
              by UX laws and supported with full design and handoff
              documentation.
            </p>
            <a
              href="https://naufalabdussyakur.notion.site/Bale-Seni-Barli-Redesign-official-website-1865d9ae1b9c800c8dccf8b0c5e86be2?pvs=25"
              className="cursor-pointer"
              target="_blank"
            >
              <div className="flex justify-center items-center px-6 py-4 w-full lg:w-fit gap-2 lg:gap-4 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-200 cursor-pointer rounded-full">
                <p className="text-lg text-white dark:text-black font-medium">
                  View
                </p>
                <MdOutlineArrowRightAlt
                  size={24}
                  className="text-white dark:text-black"
                />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Portofolio #4 - Amal Academy by Amal Solution */}
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-center w-10/12 lg:w-8/12">
        <div className="w-full lg:max-w-1/2 max-h-[400px] bg-black dark:bg-gray-100 rounded-3xl lg:rounded-4xl overflow-hidden border border-solid border-gray-100">
          <Image
            src={Amalacademy}
            alt="Amal Academy"
            width={1600}
            height={1200}
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="flex flex-col gap-2">
            <p className="text-lg text-gray-500 font-medium">New Design</p>
            <h1 className="text-4xl font-bold text-black dark:text-white mb-4 uppercase">
              Amal Academy by Amal Solution
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-lg text-gray-800 dark:text-gray-500">
              A complete website redesign for amalsolution.com, guided by UX
              laws and supported with full design and handoff documentation.
            </p>
            <a
              href="https://naufalabdussyakur.notion.site/Amal-Academy-E-Course-Website-1865d9ae1b9c80bf9fdbdefc464811a1?pvs=25"
              className="cursor-pointer"
              target="_blank"
            >
              <div className="flex justify-center items-center px-6 py-4 w-full lg:w-fit gap-2 lg:gap-4 bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-200 cursor-pointer rounded-full">
                <p className="text-lg text-white dark:text-black font-medium">
                  View
                </p>
                <MdOutlineArrowRightAlt
                  size={24}
                  className="text-white dark:text-black"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
