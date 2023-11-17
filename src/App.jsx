import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
// import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={
                        <div className="h-screen bg-green-300 flex justify-center items-center">
                            <h3 className="text-8xl">Placeholder</h3>
                        </div>
                    }
                />
                {/* <Route index element={<LandingPage />} /> */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
