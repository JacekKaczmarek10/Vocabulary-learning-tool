import React, { useContext } from 'react';
import QuizContext from '../context/QuizContext';
import QuestionList from '../components/QuestionList';
import AnswerForm from '../components/AnswerForm';
import BaseLayout from "../components/BaseLayout";

const QuizPage = () => {
    const { questions, submitAnswers, loading, error } = useContext(QuizContext);

    const handleSubmit = (answers) => {
        submitAnswers(answers);
    };

    if (loading) return <p>Loading questions...</p>;
    if (error) return <p>Error loading questions: {error.message}</p>;

    return (
        <BaseLayout>
            <div>
                <h1>Quiz</h1>
                <QuestionList questions={questions}/>
                <AnswerForm onSubmit={handleSubmit}/>
            </div>
        </BaseLayout>
    );
};

export default QuizPage;