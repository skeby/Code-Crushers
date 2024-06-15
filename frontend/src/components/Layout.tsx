import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import NavBar from "./shared/NavBar";
import { APP_NAME } from "@/static";

const Layout = () => {
  return (
    <div className="min-h-screen relative flex flex-col">
      <header className="sticky top-0">
        <NavBar />
      </header>
      <main className="flex-grow lg:p-12 p-5">
        <Outlet />
      </main>
      <footer className="sticky bottom-0 lg:px-12 py-2 p-5 border-t border-white">
        <p>© 2024 {APP_NAME}. All rights reserved.</p>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
