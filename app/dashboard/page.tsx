"use client";

import React, { useState } from 'react';
import { Heart, Shield, Gift, Lock, Database, CreditCard, ArrowLeft } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import TrustWalletUI from '@/components/donate/TrustWalletUI';
import NamsoGen from '@/components/tools/NamsoGen';
import TwoFATool from '@/components/tools/TwoFATool';
export default function Dashboard() {
  const [currentView, setCurrentView] = useState('dashboard');

  const features = [
    { id: 'donate', title: 'Donate', desc: 'Cổng ủng hộ & Ví Community', icon: Heart, color: 'text-red-500' },
    { id: 'namsogen', title: 'NamsoGen', desc: 'CC Generator & BIN Checker', icon: CreditCard, color: 'text-emerald-500' },
    { id: '2fa', title: '2FA Tool', desc: 'Lấy mã bảo mật 2 lớp', icon: Shield, color: 'text-blue-500' },
    { id: 'resources', title: 'Resources', desc: 'Tài nguyên MMO miễn phí', icon: Database, color: 'text-yellow-500' },
    { id: 'gift', title: 'Giftcode', desc: 'Săn mã quà tặng', icon: Gift, color: 'text-purple-500' },
    { id: 'vault', title: 'Secure Vault', desc: 'Lưu trữ thông tin kín', icon: Lock, color: 'text-gray-400' },
  ];

  // ĐÃ XÓA: const Navbar = ...
  if (currentView === '2fa') {
    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 font-sans animate-in fade-in slide-in-from-right duration-300">
           <div className="max-w-6xl mx-auto pt-10">
             <button onClick={() => setCurrentView('dashboard')} className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white bg-white/5 px-4 py-2 rounded-full border border-white/10 transition-all group hover:bg-white/10">
               <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Quay lại Dashboard
             </button>
             <TwoFATool />
           </div>
        </div>
    );
}
  if (currentView === 'donate') {
    return (
      <div className="min-h-screen bg-[#050505] font-sans">
        {/* ĐÃ XÓA: <Navbar /> */}
        <TrustWalletUI onBack={() => setCurrentView('dashboard')} />
      </div>
    );
  }

  if (currentView === 'namsogen') {
    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 font-sans animate-in fade-in slide-in-from-right duration-300">
           {/* ĐÃ XÓA: <Navbar /> */}
           <div className="max-w-4xl mx-auto">
             <button onClick={() => setCurrentView('dashboard')} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white bg-white/5 px-4 py-2 rounded-full border border-white/10 transition-all group hover:bg-white/10">
               <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Quay lại Dashboard
             </button>
             <NamsoGen />
           </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans">
      {/* ĐÃ XÓA: <Navbar /> */}
      
      <header className="mb-12 max-w-6xl mx-auto text-center animate-in fade-in slide-in-from-top-8 duration-700 pt-10"> {/* Thêm pt-10 để bù khoảng trống */}
         <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
           Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-500">Tools</span>
         </h1>
         <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Bộ công cụ MMO All-in-one mạnh mẽ dành riêng cho thành viên.
         </p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div key={feature.id} onClick={() => setCurrentView(feature.id)} className="cursor-pointer group animate-in fade-in zoom-in duration-500" style={{animationDelay: `${idx * 100}ms`}}>
            <SpotlightCard className="h-64 flex flex-col justify-between hover:border-gray-500/50 transition-colors bg-[#0a0a0a]" spotlightColor="rgba(255, 255, 255, 0.08)">
               <div>
                 <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                 </div>
                 <h3 className="text-2xl font-bold mb-2 text-white">{feature.title}</h3>
                 <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
               </div>
               <div className="flex justify-between items-center mt-4 opacity-40 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Version 1.0</span>
                  <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                     <span className="text-sm">↗</span>
                  </div>
               </div>
            </SpotlightCard>
          </div>
        ))}
      </div>
    </div>
  );
}