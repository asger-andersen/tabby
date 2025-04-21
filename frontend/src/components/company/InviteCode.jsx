import React from 'react';
import { FaUserPlus } from "react-icons/fa6";
import Skeleton from '../skeleton/Skeleton'


const InviteCode = ({ companyData }) => {
    return (
        <div className="flex flex-col rounded-2xl shadow-e-lg px-6 py-4 gap-2">
            <h2 className="font-bold text-base text-left">
                Firmaets invitationskode
            </h2>
            <div className="relative bg-black/10 rounded-xl px-5 py-2">
                <div className="absolute left-5 top-1/2 -translate-y-1/2">
                    <FaUserPlus className="text-lg" />
                </div>
                <p className="text-center font-semibold text-lg tracking-[0.3em]">
                    {companyData ?
                        (
                            companyData?.company_invite_code
                        ) : (
                            <div className='opacity-0'>
                                <Skeleton width={"75%"} height={"28px"} radius={"0.5rem"} count={1} />
                            </div>
                        )
                    }
                </p>
            </div>
        </div>
    );
};

export default InviteCode;