# 🐛 Quick Debug Guide - Mobile API Issues

## Vấn đề hiện tại
Frontend deploy trên Cloudflare Pages gọi API:
- ✅ Desktop browser: Hoạt động bình thường
- ❌ Mobile browser: Không hoạt động

## Công cụ Debug đã được thêm vào

### 1. API Debug Panel (UI)
- Nút floating "🐛 API Logs" ở góc dưới phải màn hình
- Click để xem logs real-time
- Filter: ALL | REQUEST | RESPONSE | ERROR
- Export logs as JSON
- Mobile-friendly

### 2. Console Debug Utils
Mở browser console và gõ:

```javascript
// Xem tất cả logs
debugUtils.getLogs()

// Xem chỉ errors
debugUtils.getErrors()

// Xem logs từ mobile
debugUtils.getMobileLogs()

// Xem network errors (CORS, timeout, etc.)
debugUtils.getNetworkErrors()

// Xem summary
debugUtils.getSummary()

// Xem logs cho URL cụ thể
debugUtils.getLogsByUrl('/auth/login')

// Watch real-time
const stop = debugUtils.watch()
// Gõ stop() để dừng

// Xem tất cả commands
debugUtils.help()
```

## Cách Debug trên Mobile

### Option 1: Dùng API Debug Panel (Dễ nhất)
1. Deploy code lên Cloudflare Pages
2. Mở app trên mobile browser
3. Click nút "🐛 API Logs"
4. Thực hiện action gây lỗi
5. Xem logs và export

### Option 2: Remote Debugging

**Android:**
```bash
# 1. Kết nối phone qua USB
# 2. Enable USB Debugging
# 3. Mở chrome://inspect trên desktop Chrome
```

**iOS:**
```bash
# 1. Enable Web Inspector (Settings > Safari > Advanced)
# 2. Kết nối iPhone qua USB
# 3. Safari > Develop > [iPhone] > [Page]
```

### Option 3: Console Commands
```javascript
// Trong mobile browser console
debugUtils.getSummary()
debugUtils.getErrors()
debugUtils.exportLogs()
```

## Các lỗi thường gặp

### 1. Mixed Content (HTTP/HTTPS) ⚠️
**Dấu hiệu:**
- Error log có `networkError: true`
- `possibleCauses` chứa "Mixed content (HTTP/HTTPS)"

**Nguyên nhân:**
- Frontend: HTTPS (Cloudflare)
- API: HTTP (chưa có SSL cert)

**Giải pháp:**
- Setup HTTPS cho API (xem conversation 6e68d52d)
- Hoặc dùng ngrok tạm thời

### 2. CORS Error 🚫
**Dấu hiệu:**
- Error log có `possibleCauses: ['CORS policy blocking request']`
- Status code = 0

**Giải pháp:**
Kiểm tra file `meobeo-talk-api/internal/interfaces/http/middleware/cors.go`:
```go
allowedOrigins := map[string]bool{
    "https://meobeo-talk-ui.pages.dev": true,
    "https://your-domain.com": true, // Thêm domain của bạn
}
```

### 3. Network Timeout ⏱️
**Dấu hiệu:**
- Request mất > 30s
- Mobile network chậm

**Đã fix:**
- Timeout: 30s
- Auto retry: 2 lần

## Files đã thay đổi

```
src/
├── lib/
│   └── ky-client.ts              # ✅ Enhanced logging
├── components/
│   └── debug/
│       ├── ApiDebugPanel.tsx     # ✅ Debug panel UI
│       └── ApiDebugPanel.css     # ✅ Styles
├── utils/
│   └── debugUtils.ts             # ✅ Console utilities
└── main.tsx                      # ✅ Import debug tools

API_DEBUG_GUIDE.md                # 📖 Chi tiết hướng dẫn
```

## Next Steps

1. **Test ngay:**
   ```bash
   npm run dev
   # Mở http://localhost:5173
   # Click nút "🐛 API Logs"
   ```

2. **Deploy lên Cloudflare:**
   ```bash
   npm run build
   # Deploy dist/ folder
   ```

3. **Test trên mobile:**
   - Mở app trên mobile
   - Click "🐛 API Logs"
   - Thực hiện login/action
   - Xem logs để tìm lỗi

4. **Phân tích logs:**
   - Export logs
   - Tìm `networkError: true`
   - Xem `possibleCauses`
   - Fix theo hướng dẫn

## Disable Debug Tools (Production)

Khi đã fix xong, comment out trong `main.tsx`:
```tsx
// import { ApiDebugPanel } from '@/components/debug/ApiDebugPanel';
// import '@/utils/debugUtils';

// <ApiDebugPanel /> // Comment dòng này
```

Hoặc chỉ enable khi development:
```tsx
{import.meta.env.DEV && <ApiDebugPanel />}
```

## 📞 Cần thêm help?

Xem file `API_DEBUG_GUIDE.md` để biết chi tiết hơn về:
- Các error patterns
- Remote debugging setup
- Log structure
- Advanced troubleshooting
