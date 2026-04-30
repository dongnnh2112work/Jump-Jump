import { CFG } from "./config.js";

export const BLOCK_TYPES = {
  meadow: {
    name: "Meadow", top: "#88D44A", left: "#5AAD2A", right: "#4A9020",
    requiredPower: [0, 35],
  },
  sakura: {
    name: "Sakura", top: "#F8BBD9", left: "#E091BB", right: "#C8709A",
    requiredPower: [15, 40],
  },
  timber: {
    name: "Timber", top: "#A0785A", left: "#7A5A3E", right: "#5E4330",
    requiredPower: [25, 50],
  },
  cobble: {
    name: "Cobblestone", top: "#8C8C8C", left: "#6A6A6A", right: "#505050",
    requiredPower: [30, 55],
  },
  ice: {
    name: "Crystal Ice", top: "#B3E5FC", left: "#60C8F0", right: "#29B6F6",
    requiredPower: [25, 50], slippery: true,
  },
  candy: {
    name: "Candy", top: "#F48FB1", left: "#E0608A", right: "#C2426E",
    requiredPower: [35, 60],
  },
  vinyl: {
    name: "Vinyl", top: "#212121", left: "#0D0D0D", right: "#080808",
    requiredPower: [30, 55],
  },
  book: {
    name: "Book", top: "#1565C0", left: "#0D47A1", right: "#0A3880",
    requiredPower: [30, 55],
  },
  lava: {
    name: "Lava", top: "#D84315", left: "#7F1F00", right: "#5C1500",
    requiredPower: [55, 80], glow: "rgba(255,109,0,0.4)",
  },
  cloud: {
    name: "Cloud", top: "#FFFFFF", left: "#C9DCE8", right: "#ADC8D8",
    requiredPower: [40, 65], bounce: 1.2,
  },
  cake: {
    name: "Cake", top: "#F48FB1", left: "#EC4899", right: "#BE185D",
    requiredPower: [45, 70],
  },
  oreo: {
    name: "Oreo", top: "#1A1A1A", left: "#111111", right: "#0A0A0A",
    requiredPower: [50, 75],
  },
  gem: {
    name: "Gem", top: "#7C3AED", left: "#5B21B6", right: "#3B0A8C",
    requiredPower: [65, 85], glow: "rgba(167,139,250,0.5)",
  },
  gold: {
    name: "Gold", top: "#FFD600", left: "#FFB300", right: "#E65100",
    requiredPower: [75, 100], glow: "rgba(255,214,0,0.5)", scoreMultiplier: 2,
  },
  cola: {
    name: "Coca Cola", top: "#CC0000", left: "#990000", right: "#770000",
    requiredPower: [70, 90], glow: "rgba(220,50,50,0.35)",
  },
};

export const BLOCK_SIZES = {
  meadow: { w: 110, d: 55, h: 22, stacks: 1 },
  sakura: { w: 110, d: 55, h: 22, stacks: 1 },
  timber: { w: 110, d: 55, h: 22, stacks: 1 },
  cobble: { w: 110, d: 55, h: 22, stacks: 1 },
  ice:    { w: 110, d: 55, h: 22, stacks: 1 },
  candy:  { w: 110, d: 55, h: 22, stacks: 1 },
  vinyl:  { w: 110, d: 55, h: 22, stacks: 1 },
  book:   { w: 110, d: 55, h: 22, stacks: 1 },
  lava:   { w: 110, d: 55, h: 22, stacks: 1 },
  cloud:  { w: 110, d: 55, h: 22, stacks: 1 },
  cake:   { w: 110, d: 55, h: 22, stacks: 1 },
  oreo:   { w: 110, d: 55, h: 22, stacks: 1 },
  gem:    { w: 110, d: 55, h: 22, stacks: 1 },
  gold:   { w: 110, d: 55, h: 22, stacks: 1 },
  cola:   { w: 110, d: 55, h: 22, stacks: 1 },
};

export function worldToScreen(x, y, z, camera) {
  const pivotX = camera.pivotX ?? 0;
  const pivotY = camera.pivotY ?? 0;
  const rotationDeg = camera.rotationDeg ?? 0;
  const theta = (rotationDeg * Math.PI) / 180;
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  const rx = x - pivotX;
  const ry = y - pivotY;
  const worldX = rx * cos - ry * sin + pivotX;
  const worldY = rx * sin + ry * cos + pivotY;
  const halfW = CFG.ISO.TILE_WIDTH / 2;
  const halfD = CFG.ISO.TILE_DEPTH / 2;
  const zoom = camera.zoom ?? 1;
  const screenX = (worldX - worldY) * halfW * zoom + camera.x;
  const screenY = (worldX + worldY) * halfD * zoom - z * CFG.ISO.TILE_HEIGHT * zoom + camera.y;
  return { x: screenX, y: screenY };
}

export function drawIsoPlatform(ctx, screenX, screenY, w, d, h, colors, platform) {
  const hw = w / 2;
  const hd = d / 2;
  const cx = screenX;
  const cy = screenY;
  const stack = platform?.stack ?? 1;
  const hPerStack = h / Math.max(1, stack);

  if (platform?.typeDef?.glow) {
    ctx.shadowColor = platform.typeDef.glow;
    ctx.shadowBlur = 16;
  }

  // --- TOP FACE ---
  const L = Math.hypot(hw, hd);
  const t = Math.min(0.1, 10 / L);
  ctx.beginPath();
  ctx.moveTo(cx + hw * t, cy + hd * t);
  ctx.lineTo(cx + hw * (1 - t), cy + hd * (1 - t));
  ctx.quadraticCurveTo(cx + hw, cy + hd, cx + hw * (1 - t), cy + hd * (1 + t));
  ctx.lineTo(cx + hw * t, cy + d - hd * t);
  ctx.quadraticCurveTo(cx, cy + d, cx - hw * t, cy + d - hd * t);
  ctx.lineTo(cx - hw * (1 - t), cy + hd * (1 + t));
  ctx.quadraticCurveTo(cx - hw, cy + hd, cx - hw * (1 - t), cy + hd * (1 - t));
  ctx.lineTo(cx - hw * t, cy + hd * t);
  ctx.quadraticCurveTo(cx, cy, cx + hw * t, cy + hd * t);
  ctx.closePath();
  ctx.fillStyle = colors.top;
  ctx.fill();

  // Top edge highlight
  ctx.beginPath();
  ctx.moveTo(cx + hw * t, cy + hd * t);
  ctx.lineTo(cx + hw * (1 - t), cy + hd * (1 - t));
  ctx.quadraticCurveTo(cx + hw, cy + hd, cx + hw * (1 - t), cy + hd * (1 + t));
  ctx.lineTo(cx + hw * t, cy + d - hd * t);
  ctx.quadraticCurveTo(cx, cy + d, cx - hw * t, cy + d - hd * t);
  ctx.lineTo(cx - hw * (1 - t), cy + hd * (1 + t));
  ctx.quadraticCurveTo(cx - hw, cy + hd, cx - hw * (1 - t), cy + hd * (1 - t));
  ctx.lineTo(cx - hw * t, cy + hd * t);
  ctx.quadraticCurveTo(cx, cy, cx + hw * t, cy + hd * t);
  ctx.closePath();
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // --- LEFT FACE ---
  const lg = ctx.createLinearGradient(cx - hw, cy + hd, cx - hw, cy + hd + h);
  lg.addColorStop(0, colors.left);
  lg.addColorStop(1, darkenColor(colors.left, 0.15));
  ctx.beginPath();
  ctx.moveTo(cx - hw, cy + hd);
  ctx.lineTo(cx, cy + d);
  ctx.lineTo(cx, cy + d + h);
  ctx.lineTo(cx - hw, cy + hd + h);
  ctx.closePath();
  ctx.fillStyle = lg;
  ctx.fill();

  // --- RIGHT FACE ---
  const rg = ctx.createLinearGradient(cx + hw, cy + hd, cx + hw, cy + hd + h);
  rg.addColorStop(0, colors.right);
  rg.addColorStop(1, darkenColor(colors.right, 0.2));
  ctx.beginPath();
  ctx.moveTo(cx + hw, cy + hd);
  ctx.lineTo(cx, cy + d);
  ctx.lineTo(cx, cy + d + h);
  ctx.lineTo(cx + hw, cy + hd + h);
  ctx.closePath();
  ctx.fillStyle = rg;
  ctx.fill();

  // --- STACK LINES ---
  if (stack > 1) {
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    for (let s = 1; s < stack; s += 1) {
      ctx.beginPath();
      ctx.moveTo(cx - hw, cy + hd + hPerStack * s);
      ctx.lineTo(cx, cy + d + hPerStack * s);
      ctx.lineTo(cx + hw, cy + hd + hPerStack * s);
      ctx.stroke();
    }
  }

  // --- TOP + SIDE DETAIL (drawn last, on top of all faces) ---
  drawBlockDetail(ctx, cx, cy, w, d, h, platform);
}

// ─── Block detail functions ───────────────────────────────────────────────────

function drawBlockDetail(ctx, cx, cy, w, d, h, platform) {
  const type = platform?.type;
  if (!type) return;
  const hw = w / 2, hd = d / 2;
  ctx.save();

  switch (type) {

    case "meadow": {
      const pts = [[cx - hw*0.2, cy+hd*0.5],[cx+hw*0.08, cy+hd*0.75],[cx+hw*0.28, cy+hd*0.38]];
      const cols = ["#FF8FA3","#FFE082","#B2DFDB"];
      pts.forEach(([px,py],i) => {
        ctx.beginPath(); ctx.strokeStyle="rgba(0,0,0,0.2)"; ctx.lineWidth=1;
        ctx.moveTo(px,py); ctx.lineTo(px,py+5); ctx.stroke();
        ctx.fillStyle = cols[i];
        for (let a=0;a<5;a++) {
          const ang=(a/5)*Math.PI*2;
          ctx.beginPath(); ctx.arc(px+Math.cos(ang)*4, py+Math.sin(ang)*2.5, 2.5, 0, Math.PI*2); ctx.fill();
        }
        ctx.fillStyle="#FFF9C4"; ctx.beginPath(); ctx.arc(px,py,2,0,Math.PI*2); ctx.fill();
      });
      break;
    }

    case "sakura": {
      const px=cx, py=cy+hd;
      for (let a=0;a<5;a++) {
        const ang=(a/5)*Math.PI*2-Math.PI/2, ex=px+Math.cos(ang)*10, ey=py+Math.sin(ang)*6;
        ctx.beginPath(); ctx.fillStyle="rgba(255,255,255,0.85)";
        ctx.ellipse(ex,ey,5,3.5,ang,0,Math.PI*2); ctx.fill();
      }
      ctx.fillStyle="#FFD1DC"; ctx.beginPath(); ctx.arc(px,py,3.5,0,Math.PI*2); ctx.fill();
      [[cx-hw*0.3,cy+hd*0.4],[cx+hw*0.22,cy+hd*0.5]].forEach(([bx,by]) => {
        for (let a=0;a<5;a++) {
          const ang=(a/5)*Math.PI*2-Math.PI/2;
          ctx.beginPath(); ctx.fillStyle="rgba(255,255,255,0.5)";
          ctx.ellipse(bx+Math.cos(ang)*5,by+Math.sin(ang)*3.5,3,2,ang,0,Math.PI*2); ctx.fill();
        }
      });
      break;
    }

    case "timber": {
      [14,10,6,3].forEach((r,i) => {
        ctx.beginPath(); ctx.ellipse(cx,cy+hd,r,r*0.55,0,0,Math.PI*2);
        ctx.strokeStyle=`rgba(0,0,0,${0.12+i*0.03})`; ctx.lineWidth=0.8; ctx.stroke();
      });
      ctx.fillStyle="rgba(0,0,0,0.25)"; ctx.beginPath(); ctx.arc(cx,cy+hd,1.5,0,Math.PI*2); ctx.fill();
      break;
    }

    case "cobble": {
      [[cx-hw*0.38,cy+hd*0.42,hw*0.34,hd*0.34],[cx+hw*0.1,cy+hd*0.28,hw*0.32,hd*0.28],
       [cx-hw*0.12,cy+hd*0.82,hw*0.36,hd*0.3],[cx+hw*0.28,cy+hd*0.7,hw*0.3,hd*0.28]
      ].forEach(([sx,sy,sw,sh]) => {
        ctx.beginPath();
        isoRoundRect(ctx, sx-sw/2, sy-sh/2, sw, sh, 2);
        ctx.strokeStyle="rgba(0,0,0,0.28)"; ctx.lineWidth=1; ctx.stroke();
        ctx.fillStyle="rgba(255,255,255,0.06)"; ctx.fill();
      });
      break;
    }

    case "ice": {
      for (let i=0;i<6;i++) {
        const ang=(i/6)*Math.PI*2, ex=cx+Math.cos(ang)*15, ey=cy+hd+Math.sin(ang)*8;
        ctx.beginPath(); ctx.moveTo(cx,cy+hd); ctx.lineTo(ex,ey);
        ctx.strokeStyle="rgba(255,255,255,0.72)"; ctx.lineWidth=1.2; ctx.stroke();
        const mx=cx+Math.cos(ang)*10, my=cy+hd+Math.sin(ang)*5.5, perp=ang+Math.PI/2;
        ctx.beginPath();
        ctx.moveTo(mx+Math.cos(perp)*3, my+Math.sin(perp)*1.8);
        ctx.lineTo(mx-Math.cos(perp)*3, my-Math.sin(perp)*1.8);
        ctx.stroke();
      }
      ctx.fillStyle="rgba(255,255,255,0.9)"; ctx.beginPath(); ctx.arc(cx,cy+hd,2.5,0,Math.PI*2); ctx.fill();
      break;
    }

    case "candy": {
      const px=cx, py=cy+hd;
      for (const sign of [1,-1]) {
        ctx.beginPath(); ctx.strokeStyle=`rgba(255,255,255,${sign>0?0.75:0.42})`; ctx.lineWidth=1.5;
        for (let a=0;a<=Math.PI*2.5;a+=0.08) {
          const r=(a/(Math.PI*2.5))*13, x=px+sign*Math.cos(a)*r, y=py+Math.sin(a)*r*0.58;
          a===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
        }
        ctx.stroke();
      }
      ctx.fillStyle="rgba(255,255,255,0.8)"; ctx.beginPath(); ctx.arc(px,py,2,0,Math.PI*2); ctx.fill();
      break;
    }

    case "vinyl": {
      const px=cx, py=cy+hd;
      [16,13,10,7].forEach(r => {
        ctx.beginPath(); ctx.ellipse(px,py,r,r*0.56,0,0,Math.PI*2);
        ctx.strokeStyle="rgba(255,255,255,0.12)"; ctx.lineWidth=0.8; ctx.stroke();
      });
      ctx.beginPath(); ctx.ellipse(px,py,5,5*0.56,0,0,Math.PI*2);
      ctx.fillStyle="#E53935"; ctx.fill();
      ctx.beginPath(); ctx.ellipse(px-1,py-0.8,2,1.2,0,0,Math.PI*2);
      ctx.fillStyle="rgba(255,255,255,0.45)"; ctx.fill();
      ctx.beginPath(); ctx.arc(px,py,0.8,0,Math.PI*2);
      ctx.fillStyle="rgba(0,0,0,0.7)"; ctx.fill();
      break;
    }

    case "book": {
      // Page lines on top
      for (let i=1;i<=4;i++) {
        const tl=i/5;
        ctx.beginPath();
        ctx.moveTo(cx-hw*(1-tl*0.6), cy+hd*(0.3+tl*0.5));
        ctx.lineTo(cx+hw*(0.1+tl*0.5), cy+hd*(0.3+tl*0.5));
        ctx.strokeStyle=`rgba(0,0,0,${0.08+i*0.03})`; ctx.lineWidth=0.7; ctx.stroke();
      }
      // Spine strip on left face
      ctx.beginPath();
      ctx.moveTo(cx-hw,cy+hd); ctx.lineTo(cx-hw*0.7,cy+hd*0.7);
      ctx.lineTo(cx-hw*0.7,cy+hd*0.7+h); ctx.lineTo(cx-hw,cy+hd+h);
      ctx.closePath(); ctx.fillStyle="rgba(255,255,255,0.18)"; ctx.fill();
      // Bookmark on top
      ctx.beginPath();
      ctx.moveTo(cx+hw*0.35,cy); ctx.lineTo(cx+hw*0.35,cy+d*0.35);
      ctx.lineTo(cx+hw*0.28,cy+d*0.42); ctx.lineTo(cx+hw*0.21,cy+d*0.35);
      ctx.lineTo(cx+hw*0.21,cy); ctx.closePath();
      ctx.fillStyle="#EF5350"; ctx.fill();
      break;
    }

    case "lava": {
      ctx.shadowColor="#FF6D00"; ctx.shadowBlur=6;
      [[[cx-hw*0.1,cy+hd*0.4],[cx+hw*0.05,cy+hd*0.75],[cx-hw*0.08,cy+hd*1.1]],
       [[cx+hw*0.22,cy+hd*0.55],[cx+hw*0.08,cy+hd*0.9]]
      ].forEach(pts => {
        ctx.beginPath(); pts.forEach(([px,py],i)=>i===0?ctx.moveTo(px,py):ctx.lineTo(px,py));
        ctx.strokeStyle="#FFAB40"; ctx.lineWidth=1.8; ctx.stroke();
      });
      ctx.shadowBlur=0;
      [[cx-hw*0.12,cy+hd*0.68],[cx+hw*0.18,cy+hd*0.82]].forEach(([bx,by]) => {
        ctx.beginPath(); ctx.arc(bx,by,3.5,0,Math.PI*2); ctx.fillStyle="#FF6D00"; ctx.fill();
        ctx.beginPath(); ctx.arc(bx-1,by-1,1.2,0,Math.PI*2); ctx.fillStyle="rgba(255,220,100,0.85)"; ctx.fill();
      });
      break;
    }

    case "cloud": {
      [[cx-w*0.18,cy+hd*0.55,8],[cx,cy+hd*0.35,10],[cx+w*0.16,cy+hd*0.6,7]].forEach(([px,py,r]) => {
        ctx.beginPath(); ctx.arc(px,py,r,Math.PI,0); ctx.fillStyle="rgba(255,255,255,0.6)"; ctx.fill();
      });
      break;
    }

    case "cake": {
      // Frosting drips on left face
      [[cx-hw*0.6,cy+hd],[cx-hw*0.25,cy+hd],[cx,cy+d]].forEach(([dx,dy]) => {
        ctx.beginPath(); ctx.arc(dx,dy+2,4,0,Math.PI,false);
        ctx.fillStyle="rgba(255,255,255,0.55)"; ctx.fill();
      });
      // Layer lines
      [0.4,0.72].forEach(f => {
        const ly=cy+hd+h*f;
        ctx.beginPath();
        ctx.moveTo(cx-hw,ly); ctx.lineTo(cx,ly+hd); ctx.lineTo(cx+hw,ly);
        ctx.strokeStyle="rgba(255,220,200,0.45)"; ctx.lineWidth=1.2; ctx.stroke();
      });
      // Candle
      ctx.fillStyle="#FFF176"; ctx.fillRect(cx-2,cy+hd*0.55-8,4,8);
      ctx.fillStyle="#FF7043"; ctx.beginPath();
      ctx.moveTo(cx,cy+hd*0.55-11); ctx.lineTo(cx+2,cy+hd*0.55-8); ctx.lineTo(cx-2,cy+hd*0.55-8);
      ctx.closePath(); ctx.fill();
      // Sprinkles
      [[-hw*0.35,hd*0.45],[-hw*0.08,hd*0.75],[hw*0.22,hd*0.5],[hw*0.3,hd*0.9],[-hw*0.25,hd*1.0]].forEach(([ox,oy],i) => {
        const cols=["#FF8A80","#82B1FF","#CCFF90","#FFD180","#EA80FC"];
        ctx.fillStyle=cols[i%cols.length]; ctx.beginPath();
        ctx.ellipse(cx+ox,cy+oy,2.5,1,i*0.8,0,Math.PI*2); ctx.fill();
      });
      break;
    }

    case "oreo": {
      // Cream layer on left face
      const creamY=cy+hd+h*0.38, creamH=h*0.24;
      ctx.beginPath();
      ctx.moveTo(cx-hw,creamY); ctx.lineTo(cx,creamY+hd);
      ctx.lineTo(cx,creamY+hd+creamH); ctx.lineTo(cx-hw,creamY+creamH);
      ctx.closePath(); ctx.fillStyle="rgba(255,255,255,0.88)"; ctx.fill();
      // Cream layer on right face
      ctx.beginPath();
      ctx.moveTo(cx+hw,creamY); ctx.lineTo(cx,creamY+hd);
      ctx.lineTo(cx,creamY+hd+creamH); ctx.lineTo(cx+hw,creamY+creamH);
      ctx.closePath(); ctx.fillStyle="rgba(255,255,255,0.78)"; ctx.fill();
      // Emboss top: rings
      ctx.strokeStyle="rgba(255,255,255,0.22)"; ctx.lineWidth=0.8;
      ctx.beginPath(); ctx.ellipse(cx,cy+hd,18,10,0,0,Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(cx,cy+hd,12,7,0,0,Math.PI*2); ctx.stroke();
      // Radial lines
      for (let i=0;i<12;i++) {
        const ang=(i/12)*Math.PI*2;
        ctx.beginPath();
        ctx.moveTo(cx+Math.cos(ang)*5,cy+hd+Math.sin(ang)*3);
        ctx.lineTo(cx+Math.cos(ang)*12,cy+hd+Math.sin(ang)*7);
        ctx.stroke();
      }
      // Center dots
      [[0,0],[-6,-3.5],[6,-3.5],[-6,3.5],[6,3.5]].forEach(([ox,oy]) => {
        ctx.fillStyle="rgba(255,255,255,0.35)"; ctx.beginPath();
        ctx.arc(cx+ox,cy+hd+oy,1,0,Math.PI*2); ctx.fill();
      });
      break;
    }

    case "gem": {
      ctx.beginPath();
      ctx.moveTo(cx,cy+hd*0.2); ctx.lineTo(cx+hw*0.3,cy+hd*0.8);
      ctx.lineTo(cx,cy+hd*1.4); ctx.lineTo(cx-hw*0.3,cy+hd*0.8); ctx.closePath();
      ctx.strokeStyle="rgba(255,255,255,0.65)"; ctx.lineWidth=1.2; ctx.stroke();
      ctx.fillStyle="rgba(255,255,255,0.12)"; ctx.fill();
      ctx.beginPath(); ctx.moveTo(cx-hw*0.3,cy+hd*0.8); ctx.lineTo(cx+hw*0.3,cy+hd*0.8);
      ctx.strokeStyle="rgba(255,255,255,0.4)"; ctx.lineWidth=0.8; ctx.stroke();
      ctx.shadowColor="#CE93D8"; ctx.shadowBlur=8;
      [[cx-hw*0.4,cy+hd*0.35],[cx+hw*0.38,cy+hd*0.45],[cx+hw*0.1,cy+hd*1.25]].forEach(([sx,sy]) => {
        ctx.fillStyle="rgba(255,255,255,0.9)"; ctx.beginPath(); ctx.arc(sx,sy,1.5,0,Math.PI*2); ctx.fill();
      });
      ctx.shadowBlur=0;
      break;
    }

    case "gold": {
      const px=cx, py=cy+hd;
      ctx.beginPath();
      for (let i=0;i<12;i++) {
        const ang=(i/12)*Math.PI*2-Math.PI/2, r=i%2===0?12:5.5;
        const x=px+Math.cos(ang)*r, y=py+Math.sin(ang)*r*0.55;
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.closePath(); ctx.fillStyle="rgba(255,255,255,0.55)"; ctx.fill();
      ctx.strokeStyle="rgba(255,255,255,0.8)"; ctx.lineWidth=1; ctx.stroke();
      ctx.shadowColor="#FFD600"; ctx.shadowBlur=10;
      [[cx-hw*0.38,cy+hd*0.3],[cx+hw*0.35,cy+hd*0.38],[cx-hw*0.12,cy+hd*1.28],[cx+hw*0.18,cy+hd*1.2]].forEach(([sx,sy]) => {
        ctx.fillStyle="#FFFFFF"; ctx.beginPath(); ctx.arc(sx,sy,1.8,0,Math.PI*2); ctx.fill();
      });
      ctx.shadowBlur=0;
      break;
    }

    case "cola": {
      // Silver band at top of side faces
      const bandH = h * 0.22;
      ctx.beginPath();
      ctx.moveTo(cx-hw,cy+hd); ctx.lineTo(cx,cy+d);
      ctx.lineTo(cx,cy+d+bandH); ctx.lineTo(cx-hw,cy+hd+bandH);
      ctx.closePath(); ctx.fillStyle="rgba(200,210,220,0.55)"; ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx+hw,cy+hd); ctx.lineTo(cx,cy+d);
      ctx.lineTo(cx,cy+d+bandH); ctx.lineTo(cx+hw,cy+hd+bandH);
      ctx.closePath(); ctx.fillStyle="rgba(180,195,210,0.45)"; ctx.fill();
      // Aluminum top
      ctx.beginPath(); ctx.ellipse(cx,cy+hd,20,11,0,0,Math.PI*2);
      const alGrad=ctx.createRadialGradient(cx-3,cy+hd-2,2,cx,cy+hd,20);
      alGrad.addColorStop(0,"rgba(230,235,240,0.9)"); alGrad.addColorStop(1,"rgba(170,185,195,0.7)");
      ctx.fillStyle=alGrad; ctx.fill();
      ctx.strokeStyle="rgba(150,165,175,0.5)"; ctx.lineWidth=0.8; ctx.stroke();
      // Pull tab
      ctx.beginPath(); ctx.ellipse(cx+4,cy+hd-1,4,2.5,0.3,0,Math.PI*2);
      ctx.strokeStyle="rgba(120,135,145,0.8)"; ctx.lineWidth=1.2; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx+8,cy+hd-2,1.5,0,Math.PI*2);
      ctx.fillStyle="rgba(120,135,145,0.8)"; ctx.fill();
      // Wave logo stripe
      ctx.beginPath();
      ctx.moveTo(cx-hw*0.55,cy+hd*0.65);
      ctx.bezierCurveTo(cx-hw*0.2,cy+hd*0.45,cx+hw*0.1,cy+hd*0.9,cx+hw*0.5,cy+hd*0.72);
      ctx.strokeStyle="rgba(255,255,255,0.65)"; ctx.lineWidth=1.5; ctx.stroke();
      break;
    }
  }

  ctx.restore();
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function darkenColor(hex, amount) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const f = (v) => Math.max(0, Math.floor(v * (1 - amount))).toString(16).padStart(2, "0");
  return `#${f(r)}${f(g)}${f(b)}`;
}

function isoRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

export function generatePlatforms(count = 48) {
  const list = [];
  let worldX = 0;
  let worldY = 0;
  let heading = { x: 1, y: 0 };

  for (let i = 0; i < count; i += 1) {
    let gap = i === 0 ? 0 : 1.3 + Math.random() * 2.2;
    if (i > 1 && Math.random() < 0.58) {
      heading = rotate90(heading, Math.random() < 0.5 ? -1 : 1);
    }
    let nextX = worldX + heading.x * gap;
    let nextY = worldY + heading.y * gap;

    if (i > 2) {
      let tries = 0;
      while (tries < 6 && isTooCloseToRecent(nextX, nextY, list, 6, 1.15)) {
        gap += 0.32;
        nextX = worldX + heading.x * gap;
        nextY = worldY + heading.y * gap;
        tries += 1;
      }
    }
    worldX = nextX;
    worldY = nextY;

    const type = i === 0 ? "meadow" : selectBlockType(i);
    const typeDef = BLOCK_TYPES[type];
    const size = BLOCK_SIZES[type];
    const stack = size?.stacks ?? 1;
    const requiredPower = i === 0 ? CFG.POWER.MIN : randInt(typeDef.requiredPower[0], typeDef.requiredPower[1]);

    list.push({
      id: i,
      x: worldX,
      y: worldY,
      z: 0,
      stack,
      type,
      typeDef,
      colors: { top: typeDef.top, left: typeDef.left, right: typeDef.right },
      size,
      requiredPower,
      passed: false,
    });
  }

  if (list[0]) {
    list[0].x = 0;
    list[0].y = 0;
    list[0].requiredPower = CFG.POWER.MIN;
  }

  return list;
}

function selectBlockType(score) {
  if (score < 5)  return weightedRandom(["meadow","meadow","sakura"]);
  if (score < 10) return weightedRandom(["timber","cobble","ice","sakura"]);
  if (score < 18) return weightedRandom(["candy","vinyl","book","cobble"]);
  if (score < 28) return weightedRandom(["lava","cloud","cake","oreo"]);
  return weightedRandom(["gem","gold","cola","lava"]);
}

function rotate90(v, dir) {
  return dir < 0 ? { x: v.y, y: -v.x } : { x: -v.y, y: v.x };
}

function isTooCloseToRecent(x, y, list, recentCount, minDist) {
  const startIdx = Math.max(0, list.length - recentCount);
  for (let i = startIdx; i < list.length; i += 1) {
    const p = list[i];
    if (Math.hypot(x - p.x, y - p.y) < minDist) return true;
  }
  return false;
}

function weightedRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
