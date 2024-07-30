import React from 'react';
import { Box, Typography, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import quizService from '../../services/QuizService'; // Upewnij się, że ścieżka jest poprawna

const QuizItem = ({ quiz, onDelete }) => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClick = () => {
        navigate(`/quiz/${quiz.id}`);
    };

    const handleDeleteClick = (event) => {
        event.stopPropagation(); // Zapobiega propagacji kliknięcia do Paper
        setOpenDialog(true); // Otwiera dialog potwierdzenia
    };

    const handleConfirmDelete = async () => {
        try {
            await quizService.deleteQuiz(quiz.id); // Wywołuje metodę serwisu do usuwania
            if (onDelete) onDelete(quiz.id); // Informuje rodzica, że quiz został usunięty
        } catch (error) {
            console.error('Error deleting quiz:', error);
        } finally {
            setOpenDialog(false); // Zamknięcie dialogu
        }
    };

    const handleCancelDelete = () => {
        setOpenDialog(false); // Zamknięcie dialogu
    };

    return (
        <StyledPaper elevation={3} onClick={handleClick}>
            <StyledContent>
                <Typography variant="h6" component="h2" sx={{ color: '#333' }}>
                    {quiz.title}
                </Typography>
                <Typography variant="body2" component="p" sx={{ color: '#666' }}>
                    {quiz.fullDescription}
                </Typography>
            </StyledContent>
            <StyledDeleteButton onClick={handleDeleteClick}>
                <DeleteIcon />
            </StyledDeleteButton>
            <Dialog open={openDialog} onClose={handleCancelDelete}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this quiz?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </StyledPaper>
    );
};

export default QuizItem;

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'relative', // Umożliwia pozycjonowanie przycisku w obrębie Paper
    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
}));

const StyledContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
});

const StyledDeleteButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    color: theme.palette.error.main,
    transition: 'color 0.3s ease',
    '&:hover': {
        color: theme.palette.error.dark,
    },
}));