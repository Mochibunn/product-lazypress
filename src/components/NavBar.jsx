import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from 'react';
// import Hero from "./Hero";

export default function NavBar() {
  const { isSignedIn, isLoaded } = useUser();
  const [isGlass, setIsGlass] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const isPast150vh = scrollPosition > window.innerHeight;

      setIsGlass(isPast150vh);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <Navbar className={`${isGlass ? 'glassNavBarMaterial' : 'transparentNavBar'}`} isBlurred='false'>
      <NavbarBrand>
        <NavLink to="/" className="font-bold text-slate-200 text-3xl neonText"  style={{fontFamily:'Mom Cake', color:'black'}}>
          LazyPress
        </NavLink>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center" style={{fontFamily:'Mom Cake'}}>
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="text-slate-200 text-black"
          >
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#"
            aria-current="page"
            className="text-slate-200 text-black"
          >
            Contact
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="text-slate-200 text-black"
          >
            Pricing
          </Link>
        </NavbarItem>

        {isSignedIn && (
          <NavbarItem>
            <Link
              className="font-bold text-slate-200"
              color="foreground"
              href="dashboard"
            >
              DASHBOARD
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {isLoaded &&
          (isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
            <NavbarItem>
                <Button
                  as={Link}
                  // color="primary"
                  href="sign-in"
                  variant="flat"
                  className=" jellyButtonNavBar"
                >
                  Sign In
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  
                  href="sign-up"
                  className="jellyButtonNavBar "
              
                >
                  Sign Up
                </Button>
              </NavbarItem>
              
            </>
          ))}
      </NavbarContent>
    </Navbar>
  );
}
