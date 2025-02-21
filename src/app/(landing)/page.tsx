import Footer from "@/app/(landing)/_components/footer";
import ModelViewer from "@/app/(landing)/_components/model-viewer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="relative w-full min-h-screen bg-white">
      {/* Floating Header */}
      <div className="fixed w-[90%] motion-preset-slide-down md:w-3/4 left-1/2 -translate-x-1/2 rounded-full top-4 right-0 bg-primary backdrop-blur-sm shadow-sm z-50 py-4">
        <div className="container flex justify-between items-center">
          <div className="font-semibold text-white">Labeeb AI</div>
          <div className="flex gap-1">
            <Button
              variant="default"
              className="border-0 shadow-none text-sm underline underline-offset-4"
              asChild
              size="sm"
            >
              <Link href="/chat">Chat</Link>
            </Button>
            <Button
              variant="default"
              className="border-0 shadow-none text-sm underline underline-offset-4"
              asChild
              size="sm"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Existing Content */}
      <div className="flex md:items-center md:justify-evenly container md:flex-row flex-col min-h-screen">
        <div className="mt-32 md:mt-0 mb-6 md:mb-0 md:w-1/3 md:me-4 motion-preset-slide-right ">
          <h1 className="text-4xl md:text-5xl font-bold  bg-clip-text text-transparent bg-gradient-to-b from-primary to-[#a8677a] mb-2">
            Meet Labeeb
          </h1>
          <p className="text-md text-gray-800">
            AI Assistant for the National Planning Council of Qatar
          </p>
          <div className="flex gap-4 justify-start mt-4">
            <Button asChild>
              <Link href="/chat">Get Started</Link>
            </Button>
            <Button variant={"outline"} asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
        <div className="h-72 md:h-96 md:w-1/3">
          <ModelViewer />
        </div>
      </div>
      <Footer />
      {/* <div className="container max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-primary mb-6">Labeeb AI</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Empowering the future through artificial intelligence and data
          innovation
        </p>
      </div> */}
    </main>
  );
}
