import React from 'react';
import { Toaster, toast } from 'sonner'

import { HiOutlineHome } from "react-icons/hi";
import { HiHome } from "react-icons/hi";

import { TbReceipt } from "react-icons/tb";
import { TbReceiptFilled } from "react-icons/tb";

import { TbBriefcase2 } from "react-icons/tb";
import { TbBriefcase2Filled } from "react-icons/tb";

import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";


const Menu = () => {

    const [activePage, setActivePage] = React.useState("forside");

    return (
        <nav id='menu' className='flex flex-row justify-around text-xs font-medium pt-4 pb-7 px-2 mt-6 shadow-t-md bg-white'>
            <a href="#" className={`flex flex-col basis-64 align-center text-center items-center ${activePage != "forside" ? 'text-gray-500' : "text-black"}`}>
                {
                    activePage != "forside" ?
                        <HiOutlineHome size={28} />
                        : <HiHome size={28} />
                }
                Forside
            </a>
            <a href="#" className={`flex flex-col basis-64 align-center text-center items-center ${activePage != "aktiviteter" ? 'text-gray-500' : "text-black"}`}>
                {
                    activePage != "aktiviteter" ?
                        <TbReceipt size={28} />
                        : <TbReceiptFilled size={28} />
                }
                Aktiviteter
            </a>
            <a href="#" className={`flex flex-col basis-64 align-center text-center items-center ${activePage != "firma" ? 'text-gray-500' : "text-black"}`}>
                {
                    activePage != "firma" ?
                        <TbBriefcase2 size={28} />
                        : <TbBriefcase2Filled size={28} />
                }
                Firma
            </a>
            <a href="#" className={`flex flex-col basis-64 align-center text-center items-center ${activePage != "konto" ? 'text-gray-500' : "text-black"}`}>
                {
                    activePage != "konto" ?
                        <FaRegUser size={28} />
                        : <FaUser size={28} />
                }
                Konto
            </a>
        </nav>
    );
};

export default Menu;