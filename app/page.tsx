import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
      <div className="flex">
        <div className="flex justify-center items-center w-full min-h-screen">
          <ModeToggle />
        </div>
      </div>
  );
}
