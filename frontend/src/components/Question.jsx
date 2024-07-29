import React from 'react';

const Question = ({ question }) => {
    return (
        <div>
            <h2>{question.text}</h2>
            {/* Render options if applicable */}
        </div>
    );
};

export default Question;