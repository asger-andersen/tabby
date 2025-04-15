import React from 'react';
import { Toaster, toast } from 'sonner'
import { RiMailSendLine } from "react-icons/ri";
import ClipLoader from "react-spinners/ClipLoader";


const ChooseEmail = ({ customerEmail, setCustomerEmail, selectedItems, paymentMethod, setShowCreateReceipt }) => {

    const [loading, setLoading] = React.useState(false)

    const baseURL = process.env.REACT_APP_BASE_URL

    // Function for creating receipt
    const createReceipt = async () => {
        console.log({
            customer_mail: customerEmail,
            payment_method_id: paymentMethod,
            product_info: selectedItems
        })

        // Make API call
        const receipt = await fetch(`${baseURL}/api/receipt/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer_mail: customerEmail,
                payment_method_id: paymentMethod,
                product_info: selectedItems.map((item) => ({
                    product_id: item.product_id,
                    product_amount: item.product_amount
                }))
            }),
            credentials: 'include',
        })

        // Check if the receipt was generated, and provide feedback accordingly
        if (receipt.status === 202) {
            setLoading(false)
            setShowCreateReceipt(false)
            toast.success("Kvittering sendt!")
        } else {
            setLoading(false)
            toast.error("Kunne ikke sende kvittering...")
        }
    };

    return (
        <div className='w-full h-full flex flex-col justify-between'>
            <div className='mt-3'>
                <div className='flex flex-col text-left'>
                    <label
                        htmlFor=""
                        className='text-xs mb-0.5'>
                        E-mail
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder='alfred@email.dk'
                        required
                        className='border-black border px-5 py-3 rounded-lg text-sm font-light'
                        onChange={(e) => {
                            setCustomerEmail(e.target.value);
                        }}
                    />
                </div>
                <p className='text-xs font-light mt-5'>
                    Note: Kvitteringen sendes til den indtastede e-mail. <br />Dobbelttjek venligst at e-mailen er stavet korrekt.
                </p>
            </div>
            <button
                className='border-black border px-5 py-3 mb-14 rounded-lg text-sm font-medium w-full bg-black text-white align-center justify-center'
                onClick={() => {
                    if (!customerEmail || !customerEmail?.includes("@")) {
                        toast.error("Indtast venligst en gyldig email!")
                    } else {
                        setLoading(true)
                        createReceipt()
                    }
                }}
            >
                <div className='flex flex-row gap-5 items-center justify-center'>
                    {loading ? (
                        <ClipLoader
                            color="#ffffff"
                            loading={loading}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    ) : (
                        <>
                            <RiMailSendLine /> Send kvittering
                        </>
                    )}
                </div>
            </button>
        </div>
    );
};

export default ChooseEmail;