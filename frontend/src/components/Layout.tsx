import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import NavBar from "./shared/NavBar";
import { APP_NAME } from "@/static";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { setHasFinished } from "@/state/slices/uiSlice";

const Layout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { hasStarted } = useAppSelector((state) => state.ui);
  useEffect(() => {
    if (hasStarted && !location.pathname.includes("/student/exam/")) {
      true;
      dispatch(setHasFinished(true));
    }
  }, [hasStarted, location.pathname]);

  return (
    <div className="">
      <div className="min-h-screen relative flex flex-col">
        <header className="h-12 sticky top-0 z-[1] shadow-header backdrop-blur-[3px] bg-background/50">
          <NavBar />
        </header>
        <main className="flex-grow lg:p-12 p-5 max-w-[1200px] w-full mx-auto">
          <Outlet />
        </main>
        <footer className="sticky bg-secondary bottom-0 text-center lg:px-12 py-2 p-5 border-t text-primary">
          <p className="font-semibold">
            © {new Date().getFullYear()} {APP_NAME}.
          </p>
        </footer>
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default Layout;
