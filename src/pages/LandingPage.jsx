import HeroBanner from "../components/HeroBanner";
import OurService from "../components/OurService";
import ExampleProduct from "../components/ExampleProduct";
import Subscription from "../components/Subscription";
import SlideShow from "../components/SlideShow";
import WhatWeDo from "../components/WhatWeDo";
import Footer from "../components/Footer";
import LandingPageNavBar from '../components/LandingPageNavBar';
import PricingSection from "../components/PricingSection";


export default function LandingPage() {
    document.title = `LazyPress`;
    return (
        <>
            <LandingPageNavBar />
            <HeroBanner className="absolute" />
            <OurService />
            <WhatWeDo/>
            <ExampleProduct/>
            <SlideShow/>
          <PricingSection/>
            <Subscription />
            <Footer />
            
        </>
    );
}
