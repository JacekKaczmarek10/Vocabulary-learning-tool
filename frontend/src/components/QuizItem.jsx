import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const QuizItem = ({ quiz }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/quiz/${quiz.id}`);
    };

    return (
        <Paper elevation={3} sx={{ p: 2, mb: 2, cursor: 'pointer' }} onClick={handleClick}>
            <Box>
                <Typography variant="h6" component="h2">
                    {quiz.title}
                </Typography>
                <Typography variant="body1" component="p">
                    {quiz.fullDescription}
                </Typography>
            </Box>
        </Paper>
    );
};

export default QuizItem;