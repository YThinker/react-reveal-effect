import { StrictMode } from 'react';
import { render } from 'react-dom';
import './index.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { RevealEffectConfig } from './RevealEffect';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: { mode: "dark" }
});

render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <RevealEffectConfig>
            <App />
          </RevealEffectConfig>
        </StyledEngineProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
