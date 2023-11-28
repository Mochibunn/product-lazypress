import { useBlog } from "../lib/swr";
import { editBlog } from "../lib/dbClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import "react-toastify/dist/ReactToastify.css";
import CMSObjEdit from "../components/CMS_components/CMSObjEdit";
import CMSRecipes from "../components/CMS_components/CMSRecipes";
import { ToastContainer, toast } from "react-toastify";
import {
    Accordion,
    AccordionItem,
    Button,
    Tabs,
    Tab,
    Textarea,
} from "@nextui-org/react";
import {
    CgClapperBoard,
    CgClipboard,
    CgDrive,
    CgHome,
    CgImage,
    CgWebsite,
} from "react-icons/cg";

export default function CMSTestPage() {
    const { blogId } = useParams();
    const [navBarInputValues, setNavBarInputValues] = useState();
    const [blogPagesValues, setBlogPagesValues] = useState();
    const [footerValues, setFooterValues] = useState();
    const [blogTitle, setBlogTitle] = useState(null);
    const { swrBlog, mutateBlog } = useBlog(blogId);
    const [heroValues, setHeroValues] = useState();
    const { getToken } = useAuth();
    document.title = `Edit blog | LazyPress`;
    // const [buttonSpin, setButtonSpin] = useState(false); Might remove this line later — Mochi
    // console.log(`🧡\n`, swrBlog);

    // const notify = (content, mode) => toast(content, {theme: `${mode || "light"}`});

    const setTitle = (e) => {
        setBlogTitle(e.target.value);
        console.log(`👽 Current title:\n`, e.target.value);
    };

    useEffect(() => {
        if (!swrBlog) return;

        const navBarValues = swrBlog.pages.home.navBar.map((page) => {
            const theValues = Object.entries(page).map(([key, value]) => ({
                value,
                label: key,
                key: crypto.randomUUID(),
            }));
            // console.log(theValues);
            return theValues;
        });

        const footerValues = swrBlog.pages.home.footer.map((page) => {
            const theValues = Object.entries(page).map(([key, value]) => ({
                value,
                label: key,
                key: crypto.randomUUID(),
            }));
            // console.log(theValues);
            return theValues;
        });

        const blogValues = swrBlog.pages.home.blogPages.map((page) => {
            const pageValues = Object.entries(page).map(([key, value]) => {
                return {
                    value,
                    label: key,
                    key: crypto.randomUUID(),
                };
            });
            // console.log(pageValues);
            return pageValues;
        });
        const heroValues = swrBlog.pages.home.hero.map((page) => {
            const theValues = Object.entries(page).map(([key, value]) => ({
                value,
                label: key,
                key: crypto.randomUUID(),
            }));
            // console.log(theValues);
            return theValues;
        });

        setBlogTitle(swrBlog.dashboard.blogTitle);
        setNavBarInputValues([...navBarValues]);
        setFooterValues([...footerValues]);
        setBlogPagesValues([...blogValues]);
        setHeroValues([...heroValues]);
    }, [swrBlog]);

    const saveChangesClick = async () => {
        // setButtonSpin(true); Might remove this line later — Mochi
        try {
            const sessToken = await getToken();
            swrBlog.dashboard.blogTitle = blogTitle;
            editBlog(sessToken, swrBlog).then((res) => {
                console.log("came from protected route", res);
                console.log(`🐰Status:\n`, res.status);
                console.log(`AAAAA\n`, swrBlog);
            });
            mutateBlog();
            toast.success(`Changes saved.`);
            // setButtonSpin(false); Might remove this line later — Mochi
        } catch (error) {
            toast.error(`Changes not saved.`);
            console.error(error);
        }
    };

    return (
        <div className="w-full p-4 min-h-screen">
            {/* <h1 className="watermark text-[150px] text-center">DESIGN WORK IN PROGRESS</h1> Uncomment this during presentation */}
            <div aria-hidden className="mb-2 flex rounded-lg">
                <h3 className="text-4xl font-semibold font-metropolis">Edit</h3>
                <Textarea
                    value={blogTitle || ""}
                    placeholder="Page"
                    onChange={setTitle}
                    minRows={1}
                    className="cms-title"
                />
            </div>
            <Tabs
                aria-label="Site Pages"
                className="ml-3 w-1/2 h-full"
                classNames={{
                    tabList: "w-full h-12 bg-default",
                    cursor: "h-15",
                    tab: "text-xl font-bold mx-1",
                    tabContent: "",
                }}
            >
                <Tab
                    key="home"
                    title={
                        <div className="flex items-center space-x-2">
                            <CgHome />
                            <span>Home</span>
                        </div>
                    }
                    className="font-metropolis"
                >
                    <div aria-hidden className="w-10/12">
                        <Accordion
                            variant="splitted"
                            className="font-metropolis"
                        >
                            <AccordionItem
                                key="1"
                                title="Navbar Items"
                                subtitle=""
                                startContent={<CgDrive />}
                            >
                                <CMSObjEdit
                                    // sectionTitle={"NavBar Items"}
                                    section={"navBar"}
                                    sectionValues={navBarInputValues}
                                    setSectionValues={setNavBarInputValues}
                                />
                            </AccordionItem>
                            <AccordionItem
                                key="Footer Items"
                                title="Footer Items"
                                subtitle=""
                                startContent={<CgClapperBoard />}
                            >
                                <CMSObjEdit
                                    // sectionTitle={"Footer Items"}
                                    section={"footer"}
                                    sectionValues={footerValues}
                                    setSectionValues={setFooterValues}
                                />
                            </AccordionItem>
                            <AccordionItem
                                key="Hero Section"
                                title="Hero Section"
                                subtitle=""
                                startContent={<CgImage />}
                            >
                                <CMSObjEdit
                                    // sectionTitle={"Hero Section"}
                                    section={"hero"}
                                    sectionValues={heroValues}
                                />
                            </AccordionItem>
                        </Accordion>
                    </div>
                </Tab>
                <Tab
                    key="blogPages"
                    title={
                        <div className="flex items-center space-x-2">
                            <CgWebsite />
                            <span>Blog Pages</span>
                        </div>
                    }
                    className="font-metropolis"
                >
                    <div aria-hidden className="w-10/12">
                        <Accordion variant="splitted">
                            <AccordionItem
                                key="Blog Pages"
                                title="Blog Pages"
                                startContent={<CgWebsite />}
                            >
                                <CMSObjEdit
                                    // sectionTitle={"Blog Pages"}
                                    section={"blogPages"}
                                    sectionValues={blogPagesValues}
                                />
                            </AccordionItem>
                        </Accordion>
                    </div>
                </Tab>
                <Tab
                    key="recipes"
                    title={
                        <div className="flex items-center space-x-2">
                            <CgClipboard />
                            <span>Recipes</span>
                        </div>
                    }
                    className="font-metropolis"
                >
                    <div className="min-h-[50vh]">
                        <CMSRecipes />
                    </div>
                </Tab>
            </Tabs>
            <Button className="mx-3" color="success" onClick={saveChangesClick}>
                Save Changes
            </Button>
            <Button
                onClick={() => {
                    console.log("swrBlog\n", swrBlog.pages);
                    toast.success("Check your development console!", {
                        toastId: "logStuff",
                    });
                }}
            >
                Log Stuff
            </Button>
            <ToastContainer />{" "}
            {/* Perhaps we could put it in the root of our app */}
        </div>
    );
}

//how formatting work for the CMSStrEdit Component-currently not used but could be useful later
// const navBarValues = blog.pages.home.navBar.map((item, i) => ({
//     value: item,
//     label: `Nav${i + 1}`,
// }));

// const footerValues = blog.pages.home.footer.map((item, i) => ({
//     value: item,
//     label: `Footer${i + 1}`,
// }));

/* <CMSStrEdit
                // key={"navBarKey"}
                sectionTitle={"NavBar Items"}
                section={"navBar"}
                sectionValues={navBarInputValues}
                setSectionValues={setNavBarInputValues}
                blog={blog}
                setBlog={setBlog}
            />
            
            <CMSStrEdit
                // key={"footerKey"}
                sectionTitle={"Footer Items"}
                section={"footer"}
                sectionValues={footerValues}
                setSectionValues={setFooterValues}
                blog={blog}
                setBlog={setBlog}
            /> */

//Tests for figuring out how to use useEffect with async/await and to fetch needed data
// blog &&
//     editBlogAuth(blog).then((res) =>
//         console.log("came from protected route", res)
//     );
// useEffect(() => {
//     (async () => {
//         try {
//             const sessToken = await getToken();
//             getAuth(sessToken).then((res) => console.log(res));
//             blog &&
//                 editBlogAuth(sessToken, blog).then((res) =>
//                     console.log("came from protected route", res)
//                 );
//         } catch (error) {
//             console.error(error);
//         }
//     })();
//     // getToken().then((token) => {
//     //     getAuth(token).then((res) => console.log(res));
//     //     blog &&
//     //         editBlogAuth(token, blog).then((res) =>
//     //             console.log("came from protected route", res)
//     //         );
//     // });
// }, [blog]);
