# Accessibility (A11y)

## Introduction

Web accessibility (often abbreviated as **a11y**, where "11" represents the 11 letters between "a" and "y") is the inclusive practice of ensuring that websites, tools, and technologies are designed and developed so that people with disabilities can use them.

When we talk about accessibility, we are not just talking about users who are blind or deaf. It also includes people with:
*   **Motor impairments**: Who may have difficulty using a mouse or keyboard.
*   **Cognitive disabilities**: Who may have difficulty with complex navigation or memory.
*   **Situational limitations**: Such as a user in bright sunlight who can't see the screen well, or someone who has temporarily broken their arm.

Making your site accessible is not only the right thing to do, but it also benefits all users by making your site more robust and easier to navigate. It can also improve your SEO.

## Key Principles of Accessibility (WCAG)

The Web Content Accessibility Guidelines (WCAG) are the international standard for web accessibility. They are organized around four core principles, known by the acronym **POUR**:

1.  **Perceivable**: Users must be able to perceive the information being presented. It can't be invisible to all of their senses.
    *   **Example**: Providing `alt` text for images so that screen reader users can understand the content of the image.
2.  **Operable**: User interface components and navigation must be operable. Users must be able to interact with the UI.
    *   **Example**: Ensuring that all functionality can be accessed with a keyboard, not just a mouse.
3.  **Understandable**: Information and the operation of the user interface must be understandable.
    *   **Example**: Using clear and consistent navigation, providing helpful error messages, and using plain language.
4.  **Robust**: Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies.
    *   **Example**: Using valid, semantic HTML so that browsers and screen readers can parse and understand the structure of the page correctly.

## Practical Best Practices

### 1. Use Semantic HTML

This is the foundation of an accessible web. Use HTML elements for their intended purpose.
*   Use `<nav>` for navigation, `<main>` for the main content, and `<button>` for buttons.
*   Use `<h1>` through `<h6>` for headings and don't skip levels.
*   Use `<label for="inputId">` to associate labels with form inputs.

A screen reader uses this semantic structure to help users navigate the page. A user can ask their screen reader to list all the headings or jump to the main content area. This is impossible if your page is made entirely of `<div>`s.

### 2. Provide Text Alternatives for Non-Text Content

*   **`alt` text on `<img>`**: All `<img>` tags must have an `alt` attribute.
    *   If the image is purely decorative, use `alt=""`. This tells the screen reader to ignore it.
    *   If the image conveys information, the `alt` text should be a concise description of that information.

### 3. Ensure Keyboard Navigability

All interactive elements (links, buttons, form inputs) must be reachable and operable using only the keyboard.
*   You should be able to "Tab" through all interactive elements in a logical order.
*   The currently focused element should have a visible focus indicator (the default is a blue outline, which should not be removed without providing an alternative).
*   You should be able to activate buttons and links with the `Enter` key.

### 4. ARIA (Accessible Rich Internet Applications)

Sometimes, semantic HTML isn't enough to describe the behavior of complex, dynamic widgets (like a custom dropdown menu or a set of tabs). **ARIA** is a set of attributes you can add to HTML elements to provide additional semantics and improve accessibility.

*   `role`: Describes the type of widget (e.g., `role="tab"`, `role="dialog"`).
*   `aria-label`: Provides an accessible name for an element when there is no visible text label.
*   `aria-expanded`, `aria-selected`: Describes the state of an element.

**Use ARIA with caution**: The first rule of ARIA is "don't use ARIA." If you can use a native HTML element (like `<button>`) that already has the accessibility features built-in, always prefer that over creating a `<div>` and adding ARIA attributes to it.

### 5. Color and Contrast

*   Ensure that the contrast ratio between your text color and background color is high enough to be readable for people with low vision. A ratio of at least **4.5:1** for normal text is the WCAG AA standard.
*   Don't rely on color alone to convey information. For example, if an error message is only shown in red text, a color-blind user may not see it. Use an icon or text in addition to the color.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility" target="_blank" rel="noopener noreferrer">Accessibility on MDN</a></li>
  <li><a href="https://www.w3.org/WAI/fundamentals/accessibility-intro/" target="_blank" rel="noopener noreferrer">Introduction to Web Accessibility (W3C)</a></li>
  <li><a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noopener noreferrer">WebAIM Contrast Checker</a></li>
</ul>
</div>