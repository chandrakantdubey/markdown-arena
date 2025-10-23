# State Persistence with Redux Persist

## Introduction

When using a state management library like Redux, the application's state is held in memory. This means that if the user refreshes the page or closes the browser tab, the entire state is lost and resets to its initial values.

**Redux Persist** is a library that solves this problem by saving (persisting) your Redux store to a storage engine, and then rehydrating it when the application loads. This allows your application's state to be saved across user sessions.

The most common storage engine used with Redux Persist is **Local Storage**.

## Core Concepts

*   **Persist Gate**: A React component from Redux Persist that you wrap your application with. It ensures that your UI is not rendered until the persisted state has been retrieved and saved back to Redux (a process called "rehydration").
*   **`persistStore` and `persistReducer`**: Functions used to connect Redux Persist to your Redux store and reducers.
*   **Storage Engines**: Redux Persist can use different storage engines, such as `localStorage`, `sessionStorage`, or even `AsyncStorage` for React Native.
*   **Configuration**: You can configure which parts of your Redux state you want to persist using a `whitelist` or `blacklist`.

## Code Example with Redux Toolkit

Here's how to integrate Redux Persist with a store configured using Redux Toolkit.

```javascript
// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import counterReducer from './counterSlice';
import userReducer from './userSlice';

// 1. Combine your reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

// 2. Create the persist config
const persistConfig = {
  key: 'root', // The key for the root of the storage
  storage,     // The storage engine
  whitelist: ['user'], // OPTIONAL: only the 'user' slice will be persisted
  // blacklist: ['counter'] // OPTIONAL: the 'counter' slice will not be persisted
};

// 3. Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  // This middleware is recommended to avoid non-serializable value errors
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Create a persistor
export const persistor = persistStore(store);
```

Now, in your application's entry point, you use the `PersistGate` to delay rendering until rehydration is complete.

```jsx
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'; // Import from your store setup
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
```

### How It Works:
1.  When the application first loads, the `PersistGate` shows its `loading` prop (which can be a spinner component, but is `null` here) while Redux Persist reads the saved state from Local Storage.
2.  Once the state is retrieved, it "rehydrates" the Redux store with this saved data.
3.  The `PersistGate` then renders your `App` component.
4.  Now, any time the Redux store updates (specifically, the parts you've whitelisted), Redux Persist will automatically save the new state to Local Storage.

This ensures a seamless user experience, as users can refresh the page and find their session (e.g., their login status, shopping cart, or theme preference) exactly as they left it.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://github.com/rt2zz/redux-persist" target="_blank" rel="noopener noreferrer">Redux Persist on GitHub</a></li>
  <li><a href="https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist" target="_blank" rel="noopener noreferrer">Redux Toolkit Docs: Usage with Redux Persist</a></li>
</ul>
</div>