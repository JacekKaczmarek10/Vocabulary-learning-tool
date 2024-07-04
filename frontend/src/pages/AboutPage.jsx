import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import BaseLayout from "../components/BaseLayout"; // Ensure correct path

const AboutPage = () => {
    return (
        <div>
            <BaseLayout>
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" component="h1" gutterBottom>
                            About Quiz App
                        </Typography>
                        <Typography variant="h5" component="p" gutterBottom>
                            Quiz App is a platform where you can test your knowledge across various topics.
                        </Typography>
                    </Box>
                </Container>
            </BaseLayout>
        </div>
    );
};

export default AboutPage;