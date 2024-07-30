import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import BaseLayout from '../../components/layouts/BaseLayout';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import quizService from '../../services/QuizService'; // Ensure correct import path
import { styled } from '@mui/system';

const AddQuizPage = () => {
    const [title, setTitle] = useState('');
    const [fullDescription, setFullDescription] = useState('');
    const [questions, setQuestions] = useState([
        { content: '', answer: '' }
    ]);

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

    const handleSubmit = async () => {
        try {
            const quizData = {
                title,
                fullDescription,
                questions
            };

            await quizService.addQuiz(quizData);
            // Clear form or redirect as needed
            setTitle('');
            setFullDescription('');
            setQuestions([{ content: '', answer: '' }]);
            alert('Quiz added successfully!');
        } catch (error) {
            console.error('Error adding quiz:', error);
        }
    };

    return (
        <BaseLayout>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <StyledTitle variant="h3" component="h1" gutterBottom>
                        Add a New Quiz
                    </StyledTitle>
                    <StyledSubtitle variant="body1" sx={{ color: 'text.secondary' }}>
                        Fill out the form below to add a new quiz.
                    </StyledSubtitle>
                </Box>
                <Box sx={{ mb: 4 }}>
                    <StyledTextField
                        fullWidth
                        label="Quiz Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <StyledTextField
                        fullWidth
                        label="Full Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={fullDescription}
                        onChange={(e) => setFullDescription(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    {questions.map((question, index) => (
                        <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <StyledQuestionTitle variant="h6" sx={{ mb: 1 }}>
                                    QuestionItem {index + 1}
                                </StyledQuestionTitle>
                                <StyledTextField
                                    fullWidth
                                    label="QuestionItem Content"
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
                            Add QuestionItem
                        </StyledButton>
                        <StyledButton
                            variant="contained"
                            color="secondary"
                            onClick={handleSubmit}
                            sx={{ mb: 4 }}
                        >
                            Submit Quiz
                        </StyledButton>
                    </Box>
                </Box>
            </Container>
        </BaseLayout>
    );
};

export default AddQuizPage;

// Styled components
const StyledTitle = styled(Typography)({
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '16px',
});

const StyledSubtitle = styled(Typography)({
    color: '#666',
    marginBottom: '24px',
});

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
    marginLeft: '16px', // Adjust the spacing between the question form and the remove button
});