import React, { useContext } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { styled } from '@mui/system';
import QuizContext from '../../context/QuizContext'; // Correct import path

const AnswerForm = ({ onSubmit }) => {
    const { answers, setAnswers } = useContext(QuizContext); // Use correct context

    const handleChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(answers);
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {answers.map((answer, index) => (
                    <Grid item xs={12} key={index}>
                        <StyledTextField
                            fullWidth
                            label={`Answer ${index + 1}`}
                            value={answer || ''}
                            onChange={(e) => handleChange(index, e.target.value)}
                            variant="outlined"
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <StyledButton
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Submit Answers
                    </StyledButton>
                </Grid>
            </Grid>
        </StyledForm>
    );
};

export default AnswerForm;

// Styled components
const StyledForm = styled('form')({
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    maxWidth: '500px',
    margin: 'auto',
    animation: 'fadeIn 1s ease-in-out'
});

const StyledTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#6e8efb',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#6e8efb',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ccc',
        },
        '&:hover fieldset': {
            borderColor: '#6e8efb',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6e8efb',
        },
    },
    '& .MuiInputBase-input': {
        transition: 'all 0.3s ease',
    },
});

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
    marginTop: '20px',
    '&:hover': {
        boxShadow: '0 15px 20px rgba(0, 0, 0, 0.3)',
        transform: 'translateY(-5px)',
    },
    '&:active': {
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
        transform: 'translateY(-2px)',
    },
});

// Keyframes for animation
const fadeIn = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const GlobalStyle = styled('style')`
    ${fadeIn}
`;

export const GlobalStyles = () => <GlobalStyle />;