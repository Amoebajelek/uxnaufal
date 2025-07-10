import { MdOutlineArrowDownward, MdOutlineArrowRightAlt } from "react-icons/md";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex px-16 py-6 min-w-full bg-gray-100 shadow fixed top-0 z-10">
        <h1 className="text-2xl font-semibold text-black">uxnaufal</h1>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
        <div className="flex gap-8 mt-32">
          <h1 className="text-9xl font-bold text-black mb-4">
            HI! I&apos;M NAUFAL
          </h1>
          <p className="text-base text-gray-500 w-96 mt-6">
            I&apos;ve been in the design industy since +3 years. I craft digital
            product that are useful & enjoyable for the final users.
          </p>
        </div>
        <h1 className="text-9xl font-bold text-black mb-32">UI/UX DESIGNER</h1>
        <div className="flex flex-col gap-4 items-center">
          <p className="text-xl text-black w-96 text-center mt-24">
            SEE MY WORKS
          </p>
          <MdOutlineArrowDownward size={24} className="text-gray-500" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-6 justify-center items-center w-8/12">
          <div className="w-1/2 h-[400px] bg-black rounded-4xl"></div>
          <div className="flex flex-col w-1/2">
            <div className="flex flex-col gap-2">
              <p className="text-base text-gray-500 font-medium">
                Personal Project
              </p>
              <h1 className="text-4xl font-bold text-black mb-4 uppercase">
                Redesign Official Website
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-lg text-gray-800">
                A complete website redesign for aitiserve.co.id, guided by UX
                laws and supported with full design and handoff documentation.
              </p>
              <div className="flex items-center px-6 py-4 w-fit gap-2 bg-black rounded-full">
                <p className="text-lg text-white font-medium">View</p>
                <MdOutlineArrowRightAlt size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-12">
        <div className="flex w-8/12">
          <h1 className="text-2xl font-bold text-black w-1/3">@uxnaufal</h1>
          <div className="flex flex-col gap-8 w-2/3">
            <div className="flex border-b-2 w-full justify-between items-center">
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-black">Instagram</h1>
                <p className="text-lg text-gray-500">500K+ followers</p>
              </div>
              <MdOutlineArrowRightAlt size={24} className="text-black" />
            </div>
            <div className="flex border-b-2 w-full justify-between items-center">
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-black">Threads</h1>
                <p className="text-lg text-gray-500">400K+ followers</p>
              </div>
              <MdOutlineArrowRightAlt size={24} className="text-black" />
            </div>
            <div className="flex border-b-2 w-full justify-between items-center">
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-black">TikTok</h1>
                <p className="text-lg text-gray-500">300K+ followes</p>
              </div>
              <MdOutlineArrowRightAlt size={24} className="text-black" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex px-16 py-6 min-w-full bg-gray-100 mt-[120px]">
        <p className="text-lg text-gray-500">©2024 All Rights Reserved.</p>
      </div>
    </div>
  );
}
