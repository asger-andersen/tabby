import React from 'react';
import { Toaster, toast } from 'sonner'

import InviteCode from '../company/InviteCode'
import CompanyProducts from '../company/CompanyProducts'
import CompanyCategories from '../company/CompanyCategories'
import NoCompany from '../company/NoCompany'

import AddProduct from '../company/AddProduct'
import AddCategory from '../company/AddCategory'


const CompanyPage = () => {
    const [companyData, setCompanyData] = React.useState(null)
    const [showCreateCompany, setShowCreateCompany] = React.useState(false)

    const [showAddProduct, setShowAddProduct] = React.useState(false)
    const [showAddCategory, setShowAddCategory] = React.useState(false)

    // On page load, fetch user data - When product or category is created, fetch updated data
    React.useEffect(() => {
        fetchCompanyData();
    }, [showAddProduct, showAddCategory]);


    // Function for verifying user session
    const fetchCompanyData = async () => {
        const baseUrl = process.env.REACT_APP_BASE_URL
        const token = localStorage.getItem('jwt');

        // Make API call to backend to verify user session
        const getCompanyData = await fetch(`${baseUrl}/api/company/get`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        const response = await getCompanyData.json()

        // Prompt user to create a company if status is 403, Store company information in state if status is 200
        if (getCompanyData.status === 403) {
            setShowCreateCompany(true);
        } else if (getCompanyData.status === 200) {
            setCompanyData(response);
            console.log(response)
        } else {
            setCompanyData(null);
        }
    };

    return (
        <>
            {showAddProduct &&
                <div className='z-10 absolute inset-0 max-h-full max-w-screen'>
                    <AddProduct showAddProduct={showAddProduct} setShowAddProduct={setShowAddProduct} categoryData={companyData?.categories} />
                </div>
            }
            {showAddCategory &&
                <div className='z-10 absolute inset-0 max-h-full max-w-screen'>
                    <AddCategory showAddCategory={showAddCategory} setShowAddCategory={setShowAddCategory} />
                </div>
            }
            <div id='company' className='flex flex-col justify-between mt-20'>
                <Toaster />
                <div id='title' className='mx-7'>
                    <h1 className='font-black text-3xl text-left truncate'>
                        Firma {companyData && (
                            `- ${companyData?.company[0]?.company_name}`
                        )}
                    </h1>
                </div>
                <div className='flex flex-col justify-between flex-grow max-h-[calc(100vh_-_16rem)] mt-7'>
                    <div className='h-full overflow-y-auto'>
                        {showCreateCompany ? (
                            <div className='w-full h-full px-7'>
                                <NoCompany showCreateCompany={showCreateCompany} setShowCreateCompany={setShowCreateCompany} setCompanyData={setCompanyData} />
                            </div>
                        ) : (
                            <div id='hero' className='max-w-[calc(100vw_-_3.5rem)] grid grid-rows-20 gap-4 mx-7'>
                                <CompanyProducts productData={companyData?.products} categoryData={companyData?.categories} setShowAddProduct={setShowAddProduct} />
                                <CompanyCategories categoryData={companyData?.categories} setShowAddCategory={setShowAddCategory} />
                                <InviteCode companyData={companyData?.company[0]} />
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyPage;