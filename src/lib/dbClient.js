import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const backend = "http://localhost:24601";

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

<<<<<<< HEAD
const editBlog = async (blog) => {
    const { _id, pages, dashboard, clerkUser, clerkUserId } = blog;
    try {
        const response = await axios.put(`${backend}/blogs/${_id}`, {
            pages,
            dashboard,
            clerkUser,
            clerkUserId,
        });
=======
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
>>>>>>> origin/main
        return response;
    } catch (error) {
        console.error(error);
    }
};

<<<<<<< HEAD
export { getSites, getBlog, editBlog };
=======
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

export { getSites, getBlog, editBlog, getAuth, editBlogAuth };
>>>>>>> origin/main
