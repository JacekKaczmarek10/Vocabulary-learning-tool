import React, { useState, useEffect, createContext } from 'react';
import QuizContext from './QuizContext'; // Ensure this path is correct

const QuizProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [grade, setGrade] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                // Replace with actual API call
                // const data = await getQuestions();
                const data = []; // Placeholder for actual data
                setQuestions(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const submitAnswers = async (answers) => {
        try {
            // Replace with actual API call
            // const grade = await gradeAnswers(answers);
            const grade = 0; // Placeholder for actual grade
            setGrade(grade);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <QuizContext.Provider value={{ questions, answers, setAnswers, grade, submitAnswers, loading, error }}>
            {children}
        </QuizContext.Provider>
    );
};

export { QuizProvider };