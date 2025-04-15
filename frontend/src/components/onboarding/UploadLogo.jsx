import React from 'react';
import { Toaster, toast } from 'sonner'

const UploadButton = ({ givenData }) => {
  const [companyCreationData, setCompanyCreationData] = React.useState({ company_name: "", company_phone: "", company_email: "", company_webpage: "" });
  const [logoFile, setLogoFile] = React.useState(null);

  const uploadFile = async () => {
      
    // Check if file has been chosen
    if (!logoFile) {
        return toast.error("Please upload an SVG file before proceeding!")
    }

    // Store the file in FormData
    const formData = new FormData();
        formData.append("logo", logoFile);

        try {
            // Send the file to the backend
            const response = await fetch("http://localhost:5000/upload-logo", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            console.log("Upload response:", data);
        } catch (error) {
            console.error("Error uploading file:", error);
            return toast.error(error.message)
        }
  }

  return (
    <div className='text-left items-start flex flex-col gap-10'>
        <div className='w-full'>
            <h1 className='font-bold text-5xl'>
                Uploader
            </h1>
            <p>
                Upload an SVG file
            </p>
        </div>
        <div className='flex flex-col w-full'>
            <input type="file" accept="image/svg+xml" onChange={(e) => {
                console.log(e.target.files[0])
                setLogoFile(e.target.files[0])
            }} /> 
            <button 
                className='w-2/12 p-4 rounded-lg bg-black text-white'
                onClick={uploadFile}
            >
                Upload
            </button>
        </div>
    </div>
  );
};

export default UploadButton;