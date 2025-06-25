'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'; // Import the new hooks
import { RiCloseLargeLine } from 'react-icons/ri';
import fb from '@/public/assets/icons/fbshare.svg';
import x from '@/public/assets/icons/xshare.svg';
import tele from '@/public/assets/icons/teleshare.svg';
import insta from '@/public/assets/icons/instashare.svg';
import link from '@/public/assets/icons/linkshare.svg';
import linkedin from '@/public/assets/icons/linkedin.svg';
import Image from 'next/image';
import { countResourceShares, indiviualResource } from '@/services/api';
import { ExtractParagraphs } from '@/utils/blogElements';

const ShareModel = ({ onClose, updateData }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [shareUrl, setShareUrl] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [resourcesId, setResourcesId] = useState();
    const [data, setData] = useState();
    // console.log(data);

    const handleShare = async (platform) => {
        const url = window.location.href;
        const title = data?.title || 'Default Title';
        const text = data?.blog ? ExtractParagraphs(data.blog) : 'Check out this post!';

        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                break;
            case 'instagram':
                alert("Instagram doesn't support direct web-based sharing.");
                return;
            default:
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank');

            // Call API to count share
            try {
                await countResourceShares(resourcesId);
                console.log('Share counted successfully');
                updateData();
            } catch (error) {
                console.error('Error counting share:', error.message);
            }
        }
    };


    useEffect(() => {
        const fetchResource = async (id) => {
            try {
                const res = await indiviualResource(id);
                setData(res.resource);
            } catch (err) {
                console.error(err);
            }
        };

        if (pathname && searchParams) {
            const currentParams = new URLSearchParams(searchParams.toString()); // Create a copy of the search params

            // Check if 'shareId' is in the current URL parameters
            if (currentParams.has('shareId')) {
                const shareId = currentParams.get('shareId');
                setResourcesId(shareId);

                // Replace 'shareId' with 'actionId', but leave other params (like 'view=share') intact
                currentParams.delete('shareId'); // Remove 'shareId'
                currentParams.set('actionId', shareId); // Set 'actionId' to the same value
            }

            // Check if 'view' is in the URL parameters and change its value from 'share' to 'shared'
            if (currentParams.has('view') && currentParams.get('view') === 'share') {
                currentParams.set('view', 'shared'); // Change 'view' value to 'shared'
            }

            // Update the URL with the modified parameters
            const updatedUrl = `${window.location.origin}${pathname}?${currentParams.toString()}`;
            setShareUrl(updatedUrl); // Set the modified URL in the state

            // If 'view=shared' or 'actionId' is present, fetch resource
            if (currentParams.has('view') && currentParams.get('view') === 'shared' && currentParams.has('actionId')) {
                fetchResource(currentParams.get('actionId'));
            }
        }
    }, [pathname, searchParams]);



    // Function to handle URL copying
    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl).then(async () => {
            setIsCopied(true); // Set copied state to true

            // Call the API to count the share
            try {
                await countResourceShares(resourcesId); // Call the API to count the share, assuming resourceId is passed in as a prop
                console.log('Share counted successfully');
                updateData();
            } catch (error) {
                console.error('Error counting share:', error.message);
            }

            // Hide "Copied" message after 3 seconds
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        });
    };

    const Social = [
        { img: fb, src: '#', label: 'Facebook', onClick: () => handleShare('facebook') },
        { img: x, label: 'Twitter', onClick: () => handleShare('twitter') },
        { img: tele, label: 'Telegram', onClick: () => handleShare('telegram') },
        { img: linkedin, label: 'LinkedIn', onClick: () => handleShare('linkedin') },
        { img: link, label: 'Copy', onClick: handleCopy },
    ];

    return (
        <div className='bg-white rounded-2xl sm:p-5 p-2'>
            <div className='flex justify-between w-full items-center'>
                <h1 className='text-[#3D5A80] font-semibold'>Share with</h1>
                <RiCloseLargeLine onClick={onClose} className='text-[#3D5A8080] hover:text-orangeMain text-lg cursor-pointer' />
            </div>
            <div className='sm:flex grid grid-cols-3 items-center sm:gap-3 gap-2 w-full justify-between flex-wrap sn:mt-8 mt-5 mb-3'>
                {Social.map((e, i) => (
                    <div key={i} className='flex group cursor-pointer items-center flex-col gap-3' onClick={e.onClick}>
                        <div className='sm"p-5 p-3 rounded-full bg-[#9D9D9D0A] group-hover:bg-[#EE6C4D14]'>
                            <Image alt='' src={e.img} className='' />
                        </div>
                        <p className='text-sm text-[#3D5A80] group-hover:text-orangeMain'>{e.label}</p>
                    </div>
                ))}
            </div>
            {isCopied && (
                <p className='text-green-500 text-center text-xs mt-1'>Copied</p>
            )}
        </div>
    );
};

export default ShareModel;
