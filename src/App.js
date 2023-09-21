import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import './App.css';
import {theme} from './Theme'
import Test from './Test';
import Dashboard from './layouts/Dashboard';
import Landing from './layouts/Landing/Landing';
import Router from './routes';
import { SnackbarProvider } from 'notistack';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';



function App() {
  

  return (
    <div >
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <SnackbarProvider
           autoHideDuration={3000}
           anchorOrigin={{
             vertical: 'top',
             horizontal: 'center'
           }}
          >
            <ErrorBoundary>
            <Router /> 
            </ErrorBoundary>
          </SnackbarProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
