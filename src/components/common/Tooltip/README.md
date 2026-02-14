# Tooltip Component

A reusable tooltip component following the MeoBeo design system.

## Features

- **Dark theme** with warm background (#221810)
- **Arrow pointer** that adjusts based on position
- **Multiple positions**: top, bottom, left, right
- **Configurable delay** before showing
- **Smooth animations**
- **Auto-positioning** to stay within viewport

## Usage

### Basic Example

```tsx
import { Tooltip } from '@/components/common/Tooltip';

function MyComponent() {
    return (
        <Tooltip content="Edit Memory">
            <button className="icon-button">
                <span className="material-symbols-outlined">edit</span>
            </button>
        </Tooltip>
    );
}
```

### With Custom Position

```tsx
<Tooltip content="This is a helpful tip" position="bottom">
    <span>Hover me</span>
</Tooltip>
```

### With Custom Delay

```tsx
<Tooltip content="Quick tip" delay={100}>
    <button>Fast tooltip</button>
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | Required | The text to display in the tooltip |
| `children` | `React.ReactElement` | Required | The element that triggers the tooltip |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position of the tooltip relative to trigger |
| `delay` | `number` | `200` | Delay in milliseconds before showing tooltip |

## Design System

- **Background**: `#221810` (Dark warm background)
- **Text**: `#f8f7f6` (Light text)
- **Border Radius**: `0.5rem` (8px)
- **Shadow**: Floating elevation (12% opacity)
- **Font Size**: `0.75rem` (12px)
- **Font Weight**: 500 (Medium)

## Examples in Notifications

```tsx
import { Tooltip } from '@/components/common/Tooltip';

<Tooltip content="Full notification message here...">
    <p className="notification-text">
        Truncated message...
    </p>
</Tooltip>
```
