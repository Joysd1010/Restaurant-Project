import React, { useState, useEffect } from 'react';

const FirstPage = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDateTime = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);
        const formattedTime = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return { formattedDate, formattedTime };
    };

    const { formattedDate, formattedTime } = formatDateTime(currentTime);

    return (
        <div className='relative h-[500px] flex flex-col items-center justify-center bg-[url(https://png.pngtree.com/thumb_back/fh260/background/20230706/pngtree-3d-render-of-the-interior-of-a-cozy-cafe-restaurant-image_3811953.jpg)] bg-cover bg-center'>
            
            <div className='absolute inset-0 bg-white h-56 my-36 opacity-70 z-10'></div>

            
            <div className='relative z-20 text-center flex flex-col gap-5'>
                <h1 className='text-3xl font-merriweather font-bold text-gray-800 mb-4'>Welcome to Olive and Lime Admin Panel</h1>
                <div className='text-center flex flex-col gap-5'>
                    <div className='text-xl font-semibold text-darkOlive'>{formattedDate}</div>
                    <div className='text-lg font-medium text-blue-700'>{formattedTime}</div>
                </div>
            </div>
        </div>
    );
};

export default FirstPage;
