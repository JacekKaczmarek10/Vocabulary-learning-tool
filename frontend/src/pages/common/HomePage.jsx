import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import BaseLayout from '../../components/layouts/BaseLayout';
import { styled } from '@mui/system';

const HomePage = () => {
    const titleAnimation = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 500 });
    const textAnimation = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 1000 });

    return (
        <BaseLayout>
            <StyledContainer maxWidth="md" sx={{ mt: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <animated.div style={titleAnimation}>
                        <StyledTitle variant="h3" component="h1" gutterBottom>
                            Welcome to the Quiz App
                        </StyledTitle>
                    </animated.div>
                    <animated.div style={textAnimation}>
                        <StyledSubtitle variant="h5" component="p" gutterBottom>
                            Test your knowledge with our fun and interactive quizzes.
                        </StyledSubtitle>
                    </animated.div>
                    <StyledButton
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/quizzes"
                    >
                        Start Quiz
                    </StyledButton>
                </Box>
            </StyledContainer>
        </BaseLayout>
    );
};

export default HomePage;

const StyledContainer = styled(Container)({
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    animation: 'fadeIn 1s ease-in-out',
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