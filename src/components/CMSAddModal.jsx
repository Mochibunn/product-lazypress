import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    useDisclosure,
} from "@nextui-org/react";

// import { mutate } from "swr";
// import { produce } from "immer";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../lib/swr";

export default function CMSAddModal({ sectionTitle, section, setBlog }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    // const { blogId } = useParams();
    // const { swrBlog, mutateBlog } = useBlog(blogId);

    const [form, setForm] = useState(
        section === "blogPages"
            ? {
                  imgUrl: "",
                  title: "",
                  text: "",
                  button: "",
              }
            : {
                  imgUrl: "",
                  title: "",
                  text: "",
                  button: "",
              }
    );

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        setBlog((draft) => {
            draft.pages.home[section].push(form);
        });
        // console.log(form);
        // console.log(swrBlog.pages.home[section]);
        // mutateBlog(
        //     produce((draftBlog) => {
        //         draftBlog.pages.home[section].push(form);
        //     }),
        //     { optimisticData: swrBlog, revalidate: false }
        // );
        // if (!form.email || !form.password)
        //     return alert("Please enter a valid email and password!");
        // //imported now-expects object as argument
        // signInUser(form)
        //     .then((userData) => {
        //         let test = userData;
        //         if (userData.length) {
        //             setUser(userData);
        //         } else {
        //             setUser(false);
        //         }
        //         return test;
        //         // userData.length ? setUser(userData) : setUser(false);
        //     })
        //     .then((test) => {
        //         if (!test.length) return alert("Invalid email or password!");
        //         setForm({
        //             email: "",
        //             password: "",
        //         });
        //         navigate("/");
        //         onOpenChange();
        //     })
        //     .catch((error) => console.error(error));
    };

    return (
        <>
            <div onClick={() => onOpen()}>Add to {sectionTitle}</div>
            <Modal
                isOpen={isOpen}
                backdrop="blur"
                onOpenChange={onOpenChange}
                placement="top-center"
                // className={isDarkMode && "dark text-foreground"}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Add to {sectionTitle}
                            </ModalHeader>
                            <ModalBody>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSubmit();
                                    }}
                                    autoComplete="off"
                                >
                                    {
                                        <>
                                            <Input
                                                autoFocus
                                                placeholder="Enter a valid url in .jpeg or .png format"
                                                label="Banner Image"
                                                labelPlacement="outside"
                                                name="imgUrl"
                                                variant="bordered"
                                                value={form.email}
                                                onChange={handleChange}
                                            />
                                            <Input
                                                placeholder="Enter a title for the page"
                                                label="Page Title"
                                                labelPlacement="outside"
                                                name="title"
                                                variant="bordered"
                                                value={form.password}
                                                onChange={handleChange}
                                            />
                                            <Input
                                                placeholder="Enter a short description of the page"
                                                label="Summary"
                                                labelPlacement="outside"
                                                name="text"
                                                variant="bordered"
                                                value={form.password}
                                                onChange={handleChange}
                                            />
                                            <Input
                                                placeholder="Some text for the button linking to the page"
                                                label="Button Text"
                                                labelPlacement="outside"
                                                name="button"
                                                variant="bordered"
                                                value={form.password}
                                                onChange={handleChange}
                                            />
                                        </>
                                    }
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={handleSubmit}>
                                    Add Page
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
