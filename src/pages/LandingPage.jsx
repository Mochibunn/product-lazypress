import HeroBanner from "../components/HeroBanner";
import OurService from "../components/OurService";
//import ExampleProduct from "../components/ExampleProduct";
import Explore from "../components/Explore";
import Subscription from "../components/Subscription";
import FreeTrial from "../components/FreeTrial";
import Testimonials from "../components/Testimonals";

import WhatWeDo from "../components/WhatWeDo";

export default function LandingPage() {
    document.title = `LazyPress`;
    return (
        <>
            <HeroBanner className="absolute" />
            <OurService />
            <WhatWeDo/>
           
            <Testimonials/>
            <Explore />
            <FreeTrial />
            <Subscription />
            
        </>
    );
}
