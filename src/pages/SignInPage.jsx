import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
    return (
        <div className="flex justify-center items-center bg-tiffany-blue grow">
            <SignIn
                signUpUrl="/sign-up"
                appearance={{
                    elements: {
                        card: "bg-celadon",
                        formFieldInput: "bg-tiffany-blue",
                        internal: "bg-platinum",
                        formButtonPrimary: "bg-pink-lavender",
                    },
                }}
            />
        </div>
    );
};

export default SignInPage;
