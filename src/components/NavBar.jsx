import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useState } from "react";
// import Hero from "./Hero";

// const isMobile = window.matchMedia("(max-width: 600px)");

export default function NavBar() {
    const { isSignedIn, isLoaded } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // console.log("is mobile", isMobile.matches);
    return (
        <Navbar
            className="glassNavBarMaterial"
            isBlurred="false"
            onMenuOpenChange={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
        >
            <NavbarContent justify="start">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link
                        href="/"
                        className="hidden sm:block font-bold text-slate-200 text-3xl neonText"
                        style={{ fontFamily: "Mom Cake", color: "black" }}
                    >
                        LazyPress
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            {/* to show logo on mobile */}
            <NavbarContent className="sm:hidden">
                <NavbarBrand>
                    <Link
                        href="/"
                        className="font-bold text-slate-200 text-3xl neonText"
                        style={{ fontFamily: "Mom Cake", color: "black" }}
                    >
                        LazyPress
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            {/* end mobile logo */}
            <NavbarContent
                className="hidden sm:flex gap-4"
                justify="center"
                style={{ fontFamily: "Mom Cake" }}
            >
                <NavbarItem>
                    <Link
                        href="/aboutus"
                        aria-current="page"
                        className="text-black"
                    >
                        About
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color="foreground"
                        // href="contactus"
                        href="/contactus"
                        className="text-black"
                    >
                        Contact
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color="foreground"
                        href="/pricing"
                        className="text-black"
                    >
                        Pricing
                    </Link>
                </NavbarItem>
                {isSignedIn && (
                    <NavbarItem>
                        <Link
                            className="text-black"
                            color="foreground"
                            href="/dashboard"
                        >
                            Dashboard
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
                                    className="jellyButtonNavBar"
                                >
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </>
                    ))}
            </NavbarContent>
            {/* For mobile dropdown menu */}
            <NavbarMenu className="glassNavBarMaterial">
                <NavbarMenuItem>
                    <Link
                        href="/aboutus"
                        aria-current="page"
                        color="foreground"
                        className="w-full"
                        size="lg"
                    >
                        About
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link
                        color="foreground"
                        href="/contactus"
                        className="w-full"
                        size="lg"
                    >
                        Contact
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link
                        href="/pricing"
                        aria-current="page"
                        color="foreground"
                        className="w-full"
                        size="lg"
                    >
                        Pricing
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    {isSignedIn && (
                        <Link
                            className="text-black"
                            color="foreground"
                            href="/dashboard"
                            size="lg"
                        >
                            Dashboard
                        </Link>
                    )}
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}
