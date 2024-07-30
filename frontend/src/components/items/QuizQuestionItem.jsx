import React, { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { styled } from '@mui/system';

const QuizQuestionItem = ({ question, onChange }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        onChange(question.id, e.target.value);
    };

    return (
        <Box>
            <StyledSubtitle variant="h6">{question.content}</StyledSubtitle>
            <StyledTextField
                fullWidth
                variant="outlined"
                placeholder="Enter your answer"
                value={inputValue}
                onChange={handleInputChange}
            />
        </Box>
    );
};

export default QuizQuestionItem;

const StyledTextField = styled(TextField)({
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
    },
});

const StyledSubtitle = styled(Typography)({
    color: '#666',
    marginBottom: '24px',
});