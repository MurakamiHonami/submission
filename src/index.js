import React from 'react';
import { createRoot } from 'react-dom/client';
import Example from './App.jsx'; // App.jsxをインポート

// DOM要素（index.html内の <div id="root">）を取得
const container = document.getElementById('root');
if (container) {
    // React 18以降の新しいAPIを使用してルートを作成し、コンポーネントをレンダリング
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <Example />
        </React.StrictMode>
    );
} else {
    console.error("Root element 'root' not found in the document.");
}
