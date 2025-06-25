import { InviteTableData } from '@/data'
import React from 'react'

const SentInvites = () => {
    return (
        <div>
            <div className='my-8'>
                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-xl  p-2">
                        <thead className="bg-[#FDFDFD]">
                            <tr className='bg-[#FDFDFD] rounded-lg  text-[#202224]'>

                                <th className="p-4 font-medium text-start sm:text-base text-sm whitespace-nowrap">Name</th>
                                <th className="p-4 font-medium text-start sm:text-base text-sm whitespace-nowrap">Email Address</th>
                                <th className="p-4 font-medium text-start sm:text-base text-sm whitespace-nowrap">Invited</th>
                                <th className="p-4 font-medium  text-center pl-14 sm:text-base text-sm whitespace-nowrap">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {InviteTableData.map((e, i) => (
                                <tr key={i} className={`border-b border-bordered`}>

                                    <td className="px-4 sm:pr-4 pr-6 py-2 whitespace-nowrap sm:text-base text-sm gap-2">
                                        {e.name}
                                    </td>
                                    <td className="px-4 sm:pr-4 pr-6 py-2 whitespace-nowrap sm:text-base text-sm gap-2">
                                        {e.email}
                                    </td>
                                    <td className="px-4 sm:pr-4 pr-6 py-2 whitespace-nowrap sm:text-base text-sm gap-2">
                                        {e.invited}
                                    </td>
                                    <td className="px-4 sm:pr-4 pr-6 py-2 whitespace-nowrap sm:text-base text-sm text-start flex justify-end">
                                        <div className='bg-purple px-5 py-2 w-fit text-white rounded-lg'>
                                            {e.status}
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default SentInvites
