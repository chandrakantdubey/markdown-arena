# Clipboard Management with React Copy to Clipboard

## Introduction

A "copy to clipboard" feature is a common UI pattern that provides a great user experience, allowing users to easily copy important text like a shareable link, a discount code, or a code snippet with a single click.

While modern browsers provide a native `navigator.clipboard` API, implementing it can involve handling permissions and promises. **react-copy-to-clipboard** is a simple and lightweight React component that wraps this functionality, providing an easy and declarative way to add copy-to-clipboard functionality to your application.

## Core Concepts

*   **`<CopyToClipboard>` Component**: The library provides a single component that acts as a wrapper.
*   **Declarative API**: You provide the text you want to copy as a prop. Any `onClick` event on the component's children will trigger the copy action.
*   **`onCopy` Callback**: A callback function that is called after the text has been successfully copied, allowing you to provide user feedback (like showing a "Copied!" message).

## Code Example

Here is an example of a "Share" button that copies a URL to the clipboard and provides feedback to the user.

```jsx
import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function ShareButton({ shareUrl }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Set copied state to true
    setCopied(true);
    
    // Reset the "Copied!" message after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <input type="text" value={shareUrl} readOnly />
      
      <CopyToClipboard
        text={shareUrl}     // The text to be copied
        onCopy={handleCopy} // The callback function
      >
        <button>
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </CopyToClipboard>

      {copied && <span style={{ color: 'green', marginLeft: '10px' }}>Link copied to clipboard!</span>}
    </div>
  );
}

// Example Usage
function App() {
    const urlToShare = "https://www.example.com/my-awesome-page";
    return <ShareButton shareUrl={urlToShare} />;
}

export default App;
```

### Explanation:
1.  We import the `CopyToClipboard` component.
2.  We wrap our `<button>` inside the `<CopyToClipboard>` component. Any child element can be used here.
3.  The `text` prop is passed the `shareUrl` that we want to copy.
4.  The `onCopy` prop is passed a handler function, `handleCopy`.
5.  When the button is clicked, `react-copy-to-clipboard` copies the `shareUrl` to the user's clipboard.
6.  If the copy is successful, the `handleCopy` function is executed.
7.  Inside `handleCopy`, we set a local state variable `copied` to `true`. This triggers a re-render, and the button's text changes to "Copied!".
8.  A `setTimeout` is used to reset the `copied` state back to `false` after 2 seconds, returning the button to its original state.

This simple component provides a robust and user-friendly way to handle a very common UI requirement.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://github.com/nkbt/react-copy-to-clipboard" target="_blank" rel="noopener noreferrer">react-copy-to-clipboard on GitHub</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API" target="_blank" rel="noopener noreferrer">Clipboard API on MDN</a></li>
</ul>
</div>