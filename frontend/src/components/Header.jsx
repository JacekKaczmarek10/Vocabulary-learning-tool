import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Quiz App
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/quizzes">
                        Quizzes
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/about">
                        About
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;