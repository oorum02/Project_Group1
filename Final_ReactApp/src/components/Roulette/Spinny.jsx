import React, { useRef, useState, useEffect } from 'react';
import './Spinny.css';

const Spinny = ({
  segments,
  onFinished,
  size = 400,
  primaryColor = '#b75d69',     // Mauve rose
  contrastColor = '#403156',    // Deep plum
  tertiaryColor = '#774c60',    // Dusty purple
  buttonText = 'SPIN'
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

    const colors = [primaryColor, contrastColor, tertiaryColor];

    for (let i = 0; i < totalSegments; i++) {
      const angle = startAngle + i * arc;
      ctx.beginPath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, angle, angle + arc, false);
      ctx.lineTo(radius, radius);
      ctx.fill();

      // Text label
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(angle + arc / 2);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px "Avenir", sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(segments[i]?.slice(0, 22), radius - 10, 0);
      ctx.restore();
    }

    // Draw center spin button
    ctx.beginPath();
    ctx.arc(radius, radius, 40, 0, 2 * Math.PI);
    ctx.fillStyle = contrastColor;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px "Avenir", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(buttonText, radius, radius);
  };

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    let spinAngleStart = Math.random() * 10 + 10;
    let spinTime = 0;
    let spinTimeTotal = Math.random() * 2000 + 4000;

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