import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner"

const Layout = () => {
  return (
    <div>
      <header>
        <h1>App nav</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2024 App. All rights reserved.</p>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
