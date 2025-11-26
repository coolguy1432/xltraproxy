const canvas = document.getElementById('triCanvas');
const ctx = canvas.getContext('2d');
let w, h;
let triangles = [];
let mouse = { x: 0, y: 0 };
function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; generateTriangles(); }
window.addEventListener('resize', resize);
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
function generateTriangles() { 
  triangles = []; 
  const base = 140; 
  for (let row = 0; row < Math.ceil(h / (base * 0.9)) + 4; row++) { 
    for (let col = 0; col < Math.ceil(w / base) + 4; col++) { 
      let size = base + (Math.random() * 40 - 20); 
      let x = col * base + (row % 2 === 0 ? 0 : base / 2); 
      let y = row * (base * 0.9); 
      triangles.push({ x, y, size, rotation: Math.random() * Math.PI * 2 }); 
    } 
  } 
}
function drawTriangle(t) { 
  const dist = Math.hypot(mouse.x - t.x, mouse.y - t.y); 
  const brightness = Math.max(30, 255 - dist * 0.22); 
  ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`; 
  ctx.save(); 
  ctx.translate(t.x, t.y); 
  ctx.rotate(t.rotation); 
  ctx.beginPath(); 
  ctx.moveTo(0, -t.size / 2); 
  ctx.lineTo(-t.size / 1.6, t.size / 2); 
  ctx.lineTo(t.size / 1.6, t.size / 2); 
  ctx.closePath(); 
  ctx.fill(); 
  ctx.restore(); 
}
function animate() { 
  ctx.clearRect(0, 0, w, h); 
  for (let t of triangles) drawTriangle(t); 
  requestAnimationFrame(animate); 
}
resize(); animate();
