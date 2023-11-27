import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
    import.meta.env.VITE_ALG_APP_ID,
    import.meta.env.VITE_ALG_SEARCH_API_KEY
);

export { searchClient };
