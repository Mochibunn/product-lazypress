import axios from "axios";

const backend = "http://localhost:24601";
// const backend = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

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

export { getSites, getBlog };
