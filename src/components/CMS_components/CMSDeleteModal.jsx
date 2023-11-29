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

import { toast } from "react-toastify";
import { useState, useMemo } from "react";
import { deleteRecipe } from "../../lib/dbClient";
import { useAuth } from "@clerk/clerk-react";

export default function CMSDeleteModal({ clerkUserId, _id }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { getToken } = useAuth();

    const [value, setValue] = useState("");

    const isInvalid = useMemo(() => {
        if (value === "") return true;

        return value.toUpperCase() === "DELETE" ? false : true;
    }, [value]);

    const handleDeleteClick = async () => {
        if (isInvalid) return;
        try {
            const sessToken = await getToken();
            console.log(sessToken);
            const postStatus = await deleteRecipe(sessToken, _id, clerkUserId);
            console.log("came from protected route", postStatus);
            console.log(`🐰Status:\n`, postStatus.status);
            toast.success(`Recipe Deleted Successfully.`, {
                toastId: "recipeDeleted",
            });
            // setValue("");
            // onClose();
            // setButtonSpin(false); Might remove this line later — Mochi
        } catch (error) {
            toast.error(`Changes not saved.`, {
                toastId: "notSaved",
            });
            console.error(error);
        }

        console.log(clerkUserId, _id);
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
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    variant="flat"
                                    onPress={() => {
                                        onClose();
                                        setValue("");
                                    }}
                                >
                                    No, I want to keep it
                                </Button>
                                <Button
                                    color="danger"
                                    onPress={handleDeleteClick}
                                >
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
