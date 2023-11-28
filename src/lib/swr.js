import axios from "axios";
import useSWR from "swr";

// const backend = "http://localhost:24601";
let backend;
backend = import.meta.env.DEV
    ? import.meta.env.VITE_BACKEND_DEV
    : import.meta.env.VITE_BACKEND_DEPLOY;

const lazyPress = axios.create({
    baseURL: backend,
});

const fetcher = (url) => lazyPress.get(url).then((res) => res.data);

import { useAuth } from "@clerk/clerk-react";

const useSites = (clerkId) => {
    const { data, error, isLoading } = useSWR(
        `/blogs/user/${clerkId}`,
        fetcher
    );

    return {
        sites: data,
        isLoading,
        isError: error,
    };
};

const useBlog = (blogId) => {
    const { data, error, isLoading, mutate } = useSWR(
        `/blogs/${blogId}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return {
        swrBlog: data,
        isLoading,
        isError: error,
        mutateBlog: mutate,
    };
};

const useRecipe = (recipeId) => {
    const { data, error, isLoading, mutate } = useSWR(
        `/recipes/${recipeId}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return {
        recipe: data,
        isLoading,
        isError: error,
        mutateRecipe: mutate,
    };
};

export { useSites, useBlog, useRecipe, useClerkSWR };

//might bring back later
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
