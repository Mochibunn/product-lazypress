import { useParams } from "react-router-dom";
import { getBlog, editBlog } from "../lib/dbClient";
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { Button } from "@nextui-org/react";
import CMSStrEdit from "../components/CMSStrEdit";
import CMSObjEdit from "../components/CMSObjEdit";

export default function CMSPage() {
    const { blogId } = useParams();
    const [blog, setBlog] = useImmer();
    const [navBarInputValues, setNavBarInputValues] = useState();
    const [blogPagesValues, setBlogPagesValues] = useState();
    const [heroValues, setHeroValues] = useState();
    const [footerValues, setFooterValues] = useState();

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
            const footerValues = blog.pages.home.footer.map((item, i) => ({
                value: item,
                label: `Footer${i + 1}`,
            }));
            setNavBarInputValues([...navBarValues]);
            setBlogPagesValues([...blogValues]);
            setHeroValues([...heroValues]);
            setFooterValues([...footerValues]);
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
            <CMSStrEdit
                sectionTitle={"NavBar Items"}
                section={"navBar"}
                sectionValues={navBarInputValues}
                setSectionValues={setNavBarInputValues}
                blog={blog}
                setBlog={setBlog}
            />
            <CMSStrEdit
                sectionTitle={"Footer Items"}
                section={"footer"}
                sectionValues={footerValues}
                setSectionValues={setFooterValues}
                blog={blog}
                setBlog={setBlog}
            />

            <CMSObjEdit
                sectionTitle={"Blog Pages"}
                section={"blogPages"}
                sectionValues={blogPagesValues}
                // setBlogPagesValues={setBlogPagesValues}
                blog={blog}
                setBlog={setBlog}
            />
            <CMSObjEdit
                sectionTitle={"Hero Section"}
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
