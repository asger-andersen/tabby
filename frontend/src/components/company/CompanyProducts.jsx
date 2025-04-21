import React from 'react';
import Skeleton from '../skeleton/Skeleton'
import { TbEdit } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";


const CompanyProducts = ({ productData, categoryData, setShowAddProduct }) => {
    const [selectedCategory, setSelectedCategory] = React.useState(0)

    const filteredProducts = () => {
        if (selectedCategory != 0) {
            const sortByCategory = productData.filter((product) =>
                product.category_id == selectedCategory);
            return sortByCategory
        } else {
            return productData
        }
    };

    return (
        <div id='latestActivities' className='max-w-[calc(100vw_-_3.5rem)] row-span-6 flex flex-col justify-between text-left rounded-2xl shadow-e-lg px-6 py-4 gap-2'>
            <div className='flex justify-between'>
                <h2 className='font-bold text-base text-left items-center align-middle'>
                    Produkter
                </h2>
                <select
                    name="categorySelection"
                    id="categorySelection"
                    className='p-1 px-3 font-light text-[0.65rem] border border rounded-md bg-black/10'
                    onChange={(e) => {
                        setSelectedCategory(e.target.value)
                    }}
                >
                    <option value="0">Alle</option>
                    {
                        categoryData?.map((category) => (
                            <>
                                <option value={category.category_id}>{category.category_name}</option>
                            </>
                        ))
                    }
                </select>
            </div>
            <div className='max-h-[8.5rem] min-h-[8.5rem] overflow-y-auto hide-scrollbar'>
                <table className="w-full">
                    <thead className='sticky top-0 bg-white'>
                        <tr className="text-[0.65rem] font-bold">
                            <th scope="col" className="text-left">Navn</th>
                            <th scope="col" className="text-left">Kategori</th>
                            <th scope="col" className="text-right pr-2">Pris</th>
                            <th scope="col" className="text-right">Tilpas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData ?
                            (filteredProducts()?.map((item, index) => (
                                <>
                                    {index > 0 && (
                                        <tr key={"hr_" + index}>
                                            <td colSpan="4" className="py-2">
                                                <hr className="border-t border-gray-300 w-full" />
                                            </td>
                                        </tr>
                                    )}
                                    <tr key={"activity" + index} className='text-s'>
                                        <td className="pr-2">
                                            <p className="truncate font-medium text-left max-w-[calc(100vw-18rem)]">
                                                {item.product_name}
                                            </p>
                                        </td>
                                        <td className="pr-2 w-full">
                                            <p className="truncate font-normal text-left w-full">
                                                {item.category_id}
                                            </p>
                                        </td>
                                        <td className="pr-2 text-right whitespace-nowrap">
                                            <p className="truncate font-normal text-right w-full">
                                                {(item.product_price / 100).toFixed(2).replace(".", ",")} DKK
                                            </p>
                                        </td>
                                        <td className="text-black/75 justify-items-end">
                                            <TbEdit size={20} />
                                        </td>
                                    </tr>
                                </>
                            )))
                            : (
                                <tr>
                                    <td colSpan={4}>
                                        <Skeleton width={"100%"} height={"37px"} radius={"0.5rem"} count={3} direction={"col"} gap={3} />
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <button
                className='px-5 py-2 rounded-lg text-sm font-medium w-full bg-black text-white align-center justify-center hover:bg-black/75'
                onClick={() => {
                    setShowAddProduct(true)
                }}>
                <div className='flex flex-row gap-5 items-center justify-center'>
                    <FaPlus /> Opret produkt
                </div>
            </button>
        </div>
    );
};

export default CompanyProducts;