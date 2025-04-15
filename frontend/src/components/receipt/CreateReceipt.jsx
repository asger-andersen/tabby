import React from 'react';
import { IoClose } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import '../../index.css';

import ChooseItems from './ChooseItems'
import ChoosePayment from './ChoosePayment'
import ChooseEmail from './ChooseEmail'


const CreateReceipt = ({ showCreateReceipt, setShowCreateReceipt }) => {

    const [selectedItems, setSelectedItems] = React.useState([]);
    const [paymentMethod, setPaymentMethod] = React.useState(2);
    const [customerEmail, setCustomerEmail] = React.useState();

    const [productInformation, setProductInformation] = React.useState();

    const [activePage, setActivePage] = React.useState({ page: "choose_items", page_title: "Vælg varer" })

    const baseUrl = process.env.REACT_APP_BASE_URL

    // On page load, fetch product information
    React.useEffect(() => {
        fetchProductInformation();
    }, []);

    // Fetch all product information that's passed into the UI
    const fetchProductInformation = async () => {
        // Make API call
        const productInformation = await fetch(`${baseUrl}/api/product/getinformation`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        const response = await productInformation.json()

        // Store product information in state if status is 200
        if (productInformation.status === 200) {
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
                                activePage.page === "choose_payment" ? (
                                    setActivePage({ page: "choose_items", page_title: "Vælg varer" })
                                ) : (
                                    setActivePage({ page: "choose_payment", page_title: "Vælg betaling" })
                                )
                            }}
                        >
                            {activePage.page === "choose_payment" || activePage.page === "choose_email" ? <IoChevronBack /> : ""}
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
                        {activePage.page_title}
                    </h2>
                </div>
                <div className='text-left w-full h-full'>
                    {
                        activePage.page === "choose_items" ? (
                            <ChooseItems productInformation={productInformation} selectedItems={selectedItems} setSelectedItems={setSelectedItems} setActivePage={setActivePage} />
                        ) : activePage.page === "choose_payment" ? (
                            <ChoosePayment productInformation={productInformation} setPaymentMethod={setPaymentMethod} setActivePage={setActivePage} />
                        ) : activePage.page === "choose_email" ? (
                            <ChooseEmail customerEmail={customerEmail} setCustomerEmail={setCustomerEmail} selectedItems={selectedItems} paymentMethod={paymentMethod} setShowCreateReceipt={setShowCreateReceipt} />
                        ) : null
                    }
                </div>
            </div>
        </div>
    );
};

export default CreateReceipt;