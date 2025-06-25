import React from 'react';

const ShareSecretBoxes = ({ secretData, activeFilter, setActiveFilter }) => {
    const totalSecrets = secretData.length;
    const newSecrets = secretData.filter(secret => secret.status === 'new').length;
    const viewedSecrets = secretData.filter(secret => secret.status === 'viewed').length;
    const expiredSecrets = secretData.filter(secret => secret.status === 'expired').length;

    const data = [
        { name: 'Total Secrets', value: totalSecrets, filter: 'all' },
        { name: 'New Secrets', value: newSecrets, filter: 'new' },
        { name: 'Viewed Secrets', value: viewedSecrets, filter: 'viewed' },
        { name: 'Expired Secrets', value: expiredSecrets, filter: 'expired' },
    ];


    return (
        <div className=''>
            <div className='grid lg:grid-cols-4 grid-cols-2 sm:my-10 my-6 sm:gap-6 gap-4'>
                {data.map((e, i) => (
                    <div
                        key={i}
                        className={`text-gray border sm:text-base cursor-pointer text-sm hover:border-2 hover:border-[#CF9FFF]  rounded-xl py-4 flex w-full flex-col items-center gap-4 ${activeFilter === e.filter ? 'border-[#CF9FFF] border-2' : 'border-bordered'}`}
                        onClick={() => setActiveFilter(e.filter)}
                    >
                        <p className='font-medium'>{e.name}</p>
                        <p className='font-bold'>{e.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShareSecretBoxes;
