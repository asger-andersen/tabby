import React from 'react';
import { Toaster, toast } from 'sonner'
import { FiLogIn } from "react-icons/fi";
import LoginScreen from './loginScreen'
import DashboardFront from './DashboardFront'

const HomePage = ({ givenData }) => {
    const [user, setUser] = React.useState(null);

    const [loginInfo, setLoginInfo] = React.useState({ email: "", password: "" });

    const baseUrl = "http://localhost:8000"

    // On page load, check if user is logged in
    React.useEffect(() => {
        checkCurrentUser();
    }, []);

    // Function for verifying user session
    const checkCurrentUser = async () => {
        // Make API call to backend to verify user session
        const verifySession = await fetch(`${baseUrl}/api/user/verify-session`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        const sessionResponse = await verifySession.json()
        console.log(sessionResponse)

        // Store user info in state if status is 200
        if (verifySession.status === 200) {
            console.log(sessionResponse)
            setUser(sessionResponse)
        } else {
            setUser(null)
        }
    };


    return (
        <section className='w-full max-w-screen h-screen flex flex-col justify-between'>
            {
                user ?
                    <DashboardFront />
                    : <LoginScreen setUser={setUser} />
            }
        </section>
    );
};

export default HomePage;

/*
<section className='w-full max-w-screen h-full max-h-screen flex justify-between'>
    <>
        {showCreateReceipt &&
            <div className='z-10 absolute max-h-full max-w-screen'>
                <CreateReceipt showCreateReceipt={showCreateReceipt} setShowCreateReceipt={setShowCreateReceipt} />
            </div>
        }
        <div id='dashboard' className='mx-7 mt-20 flex flex-col justify-between'>
            <Toaster />
            <div id='title'>
                <h1 className='font-black text-3xl text-left'>
                    Forside
                </h1>
            </div>
            <div className='flex h-full flex-col justify-between'>
                <div id='hero' className='max-w-[calc(100vw_-_3.5rem)] grid grid-rows-20 gap-4 pt-7'>
                    <TotalSales salesData={userData} />
                    <LatestActivities salesData={userData} />
                </div>
                <CreateReceiptButton setShowCreateReceipt={setShowCreateReceipt} />
            </div>
        </div>
        <nav id='menu' className='flex flex-row grow justify-around text-xs font-medium pt-3 mt-3 shadow-t-lg'>
            <a href="#" className='flex flex-col basis-64 align-center text-center items-center'>
                <TiHome size={28} />
                Forside
            </a>
            <a href="#" className='flex flex-col basis-64 align-center text-center items-center'>
                <TiHome size={28} />
                Aktiviteter
            </a>
            <a href="#" className='flex flex-col basis-64 align-center text-center items-center'>
                <TiHome size={28} />
                Firma
            </a>
            <a href="#" className='flex flex-col basis-64 align-center text-center items-center'>
                <TiHome size={28} />
                Profil
            </a>
        </nav>
    </>
</section>
*/