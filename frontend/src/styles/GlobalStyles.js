import { GlobalStyles as MUIGlobalStyles } from '@mui/system';

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

const GlobalStyles = () => (
    <MUIGlobalStyles
        styles={{
            // Reset some default styles
            'html, body': {
                margin: 0,
                padding: 0,
                height: '100%',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            },
            // Add keyframes for fadeIn animation
            '@keyframes fadeIn': fadeIn,
        }}
    />
);

export default GlobalStyles;