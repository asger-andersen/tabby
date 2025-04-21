import React from 'react';
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import ClipLoader from "react-spinners/ClipLoader";
import '../../index.css';
import { toast } from 'sonner'


const AddCategory = ({ showAddCategory, setShowAddCategory }) => {

    const [categoryInformation, setCategoryInformation] = React.useState({ category_name: "" })
    const [loading, setLoading] = React.useState(false)

    const createCategory = async () => {
        const baseURL = process.env.REACT_APP_BASE_URL
        const token = localStorage.getItem('jwt');
        setLoading(true)

        // Make API call
        const response = await fetch(`${baseURL}/api/category/create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryInformation)
        })

        // Check if the category was created, and provide feedback accordingly
        if (response.status === 201) {
            setLoading(false)
            setShowAddCategory(false)
            toast.success("Kategori oprettet")
        } else {
            setLoading(false)
            toast.error("Kunne ikke oprette kategori...")
        }
    }

    return (
        <div className={`h-full max-w-full grid grid-rows-10 popup-animation ${setShowAddCategory ? 'popup-animation-open' : ''}`}>
            <div className='row-span-2 backdrop-blur-sm' onClick={() => {
                setShowAddCategory(false)
            }}>
            </div>
            <div className='max-h-full max-w-full row-span-8 px-10 pt-8 pb-24 bg-white shadow-t-xl rounded-3xl'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between'>
                        <></>
                        <button
                            className='p-2 text-lg'
                            onClick={() => {
                                setShowAddCategory(false)
                            }}
                        >
                            <IoClose />
                        </button>
                    </div>
                    <h2 className='font-black text-2xl text-left'>
                        Opret kategori
                    </h2>
                </div>
                <div className='w-full h-full flex flex-col justify-between'>
                    <div className='text-left w-full h-full'>
                        <form
                            className='w-full flex flex-col gap-10 pt-10'
                            action="submit"
                            onSubmit={(e) => {
                                e.preventDefault();
                                toast.promise(createCategory, {
                                    loading: 'Opretter kategori...',
                                    success: 'Kategori oprettet!',
                                    error: 'Kunne ikke oprette kategori...',
                                });
                            }}
                        >
                            <div id='inputs' className='flex flex-col gap-2'>
                                <div className='flex flex-col text-left'>
                                    <label
                                        htmlFor=""
                                        className='text-xs mb-0.5'>
                                        Kategorinavn
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder='e.g. Skærebrædder'
                                        required
                                        className='border-black border px-5 py-3 rounded-lg text-sm font-light'
                                        onChange={(e) => {
                                            setCategoryInformation({ category_name: e.target.value });
                                        }}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className='border-black border px-5 py-3 rounded-lg text-sm font-medium w-full bg-black text-white align-center justify-center'>
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
                                            <FaCheck /> Tilføj kategori
                                        </>
                                    )}
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;