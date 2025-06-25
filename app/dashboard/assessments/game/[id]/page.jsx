import { allAssessmentQuestion, getAssessmentById } from '@/actions/assessments.action';
import { getAllQuestions } from '@/actions/game.action';
import Game from '@/components/dashboard/assessments/game'
import { getAssignment } from '@/services/assignment';
import React from 'react'

const page = async ({ params, searchParams }) => {

    const { id } = await params;
    const { userId, type, email, assignmentId } = await searchParams;

    console.log("Target id", id)
    console.log("params : ", userId, type, email, assignmentId)

    const { data, error } = await getAllQuestions(userId, email, id, assignmentId);
    const { data: assessmentData, error: assessmentError } = await getAssessmentById(id);
    const assignmentData = await getAssignment(assignmentId);


    if (error || assessmentError ) {
        console.log("error", error || assessmentError)
        return (
            <div>
                <h1 className='text-lg font-semibold text-center'>Something Went Wrong Please Try Again</h1>
            </div>
        )
    }

    return (
        <div>
            <Game assignmentData={assignmentData} data={data?.questions} assessmentId={id} userId={userId} email={email} assignmentId={assignmentId} type={type} />
        </div>
    )
}

export default page
