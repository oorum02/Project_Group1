import React, { useRef, useState, useEffect } from 'react';
import './Spinny.css';

const Spinny = ({
  segments,
  onFinished,
  size = 500,
  primaryColor = '#b75d69',
  contrastColor = '#403156',
  tertiaryColor = '#774c60',
  buttonText = 'SPIN',
}) => {
  const canvasRef = useRef(null);
  const [startAngle, setStartAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const totalSegments = segments.length;
  const arc = (2 * Math.PI) / totalSegments;

  useEffect(() => {
    drawWheel();
  }, [segments, startAngle]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const radius = size / 2;

    ctx.clearRect(0, 0, size, size);

    for (let i = 0; i < totalSegments; i++) {
      const angle = startAngle + i * arc;
      const bgColor = i % 3 === 0 ? primaryColor : i % 3 === 1 ? contrastColor : tertiaryColor;
      const textColor = isDarkColor(bgColor) ? '#fff' : '#000';

      ctx.beginPath();
      ctx.fillStyle = bgColor;
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, angle, angle + arc, false);
      ctx.lineTo(radius, radius);
      ctx.fill();

      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(angle + arc / 2);

      const fontSize = Math.max(10, Math.min(16, size / (segments.length * 2.5)));
      ctx.fillStyle = textColor;
      ctx.font = `${fontSize}px "Avenir", sans-serif`;
      ctx.textAlign = 'right';
      ctx.fillText(segments[i]?.slice(0, 20), radius - 10, 0);

      ctx.restore();
    }

    // Center button
    ctx.beginPath();
    ctx.arc(radius, radius, 40, 0, 2 * Math.PI);
    ctx.fillStyle = contrastColor;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = primaryColor;
    ctx.font = `bold 16px "Avenir", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(buttonText, radius, radius + 5);
  };

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const spinAngleStart = Math.random() * 10 + 10;
    let spinTime = 0;
    const spinTimeTotal = Math.random() * 2000 + 4000;

    const rotate = () => {
      spinTime += 30;
      if (spinTime >= spinTimeTotal) {
        stopRotate();
        return;
      }
      const angle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
      setStartAngle((prev) => prev + (angle * Math.PI) / 180);
      requestAnimationFrame(rotate);
    };

    rotate();
  };

  const stopRotate = () => {
    const degrees = (startAngle * 180) / Math.PI + 90;
    const index = Math.floor(((360 - (degrees % 360)) % 360) / (360 / totalSegments));
    onFinished(segments[index]);
    setSpinning(false);
  };

  const easeOut = (t, b, c, d) => {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  };

  const isDarkColor = (hex) => {
    const color = hex.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  };

  return (
    <div className="wheel-wrapper">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        onClick={spin}
        className="wheel-canvas"
      />
    </div>
  );
};

export default Spinny;