import React from 'react';

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
    const iconSize = 23

    return (
        <nav id='menu' className='flex flex-row justify-around text-[0.65rem] font-medium pt-4 pb-8 px-5 mt-6 shadow-t-md bg-white'>
            <a href="#" className={`flex flex-col basis-64 align-center text-center items-center ${activePage != "forside" ? 'text-gray-500' : "text-black"}`}>
                {
                    activePage != "forside" ?
                        <HiOutlineHome size={iconSize} />
                        : <HiHome size={iconSize} />
                }
                Forside
            </a>
            <a href="#" className={`flex flex-col basis-64 align-center text-center items-center ${activePage != "aktiviteter" ? 'text-gray-500' : "text-black"}`}>
                {
                    activePage != "aktiviteter" ?
                        <TbReceipt size={iconSize} />
                        : <TbReceiptFilled size={iconSize} />
                }
                Aktiviteter
            </a>
            <a href="#" className={`flex flex-col basis-64 align-center text-center items-center ${activePage != "firma" ? 'text-gray-500' : "text-black"}`}>
                {
                    activePage != "firma" ?
                        <TbBriefcase2 size={iconSize} />
                        : <TbBriefcase2Filled size={iconSize} />
                }
                Firma
            </a>
            <a href="#" className={`flex flex-col basis-64 align-center text-center items-center ${activePage != "konto" ? 'text-gray-500' : "text-black"}`}>
                {
                    activePage != "konto" ?
                        <FaRegUser size={iconSize} />
                        : <FaUser size={iconSize} />
                }
                Konto
            </a>
        </nav>
    );
};

export default Menu;