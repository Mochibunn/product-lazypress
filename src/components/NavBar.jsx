import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
// import Hero from "./Hero";

export default function NavBar() {
    const { isSignedIn, isLoaded } = useUser();

    return (
        <Navbar className="glassNavBarMaterial" isBlurred="false">
            <NavbarBrand>
                <NavLink
                    to="/"
                    className="font-bold text-slate-200 text-3xl neonText"
                    style={{ fontFamily: "Mom Cake", color: "black" }}
                >
                    LazyPress
                </NavLink>
            </NavbarBrand>
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
                        // to="contactus"
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
        </Navbar>
    );
}
