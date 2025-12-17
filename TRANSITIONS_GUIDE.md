# Smooth Page Transitions - Hướng Dẫn Sử Dụng

## Tổng Quan

Hệ thống page transitions đã được tích hợp vào ứng dụng để tạo trải nghiệm chuyển trang mượt mà hơn. Hệ thống sử dụng:

1. **View Transitions API** (cho trình duyệt hiện đại)
2. **CSS Animations** (fallback cho trình duyệt cũ)
3. **Custom Hook** `useSmoothNavigate` (cho navigation có delay)

## Tính Năng Đã Được Thêm

### 1. Auto Page Transitions
Tất cả các trang chính đã tự động có animation fade-in khi load:
- Login page
- Register page  
- Verify Email page
- Main content areas

### 2. Smooth Interactive Elements
Tất cả các elements tương tác có transitions mượt mà:
- Buttons
- Links
- Inputs
- Cards

### 3. Loading Animations
Các class tiện ích cho loading states:
```css
.loading-spinner  /* Spinning animation */
.loading-pulse    /* Pulsing animation */
```

### 4. Stagger Animations
Cho danh sách items xuất hiện lần lượt:
```html
<div class="stagger-item">Item 1</div>
<div class="stagger-item">Item 2</div>
<div class="stagger-item">Item 3</div>
```

## Cách Sử Dụng

### Option 1: Sử dụng Custom Hook (Khuyến nghị)

```tsx
import { useSmoothNavigate } from '@/hooks/useSmoothNavigate';

function MyComponent() {
  const smoothNavigate = useSmoothNavigate();

  const handleClick = () => {
    // Navigate với delay 300ms để animation hoàn thành
    smoothNavigate('/home', { delay: 300 });
  };

  return <button onClick={handleClick}>Go to Home</button>;
}
```

### Option 2: Sử dụng setTimeout (Đang dùng)

```tsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // ... xử lý logic
    success('Success!', 'Operation completed');
    
    // Delay để toast và animation hiển thị
    setTimeout(() => {
      navigate('/home');
    }, 300);
  };
}
```

### Option 3: Tự Động (Không cần code)

Các trang đã tự động có animation khi load, không cần thêm code gì!

## Animations Có Sẵn

### Page Transitions
- `pageEnter` - Fade in + slide up
- `pageExit` - Fade out + slide down

### Utility Animations
- `fadeIn` - Đơn giản fade in
- `fadeOut` - Đơn giản fade out
- `slideUp` - Slide từ dưới lên
- `scaleIn` - Scale từ nhỏ ra lớn
- `spin` - Quay tròn (cho loading)
- `pulse` - Nhấp nháy (cho loading)

## Accessibility

Hệ thống tự động tôn trọng preferences của người dùng:
- Nếu user bật "Reduce Motion", tất cả animations sẽ gần như tắt
- Smooth scroll tự động tắt cho users prefer reduced motion

## Performance

- Sử dụng GPU acceleration (`will-change`)
- Tối ưu cho mobile devices
- Fallback graceful cho browsers cũ

## Thời Gian Khuyến Nghị

- **Page transitions**: 300-350ms
- **Button hover**: 200ms
- **Input focus**: 200ms
- **Modal/Dialog**: 250-300ms
- **Toast notifications**: Hiển thị trước khi navigate (300ms delay)

## Ví Dụ Thực Tế

### Login Flow
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    await login(email, password);
    success("Welcome back!", "Login successful");
    
    // Delay 300ms để user thấy success message
    setTimeout(() => {
      navigate("/home");
    }, 300);
  } catch (err) {
    error("Login Failed", err.message);
  } finally {
    setIsLoading(false);
  }
};
```

### Register Flow
```tsx
const handleRegister = async () => {
  // ... registration logic
  success('Success!', 'Account created!');
  
  setTimeout(() => {
    navigate('/verify-email', {
      state: { email: formData.email }
    });
  }, 1000); // Delay dài hơn cho important actions
};
```

## Browser Support

- ✅ Chrome 111+ (View Transitions API)
- ✅ Edge 111+ (View Transitions API)
- ✅ Safari (CSS Animations fallback)
- ✅ Firefox (CSS Animations fallback)
- ✅ Mobile browsers (Optimized)

## Tips & Best Practices

1. **Luôn delay navigation sau toast notifications** để user có thời gian đọc
2. **Sử dụng 300ms** cho most cases
3. **Sử dụng 500-1000ms** cho important success messages
4. **Không delay** cho error states (để user retry nhanh)
5. **Test với "Reduce Motion"** enabled để đảm bảo accessibility

## Tùy Chỉnh

Nếu muốn tùy chỉnh animations, edit file:
- `src/styles/transitions.css` - Tất cả animations
- `src/styles/global.css` - Base transitions

## Troubleshooting

**Q: Animations không hoạt động?**
A: Kiểm tra xem `transitions.css` đã được import trong `main.tsx`

**Q: Animations quá nhanh/chậm?**
A: Điều chỉnh `animation-duration` trong `transitions.css`

**Q: Muốn tắt animation cho một element?**
A: Thêm class `no-transition` vào element đó
