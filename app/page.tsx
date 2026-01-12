
"use client";

import Link from 'next/link';
import TextType from '@/components/ui/TextType';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden font-sans">
      
      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[20%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <nav className="flex justify-center pt-8 z-10 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="bg-[#111] border border-[#222] rounded-full px-4 py-1.5 flex items-center gap-2 text-xs font-mono text-gray-400">
           <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">New</span>
           <span>Kien Community Tools v2.0</span>
           <ArrowRight className="w-3 h-3" />
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10 -mt-10">
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 animate-in fade-in zoom-in duration-700">
          <span className="block text-white">Kien Community</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-b from-gray-200 to-gray-600">
            For Creative Developers
          </span>
        </h1>

        <div className="h-20 flex items-center justify-center">
          <div className="text-xl md:text-2xl text-gray-400 font-mono">
            <TextType 
              text={[
                "Hệ thống bảo mật tuyệt đối.",
                "Chia sẻ tài nguyên MMO miễn phí.",
                "Cổng Donate đa nền tảng.",
                "Tích hợp công cụ 2FA siêu tốc."
              ]}
              typingSpeed={50}
              deletingSpeed={30}
              pauseDuration={1500}
              cursorCharacter="_"
              cursorClassName="text-blue-500"
            />
          </div>
        </div>

        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <Link href="/dashboard" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 font-lg rounded-full hover:bg-blue-500 hover:scale-105 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]">
            <span>Khám phá thêm</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-4 text-xs text-gray-600">Không cần đăng ký. Sử dụng ngay.</p>
        </div>

      </main>
    </div>
  );
}