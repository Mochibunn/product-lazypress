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
import { useBlog } from "../../lib/swr";
import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CMSDeleteModal({ sectionTitle, section }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const [value, setValue] = useState("");

    const navigate = useNavigate();

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setForm((prev) => ({ ...prev, [name]: value }));
    // };
    const isInvalid = useMemo(() => {
        if (value === "") return true;

        return value.toUpperCase() === "DELETE" ? false : true;
    }, [value]);

    const handleSubmit = (e) => {
        e.preventDefault;
        if (isInvalid) return;

        console.log("You click submit");
    };

    return (
        <>
            <div onClick={() => onOpen()}>Delete Recipe</div>
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
                                Are you sure?
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    isRequired
                                    label="Type DELETE to confirm. This action cannot be undone"
                                    // placeholder="Type DELETE to confirm"
                                    labelPlacement="outside"
                                    // color="danger"
                                    name="imgUrl"
                                    isInvalid={false}
                                    errorMessage={
                                        isInvalid &&
                                        "Type DELETE to confirm action."
                                    }
                                    value={value}
                                    onValueChange={setValue}
                                    // onChange={handleChange}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    variant="flat"
                                    onPress={onClose}
                                >
                                    No, I want to keep it
                                </Button>
                                <Button color="danger" onPress={handleSubmit}>
                                    Delete Recipe
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
