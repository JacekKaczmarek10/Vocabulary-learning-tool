import React, { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';

const QuizQuestion = ({ question, onChange }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);  // Update the input value state
        onChange(question.id, e.target.value);  // Propagate the change to parent component if needed
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="h6">{question.content}</Typography>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your answer"
                value={inputValue}  // Bind input value state
                onChange={handleInputChange}  // Handle input change
                sx={{ mt: 1 }}
            />
        </Box>
    );
};

export default QuizQuestion;