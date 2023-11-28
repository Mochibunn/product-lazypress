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
import { useRecipe } from "../lib/swr";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CMSListbox from "./CMSListbox";

export default function CMSRecipeModal({ sectionTitle, section, title, _id }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { recipe, isLoading, mutateRecipe } = useRecipe(_id);

    const [staticInputs, setStaticInputs] = useState({
        title: "",
        category: "",
        region: "",
        text: "",
        imgUrl: "",
        videoUrl: "",
        button: "",
    });
    const [stepsWKey, setStepsWKey] = useState();
    const [tagsWKey, setTagsWKey] = useState();

    useEffect(() => {
        if (!recipe) return;
        setStaticInputs({
            title: recipe.title,
            category: recipe.category,
            region: recipe.region,
            text: recipe.text,
            imgUrl: recipe.imgUrl,
            videoUrl: recipe.videoUrl,
            button: recipe.button,
        });
        const stepsObj = recipe.steps.map((step) => ({
            value: step,
            key: crypto.randomUUID(),
        }));
        const tagsObj = recipe.tags.map((tag) => ({
            value: tag,
            key: crypto.randomUUID(),
        }));
        setStepsWKey(stepsObj);
        setTagsWKey(tagsObj);
    }, [recipe]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStaticInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditClick = (e) => {
        // e.preventDefault();
        // console.log(e.target.name);
        const { name } = e.target;
        console.log(staticInputs[name]);
        mutateRecipe(
            produce((draft) => {
                // console.log("draft", draft[name]);
                draft[name] = staticInputs[name];
            }),
            { optimisticData: recipe, revalidate: false }
        );
    };

    const handleSaveClick = () => {
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
                className="p-8 pt-16 min-h-screen"
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
                                        name="title"
                                        value={staticInputs.title}
                                        onChange={handleChange}
                                        label="Recipe Title"
                                        labelPlacement="outside"
                                        endContent={
                                            <Button
                                                onPress={handleEditClick}
                                                type="submit"
                                                color="primary"
                                                name="title"
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
                                            <CMSListbox
                                                items={tagsWKey}
                                                label="Tag"
                                                section="tags"
                                                recipeId={_id}
                                            />
                                        </AccordionItem>
                                        <AccordionItem
                                            key="Recipe_Steps"
                                            title="Recipe Steps"
                                        >
                                            <CMSListbox
                                                items={stepsWKey}
                                                label="Step"
                                                section="steps"
                                                recipeId={_id}
                                            />
                                        </AccordionItem>
                                        <AccordionItem
                                            key="Recipe_Ingredients"
                                            title="Ingredients List"
                                        >
                                            <CMSListbox
                                                items={recipe.ingList}
                                                section="ingList"
                                                recipeId={_id}
                                            />
                                        </AccordionItem>
                                        <AccordionItem
                                            key="Simple_Values"
                                            title="Simple Values"
                                        >
                                            <Input
                                                className="glassInput"
                                                color="default"
                                                value={staticInputs.category}
                                                onChange={handleChange}
                                                label="Recipe Category"
                                                labelPlacement="outside"
                                                name="category"
                                                endContent={
                                                    <Button
                                                        color="primary"
                                                        name="category"
                                                        onPress={
                                                            handleEditClick
                                                        }
                                                    >
                                                        Edit Category
                                                    </Button>
                                                }
                                            />
                                            <Input
                                                className="glassInput"
                                                color="default"
                                                value={staticInputs.region}
                                                onChange={handleChange}
                                                label="Recipe Region of Origin"
                                                labelPlacement="outside"
                                                name="region"
                                                endContent={
                                                    <Button
                                                        color="primary"
                                                        name="region"
                                                        onPress={
                                                            handleEditClick
                                                        }
                                                    >
                                                        Edit Region
                                                    </Button>
                                                }
                                            />
                                            <Input
                                                className="glassInput"
                                                color="default"
                                                value={staticInputs.text}
                                                onChange={handleChange}
                                                label="Recipe Tagline"
                                                labelPlacement="outside"
                                                name="text"
                                                endContent={
                                                    <Button
                                                        color="primary"
                                                        name="text"
                                                        onPress={
                                                            handleEditClick
                                                        }
                                                    >
                                                        Edit Tagline
                                                    </Button>
                                                }
                                            />
                                            <Input
                                                className="glassInput"
                                                color="default"
                                                value={staticInputs.imgUrl}
                                                onChange={handleChange}
                                                label="Recipe Image"
                                                labelPlacement="outside"
                                                name="imgUrl"
                                                endContent={
                                                    <Button
                                                        color="primary"
                                                        name="imgUrl"
                                                        onPress={
                                                            handleEditClick
                                                        }
                                                    >
                                                        Edit Image
                                                    </Button>
                                                }
                                            />
                                            <Input
                                                className="glassInput"
                                                color="default"
                                                value={staticInputs.videoUrl}
                                                onChange={handleChange}
                                                label="Instructional Video"
                                                labelPlacement="outside"
                                                name="videoUrl"
                                                endContent={
                                                    <Button
                                                        color="primary"
                                                        name="videoUrl"
                                                        onPress={
                                                            handleEditClick
                                                        }
                                                    >
                                                        Edit Video
                                                    </Button>
                                                }
                                            />
                                            <Input
                                                className="glassInput"
                                                color="default"
                                                value={staticInputs.button}
                                                onChange={handleChange}
                                                label="Recipe Button Text"
                                                labelPlacement="outside"
                                                name="button"
                                                endContent={
                                                    <Button
                                                        color="primary"
                                                        name="button"
                                                        onPress={
                                                            handleEditClick
                                                        }
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
                                        onPress={handleSaveClick}
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
