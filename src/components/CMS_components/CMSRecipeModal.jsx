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
    Textarea,
} from "@nextui-org/react";

import { ToastContainer, toast } from "react-toastify";
import { produce } from "immer";
import { useRecipe } from "../../lib/swr";
import { useEffect, useState } from "react";
import CMSListbox from "./CMSListbox";
import { editRecipe } from "../../lib/dbClient";
import { useAuth } from "@clerk/clerk-react";

export default function CMSRecipeModal({ _id }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { recipe, isLoading, mutateRecipe } = useRecipe(_id);
    const { getToken } = useAuth();

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
    const [addTagValue, setAddTagValue] = useState("");
    const [addStepValue, setAddStepValue] = useState("");
    const [ingForm, setIngForm] = useState({
        ing: "",
        amount: "",
        key: crypto.randomUUID(),
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStaticInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleIngFormChange = (e) => {
        const { name, value } = e.target;
        setIngForm((prev) => ({ ...prev, [name]: value }));
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

    const handleAddClick = (e) => {
        const { name } = e.target;
        // console.log(name);
        mutateRecipe(
            produce((draft) => {
                // console.log("draft", draft[name]);
                name === "tags"
                    ? draft[name].push(addTagValue)
                    : draft[name].push(addStepValue);
            }),
            { optimisticData: recipe, revalidate: false }
        );
        name === "tags" ? setAddTagValue("") : setAddStepValue("");
        // console.log(recipe[name]);
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        mutateRecipe(
            produce((draft) => {
                // console.log("draft", draft[name]);
                draft.ingList.push(ingForm);
            }),
            { optimisticData: recipe, revalidate: false }
        );
        setIngForm({
            ing: "",
            amount: "",
            key: crypto.randomUUID(),
        });
    };

    const handleSaveClick = async () => {
        try {
            const sessToken = await getToken();

            const postStatus = await editRecipe(sessToken, recipe);

            console.log("came from protected route", postStatus);
            console.log(`🐰Status:\n`, postStatus.status);
            console.log(`AAAAA\n`, recipe);

            await mutateRecipe();
            toast.success(`Changes saved.`, {
                toastId: "changesSaved",
            });
            // setButtonSpin(false); Might remove this line later — Mochi
        } catch (error) {
            toast.error(`Changes not saved.`, {
                toastId: "notSaved",
            });
            console.error(error);
        }
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
                                                color="success"
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
                                            <Input
                                                className="glassInput"
                                                label="Add new tag"
                                                labelPlacement="outside"
                                                name="tags"
                                                value={addTagValue}
                                                onValueChange={setAddTagValue}
                                                endContent={
                                                    <Button
                                                        onPress={handleAddClick}
                                                        name="tags"
                                                        color="primary"
                                                    >
                                                        Add tag
                                                    </Button>
                                                }
                                            />
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
                                            <Textarea
                                                className="glassInput"
                                                label="Add new step"
                                                labelPlacement="outside"
                                                value={addStepValue}
                                                onValueChange={setAddStepValue}
                                                name="steps"
                                                endContent={
                                                    <Button
                                                        onPress={handleAddClick}
                                                        color="primary"
                                                        name="steps"
                                                    >
                                                        Add step
                                                    </Button>
                                                }
                                            />
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
                                            <form
                                                onSubmit={handleAddSubmit}
                                                className="flex items-baseline"
                                            >
                                                <Input
                                                    className="glassInput w-1/4"
                                                    label="Amount"
                                                    labelPlacement="outside"
                                                    value={ingForm.amount}
                                                    onChange={
                                                        handleIngFormChange
                                                    }
                                                    name="amount"
                                                />
                                                <Input
                                                    className="glassInput"
                                                    label="Ingredient"
                                                    labelPlacement="outside"
                                                    value={ingForm.ing}
                                                    onChange={
                                                        handleIngFormChange
                                                    }
                                                    name="ing"
                                                />
                                                <Button
                                                    className="min-w-1/4"
                                                    color="primary"
                                                    type="submit"
                                                >
                                                    Add Ingredient
                                                </Button>
                                            </form>
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
                                                        color="success"
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
                                                        color="success"
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
                                                        color="success"
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
                                                        color="success"
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
                                                        color="success"
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
                                                        color="success"
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
                                        onPress={() => {
                                            onClose();
                                            mutateRecipe();
                                        }}
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
                                <ToastContainer />
                            </>
                        )
                    }
                </ModalContent>
            </Modal>
        </>
    );
}
