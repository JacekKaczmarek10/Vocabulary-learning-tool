import React, { useContext } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import QuizContext from '../context/QuizContext'; // Correct import path

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
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                {answers.map((answer, index) => (
                    <Grid item xs={12} key={index}>
                        <TextField
                            fullWidth
                            label={`Answer ${index + 1}`}
                            value={answer || ''}
                            onChange={(e) => handleChange(index, e.target.value)}
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Submit Answers
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AnswerForm;