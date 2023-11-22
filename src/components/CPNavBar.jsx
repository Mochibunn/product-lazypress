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

export default function CPNavBar() {
    const { isSignedIn, isLoaded } = useUser();
    return (
        <Navbar className="bg-[#fffd00]">
            <NavbarBrand>
                <NavLink to="/" className="font-bold text-black-2 text-3xl">
                    LAZYPRESS
                </NavLink>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link
                        href="#"
                        disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent font-bold text-black-2"
                        radius="sm"
                        variant="light"
                    >
                        About
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        href="#"
                        aria-current="page"
                        className="font-bold text-black-2"
                    >
                        Products
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        color="foreground"
                        href="#"
                        className="font-bold text-black-2"
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
                                    className="bg-black-2 text-white font-bold"
                                >
                                    Log In
                                </Button>
                            </NavbarItem>
                            <NavbarItem>
                                <Button
                                    as={Link}
                                    color="secondary"
                                    href="sign-up"
                                    className="bg-black-2 text-white font-bold"
                                >
                                    Get Started
                                </Button>
                            </NavbarItem>
                        </>
                    ))}
            </NavbarContent>
        </Navbar>
    );
}
