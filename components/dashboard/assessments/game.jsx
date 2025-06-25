'use client'
import React, { useState, useEffect, useRef } from 'react';
import { MdFlag } from "react-icons/md";
import CircularProgress from '../shared/CircularProgressbar';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import ExamleDropdown from './examle-dropdown';
import { FlagIcon } from '@/svgs';
import Modal from '../shared/Modal';
import TeamWon from './team-won';
import SoloWin from './solo-win';
import { finshAssignemnt, forceSubmit, submitAnswer } from '@/actions/game.action';
import { useDispatch, useSelector } from 'react-redux';
import {
    initializeQuizzes,
    markForLater,
    resetSelectedOptions,
    moveToNextQuiz,
    moveToPrevQuiz,
    selectCurrentQuiz,
    selectOption,
    selectQuizProgress,
    submitQuiz,
    resetSubmission,
    markAllQuizzesAsDone,
} from '@/store/quizSlice';
import TimeUpModal from './timeUpModal';
import { updateAssignment } from '@/services/assignment';
import { getAllTeamMembers } from '@/actions/assessments.action';

const Game = ({ assignmentData, assessmentId, data, userId, email, assignmentId, type, }) => {
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false);
    const [submiting, setSubmiting] = useState(false)
    const [timeUpModal, setTimeUpModal] = useState(false);
    const [timeLeft, setTimeLeft] = useState(assignmentData.time * 60);
    const [timerStopped, setTimerStopped] = useState(false);
    const timerStoppedRef = useRef(false);
    const [teamMembers, setTeamMembers] = useState([]);
    const [emailColors, setEmailColors] = useState({});

    // console.log(data)

    const {
        quizzes,
        currentQuizIndex,
        selectedOptions,
        submitted,
        loading,
        allQuestionsAnswered,
        completedSoloAssessments,
    } = useSelector(state => state.quiz);

    // Check if solo game is already completed
    useEffect(() => {
        if (type === 'SOLO' && completedSoloAssessments.includes(assessmentId)) {
            setSoloCompleted(true);
        }
    }, [type, assessmentId, completedSoloAssessments]);


    // Fetch team members and process their emails
    useEffect(() => {
        if (type === 'TEAM') {
            const fetchTeamMembers = async () => {
                try {
                    const { data, error } = await getAllTeamMembers(assignmentId);
                    if (data) {
                        const members = data.data;
                        setTeamMembers(members);

                        const colorMap = {};
                        const emailCount = {};

                        members.forEach(member => {
                            emailCount[member.email] = (emailCount[member.email] || 0) + 1;
                        });

                        members.forEach(member => {
                            if (emailCount[member.email] > 1) {
                                if (!colorMap[member.email]) {
                                    const hue = Math.floor(member.email.split('').reduce((acc, char) =>
                                        acc + char.charCodeAt(0), 0) % 360);
                                    colorMap[member.email] = `hsl(${hue}, 70%, 80%)`;
                                }
                            } else {
                                colorMap[member.email] = '#e5e7eb';
                            }
                        });

                        setEmailColors(colorMap);
                    }
                } catch (error) {
                    console.error('Error fetching team members:', error);
                }
            };

            fetchTeamMembers();
        }
    }, [type, assignmentId]);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const stopTimer = () => {
        timerStoppedRef.current = true;
    };


    // Fetch team members and process their emails
    useEffect(() => {
        if (type === 'TEAM') {
            const fetchTeamMembers = async () => {
                try {
                    const { data, error } = await getAllTeamMembers(assignmentId);
                    if (data) {
                        const members = data.data;
                        setTeamMembers(members);

                        // Generate colors for duplicate emails
                        const colorMap = {};
                        const emailCount = {};

                        // First pass: count email occurrences
                        members.forEach(member => {
                            emailCount[member.email] = (emailCount[member.email] || 0) + 1;
                        });

                        // Second pass: assign colors to duplicates
                        members.forEach(member => {
                            if (emailCount[member.email] > 1) {
                                if (!colorMap[member.email]) {
                                    // Generate a random but consistent color for this email
                                    const hue = Math.floor(member.email.split('').reduce((acc, char) =>
                                        acc + char.charCodeAt(0), 0) % 360);
                                    colorMap[member.email] = `hsl(${hue}, 70%, 80%)`;
                                }
                            } else {
                                // Single occurrence - use default gray
                                colorMap[member.email] = '#e5e7eb'; // Tailwind's gray-200
                            }
                        });

                        setEmailColors(colorMap);
                    }
                } catch (error) {
                    console.error('Error fetching team members:', error);
                }
            };

            fetchTeamMembers();
        }
    }, [type, assignmentId]);


    // Countdown timer effect
    useEffect(() => {
        if (type !== 'TEAM' || !assignmentData.time || timerStopped) return;

        const timer = setInterval(() => {
            if (timerStoppedRef.current) return;
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    timerStoppedRef.current = true;
                    setTimeUpModal(true);

                    // Automatically force submit when time is up
                    const handleTimeUp = async () => {
                        try {
                            // First force submit the assignment
                            const result = await forceSubmit(assignmentId, userId, email);
                            if (result.error) {
                                console.error('Force submit error:', result.error);
                            } else {
                                // Mark all quizzes as done in Redux
                                dispatch(markAllQuizzesAsDone());
                            }

                            // Then update the assessment time to 0 in the backend
                            const res = await updateAssignment(assignmentId, { time: 0 });

                        } catch (error) {
                            console.error('Error in time up handling:', error);
                        }
                    };

                    handleTimeUp();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [type, assignmentData.time, assignmentId, userId, email, dispatch, assessmentId]);

    // Check initial time and show modal if time is already up
    useEffect(() => {
        if (type === 'TEAM' && assignmentData.time === 0) {
            setTimeUpModal(true);
            dispatch(markAllQuizzesAsDone());
        }
    }, [type, assignmentData.time, dispatch]);


    // Selectors
    const currentQuiz = useSelector(selectCurrentQuiz);

    const { doneQuizzes, totalPoints } = useSelector(selectQuizProgress);


    // Initialize quizzes from props data
    useEffect(() => {
        if (data && data.length > 0) {
            // Generate a unique ID for this quiz set
            const quizSetId = data.map(q => q._id).join('-');

            dispatch(initializeQuizzes({
                data,
                quizSetId
            }));
        }
    }, [data, dispatch]);

    // console.log(data)

    const handleOptionSelect = (option) => {
        if (!submitted) {
            dispatch(selectOption({
                quizId: currentQuiz.id,
                option,
                questionType: currentQuiz.questionType // Pass question type to the reducer
            }));
        }
    };

    const isOptionSelected = (option) => {
        if (!selectedOptions[currentQuiz.id]) return false;

        if (currentQuiz.questionType === 'multiple_choice') {
            return selectedOptions[currentQuiz.id]?.includes(option);
        } else {
            return selectedOptions[currentQuiz.id] === option;
        }
    };

    const handleSubmit = async () => {
        if (!selectedOptions[currentQuiz.id] ||
            (currentQuiz.questionType === 'multiple_choice' && selectedOptions[currentQuiz.id].length === 0)) {
            return;
        }
        try {
            setSubmiting(true)
            const response = await submitAnswer(
                userId,
                email,
                currentQuiz.id,
                Array.isArray(selectedOptions[currentQuiz.id])
                    ? selectedOptions[currentQuiz.id]
                    : [selectedOptions[currentQuiz.id]],
                assignmentId,
            );


            if (response.error) {
                setSubmiting(false)
                throw new Error(response.error);
            }
            setSubmiting(false)
            dispatch(submitQuiz(currentQuiz.id));
        } catch (error) {
            setSubmiting(false)
            console.error('Error submitting answer:', error);
            alert('Failed to submit answer. Please try again.');
        }
    };

    const finishAssignmentCompletion = async (assignmentId) => {
        try {
            const res = await finshAssignemnt(assignmentId)
        } catch (error) {
            console.log(error)
        }
    }

    const handleNext = () => {
        dispatch(moveToNextQuiz());
        dispatch(resetSubmission());
    };

    const handlePrev = () => {
        dispatch(moveToPrevQuiz());
        dispatch(resetSubmission());
    };

    const handleMarkForLater = () => {
        dispatch(markForLater());
        handleNext();
    };

    const handleClosePopup = () => {
        setOpenModal(false);
    };

    const handleFinishAssessment = async () => {

        // Stop the timer
        stopTimer();

        // Submit any remaining unanswered questions
        const unansweredQuizzes = quizzes.filter(quiz =>
            quiz.status !== 'done' && selectedOptions[quiz.id] &&
            (quiz.questionType !== 'multiple_choice' || selectedOptions[quiz.id].length > 0)
        );

        if (unansweredQuizzes.length > 0) {
            try {
                const responses = await Promise.all(unansweredQuizzes.map(async (quiz) => {
                    const response = await submitAnswer(
                        userId,
                        email,
                        quiz.id,
                        Array.isArray(selectedOptions[quiz.id])
                            ? selectedOptions[quiz.id]
                            : [selectedOptions[quiz.id]],
                        assignmentId
                    );

                    return response; // collect the responses
                }));

                // Mark all as done
                unansweredQuizzes.forEach(quiz => {
                    dispatch(submitQuiz(quiz.id));
                });


                setOpenModal(true);
            } catch (error) {
                console.error('Error submitting answers:', error);
                alert('Error finishing assessment. Please try again.');
            }
        } else {
            // Call the completion API
            await finishAssignmentCompletion(assignmentId);
            setOpenModal(true);
            setTimeUpModal(false)
        }
    };

    if (loading || quizzes.length === 0 || !currentQuiz) {
        return <div>Loading...</div>;
    }


    const selectedOption = selectedOptions[currentQuiz.id];
    const isCorrect = selectedOption && currentQuiz.correctOption.some(opt =>
        Array.isArray(selectedOption) ? selectedOption.includes(opt) : selectedOption === opt
    );


    // console.log(teamMembers)

    return (
        <div>
            <div className='flex justify-center sm:p-10 p-6 items-center'>
                <div className='border w-full border-bordered md:rounded-xl bg-white'>
                    <div className='flex justify-between items-center bg-[#F5F6FA40] border-b py-2 sm:px-6 px-3 border-bordered md:rounded-t-xl'>

                        <div className=' flex items-center sm:gap-5 gap-3 break-all'>
                            <CircularProgress
                                percentage={Math.round((doneQuizzes / quizzes.length) * 100)}
                                className={'!h-12 !w-12'}
                                text=''
                                text1Style={'!text-[10px]'}
                            />
                            <div>
                                <h1 className='text-black text-start lg:text-2xl sm:text-xl'>{data[0].assessmentName}</h1>
                                <p className='text-gray sm:text-sm text-xs '>
                                    {doneQuizzes} of {quizzes.length} questions completed
                                </p>
                            </div>
                        </div>

                        {/* Team Members Icons */}
                        {type === 'TEAM' && teamMembers.length > 0 && (
                            <div className="flex items-center gap-2 ml-4">
                                {teamMembers.map((member, index) => {
                                    const bgColor = emailColors[member.email] || '#e5e7eb'; // Fallback to gray-200
                                    const isCurrentUser = member.userId === userId;

                                    return (
                                        <div
                                            key={index}
                                            className={`flex items-center justify-center sm:h-10 sm:w-10 h-8 w-8 rounded-full sm:text-base text-xs font-medium`}
                                            style={{
                                                backgroundColor: bgColor,
                                                color: '#000', // Black text for better contrast
                                                ...(isCurrentUser && {
                                                    boxShadow: '0 0 0 2px #3b82f6' // Blue ring for current user
                                                })
                                            }}
                                            title={`${member.email}${isCurrentUser ? ' (You)' : ''}`}
                                        >
                                            {member.email.charAt(0).toUpperCase()}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div>
                            {type == 'TEAM' && (
                                <div className="text-darkPurple text-xl font-medium">
                                    {formatTime(timeLeft)}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='p-6'>
                        {/* Progress bar */}
                        <div className='flex items-center gap-4 w-full justify-between'>
                            <div className='bg-[#F8F8FC] rounded-full flex justify-center items-center h-7 w-7'>1</div>
                            <div className='flex items-center gap-2 w-[90%] overflow-x-auto'>
                                {quizzes.map((quiz, i) => (
                                    <div
                                        key={i}
                                        className={`rounded-full h-2 min-w-1 w-full max-w-full ${i < doneQuizzes ? 'bg-purple' : 'bg-[#F8F8FC]'}`}
                                    ></div>
                                ))}
                            </div>
                            <div className='bg-[#F8F8FC] rounded-full flex justify-center items-center h-7 w-7'>{quizzes.length}</div>
                        </div>

                        {/* Display current quiz */}
                        <div className='my-12'>
                            <h3 className='font-semibold text-lg mb-4'>{currentQuiz.question}</h3>
                            <ul className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full items-start gap-4'>
                                {currentQuiz.options.map((option, index) => {
                                    const isSelected = isOptionSelected(option);
                                    const isCorrectOption = currentQuiz.correctOption.includes(option);

                                    // For submitted answers
                                    const showCorrect = submitted && isCorrectOption;
                                    const showIncorrect = submitted && isSelected && !isCorrectOption;
                                    const showPartialCorrect = submitted && isSelected && isCorrectOption && !currentQuiz.isCorrect;

                                    return (
                                        <li
                                            key={index}
                                            className={`p-4  flex  justify-between rounded-lg cursor-pointer 
                                                        ${isSelected ? 'bg-[#FCAE6630]' : 'bg-[#FCAE6614]'}
                                                        ${isSelected && !submitted ? 'border-darkPurple border-2' : 'border-0'}
                                                        ${showCorrect ? 'border-green-500 border-2' : ''}
                                                        ${showIncorrect ? 'border-red-500 border-2' : ''}
                                                        ${showPartialCorrect ? 'border-orange-500 border-2' : ''}
                                                    `}
                                            onClick={() => !submitted && handleOptionSelect(option)}
                                        >
                                            <div className="flex break-all items-center gap-3">
                                                {currentQuiz.questionType === 'multiple_choice' ? (
                                                    <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center 
              ${isSelected ? 'bg-darkPurple border-darkPurple' : 'border-gray-300'}`}>
                                                        {isSelected && <span className="text-white text-xs">✓</span>}
                                                    </div>
                                                ) : (
                                                    <div className={`w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center 
              ${isSelected ? 'border-darkPurple' : 'border-gray-300'}`}>
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
                            {submitted && (
                                <div className='mt-4'>
                                    {currentQuiz.isCorrect ? (
                                        <>
                                            <span className='text-xl text-green-600 font-semibold'>Correct!</span>
                                            <p className='text-gray mt-2'>{currentQuiz.correctMessage}</p>
                                        </>
                                    ) : (
                                        <>
                                            <span className='text-xl text-red-600'>Incorrect!</span>
                                            <p className='text-gray mt-2'>
                                                {currentQuiz.wrongMessage || "Please review the correct answers."}
                                            </p>
                                            {currentQuiz.questionType === 'multiple_choice' && (
                                                <p className='text-gray-500 mt-1'>
                                                    Correct answers: {currentQuiz.correctOption.join(', ')}
                                                </p>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* number of all questions */}
                        <div className='flex items-center my-12 gap-4 w-full justify-center'>
                            <button
                                onClick={handlePrev}
                                className='bg-darkPurple rounded-md flex justify-center items-center h-8 w-10'
                                disabled={currentQuizIndex === 0}
                            >
                                <MdOutlineArrowForwardIos className='rotate-180 text-white' />
                            </button>
                            <div className='flex items-center gap-2 justify-center w-[90%] overflow-x-auto'>
                                {quizzes.map((quiz, i) => (
                                    <div
                                        key={i}
                                        className={`flex relative items-center justify-center h-8 w-10 rounded-lg cursor-pointer
                                            ${currentQuizIndex === i ? 'border-purple border-2' :
                                                'border-[#FCAE665E] border'}
                                            ${quiz.status === 'done' ? 'bg-green-100' : ''}
                                            ${quiz.status === 'flag' ? 'bg-yellow-100' : ''}
                                        `}
                                        onClick={() => {
                                            if (quiz.status !== 'not_started') {
                                                dispatch(resetSubmission());
                                            }
                                        }}
                                    >
                                        {quiz.status === 'flag' && <span className='absolute right-0 -top-0 z-40'><FlagIcon /></span>}
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleNext}
                                className='bg-darkPurple rounded-md flex justify-center items-center h-8 w-10'
                                disabled={currentQuizIndex === quizzes.length - 1}
                            >
                                <MdOutlineArrowForwardIos className='text-white' />
                            </button>
                        </div>

                        {/* example dropdown */}
                        {currentQuiz.realLifeExample && (
                            <ExamleDropdown
                                data={currentQuiz.realLifeExample}
                            />
                        )}

                        {/* Navigation buttons */}
                        <div className='flex my-6 items-center justify-between w-full'>
                            <button
                                onClick={handleMarkForLater}
                                className={`${quizzes[currentQuizIndex].status === 'flag' ? 'bg-[#F64444] text-white' : 'bg-[#DDDDDD1C] text-gray'}  rounded-md text-sm font-semibold flex gap-2  px-4 py-3 items-center`}
                            >
                                <MdFlag className='text-xl' />Mark for Later
                            </button>

                            {allQuestionsAnswered ? (
                                <button
                                    onClick={handleFinishAssessment}
                                    className='bg-primary rounded-md text-sm font-semibold flex gap-2 text-white px-6 py-3 items-center'
                                >
                                    Finish Assessment
                                </button>
                            ) : submitted ? (
                                <button
                                    onClick={handleNext}
                                    className='bg-primary rounded-md text-sm font-semibold flex gap-2 text-white px-6 py-3 items-center'
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedOption}
                                    className='bg-primary rounded-md text-sm font-semibold flex gap-2 text-white px-6 py-3 items-center disabled:opacity-50'
                                >
                                    {
                                        submiting ?
                                            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                            : 'Submit'
                                    }
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <Modal isOpen={openModal}>
                    {type === 'TEAM' ? (
                        <TeamWon
                            onClose={handleClosePopup}
                            assignmentId={assignmentId}
                            assessmentId={assessmentId}
                        />
                    ) : (
                        <SoloWin
                            totalQuestions={quizzes.length}
                            correctAnswers={quizzes.filter(q => 
                                q.status === 'done' && q.isCorrect
                              ).length}
                            totalPoints={totalPoints}
                            onClose={handleClosePopup}
                            assessmentId={assessmentId}
                            assignmentId={assignmentId}
                        />
                    )}
                </Modal>

                <Modal isOpen={timeUpModal}>
                    <TimeUpModal handleFinishAssessment={handleFinishAssessment} />
                </Modal>
            </div>
        </div>
    );
};

export default Game;