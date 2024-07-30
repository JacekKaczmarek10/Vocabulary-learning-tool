import React from 'react';
import { Link } from 'react-router-dom';
import BaseLayout from "../../components/layouts/BaseLayout";
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const NotFoundPage = () => {
    return (
        <BaseLayout>
            <StyledContainer>
                <Typography variant="h1" component="h1" gutterBottom>
                    404 - Page Not Found
                </Typography>
                <Typography variant="h6" component="p" sx={{ mb: 4 }}>
                    Sorry, the page you're looking for does not exist.
                </Typography>
                <StyledLink to="/">Go to Home</StyledLink>
            </StyledContainer>
        </BaseLayout>
    );
};

export default NotFoundPage;

// Styled components
const StyledContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
}));

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    display: 'inline-block',
    padding: theme.spacing(1, 3),
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));