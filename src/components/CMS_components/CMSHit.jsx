import { Card, CardHeader, Image, Button, Tooltip } from "@nextui-org/react";
import CMSRecipeModal from "./CMSRecipeModal";
import CMSDeleteModal from "./CMSDeleteModal";
import { useState } from "react";

export default function CMSHit({ hit }) {
    const [draftSaved, setDraftSaved] = useState(true);
    return (
        <Card
            className="w-full h-full my-2 flex shadow-md"
            // isPressable
            onClick={() => {
                console.log(hit._id);
            }}
        >
            <CardHeader className="flex p-0">
                <Image
                    alt={`${hit.title}`}
                    height="100%"
                    radius="sm"
                    src={hit.imgUrl}
                    width="100%"
                    className="h-[100px] w-[100px] sm:h-[100px] sm:w-[100px] md:h-[150px] md:w-[150px] lg:h-[200px] lg:w-[200px] m-2 md:m-0 pointer-events-none"
                />
                <div className="flex text-left flex-col ml-3 w-8/12 overflow-clip gap-0 lg:gap-3">
                    <p className="text-base md:text-2xl font-bold truncate">
                        {hit.title}
                    </p>
                    {/* <p className="text-xs md:text-lg font-semibold text-default-500 truncate">
                        By: {hit.artist}
                    </p> */}
                    {/* {console.log(hit.genre)} */}
                    {/* <div className="flex">
                        <span>{GenreMap(hit.genre)}</span>
                    </div> */}
                    {/* <p className="text-base md:text-xl font-semibold">
                        ${hit.price}
                    </p> */}
                </div>
                <div className="mr-4 flex flex-col gap-4">
                    {!draftSaved && (
                        <Tooltip
                            content="Unsaved changes in draft."
                            color="warning"
                            className="font-metropolis"
                            // showArrow={true}
                        >
                            <p className="text-right hover:cursor:default">
                                🟠
                            </p>
                        </Tooltip>
                    )}
                    <Button radius="sm" variant="ghost" color="secondary">
                        <CMSRecipeModal
                            setDraftSaved={setDraftSaved}
                            {...hit}
                        />
                    </Button>
                    <Button radius="sm" color="danger" className="shake">
                        <CMSDeleteModal {...hit} />
                    </Button>
                </div>
            </CardHeader>
        </Card>
    );
}
