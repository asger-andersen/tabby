import React from 'react';
import Skeleton from '../skeleton/Skeleton'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


const LatestActivities = ({ salesData }) => {

    return (
        <div id='latestActivities' className='max-w-[calc(100vw_-_3.5rem)] row-span-6 flex flex-col justify-between text-left rounded-2xl shadow-e-lg px-6 py-4 gap-2'>
            <div className='flex justify-between'>
                <h2 className='font-bold text-base text-left items-center align-middle'>
                    Dine seneste aktiviteter
                </h2>
                <a href="#" className='font-light text-[0.65rem] flex items-center'>
                    Se mere
                </a>
            </div>
            <table className="w-full">
                <tbody className='max-w-[calc(100vw_-_6.5rem)]'>
                    {salesData ?
                        (salesData?.receipts.map((item, index) => (
                            <>
                                {index < 3 && (
                                    <>
                                        {index !== 0 && (
                                            <tr key={"hr_" + index}>
                                                <td colSpan="3" className="py-2">
                                                    <hr className="border-t border-gray-300 w-full" />
                                                </td>
                                            </tr>
                                        )}
                                        <tr key={"activity" + index} className='max-w-[calc(100vw_-_6.5rem)]'>
                                            <td>
                                                <p className="text-3xl">
                                                    <IoMdCheckmarkCircleOutline />
                                                </p>
                                            </td>
                                            <td className='pr-3 w-full'>
                                                <div className="flex flex-col">
                                                    <p className="truncate font-semibold text-s text-left w-full max-w-[calc(100vw_-_14rem)] overflow-hidden text-ellipsis">
                                                        {item.customer_mail}
                                                    </p>
                                                    <p className="font-light text-[0.65rem] text-left">
                                                        Sendt d. {new Date(item?.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="font-medium text-sm text-right whitespace-nowrap">
                                                {((item?.items?.reduce((sum, item) => sum + item.product.product_price * item.product_amount, 0)) / 100).toFixed(2).replace(".", ",")} DKK
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </>
                        )))
                        : (
                            <Skeleton width={"100%"} height={"37px"} radius={"0.5rem"} count={3} direction={"col"} gap={3} />
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default LatestActivities;