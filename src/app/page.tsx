import ThemeToggle from "@/components/common/ThemeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-content flex flex-col items-center py-10 ">
      <div className="container relative mx-auto px-4 flex justify-between items-center">
        {/* Theme Toggle - Fixed on right side */}
        <div className="absolute right-0 top-[50vh] -translate-y-1/2">
          <ThemeToggle />
        </div>
        {/* Header */}
        <div className="w-full flex flex-col ">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Image src="/logo.svg" alt="Linkly" width={140} height={32} />
            </div>
            <div className="flex gap-4">
              <button className="btn btn-ghost">Login</button>
              <button className="btn btn-primary">Register Now</button>
            </div>
          </div>
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center">
              <Image
                src="/main-text.svg"
                alt="Linkly"
                width={600}
                height={32}
              />
            </div>
            <div className="text-center">
              Linkly is an efficient and easy-to-use URL shortening service that
              streamlines your online experience.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
