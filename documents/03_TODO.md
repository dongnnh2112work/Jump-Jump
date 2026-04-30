# HOWL JUMP — Todo List
> Dành cho: Cursor AI
> Cập nhật: 2026-04-30

---

## Phase 0 — Setup `(~1 ngày)`

- [ ] Tạo project structure: `index.html`, `style.css`, `js/game.js`, `js/tracking.js`, `js/ui.js`, `js/config.js`
- [ ] Setup Google Fonts: `Fredoka One` (heading/score) + `Nunito` (UI) + `DM Mono` (debug)
- [ ] Setup CSS variables cho toàn bộ color system (xem `04_UXUI_DESIGN.md`)
- [ ] Setup Canvas resize responsive theo container
- [ ] Implement keyboard fallback controls (SPACE, ↓, ↑, R, F, Ctrl+D)

---

## Phase 1 — Game Engine `(~2–3 ngày)`

### Isometric Renderer
- [ ] Hàm `worldToScreen(x, y, z)` — convert world coords → screen coords isometric
- [ ] Hàm `drawIsoPlatform(ctx, sx, sy, w, d, h, colors)` — vẽ platform 3 mặt (top / left / right)
- [ ] Hàm `drawVoxelCharacter(ctx, sx, sy, state, flipAngle)` — vẽ nhân vật pixel art 4 phần (head, face, body, legs)

### Platform Generation
- [ ] Generate platform ngẫu nhiên dọc theo path isometric
- [ ] Mỗi platform có `requiredPower` tính từ khoảng cách gap
- [ ] 4 loại platform theo màu: `grass` (xanh cỏ) / `stone` (xám) / `special` (hồng) / `dark` (đen)
- [ ] _(v0.2)_ Moving platform
- [ ] _(v0.2)_ Bounce platform

### Physics
- [ ] Gravity + parabolic jump arc
- [ ] Landing detection: collision với mặt top của platform
- [ ] Fall death: player.y vượt quá viewport + 100px
- [ ] Jump + flip animation: rotate character 360° trong 0.4s khi bay

### Camera
- [ ] Isometric fixed camera, player tiến về phía trước-trái
- [ ] Platform scroll về phía player (player không move tuyệt đối)
- [ ] Smooth vertical follow nhẹ khi player lên/xuống (lerp 0.1)

---

## Phase 2 — Body Tracking `(~2 ngày)`

### MediaPipe Integration
- [ ] Load MediaPipe Pose từ CDN (`@mediapipe/pose`)
- [ ] Mở webcam: `{ width: 640, height: 480, facingMode: 'user' }`
- [ ] Graceful fallback nếu camera bị từ chối → tự động chuyển keyboard mode

### Skeleton Overlay
- [ ] Canvas overlay trên video feed (transform: scaleX(-1) để mirror)
- [ ] Vẽ các kết nối xương: upper body + lower body (bỏ kết nối tay chi tiết)
- [ ] Highlight 2 điểm hông `#FF6B35`, radius 6px
- [ ] Label "HIP" floating 8px trên điểm hông, font 10px white

### State Machine
- [ ] Implement đủ 5 states: `IDLE → STANDING → CROUCHING → JUMP → COOLDOWN → STANDING`
- [ ] Hip history buffer: `Array` giữ 8 frame gần nhất
- [ ] Velocity: `velocity = hipHistory[0] - hipHistory[last]`
- [ ] squatDepth: `squatBottomY = Math.max(squatBottomY, currentHipPx)`
- [ ] Standing baseline drift correction: `standingBaseY = baseY * 0.95 + currentY * 0.05`

### Jump Power Calculation
- [ ] Hàm `calcJumpPower(velocityUp, squatDepth)` → trả về power 0–100
- [ ] Clamp MIN (15) / MAX (100)
- [ ] Map power → `player.vy`: `vy = -(power * 0.18 + 4)`

---

## Phase 3 — UI / UX `(~1–2 ngày)`

### Main Layout
- [ ] Left panel 300px: camera feed + skeleton overlay
- [ ] Center flex-1: game canvas
- [ ] Right panel 260px: score + leaderboard + keyboard help
- [ ] Top bar 48px: logo + camera status dot

### Power Bar
- [ ] Fill realtime theo `currentPower` (0–100)
- [ ] 3 zone markers: đường dọc mờ tại 20% và 80%
- [ ] Color transition: xám → xanh lá → vàng → đỏ
- [ ] Zone label thay đổi theo vùng: "Quá nhẹ" / "Power zone" / "Mạnh" / "MAX"
- [ ] Floating in-game indicator hiện khi `poseState === CROUCHING`

### Score & Stats
- [ ] Score chính = số platform đã qua thành công
- [ ] Best score lưu `localStorage`
- [ ] Jump count trong session

### Tutorial Overlay
- [ ] SVG animation minh họa: ngồi xuống → đứng lên → nhảy (3 frame)
- [ ] Auto-hide sau 4 giây
- [ ] Tap/click để skip

### Game Over Screen
- [ ] Score + Best hiển thị lớn, centered
- [ ] Nút Retry + Home
- [ ] Leaderboard session top 5

### Misc
- [ ] Fullscreen toggle: phím `F` hoặc nút góc màn hình
- [ ] Sound effects bằng Web Audio API (không cần file):
  - [ ] Jump: oscillator 200→400Hz, duration 0.1s
  - [ ] Land: oscillator 400→200Hz, duration 0.08s
  - [ ] Fail: oscillator 300→100Hz, duration 0.3s
- [ ] Debug panel (`Ctrl+D`): 4 config sliders + hip Y value + state + FPS

---

## Phase 4 — Polish `(~1 ngày)`

- [ ] Clouds floating animation ở background (parallax 2 lớp)
- [ ] Particle dust khi landing
- [ ] Screen shake nhẹ khi game over (3 frame, 4px offset)
- [ ] Combo counter khi nhảy nhiều platform liên tiếp không rớt
- [ ] "NEW BEST!" animation pop-up khi phá kỷ lục

---

## Phase 5 — Event Ready `(~1 ngày)`

- [ ] **Kiosk mode**: ẩn cursor, disable right-click context menu, disable F12 devtools
- [ ] **Auto-restart**: không có input trong 30 giây → quay về màn hình chờ
- [ ] **Attract screen**: auto-play demo loop khi idle (character tự nhảy)
- [ ] **Branding layer**: logo client swap được qua `config.json` (không cần đổi code)
- [ ] Test cross-browser: Chrome ✓ (bắt buộc) · Edge ✓ (bắt buộc) · Firefox (optional)

---

*Howl Studio · 2026-04-30*
