import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner"
import NavBar from './shared/NavBar';

const Layout = () => {
  return (
    <div>
      <header>
        <div>
          <NavBar />
        </div>
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
