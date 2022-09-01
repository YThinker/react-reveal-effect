import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import { render } from 'react-dom';
import './index.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: { mode: "dark" }
});

// const root = createRoot(document.getElementById('root')!);
// root.render(
//   <StrictMode>
//     <HashRouter>
//       <ThemeProvider theme={theme}>
//         <StyledEngineProvider injectFirst>
//           <App />
//         </StyledEngineProvider>
//       </ThemeProvider>
//     </HashRouter>
//   </StrictMode>
// );

render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
