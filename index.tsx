import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Self-hosted fonts: no Google Fonts request, no FOUC, and the site keeps
// its typography on networks that block third-party font CDNs.
// Latin subsets only — the full family also emits Cyrillic/Greek/Vietnamese
// faces this site will never render, and each one is a file in the repo.
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-600.css';
import '@fontsource/ibm-plex-mono/latin-400-italic.css';
// Korean subset only — Latin is already covered by Plex Mono, and the full
// family ships ~100 subset declarations we would never use.
import '@fontsource/nanum-gothic-coding/korean-400.css';

import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
