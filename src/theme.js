import { createTheme } from '@mui/material/styles';

// Design System Moderno - Tema Elegante Preto e Dourado
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D4AF37', // Dourado principal
      light: '#FFD700', // Dourado claro
      dark: '#B8860B', // Dourado escuro
      contrastText: '#000000',
    },
    secondary: {
      main: '#FFD700', // Dourado secundário
      light: '#FFF8DC', // Dourado muito claro
      dark: '#B8860B', // Dourado escuro
      contrastText: '#000000',
    },
    background: {
      default: '#0F0F0F', // Preto suave
      paper: '#1A1A1A', // Cinza escuro para cards
      elevated: '#242424', // Cinza médio para elementos elevados
    },
    surface: {
      main: '#1A1A1A',
      light: '#242424',
      dark: '#0F0F0F',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E0E0E0',
      disabled: '#9E9E9E',
      hint: '#757575',
    },
    error: {
      main: '#F44336',
      light: '#FFCDD2',
      dark: '#D32F2F',
    },
    warning: {
      main: '#FF9800',
      light: '#FFE0B2',
      dark: '#F57C00',
    },
    info: {
      main: '#2196F3',
      light: '#BBDEFB',
      dark: '#1976D2',
    },
    success: {
      main: '#4CAF50',
      light: '#C8E6C9',
      dark: '#388E3C',
    },
    divider: '#424242',
    action: {
      active: '#D4AF37',
      hover: 'rgba(212, 175, 55, 0.08)',
      selected: 'rgba(212, 175, 55, 0.12)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#D4AF37',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#D4AF37',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#FFD700',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#FFD700',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#FFFFFF',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#FFFFFF',
    },
    body1: {
      fontSize: '1rem',
      color: '#FFFFFF',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#B0B0B0',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '0.95rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)',
          },
        },
        containedPrimary: {
          backgroundColor: '#D4AF37',
          color: '#000000',
          fontWeight: 700,
          '&:hover': {
            backgroundColor: '#B8860B',
            boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)',
          },
        },
        outlinedPrimary: {
          borderColor: '#D4AF37',
          color: '#D4AF37',
          borderWidth: '2px',
          '&:hover': {
            borderColor: '#FFD700',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            borderWidth: '2px',
          },
        },
        textPrimary: {
          color: '#D4AF37',
          '&:hover': {
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1A1A1A',
          border: '2px solid #D4AF37',
          borderRadius: 16,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(20px)',
        },
        paperFullScreen: {
          backgroundColor: '#1A1A1A',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: '#D4AF37',
          fontWeight: 700,
          fontSize: '1.5rem',
          padding: '24px 24px 16px 24px',
          borderBottom: '1px solid #424242',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          color: '#FFFFFF',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px 24px 24px',
          gap: '12px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
          border: '1px solid #424242',
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(212, 175, 55, 0.2)',
            borderColor: '#D4AF37',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#242424',
            borderRadius: 12,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': {
              borderColor: '#424242',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#D4AF37',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#D4AF37',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#E0E0E0',
            '&.Mui-focused': {
              color: '#D4AF37',
            },
          },
          '& .MuiInputBase-input': {
            color: '#FFFFFF',
            '&::placeholder': {
              color: '#9E9E9E',
              opacity: 1,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#242424',
          borderRadius: 12,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#424242',
            borderWidth: '2px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D4AF37',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D4AF37',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          borderBottom: '2px solid #D4AF37',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0A0A0A',
          borderRight: '1px solid #333333',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(212, 175, 55, 0.2)',
            borderRight: '3px solid #D4AF37',
            '&:hover': {
              backgroundColor: 'rgba(212, 175, 55, 0.3)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-colorSuccess': {
            backgroundColor: '#00C851',
            color: '#FFFFFF',
          },
          '&.MuiChip-colorWarning': {
            backgroundColor: '#FF8800',
            color: '#000000',
          },
          '&.MuiChip-colorError': {
            backgroundColor: '#FF4444',
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #333333',
          color: '#FFFFFF',
        },
        head: {
          backgroundColor: '#0A0A0A',
          color: '#D4AF37',
          fontWeight: 600,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.3)',
    '0px 4px 8px rgba(0, 0, 0, 0.3)',
    '0px 8px 16px rgba(0, 0, 0, 0.3)',
    ...Array(21).fill('0px 16px 32px rgba(0, 0, 0, 0.3)'),
  ],
});
