import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
// import Footer from "../components/Footer";

export default function Layout() {
  return (
    <>
      <NavBar />
      <Hero />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}
