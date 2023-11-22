import HeroBanner from "../components/HeroBanner";
import OurService from "../components/OurService";
import ExampleProduct from "../components/ExampleProduct";
import Explore from "../components/Explore";
import Subscription from "../components/Subscription";
import FreeTrial from "../components/FreeTrial";
import { useClerkSWR } from "../lib/swr";
import { getAuth } from "../lib/dbClient";

export default function LandingPage() {
  // getAuth().then((res) => console.log(res));

  // console.log(useClerkSWR("http://localhost:24601/blogs/protected/endpoint"));
  return (
    <>
      <HeroBanner />
      <OurService />
      <ExampleProduct />
      <Explore />
      <Subscription />
      <FreeTrial />
    </>
  );
}
