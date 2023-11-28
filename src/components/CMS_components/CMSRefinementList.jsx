import { Button, Checkbox, Chip } from "@nextui-org/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useRefinementList } from "react-instantsearch";

export default function CMSRefinementList(props) {
    const {
        items,
        refine,
        // searchForItems,
        canToggleShowMore,
        isShowingMore,
        toggleShowMore,
    } = useRefinementList(props);

    return (
        <>
            {/* <Input
        type="search"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        maxLength={512}
        onChange={(event) => searchForItems(event.currentTarget.value)}
      /> */}
            <ul>
                {items.map((item) => (
                    <li key={item.label}>
                        <label>
                            <Checkbox
                                isSelected={item.isRefined}
                                onValueChange={() => refine(item.value)}
                                color="secondary"
                            />
                            <Chip size="sm" className="text-[10px]">
                                {item.count}
                            </Chip>
                            <span className="text-sm">
                                &nbsp;&nbsp;{item.label}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
            <Button
                className="my-2"
                color="secondary"
                onPress={toggleShowMore}
                disabled={!canToggleShowMore}
                startContent={
                    isShowingMore ? <FiChevronUp /> : <FiChevronDown />
                }
            >
                {isShowingMore ? "Show less" : "Show more"}
            </Button>
            {/* <button onClick={toggleShowMore} disabled={!canToggleShowMore}>
      </button> */}
        </>
    );
}
