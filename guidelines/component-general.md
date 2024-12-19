# Svelte 5 Component Patterns for LLM Code Generation

## EXACT PATTERNS TO FOLLOW

### 1. Basic Component Structure
ALWAYS use this exact structure for every component:

```svelte
<script>
  // 1. IMPORTS
  import { onMount } from 'svelte';
  import ChildComponent from './ChildComponent.svelte';

  // 2. PROPS
  let {
    // Required props (no default)
    userId,
    
    // Optional props with defaults
    username = '',
    
    // Event handlers (always provide empty function)
    onUpdate = () => {},
    
    // Style props last
    class: className = ''
  } = $props();

  // 3. STATE
  let count = $state(0);
  let data = $state({ key: 'value' });

  // 4. DERIVED VALUES
  let doubled = $derived(count * 2);
  let isValid = $derived(data.key.length > 0);

  // 5. EFFECTS
  $effect(() => {
    console.log(`Count changed: ${count}`);
    return () => {
      // Cleanup code here
    };
  });

  // 6. EVENT HANDLERS
  function handleClick() {
    count++;
    onUpdate?.(count);
  }
</script>

<!-- 7. TEMPLATE -->
<div class={className}>
  <h1>{username}</h1>
  <button onclick={handleClick}>
    Count: {count}
  </button>
</div>

<!-- 8. STYLES -->
<style>
  div { margin: 1rem; }
</style>
```

## CRITICAL RULES - NEVER BREAK THESE

### ❌ NEVER Use These Svelte 4 Patterns:
```javascript
// ❌ WRONG: Don't use export statements
export let count;
export let onchange = () => {};

// ❌ WRONG: Don't use reactive statements
$: doubled = count * 2;

// ❌ WRONG: Don't use stores
import { writable } from 'svelte/store';
const count = writable(0);

// ❌ WRONG: Don't use event dispatcher
const dispatch = createEventDispatcher();
dispatch('change', value);

// ❌ WRONG: Don't use on: directives
<button on:click={handler}>
<form on:submit|preventDefault={submit}>

// ❌ WRONG: Don't use slots
<slot name="header">
<div slot="content">
```

### ✅ ALWAYS Use These Svelte 5 Patterns:
```javascript
// ✅ CORRECT: Use $props() for all props
let {
  value = '',           // Required props first
  onchange = () => {},  // Event handlers with defaults
  disabled = false     // Optional props last
} = $props();

// ✅ CORRECT: Use $state() for reactive state
let count = $state(0);
let user = $state({ name: '' });

// ✅ CORRECT: Use $derived for computed values
let doubled = $derived(count * 2);
let isValid = $derived(user.name.length > 0);

// ✅ CORRECT: Use callback props for events
function handleChange(newValue) {
  onchange?.(newValue);
}

// ✅ CORRECT: Use standard DOM events
<button onclick={handleClick}>
<form onsubmit={e => {
  e.preventDefault();
  handleSubmit(e);
}}>

// ✅ CORRECT: Use snippets instead of slots
{#snippet header()}
  <h1>Title</h1>
{/snippet}

{@render header()}
```

## 1. Component Structure and State Management

### 1.1 Basic Component Template
```javascript
<script>
  /**
   * @component ComponentName
   * @description Clear description of component purpose and behavior
   * 
   * @type {{
   *   value: string,                      // Required props first
   *   label?: string,                     // Optional props second
   *   onchange?: (value: any) => void,    // Event handlers third
   *   header?: () => void,                // Snippet props fourth
   *   class?: string                      // Style props last
   * }}
   */
  let {
    // Required props (no defaults)
    value,
    
    // Optional props with defaults
    label = '',
    
    // Event handlers with empty function defaults
    onchange = () => {},
    
    // Snippet props with defaults
    header,
    
    // Style props last
    class: className = ''
  } = $props();

  // IMPORTANT: Always use $state() for reactive values
  let count = $state(0);
  let items = $state([]);
  
  // IMPORTANT: Always use $derived for computed values
  // Simple derivation - single expression only
  let doubled = $derived(count * 2);
  let hasItems = $derived(items.length > 0);
  
  // Complex derivation - use $derived.by()
  let status = $derived.by(() => {
    if (count < 0) return 'negative';
    if (count > 0) return 'positive';
    return 'zero';
  });
  
  // Effects for side operations
  $effect(() => {
    console.log(`Count changed: ${count}`);
    // Return cleanup function if needed
    return () => {
      // Cleanup code here
    };
  });

  // IMPORTANT: Use standard DOM event handlers
  function handleClick() {
    count++;
    // IMPORTANT: Call callback props with optional chaining
    onchange?.(count);
  }

  // IMPORTANT: Always handle form submission explicitly
  function handleSubmit(e) {
    e.preventDefault();
    // Form handling logic
  }
</script>

<!-- Template using proper event syntax -->
<div class={className}>
  {@render header()}
  
  <button 
    onclick={handleClick}  <!-- CORRECT: Use onclick, not on:click -->
    class="btn"
  >
    {label}: {count}
  </button>
  
  <form
    onsubmit={handleSubmit}  <!-- CORRECT: Use onsubmit, not on:submit -->
  >
    <input
      oninput={e => handleInput(e)}  <!-- CORRECT: Use oninput, not on:input -->
      value={formValue}
    />
  </form>
  
  {#each items as item}
    {@render renderItem(item)}
  {/each}
</div>
```

### 1.2 Key Differences from Svelte 4

1. State Management:
   ```javascript
   // ❌ Svelte 4 - Don't use these patterns
   export let count = 0;
   $: doubled = count * 2;
   const store = writable(0);
   
   // ✅ Svelte 5 - Use runes instead
   let count = $state(0);
   let doubled = $derived(count * 2);
   ```

2. Props Declaration:
   ```javascript
   // ❌ Svelte 4 - Avoid export statements
   export let value = '';
   export let onchange = () => {};
   
   // ✅ Svelte 5 - Use $props() rune
   let {
     value = '',
     header,
     onchange = () => {}
   } = $props();
   ```

3. Event Handling:
   ```javascript
   // ❌ Svelte 4 - Don't use event dispatching
   const dispatch = createEventDispatcher();
   dispatch('change', value);
   
   // ✅ Svelte 5 - Use callback props
   let { onchange = () => {} } = $props();
   onchange(newValue);
   ```

4. Content Projection:
   ```javascript
   // ❌ Svelte 4 - Don't use slots
   <slot name="header">Default</slot>
   
   // ✅ Svelte 5 - Do use snippets
   {#if header}{@render header()}{:else}Default{/if}
   ```

### 1.3 Component Lifecycle and Effects

```javascript
// Component setup and cleanup
onMount(() => {
  // Initialize component
  const cleanup = setupComponent();
  
  // Return cleanup function
  return () => {
    cleanup();
  };
});

// Reactive effects with cleanup
$effect(() => {
  const subscription = subscribe();
  
  // Effect cleanup
  return () => {
    subscription.unsubscribe();
  };
});

// Computed values with dependencies
let status = $derived.by(() => {
  if (!isValid) return 'invalid';
  if (isLoading) return 'loading';
  return 'ready';
});
```

### 0.3 Common Type Patterns

Event Handlers:
```javascript
onclick?: (event) => void               // Click handler
onchange?: (value) => void              // Value change handler
onsubmit?: (data) => void              // Form submission handler
```

Literal Types:
```javascript
variant?: 'primary'|'secondary'|'ghost'  // Use literal unions
size?: 'sm'|'md'|'lg'                   // Use literal unions
align?: 'left'|'center'|'right'         // Use literal unions
```

Complex Types:
```javascript
data?: {                                // Use object shape definition
  id: string,
  title: string,
  items: []
}
```

This standardized JSDoc format ensures consistent documentation across all components and enables better tooling support.

## 1. Reactivity

1.1. State Management:
- Use `$state()` for component-internal reactive variables:
  ```javascript
  let count = $state(0);
  ```

1.2. Derived Values:
- Use `$derived` for simple computed values that directly reference reactive variables:
  ```javascript
  let doubleCount = $derived(count * 2);
  ```
  A variable is defined and set to the result of the `$derived()` rune. The rune automatically tracks dependencies and updates the value when dependencies change. You CANNOT pass a function to the $derived base rune.

- Use `$derived.by()` for complex derived values that need to return a value:
  ```javascript
  let complexValue = $derived.by(() => { 
    // Must return a value to be assigned to complexValue
    return x + calculation(y+z); 
  });
  ```
  IMPORTANT: Both `$derived` and `$derived.by()` MUST be used to assign a value to a variable. They cannot be used for side effects. For side effects, use `$effect()`.

- For side effects based on reactive values, use `$effect()`:
  ```javascript
  $effect(() => {
    // Use for side effects like:
    // - Updating DOM
    // - Making API calls
    // - Setting other state
    if (someValue) {
      doSomething();
    }
  });
  ```

1.2.1 Derived Values Best Practices:
- IMPORTANT: Avoid using `$derived` for object lookups or map operations. Instead, define the lookup map as a static object and derive just the result:
  ```javascript
  // ❌ WRONG - Don't derive the entire object lookup
  const classes = $derived({
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }[size]);

  // ✅ CORRECT - Define map statically, derive only the lookup
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  const className = $derived(sizeClasses[size] || sizeClasses.md);
  ```

- IMPORTANT: For conditional class generation, separate the static mappings from the derived values:
  ```javascript
  // ❌ WRONG - Don't compute mappings inside derived values
  const buttonClass = $derived.by(() => ({
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500'
  }[variant]));

  // ✅ CORRECT - Define mappings separately
  const variantClasses = {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500'
  };
  const buttonClass = $derived(variantClasses[variant] || variantClasses.primary);
  ```

1.2.2 Common Derived Value Patterns:
- For class name generation:
  ```javascript
  // Define static mappings
  const variants = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white'
  };
  const sizes = {
    sm: 'text-sm py-1 px-2',
    md: 'text-base py-2 px-4'
  };

  // Derive individual classes
  const variantClass = $derived(variants[variant] || variants.primary);
  const sizeClass = $derived(sizes[size] || sizes.md);
  
  // Combine classes
  const className = $derived(`${variantClass} ${sizeClass} ${customClass}`);
  ```

1.3. Side Effects:
- Use `$effect()` sparingly for side effects and lifecycle management:
  ```javascript
  $effect(() => {
    console.log(`Count changed to ${count}`);
  });
  ```
- Be cautious when using `$effect()`. Overuse can lead to complex reactivity chains and potential infinite loops.
- Only use `$effect()` when you need to perform cleanup or when the reactive logic involves side effects that can't be handled by `$derived`.

## 2. Props, Events, and Bindable Properties

2.1. Prop Definitions:
- Define all props using a single `$props()` rune:
  ```javascript
  let { 
    value = '',           // Regular prop with default
    onchange = () => {}, // Event handler with default empty function
    disabled = false     // Regular prop with boolean default
  } = $props();
  ```

2.2. Props Best Practices:
- Use a single `$props()` rune per component
- Provide sensible defaults for optional props
- Document all props with JSDoc
- For event handlers, always provide an empty function as default

2.3. State Properties:
- Use `$state()` for internal component state that doesn't need to be bound:
  ```javascript
  let internalCount = $state(0);
  ```

2.3. Prop Passing:
- When passing props to a component, use the following syntax:
  ```svelte
  <MyComponent
    prop1={value1}
    bind:prop2={value2}
    onevent={(data) => handleEvent(data)}
  />
  ```

2.3. Naming Conventions:
- Use camelCase for prop variables or lowercase fore events.
- Prefix booleans with 'is', 'has', or 'should' (e.g., isDisabled)
- Common prop names: value, onchange, onsubmit, disabled, variant

2.4. Event Handling:
- IMPORTANT: Do not use `createEventDispatcher`. It is deprecated in Svelte 5.
- Use callback props for all component communication, including child-to-parent:
  ```javascript
  let { onchange } = $props();

  function handleChange(newValue) {
    onchange?.(newValue);
  }
  ```
- Use inline event handlers with the new syntax for DOM events:
  ```svelte
  <button onclick={() => count++}>
    Increment
  </button>
  ```
- For component events, always pass callback props:
  ```svelte
  <!-- Parent component -->
  <ChildComponent oncustomevent={(data) => handleCustomEvent(data)} />

  <!-- Child component -->
  <script>
    let { oncustomevent } = $props();
    
    function triggerCustomEvent() {
      oncustomevent?.({ someData: 'value' });
    }
  </script>
  ```

- For DOM events in Svelte 5, handle preventDefault explicitly:
  ```svelte
  <!-- ❌ WRONG - Don't use event modifiers with | -->
  <form onsubmit|preventDefault={handleSubmit}>
  
  <!-- ✅ CORRECT - Handle preventDefault in the event handler -->
  <form onsubmit={e => {
    e.preventDefault();
    handleSubmit();
  }}>
  ```
- When defining props for a component that emits events, include the event callbacks in the props definition:
  ```javascript
  let { oncustomevent = () => {} } = $props();
  ```
- Use lowercase for HTML event attributes (like "onclick")
- Use descriptive names for event callbacks, prefixed with 'on', e.g., 'onsubmit', 'onchange', 'ondelete'

2.5. Two-way Binding:
- For properties marked with `$bindable()`, parents can use `bind:` directive:
- Remember this will update parentValue, so it does not need an oninput or onchange event unless you want to react to that event.
  ```svelte
  <MyComponent bind:value={parentValue} />
  ```

## 3. Snippets

3.1. Defining and Using Snippets:
- IMPORTANT: Slots are deprecated in Svelte 5. Always use snippets instead of slots.
- Snippets are the new way to create reusable chunks of markup in Svelte 5.
- Define snippets using the `{#snippet ...}` syntax:
  ```svelte
  {#snippet mySnippet(param1, param2)}
    <!-- Snippet content here -->
  {/snippet}
  ```
- Render snippets using the `{@render ...}` syntax:
  ```svelte
  {@render mySnippet(arg1, arg2)}
  ```

3.2. Snippet Parameters:
- Snippets can have parameters, similar to function arguments:
  ```svelte
  {#snippet figure({ src, caption, width, height })}
    <figure>
      <img alt={caption} {src} {width} {height} />
      <figcaption>{caption}</figcaption>
    </figure>
  {/snippet}
  ```
- Use destructuring for clearer parameter definitions.

3.3. Snippet Scope:
- Snippets have access to the outer scope where they are defined.
- They are visible to siblings and their children in the same lexical scope.
- Avoid referencing variables from outside the snippet if possible, to maintain clarity.

3.4. Passing Snippets to Components:
- Pass snippets as props to components:
  ```svelte
  <MyComponent {mySnippet} />
  ```
- Snippets defined inside a component tag automatically become props. This is the preferred pattern to keep consistency with how slots were used.
  ```svelte
  <MyComponent>
    {#snippet header()}
      <h1>Header Content</h1>
    {/snippet}
  </MyComponent>
  ```
3.5. Default / Conditional Content and the `children` Snippet:
- Non-snippet content inside a component becomes the `children` snippet:
```svelte
<script>
let {
  header,
  footer,
  children
} = $props();
</script>
<div class="layout">
  {#if header}{@render header()}{/if}
  <main>
    {#if children}
      {@render children()}
    {:else}
      Default Content
    {/if}
  </main>
  {#if footer}{@render footer()}{/if}
</div>
```

- Row template example
```svelte
<script>
let {
  data = [],
  rowTemplate
} = $props();
</script>


<table>
  <tbody>
    {#each data as item, i}
      <!-- Render snippet if exists, else show default template -->
      {#if rowTemplate}
        {@render rowTemplate(item, i)}
      {:else}
        <tr><td>${item}</td></tr>
      {/if}
    {/each}
  </tbody>
</table>
```

3.6. Snippet vs Slot Syntax:
- NEVER use slot syntax in Svelte 5 components:
  ```svelte
  <!-- DO NOT USE THIS -->
  <slot name="header"></slot>
  ```
- Always use snippet syntax instead:
  ```svelte
  <!-- Use this -->
  {@render header()}
  ```

3.7. Creating Snippets Programmatically:
- For advanced use cases, use `createRawSnippet`:
  ```javascript
  import { createRawSnippet } from 'svelte';
  const dynamicSnippet = createRawSnippet((param) => ({
    render: () => `<p>${param()}</p>`,
    setup: (node) => {
      $effect(() => {
        node.textContent = param();
      });
    }
  }));
  ```

Remember: Always use snippets for content projection in Svelte 5. Slots are deprecated and should not be used in new code or when updating components.
## 4. Component Communication

4.1. Child to Parent:
- Use callback props for specific actions
- Use two-way binding when appropriate:
  ```html
  <input bind:value={inputValue} /> <!-- Will update inputValue when input element value changes. -->
  <input type="checkbox" bind:checked={checkedValue}/> <!-- Will update checkedValue when input element checked value changes. -->
  ```
- Can use a reactive variable to chain other reactions. Be careful not to create a reactive loop.

## 5. Styling

5.1. Tailwind CSS:
- Use Tailwind classes for consistent styling

5.2. Custom Styling:
- Provide a `class` prop for parent customization:
  ```svelte
  <div class={`base-class ${class}`}>
    <!-- Component content -->
  </div>
  ```

5.3. Theming:
- Use CSS custom properties for easy customization:
  ```css
  :root {
    --primary-color: #3490dc;
  }
  ```

## 6. Lifecycle and State Setup

6.1. onMount:
- Use `onMount` for initialization and setting up component state after the component is first rendered:
  ```javascript
  import { onMount } from 'svelte';

  let someState = $state(null);

  onMount(() => {
    // Initialize component state
    someState = new SomeStateManager();

    // Optional: Return a cleanup function
    return () => {
      // Cleanup code here
    };
  });
  ```
- `onMount` is the preferred method for one-time setup operations, such as initializing collections, setting up subscriptions, or fetching initial data.

6.2. onDestroy:
- Use `onDestroy` for cleanup when the component is removed:
  ```javascript
  import { onDestroy } from 'svelte';

  onDestroy(() => {
    // Cleanup code here, e.g., unsubscribing from events or stopping listeners
  });
  ```

6.3. $effect vs onMount:
- Use `$effect` for reactive computations that depend on state changes:
  ```javascript
  $effect(() => {
    // This runs whenever dependencies change
    console.log(`The count is now ${count}`);
  });
  ```
- Prefer `onMount` over `$effect` for initial setup that doesn't need to react to state changes:
  ```javascript
  // Incorrect usage of $effect for initialization
  $effect(() => {
    if (!someState) {
      someState = new SomeStateManager();
    }
  });

  // Correct usage with onMount
  onMount(() => {
    someState = new SomeStateManager();
  });
  ```

## 7. Imports and Module Organization

7.1. Component Imports:
- Always import Svelte components directly from their .svelte files:
  ```javascript
  // Correct
  import Button from '$lib/core/Button.svelte';
  import Input from '$lib/core/Input.svelte';
  
  // Incorrect - Do not use barrel imports
  import { Button, Input } from '$lib/core';
  ```
- Avoid using barrel imports (index.js) for Svelte components as it can cause issues with bundling and tree-shaking

7.2. Non-Component Imports:
- Use barrel imports (index.js) only for utility functions, constants, and other non-component exports:
  ```javascript
  // Correct for utilities
  import { formatDate, calculateTotal } from '$lib/utils';
  ```

7.3. Import Organization:
- Group imports by type:
  ```javascript
  // Framework imports
  import { onMount } from 'svelte';
  
  // Component imports
  import Button from '$lib/core/Button.svelte';
  import Input from '$lib/core/Input.svelte';
  
  // Utility imports
  import { formatDate } from '$lib/utils';
  ```

## 8. Best Practices

8.1. Composition:
- Favor composition over inheritance
- Create small, focused components

8.2. Performance:
- Use `{#key}` blocks for efficient updates:
  ```svelte
  {#key uniqueId}
    <ExpensiveComponent />
  {/key}
  ```

Remember: 
- Always use Svelte 5 syntax. Avoid Svelte 4 patterns like `export let prop;` or `$:` reactive statements. 
- Never use `createEventDispatcher`. It is deprecated in Svelte 5 and should not be used for component communication.
- Ensure you are not using React syntax or patterns, for example TSX or JSX - snippets are defined in the template.
- Use $bindable() for props that need to be reactive and can be bound by parent components.
- Use $state() for internal component state that doesn't need to be bound.
- For props that are functions (like event handlers), provide a default empty function.
- Slots are deprecated in Svelte 5, use snippets to pass template information into child components.
- Always use callback props for component events and communication.

8.7. Error Handling:
- Use try-catch blocks for async operations:
  ```javascript
  async function handleOperation() {
    try {
      await collection.createDocument(data);
    } catch (error) {
      console.error('Error creating document:', error);
      // Handle error (e.g., show user feedback)
    }
  }
  ```
