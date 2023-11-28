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
    Accordion,
    AccordionItem,
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
                className="p-8 min-h-screen"
                scrollBehavior="inside"
            >
                <ModalContent>
                    {() =>
                        isLoading ? (
                            <Spinner />
                        ) : (
                            <>
                                <ModalHeader>
                                    <Input
                                        className="glassInput"
                                        color="default"
                                        value={recipe.title}
                                        label="Recipe Title"
                                        labelPlacement="outside"
                                        endContent={
                                            <Button
                                                color="primary"
                                                // onPress={handleSubmit}
                                            >
                                                Edit Title
                                            </Button>
                                        }
                                    />
                                </ModalHeader>
                                <ModalBody>
                                    <Accordion
                                        variant="splitted"
                                        className="font-metropolis"
                                    >
                                        <AccordionItem
                                            key="Recipe_Tags"
                                            title="Tags"
                                        >
                                            <CMSListbox steps={recipe.tags} />
                                        </AccordionItem>
                                        <AccordionItem
                                            key="Recipe_Steps"
                                            title="Recipe Steps"
                                        >
                                            <CMSListbox steps={recipe.steps} />
                                        </AccordionItem>
                                        <AccordionItem
                                            key="Recipe_Ingredients"
                                            title="Ingredients List"
                                        >
                                            <CMSListbox steps={recipe.steps} />
                                        </AccordionItem>
                                        <AccordionItem
                                            key="Simple_Values"
                                            title="Simple Values"
                                        >
                                            <Input
                                                className="glassInput"
                                                color="default"
                                                value={recipe.category}
                                                label="Recipe Category"
                                                labelPlacement="outside"
                                                endContent={
                                                    <Button
                                                        color="primary"
                                                        // onPress={handleSubmit}
                                                    >
                                                        Edit Category
                                                    </Button>
                                                }
                                            />
                                            <Input
                                                className="glassInput"
                                                color="default"
                                                value={recipe.region}
                                                label="Recipe Region of Origin"
                                                labelPlacement="outside"
                                                endContent={
                                                    <Button
                                                        color="primary"
                                                        // onPress={handleSubmit}
                                                    >
                                                        Edit Region
                                                    </Button>
                                                }
                                            />
                                            <Input
                                                className="glassInput"
                                                color="default"
                                                value={recipe.text}
                                                label="Recipe Tagline"
                                                labelPlacement="outside"
                                                endContent={
                                                    <Button
                                                        color="primary"
                                                        // onPress={handleSubmit}
                                                    >
                                                        Edit Tagline
                                                    </Button>
                                                }
                                            />
                                            <Input
                                                className="glassInput"
                                                color="default"
                                                value={recipe.imgUrl}
                                                label="Recipe Image"
                                                labelPlacement="outside"
                                                endContent={
                                                    <Button
                                                        color="primary"
                                                        // onPress={handleSubmit}
                                                    >
                                                        Edit Image
                                                    </Button>
                                                }
                                            />
                                            <Input
                                                className="glassInput"
                                                color="default"
                                                value={recipe.videoUrl}
                                                label="Instructional Video"
                                                labelPlacement="outside"
                                                endContent={
                                                    <Button
                                                        color="primary"
                                                        // onPress={handleSubmit}
                                                    >
                                                        Edit Video
                                                    </Button>
                                                }
                                            />
                                            <Input
                                                className="glassInput"
                                                color="default"
                                                value={recipe.button}
                                                label="Recipe Button Text"
                                                labelPlacement="outside"
                                                endContent={
                                                    <Button
                                                        color="primary"
                                                        // onPress={handleSubmit}
                                                    >
                                                        Edit Button Text
                                                    </Button>
                                                }
                                            />
                                        </AccordionItem>
                                    </Accordion>
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
                                        color="success"
                                        onPress={handleSubmit}
                                    >
                                        Save Changes
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
