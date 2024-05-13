import { Card, CardHeader, CardBody, Image, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { PiForkKnifeFill } from 'react-icons/pi';
import { ctgryColor } from '../../utils/category';

export default function RecipeCard({
    title,
    imgUrl,
    button,
    region,
    category,
    pageId,
}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipe/${pageId}`);
    };

    return (
        <Card
            className='border rounded-none boxShadow mx-3 bg-[#FF8F60]'
            style={{ borderColor: 'black' }}
        >
            <CardHeader
                className='flex-col flex-wrap items-start justify-center'
                style={{ height: '20vh' }}
            >
                <h4
                    className='uppercase'
                    style={{
                        fontFamily: 'Montserrat',
                        lineHeight: '1.2rem',
                        fontSize: '1.5rem',
                    }}
                >
                    {title}
                </h4>
                <div className='flex flex-col items-start'>
                    <p
                        className='text-tiny flex mt-1 mb-1 font-bold items-center'
                        style={{ fontFamily: 'Baryton' }}
                    >
                        <PiForkKnifeFill />
                        &nbsp;{region} Cuisine
                    </p>
                    <p
                        className={`text-tiny text-black uppercase font-bold border border-black p-[0.5] px-2 ${ctgryColor(
                            category
                        )}`}
                        style={{ fontFamily: 'Montserrat', fontSize: '0.5rem' }}
                    >
                        {category}
                    </p>
                </div>
            </CardHeader>
            <CardBody className='overflow-hidden' style={{ marginTop: '-3vh' }}>
                <Image
                    alt='Food Image'
                    className='object-cover rounded-none mb-2 card-image'
                    src={imgUrl}
                    style={{
                        border: '1px solid #333131',
                    }}
                />
                <div className='items-end flex flex-col'>
                    <Button
                        onClick={handleClick}
                        className='button buttonShadow rounded-none my-[3vh] uppercase '
                        style={{
                            border: '1px solid black',
                            backgroundColor: '#e4f201',
                            fontFamily: 'Montserrat',
                        }}
                    >
                        {button}
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}
