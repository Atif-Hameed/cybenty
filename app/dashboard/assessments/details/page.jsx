import { getUserAllAssignments } from '@/actions/assessments.action';
import { getSoloResult, getTeamResults } from '@/actions/game.action'
import Details from '@/components/dashboard/assessments/details';
import React from 'react'

const page = async ({ searchParams }) => {

    const { assessmentId, userId } = await searchParams;


    const { data, error } = await getUserAllAssignments(userId, assessmentId)

    if (error) {

        console.log("Error : ", error)

        return (
            <div>
                <h1>Something Went Wrong!</h1>
                <h1>Error : {error}</h1>
            </div>
        )
    }

    return (
        <div>
            <Details data={data?.data} />
        </div>
    )
}

export default page
