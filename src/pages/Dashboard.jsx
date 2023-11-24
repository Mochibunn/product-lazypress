import SiteCard from "../components/SiteCard";
import {
  Spinner,
  Divider,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { useSites } from "../lib/swr";
import { useUser } from "@clerk/clerk-react";
import Tilt from "react-parallax-tilt";

export default function Dashboard() {
  const { user } = useUser();
  const { sites, isLoading } = useSites(user.id);
  document.title = `Dashboard | LazyPress`;

  console.log(sites);
  console.log(user.id);
  console.log(`This is what the user is:\n`, user);
  return (
    <div className="grow p-6 w-full bg-tiffany-blue">
      <h2 className="text-6xl font-metropolis font-bold mt-6 mb-16 text-center">
        Welcome, {user.firstName}
      </h2>
      <h1 className="watermark text-[150px] text-center">DESIGN WORK IN PROGRESS</h1>
      <Card className="w-11/12 mx-auto bg-background/50 backdrop-blur-md mb-12 shadow-2xl overflow-visible">
        <CardHeader className="mx-2">
          <p className="text-xl font-metropolis font-semibold my-4">
            Your pages:
          </p>
        </CardHeader>
        <Divider className="w-11/12 mx-auto my-0" />
        <CardBody className="my-2">
          <div className="grid grid-cols-3">
            {isLoading ? (
              <Spinner
                className="flex justify-center my-10"
                color="secondary"
                label="Loading..🐰"
              />
            ) : (
              sites.map((site) => {
                console.log(`💟\n`, site);
                return (
                  <Tilt tiltEnable={false} scale={1.05} transitionSpeed={800}>
                    <SiteCard
                      key={site._id}
                      blogId={site._id}
                      updatedAt={site.updatedAt}
                      deployed={site.deployed}
                      {...site.dashboard}
                    />
                  </Tilt>
                );
              })
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
