import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';
import logo from '../../assets/logo.png';

const Header = () => {
    return (
        <StyledAppBar position="static">
            <StyledToolbar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StyledLogo component={RouterLink} to="/">
                        <img src={logo} alt="Logo" style={{ width: '40px', height: 'auto' }} />
                    </StyledLogo>
                    <Typography variant="h6" sx={{ ml: 2, color: 'text.primary', fontWeight: 'bold' }}>
                        Quiz App
                    </Typography>
                </Box>
                <Box >
                    <StyledButton component={RouterLink} to="/">
                        Home
                    </StyledButton>
                    <StyledButton component={RouterLink} to="/quizzes">
                        Quizzes
                    </StyledButton>
                    <StyledButton component={RouterLink} to="/about">
                        About
                    </StyledButton>
                </Box>
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default Header;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    justifyContent: 'space-between'
}));

const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '16px',
    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
    },
}));

const StyledLogo = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
});