# Managing Cookies with js-cookie

## Introduction

HTTP cookies are small pieces of data that a server sends to the user's web browser. The browser may store the cookie and send it back to the same server with later requests. Cookies are commonly used for:
*   **Session management**: Keeping users logged in.
*   **Personalization**: Storing user preferences like themes or language.
*   **Tracking**: Recording user behavior.

While you can interact with cookies using the native `document.cookie` API, it is notoriously cumbersome and difficult to work with.

**js-cookie** is a simple, lightweight JavaScript library for handling cookies. It provides a clean, readable API that makes creating, reading, and deleting cookies trivial.

## Why Use js-cookie?

*   **Simple API**: The API is intuitive and easy to remember.
*   **Robust**: It works in all browsers.
*   **Lightweight**: The library is very small (~800 bytes gzipped).
*   **Secure**: It supports all cookie attributes, including `secure` and `sameSite`.

## Code Example

Here's how to use `js-cookie` in a React component to manage a user's theme preference.

```jsx
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const THEME_COOKIE_KEY = 'app_theme';

function ThemeSwitcher() {
  // Initialize state from the cookie, or default to 'light'
  const [theme, setTheme] = useState(() => {
    return Cookies.get(THEME_COOKIE_KEY) || 'light';
  });

  // This effect updates the cookie whenever the theme state changes
  useEffect(() => {
    // Set the cookie
    Cookies.set(THEME_COOKIE_KEY, theme, { 
      expires: 365, // Expires in 365 days
      secure: true,   // Only send over HTTPS
      sameSite: 'strict' // Helps prevent CSRF attacks
    });
    
    // You would also typically update a class on the body to apply styles
    document.body.className = `theme-${theme}`;

  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  const removeThemePreference = () => {
      // Remove the cookie
      Cookies.remove(THEME_COOKIE_KEY);
      // Reset to default
      setTheme('light');
  };

  return (
    <div>
      <h2>Theme Switcher</h2>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <button onClick={removeThemePreference}>
        Remove Preference
      </button>
    </div>
  );
}

export default ThemeSwitcher;
```

### Explanation of the API:

*   **`Cookies.set(name, value, [options])`**: Creates a cookie.
    *   `name`: The name of the cookie (e.g., `'app_theme'`).
    *   `value`: The value to store (e.g., `'dark'`).
    *   `options`: An object for configuring the cookie's attributes.
        *   `expires`: The lifespan of the cookie (in days).
        *   `secure`: If `true`, the cookie will only be sent over secure (HTTPS) connections. This is a crucial security setting.
        *   `sameSite`: Controls how cookies are sent with cross-site requests. `'strict'` is the most secure option.

*   **`Cookies.get(name)`**: Reads the value of a cookie. If the cookie does not exist, it returns `undefined`.

*   **`Cookies.remove(name)`**: Deletes a cookie.

`js-cookie` provides a simple and reliable abstraction over the native `document.cookie` API, making it an essential utility for any application that needs to interact with cookies on the client side.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://github.com/js-cookie/js-cookie" target="_blank" rel="noopener noreferrer">js-cookie on GitHub</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies" target="_blank" rel="noopener noreferrer">HTTP Cookies on MDN</a></li>
</ul>
</div>