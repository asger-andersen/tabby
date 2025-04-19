import React from 'react';
import { FaCheck } from "react-icons/fa6";


const ChoosePayment = ({ productInformation, setPaymentMethod, setActiveStep }) => {

    return (
        <div className='w-full h-full flex flex-col justify-between'>
            <div className='flex flex-col text-left mt-3'>
                <label
                    htmlFor=""
                    className='text-xs mb-0.5'>
                    Betalingsmetode
                </label>
                <select
                    name="paymentMethods"
                    id="paymentMethods"
                    className='border-black border px-5 py-3 rounded-lg text-sm font-light'
                    onChange={(e) => {
                        console.log(e.target.value)
                        setPaymentMethod(e.target.value)
                    }}
                >
                    {productInformation?.payment_methods.map((payment_method) => (
                        <option value={payment_method.payment_method_id}>
                            {payment_method.payment_method_name}
                        </option>
                    ))}
                </select>
            </div>
            <button
                className='border-black border px-5 py-3 mb-14 rounded-lg text-sm font-medium w-full bg-black text-white align-center justify-center'
                onClick={() => {
                    setActiveStep({ page: "choose_email", page_title: "Indtast e-mail" })
                }}
            >
                <div className='flex flex-row gap-5 items-center justify-center'>
                    <FaCheck /> Videre
                </div>
            </button>
        </div>
    );
};

export default ChoosePayment;