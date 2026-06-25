import { Outlet } from "react-router-dom";
import NavBar from "./nav";

const Layout = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <NavBar />

      <main className="ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;