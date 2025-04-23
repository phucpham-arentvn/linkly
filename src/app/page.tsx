import ThemeToggle from "@/components/common/ThemeToggle";
import Image from "next/image";
import Header from "@/components/shared/Header";
import ShortenInput from "@/components/shared/ShortenInput";
import History from "@/components/shared/History";

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
          <Header />
          <div className="container mx-auto px-4 mt-32">
            <div className="flex justify-center items-center">
              <Image
                src="/main-text.svg"
                alt="Linkly"
                width={600}
                height={32}
              />
            </div>
            <div className="text-center text-md mt-2 w-1/2 mx-auto">
              Linkly is an efficient and easy-to-use URL shortening service that
              streamlines your online experience.
            </div>
          </div>
          <ShortenInput className="mt-10" />
          <div className="container mx-auto px-20 mt-10">
            <History />
          </div>
        </div>
      </div>
    </div>
  );
}
