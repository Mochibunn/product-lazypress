import { Button } from "@nextui-org/react";
import { useInstantSearch } from "react-instantsearch";

export default function CMSRefreshBtn() {
    const { refresh } = useInstantSearch();
    return (
        <Button variant="flat" radius="sm" color="primary" onPress={refresh}>
            Refresh
        </Button>
    );
}
