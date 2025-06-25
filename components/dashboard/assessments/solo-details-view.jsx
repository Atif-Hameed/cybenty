'use client'
import React, { useState } from 'react';
import CircularProgress from '../shared/CircularProgressbar';
import Back from '@/components/shared/back';
import Heading from '@/components/shared/Heading';
import { updateAssignment } from '@/services/assignment';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const SoloDetailsView = ({ data, recoms }) => {
    const [recommendations, setRecommendations] = useState(recoms?.recommendations || []);
    const answers = data?.result?.answers || [];
    const user = useSelector((state) => state?.user?.user);

    const markRecommendationComplete = async (recId) => {
        try {
            const updatedRecommendations = recommendations.map(rec =>
                rec._id === recId ? { ...rec, status: 'complete' } : rec
            );
            const res = await updateAssignment(data?.assignmentId, { recommendations: updatedRecommendations });
            setRecommendations(updatedRecommendations);
        } catch (error) {
            console.error('Error updating recommendation:', error);
        }
    };

    const progressPercentage = (
        (data?.result?.answers.length / data?.result?.totalQuestions) * 100
    ).toFixed(1);


    return (
        <div>
            <div className='px-6 pt-3'>
                <Back href={'/dashboard/assessments'} />
            </div>

            <div className="flex justify-center p-6 items-center">
                <div className="border w-full border-bordered md:rounded-xl rounded-lg bg-white">
                    {/* Header with assessment name and completion stats */}
                    <div className="flex sm:flex-row flex-col justify-between sm:items-center bg-[#F5F6FA40] border-b border-bordered py-2 lg:px-6 px-3  rounded-t-xl">
                        <div className="flex items-center sm:gap-5 gap-3 flex-wrap ">
                            <div className='flex items-center gap-2'>
                                <CircularProgress
                                    percentage={progressPercentage}
                                    className={'!h-12 !w-12'}
                                    text=''
                                    text1Style={'!text-[9px]'}
                                />
                                <div>
                                    <h1 className="text-black text-start lg:text-2xl sm:text-xl">Topic: <span className='font-semibold'>{data?.assessment?.name}</span></h1>
                                </div>
                            </div>
                        </div>
                        {
                            data.result.status === 'COMPLETED' ?
                                <div className="text-gray-500 sm:text-start text-end sm:mt-0 mt-5 sm:text-sm text-xs">
                                    Score: {data?.result?.totalScore}/{data?.result?.maxPossibleScore} (
                                    {data?.result?.scorePercentage})
                                </div>
                                :
                                <Link
                                    href={`/dashboard/assessments/game/${data.assessment.id}?userId=${user._id}&type=SOLO&assignmentId=${data?.assignmentId}`}
                                    className='font-medium text-lg hover:underline text-gray' >
                                    Continue Game →
                                </Link>
                        }

                    </div>

                    {/* Questions list */}
                    <div className="lg:p-6 p-4">
                        {answers.map((answer, index) => {
                            const { question, userAnswer, isCorrect } = answer;
                            const isYesNo = question.questionType === 'yes_no';
                            const isMultipleChoice = question.questionType === 'multiple_choice';

                            // Find relevant recommendations for wrong answers
                            const wrongAnswers = isCorrect ? [] : userAnswer;
                            const relevantRecommendations = recommendations.filter(rec =>
                                wrongAnswers.some(ans =>
                                    ans.toString().trim().toLowerCase() === rec.forAnswer.toString().trim().toLowerCase()
                                )
                            );

                            return (
                                <div key={index} className="mb-8">
                                    {/* Question title */}
                                    <h3 className="font-semibold sm:text-lg mb-4">
                                        {index + 1}. {question.questionTitle}
                                    </h3>

                                    {/* Options */}
                                    <ul className="grid grid-cols-1 min-w-36 w-fit items-start gap-4">
                                        {question.options.map((option, optIndex) => {
                                            const isSelected = userAnswer.includes(option);
                                            const isCorrectOption = question.correctOption.includes(option);
                                            const showCorrect = isCorrectOption;
                                            const showIncorrect = isSelected && !isCorrectOption;
                                            const showPartialCorrect = isSelected && isCorrectOption && !isCorrect;

                                            return (
                                                <li
                                                    key={optIndex}
                                                    className={`sm:p-4 p-2 flex justify-between rounded-lg
                          ${isSelected ? 'bg-[#FCAE6630]' : 'bg-[#FCAE6614]'}
                          ${showCorrect ? 'border-green-500 border-2' : ''}
                          ${showIncorrect ? 'border-red-500 border-2' : ''}
                          ${showPartialCorrect ? 'border-orange-500 border-2' : ''}
                        `}
                                                >
                                                    <div className="flex break-all items-center gap-3">
                                                        {isMultipleChoice ? (
                                                            <div
                                                                className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center
                                ${isSelected ? 'bg-darkPurple border-darkPurple' : 'border-gray-300'}`}
                                                            >
                                                                {isSelected && <span className="text-white text-xs">✓</span>}
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className={`w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center
                                ${isSelected ? 'border-darkPurple' : 'border-gray-300'}`}
                                                            >
                                                                {isSelected && <div className="w-3 h-3 rounded-full bg-darkPurple"></div>}
                                                            </div>
                                                        )}
                                                        <span>{option}</span>
                                                    </div>
                                                    {showCorrect && <span className="text-green-500">✓</span>}
                                                    {showIncorrect && <span className="text-red-500">✗</span>}
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    {/* Feedback */}
                                    <div className="mt-4">
                                        {isCorrect ? (
                                            <>
                                                <span className="text-xl text-green-600 font-semibold">Correct!</span>
                                                <p className="text-gray-500 mt-2">{question.correctMessage}</p>
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-xl text-red-600 font-semibold">Incorrect!</span>
                                                <p className="text-gray-500 mt-2">{question.wrongMessage || 'Please review the correct answers.'}</p>
                                                {isMultipleChoice && (
                                                    <p className="text-gray-500 mt-1">
                                                        Correct answers: {question.correctOption.join(', ')}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {/* Recommendations for wrong answers */}
                                    {relevantRecommendations.length > 0 && (
                                        <div className="mt-4">
                                            <h4 className="font-semibold text-lg mb-2">Recommendations:</h4>
                                            {relevantRecommendations.map((rec, recIndex) => (
                                                <div key={recIndex} className="border border-bordered rounded-lg p-4 mb-2">
                                                    <h5 className="font-semibold">{rec.title}</h5>
                                                    <p className="text-gray-600 text-sm">{rec.description}</p>
                                                    <div className='w-full flex justify-end'>
                                                        {rec.status === 'complete' ? (
                                                            <button className="mt-3 bg-white text-green-600 border-2 border-dashed border-darkPurple rounded-lg py-1 px-3 cursor-default">
                                                                Completed
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => markRecommendationComplete(rec._id)}
                                                                className="mt-3 bg-purple text-white rounded-lg py-1 px-3"
                                                            >
                                                                Mark as complete
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SoloDetailsView;