'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const param = useSearchParams();
  const imgUrl = param.get('imgUrl')

  const [status, setStatus] = useState('idle'); // Track download status (idle, loading, success, error)
  const [isDownloaded, setIsDownloaded] = useState(false); // Prevent multiple downloads

  // Function to handle the image-to-PDF download
  const handleDownload = async (fileUrl) => {
    console.log('Download started for:', fileUrl);
    setStatus('loading');
    try {
      // Make a request to the backend to convert the image to base64
      const response = await fetch(`https://cyber-security-backend-zysoftec.vercel.app/convert-to-base64?url=${encodeURIComponent(fileUrl)}`);
      const data = await response.json();

      if (data.base64) {
        // Create a PDF with the image
        const pdf = new jsPDF();
        pdf.addImage(data.base64, 'PNG', 10, 10, 180, 160); // Adjust format as needed

        // Trigger the PDF download
        pdf.save('download.pdf');

        // After successful download, update the state
        setStatus('success');
        setIsDownloaded(true);
      } else {
        // If no base64 data found
        setStatus('error');
      }
    } catch (error) {
      console.error('Error downloading or converting the file:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Download Your Image as PDF</h1>

        {/* Show download button if idle */}
        {status === 'idle' && (
          <button
            onClick={() => handleDownload(imgUrl)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Start Download
          </button>
        )}

        {/* Show loading, success, or error message */}
        {status === 'loading' && (
          <div>
            <p className="text-lg text-gray-500">Your download is starting...</p>
            <div className="mt-4 text-blue-600">Please wait while we process your file.</div>
          </div>
        )}

        {status === 'success' && (
          <div>
            <p className="text-lg text-green-500">Download successful!</p>
            <div className="mt-4 text-gray-500">Your file has been saved as a PDF.</div>
          </div>
        )}

        {status === 'error' && (
          <div>
            <p className="text-lg text-red-500">Oops! Something went wrong.</p>
            <div className="mt-4 text-gray-500">We couldn&apos;t process the file. Please try again later.</div>
          </div>
        )}

        {/* Disable button after download */}
        {isDownloaded && (
          <div className="mt-4">
            <button className="bg-gray-500 text-white py-2 px-4 rounded-lg" disabled>
              Downloaded
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
