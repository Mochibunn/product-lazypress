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

export { getSites };
