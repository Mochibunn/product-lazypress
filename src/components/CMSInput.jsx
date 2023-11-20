import { Input, Textarea } from "@nextui-org/react";

export default function CMSInput({ valueObj, i, onChange }) {
    const { value, label } = valueObj;
    return (
        <>
            {value?.length > 100 ? (
                <Textarea
                    className={`w-full ${label === "_id" && "hidden"}`}
                    color="primary"
                    value={value}
                    label={label}
                    name={label}
                    labelPlacement="outside-left"
                    // name={`nav${i}`}
                    // onChange={(e) => onChange(e, i)}
                    onChange={(e) => onChange(e)}
                    isReadOnly={label === "_id" ? true : false}
                />
            ) : (
                <Input
                    className={`w-full ${label === "_id" && "hidden"}`}
                    color="primary"
                    value={value}
                    label={label}
                    name={label}
                    labelPlacement="outside-left"
                    // name={`nav${i}`}
                    onChange={(e) => onChange(e, i)}
                    isReadOnly={label === "_id" ? true : false}
                />
            )}
        </>
    );
}
