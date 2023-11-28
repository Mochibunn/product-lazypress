import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    useDisclosure,
    Spinner,
} from "@nextui-org/react";

import { produce } from "immer";
import { useBlog, useRecipe } from "../lib/swr";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CMSListbox from "./CMSListbox";

export default function CMSRecipeModal({ sectionTitle, section, title, _id }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { blogId } = useParams();
    const { swrBlog, mutateBlog } = useBlog(blogId);
    const { recipe, isLoading, mutateRecipe } = useRecipe(_id);

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
        console.log(recipe);
    };

    return (
        <>
            <div onClick={() => onOpen()}>Edit recipe</div>
            <Modal
                isOpen={isOpen}
                backdrop="blur"
                onOpenChange={onOpenChange}
                placement="center"
                size="full"
                className="p-8"
            >
                <ModalContent>
                    {() =>
                        isLoading ? (
                            <Spinner />
                        ) : (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    {recipe.title}
                                </ModalHeader>
                                <ModalBody>
                                    <CMSListbox steps={recipe.steps} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="flat"
                                        onPress={onClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        onPress={handleSubmit}
                                    >
                                        Edit Recipe
                                    </Button>
                                </ModalFooter>
                            </>
                        )
                    }
                </ModalContent>
            </Modal>
        </>
    );
}
