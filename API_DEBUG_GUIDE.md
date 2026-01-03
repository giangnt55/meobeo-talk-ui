# API Debugging Guide - Mobile Browser Issues

## 🎯 Mục đích
Hướng dẫn này giúp bạn debug các vấn đề API call khi frontend (Cloudflare Pages) gọi API từ mobile browser.

## 🔧 Các công cụ đã được thêm vào

### 1. **Enhanced API Logging** (`src/lib/ky-client.ts`)
Tất cả API requests/responses/errors đều được log tự động với thông tin:
- Device type (Mobile/Desktop)
- User agent
- Network status (Online/Offline)
- Request URL, method, headers
- Response status, headers
- Error details với possible causes

### 2. **API Debug Panel** (`src/components/debug/ApiDebugPanel.tsx`)
Một panel floating để xem logs real-time trên cả desktop và mobile.

**Cách sử dụng:**
1. Mở app trên mobile browser
2. Click vào nút **"🐛 API Logs"** ở góc dưới bên phải
3. Xem logs theo filter: ALL, REQUEST, RESPONSE, ERROR
4. Export logs để phân tích sau

**Các tính năng:**
- ✅ Real-time log updates
- ✅ Filter by type (Request/Response/Error)
- ✅ Export logs as JSON
- ✅ Clear logs
- ✅ Mobile-responsive design

## 🐛 Các vấn đề thường gặp trên Mobile Browser

### 1. **Mixed Content (HTTPS/HTTP)**
**Triệu chứng:**
- Desktop: ✅ Works
- Mobile: ❌ Failed (no response)
- Console error: "Mixed Content: The page at 'https://...' was loaded over HTTPS, but requested an insecure resource 'http://...'"

**Nguyên nhân:**
- Frontend deploy trên Cloudflare (HTTPS)
- API đang chạy HTTP (không có SSL cert)
- Mobile browsers block mixed content mặc định

**Giải pháp:**
```bash
# Option 1: Setup HTTPS cho API với Let's Encrypt
# Xem conversation: 6e68d52d-f232-4e6e-adc7-59098c2698ba

# Option 2: Tạm thời test với ngrok
ngrok http 3000
# Update VITE_API_URL trong Cloudflare Pages settings
```

### 2. **CORS Issues**
**Triệu chứng:**
- Console error: "Access to fetch at '...' from origin '...' has been blocked by CORS policy"

**Kiểm tra:**
```typescript
// Xem logs trong API Debug Panel
// Nếu thấy error với possibleCauses: ['CORS policy blocking request']
```

**Giải pháp:**
Đảm bảo CORS middleware cho phép Cloudflare Pages origin:
```go
// File: internal/interfaces/http/middleware/cors.go
allowedOrigins := map[string]bool{
    "https://meobeo-talk-ui.pages.dev": true,
    "https://your-custom-domain.com": true, // Nếu có custom domain
    "http://localhost:5173": true,
}
```

### 3. **Network Timeout**
**Triệu chứng:**
- Mobile network chậm hơn desktop
- Request timeout sau 30s

**Giải pháp:**
```typescript
// Đã được config trong ky-client.ts
timeout: 30000, // 30 seconds
retry: {
  limit: 2,
  methods: ['get', 'put', 'delete'],
}
```

### 4. **Cookie/Storage Issues**
**Triệu chứng:**
- Refresh token không hoạt động trên mobile
- User bị logout liên tục

**Kiểm tra:**
```javascript
// Trong mobile browser console
console.log('Access Token:', localStorage.getItem('accessToken'));
console.log('Cookies:', document.cookie);
```

**Lưu ý:**
- Mobile Safari có thể block third-party cookies
- Private/Incognito mode có thể clear storage

## 📱 Cách Debug trên Mobile

### Method 1: Sử dụng API Debug Panel (Recommended)
1. Deploy code lên Cloudflare Pages
2. Mở app trên mobile browser
3. Click nút "🐛 API Logs"
4. Thực hiện action gây lỗi
5. Xem logs trong panel
6. Export logs và gửi cho team

### Method 2: Remote Debugging

**Android Chrome:**
1. Kết nối phone qua USB
2. Enable USB Debugging trên phone
3. Mở `chrome://inspect` trên desktop Chrome
4. Click "Inspect" trên device của bạn

**iOS Safari:**
1. Enable Web Inspector trên iPhone (Settings > Safari > Advanced)
2. Kết nối iPhone qua USB
3. Mở Safari trên Mac > Develop > [Your iPhone] > [Your Page]

### Method 3: Console Logs
```javascript
// Xem logs trong browser console
console.log(JSON.parse(sessionStorage.getItem('api_logs')));

// Hoặc copy logs
copy(sessionStorage.getItem('api_logs'));
```

## 🔍 Phân tích Logs

### Log Structure
```json
{
  "timestamp": "2026-01-03T12:00:00.000Z",
  "type": "ERROR",
  "device": "MOBILE",
  "userAgent": "Mozilla/5.0 (iPhone...)",
  "online": true,
  "url": "https://api.example.com/endpoint",
  "method": "GET",
  "errorName": "HTTPError",
  "errorMessage": "Request failed with status code 0",
  "networkError": true,
  "possibleCauses": [
    "CORS policy blocking request",
    "Network timeout",
    "Server unreachable",
    "Mixed content (HTTP/HTTPS)",
    "DNS resolution failure"
  ]
}
```

### Các Error Patterns

**Pattern 1: Status Code 0**
```json
{
  "status": 0,
  "networkError": true
}
```
→ **Nguyên nhân:** CORS hoặc Mixed Content
→ **Giải pháp:** Kiểm tra CORS config và HTTPS

**Pattern 2: Status Code 401**
```json
{
  "status": 401,
  "url": "https://api.../protected-endpoint"
}
```
→ **Nguyên nhân:** Token expired hoặc invalid
→ **Giải pháp:** Kiểm tra token refresh logic

**Pattern 3: Status Code 504**
```json
{
  "status": 504,
  "statusText": "Gateway Timeout"
}
```
→ **Nguyên nhân:** API server quá chậm
→ **Giải pháp:** Optimize API hoặc tăng timeout

## ✅ Checklist Debug

- [ ] Kiểm tra API URL trong environment variables
- [ ] Đảm bảo API đang chạy và accessible
- [ ] Verify CORS configuration cho phép Cloudflare origin
- [ ] Kiểm tra HTTPS/HTTP mixed content
- [ ] Test trên cả WiFi và Mobile Data
- [ ] Kiểm tra localStorage/cookies trên mobile
- [ ] Xem logs trong API Debug Panel
- [ ] Test với different mobile browsers (Chrome, Safari, Firefox)
- [ ] Kiểm tra network tab trong remote debugging

## 🚀 Next Steps

Sau khi fix được issue:
1. Remove hoặc disable API Debug Panel trong production
2. Setup proper error tracking (Sentry, LogRocket)
3. Implement analytics để track mobile vs desktop success rates
4. Setup HTTPS cho API với Let's Encrypt

## 📞 Support

Nếu vẫn gặp vấn đề:
1. Export logs từ API Debug Panel
2. Screenshot error messages
3. Note down: Device, OS version, Browser version
4. Share với team để phân tích
