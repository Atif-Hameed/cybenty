import { getSoloResult, getTeamResults } from '@/actions/game.action'
import ViewDetails from '@/components/dashboard/assessments/view-details';
import React from 'react'

const page = async ({ searchParams }) => {

    const { assignmentId, assessmentId, userId, type } = await searchParams;

    console.log("Ids    :" , assignmentId, assessmentId,)

    let response;
    if (type === 'TEAM') {
        response = await getTeamResults(assignmentId, assessmentId)
    } else {
        response = await getSoloResult(assignmentId, assessmentId)
    }

    const {data, error} = response;


    if (error) {

        console.log("Error : ", error)

        return (
            <h1>Something Went Wrong!</h1>
        )
    }

    return (
        <div>
            <ViewDetails data={data} type={type} />
        </div>
    )
}

export default page
