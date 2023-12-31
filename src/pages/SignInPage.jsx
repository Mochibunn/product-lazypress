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
                height:'100vh'
            }}
        >
            <SignIn
                signUpUrl="/sign-up"
                appearance={{
                    elements: {
                        card: "glassCardSmall",
                        formFieldInput: "glassInput",
                        internal: "bg-platinum",
                        formButtonPrimary: "jellyButtonNavBar",
                    },
                }}
            />
        </div>
    );
};

export default SignInPage;
