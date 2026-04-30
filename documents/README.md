# Howl Jump

> **Howl Studio** · HTML5 Body-Tracking Jump Game  
> Version: 0.1 · Updated: 2026-04-30

---

## Giới thiệu

**Howl Jump** là một trò chơi HTML5 chạy trên trình duyệt, được thiết kế cho kiosk booth tại các sự kiện event marketing. Điểm đặc biệt: người chơi **dùng cơ thể thật** — ngồi xuống và đứng lên — để điều khiển nhân vật nhảy qua các platform theo phong cách isometric 3D.

Game sử dụng **MediaPipe Pose** để theo dõi chuyển động cơ thể qua webcam theo thời gian thực. Lực nhảy được tính từ tốc độ và biên độ cử động của người chơi.

---

## Tính năng

- **Body tracking** qua webcam — ngồi xuống + đứng lên để nhảy, không cần controller
- **Keyboard fallback** — chơi bằng `SPACE` / `↑` / `↓` khi không có webcam
- **Isometric renderer** — platform 3D với rounded corners, gradient và stack layers
- **3 loại nhân vật** — Boy, Robot, Astronaut, mỗi loại có visual riêng
- **5 loại platform** — Grass, Stone, Red, Dark, Special với độ khó tăng dần
- **Tracking mode switch** — SHOULDER / HEAD / HIP trong debug panel
- **Kiosk mode** — ẩn cursor, disable right-click, auto-restart sau 30s idle
- **Attract screen** — nhân vật tự nhảy khi không có người chơi
- **Branding layer** — thay logo client qua `config.json`, không cần sửa code
- **Web Audio API** — sound effects synthesized, không cần file audio

---

## Cách chơi

| Hành động | Keyboard | Body |
|---|---|---|
| Nhảy (nhẹ) | Giữ `SPACE` ngắn | Ngồi xuống nhanh rồi đứng dậy |
| Nhảy (mạnh) | Giữ `SPACE` lâu hơn | Ngồi sâu hơn và đứng dậy nhanh hơn |
| Restart | `R` | — |
| Fullscreen | `F` | — |
| Debug panel | `Ctrl+D` | — |

> **Lưu ý**: Game yêu cầu HTTPS hoặc `localhost` để truy cập webcam.

---

## Cài đặt & chạy local

```bash
# Clone repo
git clone https://github.com/dongnnh2112work/Jump-Jump.git
cd Jump-Jump

# Cài dependencies
npm install

# Chạy dev server
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

---

## Cấu trúc thư mục

```
Jump-Jump/
├── index.html              — HTML entry point, layout & UI elements
├── style.css               — Toàn bộ CSS, design tokens, animations
├── config.json             — Branding config (logo, tên sự kiện)
├── package.json
├── js/
│   ├── main.js             — Entry point, wiring các module
│   ├── game.js             — Game loop, physics, collision, rendering
│   ├── platforms.js        — Platform generation + isometric drawing
│   ├── character.js        — Voxel character rendering (3 loại)
│   ├── tracking.js         — MediaPipe Pose + state machine + jump power
│   ├── ui.js               — Power bar, score, overlays, debug panel
│   ├── sound.js            — Web Audio API sound effects
│   └── config.js           — CFG constants (gravity, zoom, thresholds...)
└── documents/
    ├── README.md           — File này
    ├── 01_PROJECT_CONTEXT.md
    ├── 02_RULES.md
    ├── 03_TODO.md
    └── 04_UXUI_DESIGN.md
```

---

## Tracking — Cơ chế phát hiện nhảy

Game dùng **Option B: Peak-based detection** — không cần giữ tư thế squat, nhận diện ngay cả khi nhảy explosive:

```
recentPeakY  =  vị trí thấp nhất của điểm tracking trong 700ms gần nhất
sqDepth      =  recentPeakY − standingBaseY

Trigger JUMP khi:
  sqDepth > squatThreshold   (đã xuống đủ sâu)
  AND velocity < −jumpThreshold  (đang bật lên nhanh)
```

**3 tracking mode** (chuyển trong debug panel):
| Mode | Landmark | Ghi chú |
|---|---|---|
| SHOULDER | `[11, 12]` | Default — vai ổn định, ít bị che |
| HEAD | `[0]` | Nose — đơn giản nhất |
| HIP | `[23, 24]` | Biên độ lớn nhất, cần camera thấp |

**Default thresholds:**
- `squatThreshold`: 8px  
- `jumpThreshold`: 6px/3frame  
- `cooldownMs`: 400ms

---

## Branding / Event Config

Chỉnh file `config.json` để thay thông tin sự kiện mà không cần sửa code:

```json
{
  "brandName": "Howl Jump",
  "brandLogo": "",
  "eventName": "",
  "primaryColor": "#FF6B35"
}
```

---

## Tech Stack

| | |
|---|---|
| **Rendering** | HTML5 Canvas 2D |
| **Body tracking** | MediaPipe Pose (CDN) |
| **Build tool** | Vite |
| **Runtime** | Vanilla JavaScript (ES Modules) |
| **Audio** | Web Audio API (synthesized) |
| **Persistence** | localStorage |
| **Deploy** | Vercel / localhost |

---

## Yêu cầu phần cứng (kiosk event)

- Laptop i5 Gen 10+, 8GB RAM
- Chrome (bắt buộc) hoặc Edge
- Webcam USB (1080p khuyến nghị)
- TV 43–55" kết nối HDMI
- Phông nền đơn sắc phía sau người chơi
- Sticker định vị vị trí đứng dưới sàn

---

## Known Issues / Risks

| Issue | Mức độ | Giải pháp |
|---|---|---|
| MediaPipe CDN down tại event | Cao | Bundle local hoặc cache Service Worker |
| Ánh sáng sân khấu flicker | Cao | Test trước, dùng backdrop đơn sắc |
| Laptop lag > 100ms | Cao | Min spec + tắt app nền |
| Camera bị từ chối (HTTPS) | Trung bình | Chạy `localhost` hoặc deploy Vercel HTTPS |
| Double jump do noise | Trung bình | Debounce 400ms + cooldown state |

---

*Howl Studio · 2026*
