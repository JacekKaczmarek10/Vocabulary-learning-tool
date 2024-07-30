import React, { useEffect, useState } from 'react';
import quizService from '../../services/QuizService';
import { CircularProgress, Box, Typography } from '@mui/material';
import QuizItem from '../items/QuizItem';
import { styled } from '@mui/system';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await quizService.getAllQuizzes();
                setQuizzes(data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) {
        return (
            <StyledContainer>
                <CircularProgress />
                <StyledSubtitle variant="h6" sx={{ mt: 2 }}>Loading quizzes...</StyledSubtitle>
            </StyledContainer>
        );
    }

    if (quizzes.length === 0) {
        return (
            <StyledContainer>
                <StyledSubtitle variant="h6">No quizzes available.</StyledSubtitle>
            </StyledContainer>
        );
    }

    return (
        <StyledContainer>
            {quizzes.map(quiz => (
                <QuizItem key={quiz.id} quiz={quiz} />
            ))}
        </StyledContainer>
    );
};

export default QuizList;

const StyledContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing(2),
}));

const StyledSubtitle = styled(Typography)({
    color: '#666',
    marginBottom: '24px',
});