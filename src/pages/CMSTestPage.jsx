import { useParams } from "react-router-dom";
import { getBlog, editBlog } from "../lib/dbClient";
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { Button } from "@nextui-org/react";
import CMSNavEdit from "../components/CMSNavEdit";
import CMSBlogPageEdit from "../components/CMSBlogPageEdit";
import CMSInputSection from "../components/CMSInput Section";

export default function CMSPage() {
    const { blogId } = useParams();
    const [blog, setBlog] = useImmer();
    const [navBarInputValues, setNavBarInputValues] = useState();
    const [blogPagesValues, setBlogPagesValues] = useState();
    const [heroValues, setHeroValues] = useState();

    useEffect(() => {
        getBlog(blogId).then((blog) => {
            const navBarValues = blog.pages.home.navBar.map((item, i) => ({
                value: item,
                label: `Nav${i + 1}`,
            }));

            const blogValues = blog.pages.home.blogPages.map((page) => {
                const pageValues = Object.entries(page).map(([key, value]) => ({
                    value,
                    label: key,
                }));
                return pageValues;
            });
            const heroValues = blog.pages.home.hero.map((page) => {
                const theValues = Object.entries(page).map(([key, value]) => ({
                    value,
                    label: key,
                }));
                return theValues;
            });
            setNavBarInputValues([...navBarValues]);
            setBlogPagesValues([...blogValues]);
            setHeroValues([...heroValues]);
            setBlog(blog);
        });
    }, []);

    const saveChangesClick = () => {
        editBlog(blog)
            .then((response) => console.log(response))
            .catch((err) => console.error(err));
    };

    return (
        <div className="w-screen p-4">
            <h3>Home Page</h3>
            <CMSNavEdit
                navBarInputValues={navBarInputValues}
                setNavBarInputValues={setNavBarInputValues}
                blog={blog}
                setBlog={setBlog}
            />
            {/* attempt at making input section reusable with navar-doesn't work yet */}
            {/* {navBarInputValues && (
                <div className="w-3/4 p-4 border-solid border-2 border-black my-4">
                    <h3>Nav as input section</h3>
                    <CMSInputSection array={navBarInputValues} />
                </div>
            )} */}
            <CMSBlogPageEdit
                sectionName={"Blog Pages"}
                section={"blogPages"}
                sectionValues={blogPagesValues}
                // setBlogPagesValues={setBlogPagesValues}
                blog={blog}
                setBlog={setBlog}
            />
            <CMSBlogPageEdit
                sectionName={"Hero Section"}
                section={"hero"}
                sectionValues={heroValues}
                // setBlogPagesValues={setBlogPagesValues}
                blog={blog}
                setBlog={setBlog}
            />

            <Button className="mr-4" color="success" onClick={saveChangesClick}>
                Save Changes
            </Button>
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
