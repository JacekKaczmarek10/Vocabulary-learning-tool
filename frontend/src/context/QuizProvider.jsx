import React, { useState, useEffect, createContext } from 'react';
//import { getQuestions, gradeAnswers } from '../api/quizApi';
import QuizContext from "./QuizContext";

const QuizProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [grade, setGrade] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchQuestions = async () => {
    //         try {
    //             setLoading(true);
    //             const data = await getQuestions();
    //             setQuestions(data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchQuestions();
    // }, []);

    // const submitAnswers = async (answers) => {
    //     try {
    //         const grade = await gradeAnswers(answers);
    //         setGrade(grade);
    //     } catch (error) {
    //         setError(error);
    //     }
    // };

    // return (
    //     <QuizContext.Provider value={{ questions, answers, setAnswers, grade, submitAnswers, loading, error }}>
    //         {children}
    //     </QuizContext.Provider>
    // );
};

export { QuizProvider };