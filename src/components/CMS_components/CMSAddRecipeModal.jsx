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

import { useEffect, useState, useMemo } from "react";
import CMSAddListbox from "./CMSAddListbox";
import { createRecipe } from "../../lib/dbClient";
import { useAuth } from "@clerk/clerk-react";
import { toastSuccess, toastError } from "../../lib/toastify";

export default function CMSAddRecipeModal({
    clerkUser,
    clerkUserId,
    blog,
    newRecipe,
    setNewRecipe,
}) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { getToken } = useAuth();
    // const [newRecipe, setNewRecipe] = useImmer({
    //     title: "",
    //     category: "",
    //     region: "",
    //     ingList: [],
    //     steps: [],
    //     text: "",
    //     button: "",
    //     tags: [],
    //     imgUrl: "",
    //     videoUrl: "",
    //     clerkUserId,
    //     clerkUser,
    //     blog,
    // });

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

    const validateUrl = (value) =>
        value.match(
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
        );
    const isImgInvalid = useMemo(() => {
        if (staticInputs.imgUrl === "") return false;

        return validateUrl(staticInputs.imgUrl) ? false : true;
    }, [staticInputs.imgUrl]);
    const isVideoInvalid = useMemo(() => {
        if (staticInputs.videoUrl === "") return false;

        return validateUrl(staticInputs.videoUrl) ? false : true;
    }, [staticInputs.videoUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStaticInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleIngFormChange = (e) => {
        const { name, value } = e.target;
        setIngForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditClick = (e) => {
        const { name } = e.target;
        console.log(staticInputs[name]);
        let isValid = true;
        if (!staticInputs[name]) {
            toastError(`Field cannot be left blank`);
            isValid = false;
            // staticInputs[name] = recipe[name];
        }
        if (name === "imgUrl" && isImgInvalid) {
            toastError(`Image must use a valid URL`);
            isValid = false;
        }
        if (name === "videoUrl" && isVideoInvalid) {
            toastError(`Video must use a valid URL`);
            isValid = false;
        }
        // console.log(staticInputs[name]);
        if (!isValid) return;
        setNewRecipe((draft) => {
            draft[name] = staticInputs[name];
        });
        toastSuccess(`Draft updated`);
    };

    const handleAddClick = (e) => {
        const { name } = e.target;
        let isValid = true;
        if (
            (name === "tags" && !addTagValue) ||
            (name === "steps" && !addStepValue)
        ) {
            toastError(`Cannot add blank ${name.slice(0, -1)}`);
            isValid = false;
        }
        if (!isValid) return;

        setNewRecipe((draft) => {
            name === "tags"
                ? draft[name].push(addTagValue)
                : draft[name].push(addStepValue);
        });

        name === "tags" ? setAddTagValue("") : setAddStepValue("");
        // console.log(newRecipe[name]);
        toastSuccess(
            `New ${name.slice(0, -1)}
            added to draft`
        );
    };

    const handleAddIngSubmit = (e) => {
        e.preventDefault();

        let isValid = true;

        if (!ingForm.amount) {
            toastError(`Must provide an amount`);
            isValid = false;
        }
        if (!ingForm.ing) {
            toastError(`Must provide an ingredient`);
            isValid = false;
        }

        if (!isValid) return;

        setNewRecipe((draft) => {
            draft.ingList.push(ingForm);
        });

        setIngForm({
            ing: "",
            amount: "",
            key: crypto.randomUUID(),
        });
        toastSuccess(`Ingredient added to draft`);
    };

    const discardDraftClick = () => {
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
        // toastSuccess(`Draft successfully discarded`);
        onClose();
    };

    const handleSaveClick = async () => {
        // console.log(newRecipe);
        try {
            let isValid = true;

            Object.entries(newRecipe).forEach(([key, value]) => {
                if (!value) {
                    toastError(`New recipe must have ${key}`);
                    isValid = false;
                }
            });
            if (isImgInvalid || isVideoInvalid) {
                toastError(`Video and Image must have valid URLs`);
                isValid = false;
            }

            if (!isValid) return;
            const sessToken = await getToken();
            const response = await createRecipe(sessToken, newRecipe);

            // console.log("came from protected route", postStatus);
            // console.log(`🐰Status:\n`, postStatus.status);

            if (response?.status === 200) {
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
                toastSuccess(`Draft saved. Refresh the page to see it`);
                setTimeout(() => onClose(), 1000);
            }

            // setButtonSpin(false); Might remove this line later — Mochi
        } catch (error) {
            toastError(`${error}`);
            console.error(error);
        }
    };
    // console.log("AddModal", newRecipe);
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
                                            color="secondary"
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
                                            newRecipe={newRecipe}
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
                                            newRecipe={newRecipe}
                                        />
                                    </AccordionItem>
                                    <AccordionItem
                                        key="Recipe_Ingredients"
                                        title="Ingredients List"
                                    >
                                        <form
                                            onSubmit={handleAddIngSubmit}
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
                                            newRecipe={newRecipe}
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
                                                    color="secondary"
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
                                                    color="secondary"
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
                                                    color="secondary"
                                                    name="text"
                                                    onPress={handleEditClick}
                                                >
                                                    Set Tagline
                                                </Button>
                                            }
                                        />
                                        <Textarea
                                            minRows={1}
                                            isInvalid={isImgInvalid}
                                            errorMessage={
                                                isImgInvalid &&
                                                "Please enter a valid URL"
                                            }
                                            className="glassTextArea"
                                            color="default"
                                            value={staticInputs.imgUrl}
                                            onChange={handleChange}
                                            label="Recipe Image"
                                            labelPlacement="outside"
                                            name="imgUrl"
                                            endContent={
                                                <Button
                                                    color="secondary"
                                                    name="imgUrl"
                                                    onPress={handleEditClick}
                                                >
                                                    Set Image
                                                </Button>
                                            }
                                        />
                                        <Textarea
                                            minRows={1}
                                            isInvalid={isVideoInvalid}
                                            errorMessage={
                                                isVideoInvalid &&
                                                "Please enter a valid URL"
                                            }
                                            className="glassTextArea"
                                            color="default"
                                            value={staticInputs.videoUrl}
                                            onChange={handleChange}
                                            label="Instructional Video"
                                            labelPlacement="outside"
                                            name="videoUrl"
                                            endContent={
                                                <Button
                                                    color="secondary"
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
                                                    color="secondary"
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
                                    // variant="flat"
                                    onPress={discardDraftClick}
                                >
                                    Discard Draft
                                </Button>
                                <Button
                                    color="warning"
                                    // variant="flat"
                                    onPress={onClose}
                                >
                                    Close, but keep draft
                                </Button>
                                <Button
                                    color="success"
                                    onPress={handleSaveClick}
                                >
                                    Save New Recipe
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
