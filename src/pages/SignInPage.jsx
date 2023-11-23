import { SignIn } from "@clerk/clerk-react";
import DShapeA from "../assets/images/3DShape1.jpg";

const SignInPage = () => {
    return (
        <div
            className="flex justify-center items-center grow py-16"
            style={{
                backgroundImage: `url(${DShapeA})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                marginTop: "-4rem",
            }}
        >
            <SignIn
                signUpUrl="/sign-up"
                appearance={{
                    elements: {
                        card: "bg-tiffany-blue",
                        formFieldInput: "bg-thistle",
                        internal: "bg-platinum",
                        formButtonPrimary: "jellyButtonNavBar",
                    },
                }}
            />
        </div>
    );
};

export default SignInPage;
