import SiteCard from "../components/SiteCard";
import { Spinner } from "@nextui-org/react";
import { useSites } from "../lib/swr";
import { useUser } from "@clerk/clerk-react";
// import useSWR from "swr";

// const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Dashboard() {
    const { user } = useUser();
    const { sites, isLoading } = useSites(user.id);

    console.log(sites);
    console.log(user.id);
    return (
        <>
            <h2 className="text-6xl">My Websites</h2>
            <div className="">
                {isLoading ? (
                    <Spinner />
                ) : (
                    sites.map((site) => {
                        return <SiteCard key={site._id} />;
                    })
                )}
            </div>
        </>
    );
}
