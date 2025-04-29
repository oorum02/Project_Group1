import React, { useRef, useState } from 'react';

const SpinWheel = ({
  segments = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5'],
  size = 300,
  onFinished = (winner) => alert(`Winner: ${winner}`),
  primaryColor = '#333',
  contrastColor = '#fff',
  buttonText = 'SPIN',
  fontFamily = 'Arial',
}) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const canvasRef = useRef(null);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const radius = size / 2;
    const arc = (2 * Math.PI) / segments.length;

    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2;
    ctx.font = `bold 16px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < segments.length; i++) {
      const angle = i * arc;
      ctx.beginPath();
      ctx.fillStyle = i % 2 === 0 ? primaryColor : contrastColor;
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, angle, angle + arc, false);
      ctx.lineTo(radius, radius);
      ctx.fill();
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(angle + arc / 2);
      ctx.fillStyle = i % 2 === 0 ? contrastColor : primaryColor;
      ctx.fillText(segments[i], radius * 0.65, 0);
      ctx.restore();
    }

    // Center button
    ctx.beginPath();
    ctx.arc(radius, radius, 40, 0, 2 * Math.PI);
    ctx.fillStyle = contrastColor;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = primaryColor;
    ctx.fillText(buttonText, radius, radius);
  };

  const spin = () => {
    if (spinning) return;

    const canvas = canvasRef.current;
    const wheel = canvas.getContext('2d');
    const totalSegments = segments.length;
    const spinAngleStart = Math.random() * 10 + 10;
    const spinTimeTotal = Math.random() * 2000 + 4000;
    let spinTime = 0;

    setSpinning(true);

    const rotateWheel = () => {
      spinTime += 30;
      if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
      }
      const spinAngle =
        spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
      startAngle += (spinAngle * Math.PI) / 180;
      drawRotatedWheel();
      requestAnimationFrame(rotateWheel);
    };

    let startAngle = 0;

    const drawRotatedWheel = () => {
      const ctx = canvas.getContext('2d');
      const radius = size / 2;
      const arc = (2 * Math.PI) / totalSegments;

      ctx.clearRect(0, 0, size, size);
      for (let i = 0; i < totalSegments; i++) {
        const angle = startAngle + i * arc;
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? primaryColor : contrastColor;
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, angle, angle + arc, false);
        ctx.lineTo(radius, radius);
        ctx.fill();
        ctx.stroke();
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(angle + arc / 2);
        ctx.fillStyle = i % 2 === 0 ? contrastColor : primaryColor;
        ctx.font = `bold 16px ${fontFamily}`;
        ctx.fillText(segments[i], radius * 0.65, 0);
        ctx.restore();
      }

      // Center
      ctx.beginPath();
      ctx.arc(radius, radius, 40, 0, 2 * Math.PI);
      ctx.fillStyle = contrastColor;
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = primaryColor;
      ctx.fillText(buttonText, radius, radius);
    };

    const stopRotateWheel = () => {
      const degrees = (startAngle * 180) / Math.PI + 90;
      const arcd = (360 / totalSegments);
      const index = Math.floor(((360 - (degrees % 360)) % 360) / arcd);
      setSelectedSegment(segments[index]);
      onFinished(segments[index]);
      setSpinning(false);
    };

    rotateWheel();
  };

  const easeOut = (t, b, c, d) => {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  };

  React.useEffect(() => {
    drawWheel();
  }, [segments]);

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ borderRadius: '50%', cursor: 'pointer' }}
        onClick={spin}
      />
      {selectedSegment && (
        <div style={{ marginTop: 20, fontWeight: 'bold', fontSize: '1.5em' }}>
          🎉 Result: {selectedSegment}
        </div>
      )}
    </div>
  );
};

export default SpinWheel;