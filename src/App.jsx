import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { ClerkProvider, SignedIn } from "@clerk/clerk-react";

import Layout from "./pages/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import CMSPage from "./pages/CMSPage";
import CMSTestPage from "./pages/CMSTestPage";
import NotFound from "./pages/NotFound";
import ContactPage from "./pages/ContactPage";
import PricingPage from "./pages/PricingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
// const LazySignInPage = React.lazy(() => import("./pages/SignInPage"));
// const LazySignUpPage = React.lazy(() => import("./pages/SignUpPage"));

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
            // element={
            //     <Suspense fallback={<Spinner />}>
            //         <LazySignInPage
            //             routing="path"
            //             path="/sign-in"
            //         />
            //     </Suspense>
            // }
          />
          <Route
            path="sign-up/*"
            element={<SignUpPage routing="path" path="/sign-up" />}
            // element={
            //     <Suspense fallback={<Spinner />}>
            //         <LazySignUpPage
            //             routing="path"
            //             path="/sign-up"
            //         />
            //     </Suspense>
            // }
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
          <Route
            path="contactus/*"
            element={<ContactPage routing="path" path="/contactus" />}
          />
          <Route
            path="pricing/*"
            element={<PricingPage routing="path" path="/pricing" />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ClerkProvider>
  );
}

export default App;
