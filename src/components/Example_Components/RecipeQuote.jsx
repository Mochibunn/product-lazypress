export default function RecipeQuote() {
    return (
        <div
            className='bg-dots h-[70vh] items-center flex justify-center'
            style={{ borderBottom: '1px solid black' }}
        >
            <p className='bg-[#fced82] text-black mb-2 uppercase p-4 border border-black boxShadow recipe-quote'>
                This page is just a preview, for a live example with recipes
                pages go to: <br />
                <a
                    className='underline hover:text-pink-300'
                    href='https://foodblog-lazypress.netlify.app/'
                    target='_blank'
                >
                    Our Food Blog
                </a>
            </p>
        </div>
    );
}
