import React from 'react';
import BarLoader from "react-spinners/BarLoader";


const LoadingScreen = ({ searchingForUser }) => {
    return (
        <div className='h-full w-full grid grid-rows-10'>
            <div className='row-span-4 flex flex-col justify-center items-center align-center gap-4'>
                <img src="https://gcmekcowvulxpwukxjhz.supabase.co/storage/v1/object/sign/tabby/tabby_logo.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0YWJieS90YWJieV9sb2dvLnN2ZyIsImlhdCI6MTc0MjE1NTIxMSwiZXhwIjozMzI3ODE1NTIxMX0.c44qWoXaFxlisgePebpRyVAGCqkkq44Ip7d5o7CV47I" alt="tabby_logo" width={"25%"} />
                <div className='flex flex-col gap-1'>
                    <h1 className='font-black text-5xl text-left'>
                        Tabby
                    </h1>
                    <h3 className='text-sm font-light'>
                        - Kvittér med et klik
                    </h3>
                </div>
            </div>
            <div className='row-span-6 flex justify-center items-center mb-32'>
                <BarLoader
                    color="#1e1e1e"
                    loading={searchingForUser}
                    height={4}
                    width={150}
                    aria-label="Loading Bar"
                    data-testid="loader"
                />
            </div>
        </div>
    );
};

export default LoadingScreen;