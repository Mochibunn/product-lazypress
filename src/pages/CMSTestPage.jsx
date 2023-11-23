import { useParams } from "react-router-dom";
import { editBlog } from "../lib/dbClient";
import { useBlog } from "../lib/swr";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
	Tabs,
	Tab,
  Spinner,
} from "@nextui-org/react";
import CMSObjEdit from "../components/CMSObjEdit";
import { useAuth } from "@clerk/clerk-react";

// import CMSStrEdit from "../components/CMSStrEdit";

export default function CMSTestPage() {
  const { getToken } = useAuth();
  const { blogId } = useParams();
  const { swrBlog, mutateBlog } = useBlog(blogId);
  const [navBarInputValues, setNavBarInputValues] = useState();
  const [blogPagesValues, setBlogPagesValues] = useState();
  const [heroValues, setHeroValues] = useState();
  const [footerValues, setFooterValues] = useState();
  const [buttonSpin, setButtonSpin] = useState(false);
  document.title = `Edit blog | LazyPress`;;

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

    setNavBarInputValues([...navBarValues]);
    setFooterValues([...footerValues]);
    setBlogPagesValues([...blogValues]);
    setHeroValues([...heroValues]);
  }, [swrBlog]);

  const saveChangesClick = async () => {
		setButtonSpin(true);
    try {
      const sessToken = await getToken();
      editBlog(sessToken, swrBlog).then((res) => {
        console.log("came from protected route", res);
        console.log(`🐰Status:\n`, res.status);
      });
      mutateBlog();
      setButtonSpin(false);
    } catch (error) {
      console.error(error);
    }
  };



    return (
        <div className="w-full p-4">
            {
                <Table aria-label="Editable items">
                    <TableHeader>
                        <TableColumn>Page 1</TableColumn>
                        <TableColumn></TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell className="w-1/5">Hello!</TableCell>
                            <TableCell>
                                This is just an example NextUI table that I'm
                                using as a styling guide :&#41;
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            }
            <Tabs aria-label="Site Pages">
                {/* <h3 className="text-xl font-semibold">Home Page</h3> */}

                <Tab key="home" title="Home">
								<Accordion variant="splitted">
										<AccordionItem key="1" title="Navbar Items" subtitle="a">
											<CMSObjEdit
												sectionTitle={"NavBar Items"}
												section={"navBar"}
												sectionValues={navBarInputValues}
												setSectionValues={setNavBarInputValues}
											/>
										</AccordionItem>
										<AccordionItem key="Footer Items" title="Footer Items" subtitle="b">
											<CMSObjEdit
												sectionTitle={"Footer Items"}
												section={"footer"}
												sectionValues={footerValues}
												setSectionValues={setFooterValues}
											/>
										</AccordionItem>
										<AccordionItem key="Blog Pages" title="Blog Pages" subtitle="c">
											<CMSObjEdit
												sectionTitle={"Blog Pages"}
												section={"blogPages"}
												sectionValues={blogPagesValues}
											/>
										</AccordionItem>
										<AccordionItem key="Hero Section" title="Hero Section" subtitle="d">
											<CMSObjEdit
												sectionTitle={"Hero Section"}
												section={"hero"}
												sectionValues={heroValues}
											/>
										</AccordionItem>
									</Accordion>
                </Tab>
                <Tab key="blogPages" title="Blog Pages">
                    <CMSObjEdit
                        sectionTitle={"Blog Pages"}
                        section={"blogPages"}
                        sectionValues={blogPagesValues}
                    />
                </Tab>
            </Tabs>
            <Button className="mr-4" color="success" onClick={saveChangesClick}>
                Save Changes
            </Button>
            <Button
                onClick={() => {
                    console.log("swrBlog", swrBlog.pages);
                }}
            >
                Log Stuff
            </Button>
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
