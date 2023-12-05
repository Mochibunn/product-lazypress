import { useState } from "react";
import { Button, Input, Divider, Tooltip } from "@nextui-org/react";
import { useRecipe } from "../../lib/swr";
import { produce } from "immer";
import { toastError, toastSuccess } from "../../lib/toastify";

export default function CMSIngInputs({
    item,
    i,
    length,
    label,
    recipeId,
    section,
    setDraftSaved,
}) {
    const [form, setForm] = useState({
        amount: item.amount,
        ing: item.ing,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const { recipe, mutateRecipe } = useRecipe(recipeId);

    const handleEditClick = () => {
        let isValid = true;

        if (!form.amount) {
            toastError(`Must provide an amount`);
            isValid = false;
            // form.amount = item.amount;
        }
        if (!form.ing) {
            toastError(`Must provide an ingredient`);
            isValid = false;
            // form.ing = item.ing;
        }
        if (!isValid) return;
        mutateRecipe(
            produce((draft) => {
                draft[section][i] = form;
            }),
            { optimisticData: recipe, revalidate: false }
        );
        setDraftSaved(false);
        toastSuccess(
            `Draft updated.  To save and add to website click "Save Changes"`
        );
    };

    const handleDeleteClick = () => {
        if (recipe[section].length === 1) {
            return toastError(`Must have at least one ingredient`);
        }

        mutateRecipe(
            produce((draft) => {
                draft[section].splice(i, 1);
            }),
            { optimisticData: recipe, revalidate: false }
        );
        setDraftSaved(false);
        // toastSuccess(
        //     `Item deleted from draft. To save and add to website click "Save Changes"`
        // );
    };
    return (
        <li className="my-4 mx-2">
            <form className="flex items-baseline">
                <Input
                    className="glassInput w-1/4"
                    label={`Amount`}
                    labelPlacement="outside"
                    value={form.amount}
                    name="amount"
                    // onValueChange={setValue}
                    onChange={handleChange}
                />
                <Input
                    className="glassInput"
                    label={`Ingredient`}
                    labelPlacement="outside"
                    value={form.ing}
                    name="ing"
                    // onValueChange={setValue}
                    onChange={handleChange}
                />
                <div className="flex gap-2">
                    <Tooltip
                        content="Will delete from draft-changes will be made permanent on Save."
                        showArrow={true}
                        color="warning"
                        classNames={{ content: "font-montserrat" }}
                    >
                        <Button
                            onPress={handleDeleteClick}
                            color="danger"
                            variant="flat"
                            radius="sm"
                            className="hover:bg-warning"
                        >
                            Delete {label}
                        </Button>
                    </Tooltip>
                    <Button
                        onPress={handleEditClick}
                        color="secondary"
                        radius="sm"
                        variant="ghost"
                    >
                        Edit {label}
                    </Button>
                </div>
            </form>
            {i !== length - 1 && <Divider className="my-4" />}
        </li>
    );
}
