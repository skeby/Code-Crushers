import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import NavBar from "./shared/NavBar";
import { APP_NAME } from "@/static";

const Layout = () => {
  return (
    <div className="">
      <div className="min-h-screen relative flex flex-col">
        <header className="sticky top-0 z-[1] shadow-header backdrop-blur-[3px] bg-background/50">
          <NavBar />
        </header>
        <main className="flex-grow lg:p-12 p-5 max-w-[1200px] w-full mx-auto">
          <Outlet />
        </main>
        <footer className="sticky dark:bg-white bg-black bottom-0 text-center lg:px-12 py-2 p-5 border-t dark:border-white border-black text-secondary">
          <p className="font-semibold">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </footer>
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default Layout;
