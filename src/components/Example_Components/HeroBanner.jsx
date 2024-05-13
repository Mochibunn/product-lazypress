import {
    Animator,
    ScrollContainer,
    ScrollPage,
    batch,
    Fade,
} from 'react-scroll-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Button } from '@nextui-org/react';
import { useBlog } from '../../lib/swr';
import { useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

import { useParams } from 'react-router-dom';

const HeroBanner = () => {
    const { blogId } = useParams();
    const { swrBlog, isLoading } = useBlog(blogId);
    const [isAutoplay, setIsAutoplay] = useState(true);

    if (isLoading) return null;
    return (
        <ScrollContainer>
            <ScrollPage
                style={{
                    height: '100vh',
                    border: '1px solid black',
                }}
            >
                <Animator animation={batch(Fade())}>
                    <Carousel
                        autoPlay={isAutoplay}
                        interval={8000}
                        showIndicators={true}
                        showStatus={false}
                        showThumbs={false}
                        infiniteLoop
                        style={{ height: '100vh', overflow: 'hidden' }}
                        showArrows={true}
                        onClickItem={() => setIsAutoplay((prev) => !prev)}
                    >
                        {swrBlog?.pages.home.hero.map((item, index) => (
                            <div
                                key={index}
                                className='relative h-[100vh] w-[]overflow-x-hidden bg-[#717ff7] hover:cursor-pointer hover:opacity-95 group'
                            >
                                {isAutoplay ? (
                                    <FaPause className='invisible group-hover:visible absolute z-500 h-full w-full p-48 opacity-20' />
                                ) : (
                                    <FaPlay className='invisible group-hover:visible absolute z-500 h-full w-full p-48 opacity-20' />
                                )}
                                <img
                                    alt='carousel banner'
                                    src={item.imgUrl}
                                    draggable='false'
                                    className=' object-cover h-[100vh] boxShadow'
                                    style={{
                                        width: '40vw',
                                        height: '50vh',
                                        marginLeft: '45vw',
                                        marginTop: '25vh',
                                        border: '1px solid black',
                                    }}
                                />
                                <div className='absolute  z-50 text-center text-white w-[60vw] flex flex-col justify-center items-center uppercase'>
                                    <h1 className='hero-banner-title text-black mb-2'>
                                        {item.title}
                                    </h1>
                                    <p
                                        className='text-black'
                                        style={{
                                            fontFamily: 'Pilated',
                                            fontSize: '2rem',
                                        }}
                                    >
                                        {item.text}
                                    </p>
                                    <Button
                                        onClick={() =>
                                            console.log('CTA Clicked')
                                        }
                                        className='hero-banner-button text-black buttonShadow uppercase'
                                        style={{
                                            fontFamily: 'Montserrat',
                                            backgroundColor: '#f0ff00',
                                            borderRadius: '0px',
                                            border: '1px solid #333131',
                                        }}
                                    >
                                        {item.button}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </Animator>
            </ScrollPage>
        </ScrollContainer>
    );
};

export default HeroBanner;
