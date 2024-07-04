import React, { useEffect, useState } from 'react';
import quizService from '../services/QuizService'; // Ensure correct path to the service
import { CircularProgress, Box } from '@mui/material';
import QuizItem from './QuizItem';

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
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {quizzes.map(quiz => (
                <QuizItem key={quiz.id} quiz={quiz} />
            ))}
        </Box>
    );
};

export default QuizList;