import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Header />
      <div className="container px-6 py-4 mx-auto">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
