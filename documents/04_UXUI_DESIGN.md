# HOWL JUMP — UX/UI Design Guide
> Dành cho: Claude Design
> Style reference: Flip Jump (marketjs.com) — screenshots đính kèm
> Cập nhật: 2026-04-30

---

## 1. Visual Direction

**Core aesthetic**: `Isometric Toy World`
Nhẹ nhàng, 3D giả lập, màu pastel rõ ràng. Không realistic, không flat 2D hoàn toàn. Trẻ trung nhưng không trẻ con — phù hợp với người đi event 18–35 tuổi.

**Keywords**: `Playful · Spatial · Clean · Colorful · Approachable`

**Điều KHÔNG được làm**:
- Không dark mode / nền đen — game này cần cảm giác nhẹ, trên bầu trời
- Không realistic shading hay texture chi tiết
- Không font Arial, Roboto, Inter — quá generic
- Không shadow phức tạp — chỉ dùng flat shadow đơn giản nếu cần

---

## 2. Color System

```css
:root {
  /* ── Background ── */
  --sky-top:    #4FC8E8;   /* xanh đậm — đỉnh màn hình */
  --sky-bottom: #A8E6F0;   /* xanh nhạt — đáy màn hình */

  /* ── Platform: mỗi loại cần 3 tones (top / left-side / right-side) ── */
  --plat-grass-top:    #7EC850;
  --plat-grass-left:   #5A9E30;
  --plat-grass-right:  #4A8220;

  --plat-stone-top:    #9E9E9E;
  --plat-stone-left:   #757575;
  --plat-stone-right:  #616161;

  --plat-red-top:      #EF5350;
  --plat-red-left:     #C62828;
  --plat-red-right:    #B71C1C;

  --plat-dark-top:     #424242;
  --plat-dark-left:    #212121;
  --plat-dark-right:   #1A1A1A;

  /* ── Character ── */
  --char-hair:    #795548;   /* nâu tối */
  --char-skin:    #FFCCBC;   /* da */
  --char-shirt:   #42A5F5;   /* xanh dương */
  --char-pants:   #1565C0;   /* xanh tối */

  /* ── UI General ── */
  --white:        #FFFFFF;
  --white-70:     rgba(255,255,255,0.7);
  --white-30:     rgba(255,255,255,0.3);
  --score-text:   #FFFFFF;
  --btn-bg:       rgba(255,255,255,0.22);
  --btn-border:   rgba(255,255,255,0.85);

  /* ── Cloud ── */
  --cloud-fill:   rgba(255,255,255,0.72);

  /* ── Power Bar ── */
  --power-empty:  rgba(255,255,255,0.25);
  --power-weak:   #AED581;   /* < 40 */
  --power-mid:    #66BB6A;   /* 40–70 */
  --power-high:   #FFA726;   /* 70–90 */
  --power-max:    #EF5350;   /* > 90 */

  /* ── Status ── */
  --status-ok:    #69F0AE;
  --status-off:   rgba(255,255,255,0.35);
}
```

---

## 3. Typography

```
Display (title màn hình chờ):
  Font:   "Fredoka One" (Google Fonts)
  Size:   72–80px
  Color:  white
  Style:  bold, chữ bo tròn, dễ đọc từ xa

Score in-game:
  Font:   "Fredoka One"
  Size:   56–72px
  Color:  white
  Shadow: 0 2px 8px rgba(0,0,0,0.25)
  Vị trí: góc trên trái, không có background box

UI label / button:
  Font:   "Nunito" weight 700
  Size:   14–18px
  Color:  white

Debug / technical:
  Font:   "DM Mono" weight 400
  Size:   11–12px
  Color:  rgba(255,255,255,0.6)

Platform label nhỏ (power hint):
  Font:   "Nunito" weight 700
  Size:   10px
  Color:  rgba(255,255,255,0.55)
```

> ⚠️ Không dùng: Arial, Roboto, Inter, System UI

---

## 4. Isometric Platform — Cách vẽ

Platform nhìn từ góc isometric — 3 mặt phải được vẽ rõ:

```
       ___________
      /           \         ← TOP face (hình thoi) — màu sáng nhất
     /             \
    /_______________\
    |               |       ← LEFT face (hình bình hành) — màu trung
    |_______________|
             |               ← RIGHT face (hình bình hành) — màu tối nhất
             |_______________|
```

**Tỉ lệ chuẩn (zoom 1x):**
```
Width   = 120px  (ngang của mặt top)
Depth   = 60px   (dọc của mặt top — tính từ đỉnh đến đáy hình thoi)
Height  = 20px   (độ dày platform — mỗi lớp stack)
Stack   = 2–3 lớp để trông có khối lượng
```

**Pseudo-code vẽ 1 platform:**
```js
function drawIsoPlatform(ctx, screenX, screenY, w, d, h, colors) {
  const hw = w / 2, hd = d / 2;

  // TOP face (hình thoi)
  ctx.beginPath();
  ctx.moveTo(screenX,      screenY);         // đỉnh trên
  ctx.lineTo(screenX + hw, screenY + hd);    // đỉnh phải
  ctx.lineTo(screenX,      screenY + d);     // đỉnh dưới
  ctx.lineTo(screenX - hw, screenY + hd);    // đỉnh trái
  ctx.fillStyle = colors.top;
  ctx.fill();

  // LEFT face (bình hành nghiêng trái)
  ctx.beginPath();
  ctx.moveTo(screenX - hw, screenY + hd);
  ctx.lineTo(screenX,      screenY + d);
  ctx.lineTo(screenX,      screenY + d + h);
  ctx.lineTo(screenX - hw, screenY + hd + h);
  ctx.fillStyle = colors.left;
  ctx.fill();

  // RIGHT face (bình hành nghiêng phải)
  ctx.beginPath();
  ctx.moveTo(screenX + hw, screenY + hd);
  ctx.lineTo(screenX,      screenY + d);
  ctx.lineTo(screenX,      screenY + d + h);
  ctx.lineTo(screenX + hw, screenY + hd + h);
  ctx.fillStyle = colors.right;
  ctx.fill();
}
```

**Màu theo loại platform:**
| Loại | Top | Left | Right | Khi nào xuất hiện |
|---|---|---|---|---|
| `grass` | #7EC850 | #5A9E30 | #4A8220 | Platform đầu, dễ |
| `stone` | #9E9E9E | #757575 | #616161 | Mid-game |
| `red` | #EF5350 | #C62828 | #B71C1C | Khó, power cao |
| `dark` | #424242 | #212121 | #1A1A1A | Late game |

---

## 5. Voxel Character

Nhân vật nhìn nghiêng ~45° để match góc isometric. Gồm 4 phần ghép dọc:

```
┌────────┐   HEAD  — 20×20px — màu tóc #795548
├────────┤   FACE  — 20×14px — màu da #FFCCBC + 2 chấm mắt đen
├────────┤   BODY  — 20×18px — màu áo #42A5F5
└────────┘   LEGS  — 20×12px — màu quần #1565C0
```

**Animation states:**
| State | Mô tả | Params |
|---|---|---|
| `IDLE` | Bob nhẹ lên xuống | ±4px, 1s loop, easeInOut |
| `CROUCH` | Squash xuống | scaleY 0.72, scaleX 1.1 |
| `JUMP` | Flip 360° | rotate Z từ 0→360° trong 0.4s |
| `LAND` | Squash nhanh rồi bounce | scaleY 0.8→1.0 trong 0.15s |

---

## 6. Background & Clouds

**Sky gradient** (CSS hoặc Canvas linearGradient):
```
Top:    #4FC8E8
Bottom: #A8E6F0
Direction: vertical (top → bottom)
```

**Clouds:**
- Shape: 3–4 circle arc chồng nhau tạo silhouette mây (không dùng ảnh)
- Fill: `rgba(255,255,255,0.72)`
- Không có border/stroke
- Parallax 2 lớp:
  - Lớp gần: scale 1.0–1.4x, drift 0.30px/frame
  - Lớp xa: scale 0.5–0.8x, drift 0.15px/frame, opacity 60%
- Số lượng: 6–10 mây visible cùng lúc, spawn lại khi ra khỏi màn hình

---

## 7. UI Components

### Buttons (menu, game over)
```
Background:     rgba(255,255,255,0.22)
Border:         2px solid rgba(255,255,255,0.85)
Border-radius:  16px
Padding:        14px 28px
Icon:           SVG white 24px (centered)
Box-shadow:     0 4px 12px rgba(0,0,0,0.12)
Hover:          background rgba(255,255,255,0.38)
Active:         transform scale(0.95)
Transition:     all 0.15s ease
```

### Power Bar
```
Container:      width 240px, height 20px
Background:     rgba(255,255,255,0.25), border-radius 10px
Fill:           solid color theo power zone, border-radius 10px (transition 0.05s)
Zone markers:   2 đường dọc rgba(255,255,255,0.4) tại 40% và 80%
Label phải:     font 12px Nunito 700, color theo zone
```

### Score HUD (in-game)
```
Vị trí:         Góc trên trái, padding 16px
Font:           Fredoka One, 64px
Color:          white
Text shadow:    0 2px 8px rgba(0,0,0,0.3)
Không:          background box, border, backdrop
```

### Status Dot (camera connection)
```
Size:           8×8px, border-radius 50%
Online:         #69F0AE + box-shadow 0 0 8px #69F0AE
Offline:        rgba(255,255,255,0.35)
```

### Debug Panel (Ctrl+D)
```
Position:       fixed, bottom-right
Background:     rgba(10,10,20,0.85)
Border:         1px solid rgba(255,255,255,0.15)
Border-radius:  12px
Padding:        16px
Font:           DM Mono 11px
Slider accent:  #c8ff00
```

---

## 8. Screen Layouts

### Kiosk Mode — 1920×1080 (primary)
```
┌─────────────────────────────────────────────────────────────────────┐
│ HOWL STUDIO                           ● Camera live   [⛶ Fullscreen]│ 48px
├──────────────────┬──────────────────────────────┬───────────────────┤
│                  │                              │                   │
│  [Camera Feed]   │                              │  SCORE            │
│  300px           │      GAME CANVAS             │  ──────           │
│                  │      flex: 1                 │  BEST             │
│  ─────────────   │                              │  ──────           │
│  POWER BAR       │                              │  Leaderboard      │
│                  │                              │                   │
│  STATS GRID      │                              │  Keyboard help    │
│  STATE BADGE     │                              │                   │
│                  │                              │  260px            │
└──────────────────┴──────────────────────────────┴───────────────────┘
```

### TV-only Mode (khi chỉ có 1 màn hình, không tách panel)
```
┌───────────────────────────────────────────────────────────────┐
│  [Score góc trái]                        [Speed × Fullscreen] │
│                                                               │
│               GAME CANVAS — fullscreen                        │
│                                                               │
│  ┌──────────────┐                                             │
│  │ Camera 200px │   ████████░░░░░░░░ POWER 65                 │
│  │ PIP          │   ← power bar overlay bottom-center         │
│  └──────────────┘                                             │
└───────────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints
| Viewport | Layout |
|---|---|
| ≥ 1920px | Full 3-panel kiosk |
| 1280–1919px | Ẩn right panel, left panel còn 220px |
| 768–1279px | Ẩn cả 2 side panels, PIP camera góc trái dưới |
| < 768px | Mobile landscape, touch controls, PIP camera |

---

## 9. Screens & Flow

```
[Attract Screen / Idle]
        ↓ tap/click
[Main Menu]
  Title + Character selector (< >) + Play + Settings
        ↓ Play
[Tutorial Overlay] — 4 giây → auto skip
        ↓
[In-Game]
  Sky + Clouds + Platforms + Character + Score + Power Bar
        ↓ rơi chết
[Game Over]
  Score + Best + Character + Home + Retry (+ Revive nếu có)
        ↓ Retry → [In-Game]
        ↓ Home  → [Main Menu]
```

---

## 10. Tutorial Animation

Hiện lần đầu tiên khi vào game. Gồm 3 frame SVG animation:

```
Frame 1 (1.2s):   Hình người đứng thẳng → mũi tên chỉ xuống "NGỒI XUỐNG"
Frame 2 (1.2s):   Hình người ngồi xuống → thanh power fill lên
Frame 3 (1.2s):   Hình người bật lên → nhân vật game nhảy lên platform
```

Overlay: `rgba(0,0,0,0.5)` backdrop
Text: "TAP, HOLD AND RELEASE" style như ảnh gốc — Fredoka One 24px, white, all-caps
Skip: tap bất kỳ đâu để bỏ qua

---

*Howl Studio · 2026-04-30*
