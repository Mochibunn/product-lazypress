import SiteCard from "../components/SiteCard";
import { Spinner, Divider } from "@nextui-org/react";
import { useSites } from "../lib/swr";
import { useUser } from "@clerk/clerk-react";

export default function Dashboard() {
    const { user } = useUser();
    const { sites, isLoading } = useSites(user.id);

    console.log(sites);
    console.log(user.id);
    return (
        <div className="grow p-6 bg-tiffany-blue">
            <h2 className="text-6xl mb-4">My Websites</h2>
            <Divider className="mb-8" />
            <div>
                {isLoading ? (
                    <Spinner />
                ) : (
                    sites.map((site) => {
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
        </div>
    );
}
