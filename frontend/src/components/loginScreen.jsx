import React from 'react';
import { Toaster, toast } from 'sonner'
import { FiLogIn } from "react-icons/fi";


const LoginScreen = ({ setUser }) => {

    const [loginInfo, setLoginInfo] = React.useState({ email: "", password: "" });

    const baseUrl = process.env.REACT_APP_BASE_URL

    // Function for logging in
    const signIn = async () => {
        const signingIn = await fetch(`${baseUrl}/api/user/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_email: loginInfo.email,
                user_password: loginInfo.password
            })
        })
        const signinResponse = await signingIn.json()
        localStorage.setItem('jwt', signinResponse.token);

        // Store user info in state if status is 200
        if (signingIn.status === 200) {
            console.log(signinResponse)
            setUser(signinResponse.user)
        } else {
            setUser(null)
            throw new Error()
        }
    }


    return (
        <div className='h-full w-full grid grid-rows-10'>
            <div className='row-span-4 flex flex-col justify-center items-center align-center gap-4'>
                <Toaster />
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
            <div className='row-span-6 shadow-t-xl rounded-3xl flex w-full h-fit'>
                <div className='mx-16 my-20 w-full h-fit'>
                    <h1 className='font-black text-3xl text-left'>
                        Log ind
                    </h1>
                    <form
                        className='w-full flex flex-col gap-10 pt-10'
                        action="submit"
                        onSubmit={(e) => {
                            e.preventDefault();
                            toast.promise(signIn, {
                                loading: 'Signing in...',
                                success: 'Successfully signed in!',
                                error: 'Credentials do not match....',
                            });
                        }}
                    >
                        <div id='inputs' className='flex flex-col gap-2'>
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
                                        setLoginInfo({ ...loginInfo, email: e.target.value });
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
                                        setLoginInfo({ ...loginInfo, password: e.target.value });
                                    }}
                                />
                            </div>
                        </div>
                        <div className='w-full'>
                            <button
                                type="submit"
                                className='border-black border px-5 py-3 rounded-lg text-sm font-medium w-full bg-black text-white align-center justify-center'>
                                <div className='flex flex-row gap-5 items-center justify-center'>
                                    <FiLogIn /> Log ind
                                </div>
                            </button>
                            <p className='text-xs font-light mt-2'>
                                Har du ikke en konto? <a href="#">Tilmeld dig</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;