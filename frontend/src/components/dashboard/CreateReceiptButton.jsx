import React from 'react';
import { FaPlus } from "react-icons/fa6";

const CreateReceiptButton = ({ setShowCreateReceipt }) => {

    return (
        <button
            type="submit"
            className='px-5 py-3 rounded-lg text-sm font-medium w-full bg-black text-white align-center justify-center hover:bg-black/75'
            onClick={() => {
                setShowCreateReceipt(true)
            }}>
            <div className='flex flex-row gap-5 items-center justify-center'>
                <FaPlus /> Opret kvittering
            </div>
        </button>
    );
};

export default CreateReceiptButton;