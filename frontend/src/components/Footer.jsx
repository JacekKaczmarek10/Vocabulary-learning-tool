import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'primary.main', p: 3, color: 'white', position: 'fixed', bottom: 0, width: '100%' }}>
            <Container maxWidth="lg">
                <Typography variant="body1" align="center">
                    © 2024 Quiz App. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;