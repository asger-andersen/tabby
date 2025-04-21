import React from 'react';
import CompanyMenu from './CompanyMenu'
import JoinCompany from './JoinCompany'
import CreateCompany from './CreateCompany'


const NoCompany = ({ setShowCreateCompany, setCompanyData }) => {
    const [currentChoice, setCurrentChoice] = React.useState("join-company")

    return (
        <div className='w-full h-full'>
            <div>
                <CompanyMenu currentChoice={currentChoice} setCurrentChoice={setCurrentChoice} />
            </div>
            <h2 className='text-left font-bold text-xl mt-6'>
                {currentChoice === "join-company" ?
                    "Tilknyt firma"
                    : "Opret firma"
                }
            </h2>
            <div className='flex flex-grow'>
                {currentChoice === "join-company" ?
                    <JoinCompany setShowCreateCompany={setShowCreateCompany} setCompanyData={setCompanyData} />
                    : <CreateCompany />
                }
            </div>
        </div>
    );
};

export default NoCompany;