import { Card, CardHeader, Image, CardFooter, Button } from "@nextui-org/react";
import CMSRecipeModal from "./CMSRecipeModal";

export default function CMSHit({ hit }) {
    return (
        <Card
            className="w-full h-full my-0 flex"
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
                    className="h-[100px] w-[100px] sm:h-[100px] sm:w-[100px] md:h-[150px] md:w-[150px] lg:h-[200px] lg:w-[200px] m-2 md:m-0"
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
                    <Button>
                        <CMSRecipeModal {...hit} />
                    </Button>
                    <Button color="danger">Delete Recipe</Button>
                </div>
            </CardHeader>
        </Card>
    );
}