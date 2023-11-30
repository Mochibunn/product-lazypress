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

import { produce } from "immer";
import { useRecipe } from "../../lib/swr";
import { useEffect, useState, useMemo } from "react";
import CMSListbox from "./CMSListbox";
import { editRecipe } from "../../lib/dbClient";
import { useAuth } from "@clerk/clerk-react";
import { toastSuccess, toastError } from "../../lib/toastify";

export default function CMSRecipeModal({ _id, setDraftSaved }) {
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
        let isValid = true;
        if (!staticInputs[name]) {
            toastError(`Field cannot be left blank`);
            valid = false;
            staticInputs[name] = recipe[name];
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
        mutateRecipe(
            produce((draft) => {
                // console.log("draft", draft[name]);
                draft[name] = staticInputs[name];
            }),
            { optimisticData: recipe, revalidate: false }
        );
        setDraftSaved(false);
        toastSuccess(
            `Draft updated.  To save and add to website click "Save Changes"`
        );
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
        setDraftSaved(false);
        toastSuccess(
            `New ${name.slice(0, -1)} 
            added. To save and add to website click "Save Changes"`
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
        setDraftSaved(false);
        toastSuccess(
            `Ingredient added. To save and add to website click "Save Changes"`
        );
    };

    const discardChangesClick = () => {
        mutateRecipe();
        // toastSuccess(`Draft successfully discarded`);
        onClose();
        setDraftSaved(true);
    };
    const handleSaveClick = async () => {
        try {
            let isValid = true;
            console.log(recipe);

            Object.entries(recipe).forEach(([key, value]) => {
                if (!value && key !== "__v") {
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

            const response = await editRecipe(sessToken, recipe);

            // console.log("came from protected route", postStatus);
            // console.log(`🐰Status:\n`, postStatus.status);
            // console.log(`AAAAA\n`, recipe);

            if (response?.status === 200) {
                await mutateRecipe();
                toastSuccess(`Changes saved. Refresh the page to see them`);
                setDraftSaved(true);
                setTimeout(() => onClose(), 1000);
            }
            // setButtonSpin(false); Might remove this line later — Mochi
        } catch (error) {
            toastError(`${error}`);
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
                                                setDraftSaved={setDraftSaved}
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
                                                minRows={1}
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
                                                setDraftSaved={setDraftSaved}
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
                                                setDraftSaved={setDraftSaved}
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
                                        // className="mx-3"
                                        color="danger"
                                        onClick={discardChangesClick}
                                    >
                                        Discard Draft
                                    </Button>
                                    <Button
                                        color="warning"
                                        // variant="flat"
                                        onPress={() => {
                                            onClose();
                                        }}
                                    >
                                        Close, but keep draft
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
