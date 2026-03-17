# Tổng quan review mã nguồn `meobeo-talk-ui`

## 1) Tình trạng hiện tại (high level)

- Dự án có nền tảng tốt: React + TypeScript strict mode + React Query + router rõ ràng.
- Tuy nhiên hiện trạng chất lượng mã đang **chưa sạch để scale** do:
  - ESLint đang fail nhiều lỗi (chủ yếu `any`, vi phạm rules hooks/effect).
  - Kiến trúc state có dấu hiệu phân mảnh (AuthContext + Redux + React Query cache song song).
  - HTTP/client layer đang trộn concern (networking + logging + redirect + token-refresh logic cùng 1 nơi).
  - Có cảnh báo bundle size lớn và một số pattern khiến code-splitting chưa hiệu quả.

## 2) Các điểm cần ưu tiên cải thiện

### P0 — Bắt buộc xử lý sớm

1. **Đưa lint về trạng thái pass và bật quality gate trong CI**
   - Hiện tại `npm run lint` fail với số lượng lỗi lớn, trong đó có các lỗi nghiêm trọng như gọi hook có điều kiện và `setState` trong effect đồng bộ.
   - Đề xuất:
     - Chia backlog fix lint theo nhóm: `any` typing, hook rules, effect rules.
     - Tạm thời đặt mục tiêu “không phát sinh lỗi lint mới” trước khi xử lý hết legacy.

2. **Sửa các vi phạm React hooks có thể gây bug runtime**
   - Có pattern `useEffect` được gọi conditionally (đây là lỗi logic nghiêm trọng).
   - Có nhiều chỗ cập nhật state trực tiếp trong effect đồng bộ, có thể tạo render loop/cascading render.

3. **Chuẩn hóa chiến lược state management (single source of truth cho auth/user)**
   - Hiện có cả `AuthContext`, Redux slice, và React Query cache cùng tham gia vào user/auth data.
   - Đề xuất chọn 1 hướng chính:
     - Auth session trong Context (hoặc store), data server state trong React Query.
     - Nếu Redux không dùng ở UI/runtime, loại bỏ để giảm độ phức tạp.

### P1 — Nên xử lý ngay sau P0

4. **Refactor `ky-client` theo hướng tách lớp**
   - Tách `auth refresh`, `error normalization`, `debug logging` thành module riêng để dễ test và bảo trì.
   - Tránh hard redirect (`window.location.href`) ngay trong network layer; nên bắn event hoặc callback về auth/session layer.

5. **Chuẩn hóa kiểu dữ liệu API, loại bỏ `any` có hệ thống**
   - `ApiResponse<T = any>` và nhiều utility đang dùng `any` làm mất lợi ích của TypeScript strict.
   - Nên dùng generic với default `unknown`, sau đó parse/guard tại boundary.

6. **Tối ưu bundle và chiến lược lazy-loading**
   - Build hiện có cảnh báo chunk lớn; router đang import tĩnh rất nhiều page.
   - Nên chuyển page-level imports sang lazy + suspense để giảm initial load.

### P2 — Cải thiện chất lượng dài hạn

7. **Đồng bộ convention code style và naming**
   - Đang trộn alias import (`@/...`) với relative import (`../../...`) trong cùng khu vực code.
   - Nên enforce 1 convention bằng ESLint rule/autofix.

8. **Bổ sung test chiến lược tối thiểu**
   - Nên có test cho các luồng critical: login/logout/refresh token, route guard, verify-email flow.
   - Với HTTP layer, nên viết test cho interceptor/hook behavior để tránh regression.

## 3) Lộ trình refactor đề xuất

### Giai đoạn 1 (1-2 sprint)
- Thiết lập CI quality gate: `lint` + `typecheck` + `build`.
- Fix các lỗi hooks/effect và các chỗ `any` trong auth + core API trước.
- Quyết định kiến trúc auth state chính thức và loại bỏ phần dư thừa.

### Giai đoạn 2 (1 sprint)
- Refactor `ky-client` thành module nhỏ có thể test.
- Chuẩn hóa error model (HTTP/network/business error).
- Chuẩn hóa import convention và query key convention.

### Giai đoạn 3 (liên tục)
- Bổ sung test E2E/smoke cho auth + route guard.
- Tối ưu bundle với route-level lazy loading, theo dõi lại size sau mỗi release.

## 4) Kết luận

Mã nguồn hiện **đủ để phát triển tính năng**, nhưng để đảm bảo ổn định khi team mở rộng thì nên ưu tiên xử lý nợ kỹ thuật ở lint/hook/state architecture trước. Nếu cần, mình có thể tiếp tục làm một bản “refactor plan chi tiết theo file” (ước lượng effort theo ngày công + thứ tự PR cụ thể).
