import React from 'react';
import Question from './Question';

const QuestionList = ({ questions }) => {
    return (
        <div>
            {questions.map((question, index) => (
                <Question key={index} question={question} />
            ))}
        </div>
    );
};

export default QuestionList;