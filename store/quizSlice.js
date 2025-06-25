import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
    currentQuizIndex: 0,
    selectedOptions: {},
    submitted: false,
    loading: true,
    allQuestionsAnswered: false,
    currentQuizSetId: null,
    currentAssignmentId: null,
    completedSoloAssessments: [], // Track completed solo assessment IDs
};

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        initializeQuizzes: (state, action) => {
            const { data, quizSetId, assignmentId, type } = action.payload;

            // Reset state for a new game session
            state.quizzes = data.map(quiz => ({
                id: quiz._id,
                question: quiz.question.questionTitle,
                options: quiz.question.options,
                status: quiz.status || 'not_started', // Use status from data
                correctOption: quiz.question.correctOption,
                points: quiz.question.points,
                questionType: quiz.question.questionType,
                correctMessage: quiz.question.correctMessage,
                wrongMessage: quiz.question.wrongMessage,
                realLifeExample: quiz.realLifeExample,
                recommendations: quiz.recommendations,
                isCorrect: quiz.isCorrect || false,
                pointsEarned: quiz.pointsEarned || 0,
                userAnswer: quiz.userAnswer || [],
            }));

            // Initialize selected options from data
            state.selectedOptions = data.reduce((acc, quiz) => {
                if (quiz.userAnswer && quiz.userAnswer.length > 0) {
                    acc[quiz._id] = quiz.userAnswer;
                }
                return acc;
            }, {});

            // Set currentQuizIndex to the first "not_started" or "flag" quiz
            const firstUnansweredIndex = state.quizzes.findIndex(
                quiz => quiz.status === 'not_started' || quiz.status === 'flag'
            );
            state.currentQuizIndex = firstUnansweredIndex !== -1 ? firstUnansweredIndex : 0;

            state.currentQuizSetId = quizSetId;
            state.currentAssignmentId = assignmentId;
            state.allQuestionsAnswered = state.quizzes.every(quiz => quiz.status === 'done');
            state.submitted = false;
            state.loading = false;

            // If solo mode, track the assessmentId to prevent replay
            if (type === 'SOLO' && !state.completedSoloAssessments.includes(data[0].assessmentId)) {
                state.completedSoloAssessments.push(data[0].assessmentId);
            }
        },

        selectOption: (state, action) => {
            const { quizId, option, questionType } = action.payload;

            if (questionType === 'multiple_choice') {
                state.selectedOptions[quizId] = state.selectedOptions[quizId] || [];
                const optionIndex = state.selectedOptions[quizId].indexOf(option);

                if (optionIndex === -1) {
                    state.selectedOptions[quizId].push(option);
                } else {
                    state.selectedOptions[quizId].splice(optionIndex, 1);
                }
            } else {
                state.selectedOptions[quizId] = option;
            }

            const quizIndex = state.quizzes.findIndex(q => q.id === quizId);
            if (quizIndex !== -1 && state.quizzes[quizIndex].status === 'flag') {
                state.quizzes[quizIndex].status = 'not_started';
            }
        },

        submitQuiz: (state, action) => {
            const quizId = action.payload;
            const quizIndex = state.quizzes.findIndex(q => q.id === quizId);

            if (quizIndex !== -1) {
                const quiz = state.quizzes[quizIndex];
                const selectedOption = state.selectedOptions[quizId];

                const stringCorrectOptions = quiz.correctOption.map(opt => opt.toString());
                const stringUserAnswers = Array.isArray(selectedOption)
                    ? selectedOption.map(ans => ans.toString())
                    : [selectedOption?.toString()].filter(Boolean);

                if (quiz.questionType === 'multiple_choice') {
                    const correctSet = new Set(stringCorrectOptions);
                    const userSet = new Set(stringUserAnswers);
                    quiz.isCorrect = correctSet.size === userSet.size &&
                        [...correctSet].every(opt => userSet.has(opt));
                } else {
                    quiz.isCorrect = stringUserAnswers.length === 1 &&
                        stringCorrectOptions.includes(stringUserAnswers[0]);
                }

                quiz.pointsEarned = quiz.isCorrect ? quiz.points : 0;
                quiz.userAnswer = Array.isArray(selectedOption) ? [...selectedOption] : [selectedOption];
                quiz.status = 'done';
                state.submitted = true;
                state.allQuestionsAnswered = state.quizzes.every(q => q.status === 'done');
            }
        },

        moveToNextQuiz: (state) => {
            let nextQuiz = state.currentQuizIndex + 1;
            while (nextQuiz < state.quizzes.length && state.quizzes[nextQuiz].status === 'done') {
                nextQuiz++;
            }
            if (nextQuiz >= state.quizzes.length) {
                nextQuiz = state.quizzes.findIndex(
                    quiz => quiz.status === 'flag' || quiz.status === 'not_started'
                );
            }
            if (nextQuiz !== -1) {
                state.currentQuizIndex = nextQuiz;
                state.submitted = false;
            }
        },

        moveToPrevQuiz: (state) => {
            let prevQuiz = state.currentQuizIndex - 1;
            while (prevQuiz >= 0 && state.quizzes[prevQuiz].status === 'done') {
                prevQuiz--;
            }
            if (prevQuiz >= 0) {
                state.currentQuizIndex = prevQuiz;
                state.submitted = false;
            }
        },

        markForLater: (state) => {
            const currentQuizId = state.quizzes[state.currentQuizIndex].id;
            const quizIndex = state.quizzes.findIndex(q => q.id === currentQuizId);

            if (quizIndex !== -1 && state.quizzes[quizIndex].status !== 'done') {
                state.quizzes[quizIndex].status = 'flag';
            }
        },

        resetSubmission: (state) => {
            state.submitted = false;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        resetQuizState: () => {
            return initialState;
        },

        resetSelectedOptions: (state) => {
            state.selectedOptions = {};
        },

        markAllQuizzesAsDone: (state) => {
            state.quizzes = state.quizzes.map(quiz => ({
                ...quiz,
                status: 'done'
            }));
            state.allQuestionsAnswered = true;
            state.submitted = true;
        },
    },
});

export const {
    initializeQuizzes,
    selectOption,
    submitQuiz,
    moveToNextQuiz,
    moveToPrevQuiz,
    markForLater,
    resetSubmission,
    resetQuizState,
    setLoading,
    resetSelectedOptions,
    markAllQuizzesAsDone,
} = quizSlice.actions;

export const selectCurrentQuiz = (state) => {
    if (
        state.quiz.loading ||
        state.quiz.quizzes.length === 0 ||
        state.quiz.currentQuizIndex === -1
    ) {
        return null;
    }
    return state.quiz.quizzes[state.quiz.currentQuizIndex] || null;
};

export const selectQuizProgress = (state) => {
    const doneQuizzes = state.quiz.quizzes.filter(quiz => quiz.status === 'done').length;

    const totalPoints = state.quiz.quizzes.reduce((sum, quiz) => {
        if (quiz.status !== 'done') return sum;
        return sum + quiz.pointsEarned;
    }, 0);

    return {
        doneQuizzes,
        totalPoints,
        totalQuizzes: state.quiz.quizzes.length,
    };
};

export default quizSlice.reducer;