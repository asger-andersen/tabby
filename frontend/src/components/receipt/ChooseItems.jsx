import React from 'react';
import { FaCheck } from "react-icons/fa6";
import Skeleton from '../skeleton/Skeleton'


const ChooseItems = ({ productInformation, selectedItems, setSelectedItems, setActiveStep }) => {

    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [searchString, setSearchString] = React.useState(null);

    const onlyProductPrice = ((selectedItems
        ?.filter((item) => item?.product_amount)
        .reduce((sum, item) => sum + item?.product_price * item?.product_amount, 0)) / 100);

    const toggleItem = (item) => {
        setSelectedItems((prev) =>
            prev.some((i) => i.product_id === item.product_id)
                ? prev.filter((i) => i.product_id !== item.product_id)
                : [...prev, { ...item, product_amount: 1 }]
        );
    };

    const filteredProducts = () => {

        if (searchString) {
            const filterBySearch = productInformation?.products.filter((product) =>
                product.product_name.toLowerCase().includes(searchString?.toLowerCase())
            );
            return filterBySearch
        } else if (selectedCategory) {
            const filterByCategory = productInformation?.products.filter((product) =>
                product.category_id === selectedCategory);
            return filterByCategory
        } else {
            return productInformation?.products
        }
    }

    return (
        <div className='w-full h-full'>
            <div id='product_filtering' className='flex flex-col gap-2'>
                <input
                    type="search"
                    className='px-5 py-3 mt-3 rounded-lg text-sm font-light w-full border align-center justify-center'
                    placeholder='Søg'
                    onChange={(e) => {
                        setSelectedCategory(null)
                        setSearchString(e.target.value)
                    }}
                />
                <div className="max-w-[calc(100vw_-_5rem)]">
                    <ul className='overflow-x-auto hide-scrollbar flex flex-row gap-1'>
                        {productInformation ?
                            (productInformation?.categories.map((category) => (
                                <>
                                    <li
                                        key={category.category_id}
                                        className={`p-1 px-3 font-light text-[0.65rem] border border rounded-md ${selectedCategory === category.category_id ? "bg-black/10" : ""}`}
                                        onClick={() => {
                                            if (selectedCategory === category.category_id) {
                                                setSelectedCategory(null)
                                            } else {
                                                setSearchString(null);
                                                setSelectedCategory(category.category_id);
                                            }
                                        }}>
                                        {category.category_name}
                                    </li>
                                </>
                            )))
                            : <Skeleton width={"75px"} height={"25px"} radius={"0.5rem"} count={7} direction={"row"} gap={1} />
                        }
                    </ul>
                </div>
                <hr />
            </div>
            <div className='py-2'>
                <ul className='overflow-y-auto hide-scrollbar flex flex-col gap-1 max-w-[calc(100vw_-_5rem)] h-[28vh]'>
                    {productInformation ?
                        (filteredProducts()?.map((product) => (
                            <>
                                <li
                                    key={product.product_id}
                                    className={`py-3 px-4 text-xs border border rounded-lg flex flex-row justify-between gap-3 items-center ${selectedItems.some((item) => item.product_id === product.product_id) ? 'bg-black/10' : ''}`}
                                    onClick={() => {
                                        toggleItem(product)
                                    }}>
                                    <p className='font-medium truncate'>
                                        {product.product_name}
                                    </p>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <p className='font-normal whitespace-nowrap'>
                                            {(product.product_price / 100).toFixed(2).replace(".", ",")} {product.currency}
                                        </p>
                                        {
                                            selectedItems.some((item) => item.product_id === product.product_id) &&
                                            <input
                                                type="number"
                                                value={selectedItems.find((item) => item.product_id === product.product_id).product_amount}
                                                className='p-0.1 px-2 w-[2rem] font-light text-[0.5rem] border border rounded-md'
                                                placeholder='Stk.'
                                                onClick={(e) => e.stopPropagation()}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value);
                                                    setSelectedItems((prev) =>
                                                        prev.map((i) =>
                                                            i.product_id === product.product_id
                                                                ? { ...i, product_amount: value }
                                                                : i
                                                        )
                                                    );
                                                }}
                                            />
                                        }
                                    </div>
                                </li>
                            </>
                        )))
                        : <Skeleton width={"100%"} height={"42px"} radius={"0.5rem"} count={6} direction={"col"} gap={1} />
                    }
                </ul>
            </div>
            <div className='flex flex-col gap-1'>
                <hr />
                <div className='flex flex-row justify-between pt-2 text-xs font-normal'>
                    <p>
                        Pris:
                    </p>
                    <p>
                        {onlyProductPrice
                            .toFixed(2)
                            .replace(".", ",")} DKK
                    </p>
                </div>
                <div className='flex flex-row justify-between text-xs font-normal'>
                    <p>
                        Moms: {
                            productInformation?.company[0].vat_registration ?
                                '(25%)'
                                : '(0%)'
                        }
                    </p>
                    <p>
                        {(onlyProductPrice * (productInformation?.company[0].vat_registration ? 0.25 : 0))
                            .toFixed(2)
                            .replace(".", ",")} DKK
                    </p>
                </div>
                <div className='flex flex-row justify-between text-xs font-semibold'>
                    <p>
                        Pris i alt:
                    </p>
                    <p>
                        {(onlyProductPrice * (productInformation?.company[0].vat_registration ? 1.25 : 1))
                            .toFixed(2)
                            .replace(".", ",")} DKK
                    </p>
                </div>
            </div>
            <button
                className='border-black border px-5 py-3 mt-6 rounded-lg text-sm font-medium w-full bg-black text-white align-center justify-center'
                onClick={() => {
                    setActiveStep({ page: "choose_payment", page_title: "Vælg betaling" })
                }}
            >
                <div className='flex flex-row gap-5 items-center justify-center'>
                    <FaCheck /> Vælg {selectedItems.length} varer
                </div>
            </button>
        </div>
    );
};

export default ChooseItems;