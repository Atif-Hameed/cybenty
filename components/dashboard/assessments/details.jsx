'use client'
import { getAllTeamMembers } from '@/actions/assessments.action';
import Back from '@/components/shared/back';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Details = ({ data }) => {

    // State to store team members for each assignment
    const [teamMembersMap, setTeamMembersMap] = useState({});

    // Filter for TEAM assignments only
    const teamAssignments = data?.filter(assignment => assignment.assignmentType === "TEAM");

    // Format date to match the UI (e.g., "10 MAY 2025")
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).toUpperCase();
    };

    // Fetch team members for each assignment
    useEffect(() => {
        const fetchAllTeamMembers = async () => {
            const membersMap = {};
            for (const assignment of teamAssignments) {
                try {
                    const { data: members, error } = await getAllTeamMembers(assignment._id);
                    if (error) {
                        console.error(`Error fetching team members for assignment ${assignment._id}:`, error);
                        membersMap[assignment._id] = [];
                    } else {
                        // Filter members with status "INVITED" or "ACCEPTED" and map their emails
                        const filteredMembers = members.data.filter(member => member.status === "INVITED" || member.status === "ACCEPTED" || member.status === "COMPLETED")
                            .map(member =>  member.name || member.email);
                        membersMap[assignment._id] = filteredMembers;
                    }
                } catch (error) {
                    console.error(`Error fetching team members for assignment ${assignment._id}:`, error);
                    membersMap[assignment._id] = [];
                }
            }
            setTeamMembersMap(membersMap);
        };

        if (teamAssignments?.length > 0) {
            fetchAllTeamMembers();
        }
    }, [teamAssignments]);

    return (
        <div className="p-10">

            <Back href={'/dashboard/assessments'} />

            {/* Assessment Name */}
            {teamAssignments.length > 0 && (
                <h1 className="lg:text-4xl sm:text-3xl text-2xl mb-8 text-center">
                    Topic: {teamAssignments[0].assessmentId.assessmentName}
                </h1>
            )}

            {/* Team Assignments List */}
            {teamAssignments.map((assignment, index) => (
                <div
                    key={assignment._id}
                    className="border border-[#0000001F] bg-[#FCFDFE] rounded-lg p-4 mb-4 flex justify-between items-center"
                >
                    <div>
                        <h2 className="font-semibold mb-4">Team {index + 1}</h2>
                        <p className="text-gray-600 flex flex-wrap">
                            Members: {teamMembersMap[assignment._id]?.length > 0
                                ? teamMembersMap[assignment._id].join(', ')
                                : 'No members found'}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-600 mb-4">{formatDate(assignment.updatedAt)}</p>
                        {(assignment.status === 'PENDING' || assignment.status === 'IN_PROGRESS') ? (
                            <Link
                                href={`/dashboard/assessments/invites?assessment=${assignment.assessmentId?._id}&assignment=${assignment._id}&type=${assignment?.assignmentType}`}
                                className="text-gray hover:underline whitespace-nowrap"
                            >
                                Continue Game →
                            </Link>
                        ) : (
                            <Link
                                href={`/dashboard/assessments/details/view-details?assignmentId=${assignment._id}&assessmentId=${assignment.assessmentId?._id}&userId=${assignment.createdBy}&type=${assignment?.assignmentType}`}
                                className="text-gray hover:underline whitespace-nowrap"
                            >
                                View details →
                            </Link>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Details;