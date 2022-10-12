import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { CssVarsProvider } from '@mui/joy/styles';

import App from './App';
import './index.css';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense fallback={<div>abc</div>}>
    <CssVarsProvider theme={theme}>
      <App />
    </CssVarsProvider>
  </Suspense>
);
