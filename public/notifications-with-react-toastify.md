# Notifications with React Toastify

## Introduction

Toast notifications are small, non-intrusive messages that appear on the screen to provide feedback to the user. They are commonly used to indicate the success or failure of an action, such as submitting a form or saving a setting.

**React Toastify** is a popular and highly customizable library for adding toast notifications to your React application. It's easy to set up, offers a simple API, and provides a wide range of features out of the box.

## Core Features

*   **Easy to Use**: Push notifications from anywhere in your app with a simple function call.
*   **Highly Customizable**: Customize the look, feel, and position of the toasts.
*   **Declarative**: Configure the toast container once and then call the `toast` function wherever you need it.
*   **Feature-Rich**: Supports different notification types (success, error, info, warning), progress bars, auto-close timers, and more.
*   **Accessible**: Follows ARIA guidelines for accessibility.

## Code Example

Here is how to set up React Toastify and trigger different types of notifications.

### 1. Add the `ToastContainer`
First, you need to add the `ToastContainer` component to the root of your application. This component is responsible for rendering all the toasts.

```jsx
// App.jsx
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the default CSS

import MyComponent from './MyComponent';

function App() {
  return (
    <div>
      <MyComponent />
      
      {/* Add the container once, here */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
```

### 2. Triggering Toasts
Now, you can import and call the `toast` function from any component to display a notification.

```jsx
// MyComponent.jsx
import React from 'react';
import { toast } from 'react-toastify';

function MyComponent() {
  const handleSuccess = () => {
    // Call the `toast` function with a specific type
    toast.success('Settings saved successfully!');
  };

  const handleError = () => {
    toast.error('Failed to save settings. Please try again.');
  };
  
  const handleInfo = () => {
    toast.info('You have a new message.');
  };

  const handleCustom = () => {
    toast("This is a custom toast!", {
      position: "bottom-left",
      autoClose: false, // This toast will not close automatically
      draggable: false,
    });
  };

  return (
    <div>
      <h2>Notification Examples</h2>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
      <button onClick={handleInfo}>Show Info</button>
      <button onClick={handleCustom}>Show Custom</button>
    </div>
  );
}

export default MyComponent;
```

### Updating a Toast
You can also use React Toastify to show a loading state and then update the toast when an asynchronous action is complete.

```jsx
function DataFetcher() {
  const fetchData = () => {
    const toastId = toast.loading("Fetching data...");

    // Simulate an API call
    setTimeout(() => {
      if (Math.random() > 0.5) {
        toast.update(toastId, { 
          render: "Data fetched successfully!", 
          type: "success", 
          isLoading: false, 
          autoClose: 3000 
        });
      } else {
        toast.update(toastId, { 
          render: "Failed to fetch data.", 
          type: "error", 
          isLoading: false, 
          autoClose: 3000 
        });
      }
    }, 2000);
  };

  return <button onClick={fetchData}>Fetch Data</button>;
}
```
This pattern provides excellent user feedback for asynchronous operations. React Toastify is a simple yet powerful tool for enhancing the user experience of your application.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://fkhadra.github.io/react-toastify/introduction" target="_blank" rel="noopener noreferrer">React Toastify Official Documentation</a></li>
  <li><a href="https://github.com/fkhadra/react-toastify" target="_blank" rel="noopener noreferrer">React Toastify on GitHub</a></li>
</ul>
</div>