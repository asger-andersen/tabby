import React from 'react';
import { Toaster, toast } from 'sonner'

import TotalSales from '../dashboard/TotalSales'
import LatestActivities from '../dashboard/LatestActivities'
import CreateReceiptButton from '../dashboard/CreateReceiptButton'
import CreateReceipt from '../receipt/CreateReceipt'


const DashboardFront = ({ setActivePage, user }) => {
    const [userData, setUserData] = React.useState(user)
    const [showCreateReceipt, setShowCreateReceipt] = React.useState(false)

    // On page load, fetch user data - When receipt is created, fetch updated data
    React.useEffect(() => {
        fetchUserData();
    }, [showCreateReceipt]);


    // Function for fetching user data
    const fetchUserData = async () => {
        const baseUrl = process.env.REACT_APP_BASE_URL
        const token = localStorage.getItem('jwt');

        // Make API call to backend to fetch data
        const userData = await fetch(`${baseUrl}/api/user/getdata`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        const dataResponse = await userData.json()

        // Store user data in state if status is 200
        if (userData.status === 200) {
            setUserData(dataResponse[0])
        } else {
            setUserData(null)
        }
    };

    return (
        <>
            {showCreateReceipt &&
                <div className='z-10 absolute inset-0 max-h-full max-w-screen'>
                    <CreateReceipt showCreateReceipt={showCreateReceipt} setShowCreateReceipt={setShowCreateReceipt} setActivePage={setActivePage} />
                </div>
            }
            <div id='dashboard' className='flex flex-col justify-between flex-grow mx-7 mt-20'>
                <Toaster />
                <div id='title'>
                    <h1 className='font-black text-3xl text-left'>
                        Forside
                    </h1>
                </div>
                <div className='flex flex-col justify-between flex-grow'>
                    <div id='hero' className='max-w-[calc(100vw_-_3.5rem)] grid grid-rows-20 gap-4 pt-7'>
                        <TotalSales salesData={userData} />
                        <LatestActivities salesData={userData} />
                    </div>
                    <CreateReceiptButton setShowCreateReceipt={setShowCreateReceipt} />
                </div>
            </div>
        </>
    );
};

export default DashboardFront;