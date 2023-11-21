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

export default function Dashboard() {
  const { user } = useUser();
  const { sites, isLoading } = useSites(user.id);

  console.log(sites);
  console.log(user.id);
  console.log(`This is what the user is:\n`, user);
  return (
    <div className="grow p-6 bg-tiffany-blue">
      <h2 className="text-5xl font-bold mb-8">Welcome, {user.firstName}</h2>
      <Card className="w-11/12 mx-auto bg-background/60">
        <CardHeader className="mx-2">
          <p className="text-2xl font-semibold my-4">Your pages:</p>
        </CardHeader>
        <Divider className="w-11/12 mx-auto my-0" />
        <CardBody className="my-2">
          <div className="grid grid-cols-3">
            {isLoading ? (
              <Spinner />
            ) : (
              sites.map((site) => {
                console.log(`💟\n`, site);
                return (
                  <SiteCard
                    key={site._id}
                    blogId={site._id}
                    {...site.dashboard}
                  />
                );
              })
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
