import { searchClient } from "../lib/algoliaClient";
import {
    InstantSearch,
    SearchBox,
    Hits,
    CurrentRefinements,
} from "react-instantsearch";
import { Card } from "@nextui-org/react";
import CMSHit from "./CMSHit";
import CMSPagination from "./CMSPagination";
import CMSRefinementList from "./CMSRefinementList";

export default function CMSRecipes() {
    return (
        <InstantSearch searchClient={searchClient} indexName="recipes">
            <SearchBox />
            <CurrentRefinements
                includedAttributes={["region", "tags"]}
                classNames={{
                    root: "mt-2 mb-4",
                    item: "bg-white dark:bg-stone-800",
                }}
            />
            <div className="flex flex-col md:flex-row justify-evenly">
                <div className="hidden md:block md:flex-row lg:flex-col w-full md:w-1/5 mr-2 pl-4">
                    <h4 className="text-xl font-semibold">Region</h4>
                    <CMSRefinementList showMore={true} attribute="region" />
                </div>
                <Card className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden w-full md:w-4/5 mr-0 md:mr-10">
                    <Hits hitComponent={CMSHit} />
                </Card>
            </div>
            <CMSPagination />
        </InstantSearch>
    );
}
