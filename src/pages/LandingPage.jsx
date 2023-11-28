import HeroBanner from "../components/HeroBanner";
import OurService from "../components/OurService";
import ExampleProduct from "../components/ExampleProduct";
import Subscription from "../components/Subscription";
import FreeTrial from "../components/FreeTrial";
import Testimonials from "../components/Testimonals";
import SlideShow from "../components/SlideShow";

import WhatWeDo from "../components/WhatWeDo";

export default function LandingPage() {
    document.title = `LazyPress`;
    return (
        <>
            <HeroBanner className="absolute" />
            <OurService />
            <WhatWeDo/>
            <ExampleProduct/>
            <SlideShow/>
            <Subscription />
            
        </>
    );
}
