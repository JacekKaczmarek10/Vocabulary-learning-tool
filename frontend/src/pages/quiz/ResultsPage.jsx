import React, { useContext } from 'react';
import { Container, Box, Typography, Alert } from '@mui/material';
import QuizContext from '../../context/QuizContext';
import BaseLayout from "../../components/layouts/BaseLayout";

const ResultsPage = () => {
    const { grade, error } = useContext(QuizContext);

    return (
        <BaseLayout>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Quiz Results
                    </Typography>
                    {error ? (
                        <Alert severity="error">
                            Error grading answers: {error.message}
                        </Alert>
                    ) : (
                        <Typography variant="h5" component="p">
                            Your grade is: <strong>{grade}</strong>
                        </Typography>
                    )}
                </Box>
            </Container>
        </BaseLayout>
    );
};

export default ResultsPage;