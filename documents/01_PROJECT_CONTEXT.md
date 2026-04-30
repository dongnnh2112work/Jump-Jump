# HOWL JUMP — Project Context
> **Howl Studio** · Body-tracking Jump Game · v0.1
> Cập nhật: 2026-04-30

---

## 1. Product Overview

Howl Jump là một **HTML5 browser game** được tích hợp vào hệ sinh thái sự kiện của **Howl Studio** — một vendor chuyên interactive game/check-in software cho event marketing tại Việt Nam.

Game cho phép người chơi **dùng cơ thể thật** (ngồi xuống → đứng lên) để điều khiển nhân vật nhảy qua các platform trên không. Đây là điểm khác biệt cốt lõi so với game thông thường: **lực nhảy được tính từ tốc độ và biên độ cử động cơ thể**.

---

## 2. Business Context

| | |
|---|---|
| **Vendor** | Howl Studio |
| **Khách hàng** | Event agency & brand (B2B) |
| **Môi trường** | Indoor kiosk booth tại event/activation |
| **Phần cứng** | Laptop + Webcam USB + TV 43–55" (HDMI) |
| **Stack** | React + Firebase + Vercel |
| **Timeline** | Launch tháng 4–5/2026 |
| **Budget** | Dưới 20 triệu VNĐ toàn bộ |

---

## 3. Core Mechanic — Body Jump

### Luồng dữ liệu
```
Webcam → MediaPipe Pose → Hip Y tracking → State Machine → jumpPower → Game Engine
```

### Công thức jump power
```js
jumpPower = clamp(
  hipVelocityUp * 0.65 * powerMult + squatDepth * 0.4,
  MIN_POWER,   // 15
  MAX_POWER    // 100
)
```

### State machine
```
IDLE → STANDING → CROUCHING (hip đi xuống nhanh) → JUMP (hip bật lên) → COOLDOWN → STANDING
```

### Mapping jumpPower → game behavior

| Power | Hành vi | Feedback màu |
|---|---|---|
| < 15 | Không trigger | Thanh xám |
| 15–40 | Nhảy thấp/ngắn | Xanh lá nhạt |
| 40–70 | Nhảy vừa | Xanh lá |
| 70–90 | Nhảy cao + xa | Vàng |
| 90–100 | MAX — platform xa nhất | Cam/đỏ |

---

## 4. Reference Game: Flip Jump

Phân tích từ screenshots gốc (marketjs.com/flip-jump-responsive):

| Yếu tố | Chi tiết |
|---|---|
| **Góc nhìn** | Isometric 3D (~45° từ trên-trước) |
| **Camera** | Fixed, không scroll ngang — player tiến về phía camera |
| **Platform** | Khối vuông 3D có độ dày, màu đa dạng (xanh cỏ, xám, hồng, đen) |
| **Nhân vật** | Voxel character, nhảy + flip (xoay người) giữa không trung |
| **Background** | Sky gradient xanh nhạt + mây trắng floating |
| **Scoring** | Đếm số platform đã qua, hiện góc trên trái |
| **Game over** | Score + best, nút Home + Retry + Revive |

---

## 5. File Structure

```
howl-jump/
├── index.html
├── style.css
├── assets/
│   └── (không có — dùng Canvas thuần)
├── js/
│   ├── main.js          — entry point, init
│   ├── game.js          — game loop, physics, rendering
│   ├── platforms.js     — platform generation + isometric draw
│   ├── character.js     — voxel character draw + animation
│   ├── tracking.js      — MediaPipe + state machine + jump power
│   ├── ui.js            — power bar, score, overlays, sound
│   └── config.js        — CFG constants + debug sliders
├── 01_PROJECT_CONTEXT.md
├── 02_RULES.md
├── 03_TODO.md
└── 04_UXUI_DESIGN.md
```

---

## 6. Known Risks

| Risk | Severity | Mitigation |
|---|---|---|
| MediaPipe CDN down tại event | High | Bundle MediaPipe locally hoặc cache Service Worker |
| Ánh sáng sân khấu flicker | High | Test trước, dùng curtain/backdrop đơn sắc phía sau người chơi |
| Laptop yếu → lag > 100ms | High | Min spec i5 Gen 10, 8GB RAM, Chrome, tắt app nền |
| Người chơi đứng sai góc | Medium | Sticker footprint dưới sàn, barrier định vị |
| Double jump do noise camera | Medium | Debounce 400ms + state machine |
| Camera bị từ chối (HTTPS) | Medium | Chạy local server hoặc deploy HTTPS trên Vercel |

> **Lưu ý HTTPS**: MediaPipe + Camera API yêu cầu HTTPS hoặc `localhost`. Tại event dùng `localhost` hoặc deploy Vercel trước.

---

*Howl Studio · 2026-04-30*
