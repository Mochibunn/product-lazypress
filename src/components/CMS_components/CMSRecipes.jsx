import { searchClient } from "../../lib/algoliaClient";
import {
  InstantSearch,
  SearchBox,
  Hits,
  CurrentRefinements,
  PoweredBy,
} from "react-instantsearch";
import { Card, Button } from "@nextui-org/react";
import CMSHit from "./CMSHit";
import CMSPagination from "./CMSPagination";
import CMSRefinementList from "./CMSRefinementList";
import CMSAddRecipeModal from "./CMSAddRecipeModal";

export default function CMSRecipes({ clerkUser, clerkUserId, blogId }) {
  return (
		<Card>
    <InstantSearch searchClient={searchClient} indexName="recipes">
      <div className="flex w-11/12 justify-between mt-4 ml-2">
        <SearchBox
          placeholder="Search for recipes.."
          className="ml-2"
          classNames={{
            submitIcon: "hidden",
            resetIcon:
              "ml-2 w-4 h-4 fill-black-3 hover:fill-red-600 transition-colors",
            input: "rounded-xl shadow-md min-h-full text-2xl",
          }}
        />
        <Button>
          <CMSAddRecipeModal
            clerkUser={clerkUser}
            clerkUserId={clerkUserId}
            blog={blogId}
          />
        </Button>
      </div>
      <PoweredBy
        classNames={{
          logo: "max-h-3 w-fit",
          root: "w-2/12 ml-6",
        }}
      />

      <CurrentRefinements
        includedAttributes={["region", "tags"]}
        classNames={{
          root: "mt-2 mb-4",
          item: "bg-white dark:bg-stone-800",
        }}
      />
      <div className="flex flex-col md:flex-row justify-evenly">
        <div className="hidden md:block md:flex-row lg:flex-col w-full md:w-1/5 mr-2 pl-4">
          <h4 className="text-2xl mb-2 font-bold font-metropolis">Region</h4>
          <CMSRefinementList showMore={true} attribute="region" />
        </div>
        <Card className="bg-none shadow-none rounded-2xl overflow-visible w-full md:w-4/5 mr-0 md:mr-10">
          <Hits hitComponent={CMSHit} />
        </Card>
      </div>
      <CMSPagination />
    </InstantSearch>
		</Card>
  );
}
