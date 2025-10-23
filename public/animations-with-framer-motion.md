# Animations with Framer Motion

## Introduction

Framer Motion is a powerful and popular animation library for React. It provides a simple, declarative syntax that makes it incredibly easy to add production-ready animations and gestures to your components.

Instead of manually managing CSS transitions or complex animation logic, Framer Motion allows you to describe the animation you want directly on your components. It handles the underlying physics and performance optimizations, letting you create fluid and beautiful UIs with minimal effort.

## Core Concepts

*   **The `motion` component**: The core of the library. You can turn any HTML or SVG element into a motion component by prepending `motion.` to it (e.g., `motion.div`, `motion.button`).
*   **The `animate` prop**: This prop defines the state you want to animate *to*. It's the destination of the animation.
*   **The `initial` prop**: This defines the state the component should start at before it animates to the `animate` state.
*   **The `transition` prop**: This allows you to customize the animation, such as its duration, delay, or the type of easing (e.g., `spring`, `tween`).
*   **Variants**: For more complex, reusable animations, you can define "variants" which are named animation states.

## Code Example: Simple Animations

Here are a few examples of common animation patterns.

### 1. Animate on Mount
This component will fade in and slide up when it first appears on the screen.

```jsx
import { motion } from 'framer-motion';

function FadeInBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Start invisible and 20px down
      animate={{ opacity: 1, y: 0 }}   // Animate to fully visible and original position
      transition={{ duration: 0.5 }}     // Animation takes 0.5 seconds
      style={{
        width: 100,
        height: 100,
        background: 'lightblue'
      }}
    />
  );
}
```

### 2. Animate on Hover and Tap
Framer Motion provides convenient props for gesture animations.

```jsx
import { motion } from 'framer-motion';

function InteractiveButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 5 }} // Animate while the mouse is hovering
      whileTap={{ scale: 0.9, rotate: -5 }}   // Animate while the button is pressed
      transition={{ type: 'spring', stiffness: 300 }} // Use a springy physics-based animation
    >
      Click Me!
    </motion.button>
  );
}
```

### 3. Staggered List Animation
Framer Motion makes it easy to create complex staggered animations for lists.

```jsx
import { motion } from 'framer-motion';

const listVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren", // Run this parent animation before the children
      staggerChildren: 0.2,   // Stagger the children's animation by 0.2s
    },
  },
  hidden: {
    opacity: 0,
  },
};

const itemVariants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -50 },
};

function MyList({ items }) {
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={listVariants}
    >
      {items.map((item, index) => (
        <motion.li key={index} variants={itemVariants}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```
In this example, the `<ul>` will fade in, and then each `<li>` will fade in and slide from the left one after another, creating a beautiful staggered effect.

Framer Motion's declarative API fits perfectly with the React paradigm, making it the go-to choice for adding rich animations to modern React applications.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://www.framer.com/motion/introduction/" target="_blank" rel="noopener noreferrer">Framer Motion Official Documentation</a></li>
  <li><a href="https://www.youtube.com/watch?v=2V1r_p_mmkE" target="_blank" rel="noopener noreferrer">Framer Motion in 100 Seconds (Video)</a></li>
</ul>
</div>