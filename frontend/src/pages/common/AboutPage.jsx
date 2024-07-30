import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import BaseLayout from "../../components/layouts/BaseLayout"; // Ensure correct path
import { styled } from '@mui/system';

const AboutPage = () => {
    return (
        <BaseLayout>
            <StyledContainer maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Box>
                    <StyledTitle variant="h3" component="h1" gutterBottom>
                        About Quiz App
                    </StyledTitle>
                    <StyledSubtitle variant="h5" component="p" gutterBottom sx={{ color: 'text.secondary' }}>
                        Quiz App is a platform where you can test your knowledge across various topics.
                    </StyledSubtitle>
                    <StyledSubtitle variant="body1" component="p" sx={{ mt: 2, lineHeight: 1.6 }}>
                        Our platform provides a wide range of quizzes to challenge and improve your skills.
                        Whether you're interested in general knowledge, science, history, or other subjects,
                        you'll find quizzes that suit your interests. Join us and discover how much you really know!
                    </StyledSubtitle>
                </Box>
            </StyledContainer>
        </BaseLayout>
    );
};

export default AboutPage;

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