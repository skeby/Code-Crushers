import { Outlet } from 'react-router-dom';

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
    </div>
  );
};

export default Layout;
