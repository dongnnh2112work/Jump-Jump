# HOWL JUMP — Rules
> Dành cho: Cursor AI
> Cập nhật: 2026-04-30

---

## 1. Architecture Rules

- **Single HTML file** cho prototype — không split file khi chưa cần thiết
- **Không dùng backend** ở v0.1 — mọi state lưu `localStorage`
- **Firebase Realtime DB** chỉ dùng cho leaderboard khi sang v0.2
- **MediaPipe chạy client-side** hoàn toàn — không gửi video lên server bất kỳ lúc nào
- Keyboard fallback **bắt buộc** — game phải chơi được hoàn toàn khi không có webcam

---

## 2. MediaPipe Rules

```js
// Chỉ dùng 2 landmarks này — đủ để detect jump, nhẹ hơn full-body
const USED_LANDMARKS = [23, 24]; // left hip, right hip

// Minimum visibility threshold — bỏ qua nếu bị che khuất
const MIN_VISIBILITY = 0.4;

// History window để tính velocity
const HIP_HISTORY_SIZE = 8; // frames

// Debounce — tránh double jump
const COOLDOWN_MS = 400;
```

- **KHÔNG** dùng `modelComplexity: 2` — quá nặng cho laptop event thực tế
- **PHẢI** có `smoothLandmarks: true` — giảm jitter khi tracking
- **PHẢI** show skeleton overlay trên camera feed — đây là WOW factor
- Highlight **2 điểm hông màu cam `#FF6B35`** để người chơi thấy camera đang track đúng
- **PHẢI** có graceful fallback khi camera bị từ chối — hiện thông báo rõ ràng, chuyển sang keyboard mode tự động

---

## 3. Game Engine Rules

- Dùng **HTML5 Canvas API thuần** — không Phaser.js cho prototype (tránh dependency nặng)
- Phaser.js chỉ xem xét ở v0.2 nếu cần nhiều animation/asset hơn
- **60fps target** — bắt buộc dùng `requestAnimationFrame`, không dùng `setInterval`
- **Isometric rendering** bằng Canvas 2D transform — không cần WebGL
- Platform phải có **3 mặt được vẽ rõ ràng** (top, left side, right side) để trông isometric thật
- Nhân vật phải có animation **flip/rotate 360°** khi nhảy giữa không trung
- **Không** hardcode kích thước canvas — phải responsive theo container

---

## 4. UX Rules — Critical cho Event

- **Tutorial bắt buộc** hiện lần đầu: animation 3 giây mô tả "ngồi xuống → đứng lên → nhảy"
- **Power bar phải visible mọi lúc** khi đang chơi — người đứng xem xung quanh phải hiểu ngay
- **Font size tối thiểu**: score 48px, power bar height 20px — đọc được từ 2–3m
- **Âm thanh**: jump + land + game over sound dùng Web Audio API (không cần file âm thanh ngoài)
- **Touch support**: game phải chơi được bằng tap trên tablet (fallback cho kiosk không webcam)
- **Fullscreen button** bắt buộc — kiosk cần chiếm toàn bộ màn hình TV

---

## 5. Config Rules — Tuning tại event

Tất cả thông số tracking **phải có slider điều chỉnh được** trong debug panel:

| Param | Range | Default | Mô tả |
|---|---|---|---|
| `squatThreshold` | 10–80 | 30 | Độ nhạy phát hiện ngồi xuống |
| `jumpThreshold` | 5–60 | 20 | Velocity tối thiểu để trigger jump |
| `powerMultiplier` | 0.5–3.0 | 1.2 | Scale lực nhảy tổng thể |
| `cooldownMs` | 200–800 | 400 | Thời gian chờ giữa 2 jump |

Debug panel **ẩn mặc định**, toggle bằng `Ctrl + D`.

---

## 6. Code Style Rules

```
Naming:
  Component   → PascalCase      (GameCanvas, PowerBar)
  Function    → camelCase       (calcJumpPower, drawPlatform)
  Constant    → UPPER_SNAKE     (MAX_POWER, HIP_HISTORY_SIZE)
  CSS class   → kebab-case      (power-bar, game-canvas)

Comment:
  Business logic  → tiếng Việt OK
  Technical code  → tiếng Anh

Quality:
  - Không dùng `var` — chỉ `const` và `let`
  - Không inline style dài — dùng CSS class
  - Mỗi function tối đa 40 dòng — tách nếu dài hơn
  - Mỗi file tối đa 300 dòng — tách module nếu cần
```

---

*Howl Studio · 2026-04-30*
