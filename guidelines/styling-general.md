# Svelte 5 Style Guidelines

This guide outlines best practices for styling Svelte 5 components using Tailwind CSS and incorporates relevant Svelte-specific concepts. It's designed to ensure consistent and efficient styling across your application.

## 1. Key Tailwind Features

1.1. Utility-First Approach:
- Use Tailwind's utility classes for rapid styling
- Combine utilities to create complex designs without writing custom CSS

1.2. Responsive Design:
- Utilize responsive prefixes (sm:, md:, lg:, xl:) for adaptive layouts

1.3. State Variants:
- Apply hover:, focus:, active:, and other state variants for interactive elements

1.4. Dark Mode:
- Implement dark mode with the dark: variant

1.5. Customization:
- Extend Tailwind's default theme in tailwind.config.js for project-specific design systems

## 2. Additional Features

2.1. Arbitrary Values:
- Use square brackets for one-off values:
  ```svelte
  <div class="top-[117px]">Custom positioning</div>
  ```
- This allows for precise control without creating custom CSS classes. This feature should be used sparingly, only when absolutely essential to fine tune the positioning of an element.

2.2. Group Hover:
- Apply styles to child elements based on parent state:
  ```svelte
  <div class="group hover:bg-blue-500">
    <p class="group-hover:text-white">Hover the parent</p>
  </div>
  ```
- Enhances component interactivity without complex CSS or JavaScript

2.3. Space Between:
- Use space-x-{amount} and space-y-{amount} for consistent spacing:
  ```svelte
  <div class="space-y-4">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </div>
  ```
- Simplifies layout management, especially for dynamic content

2.4. Composing Utilities:
- Use @apply to create reusable utility combinations:
  ```css
  .btn-primary {
    @apply py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200;
  }
  ```
- Balances utility-first approach with DRY principle for complex, repeating patterns

2.5. Content-Based Grid:
- Use grid-cols-[repeat(auto-fit,minmax(200px,1fr))] for responsive, content-aware layouts:
  ```svelte
  <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
    <!-- Grid items -->
  </div>
  ```
- Creates flexible, responsive layouts without media queries

Remember:
- Leverage these advanced features to write more maintainable and scalable styles
- Balance utility classes with custom CSS for optimal readability and flexibility
- Continuously explore Tailwind's documentation for new features and best practices

## 3. Svelte-Specific Styling Best Practices

3.1. Dynamic Classes:
- Use class directives for conditional styling:
  ```svelte
  <div class:active={isActive} class:disabled>
    <!-- Content -->
  </div>
  ```

3.2. Inline Styles:
- Use style directives for dynamic inline styles:
  ```svelte
  <div style:background-color={color} style:font-size="{size}px">
    <!-- Content -->
  </div>
  ```

3.3. Scoped Styles:
- Use `<style>` tags for component-specific styles:
  ```svelte
  <style>
    /* These styles are scoped to this component */
    p {
      color: blue;
    }
  </style>
  ```

3.4. Prop-based Styling:
- Accept style-related props for flexibility:
  ```javascript
  let { variant = $state('primary'), size = $state('medium') } = $props();
  ```

3.5. Composable Classes:
- Combine classes based on props:
  ```svelte
  <button class={`btn btn-${variant} btn-${size}`}>
    <!-- Button content -->
  </button>
  ```

## 4. Performance and Accessibility

4.1. Purge Unused Styles:
- Configure Tailwind's purge option to remove unused styles in production

4.2. Lazy Loading:
- Use dynamic imports for large components to reduce initial bundle size

4.3. Transition Performance:
- Use CSS transitions for simple animations

4.4. Color Contrast:
- Ensure sufficient color contrast for text readability

4.5. Focus Styles:
- Implement clear focus styles for keyboard navigation

4.6. ARIA Attributes:
- Use appropriate ARIA attributes for complex components

## 5. Best Practices

5.1. Consistent Naming:
- Use consistent naming conventions for classes and variables
- Follow BEM (Block Element Modifier) methodology for custom classes

5.2. Mobile-First Approach:
- Start with mobile styles and use responsive classes to adjust for larger screens

5.3. Avoid Inline Styles:
- Prefer Tailwind classes or component-scoped styles over inline styles

5.4. Component Isolation:
- Keep styles scoped to components when possible to prevent unintended side effects

5.5. CSS-in-JS:
- For complex, dynamic styles, consider using CSS-in-JS libraries compatible with Svelte

Remember: 
- Always prioritize Tailwind utility classes for consistency and maintainability
- Use Svelte's built-in styling features (class directives, style directives) for dynamic styling
- Consider performance and accessibility in your styling decisions
- Maintain a balance between utility classes and custom CSS for optimal maintainability and flexibility
