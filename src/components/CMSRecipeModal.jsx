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

import { produce } from "immer";
import { useBlog } from "../lib/swr";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CMSRecipeModal({ sectionTitle, section, title }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { blogId } = useParams();
    const { swrBlog, mutateBlog } = useBlog(blogId);

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
        console.log("You clicked submit");
    };

    return (
        <>
            <div onClick={() => onOpen()}>Edit recipe</div>
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
                                {title}
                            </ModalHeader>
                            <ModalBody></ModalBody>
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
