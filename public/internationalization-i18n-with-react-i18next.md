# Internationalization (i18n) with react-i18next

## Introduction

Internationalization (abbreviated as **i18n**, where "18" is the number of letters between "i" and "n") is the process of designing and preparing your application so it can be adapted to various languages and regions without engineering changes.

**react-i18next** is a powerful internationalization framework for React, built on top of the popular **i18next** library. It provides the tools you need to translate your application's content into multiple languages and manage those translations effectively.

## Core Concepts

*   **Translation Files**: You store your translated strings in JSON files, typically organized by language and namespace.
*   **`i18n` instance**: You initialize an `i18n` instance with your translation resources and configuration.
*   **`I18nextProvider`**: A React Context provider that makes the `i18n` instance and translation functions available throughout your component tree.
*   **`useTranslation` hook**: The primary hook used in your components to get the translation function (`t`) and the current language.

## Code Example

Here's how to set up a simple application with English and Spanish translations.

### 1. Set up Translation Files

Create a `locales` directory in your `public` folder.
```
public/
└── locales/
    ├── en/
    │   └── translation.json
    └── es/
        └── translation.json
```

**public/locales/en/translation.json**
```json
{
  "welcome": "Welcome to our Application",
  "greeting": "Hello, {{name}}!"
}
```

**public/locales/es/translation.json**
```json
{
  "welcome": "Bienvenido a nuestra Aplicación",
  "greeting": "¡Hola, {{name}}!"
}
```

### 2. Initialize i18next

Create a file to configure and initialize the i18next instance.

```javascript
// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // Use the HTTP backend to load translations from your /public folder
  .use(Backend)
  // Detect user language automatically (e.g., from browser settings)
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    fallbackLng: 'en', // Use English if the detected language is not available
    debug: true, // Log info to console in development
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n;
```

### 3. Use in React Components

Wrap your app in a provider and use the `useTranslation` hook.

```jsx
// main.jsx
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n'; // Import the i18n configuration

const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap App in Suspense for lazy loading translations
root.render(
  <Suspense fallback="loading...">
    <App />
  </Suspense>
);

// App.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const username = "Alice";

  return (
    <div>
      <nav>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('es')}>Español</button>
      </nav>
      
      {/* Use the `t` function to get the translated string */}
      <h1>{t('welcome')}</h1>
      
      {/* Pass variables for interpolation */}
      <p>{t('greeting', { name: username })}</p>
    </div>
  );
}
```
When you click the language buttons, `i18n.changeLanguage` will update the language, and react-i18next will automatically re-render your components with the new translations. The `i18next-http-backend` will fetch the appropriate JSON file on demand.

react-i18next provides a comprehensive solution for building multi-lingual React applications, handling everything from simple text to complex pluralization and formatting.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://react.i18next.com/getting-started" target="_blank" rel="noopener noreferrer">react-i18next Official Documentation</a></li>
  <li><a href="https://www.i18next.com/overview/getting-started" target="_blank" rel="noopener noreferrer">i18next Documentation</a></li>
</ul>
</div>