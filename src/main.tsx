import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { CssVarsProvider } from '@mui/joy/styles';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import './index.css';
import store from './store';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense fallback={<div>abc</div>}>
    <CssVarsProvider theme={theme}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </CssVarsProvider>
  </Suspense>
);
