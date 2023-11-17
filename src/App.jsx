import { Route, Routes } from "react-router-dom";
import { ClerkProvider, SignIn, SignUp, SignedIn } from "@clerk/clerk-react";

import Layout from "./pages/Layout";
// import NavBar from "./components/NavBar";
// import LandingPage from "./pages/LandingPage";
// import SignInPage from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  // const { isSignedIn } = useUser();
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<LandingPage />} /> */}
          <Route
            index
            element={
              <div className="h-screen bg-green-300 flex flex-col justify-center items-center">
                <h3 className="text-8xl">PlaceHolder</h3>
              </div>
            }
          />
          <Route
            path="sign-in/*"
            element={<SignIn routing="path" path="/sign-in" />}
          />
          <Route
            path="sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
          />
          <Route
            path="dashboard"
            element={
              <SignedIn>
                <Dashboard />
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
