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
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <Navbar className={`${isGlass ? 'glassNavBarMaterial' : 'transparentNavBar'}`} isBlurred='false'>
      <NavbarBrand>
        <NavLink to="/" className="font-bold text-slate-200 text-3xl neonText"  style={{fontFamily:'Nick'}}>
          LazyPress
        </NavLink>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center" style={{fontFamily:'Helvetica'}}>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-slate-20 neonText"
                // endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Contact
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              description="ACME scales apps to meet user demand, automatically, based on load."
              //   startContent={icons.scale}
            >
              Autoscaling
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
              //   startContent={icons.activity}
            >
              Usage Metrics
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description="ACME runs on ACME, join us and others serving requests at web scale."
              //   startContent={icons.flash}
            >
              Production Ready
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description="Applications stay on the grid with high availability and high uptime guarantees."
              //   startContent={icons.server}
            >
              +99% Uptime
            </DropdownItem>
            <DropdownItem
              key="supreme_support"
              description="Overcome any challenge with a supporting team ready to respond."
              //   startContent={icons.user}
            >
              +Supreme Support
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
       
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
                  color="secondary"
                  href="sign-up"
                  className="bg-sky-800 text-white font-bold buttonGradient neonBoxShadow"
                >
                  Sign Up
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  // color="primary"
                  href="sign-in"
                  variant="flat"
                  className="bg-white text-black font-bold buttonGradient neonBoxShadow"
                >
                  Sign In
                </Button>
              </NavbarItem>
            </>
          ))}
      </NavbarContent>
    </Navbar>
  );
}
