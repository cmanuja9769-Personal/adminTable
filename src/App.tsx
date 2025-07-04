import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { Header } from './components/layout/Header';
import { ManageReportingFrameworks } from './components/reporting/ManageReportingFrameworks';
import { ManageReportDestinations } from './components/reporting/ManageReportDestinations';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
        },
      },
    },
  },
});

type ModalType = 'frameworks' | 'destinations' | null;

function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleManageFrameworks = () => {
    setActiveModal('frameworks');
  };

  const handleManageDestinations = () => {
    setActiveModal('destinations');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Header
          onManageFrameworks={handleManageFrameworks}
          onManageDestinations={handleManageDestinations}
        />
        
        <Box sx={{ p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh',
              textAlign: 'center'
            }}
          >
            <div>
              <h2>Welcome to Reporting Management System</h2>
              <p>Use the dropdown in the header to manage reporting frameworks and destinations.</p>
            </div>
          </Box>
        </Box>

        {activeModal === 'frameworks' && (
          <ManageReportingFrameworks onClose={handleCloseModal} />
        )}

        {activeModal === 'destinations' && (
          <ManageReportDestinations onClose={handleCloseModal} />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;