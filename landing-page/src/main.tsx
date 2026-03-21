import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const authBootstrap = window.__PI_AUTH_BOOTSTRAP__ ?? Promise.resolve<'ready'>('ready');

authBootstrap.then((state) => {
  if (state === 'redirected') {
    return;
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
