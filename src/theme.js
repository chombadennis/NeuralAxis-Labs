import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00F2FE', // Neon Cyan
      light: '#70F5FF',
      dark: '#00A8B5',
      contrastText: '#070913',
    },
    secondary: {
      main: '#9C27B0', // Electric Purple
      light: '#D05CE3',
      dark: '#6A0080',
      contrastText: '#ffffff',
    },
    error: {
      main: '#E67E22', // Warm Orange/Amber instead of red
    },
    background: {
      default: '#070913', // Deep Navy
      paper: '#0F1225', // Dark Slate Indigo
    },
    text: {
      primary: '#ffffff',
      secondary: '#A0AEC0', // Soft grey
    },
  },
  typography: {
    fontFamily: '"Inter", "Lexend", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Lora", serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontFamily: '"Lora", serif',
      fontWeight: 700,
      letterSpacing: '-0.005em',
    },
    h3: {
      fontFamily: '"Lora", serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Lora", serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Lora", serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Lora", serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Lexend", "Outfit", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          padding: '8px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #00F2FE 0%, #00C9FF 100%)',
          color: '#070913', // Deep Navy for high contrast & readability
          boxShadow: '0 4px 20px rgba(0, 242, 254, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #00C9FF 0%, #00F2FE 100%)',
            boxShadow: '0 6px 24px rgba(0, 242, 254, 0.5)',
          },
        },
        outlinedPrimary: {
          borderColor: '#00F2FE',
          '&:hover': {
            borderColor: '#70F5FF',
            backgroundColor: 'rgba(0, 242, 254, 0.05)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove default MUI overlay gradient
          backgroundColor: 'rgba(15, 18, 37, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          borderRadius: '16px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(7, 9, 19, 0.5)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 242, 254, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00F2FE',
              boxShadow: '0 0 10px rgba(0, 242, 254, 0.2)',
            },
          },
        },
      },
    },
  },
});

export default theme;
