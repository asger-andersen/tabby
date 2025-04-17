import React from 'react';
import LoginScreen from './loginScreen'
import DashboardFront from './DashboardFront'
import LoadingScreen from './loadingScreen'


const HomePage = () => {
    const [user, setUser] = React.useState(null);
    const [searchingForUser, setSearchingForUser] = React.useState(true)

    // On page load, check if user is logged in
    React.useEffect(() => {
        checkCurrentUser();
    }, []);

    // Function for verifying user session
    const checkCurrentUser = async () => {
        const baseUrl = process.env.REACT_APP_BASE_URL
        const token = localStorage.getItem('jwt');

        // Make API call to backend to verify user session
        const verifySession = await fetch(`${baseUrl}/api/user/verify-session`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        const sessionResponse = await verifySession.json()

        // Store user info in state if status is 200
        if (verifySession.status === 200) {
            setUser(sessionResponse)
            setSearchingForUser(false)
        } else {
            setUser(null)
            setSearchingForUser(false)
        }
    };


    return (
        <section className='w-full max-w-screen h-screen flex flex-col justify-between'>
            {
                searchingForUser ? (
                    <LoadingScreen searchingForUser={searchingForUser} />
                ) : user && !searchingForUser ? (
                    <DashboardFront />
                ) : (
                    <LoginScreen setUser={setUser} />
                )
            }
        </section>
    );
};

export default HomePage;