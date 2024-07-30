import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Container, Box, Typography, CircularProgress, Button, Paper, TextField} from '@mui/material';
import BaseLayout from '../../components/layouts/BaseLayout';
import QuizQuestionItem from '../../components/items/QuizQuestionItem'; // Ensure correct import path
import quizService from '../../services/QuizService'; // Ensure correct import path
import questionService from '../../services/QuestionService'; // Ensure correct import path
import { styled } from '@mui/system';

const QuizDetailPage = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quizResults, setQuizResults] = useState(null); // Change to null initially

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await questionService.getAllQuestionsByQuizId(id);
                // Initialize questions with userAnswer as empty string
                const initialQuestions = data.map(question => ({
                    ...question,
                    userAnswer: '',
                }));
                setQuestions(initialQuestions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [id]);

    const handleAnswerChange = (questionId, answer) => {
        const updatedQuestions = questions.map((q) =>
            q.id === questionId ? { ...q, userAnswer: answer } : q
        );
        setQuestions(updatedQuestions);
    };

    const handleSubmitQuiz = async () => {
        try {
            // Map questions to AnswerDto format
            const answers = questions.map(question => ({
                questionId: question.id,
                content: question.userAnswer,
            }));
            const response = await quizService.gradeQuiz(id, answers); // Send answers as parameter
            console.log('Quiz submitted successfully:', response);
            setQuizResults(response); // Store the quiz results from the API response
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    if (loading) {
        return (
            <BaseLayout>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{ mt: 2 }}>Loading questions...</Typography>
                </Box>
            </BaseLayout>
        );
    }

    if (quizResults) { // Check if quizResults is not null
        return (
            <BaseLayout>
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Quiz Results
                    </Typography>
                    <Paper sx={{ p: 3, mb: 2, backgroundColor: '#f9f9f9' }}>
                        {quizResults.map((result, index) => (
                            <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid', borderRadius: 1, borderColor: '#ddd' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Question {result.questionId}:
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Your Answer: {result.userAnswer}
                                </Typography>
                                <Typography variant="body2" sx={{ color: result.result === 'Correct' ? 'green' : 'red', mb: 1 }}>
                                    Correct Answer: {result.correctAnswer}
                                </Typography>
                                <Typography variant="body2">
                                    Result: {result.result}
                                </Typography>
                            </Box>
                        ))}
                    </Paper>
                </Container>
            </BaseLayout>
        );
    }

    return (
        <BaseLayout>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Quiz Questions
                </Typography>
                {questions.length > 0 ? (
                    questions.map((question) => (
                        <QuizQuestionItem
                            key={question.id}
                            question={question}
                            onChange={handleAnswerChange}
                        />
                    ))
                ) : (
                    <Typography variant="body1">No questions available for this quiz.</Typography>
                )}
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <StyledButton variant="contained" color="primary" onClick={handleSubmitQuiz}>
                        Submit Quiz
                    </StyledButton>
                </Box>
            </Container>
        </BaseLayout>
    );
};

export default QuizDetailPage;

// Styled components
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
    '&:hover': {
        boxShadow: '0 15px 20px rgba(0, 0, 0, 0.3)',
        transform: 'translateY(-5px)',
    },
    '&:active': {
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
        transform: 'translateY(-2px)',
    },
});