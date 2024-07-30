import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from '@mui/material';
import BaseLayout from '../../components/layouts/BaseLayout';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import quizService from '../../services/QuizService'; // Ensure correct import path
import questionService from '../../services/QuestionService'; // Ensure correct import path
import { styled } from '@mui/system';
import { useParams } from "react-router-dom";

const QuizEditPage = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [deletingQuiz, setDeletingQuiz] = useState(false);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const quizData = await quizService.getQuizById(id);
                const questionsData = quizData.questions;
                setQuiz(quizData);
                setQuestions(questionsData);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [id]);

    const handleQuizChange = (e) => {
        setQuiz({
            ...quiz,
            [e.target.name]: e.target.value,
        });
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { content: '', answer: '' }]);
    };

    const handleRemoveQuestion = (index) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    const handleSaveQuiz = async () => {
        try {
            await quizService.updateQuiz(id, quiz);
            await Promise.all(
                questions.map((question) =>
                    questionService.updateQuestion(question.id, question)
                )
            );
            alert('Quiz updated successfully!');
        } catch (error) {
            console.error('Error saving quiz:', error);
        }
    };

    const handleDeleteQuiz = async () => {
        try {
            setDeletingQuiz(true);
            await quizService.deleteQuiz(id);
            alert('Quiz deleted successfully!');
            // Redirect or update UI accordingly
        } catch (error) {
            console.error('Error deleting quiz:', error);
        } finally {
            setDeletingQuiz(false);
            setOpenConfirmDialog(false);
        }
    };

    const openConfirmDialogHandler = () => {
        setOpenConfirmDialog(true);
    };

    const closeConfirmDialogHandler = () => {
        setOpenConfirmDialog(false);
    };

    if (loading) {
        return (
            <BaseLayout>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{ mt: 2 }}>Loading quiz...</Typography>
                </Box>
            </BaseLayout>
        );
    }

    return (
        <BaseLayout>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Edit Quiz
                </Typography>
                <Box sx={{ mb: 4 }}>
                    <StyledTextField
                        fullWidth
                        label="Quiz Title"
                        variant="outlined"
                        name="title"
                        value={quiz?.title || ''}
                        onChange={handleQuizChange}
                        sx={{ mb: 2 }}
                    />
                    <StyledTextField
                        fullWidth
                        label="Full Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        name="fullDescription"
                        value={quiz?.fullDescription || ''}
                        onChange={handleQuizChange}
                        sx={{ mb: 2 }}
                    />
                    {questions.map((question, index) => (
                        <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <StyledQuestionTitle variant="h6" sx={{ mb: 1 }}>
                                    Question {index + 1}
                                </StyledQuestionTitle>
                                <StyledTextField
                                    fullWidth
                                    label="Question Content"
                                    variant="outlined"
                                    value={question.content}
                                    onChange={(e) => handleQuestionChange(index, 'content', e.target.value)}
                                    sx={{ mb: 1 }}
                                />
                                <StyledTextField
                                    fullWidth
                                    label="Correct Answer"
                                    variant="outlined"
                                    value={question.answer}
                                    onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                                />
                            </Box>
                            {questions.length > 1 && (
                                <StyledIconButton color="error" onClick={() => handleRemoveQuestion(index)}>
                                    <RemoveIcon />
                                </StyledIconButton>
                            )}
                        </Box>
                    ))}
                    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end' }}>
                        <StyledButton
                            variant="contained"
                            color="primary"
                            onClick={handleAddQuestion}
                            startIcon={<AddIcon />}
                            sx={{ mb: 4, mr: 2 }}
                        >
                            Add Question
                        </StyledButton>
                        <StyledButton
                            variant="contained"
                            color="secondary"
                            onClick={handleSaveQuiz}
                            sx={{ mb: 4 }}
                        >
                            Save Quiz
                        </StyledButton>
                        <StyledButton
                            variant="contained"
                            color="error"
                            onClick={openConfirmDialogHandler}
                            startIcon={<DeleteIcon />}
                            sx={{ mb: 4 }}
                        >
                            Delete Quiz
                        </StyledButton>
                    </Box>
                </Box>

                <Dialog
                    open={openConfirmDialog}
                    onClose={closeConfirmDialogHandler}
                >
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <Typography>Are you sure you want to delete this quiz? This action cannot be undone.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeConfirmDialogHandler} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteQuiz}
                            color="error"
                            disabled={deletingQuiz}
                        >
                            {deletingQuiz ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </BaseLayout>
    );
};

export default QuizEditPage;

// Styled components
const StyledTextField = styled(TextField)({
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
    },
});

const StyledButton = styled(Button)({
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    border: 'none',
    borderRadius: '50px',
    color: 'white',
    padding: '12px 24px',
    fontSize: '1em',
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
    '&.MuiButton-containedSecondary': {
        background: 'linear-gradient(135deg, #fcb045, #fd1d1d)',
    },
});

const StyledQuestionTitle = styled(Typography)({
    color: '#333',
    fontWeight: 'bold',
});

const StyledIconButton = styled(IconButton)({
    borderRadius: '50%',
    backgroundColor: '#ffcccc',
    '&:hover': {
        backgroundColor: '#ff9999',
    },
    marginLeft: '16px',
});