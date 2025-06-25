'use client'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '../shared/CircularProgressbar';
import Back from '@/components/shared/back';
import { useSearchParams } from 'next/navigation';
import { updateTeamMemberRecommendations } from '@/services/assignment';

const TeamDetailsView = ({ data }) => {
  const [recommendations, setRecommendations] = useState([]);
  const params = useSearchParams();
  const assignmentId = params.get('assignmentId');
  const assessmentId = data.assessment.id;
  const user = useSelector((state) => state?.user?.user);

  const teamResults = data?.teamResults || [];
  const [selectedMember, setSelectedMember] = useState(teamResults[0]?.email || '');
  const selectedMemberData = teamResults.find(member => member.email === selectedMember) || teamResults[0] || {};
  const answers = selectedMemberData?.answers || [];

  // Calculate progress percentage
  const progressPercentage = (
    (selectedMemberData?.answers?.length / selectedMemberData?.totalQuestions) * 100 || 100
  ).toFixed(1);

  // Fetch recommendations for the selected team member
  const fetchRecommendations = async () => {
    try {
      const memberData = teamResults.find(member => member.email === selectedMember);
      if (memberData && memberData.recommendations) {
        setRecommendations(memberData.recommendations);
      } else {
        setRecommendations([]);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  useEffect(() => {
    if (assignmentId && selectedMember) {
      fetchRecommendations();
    }
  }, [assignmentId, selectedMember]);

  // Handle marking a recommendation as complete
  const markRecommendationComplete = async (recId) => {
    if (!user || user.email !== selectedMember) {
      alert('You can only update your own recommendations.');
      return;
    }

    try {
      const updatedRecommendations = recommendations.map(rec =>
        rec._id === recId ? { ...rec, status: 'complete' } : rec
      );
      console.log("Sending recommendations:", updatedRecommendations);
      const response = await updateTeamMemberRecommendations(assignmentId, user.email, updatedRecommendations);
      console.log("Response:", response);
      if (response.success) {
        setRecommendations(updatedRecommendations);
        console.log('Recommendations updated:', response);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Error updating recommendation:', error);
      alert('Failed to update recommendation: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <div>
      <div className="px-6 pt-3">
        <Back href={'/dashboard/assessments'} />
      </div>
      <div className="flex justify-center p-6 items-center">
        <div className="border w-full border-bordered md:rounded-xl rounded-lg bg-white">
          <div className="flex lg:flex-row flex-col justify-between sm:items-center bg-[#F5F6FA40] border-b border-bordered py-2 lg:px-6 px-3 border-gray-300 rounded-t-xl">
            <div className="flex items-center sm:gap-5 gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <CircularProgress
                  percentage={progressPercentage}
                  className={'!h-12 !w-12'}
                  text=""
                  text1Style={'!text-[9px]'}
                />
                <div>
                  <h1 className="text-black text-start lg:text-2xl sm:text-xl">
                    Topic: <span className="font-semibold">{data?.assessment?.name}</span>
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col sm:items-center sm:gap-4 gap-2 sm:mt-0 mt-5">
              <select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="border border-gray-300 rounded-md sm:p-2 p-1 sm:text-sm text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-darkPurple"
              >
                {teamResults.map((member) => (
                  <option key={member.memberId} value={member.email}>
                    {member.email}
                  </option>
                ))}
              </select>
              <div className="text-gray-500 sm:text-start text-end sm:text-sm text-xs">
                Score: {selectedMemberData?.totalScore}/{selectedMemberData?.maxPossibleScore} (
                {selectedMemberData?.scorePercentage})
              </div>
            </div>
          </div>

          <div className="lg:p-6 p-4">
            {answers.map((answer, index) => {
              const { question, userAnswer, isCorrect } = answer;
              const isYesNo = question.questionType === 'yes_no';
              const isMultipleChoice = question.questionType === 'multiple_choice' || question.questionType === 'single_choice';

              // Find relevant recommendations for wrong answers
              const wrongAnswers = isCorrect ? [] : userAnswer;
              const relevantRecommendations = recommendations.filter(rec => {
                // Extract question title from recommendation title
                const recQuestionTitle = rec.title?.replace('Recommendation for Question: ', '').trim();
                // Match by forAnswer and either sourceQuestion.questionId or question title
                return wrongAnswers.some(ans =>
                  ans.toString().trim().toLowerCase() === rec.forAnswer?.toString().trim().toLowerCase() &&
                  (rec.sourceQuestion?.questionId === answer.questionId?.toString() ||
                    recQuestionTitle === question.questionTitle?.trim())
                );
              });

              console.log("Question:", question.questionTitle, "Relevant Recommendations:", relevantRecommendations);
              console.log("Answer:", { questionId: answer.questionId, userAnswer, isCorrect });

              return (
                <div key={index} className="mb-8">
                  <h3 className="font-semibold sm:text-lg mb-4">
                    {index + 1}. {question.questionTitle}
                  </h3>

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
                          {showCorrect && <span className="text-green-600">✓</span>}
                          {showIncorrect && <span className="text-red-600">❌</span>}
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-4">
                    {isCorrect ? (
                      <>
                        <span className="text-xl text-green-600 font-semibold">Correct!</span>
                        <p className="text-gray-500 mt-1">{question.correctMessage}</p>
                      </>
                    ) : (
                      <>
                        <span className="text-xl text-red-600 font-semibold">Incorrect!</span>
                        <p className="text-gray-500 mt-1">{question.wrongMessage || 'Please review the correct answers.'}</p>
                        {isMultipleChoice && (
                          <p className="text-gray-500 mt-1">
                            Correct answers: {question.correctOption?.join(', ')}
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  {relevantRecommendations.length > 0 && user.email === selectedMember && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-lg mb-3">Recommendations:</h4>
                      {relevantRecommendations.map((rec, recIndex) => (
                        <div key={recIndex} className="border border-gray-300 rounded-lg p-4 mb-2">
                          <h5 className="font-semibold">{rec.title}</h5>
                          <p className="text-gray-600 text-sm">{rec.description}</p>
                          <div className="w-full flex justify-end">
                            {rec.status === 'complete' ? (
                              <button className="mt-2 bg-white text-green-600 border-2 border-dashed border-purple-600 rounded-lg py-1 px-3 cursor-default">
                                Completed
                              </button>
                            ) : (
                              <button
                                onClick={() => markRecommendationComplete(rec._id)}
                                className="mt-3 bg-purple text-white rounded-lg py-1 px-3"
                                disabled={user.email !== selectedMember}
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

export default TeamDetailsView;