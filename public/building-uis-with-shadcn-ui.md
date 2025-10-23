# Building UIs with ShadCN UI

## Introduction

ShadCN UI is not a traditional component library like Material-UI or Chakra UI. It's a collection of beautifully designed, reusable components that you can copy and paste into your app.

The key difference is that **you own the code**. When you "install" a ShadCN component, its source code is added directly to your project. This gives you complete control over the component's code, styling, and behavior. It's less of a dependency and more of a starting point.

ShadCN UI is built on top of **Tailwind CSS** for styling and **Radix UI** for accessibility and primitives.

## Core Philosophy

*   **You Own the Code**: The components live in your codebase, giving you full control to modify them as needed.
*   **Accessibility First**: Built on top of Radix UI, all components are highly accessible out of thethe box (keyboard navigation, ARIA attributes, etc.).
*   **Styled with Tailwind CSS**: Components are styled with Tailwind's utility classes, making them easy to customize and theme to match your application's design system.
*   **Not a Dependency**: Since you copy the source code, you are not tied to the library's release cycle or breaking changes.

## How It Works

You use the ShadCN CLI to add components to your project.

1.  **Installation**: After setting up Tailwind CSS, you initialize `shadcn-ui` in your project:
    ```bash
    npx shadcn-ui@latest init
    ```
    This sets up your `tailwind.config.js` and creates a `components` directory.

2.  **Adding a Component**: To add a button component, you run:
    ```bash
    npx shadcn-ui@latest add button
    ```
    This command will add a `button.jsx` file to your `components/ui` directory. The code is now yours to own and modify.

## Code Example

After running `npx shadcn-ui@latest add card alert-dialog`, you can compose these components to build complex UI patterns.

```jsx
import React from 'react';
import { Button } from "@/components/ui/button"; // Imports your local button component
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function AccountSettings() {
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action is irreversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

export default AccountSettings;
```

This example demonstrates how easy it is to compose the `Card`, `Button`, and `AlertDialog` components to create a functional and accessible "delete account" feature. Because the components are just files in your project, you can easily go into `button.jsx` or `card.jsx` and change their styles or logic to fit your exact needs.

ShadCN UI represents a modern approach to building UIs, prioritizing developer control, customization, and accessibility.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://ui.shadcn.com/docs" target="_blank" rel="noopener noreferrer">ShadCN UI Official Documentation</a></li>
  <li><a href="https://radix-ui.com/" target="_blank" rel="noopener noreferrer">Radix UI Primitives</a></li>
</ul>
</div>