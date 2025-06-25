'use client'
import React, { useEffect, useState } from 'react'
import congrats from '@/public/assets/images/congrats.svg'
import profile from '@/public/assets/icons/profile.svg'
import Image from 'next/image'
import { getTeamResults } from '@/actions/game.action'
import { useSelector } from 'react-redux'
import { useRouter, useSearchParams } from 'next/navigation'
import { ReactionReceiver, ReactionSender } from './reactions'

const TeamWon = ({ onClose, assignmentId, assessmentId }) => {
    const [results, setResults] = useState([]);
    const [userPosition, setUserPosition] = useState(null);
    const [allMembersCompleted, setAllMembersCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state?.user?.user);
    const router = useRouter();
    const params = useSearchParams();
    const userEmail = params.get('email') || user?.email;
    const memberId = params.get('memberId');
    const winner = results[0];
    const isWinner = memberId === winner?.memberId;

    const fetchTeamResults = async () => {
        try {
            setLoading(true);
            const res = await getTeamResults(assignmentId, assessmentId);

            if (res.data) {
                const sortedResults = [...res.data.teamResults].sort((a, b) => a.position - b.position);
                setResults(sortedResults);

                // Find current user's position
                const currentUser = sortedResults.find(member =>
                    member.email === user?.email || member.email === userEmail
                );
                if (currentUser) {
                    setUserPosition(currentUser.position);
                }

                // Check if all members have completed
                const allCompleted = sortedResults.every(member => {
                    return member.status === 'COMPLETED' &&
                        member.totalScore !== undefined &&
                        member.totalScore !== null;
                });
                setAllMembersCompleted(allCompleted);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTeamResults();
    }, [assignmentId, assessmentId]);

    const getPositionSuffix = (position) => {
        if (position === 1) return '1st';
        if (position === 2) return '2nd';
        if (position === 3) return '3rd';
        return `${position}th`;
    }

    if (loading) {
        return (
            <div className="bg-white flex flex-col items-center justify-center p-6 rounded-lg shadow-sm">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple"></div>
                <p className="mt-4 text-gray-600">Loading results...</p>
            </div>
        );
    }

    // console.log(results)

    if (!allMembersCompleted) {
        const completedCount = results.filter(member =>
            member.status === 'COMPLETED' && member.totalScore !== undefined
        ).length;


        return (
            <div className='bg-white flex flex-col gap-6 p-6 rounded-lg shadow-sm'>
                <div className='w-full flex flex-col items-center gap-4'>
                    <Image
                        alt='Waiting'
                        src={profile}
                        className='h-44 w-auto'
                        priority
                    />
                    <p className='font-medium text-center text-lg'>
                        Waiting for other team members to complete...
                    </p>
                    <p className='text-gray-500 text-center'>
                        The results will be displayed once everyone has finished.
                    </p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${(completedCount / results.length) * 100}%` }}
                    ></div>
                </div>

                <p className="text-center text-sm text-gray-500">
                    {completedCount} of {results.length} members completed
                </p>

                <button
                    onClick={fetchTeamResults}
                    disabled={loading}
                    className={`mt-4 bg-primary hover:bg-darkPurple transition-colors rounded-md text-white w-full py-3 px-6 font-medium flex items-center justify-center gap-2
                        ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                            Checking...
                        </>
                    ) : (
                        'Check Again'
                    )}
                </button>
            </div>
        );
    }

    console.log("Winner : ",isWinner)

    return (
        <div className='bg-white flex flex-col gap-6 p-6 rounded-lg shadow-sm relative '>
            <div className='w-full flex flex-col items-center gap-4'>
                <Image
                    alt='Congratulations'
                    src={congrats}
                    className='h-44 w-auto'
                    priority
                />
                {userPosition && (
                    <p className='font-medium text-center text-lg'>
                        {userPosition === 1 ? (
                            "Congratulations!"
                        ) : (
                            `You finished in ${getPositionSuffix(userPosition)} place!`
                        )}
                    </p>
                )}
            </div>

            <div className='w-full overflow-auto'>
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                        <tr className='text-black'>
                            <th className="p-4 text-start text-sm font-semibold whitespace-nowrap">Position</th>
                            <th className="p-4 text-start text-sm font-semibold whitespace-nowrap">Member</th>
                            <th className="p-4 text-start text-sm font-semibold whitespace-nowrap">Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray">
                        {results?.map((member, index) => {
                            const isCurrentUser = member.email === user?.email || member.email === userEmail;

                            return (
                                <tr
                                    key={index}
                                    className={isCurrentUser ? 'bg-purple-50' : ''}
                                >
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                        <span className={`flex items-center justify-center w-8 h-8 rounded-full 
                                            ${member.position === 1 ? 'bg-green-100 text-green-800' :
                                                member.position === 2 ? 'bg-blue-100 text-blue-800' :
                                                    member.position === 3 ? 'bg-purple-100 text-purple-800' :
                                                        'bg-gray-100 text-gray-800'}
                                        `}>
                                            {member.position}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <p className={`${isCurrentUser ? 'font-medium' : 'text-gray-500'} text-xs`}>
                                            {member.email}
                                            {isCurrentUser && ' (You)'}
                                        </p>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{member.totalScore}</span>
                                            <span className="text-xs text-gray-500">/ {member.maxPossibleScore}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                            <div
                                                className="bg-green-500 h-1.5 rounded-full"
                                                style={{ width: `${Math.min(100, member.totalScore / member.maxPossibleScore * 100)}%` }}
                                            ></div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className='w-full mt-4'>
                <button
                    onClick={() => router.push('/dashboard/assessments')}
                    className='bg-purple hover:bg-purple-700 transition-colors rounded-md text-white w-full py-3 px-6 font-medium'
                >
                    Continue
                </button>
            </div>

            {!isWinner && winner && (
                <ReactionSender
                    assignmentId={assignmentId}
                    winnerMemberId={winner.memberId}
                    currentMemberId={memberId}
                    currentEmail={userEmail}
                />
            )}

            {isWinner && (
                <ReactionReceiver
                    memberId={memberId}
                    assignmentId={assignmentId}
                />
            )}
        </div>
    )
}

export default TeamWon