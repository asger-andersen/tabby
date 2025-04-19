import React from 'react';
import { Toaster, toast } from 'sonner'
import { FaCheck } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";


const CreateAccount = ({ setUser, setCreateUser }) => {

    const [userInfo, setUserInfo] = React.useState({ firstname: "", lastname: "", email: "", password: "" });

    const baseUrl = process.env.REACT_APP_BASE_URL

    // Function for logging in
    const createAccount = async () => {
        // Check if all user info is provided
        if (userInfo.firstname.length === 0 || userInfo.lastname.length === 0 || userInfo.email.length === 0 || userInfo.password.length === 0) {
            toast.error("Udfyld venligst alle felter!")
            throw new Error
        }

        // Call API to create user
        const createUser = await fetch(`${baseUrl}/api/user/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                user_email: userInfo.email,
                user_password: userInfo.password
            })
        })
        const response = await createUser.json()
        localStorage.setItem('jwt', response.token);

        // Store user info in state if status is 201
        if (createUser.status === 201) {
            setUser(response.user)
        } else {
            setUser(null)
            throw new Error()
        }
    }


    return (
        <div className='h-full w-full grid grid-rows-20'>
            <div className='row-span-5 flex flex-col justify-center items-center align-center gap-4'>
                <Toaster />
                <img src="https://gcmekcowvulxpwukxjhz.supabase.co/storage/v1/object/sign/tabby/tabby_logo.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0YWJieS90YWJieV9sb2dvLnN2ZyIsImlhdCI6MTc0MjE1NTIxMSwiZXhwIjozMzI3ODE1NTIxMX0.c44qWoXaFxlisgePebpRyVAGCqkkq44Ip7d5o7CV47I" alt="tabby_logo" width={"25%"} />
            </div>
            <div className='row-span-6 shadow-t-xl rounded-3xl flex w-full h-fit bg-white'>
                <div className='mx-16 my-12 w-full h-fit'>
                    <div className='flex'>
                        <button
                            className='p-2 text-lg'
                            onClick={() => {
                                setCreateUser(false)
                            }}
                        >
                            <IoChevronBack />
                        </button>
                    </div>
                    <h2 className='font-black text-3xl text-left'>
                        Opret konto
                    </h2>
                    <form
                        className='w-full flex flex-col gap-10 pt-10'
                        action="submit"
                        onSubmit={(e) => {
                            e.preventDefault();
                            toast.promise(createAccount, {
                                loading: 'Opretter konto...',
                                success: 'Success! Oprettede konto!',
                                error: 'Kunne ikke oprette konto...',
                            });
                        }}
                    >
                        <div id='inputs' className='flex flex-col gap-2'>
                            <div className='flex flex-col text-left'>
                                <label
                                    htmlFor=""
                                    className='text-xs mb-0.5'>
                                    Fornavn
                                </label>
                                <input
                                    type="string"
                                    name="string"
                                    placeholder='Alfred'
                                    required
                                    className='border-black border px-5 py-3 rounded-lg text-sm font-light'
                                    onChange={(e) => {
                                        setUserInfo({ ...userInfo, firstname: e.target.value });
                                    }}
                                />
                            </div>
                            <div className='flex flex-col text-left'>
                                <label
                                    htmlFor=""
                                    className='text-xs mb-0.5'>
                                    Efternavn
                                </label>
                                <input
                                    type="string"
                                    name="string"
                                    placeholder='Alfredsen'
                                    required
                                    className='border-black border px-5 py-3 rounded-lg text-sm font-light'
                                    onChange={(e) => {
                                        setUserInfo({ ...userInfo, lastname: e.target.value });
                                    }}
                                />
                            </div>
                            <div className='flex flex-col text-left'>
                                <label
                                    htmlFor=""
                                    className='text-xs mb-0.5'>
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder='alfred@email.dk'
                                    required
                                    className='border-black border px-5 py-3 rounded-lg text-sm font-light'
                                    onChange={(e) => {
                                        setUserInfo({ ...userInfo, email: e.target.value });
                                    }}
                                />
                            </div>
                            <div className='flex flex-col text-left'>
                                <label
                                    htmlFor=""
                                    className='text-xs mb-0.5'>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder='kodeord123'
                                    required
                                    className='border-black border px-5 py-3 rounded-lg text-sm font-light'
                                    onChange={(e) => {
                                        setUserInfo({ ...userInfo, password: e.target.value });
                                    }}
                                />
                            </div>
                        </div>
                        <div className='w-full'>
                            <button
                                type="submit"
                                className='border-black border px-5 py-3 rounded-lg text-sm font-medium w-full bg-black text-white align-center justify-center'>
                                <div className='flex flex-row gap-5 items-center justify-center'>
                                    <FaCheck /> Opret konto
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;