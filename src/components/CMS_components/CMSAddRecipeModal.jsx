import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    useDisclosure,
    Accordion,
    AccordionItem,
    Textarea,
} from "@nextui-org/react";

import { ToastContainer, toast } from "react-toastify";
import { useImmer } from "use-immer";
import { useEffect, useState } from "react";
import CMSAddListbox from "./CMSAddListbox";
import { createRecipe } from "../../lib/dbClient";
import { useAuth } from "@clerk/clerk-react";

export default function CMSAddRecipeModal({ clerkUser, clerkUserId, blog }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { getToken } = useAuth();
    const [newRecipe, setNewRecipe] = useImmer({
        title: "",
        category: "",
        region: "",
        ingList: [],
        steps: [],
        text: "",
        button: "",
        tags: [],
        imgUrl: "",
        videoUrl: "",
        clerkUserId,
        clerkUser,
        blog,
    });

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
    const [ingListWKey, setIngListWKey] = useState();
    const [addTagValue, setAddTagValue] = useState("");
    const [addStepValue, setAddStepValue] = useState("");
    const [ingForm, setIngForm] = useState({
        ing: "",
        amount: "",
    });

    useEffect(() => {
        if (!newRecipe) return;
        setStaticInputs({
            title: newRecipe.title,
            category: newRecipe.category,
            region: newRecipe.region,
            text: newRecipe.text,
            imgUrl: newRecipe.imgUrl,
            videoUrl: newRecipe.videoUrl,
            button: newRecipe.button,
        });
        const stepsObj = newRecipe.steps.map((step) => ({
            value: step,
            key: crypto.randomUUID(),
        }));
        const tagsObj = newRecipe.tags.map((tag) => ({
            value: tag,
            key: crypto.randomUUID(),
        }));
        const ingListObj = newRecipe.ingList.map((ing) => ({
            ...ing,
            key: crypto.randomUUID(),
        }));
        setStepsWKey(stepsObj);
        setTagsWKey(tagsObj);
        setIngListWKey(ingListObj);
    }, [newRecipe]);

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
        setNewRecipe((draft) => {
            draft[name] = staticInputs[name];
        });
    };

    const handleAddClick = (e) => {
        const { name } = e.target;
        // console.log(name);
        setNewRecipe((draft) => {
            name === "tags"
                ? draft[name].push(addTagValue)
                : draft[name].push(addStepValue);
        });

        name === "tags" ? setAddTagValue("") : setAddStepValue("");
        // console.log(newRecipe[name]);
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        setNewRecipe((draft) => {
            draft.ingList.push(ingForm);
        });
        // mutateRecipe(
        //     produce((draft) => {
        //         // console.log("draft", draft[name]);
        //         draft.ingList.push(ingForm);
        //     }),
        //     { optimisticData: newRecipe, revalidate: false }
        // );
        setIngForm({
            ing: "",
            amount: "",
            key: crypto.randomUUID(),
        });
    };

    const handleSaveClick = async () => {
        // console.log(newRecipe);
        try {
            const sessToken = await getToken();
            const postStatus = await createRecipe(sessToken, newRecipe);
            console.log("came from protected route", postStatus);
            console.log(`🐰Status:\n`, postStatus.status);
            console.log(`AAAAA\n`, newRecipe);
            toast.success(`New recipe saved!.`, {
                toastId: "recipeSaved",
            });
            setNewRecipe({
                title: "",
                category: "",
                region: "",
                ingList: [],
                steps: [],
                text: "",
                button: "",
                tags: [],
                imgUrl: "",
                videoUrl: "",
                clerkUserId,
                clerkUser,
                blog,
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
            <div onClick={() => onOpen()}>Add new recipe</div>
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
                    {() => (
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
                                            Set Title
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
                                        <CMSAddListbox
                                            items={tagsWKey}
                                            label="Tag"
                                            section="tags"
                                            setNewRecipe={setNewRecipe}
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
                                        <CMSAddListbox
                                            items={stepsWKey}
                                            label="Step"
                                            section="steps"
                                            setNewRecipe={setNewRecipe}
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
                                                onChange={handleIngFormChange}
                                                name="amount"
                                            />
                                            <Input
                                                className="glassInput"
                                                label="Ingredient"
                                                labelPlacement="outside"
                                                value={ingForm.ing}
                                                onChange={handleIngFormChange}
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
                                        <CMSAddListbox
                                            items={ingListWKey}
                                            section="ingList"
                                            setNewRecipe={setNewRecipe}
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
                                                    onPress={handleEditClick}
                                                >
                                                    Set Category
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
                                                    onPress={handleEditClick}
                                                >
                                                    Set Region
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
                                                    onPress={handleEditClick}
                                                >
                                                    Set Tagline
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
                                                    onPress={handleEditClick}
                                                >
                                                    Set Image
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
                                                    onPress={handleEditClick}
                                                >
                                                    Set Video
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
                                                    onPress={handleEditClick}
                                                >
                                                    Set Button Text
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
                                        // mutateRecipe();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="success"
                                    onPress={handleSaveClick}
                                >
                                    Save new recipe
                                </Button>
                            </ModalFooter>
                            <ToastContainer />
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
