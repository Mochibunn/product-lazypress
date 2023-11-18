import { Route, Routes } from "react-router-dom";
import { ClerkProvider, SignIn, SignUp, SignedIn } from "@clerk/clerk-react";

import Layout from "./pages/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CMSPage from "./pages/CMSPage";
import CMSTestPage from "./pages/CMSTestPage";
import NotFound from "./pages/NotFound";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
    return (
        <ClerkProvider publishableKey={clerkPubKey}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<LandingPage />} />
                    <Route
                        path="sign-in/*"
                        element={<SignInPage routing="path" path="/sign-in" />}
                    />
                    <Route
                        path="sign-up/*"
                        element={<SignUpPage routing="path" path="/sign-up" />}
                    />
                    <Route
                        path="dashboard"
                        element={
                            <SignedIn>
                                <Dashboard />
                            </SignedIn>
                        }
                    />
                    <Route
                        path="cms"
                        element={
                            <SignedIn>
                                <CMSPage />
                            </SignedIn>
                        }
                    />
                    <Route
                        path="cms/:blogId"
                        element={
                            <SignedIn>
                                <CMSTestPage />
                            </SignedIn>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </ClerkProvider>
    );
}

export default App;
