import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
    return (
        <div className="flex justify-center">
            <SignIn signUpUrl="/sign-up" />
        </div>
    );
};

export default SignInPage;
