import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

// const backend = "http://localhost:24601";
let backend;
backend = import.meta.env.DEV
    ? import.meta.env.VITE_BACKEND_DEV
    : import.meta.env.VITE_BACKEND_DEPLOY;

const getSites = async (clerkId) => {
    try {
        const { data } = await axios.get(`${backend}/blogs/user/${clerkId}`);
        return data;
    } catch (error) {
        console.error(error);
    }
};

const getBlog = async (blogId) => {
    try {
        const { data } = await axios.get(`${backend}/blogs/${blogId}`);
        return data;
    } catch (error) {
        console.error(error);
    }
};

const editBlog = async (sessToken, blog) => {
    const { _id, pages, dashboard, clerkUser, clerkUserId } = blog;
    try {
        const response = await axios.put(
            `${backend}/blogs/${_id}`,
            {
                pages,
                dashboard,
                clerkUser,
                clerkUserId,
            },
            {
                headers: { Authorization: `Bearer ${sessToken}` },
            }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

const editRecipe = async (sessToken, recipe) => {
    const {
        title,
        category,
        region,
        ingList,
        steps,
        text,
        button,
        imgUrl,
        videoUrl,
        tags,
        clerkUserId,
        _id,
    } = recipe;
    try {
        const response = await axios.put(
            `${backend}/recipes/${_id}`,
            {
                title,
                category,
                region,
                ingList,
                steps,
                text,
                button,
                imgUrl,
                videoUrl,
                tags,
                clerkUserId,
            },
            {
                headers: { Authorization: `Bearer ${sessToken}` },
            }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

const getAuth = async (sessToken) => {
    // const { getToken } = useAuth();
    try {
        // const sessToken = await getToken();
        const { data } = await axios.get(
            `${backend}/blogs/protected/endpoint`,
            {
                headers: { Authorization: `Bearer ${sessToken}` },
            }
        );
        return data;
    } catch (error) {
        console.error(error);
    }
};

const editBlogAuth = async (sessToken, blog) => {
    // const { getToken } = useAuth();
    const { pages, dashboard, clerkUser, clerkUserId } = blog;
    try {
        // const sessToken = await getToken();
        const { data } = await axios.post(
            `${backend}/blogs/protected/endpoint`,
            {
                pages,
                dashboard,
                clerkUser,
                clerkUserId,
            },
            {
                headers: { Authorization: `Bearer ${sessToken}` },
            }
        );
        return data;
    } catch (error) {
        console.error(error);
    }
};

export { getSites, getBlog, editBlog, editRecipe, getAuth, editBlogAuth };

// const editBlog = async (blog) => {
//     const { _id, pages, dashboard, clerkUser, clerkUserId } = blog;
//     try {
//         const response = await axios.put(`${backend}/blogs/${_id}`, {
//             pages,
//             dashboard,
//             clerkUser,
//             clerkUserId,
//         });
//         return response;
//     } catch (error) {
//         console.error(error);
//     }
// };
