import React, { useContext } from 'react';
import QuizContext from '../context/QuizContext';
import BaseLayout from "../components/BaseLayout";

const ResultsPage = () => {
    const { grade, error } = useContext(QuizContext);

    if (error) return <p>Error grading answers: {error.message}</p>;

    return (
        <BaseLayout>
            <div>
                <h1>Quiz Results</h1>
                <p>Your grade is: {grade}</p>
            </div>
        </BaseLayout>
    );
};

export default ResultsPage;