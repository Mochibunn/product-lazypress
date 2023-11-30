import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar className="relative" />
            <Outlet />
            <Footer />
            <ToastContainer />
        </div>
    );
}
