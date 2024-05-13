import { FaRegCopyright } from 'react-icons/fa';
import { useBlog } from '../../lib/swr';
import { useParams } from 'react-router-dom';

export default function Footer() {
    const { blogId } = useParams();
    const { swrBlog, isLoading } = useBlog(blogId);

    if (!swrBlog) {
        return <div>Footer not found</div>;
    }

    if (isLoading) return <div>Loading...</div>;
    return (
        <div className='text-white p-6 ' style={{ backgroundColor: '#333131' }}>
            <ul>
                {swrBlog.pages.home.footer.map((item, index) => (
                    <li key={index}>
                        <p className='flex items-center gap-1 justify-center p-6'>
                            <FaRegCopyright /> {item.footerItem}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
