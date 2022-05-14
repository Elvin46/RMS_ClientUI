import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </Router>
);

