import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
    useDisclosure,
} from "@nextui-org/react";

import { produce } from "immer";
import { useBlog } from "../../lib/swr";
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { toastSuccess, toastError } from "../../lib/toastify";
import CloudinaryTest from "./CloudinaryTest";

export default function CMSAddModal({ sectionTitle, section }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { blogId } = useParams();
    const { swrBlog, mutateBlog } = useBlog(blogId);

    const [form, setForm] = useState({
        imgUrl: "",
        title: "",
        text: "",
        button: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validateUrl = (value) =>
        value.match(
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
        );
    const isInvalid = useMemo(() => {
        if (form.imgUrl === "") return false;

        return validateUrl(form.imgUrl) ? false : true;
    }, [form.imgUrl]);

    const handleAddClick = (e) => {
        e.preventDefault();
        let isValid = true;

        if (!form.imgUrl) {
            toastError(`Image is required`);
            isValid = false;
        }
        if (isInvalid) {
            toastError("Image URL invalid");
            isValid = false;
        }
        if (!form.title) {
            toastError(`Title is required`);
            isValid = false;
        }
        if (!form.text) {
            toastError(`Summary is required`);
            isValid = false;
        }
        if (!form.button) {
            toastError(`Button text is required`);
            isValid = false;
        }

        if (!isValid) return;

        mutateBlog(
            produce((draftBlog) => {
                draftBlog.pages.home[section].push(form);
            }),
            { optimisticData: swrBlog, revalidate: false }
        );
        toastSuccess(
            `Hero draft added. To save and add to website click "Save Changes"`
        );
        setForm({
            imgUrl: "",
            title: "",
            text: "",
            button: "",
        });
        setTimeout(() => onClose(), 1000);
    };
    const handleCancelClick = () => {
        setForm({
            imgUrl: "",
            title: "",
            text: "",
            button: "",
        });
        onClose();
    };
    const handleImgUpload = (url, i) => {
        // console.log(url);
        setForm((prev) => {
            console.log(prev);
            console.log(url);
            return { ...prev, imgUrl: url };
        });
    };

    return (
        <>
            <div onClick={() => onOpen()}>Add to {sectionTitle}</div>
            <Modal
                isOpen={isOpen}
                backdrop="blur"
                onOpenChange={onOpenChange}
                className="translate-y-16 lg:translate-y-0"
                scrollBehavior="inside"
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Add to {sectionTitle}
                            </ModalHeader>
                            <ModalBody>
                                <form
                                    onSubmit={handleAddClick}
                                    className="flex flex-col items-center"
                                    autoComplete="off"
                                    id="addToHero"
                                >
                                    <Textarea
                                        className="glassInput"
                                        autoFocus
                                        placeholder="Enter a valid url in .jpeg or .png format"
                                        label="Banner Image"
                                        labelPlacement="outside"
                                        name="imgUrl"
                                        variant="bordered"
                                        value={form.imgUrl}
                                        onChange={handleChange}
                                        minRows={1}
                                        isInvalid={isInvalid}
                                        errorMessage={
                                            isInvalid &&
                                            "Please enter a valid URL"
                                        }
                                    />
                                    <CloudinaryTest setUrl={handleImgUpload} />
                                    <Input
                                        className="glassInput"
                                        placeholder="Enter a title for the hero"
                                        label="Hero Title"
                                        labelPlacement="outside"
                                        name="title"
                                        variant="bordered"
                                        value={form.title}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        className="glassInput"
                                        placeholder="Enter a short description of the page"
                                        label="Summary"
                                        labelPlacement="outside"
                                        name="text"
                                        variant="bordered"
                                        value={form.text}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        className="glassInput"
                                        placeholder="Some text for the button linking to the page"
                                        label="Button Text"
                                        labelPlacement="outside"
                                        name="button"
                                        variant="bordered"
                                        value={form.button}
                                        onChange={handleChange}
                                    />
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    className="font-montserrat font-semibold"
                                    color="danger"
                                    // variant="flat"
                                    onPress={handleCancelClick}
                                >
                                    Discard
                                </Button>
                                <Button
                                    className="font-montserrat font-semibold"
                                    color="primary"
                                    type="submit"
                                    form="addToHero"
                                    // onPress={handleAddClick}
                                >
                                    Add Slide
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
