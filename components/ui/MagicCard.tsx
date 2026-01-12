"use client";
import React, { useRef, useEffect } from 'react';

// 1. Component bao bọc (Quản lý hiệu ứng chuột)
export const MagicContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.magic-card') as NodeListOf<HTMLElement>;

    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Tính độ sáng dựa trên khoảng cách chuột
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        const maxDist = 600; 
        let intensity = 1 - Math.min(distance / maxDist, 1);

        // Cập nhật biến CSS để viền sáng chạy theo chuột
        card.style.setProperty('--glow-x', `${x}px`);
        card.style.setProperty('--glow-y', `${y}px`);
        card.style.setProperty('--glow-intensity', intensity.toString());
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={`magic-section ${className}`}>
      {children}
    </div>
  );
};

// 2. Component Card (Từng ô coin)
export const MagicCard = ({ 
  children, 
  colorRGB = "132, 0, 255", // Màu tím mặc định nếu không truyền
  onClick,
  className = ""
}: any) => {
  return (
    <div 
      onClick={onClick}
      className={`magic-card relative rounded-xl cursor-pointer transition-transform hover:-translate-y-1 ${className}`}
      // Truyền màu RGB vào biến CSS
      style={{ '--glow-color': colorRGB } as React.CSSProperties}
    >
      {/* Nội dung bên trong (Icon, Tên coin...) */}
      <div className="relative z-20 h-full">
        {children}
      </div>
      
      {/* Lớp nền tối để che phần viền bên trong */}
      <div className="absolute inset-[1px] bg-[#1c1c1e] rounded-[inherit] z-10" />
    </div>
  );
};
