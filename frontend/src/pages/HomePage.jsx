import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'; // Import animate typography from 'react-spring'
import BaseLayout from '../components/BaseLayout'; // Ensure correct path

const HomePage = () => {
    const titleAnimation = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 500 });
    const textAnimation = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 1000 });

    return (
        <div>
            <BaseLayout>
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <animated.div style={titleAnimation}>
                            <Typography variant="h3" component="h1" gutterBottom>
                                Welcome to the Quiz App
                            </Typography>
                        </animated.div>
                        <animated.div style={textAnimation}>
                            <Typography variant="h5" component="p" gutterBottom>
                                Test your knowledge with our fun and interactive quizzes.
                            </Typography>
                        </animated.div>
                        <Button
                            variant="contained"
                            color="primary"
                            component={RouterLink}
                            to="/quizzes"
                            sx={{ mt: 3 }}
                        >
                            Start Quiz
                        </Button>
                    </Box>
                </Container>
            </BaseLayout>
        </div>
    );
};

export default HomePage;