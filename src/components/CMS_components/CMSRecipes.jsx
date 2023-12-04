import { searchClient } from "../../lib/algoliaClient";
import {
  InstantSearch,
  SearchBox,
  Hits,
  CurrentRefinements,
  PoweredBy,
} from "react-instantsearch";
import { Card, Button } from "@nextui-org/react";
import { useImmer } from "use-immer";
import CMSHit from "./CMSHit";
import CMSPagination from "./CMSPagination";
import CMSRefinementList from "./CMSRefinementList";
import CMSAddRecipeModal from "./CMSAddRecipeModal";
import CMSRefreshBtn from "./CMSRefreshBtn";

export default function CMSRecipes({ clerkUser, clerkUserId, blog }) {
  const [newRecipe, setNewRecipe] = useImmer({
    title: "",
    category: "",
    region: "",
    ingList: [],
    steps: [],
    text: "",
    button: "",
    tags: [],
    imgUrl: "",
    videoUrl: "",
    clerkUserId,
    clerkUser,
    blog,
  });

  // console.log(newRecipe);
  return (
    <Card className="bg-transparent shadow-none">
      <InstantSearch
				searchClient={searchClient}
				indexName="recipes"
				classNames={{
					root: "bg-transparent",
				}}
				>
        <div className="flex w-11/12 justify-between mt-4 ml-2 align-middle">
          <div className="flex">
            <SearchBox
              placeholder="Search for recipes.."
              className="mx-2 flex"
              classNames={{
                submitIcon: "hidden",
                resetIcon:
                  "ml-2 w-4 h-4 fill-black-3 hover:fill-red-600 transition-colors",
                input: "rounded-xl shadow-md min-h-full text-2xl align-middle",
              }}
            />
            <CMSRefreshBtn />
          </div>
          <Button color="primary">
            <CMSAddRecipeModal
              clerkUser={clerkUser}
              clerkUserId={clerkUserId}
              blog={blog}
              newRecipe={newRecipe}
              setNewRecipe={setNewRecipe}
            />
          </Button>
        </div>
        <div className="ml-6 w-max borderr">
          <PoweredBy
            classNames={{
              logo: "h-3 min-w-full flex justify-center",
              root: "w-full bg-blue-500 px-2 py-1 border-black border-1",
            }}
          />
        </div>

        <CurrentRefinements
          includedAttributes={["region", "tags"]}
          classNames={{
            root: "mt-2 mb-4 bg-transparent",
            // item: "bg-white dark:bg-stone-800",
          }}
        />
        <div className="flex flex-col md:flex-row justify-evenly">
          <div className="hidden md:block md:flex-row lg:flex-col w-full md:w-1/5 mr-2 pl-4">
            <h4 className="text-2xl mb-2 font-bold font-metropolis">Region</h4>
            <CMSRefinementList showMore={true} attribute="region" />
          </div>
          <Card className=" bg-transparent shadow-none rounded-2xl overflow-visible w-full md:w-4/5 mr-0 md:mr-10">
            <Hits hitComponent={CMSHit} />
          </Card>
        </div>
        <CMSPagination />
      </InstantSearch>
    </Card>
  );
}
