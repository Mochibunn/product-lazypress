import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar className='relative'/>
      <Outlet />
      <Footer />
    </div>
  );
}
