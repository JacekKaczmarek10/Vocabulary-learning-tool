import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import BaseLayout from "../components/BaseLayout"; // Ensure correct path
import QuizList from '../components/QuizList'; // Ensure correct path

const QuizzesPage = () => {
    return (
        <div>
            <BaseLayout>
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h3" component="h1" gutterBottom>
                            Available Quizzes
                        </Typography>
                    </Box>
                    <QuizList />
                </Container>
            </BaseLayout>
        </div>
    );
};

export default QuizzesPage;