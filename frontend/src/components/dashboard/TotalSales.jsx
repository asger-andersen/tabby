import React from 'react';
import { GrMoney } from "react-icons/gr";
import Skeleton from '../skeleton/Skeleton'

const TotalSales = ({ salesData }) => {

    // Calculate all time sales value by summing the value of all receipts
    const totalSales = ((salesData?.receipts?.reduce(
        (totalSales, receipt) =>
            totalSales +
            receipt.items.reduce(
                (receiptTotal, productItem) =>
                    receiptTotal + productItem.product.product_price * productItem.product_amount,
                0
            ),
        0
    )) / 100).toFixed(2).replace(".", ",")


    // Calculate weekly sales value by summing the value of receipts from the past 7 days
    const lastWeekSales = () => {
        // Define how far back the receipts should go
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

        // Filter receipts based on date
        const filteredReceipts = salesData?.receipts?.filter((receipt) => new Date(receipt.created_at) >= sevenDaysAgo)

        // Calculate sum of filtered receipts
        const sumOfReceipts = (filteredReceipts?.reduce(
            (totalSales, receipt) =>
                totalSales +
                receipt.items.reduce(
                    (receiptTotal, productItem) =>
                        receiptTotal + productItem.product.product_price * productItem.product_amount,
                    0
                ),
            0
        ) / 100).toFixed(2).replace(".", ",")

        return sumOfReceipts
    }

    return (
        <div id='totalSales' className='max-w-full row-span-4 flex flex-col justify-between text-left rounded-2xl shadow-e-lg px-6 py-4 gap-2'>
            <div>
                <h2 className='font-bold text-base text-left'>
                    Dit salg
                </h2>
            </div>
            <div className='flex justify-between'>
                <div className='flex flex-col text-left'>
                    <p className='font-light text-[0.65rem] text-left'>
                        Denne uge
                    </p>
                    <div className='flex justify-row items-center font-semibold text-base gap-2'>
                        <GrMoney />
                        {salesData ?
                            <p>
                                {lastWeekSales()} DKK
                            </p>
                            : <Skeleton width={110} height={24} radius={`0.5rem`} count={1} />

                        }
                    </div>
                </div>
                <div className='flex flex-col text-left'>
                    <p className='font-light text-[0.65rem] text-left'>
                        Altid
                    </p>
                    <div className='flex justify-row items-center font-semibold text-base gap-2'>
                        <GrMoney />
                        {salesData ?
                            <p>
                                {totalSales} DKK
                            </p>
                            : <Skeleton width={110} height={24} radius={`0.5rem`} count={1} />

                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalSales;