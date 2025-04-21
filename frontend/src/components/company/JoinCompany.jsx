import React from 'react';
import { FaCheck } from "react-icons/fa6";
import { Toaster, toast } from 'sonner'


const JoinCompany = ({ setShowCreateCompany, setCompanyData }) => {
    const [inviteCode, setInviteCode] = React.useState(null)

    const initiateJoinCompany = async () => {
        const baseURL = process.env.REACT_APP_BASE_URL
        const token = localStorage.getItem('jwt');

        if (inviteCode.length < 6) {
            throw new Error("Invitationskoden er ugyldig");
        }

        // Call API to join company
        const joinCompany = await fetch(`${baseURL}/api/company/join`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                invite_code: inviteCode
            })
        })
        const response = await joinCompany.json()

        // Store user info in state if status is 201
        if (joinCompany.status === 201) {
            setCompanyData(response[0].company)
            setShowCreateCompany(false)
            return response[0]
        } else {
            setCompanyData(null)
            throw new Error("Kunne ikke tilmelde firma...");
        }
    }

    return (
        <div id="JoinCompany" className="flex flex-col flex-grow justify-between w-full h-full min-h-[calc(100vh-21.35rem)]">
            <div className='h-full'>
                <div className='flex flex-col text-left mt-3'>
                    <label
                        htmlFor="invite-code"
                        className='text-xs mb-0.5'>
                        Firmaets invitationskode
                    </label>
                    <input
                        type="number"
                        name="invitecode"
                        placeholder='e.g. 123456'
                        required
                        className='border-black border px-5 py-3 rounded-lg text-sm font-light'
                        onChange={(e) => {
                            setInviteCode(e.target.value);
                        }}
                    />
                </div>
                <p className='text-[0.65rem] text-left mt-3'>
                    Note: Invitationskoden findes ved at logge ind på jeres eksisterende konto, og gå til “Firma”. <br /> <br />
                    Har I endnu ikke oprettet en virksomhed, kan dette gøres ved at vælge "Opret firma" i menuen ovenfor.
                </p>
            </div>
            <button
                className='border-black border px-5 py-3 mt-6 rounded-lg text-sm font-medium w-full bg-black text-white align-center justify-center'
                onClick={() => {
                    toast.promise(initiateJoinCompany, {
                        loading: 'Tilknytter firma...',
                        success: (data) => {
                            console.log(data)
                            return `Tilknyttede ${data.company.company_name}`;
                        },
                        error: (err) => {
                            return err.message || 'Noget gik galt';
                        }
                    });
                }}
            >
                <div className='flex flex-row gap-5 items-center justify-center'>
                    <FaCheck /> Tilkyt firma
                </div>
            </button>
        </div>
    );
};

export default JoinCompany;