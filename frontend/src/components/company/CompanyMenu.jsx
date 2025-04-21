import React from 'react';


const CompanyMenu = ({ currentChoice, setCurrentChoice }) => {
    return (
        <div id='companyMenu'>
            <ul className='inline-flex border border-[#1E1E1E] rounded-md gap-1 w-full'>
                <li
                    id='join-company'
                    className={`flex flex-grow text-[0.65rem] text-center px-3 py-1 m-1 mr-0 rounded select-none ${currentChoice === 'join-company' ? 'bg-opacity-10' : 'bg-opacity-0'} hover:bg-opacity-10 bg-[#1E1E1E]`}
                    onClick={() => {
                        setCurrentChoice("join-company")
                    }}
                >
                    <p className='w-full'>
                        Tilknyt firma
                    </p>
                </li>
                <li
                    id='create-company'
                    className={`flex flex-grow text-[0.65rem] text-center px-3 py-1 m-1 ml-0 rounded select-none ${currentChoice === 'create-company' ? 'bg-opacity-10' : 'bg-opacity-0'} hover:bg-opacity-10 bg-[#1E1E1E]`}
                    onClick={() => {
                        setCurrentChoice("create-company")
                    }}
                >
                    <p className='w-full'>
                        Opret firma
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default CompanyMenu;