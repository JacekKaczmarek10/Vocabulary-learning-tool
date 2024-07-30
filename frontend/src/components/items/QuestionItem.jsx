import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';

const QuestionItem = ({ question }) => {
    return (
        <StyledContainer>
            <Typography variant="h4" component="h2" gutterBottom>
                {question.text}
            </Typography>
            {question.options && question.options.length > 0 && (
                <StyledList>
                    {question.options.map((option, index) => (
                        <StyledListItem key={index}>
                            <ListItemText primary={option} />
                        </StyledListItem>
                    ))}
                </StyledList>
            )}
        </StyledContainer>
    );
};

export default QuestionItem;

// Styled components
const StyledContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(3),
    margin: theme.spacing(2, 0),
}));

const StyledList = styled(List)(({ theme }) => ({
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    backgroundColor: theme.palette.grey[100],
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
        backgroundColor: theme.palette.grey[200],
    },
}));