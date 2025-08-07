import { useEffect, useRef, useState } from 'react';
import './css/Banner.css';

function Banner() {
  const keywords = [
    'Coding', 'Design', 'React.js', 'Usability', 'Creativity',
  ];

  const bannerRef = useRef(null);
  const canvasRef = useRef(null);
  const trails = useRef([]); // 紀錄所有筆跡，每筆是 {points: [...], time}
  const animationFrameId = useRef(null);
  const [textIndex, setTextIndex] = useState(0);
  const lastPos = useRef(null);

  // 文字輪播
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % keywords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Canvas 初始化和動畫循環
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const maxLife = 5000; // 5秒
    const resize = () => {
      canvas.width = bannerRef.current.clientWidth;
      canvas.height = bannerRef.current.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // 彩虹漸層筆刷
    const createGradient = () => {
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, 'rgba(255,0,0,0.6)');
      grad.addColorStop(0.17, 'rgba(255,127,0,0.6)');
      grad.addColorStop(0.34, 'rgba(255,255,0,0.6)');
      grad.addColorStop(0.51, 'rgba(0,255,0,0.6)');
      grad.addColorStop(0.68, 'rgba(0,0,255,0.6)');
      grad.addColorStop(0.85, 'rgba(139,0,255,0.6)');
      grad.addColorStop(1, 'rgba(255,0,0,0.6)');
      return grad;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      trails.current = trails.current.filter(trail => {
        const life = now - trail.time;
        if (life > maxLife) return false;

        const alpha = 1 - life / maxLife;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 20;
        ctx.strokeStyle = createGradient();
        ctx.globalAlpha = alpha * 0.6;

        ctx.beginPath();
        const points = trail.points;
        if (points.length > 1) {
          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        return true;
      });

      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // 滑鼠移動時新增點
  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (lastPos.current) {
        const lastTrail = trails.current[trails.current.length - 1];
        if (!lastTrail) {
        trails.current.push({ points: [{ x, y }], time: Date.now() });
        } else {
        const lastPoint = lastTrail.points[lastTrail.points.length - 1];
        const dx = x - lastPoint.x;
        const dy = y - lastPoint.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const step = 5; // 每隔5px插入一個點

        if (dist > step) {
            // 補點
            const stepsCount = Math.floor(dist / step);
            for (let i = 1; i <= stepsCount; i++) {
            const nx = lastPoint.x + (dx / dist) * step * i;
            const ny = lastPoint.y + (dy / dist) * step * i;
            lastTrail.points.push({ x: nx, y: ny });
            }
        } else {
            lastTrail.points.push({ x, y });
        }
        }
    } else {
        trails.current.push({ points: [{ x, y }], time: Date.now() });
    }

    lastPos.current = { x, y };
    };

  // 滑鼠離開區域時清空最後座標
  const handleMouseLeave = () => {
    lastPos.current = null;
  };

  return (
    <section
      className="vincent-banner"
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', cursor: 'crosshair' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        className="banner-content"
        style={{ position: 'relative', zIndex: 1, color: '#1e1756' }}
      >
        <h1 className="main-title">Vincent</h1>
        <h2 className="dynamic-keyword">{keywords[textIndex]}</h2>
        <p className="subtitle">Coding is my language. Design is my voice.</p>
        <p className="subtitle">Email:Qwer012268331290@gmail.com</p>
        <p className="subtitle">Phone:+886-0905-392-961</p>
        <div className="scroll-down-indicator">↓</div>
      </div>
    </section>
  );
}

export default Banner;
