import { Input, Image, Textarea } from "@nextui-org/react";
import { useMemo } from "react";

export default function CMSInput({ valueObj, i, onChange, sectionIndex }) {
    const { value, label } = valueObj;
    const section = sectionIndex + 1;
    const labelFormat = label.charAt(0).toUpperCase() + label.slice(1); //same as label but it formats the label to include an uppercase first letter

    const validateUrl = (value) =>
        value.match(
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
        );
    const isInvalid = useMemo(() => {
        if (value === "") return false;

        return validateUrl(value) ? false : true;
    }, [value]);

    return (
        <div className="flex mt-2">
            <p className="w-1/12 text-sm font-semibold align-middle ml-2 my-auto">
                {(() => {
                    switch (label) {
                        case "menuItem":
                            return "Menu Item";
                        case "href":
                            return "URL";
                        case "footerItem":
                            return "Footer Item";
                        case "imgUrl":
                            return "Image URL";
                        case "ingList":
                            return "Ingredients List";
                        case "_id":
                            return;
                        default:
                            return labelFormat;
                    }
                })()}
                {/* This is a self invoking function! It's necessary here for the switch statement :) */}
            </p>
            <div className="w-full mr-2">
                {value?.length > 100 ? (
                    <Textarea
                        className={`w-full glassInput ${
                            label === "_id" && "hidden"
                        }`}
                        color="default"
                        value={value}
                        name={label}
                        minRows={1}
                        // label={label}
                        // labelPlacement="outside"
                        // name={`nav${i}`}
                        onChange={(e) => onChange(e, i)}
                        isReadOnly={label === "_id" ? true : false} //For URLs
                        isInvalid={isInvalid}
                        errorMessage={isInvalid && "Please enter a valid URL"}
                    />
                ) : (
                    <Input
                        className={`w-full glassInput ${
                            label === "_id" && "hidden"
                        }`}
                        color="default"
                        value={value}
                        name={label}
                        size="sm"
                        // label={label}
                        // labelPlacement="outside-left"
                        // name={`nav${i}`}
                        onChange={(e) => onChange(e, i)}
                        isReadOnly={label === "_id" ? true : false} //For other inputs
                    />
                )}
                <div className="ml-12 mx-auto">
                    {label === "imgUrl" && (
                        <Image
                            alt="Section image"
                            src={value}
                            className="max-h-[200px] max-w-[600px] my-2 shadow-xl"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
