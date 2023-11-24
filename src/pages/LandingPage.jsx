import HeroBanner from "../components/HeroBanner";
import OurService from "../components/OurService";
import ExampleProduct from "../components/ExampleProduct";
import Explore from "../components/Explore";
import Subscription from "../components/Subscription";
import FreeTrial from "../components/FreeTrial";
import Testimonials from "../components/Testimonals";

export default function LandingPage() {
    document.title = `LazyPress`;
    return (
        <>
            <HeroBanner className="absolute" />
            <OurService />
            <Explore />
           
            <ExampleProduct />
            <Testimonials/>
            <FreeTrial />
            <Subscription />
            
        </>
    );
}
