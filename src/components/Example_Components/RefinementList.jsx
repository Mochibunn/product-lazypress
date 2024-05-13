import { Button, Checkbox } from '@nextui-org/react';
//import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useRefinementList } from 'react-instantsearch';

export default function RefinementList(props) {
    const {
        items,
        refine,
        /*searchForItems,*/
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
            <ul style={{ width: '11vw' }}>
                {items.map((item) => (
                    <li key={item.label} className='mx-1'>
                        <label className='items-center flex mb-1'>
                            <Checkbox
                                isSelected={item.isRefined}
                                radius='none'
                                onValueChange={() => refine(item.value)}
                                color='default'
                            />
                            <span className='border border-[#333131] text-[0.5rem] bg-[#333131] text-white p-1'>
                                {item.count}
                            </span>
                            <span
                                className='text-[0.7rem]'
                                style={{ fontFamily: 'Baryton' }}
                            >
                                &nbsp; {item.label}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
            <Button
                className='mt-1 border border-black bg-[#DAEAF1] uppercase rounded-none text-black text-[0.8rem] buttonShadow mb-2 ml-1'
                style={{ width: '8vw', fontFamily: 'Montserrat' }}
                onPress={toggleShowMore}
                disabled={!canToggleShowMore}
            >
                {isShowingMore ? 'Show less' : 'Show more'}
            </Button>
            {/* <button onClick={toggleShowMore} disabled={!canToggleShowMore}>
      </button> */}
        </>
    );
}
