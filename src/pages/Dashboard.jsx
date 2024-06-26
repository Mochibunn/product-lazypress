import SiteCard from '../components/SiteCard';
import {
    Spinner,
    Divider,
    Card,
    CardBody,
    CardHeader,
} from '@nextui-org/react';
import { useSites } from '../lib/swr';
import { useUser } from '@clerk/clerk-react';
import Tilt from 'react-parallax-tilt';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    document.title = `Dashboard | LazyPress`;
    const { user } = useUser();
    const { sites, isLoading, isError } = useSites(user.id);
    const navigate = useNavigate();
    const goto = () => {
        return navigate('/contactus');
    };

    console.log(`Sites\n`, sites);
    console.log(`{Sites}\n`, { sites });
    console.log(`🎃\n`, typeof { sites });
    console.log(user.id);
    console.log(`This is what the user is:\n`, user);

    const dateFetch = new Date(Date.parse(user.lastSignInAt));
    const date =
        dateFetch == 'Invalid Date'
            ? 'A long'
            : dateFetch.toLocaleDateString(`default`);
    const time =
        dateFetch == 'Invalid Date'
            ? 'time ago'
            : dateFetch.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
              });

    return (
        <div className='grow p-6 pt-0 w-full bg-tiffany-blue select-none min-h-screen'>
            {/*Remove the "select-none" class to enable text selection*/}
            <div
                className='flex justify-between min-w-11/12 w-11/12 mx-auto'
                aria-hidden
            >
                <Card className='w-fit my-8 bg-background/50 shadow-sm'>
                    <CardBody>
                        <h2 className='text-4xl font-metropolis font-bold text-center px-2 py-1'>
                            Welcome, {user.firstName}
                        </h2>
                    </CardBody>
                </Card>
                <Card className='ml-4 my-8 bg-background/50 shadow-sm'>
                    <CardBody>
                        <p className='font-metropolis font-bold text-sm text-center px-2 my-auto'>
                            Last login: {date} {time}
                        </p>
                    </CardBody>
                </Card>
            </div>
            {/* <h1 className="watermark text-[150px] text-center">DESIGN WORK IN PROGRESS</h1> Uncomment this during presentation */}
            <Card className=' w-11/12 mx-auto bg-background/50 backdrop-blur-md mb-12 shadow-2xl overflow-visible'>
                <CardHeader className='mx-2'>
                    <p className='text-2xl font-metropolis font-bold my-4'>
                        Your pages:
                    </p>
                </CardHeader>
                <Divider className='w-11/12 mx-auto my-0' />
                <CardBody className='my-2'>
                    <div className='md:grid md:grid-cols-3'>
                        {isLoading ? (
                            <>
                                <div aria-hidden />
                                {/*This div is hidden to screen readers but it moves spinner to the middle*/}
                                <Spinner
                                    className='flex justify-center my-10'
                                    color='secondary'
                                    label='Loading..🐰'
                                />
                            </>
                        ) : isError ? (
                            <>
                                {' '}
                                <div aria-hidden />
                                <div aria-hidden className='text-center'>
                                    <h1 className='text-4xl pointer-events-none mb-2'>
                                        {' '}
                                        Sorry!
                                    </h1>
                                    <p className='font-metropolis pointer-events-none'>
                                        An error occurred trying to load your
                                        sites. Please try again later, or
                                    </p>
                                    <div className='flex justify-center'>
                                        <p
                                            onClick={goto}
                                            className='cursor-pointer font-black text-xl font-metropolis'
                                        >
                                            Contact us{' '}
                                            <span className='font-normal font-metropolis'>
                                                if the problem persists.
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : !sites?.length ? (
                            <>
                                <div aria-hidden />
                                <div aria-hidden className='text-center'>
                                    <h1 className='text-4xl pointer-events-none mb-2'>
                                        {' '}
                                        Uh oh!
                                    </h1>
                                    <p className='font-metropolis pointer-events-none'>
                                        It looks like you have no pages yet!
                                    </p>
                                    <div className='flex justify-center'>
                                        <p
                                            onClick={goto}
                                            className='cursor-pointer font-black text-xl font-metropolis'
                                        >
                                            Contact us{' '}
                                            <span className='font-normal font-metropolis'>
                                                to get started
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            sites.map((site) => {
                                // console.log(`💟\n`, site);
                                return (
                                    <Tilt
                                        tiltEnable={false}
                                        scale={1.05}
                                        transitionSpeed={800}
                                        aria-hidden
                                        key={site._id}
                                    >
                                        <SiteCard
                                            blogId={site._id}
                                            updatedAt={site.updatedAt}
                                            deployed={site.deployed}
                                            {...site.dashboard}
                                        />
                                    </Tilt>
                                );
                            })
                        )}
                        {/* Last line */}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
