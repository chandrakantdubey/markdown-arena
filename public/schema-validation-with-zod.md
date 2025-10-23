# Schema Validation with Zod

## Introduction

Zod is a TypeScript-first schema declaration and validation library. It allows you to define a "schema," or a shape, for your data and then check if your data conforms to that shape. While it's written in TypeScript and provides excellent type inference, it works perfectly in plain JavaScript as well.

Zod is commonly used for:
*   Validating incoming data from an API request body.
*   Validating form inputs on the client side.
*   Ensuring environment variables are in the correct format.

It's often paired with form libraries like **React Hook Form** to provide robust, type-safe form validation.

## Core Concepts

*   **Schema Definition**: You create schemas by chaining methods together, starting from a base Zod type (`z.string()`, `z.object()`, etc.).
*   **Type Inference**: In TypeScript, Zod can automatically infer a static TypeScript type from your schema. This means you only have to define your data shape once.
*   **Parsing, Not Validation**: Zod's philosophy is to "parse" data rather than just validate it. If the data is valid, it returns the data (potentially transformed, e.g., by `trim()`); if it's invalid, it throws an error.

## Code Example

Let's define a schema for a user registration form and then see how to use it with React Hook Form.

### 1. Defining the Zod Schema
```javascript
// schemas.js
import { z } from 'zod';

export const registrationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  
  confirmPassword: z.string(),

  // You can also add custom business logic
  age: z.number().min(18, { message: "You must be at least 18 years old" }),

}).refine((data) => data.password === data.confirmPassword, {
  // Add a 'refinement' for cross-field validation
  message: "Passwords do not match",
  path: ["confirmPassword"], // The field to display the error on
});

// In TypeScript, you can infer the type directly from the schema
// export type RegistrationSchema = z.infer<typeof registrationSchema>;
```

### 2. Using the Schema with React Hook Form

React Hook Form provides an official resolver to integrate with Zod.

```jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from './schemas'; // Import the schema

function ZodForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // Use the zodResolver to connect Zod with React Hook Form
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = (data) => {
    // `data` is guaranteed to be fully validated and typed
    console.log('Validated data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email Input */}
      <div>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      {/* Password Input */}
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>

      {/* Confirm Password Input */}
      <div>
        <label>Confirm Password</label>
        <input type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
      </div>
      
      {/* Age Input */}
      <div>
        <label>Age</label>
        <input type="number" {...register('age', { valueAsNumber: true })} />
        {errors.age && <p className="error">{errors.age.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default ZodForm;
```
By using the `zodResolver`, we have completely delegated the validation logic to our Zod schema. This keeps the component clean and centralizes the data validation rules, making them reusable across both the frontend and backend.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://zod.dev/" target="_blank" rel="noopener noreferrer">Zod Official Documentation</a></li>
  <li><a href="https://github.com/react-hook-form/resolvers" target="_blank" rel="noopener noreferrer">React Hook Form Resolvers</a></li>
</ul>
</div>