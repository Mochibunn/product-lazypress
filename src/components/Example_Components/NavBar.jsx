import { useState } from 'react';
import {
    Navbar,
    NavbarContent,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
} from '@nextui-org/react';
import { useBlog } from '../../lib/swr';
import { useParams } from 'react-router-dom';

export default function NavBar() {
    const { blogId } = useParams();
    const { swrBlog, isLoading } = useBlog(blogId);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (isLoading) return null;

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className='bg-white flex items-center md:h-[3rem] xs:h-[4rem]'
            position='static'
            style={{
                borderBottom: '1px solid #333131',
            }}
        >
            <NavbarContent
                className='sm:hidden'
                justify='center

      '
            >
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                />
            </NavbarContent>
            <NavbarContent className='sm:hidden'>
                <NavbarBrand>
                    <span>{swrBlog.dashboard.blogTitle}</span>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className='hidden sm:flex gap-4 '>
                <div>
                    <NavbarBrand>
                        <Link
                            href='/'
                            className='text-black xl:ml-[-14vw] lg:ml-[0]'
                        >
                            <span>{swrBlog.dashboard.blogTitle}</span>
                        </Link>
                    </NavbarBrand>
                </div>

                {swrBlog.pages.home.navBar.map((item, index) => (
                    <NavbarMenuItem key={index}>
                        <Link
                            className={`text-sm uppercase items-center
             `}
                            color='foreground'
                            href={item.href}
                            style={{
                                fontFamily: 'Montserrat',
                                textDecoration: 'none',
                                color: '#333131',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '0.6rem',
                            }}
                        >
                            <span className='h-3 w-3 bg-white border border-black rounded-full mr-1 hover:bg-black'></span>
                            {item.menuItem}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarContent>

            <NavbarMenu>
                {swrBlog.pages.home.navBar.map((item, index) => (
                    <NavbarMenuItem key={index}>
                        <Link
                            className={`text-sm uppercase items-center`}
                            color='foreground'
                            style={{
                                fontFamily: 'Montserrat',
                                textDecoration: 'none',
                                color: '#333131',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <span className='h-3 w-3 bg-white border border-black rounded-full mr-1 hover:bg-black'></span>
                            {item.menuItem}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
