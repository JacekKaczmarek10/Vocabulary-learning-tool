import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import BaseLayout from '../../components/layouts/BaseLayout';
import QuizList from '../../components/lists/QuizList';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const QuizzesPage = () => {
    const navigate = useNavigate();

    const handleAddQuizClick = () => {
        navigate('/add-quiz');
    };

    return (
        <BaseLayout>
            <StyledContainer maxWidth="md" sx={{ mt: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <StyledTitle variant="h3" component="h1" gutterBottom>
                        Available Quizzes
                    </StyledTitle>
                    <StyledSubtitle variant="body1" sx={{ color: 'text.secondary' }}>
                        Browse through our selection of quizzes and test your knowledge on various topics.
                    </StyledSubtitle>
                </Box>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <StyledButton
                        variant="contained"
                        color="primary"
                        onClick={handleAddQuizClick}
                    >
                        Add New Quiz
                    </StyledButton>
                </Box>
                <StyledSeparator />
                <QuizList />
            </StyledContainer>
        </BaseLayout>
    );
};

export default QuizzesPage;

// Styled components
const StyledContainer = styled(Container)({
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    animation: 'fadeIn 1s ease-in-out',
    marginBottom: '40px', // Add margin to separate from the list
});

const StyledTitle = styled(Typography)({
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '16px',
});

const StyledSubtitle = styled(Typography)({
    color: '#666',
    marginBottom: '24px',
});

const StyledButton = styled(Button)({
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    border: 'none',
    borderRadius: '50px',
    color: 'white',
    padding: '15px 30px',
    fontSize: '1.2em',
    cursor: 'pointer',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    marginTop: '20px',
    '&:hover': {
        boxShadow: '0 15px 20px rgba(0, 0, 0, 0.3)',
        transform: 'translateY(-5px)',
    },
    '&:active': {
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
        transform: 'translateY(-2px)',
    },
});

const StyledSeparator = styled('div')({
    height: '2px',
    background: 'linear-gradient(90deg, #6e8efb, #a777e3)',
    margin: '20px 0',
});

const StyledListContainer = styled(Box)({
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '20px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    marginBottom: '40px',
});