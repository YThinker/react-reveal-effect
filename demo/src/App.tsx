import './App.css';
import PageHeader from './components/PageHeader/PageHeader';
import Hr from './components/Hr/Hr';
import AdjustableDemo from './components/AdjustableDemo/AdjustableDemo';
import { createTheme, ThemeProvider } from '@mui/material';

const App = () => (
  <ThemeProvider theme={createTheme({
    palette: { mode: "dark", },
  })}>
    <PageHeader />
    <Hr />
    <AdjustableDemo />
    <Hr />
  </ThemeProvider>
);

export default App;
