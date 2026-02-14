# Modal Components

Reusable modal/popup components following the MeoBeo design system.

## Components

### Base Modal
Generic modal wrapper with backdrop and close functionality.

### ConfirmModal
Confirmation dialog for destructive or important actions.

### SuccessModal
Success feedback with icon and message.

### InfoModal
Information popup with icon, content, and call-to-action.

## Usage Examples

### Confirmation Modal
```tsx
import { ConfirmModal } from '@/components/common/Modal';

function MyComponent() {
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <ConfirmModal
            isOpen={showConfirm}
            onClose={() => setShowConfirm(false)}
            onConfirm={() => {
                // Handle confirmation
                setShowConfirm(false);
            }}
            title="Discard this memory?"
            message="Are you sure you want to let this moment go? This action cannot be undone."
            confirmText="Keep"
            cancelText="Discard"
            variant="primary"
        />
    );
}
```

### Success Modal
```tsx
import { SuccessModal } from '@/components/common/Modal';

<SuccessModal
    isOpen={showSuccess}
    onClose={() => setShowSuccess(false)}
    title="Memory Saved"
    message="Your story has been safely tucked away in your sanctuary."
    buttonText="Close"
/>
```

### Info Modal
```tsx
import { InfoModal } from '@/components/common/Modal';

<InfoModal
    isOpen={showInfo}
    onClose={() => setShowInfo(false)}
    title="Privacy Settings"
    icon="lock"
    iconColor="blue"
    buttonText="Understood"
>
    <p>Your memories are private by default. Only you can access your Digital Sanctuary.</p>
    
    <div className="info-highlight">
        <div className="info-highlight-content">
            <span className="material-symbols-outlined">info</span>
            <p>We use end-to-end encryption to ensure your thoughts remain yours alone.</p>
        </div>
    </div>
</InfoModal>
```

## Props

### ConfirmModal
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | Required | Controls modal visibility |
| `onClose` | `() => void` | Required | Close handler |
| `onConfirm` | `() => void` | Required | Confirmation handler |
| `title` | `string` | Required | Modal title |
| `message` | `string` | Required | Confirmation message |
| `confirmText` | `string` | `'Confirm'` | Confirm button text |
| `cancelText` | `string` | `'Cancel'` | Cancel button text |
| `variant` | `'danger' \| 'warning' \| 'primary'` | `'primary'` | Button color variant |

### SuccessModal
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | Required | Controls modal visibility |
| `onClose` | `() => void` | Required | Close handler |
| `title` | `string` | Required | Success title |
| `message` | `string` | Required | Success message |
| `buttonText` | `string` | `'Close'` | Button text |

### InfoModal
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | Required | Controls modal visibility |
| `onClose` | `() => void` | Required | Close handler |
| `title` | `string` | Required | Modal title |
| `icon` | `string` | `'info'` | Material icon name |
| `iconColor` | `'blue' \| 'amber' \| 'green' \| 'red'` | `'blue'` | Icon background color |
| `children` | `React.ReactNode` | Required | Modal content |
| `buttonText` | `string` | `'Understood'` | Button text |

## Design System

- **Border Radius**: 2xl (16px) for modal containers
- **Shadow**: Floating elevation (12% opacity)
- **Colors**: 
  - Primary: `#cf4517`
  - Dark button: `#221810`
  - Success: `#22c55e`
- **Typography**: Plus Jakarta Sans, Bold/Semibold weights
