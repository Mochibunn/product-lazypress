import { useParams } from "react-router-dom";
import { getBlog } from "../lib/dbClient";
import { useEffect } from "react";
import { useImmer } from "use-immer";
import { Button } from "@nextui-org/react";
import CMSNavEdit from "../components/CMSNavEdit";
import CMSBlogPageEdit from "../components/CMSBlogPageEdit";

export default function CMSPage() {
    const { blogId } = useParams();
    const [blog, setBlog] = useImmer();

    useEffect(() => {
        getBlog(blogId).then((blog) => {
            // console.log([...blogValues]);
            setBlog(blog);
        });
    }, []);

    return (
        <div className="w-screen p-4">
            <h3>Home Page</h3>
            <CMSNavEdit blog={blog} setBlog={setBlog} />
            <CMSBlogPageEdit blog={blog} setBlog={setBlog} />
            <Button
                onClick={() => {
                    console.log(blog.pages);
                }}
            >
                Log Stuff
            </Button>
        </div>
    );
}
