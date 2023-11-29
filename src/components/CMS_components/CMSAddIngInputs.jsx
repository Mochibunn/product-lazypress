import { useState } from "react";
import { Button, Input, Divider } from "@nextui-org/react";
import { useRecipe } from "../../lib/swr";
import { produce } from "immer";

export default function CMSAddIngInputs({
    item,
    i,
    length,
    label,
    section,
    setNewRecipe,
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
        setNewRecipe((draft) => {
            draft[section][i] = form;
        });
    };

    const handleDeleteClick = () => {
        setNewRecipe((draft) => {
            draft[section].splice(i, 1);
        });
    };
    return (
        <li className="my-4 mx-2">
            <form className="flex items-baseline">
                <Input
                    className="glassInput"
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
