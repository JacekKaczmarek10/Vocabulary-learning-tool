import React from 'react';
import QuestionItem from '../items/QuestionItem';
import { Box, Divider } from '@mui/material';
import { styled } from '@mui/system';

const QuestionList = ({ questions }) => {
    return (
        <StyledContainer>
            {questions.map((question, index) => (
                <React.Fragment key={index}>
                    <QuestionItem question={question} />
                    {index < questions.length - 1 && <StyledDivider />}
                </React.Fragment>
            ))}
        </StyledContainer>
    );
};

export default QuestionList;

// Styled components
const StyledContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    margin: theme.spacing(2, 0),
}));