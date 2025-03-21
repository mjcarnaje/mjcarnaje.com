"use client";

import { useRef, useEffect } from "react";

interface ConfettiProps {
  active: boolean;
}

interface ConfettiParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  fadeSpeed: number;
}

export const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<ConfettiParticle[]>([]);

  // Colors for the confetti particles
  const colors = [
    "#FFD700", // Gold
    "#FF5252", // Red
    "#4CAF50", // Green
    "#2196F3", // Blue
    "#9C27B0", // Purple
    "#FF9800", // Orange
  ];

  // Create confetti particles
  const createParticles = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: ConfettiParticle[] = [];
    const particleCount = 100; // Number of particles

    // Generate particles from the center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < particleCount; i++) {
      // Random angle for velocity direction (in radians)
      const angle = Math.random() * Math.PI * 2;

      // Random velocity magnitude
      const speed = 2 + Math.random() * 3;

      particles.push({
        x: centerX,
        y: centerY,
        size: 5 + Math.random() * 10, // Random size between 5 and 15
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed - 2, // Slight upward bias
        },
        rotation: Math.random() * 360,
        rotationSpeed: -1 + Math.random() * 2,
        opacity: 1,
        fadeSpeed: 0.005 + Math.random() * 0.01,
      });
    }

    particlesRef.current = particles;
  };

  // Animate confetti particles
  const animate = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    const particles = particlesRef.current;
    let stillActive = false;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Update position
      p.x += p.velocity.x;
      p.y += p.velocity.y;

      // Apply gravity
      p.velocity.y += 0.1;

      // Update rotation
      p.rotation += p.rotationSpeed;

      // Fade out
      p.opacity -= p.fadeSpeed;

      // Skip rendering if fully transparent
      if (p.opacity <= 0) continue;

      stillActive = true;

      // Draw particle
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }

    // Continue animation if particles are still visible
    if (stillActive) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // Set canvas dimensions to match parent container
    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      // Cancel animation on cleanup
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Trigger confetti when active prop changes
  useEffect(() => {
    if (active) {
      // Cancel any existing animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // Create new particles and start animation
      createParticles();
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Cancel animation when inactive
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        particlesRef.current = [];
      }
    }
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-50 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
};
