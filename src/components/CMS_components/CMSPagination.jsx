import { usePagination } from "react-instantsearch";
import { Pagination } from "@nextui-org/react";
import { useState } from "react";
import { useEffect } from "react";

/**
 * Algolia instant search custom pagination component for NextUI
 * 2023, github.com/Mochibunn
 *
 *
 */
export default function CMSPagination(props) {
    const { nbPages, refine } = usePagination(props);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        refine(currentPage - 1);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [currentPage, refine]);

    return (
        <Pagination
            color="secondary"
            size="lg"
            // radius="none"
            total={nbPages}
            page={currentPage}
            className="flex justify-center mt-1 mx-0" 
            onChange={setCurrentPage}
        ></Pagination>
    );
}
