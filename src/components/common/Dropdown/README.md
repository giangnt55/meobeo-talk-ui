# Dropdown Component

A reusable dropdown component for selecting options from a list.

## Usage

### Basic Usage (String Array)

```tsx
import { Dropdown } from '@/components/common/Dropdown/Dropdown';

function MyComponent() {
    const [category, setCategory] = useState('');
    const categories = ['Travel', 'Food', 'Technology'];

    return (
        <Dropdown
            value={category}
            onChange={setCategory}
            options={categories}
            placeholder="Select a category"
        />
    );
}
```

### Advanced Usage (Custom Options)

```tsx
import { Dropdown, DropdownOption } from '@/components/common/Dropdown/Dropdown';

function MyComponent() {
    const [country, setCountry] = useState('');
    
    const countries: DropdownOption[] = [
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'vn', label: 'Vietnam' },
    ];

    return (
        <Dropdown
            value={country}
            onChange={setCountry}
            options={countries}
            placeholder="Select a country"
        />
    );
}
```

### With Disabled State

```tsx
<Dropdown
    value={value}
    onChange={setValue}
    options={options}
    disabled={isLoading}
    placeholder="Loading..."
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Currently selected value |
| `onChange` | `(value: string) => void` | - | Callback when selection changes |
| `options` | `DropdownOption[]` or `string[]` | - | List of options to display |
| `placeholder` | `string` | `'Select an option'` | Text shown when no value selected |
| `className` | `string` | `''` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable the dropdown |

## Features

- ✅ Accepts both string arrays and custom option objects
- ✅ Click-outside detection to close dropdown
- ✅ Keyboard-friendly (can be extended)
- ✅ Disabled state support
- ✅ Custom placeholder text
- ✅ Matches project design system
- ✅ Smooth animations
- ✅ Selected state highlighting
