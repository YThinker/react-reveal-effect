import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppBar from './componnets/AppBar';
import Docs from './pages/Docs';
import Home from './pages/Home';

const App = () => (
  <ThemeProvider theme={createTheme({
    palette: { mode: "dark", },
  })}>
    <AppBar />
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
