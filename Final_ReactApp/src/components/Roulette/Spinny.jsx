import React, { useRef, useState, useEffect } from 'react';
import '../../styles/Spinny.css';

const Spinny = ({
  segments,
  onFinished,
  size = 400,
  buttonText = 'SPIN'
}) => {
  const canvasRef = useRef(null);
  const [startAngle, setStartAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const arc = (2 * Math.PI) / segments.length;

  // Define wheel segment colors
  const wheelColors = ['#403156', '#774c60', '#b75d69'];
  const spinButtonBg = '#f0e1d2';
  const spinButtonText = '#403156';

  useEffect(() => {
    drawWheel();
  }, [segments, startAngle]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const radius = size / 2;

    ctx.clearRect(0, 0, size, size);

    segments.forEach((segment, i) => {
      const angle = startAngle + i * arc;
      const bgColor = wheelColors[i % wheelColors.length];

      // Draw the segment
      ctx.beginPath();
      ctx.fillStyle = bgColor;
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, angle, angle + arc, false);
      ctx.lineTo(radius, radius);
      ctx.fill();

      // Set text color: black for #b75d69, white otherwise
      const textColor = bgColor.toLowerCase() === '#b75d69' ? '#000000' : '#ffffff';

      // Draw text
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(angle + arc / 2);
      ctx.fillStyle = textColor;
      ctx.font = '14px "Avenir", sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(segment.slice(0, 24), radius - 10, 0);
      ctx.restore();
    });

    // Draw center "SPIN" button
    ctx.beginPath();
    ctx.arc(radius, radius, 45, 0, 2 * Math.PI);
    ctx.fillStyle = spinButtonBg;
    ctx.fill();
    ctx.strokeStyle = spinButtonText;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = spinButtonText;
    ctx.font = 'bold 18px "Avenir", sans-serif';
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
    const index = Math.floor(((360 - (degrees % 360)) % 360) / (360 / segments.length));
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