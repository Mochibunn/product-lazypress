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
        if (value === "") return false;
        return value.toUpperCase() === "DELETE" ? false : true;
    }, [value]);

    const toastSettings = {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };

    const handleDeleteClick = async () => {
        if (isInvalid) {
            toast.error(`Recipe not deleted.`, {
                toastId: "notDeleted",
                ...toastSettings,
            });
            return;
        }
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
                            <ModalHeader className="flex flex-col gap-1 font-metropolis pb-0">
                                <p className="font-bold text-2xl text-center">
                                    Are you sure?
                                </p>
                            </ModalHeader>
                            <ModalBody className="pt-0">
                                <Input
                                    autoComplete="off"
                                    autoFocus
                                    isRequired
                                    label={
                                        <p className="inline">
                                            Type <b>DELETE</b> to confirm. This
                                            action <i>cannot</i> be undone
                                        </p>
                                    }
                                    className="font-metropolis"
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
                                    className="font-metropolis"
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
                                    className="font-metropolis shake"
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
