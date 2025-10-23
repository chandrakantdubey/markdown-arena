# Building UIs with Chakra UI

## Introduction

Chakra UI is a popular, modern component library for React that gives you the building blocks you need to build accessible and scalable applications. Unlike utility-first frameworks like Tailwind, Chakra provides a set of fully styled, composable, and accessible React components.

Its main goal is to help developers build applications quickly without sacrificing control over the final design.

## Core Philosophy

*   **Accessibility First**: All components are built following WAI-ARIA standards, ensuring they are accessible out of the box (e.g., proper focus management, keyboard navigation).
*   **Style Props**: Chakra UI's most distinctive feature is its use of "style props." You can style any component by passing CSS properties directly as props, making it incredibly fast to prototype and style components.
*   **Themeable**: The entire design system (colors, fonts, spacing) can be customized by extending the default theme object. This allows you to create a consistent look and feel across your entire application.
*   **Composable**: Components are designed to be small and composable, so you can easily combine them to create more complex UI patterns.

## Code Example

Here's an example of how to build a simple login form using Chakra UI's components and style props.

```jsx
import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast
} from '@chakra-ui/react';

function LoginForm() {
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real app, you would handle form submission here
    toast({
      title: 'Login Successful.',
      description: "We've logged you into your account.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    // The `Box` component is a generic div with access to all style props
    <Box
      maxW="md"          // max-width
      mx="auto"         // margin-left/right: auto (centers the box)
      mt="10"           // margin-top
      p="8"             // padding
      borderWidth="1px" // border-width
      borderRadius="lg" // border-radius (large)
      boxShadow="lg"    // box-shadow (large)
    >
      <Heading as="h2" size="lg" mb="6" textAlign="center">
        Log In
      </Heading>
      <form onSubmit={handleSubmit}>
        {/* `Stack` is a layout component that makes it easy to stack items */}
        <Stack spacing="4">
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" />
          </FormControl>

          <Button type="submit" colorScheme="teal" size="lg" fontSize="md">
            Sign in
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

// To use this, your app must be wrapped in <ChakraProvider>
// import { ChakraProvider } from '@chakra-ui/react'
// <ChakraProvider><LoginForm /></ChakraProvider>
```

### Explanation of Concepts Used:
*   **Style Props**: `maxW`, `mx`, `mt`, `p`, `mb`, `textAlign` are all style props. They are shorthand for CSS properties and use values from the theme's design tokens (e.g., `mt="10"` maps to a specific margin value like `2.5rem`).
*   **Component Composition**: We are composing `Box`, `Heading`, `FormControl`, `Input`, and `Button` to create a complete form.
*   **Layout Components**: `Stack` makes it easy to add consistent spacing between form elements without writing custom CSS.
*   **Hooks**: `useToast` is a hook that provides a function to easily trigger accessible toast notifications.

Chakra UI strikes a great balance between providing ready-to-use components and giving you the flexibility to style them quickly and consistently, making it an excellent choice for a wide range of applications.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://chakra-ui.com/docs/getting-started" target="_blank" rel="noopener noreferrer">Chakra UI Official Documentation</a></li>
  <li><a href="https://www.youtube.com/watch?v=0_6Q_EEIocI" target="_blank" rel="noopener noreferrer">Chakra UI in 100 Seconds (Video)</a></li>
</ul>
</div>