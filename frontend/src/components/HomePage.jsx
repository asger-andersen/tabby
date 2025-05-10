import React from 'react';
import LoginScreen from './onboarding/loginScreen'
import DashboardFront from './pages/DashboardFront'
import LoadingScreen from './loadingScreen'
import CreateAccount from './onboarding/createAccount'
import CompanyPage from './pages/CompanyPage'
import Menu from './Menu'


const HomePage = () => {
    const [user, setUser] = React.useState(null);
    const [searchingForUser, setSearchingForUser] = React.useState(true)
    const [createUser, setCreateUser] = React.useState(false)
    const [activePage, setActivePage] = React.useState("dashboard");

    // On page load, check if user is logged in
    React.useEffect(() => {
        checkCurrentUser();
    }, []);

    // Function for verifying user session
    const checkCurrentUser = async () => {
        const baseUrl = process.env.REACT_APP_BASE_URL
        const token = localStorage.getItem('jwt');

        // Make API call to backend to verify user session
        const verifySession = await fetch(`${baseUrl}/api/user/getdata`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        const sessionResponse = await verifySession.json()

        // Store user info in state if status is 200
        if (verifySession.status === 200) {
            setUser(sessionResponse[0])
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
                    <>
                        {activePage === "dashboard" ? (
                            <DashboardFront setActivePage={setActivePage} user={user} />
                        ) : activePage === "company" ? (
                            <CompanyPage />
                        ) : (
                            ""
                        )}
                        <Menu activePage={activePage} setActivePage={setActivePage} />
                    </>
                ) : !user && !searchingForUser && createUser ? (
                    <CreateAccount setUser={setUser} setCreateUser={setCreateUser} />
                ) : (
                    <LoginScreen setUser={setUser} setCreateUser={setCreateUser} />
                )
            }
        </section>
    );
};

export default HomePage;