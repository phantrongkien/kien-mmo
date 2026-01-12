// File: components/tools/NamsoGen.tsx
"use client";

import React, { useState } from 'react';
import { Settings, Copy, CheckCircle, CreditCard, ShieldCheck, Activity } from 'lucide-react';

export default function NamsoGen() {
  // --- GIỮ NGUYÊN LOGIC CỦA BẠN ---
  const [bin, setBin] = useState('');
  const [month, setMonth] = useState('Random');
  const [year, setYear] = useState('Random');
  const [cvv, setCvv] = useState('');
  const [quantity, setQuantity] = useState(10);
  const [useDate, setUseDate] = useState(true);
  const [useCvv, setUseCvv] = useState(true);
  const [results, setResults] = useState('');
  const [copied, setCopied] = useState(false);

  // Tạo danh sách năm
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear + i);

  const handleGenerate = () => {
    // Logic của bạn
    if (!bin && !confirm("Bạn chưa nhập BIN. Bạn có muốn tạo ngẫu nhiên không?")) return;
    
    const containerBin = bin || "4xxxxxxxxxxxxxxx".slice(0, 16);
    let generatedList = '';

    for (let i = 0; i < quantity; i++) {
      let card = containerBin;
      // Giả lập điền nốt số
      while (card.length < 16) card += Math.floor(Math.random() * 10);
      
      const genMonth = month === 'Random' ? ('0' + Math.ceil(Math.random() * 12)).slice(-2) : month;
      const genYear = year === 'Random' ? (currentYear + Math.floor(Math.random() * 5)).toString().slice(-2) : year.slice(-2);
      const genCvv = cvv || ('00' + Math.floor(Math.random() * 999)).slice(-3);

      // Xây dựng chuỗi kết quả
      card += useDate ? `|${genMonth}|${genYear}` : '';
      card += useCvv ? `|${genCvv}` : '';
      
      generatedList += card + '\n';
    }
    setResults(generatedList);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(results);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  // --------------------------------

  // Style giao diện Donate (Dark/Green Neon)
  const inputStyle = "w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none transition-all text-sm placeholder-gray-500 hover:bg-white/10";
  const labelStyle = "text-xs font-bold text-gray-400 mb-1.5 block uppercase tracking-wider";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CỘT TRÁI: NHẬP LIỆU */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Header */}
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                SYSTEM ONLINE
             </div>
             <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
               Namso <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">Gen</span>
             </h2>
             <p className="text-gray-400 text-lg">
               Công cụ tạo Credit Card & kiểm tra BIN.
             </p>
          </div>

          {/* Form Container */}
          <div className="space-y-5">
            {/* Input BIN */}
            <div>
              <label className={labelStyle}>SỐ BIN (BIN NUMBER)</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Ví dụ: 456789xxxxxx" 
                  value={bin}
                  onChange={(e) => setBin(e.target.value)}
                  className={`${inputStyle} pl-10 text-lg font-mono tracking-widest`}
                />
              </div>
            </div>

            {/* Grid các tùy chọn nhỏ */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div>
                  <label className={labelStyle}>Tháng</label>
                  <select value={month} onChange={(e) => setMonth(e.target.value)} className={inputStyle}>
                    <option value="Random">Ngẫu nhiên</option>
                    {Array.from({ length: 12 }, (_, i) => ('0' + (i + 1)).slice(-2)).map(m => (
                      <option key={m} value={m} className="bg-[#111]">{m}</option>
                    ))}
                  </select>
               </div>
               <div>
                  <label className={labelStyle}>Năm</label>
                  <select value={year} onChange={(e) => setYear(e.target.value)} className={inputStyle}>
                    <option value="Random">Ngẫu nhiên</option>
                    {years.map(y => (
                      <option key={y} value={y} className="bg-[#111]">{y}</option>
                    ))}
                  </select>
               </div>
               <div>
                  <label className={labelStyle}>CVV</label>
                  <input type="text" placeholder="Rand" value={cvv} onChange={(e) => setCvv(e.target.value)} className={inputStyle} maxLength={4}/>
               </div>
               <div>
                  <label className={labelStyle}>Số lượng</label>
                  <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className={inputStyle} min={1} max={100}/>
               </div>
            </div>

            {/* Checkbox Options */}
            <div className="flex gap-6 pt-2 bg-white/5 p-4 rounded-xl border border-white/5">
                <span className="text-sm text-gray-400 font-bold self-center mr-2">BAO GỒM:</span>
                <label className="flex items-center gap-2 cursor-pointer group select-none">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${useDate ? 'bg-emerald-500 border-emerald-500' : 'border-gray-600 bg-transparent'}`}>
                     {useDate && <CheckCircle className="w-3.5 h-3.5 text-black" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={useDate} onChange={(e) => setUseDate(e.target.checked)} />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Ngày tháng</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer group select-none">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${useCvv ? 'bg-emerald-500 border-emerald-500' : 'border-gray-600 bg-transparent'}`}>
                     {useCvv && <CheckCircle className="w-3.5 h-3.5 text-black" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={useCvv} onChange={(e) => setUseCvv(e.target.checked)} />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Mã CVV</span>
                </label>
            </div>
            
            <button 
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
            >
              <Settings className="w-6 h-6 animate-spin-slow" />
              BẮT ĐẦU TẠO (GENERATE)
            </button>
          </div>
        </div>

        {/* CỘT PHẢI: KẾT QUẢ (TERMINAL STYLE) */}
        <div className="lg:col-span-5 flex flex-col h-full">
            <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-1 flex-1 flex flex-col shadow-2xl relative overflow-hidden h-[500px] lg:h-auto">
                
                {/* Header Terminal */}
                <div className="px-5 py-4 border-b border-[#222] flex justify-between items-center bg-[#111]/50 backdrop-blur">
                   <div>
                      <h3 className="text-white font-bold flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        OUTPUT CONSOLE
                      </h3>
                     
                   </div>
                   <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                   </div>
                </div>

                {/* Vùng hiển thị kết quả */}
                <div className="flex-1 p-0 relative group">
                   <textarea 
                      readOnly
                      value={results}
                      className="w-full h-full bg-[#050505] p-5 text-sm font-mono text-emerald-400 focus:outline-none resize-none leading-relaxed"
                      placeholder="// Kết quả sẽ xuất hiện tại đây..."
                   />
                </div>

                {/* Footer Terminal */}
                <div className="p-4 border-t border-[#222] bg-[#0f0f0f]">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2 text-xs text-gray-500">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          <span>Status: {results ? 'Generated' : 'Waiting'}</span>
                       </div>
                       
                       {results && (
                           <button 
                            onClick={handleCopy}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${copied ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                           >
                              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              {copied ? "ĐÃ SAO CHÉP!" : "SAO CHÉP"}
                           </button>
                       )}
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}