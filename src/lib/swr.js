import axios from "axios";
import useSWR from "swr";

const backend = "http://localhost:24601";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useSites = (clerkId) => {
    const { data, error, isLoading } = useSWR(
        `${backend}/blogs/user/${clerkId}`,
        fetcher
    );

    return {
        sites: data,
        isLoading,
        isError: error,
    };
};

export { useSites };
