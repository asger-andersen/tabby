import React from 'react';

import { HiOutlineHome } from "react-icons/hi";
import { HiHome } from "react-icons/hi";

import { TbReceipt } from "react-icons/tb";
import { TbReceiptFilled } from "react-icons/tb";

import { TbBriefcase2 } from "react-icons/tb";
import { TbBriefcase2Filled } from "react-icons/tb";

import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";


const Menu = ({ activePage, setActivePage }) => {
    const iconSize = 23

    return (
        <nav id='menu' className='flex flex-row justify-around text-[0.65rem] font-medium pt-4 pb-8 px-5 mt-6 shadow-t-md bg-white'>
            <a
                className={`flex flex-col basis-64 align-center text-center items-center ${activePage != "dashboard" ? 'text-gray-500' : "text-black"}`}
                onClick={() => {
                    setActivePage("dashboard")
                }}>
                {
                    activePage != "dashboard" ?
                        <HiOutlineHome size={iconSize} />
                        : <HiHome size={iconSize} />
                }
                Forside
            </a>
            <a
                className={`flex flex-col basis-64 align-center text-center items-center ${activePage != "activities" ? 'text-gray-500' : "text-black"}`}
                onClick={() => {
                    setActivePage("activities")
                }}>
                {
                    activePage != "activities" ?
                        <TbReceipt size={iconSize} />
                        : <TbReceiptFilled size={iconSize} />
                }
                Aktiviteter
            </a>
            <a
                className={`flex flex-col basis-64 align-center text-center items-center ${activePage != "company" ? 'text-gray-500' : "text-black"}`}
                onClick={() => {
                    setActivePage("company")
                }}
            >
                {
                    activePage != "company" ?
                        <TbBriefcase2 size={iconSize} />
                        : <TbBriefcase2Filled size={iconSize} />
                }
                Firma
            </a>
            <a
                className={`flex flex-col basis-64 align-center text-center items-center ${activePage != "user" ? 'text-gray-500' : "text-black"}`}
                onClick={() => {
                    setActivePage("user")
                }}
            >
                {
                    activePage != "user" ?
                        <FaRegUser size={iconSize} />
                        : <FaUser size={iconSize} />
                }
                Konto
            </a>
        </nav>
    );
};

export default Menu;