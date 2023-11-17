import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";
import { useUser, UserButton } from "@clerk/clerk-react";

export default function NavBar() {
    const { isSignedIn } = useUser();
    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold text-inherit">LAZYPRESS</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#" aria-current="page" color="foreground">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
                {isSignedIn && (
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Dashboard
                        </Link>
                    </NavbarItem>
                )}
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                {isSignedIn ? (
                    <UserButton />
                ) : (
                    <>
                        <NavbarItem>
                            <Button
                                as={Link}
                                color="secondary"
                                href="sign-up"
                                variant="flat"
                            >
                                Sign Up
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                as={Link}
                                color="primary"
                                href="sign-in"
                                variant="flat"
                            >
                                Sign In
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
        </Navbar>
    );
}
