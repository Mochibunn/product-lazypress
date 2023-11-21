import axios from "axios";
import useSWR from "swr";

const backend = "http://localhost:24601";

const fetcher = (url) => axios.get(url).then((res) => res.data);

// const authFetcher = async (url)=> {
//     axios.get(url, {
//         headers: { Authorization: `Bearer ${await getToken()}` },
//     });
// }
import { useAuth } from "@clerk/clerk-react";

const useClerkSWR = (url) => {
    const { getToken } = useAuth();

    const fetcher = async (...args) => {
        return fetch(...args, {
            headers: { Authorization: `Bearer ${await getToken()}` },
        }).then((res) => res.json());
    };

    const { data } = useSWR(url, fetcher);
    return {
        data,
    };
};

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

const useBlog = (blogId) => {
    const { data, error, isLoading } = useSWR(
        `${backend}/blogs/${blogId}`,
        fetcher
    );

    return {
        blog: data,
        isLoading,
        isError: error,
    };
};

export { useSites, useBlog, useClerkSWR };
