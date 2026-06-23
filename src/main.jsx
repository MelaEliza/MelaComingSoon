import React from 'react';
import { createRoot } from 'react-dom/client';
import ComingSoonPage from './ComingSoonPage';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode><ComingSoonPage /></React.StrictMode>,
);
