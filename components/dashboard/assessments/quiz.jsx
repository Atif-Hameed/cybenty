'use client'
import React, { useState } from 'react';

const quizzes = [
    {
        id: 1,
        question: "How many devices do you own?",
        options: ["1-3", "4-6", "8-12"],
    },
    {
        id: 2,
        question: "What is your primary use for these devices?",
        options: ["Work", "Entertainment", "Education"],
    },
    {
        id: 3,
        question: "How often do you update your devices?",
        options: ["Regularly", "Occasionally", "Rarely"],
    },
    // Add more quizzes as needed
];

const QuizProgress = ({ current, total, completed, flagged }) => {
    return (
        <div className="flex justify-between mb-4">
            {Array.from({ length: total }, (_, i) => (
                <div
                    key={i}
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${completed.includes(i + 1)
                            ? "border-green-500"
                            : flagged.includes(i + 1)
                                ? "border-yellow-500"
                                : i + 1 === current
                                    ? "border-blue-500"
                                    : "border-gray-300"
                        }`}
                >
                    {i + 1}
                </div>
            ))}
        </div>
    );
};

const Quiz = ({ quiz, onAnswer, onFlag }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleAnswer = () => {
        if (selectedOption !== null) {
            onAnswer(selectedOption);
        }
    };

    return (
        <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">{quiz.question}</h2>
            <div className="space-y-2">
                {quiz.options.map((option, index) => (
                    <button
                        key={index}
                        className={`w-full p-2 border rounded ${selectedOption === index ? "bg-blue-500 text-white" : "bg-white"
                            }`}
                        onClick={() => setSelectedOption(index)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <div className="mt-4 flex justify-between">
                <button
                    className="p-2 bg-yellow-500 text-white rounded"
                    onClick={onFlag}
                >
                    Flag for Later
                </button>
                <button
                    className="p-2 bg-blue-500 text-white rounded"
                    onClick={handleAnswer}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const QuizApp = () => {
    const [currentQuiz, setCurrentQuiz] = useState(1);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const [flaggedQuizzes, setFlaggedQuizzes] = useState([]);

    const handleAnswer = (selectedOption) => {
        setCompletedQuizzes([...completedQuizzes, currentQuiz]);
        setCurrentQuiz(currentQuiz + 1);
    };

    const handleFlag = () => {
        setFlaggedQuizzes([...flaggedQuizzes, currentQuiz]);
        setCurrentQuiz(currentQuiz + 1);
    };

    const currentQuizData = quizzes.find((quiz) => quiz.id === currentQuiz);

    return (
        <div className="p-4">
            <QuizProgress
                current={currentQuiz}
                total={quizzes.length}
                completed={completedQuizzes}
                flagged={flaggedQuizzes}
            />
            {currentQuizData ? (
                <Quiz
                    quiz={currentQuizData}
                    onAnswer={handleAnswer}
                    onFlag={handleFlag}
                />
            ) : (
                <div className="text-center">All quizzes completed!</div>
            )}
        </div>
    );
};

export default QuizApp;