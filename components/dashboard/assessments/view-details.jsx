import React from 'react'
import SoloDetailsView from './solo-details-view'
import TeamDetailsView from './team-details-view'
import { getAssignment } from '@/services/assignment'

const ViewDetails = async ({ data, type }) => {

    let response;
    if (data?.assignmentId) {
        response = await getAssignment(data?.assignmentId)
    }

    return (
        <div>
            {
                type === 'SOLO' ?
                    <SoloDetailsView data={data} recoms={response} />
                    :
                    <TeamDetailsView data={data} />
            }
        </div>
    )
}

export default ViewDetails;
