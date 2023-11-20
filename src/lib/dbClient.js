import axios from "axios";

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

const editBlog = async (blog) => {
    const { _id, pages, dashboard, clerkUser, clerkUserId } = blog;
    try {
        const response = await axios.put(`${backend}/blogs/${_id}`, {
            pages,
            dashboard,
            clerkUser,
            clerkUserId,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export { getSites, getBlog, editBlog };
