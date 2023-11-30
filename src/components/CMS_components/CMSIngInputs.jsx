import { useState } from "react";
import { Button, Input, Divider } from "@nextui-org/react";
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
            form.amount = item.amount;
        }
        if (!form.ing) {
            toastError(`Must provide an ingredient`);
            isValid = false;
            form.ing = item.ing;
        }
        if (!isValid) return;
        mutateRecipe(
            produce((draft) => {
                draft[section][i] = form;
            }),
            { optimisticData: recipe, revalidate: false }
        );
        setDraftSaved(false);
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
                <Button onPress={handleDeleteClick} color="danger">
                    Delete {label}
                </Button>
                <Button onPress={handleEditClick} color="success">
                    Edit {label}
                </Button>
            </form>
            {i !== length - 1 && <Divider className="my-4" />}
        </li>
    );
}
