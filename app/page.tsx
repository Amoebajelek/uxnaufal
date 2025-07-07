import { MdOutlineArrowDownward } from "react-icons/md";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex px-16 py-6 min-w-full bg-gray-100 shadow fixed top-0 z-10">
        <h1 className="text-2xl font-semibold text-black">uxnaufal</h1>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
        <div className="flex gap-8">
          <h1 className="text-9xl font-bold text-black mb-4">HI! I&apos;M NAUFAL</h1>
          <p className="text-xl text-gray-500 w-96 mt-6">
            I&apos;ve been in the design industy since +3 years. I craft digital
            product that are useful & enjoyable for the final users.
          </p>
        </div>
        <h1 className="text-9xl font-bold text-black mb-4">UI/UX DESIGNER</h1>
        <div className="flex flex-col gap-4 items-center">
          <p className="text-xl text-black w-96 text-center mt-24">
            SEE MY WORKS
          </p>
          <MdOutlineArrowDownward size={24} className="text-gray-500" />
        </div>
      </div>
      {/* <div className="flex gap-4 justify-center items-center">
        <div className="w-32 h-32"></div>
        <p className="text-xl text-gray-500 w-96 mt-6">
          I’ve been in the design industy since +3 years. I craft digital
          product that are useful & enjoyable for the final users.
        </p>
      </div> */}
    </div>
  );
}
