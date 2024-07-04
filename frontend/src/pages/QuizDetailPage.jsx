import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, CircularProgress, Button, Paper } from '@mui/material';
import BaseLayout from '../components/BaseLayout';
import QuizQuestion from '../components/QuizQuestion'; // Ensure correct import path
import quizService from '../services/QuizService'; // Ensure correct import path
import questionService from "../services/QuestionService"; // Ensure correct import path

const QuizDetailPage = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quizResults, setQuizResults] = useState([]);

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
            const response = await quizService.gradeQuiz(id, questions);
            console.log('Quiz submitted successfully:', response);
            setQuizResults(response); // Store the quiz results from the API response
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (quizResults.length > 0) {
        return (
            <BaseLayout>
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Quiz Results
                    </Typography>
                    <Paper sx={{ p: 2, mb: 2 }}>
                        {quizResults.map((result, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                    Question {result.questionId}:
                                </Typography>
                                <Typography variant="body2">
                                    Your Answer: {result.userAnswer}
                                </Typography>
                                <Typography variant="body2" sx={{ color: result.result === 'Correct' ? 'green' : 'red' }}>
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
                        <QuizQuestion
                            key={question.id}
                            question={question}
                            onChange={handleAnswerChange}
                        />
                    ))
                ) : (
                    <Typography variant="body1">No questions available for this quiz.</Typography>
                )}
                <Box sx={{ mt: 3 }}>
                    <Button variant="contained" color="primary" onClick={handleSubmitQuiz}>
                        Submit Quiz
                    </Button>
                </Box>
            </Container>
        </BaseLayout>
    );
};

export default QuizDetailPage;