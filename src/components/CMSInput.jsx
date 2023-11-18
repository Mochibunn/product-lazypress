import { Input, Textarea } from "@nextui-org/react";

export default function CMSInput({ valueObj, i, onChange }) {
    const { value, label } = valueObj;
    return (
        <>
            {value.length > 100 ? (
                <Textarea
                    className="w-1/2"
                    color="primary"
                    value={value}
                    label={label}
                    labelPlacement="outside-left"
                    // name={`nav${i}`}
                    onChange={(e) => onChange(e, i)}
                    isReadOnly={label === "_id" ? true : false}
                />
            ) : (
                <Input
                    className="w-1/2"
                    color="primary"
                    value={value}
                    label={label}
                    labelPlacement="outside-left"
                    // name={`nav${i}`}
                    onChange={(e) => onChange(e, i)}
                />
            )}
        </>
    );
}
