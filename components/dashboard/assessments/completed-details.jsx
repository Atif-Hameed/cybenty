'use client'
import { getTeamResults } from '@/actions/game.action';
import React, { useEffect, useState } from 'react';

const CompletedDetails = ({ assignemntId, assessmentId, teamScore, logo, soloData }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!soloData) { // Only fetch team data if it's not a solo assignment
            const fetchTeamData = async () => {
                try {
                    setLoading(true);
                    const { data, error } = await getTeamResults(assignemntId, assessmentId);
                    if (error) {
                        console.error(error);
                        return;
                    }
                    if (data) {
                        setData(data);
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchTeamData();
        }
    }, [assignemntId, assessmentId, soloData]);


    if (loading) {
        return (
            <div className='py-10 text-center font-semibold'>
                Loading...
            </div>
        );
    }


    return (
        <div className='w-full'>
            {

                soloData ? (

                    <div className="mx-auto">
                        {/* Assessment Header */}
                        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                            <div className="flex items-center gap-4 mb-4">
                                {soloData.assessmentId.logo && (
                                    <img
                                        src={soloData.assessmentId.logo}
                                        alt="Assessment Logo"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                )}
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">{soloData.assessmentId.assessmentName}</h1>
                                    <p className="text-gray-600">{soloData.assessmentId.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Total Questions</p>
                                    <p className="text-xl font-semibold">{soloData.totalQuestions}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Correct Answers</p>
                                    <p className="text-xl font-semibold">{soloData.correctAnswers}</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Total Score</p>
                                    <p className="text-xl font-semibold">{soloData.score}</p>
                                </div>

                            </div>

                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">Overall Result</h3>
                                <div className={`p-3 rounded-lg ${soloData.scorePercentage.includes("(Improvement)")
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-green-100 text-green-800"
                                    }`}>
                                    <p className="text-xl font-bold">{soloData.scorePercentage}</p>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations */}
                        {soloData.recommendations && soloData.recommendations.length > 0 && (
                            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                                <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
                                <div className="space-y-4">
                                    {soloData.recommendations.map((rec, index) => (
                                        <div key={index} className="border-l-4 border-blue-500 pl-4 space-y-2 py-2">
                                            <h3 className="font-medium">{rec.title}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${rec.status === "not_complete"
                                                ? "bg-yellow-100 text-yellow-800 "
                                                : "bg-green-100 text-green-800"
                                                }`}>
                                                {rec.status === "not_complete" ? "Not Complete" : "Completed"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Completion Info */}
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-500">Completed at</p>
                                    <p>{new Date(soloData.updatedAt).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Assignment Type</p>
                                    <p className="font-medium">{soloData.assignmentType}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                    : data ? (
                        <div className=" mx-auto">

                            {/* Assessment Header */}
                            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                                <div className="flex items-center gap-4 mb-4">
                                    {logo && (
                                        <img
                                            src={logo}
                                            alt="Assessment Logo"
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    )}
                                        <h1 className="text-2xl font-bold text-gray-800 mb-2">{data.assessment.name}</h1>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="text-sm text-slate-600">Total Questions</p>
                                        <p className="text-xl font-semibold">{data.assessment.totalQuestions}</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-sm text-slate-600">Total Score</p>
                                        <p className="text-xl font-semibold">{data.assessment.maxPossibleScore}</p>
                                    </div>
                                    <div className="bg-yellow-50 p-4 rounded-lg">
                                        <p className="text-sm text-slate-600">Average Score</p>
                                        <p className="text-xl font-semibold">{data.averageScore.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2">Overall Result</h3>
                                    <div className={`p-3 rounded-lg ${teamScore.includes("(Improvement)")
                                        ? "bg-orange-100 text-orange-800"
                                        : "bg-green-100 text-green-800"
                                        }`}>
                                        <p className="text-xl font-bold">{teamScore}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Team Results */}
                            <div className="space-y-6">
                                <h2 className="sm:text-xl text-lg font-semibold border-b-2 border-slate-800 pb-1 w-fit text-slate-800">Team Results</h2>
                                {data.teamResults.map((member, index) => (
                                    <div key={member.memberId} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <div className="p-4">
                                            <div className="">
                                                <div>
                                                    <h3 className="text-lg font-semibold break-all text-slate-800">
                                                        {member.name || member.email}
                                                    </h3>
                                                    {/* <p className="text-sm text-gray-500">{member.email}</p> */}
                                                </div>
                                                <div className="text-right flex justify-between items-center w-full my-3">
                                                    <span className={`px-3 py-2 rounded-full text-sm font-medium ${member.totalScore === data.assessment.maxPossibleScore
                                                        ? 'bg-green-100 text-green-800'
                                                        : member.totalScore > 0
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        Score: {member.totalScore}/{data.assessment.maxPossibleScore}
                                                    </span>
                                                    <p className="mt-1 text-sm text-gray-600">
                                                        {member.scorePercentage} • Position #<span className='text-lg font-medium'>{member.position}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Progress bar */}
                                            <div className="mt-4">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium text-gray-700">Progress</span>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {member.completedQuestions}/{data.assessment.totalQuestions} questions
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className="bg-blue-600 h-2.5 rounded-full"
                                                        style={{ width: `${(member.completedQuestions / data.assessment.totalQuestions) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Answers */}
                                            <div className="mt-6 space-y-4">
                                                <h4 className="font-medium text-slate-700">Question Answers:</h4>
                                                {member.answers.map((answer, idx) => (
                                                    <div key={idx} className={`border-l-4 pl-4 ${answer.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                                                        } p-3 rounded`}>
                                                        <p className="font-medium break-all whitespace-pre-wrap">{answer.questionTitle}</p>
                                                        <p className="text-sm text-gray-600">
                                                            {Array.isArray(answer.userAnswer) ? answer.userAnswer.join(', ') : answer.userAnswer}
                                                        </p>
                                                        <p className={`text-sm ${answer.isCorrect ? 'text-green-600' : 'text-red-600'
                                                            }`}>
                                                            {answer.isCorrect ? 'Correct' : 'Incorrect'} • Points: <span className='text-base'>{answer.pointsEarned}</span>
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <p className="text-sm text-gray-600">
                                                    Completed at: {new Date(member.completedAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                        :
                        <div className='py-10 text-center font-semibold'>
                            No data available
                        </div>

            }

        </div>
    );
};

export default CompletedDetails;