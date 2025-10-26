import React from 'react';
import { createRoot } from 'react-dom/client';
import Example from './App.jsx';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <Example />
        </React.StrictMode>
    );
} else {
    console.error("Root element 'root' not found in the document.");
}
