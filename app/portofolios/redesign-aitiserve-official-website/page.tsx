import React from "react";
import Image from "next/image";

import Navbar from "@/app/_components/Navbar";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import Papyrusphoto from "@/public/Thumbnail_Papyrusphoto.jpg";
import PreviewProblemDiscovery from "@/public/Preview-Problem-Discovery.jpg";
import DesignThinkingAitiserve from "@/public/Design-Thinking-Aitiserve.jpg";
import WireframeAitiserve from "@/public/Wireframe-Aitiserve.jpg";
import VisualDesignAitiserve from "@/public/Visual-Design-Aitiserve.jpg";
import Footer from "@/app/_components/Footer";

export default function page() {
  return (
    <div className="flex flex-col">
      <Navbar />
      {/* Start Header */}
      <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100 dark:bg-black mt-24">
        <div className="flex flex-col w-full lg:w-8/12">
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
          {/* End Header */}
          <div className="flex gap-4 w-full h-full mt-8">
            {/* Start Left-Side */}
            <div className="hidden md:flex flex-col w-2/8 min-h-full relative bg-gray-100">
              <div className="flex flex-col gap-1.5 text-lg text-gray-500 dark:text-gray-500 top-32 sticky">
                <p>In a Nutshell</p>
                <p>Context</p>
                <p>Problem Discovery</p>
                <p>Problem #1</p>
                <p>Solution #1</p>
                <p>Problem #2</p>
                <p>Solution #2</p>
                <p>Full Design</p>
                <p>Reflection</p>
              </div>
            </div>
            {/* End Left-Side */}
            {/* Right-Content 1 */}
            <div className="flex flex-col gap-4 w-6/8">
              {/* Start Right-Content : In a Nutshell */}
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
              {/* End Right-Content : In a Nutshell */}
              {/* Start Right-Content : Context */}
              <div className="flex flex-col">
                <p className="text-lg text-gray-500 dark:text-gray-500">
                  Context
                </p>
                <h1 className="text-2xl font-bold text-black dark:text-white uppercase">
                  Understanding AITISERVE
                </h1>
              </div>
              <p className="text-lg text-black dark:text-white">
                AITISERVE specializes in software development and digital
                platform services, including programming, web portal management,
                as well as IT consulting and technical support.
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
              {/* End Right-Content : Context */}
              {/* Start Right-Content : Problem Discovery */}
              <div className="flex flex-col">
                <p className="text-lg text-gray-500 dark:text-gray-500">
                  Problem Discovery
                </p>
                <h1 className="text-2xl font-bold text-black dark:text-white uppercase">
                  The current design feels visually underwhelming and could be
                  improved for better engagement.
                </h1>
              </div>
              <p className="text-lg text-black dark:text-white">
                The design feels unpolished, with cluttered content,
                inconsistent layout, and missing documentation. Despite being
                new, establishing professionalism early on is crucial.
              </p>
              {/* End Right-Content : Context */}
              {/* Start Right-Content : Problem #1 */}
              <div className="flex flex-col">
                <p className="text-lg text-gray-500 dark:text-gray-500">
                  Problem #1
                </p>
                <h1 className="text-2xl font-bold text-black dark:text-white uppercase">
                  Weak visual presentation
                </h1>
              </div>
              <p className="text-lg text-black dark:text-white">
                Inconsistent alignment across components, content, typography,
                and layout affects overall visual harmony.
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold text-black dark:text-white">
                  Preview
                </p>
                <div className="w-full h-fit bg-black dark:bg-gray-100 rounded-lg overflow-hidden my-4">
                  <Image
                    src={PreviewProblemDiscovery}
                    alt="Preview Problem Discovery"
                    width={1600}
                  />
                </div>
              </div>
              {/* End Right-Content : Problem #1 */}
              {/* Start Right-Content : Solution #1 */}
              <div className="flex flex-col">
                <p className="text-lg text-gray-500 dark:text-gray-500">
                  Solution #1
                </p>
                <h1 className="text-2xl font-bold text-black dark:text-white uppercase">
                  Using UX laws to guide decision-making in new design
                  development.
                </h1>
              </div>
              <p className="text-lg text-black dark:text-white">
                In the redesign process, we applied foundational UX laws—such as
                Hick’s Law, Fitts’s Law, and the Law of Proximity—to ensure
                every design decision was backed by human-centered principles.
                These laws helped streamline user interactions, improve visual
                hierarchy, and create more intuitive experiences. By grounding
                our design choices in proven UX principles, we enhanced
                usability, clarity, and overall user satisfaction.
              </p>
              {/* End Right-Content : Solution #1 */}
              {/* Start Right-Content : Problem #2 */}
              <div className="flex flex-col">
                <p className="text-lg text-gray-500 dark:text-gray-500">
                  Problem #2
                </p>
                <h1 className="text-2xl font-bold text-black dark:text-white uppercase">
                  Design documentation is missing or incomplete, making
                  implementation harder.
                </h1>
              </div>
              <p className="text-lg text-black dark:text-white">
                The absence or incompleteness of design documentation creates
                significant challenges during the development phase. Without
                clear references for components, layouts, and interactions,
                developers may misinterpret the intended design, leading to
                inconsistencies, delays, and increased rework. Comprehensive
                documentation is essential to ensure smooth collaboration,
                accurate implementation, and long-term maintainability.
              </p>
              {/* End Right-Content : Problem #2 */}
              {/* Start Right-Content : Solution #2 */}
              <div className="flex flex-col">
                <p className="text-lg text-gray-500 dark:text-gray-500">
                  Solution #2
                </p>
                <h1 className="text-2xl font-bold text-black dark:text-white uppercase">
                  Applying the Design Thinking framework through its five key
                  phases.
                </h1>
              </div>
              <p className="text-lg text-black dark:text-white">
                The Design Thinking framework was applied systematically through
                its five key phases: Empathize, Define, Ideate, Prototype, and
                Test. This approach ensured a deep understanding of user needs,
                clear problem definition, creative solution generation,
                iterative prototyping, and continuous validation. By following
                this user-centered process, we were able to design solutions
                that are not only functional but also meaningful and relevant to
                real user challenges.
              </p>
              {/* End Right-Content : Solution #2 */}
              {/* Start Right-Content : Final Design */}
              <div className="flex flex-col">
                <p className="text-lg text-gray-500 dark:text-gray-500">
                  Final Design
                </p>
                <h1 className="text-2xl font-bold text-black dark:text-white uppercase">
                  The new look of AITISERVE
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold text-black dark:text-white">
                  Design Thinking
                </p>
                <div className="w-full h-fit bg-black dark:bg-gray-100 rounded-lg overflow-hidden my-4">
                  <Image
                    src={DesignThinkingAitiserve}
                    alt="Design Thinking Aitiserve"
                    width={1600}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold text-black dark:text-white">
                  Low-Fidelity / Wireframe
                </p>
                <div className="w-full h-fit bg-black dark:bg-gray-100 rounded-lg overflow-hidden my-4">
                  <Image
                    src={WireframeAitiserve}
                    alt="Wireframe Aitiserve"
                    width={1600}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold text-black dark:text-white">
                  high-Fidelity / Visual Design
                </p>
                <div className="w-full h-fit bg-black dark:bg-gray-100 rounded-lg overflow-hidden my-4">
                  <Image
                    src={VisualDesignAitiserve}
                    alt="Visual Design Aitiserve"
                    width={1600}
                  />
                </div>
              </div>
              {/* End Right-Content : Final Design */}
              {/* Start Right-Content : Reflection */}
              <div className="flex flex-col">
                <p className="text-lg text-gray-500 dark:text-gray-500">
                  Reflection
                </p>
                <h1 className="text-2xl font-bold text-black dark:text-white uppercase">
                  What I've Learnt & Special Thanks
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg text-black dark:text-white">
                  During this project, I've got the opportunity to:
                </p>
                <ul className="list-disc ms-8 text-lg text-black dark:text-white space-y-1">
                  <li>Learn more about Design Thinking and Product Design.</li>
                  <li>Conducted Live Usability Tests.</li>
                  <li>
                    Conducted A/B Experiment and having the new designs win
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold text-black dark:text-white">
                  Shoutout to all collaborators
                </p>
                <p className="text-lg text-black dark:text-white">
                  Huge shoutout to everyone I collaborated with during this
                  project
                </p>
                <ul className="list-disc ms-8 text-lg text-black dark:text-white space-y-1">
                  <li>Director of Aitiserve - Achmad Faizal</li>
                </ul>
              </div>
              {/* End Right-Content : Reflection */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
