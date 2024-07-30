import React from 'react';
import { Container, Box } from '@mui/material';
import Header from "../common/Header";

const BaseLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flex: 1, display: 'flex', justifyContent: 'center', mt: 10 }}>
                <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {children}
                </Container>
            </Box>
        </Box>
    );
};

export default BaseLayout;