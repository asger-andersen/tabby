import React from 'react';
import { IoClose } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import '../../index.css';
import { toast } from 'sonner'

import ChooseItems from './ChooseItems'
import ChoosePayment from './ChoosePayment'
import ChooseEmail from './ChooseEmail'


const CreateReceipt = ({ showCreateReceipt, setShowCreateReceipt, setActivePage }) => {

    const [selectedItems, setSelectedItems] = React.useState([]);
    const [paymentMethod, setPaymentMethod] = React.useState(2);
    const [customerEmail, setCustomerEmail] = React.useState();

    const [productInformation, setProductInformation] = React.useState(null);

    const [activeStep, setActiveStep] = React.useState({ page: "choose_items", page_title: "Vælg varer" })

    // On page load, fetch product information
    React.useEffect(() => {
        fetchProductInformation();
    }, []);

    // Fetch all product information that's passed into the UI
    const fetchProductInformation = async () => {
        const baseUrl = process.env.REACT_APP_BASE_URL
        const token = localStorage.getItem('jwt');

        // Make API call
        const productInformation = await fetch(`${baseUrl}/api/company/get`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        const response = await productInformation.json()

        // Prompt user to create a company if status is 403, Store product information in state if status is 200
        if (productInformation.status === 403) {
            toast.error("Tilmeld virksomhed for at tilgå produkter")
            setShowCreateReceipt(false)
            setActivePage("company")
        } else if (productInformation.status === 200) {
            setProductInformation(response)
        } else {
            setProductInformation(null)
        }
    };

    return (
        <div className={`h-full max-w-full grid grid-rows-10 popup-animation ${showCreateReceipt ? 'popup-animation-open' : ''}`}>
            <div className='row-span-2 backdrop-blur-sm' onClick={() => {
                setShowCreateReceipt(false)
            }}>
            </div>
            <div className='max-h-full max-w-full row-span-8 px-10 pt-8 pb-24 bg-white shadow-t-xl rounded-3xl'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between'>
                        <button
                            className='p-2 text-lg'
                            onClick={() => {
                                activeStep.page === "choose_payment" ? (
                                    setActiveStep({ page: "choose_items", page_title: "Vælg varer" })
                                ) : (
                                    setActiveStep({ page: "choose_payment", page_title: "Vælg betaling" })
                                )
                            }}
                        >
                            {activeStep.page === "choose_payment" || activeStep.page === "choose_email" ? <IoChevronBack /> : ""}
                        </button>
                        <button
                            className='p-2 text-lg'
                            onClick={() => {
                                setShowCreateReceipt(false)
                            }}
                        >
                            <IoClose />
                        </button>
                    </div>
                    <h2 className='font-black text-2xl text-left'>
                        {activeStep.page_title}
                    </h2>
                </div>
                <div className='text-left w-full h-full'>
                    {
                        activeStep.page === "choose_items" ? (
                            <ChooseItems productInformation={productInformation} selectedItems={selectedItems} setSelectedItems={setSelectedItems} setActiveStep={setActiveStep} />
                        ) : activeStep.page === "choose_payment" ? (
                            <ChoosePayment productInformation={productInformation} setPaymentMethod={setPaymentMethod} setActiveStep={setActiveStep} />
                        ) : activeStep.page === "choose_email" ? (
                            <ChooseEmail customerEmail={customerEmail} setCustomerEmail={setCustomerEmail} selectedItems={selectedItems} paymentMethod={paymentMethod} setShowCreateReceipt={setShowCreateReceipt} />
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
};

export default CreateReceipt;