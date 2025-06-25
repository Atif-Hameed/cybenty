'use client'
import { allAssignedAssessemnts } from '@/actions/assessments.action'
import { getUserTotalAcheivements, getUserTotalScore } from '@/actions/game.action'
import Assessments from '@/components/dashboard/assessments/assessments'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
    const [assigned, setAssigned] = useState([]);
    const [unassigned, setUnassigned] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userScore, setUserScore] = useState();
    const [userAcheivements, setUserAcheivements] = useState();
    const user = useSelector((state) => state.user.user);

    const getAllAssignmentsAssessments = async (userId) => {
        setLoading(true);
        try {
            const res = await allAssignedAssessemnts(userId)
            // Destructure the response data
            const { data } = res.data || {};
            const { assigned = [], unassigned = [] } = data || {};
            setAssigned(assigned);
            setUnassigned(unassigned);
        } catch (error) {
            console.error('Error fetching assessments:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchUserScore = async (id) => {
        try {
            const { data, error } = await getUserTotalScore(id)
            if (error) {
                console.log(error)
            }
            if (data) {
                setUserScore(data.data)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const fetchUserAcheivements = async (id) => {
        try {
            const { data, error } = await getUserTotalAcheivements(id)
            if (error) {
                console.log(error)
            }
            if (data) {
                setUserAcheivements(data)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user?._id) {
            getAllAssignmentsAssessments(user._id);
            fetchUserScore(user?._id);
            fetchUserAcheivements(user?._id);
        }
    }, [user])

    if (loading) {
        return (
            <h1 className='pt-20 font-semibold text-center' >Loading...</h1>
        );
    }

    console.log("Assign :", assigned)
    console.log("Un assign :", unassigned)

    return (
        <div>
            <Assessments
                assigned={assigned}
                unassigned={unassigned}
                user={user}
                userScore={userScore}
                userAcheivements={userAcheivements}
            />
        </div>
    )
}

export default Page