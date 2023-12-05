import { useState } from "react";
import { Button, Input, Divider } from "@nextui-org/react";
import { toastError, toastSuccess } from "../../lib/toastify";

export default function CMSAddIngInputs({
    item,
    i,
    length,
    label,
    section,
    setNewRecipe,
    newRecipe,
}) {
    const [form, setForm] = useState({
        amount: item.amount,
        ing: item.ing,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

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
        setNewRecipe((draft) => {
            draft[section][i] = form;
        });
        toastSuccess(`Draft updated`);
    };

    const handleDeleteClick = () => {
        // console.log(newRecipe);
        if (newRecipe[section].length === 1) {
            return toastError(`Must have at least one ingredient`);
        }
        setNewRecipe((draft) => {
            draft[section].splice(i, 1);
        });
        // toastSuccess(`Item deleted from draft`);
    };
    // console.log(newRecipe);
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
                    <Button onPress={handleDeleteClick} color="danger">
                        Delete {label}
                    </Button>
                    <Button onPress={handleEditClick} color="secondary">
                        Edit {label}
                    </Button>
                </div>
            </form>
            {i !== length - 1 && <Divider className="my-4" />}
        </li>
    );
}
