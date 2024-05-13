import { useState, useEffect } from 'react';
import { searchClient } from '../../lib/algoliaClient';
import {
    InstantSearch,
    SearchBox,
    CurrentRefinements,
    Hits,
    Pagination,
} from 'react-instantsearch';
import RefinementList from './RefinementList';
import RecipeCard from './RecipeCard';
import SkeletonForCard from './SkeletonForCard';

function CustomHitComponent({ hit }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [isLoading]);

    return (
        <div>
            {isLoading ? (
                <SkeletonForCard />
            ) : (
                <RecipeCard
                    key={crypto.randomUUID()}
                    title={hit.title}
                    text={hit.text}
                    imgUrl={hit.imgUrl}
                    button={hit.button}
                    region={hit.region}
                    category={hit.category}
                    pageId={hit._id}
                />
            )}
        </div>
    );
}

const CardSection = () => {
    return (
        <>
            <div>
                <InstantSearch searchClient={searchClient} indexName='recipes'>
                    <div className='mt-3 mb-3  '>
                        <SearchBox
                            placeholder={' Search for recipes'}
                            classNames={{
                                form: 'hidden lg:flex lg:w-[65vw] lg:ml-[2.2vw]',
                                input: 'border border-black p-1 placeholder:text-slate-400 items-center flex font-sans text-sm w-[13vw] xs:hidden sm:hidden md:hidden lg:flex ',
                                submit: 'fill-white',
                                submitIcon:
                                    'border border-black w-8 h-8 bg-black fill-white p-2',
                                reset: 'hidden',
                            }}
                        />
                    </div>
                    <CurrentRefinements
                        includedAttributes={['region', 'category']}
                        classNames={{
                            root: 'mb-2 hidden lg:flex-row gap-1 items-center sm:none md:none lg:flex mt-[-1vh]',
                            item: 'text-black text-[0.8rem] ml-8  gap-1',
                            category: 'm-1',
                        }}
                    />

                    <div
                        className='flex flex-col md:flex-row justify-start'
                        style={{ width: '95vw' }}
                    >
                        <div className='hidden sm:none md:none lg:flex lg:flex-col md:w-1/5 ml-8 px-1 bg-white border-1 border-black'>
                            <h4
                                className='m-1'
                                style={{
                                    fontFamily: 'Montserrat',
                                    fontSize: '0.7rem',
                                }}
                            >
                                Region:
                            </h4>
                            <RefinementList
                                showMore={true}
                                attribute='region'
                            />
                            <h4
                                className='m-1'
                                style={{
                                    fontFamily: 'Montserrat',
                                    fontSize: '0.7rem',
                                }}
                            >
                                Category:
                            </h4>
                            <RefinementList
                                showMore={true}
                                attribute='category'
                            />
                        </div>

                        <div className='flex flex-row flex-wrap'>
                            <Hits
                                classNames={{
                                    list: 'flex flex-row flex-wrap justify-start items-center ml-10 sm:w-[100vw] md:w-[80vw] lg:w-[w-60] ',
                                    item: 'w-[60vw]  sm:w-0 xs:1 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:1/3 mb-6',
                                }}
                                hitComponent={CustomHitComponent}
                            />
                        </div>
                    </div>

                    <Pagination
                        showFirst={false}
                        showLast={false}
                        totalPages={25}
                        classNames={{
                            selectedItem: 'border bg-black text-white',
                            list: 'flex justify-center items-center mb-2 mt-2 w-[90vw] ml-[5vw]',
                            item: 'border p-1 m-1',
                            link: '',
                        }}
                    />
                </InstantSearch>
            </div>
        </>
    );
};

export default CardSection;
