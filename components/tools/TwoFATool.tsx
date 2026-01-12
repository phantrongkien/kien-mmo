// File: components/tools/TwoFATool.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Shield, Key, Trash2, Copy, CheckCircle, Clock, Info, Lock, AlertCircle } from 'lucide-react';
import * as OTPAuth from 'otpauth';

interface Account {
  id: string;
  label: string;
  secret: string;
  code: string;
  isValid: boolean;
}

export default function TwoFATool() {
  const [input, setInput] = useState('');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [progress, setProgress] = useState(30);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // --- LOGIC TÍNH TOÁN TOTP THẬT ---
  const generateCode = (secret: string): string => {
    try {
      // Loại bỏ khoảng trắng thừa trong secret key
      const cleanSecret = secret.replace(/\s/g, '');
      
      const totp = new OTPAuth.TOTP({
        issuer: "KienCommunity",
        label: "User",
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: cleanSecret 
      });
      return totp.generate();
    } catch (error) {
      return "ERROR";
    }
  };

  const handleGet2FA = () => {
    if (!input.trim()) return;

    const lines = input.split('\n').filter(line => line.trim() !== '');
    const newAccounts: Account[] = lines.map((line, index) => {
      // Xử lý format đầu vào
      // Hỗ trợ: "SecretKey" hoặc "Label|SecretKey" hoặc "Service|Label|SecretKey"
      const parts = line.split('|');
      let label = `Account ${index + 1}`;
      let secret = line.trim();

      if (parts.length === 2) {
         label = parts[0].trim();
         secret = parts[1].trim();
      } else if (parts.length >= 3) {
         label = `${parts[0].trim()} (${parts[1].trim()})`;
         secret = parts[2].trim();
      }

      // Kiểm tra xem secret có hợp lệ không (thử tạo mã lần đầu)
      const initialCode = generateCode(secret);
      const isValid = initialCode !== "ERROR";

      return {
        id: Math.random().toString(36).substr(2, 9),
        label: label,
        secret: secret,
        code: isValid ? initialCode : "INVALID KEY",
        isValid: isValid
      };
    });

    setAccounts(newAccounts);
  };

  const handleDeleteAll = () => {
    setAccounts([]);
    setInput('');
  };

  const handleCopy = (code: string, id: string) => {
    if (code === "INVALID KEY" || code === "ERROR") return;
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // --- EFFECT: ĐỒNG HỘ ĐẾM NGƯỢC & CẬP NHẬT MÃ ---
  useEffect(() => {
    const timer = setInterval(() => {
      // Tính toán giây hiện tại (0-30)
      const seconds = new Date().getSeconds();
      const currentProgress = 30 - (seconds % 30);
      setProgress(currentProgress);

      // Cập nhật lại toàn bộ mã cho các tài khoản
      // (Mỗi giây đều tính lại để đảm bảo không bị lệch nhịp so với server Google)
      setAccounts(prevAccounts => 
        prevAccounts.map(acc => ({
          ...acc,
          code: acc.isValid ? generateCode(acc.secret) : "INVALID KEY"
        }))
      );

    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // --- STYLES ---
  const inputStyle = "w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 focus:outline-none transition-all text-sm font-mono placeholder-gray-600 h-40 resize-none";
  const labelStyle = "text-xs font-bold text-gray-400 mb-2 block uppercase tracking-wider";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CỘT TRÁI: NHẬP LIỆU */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header */}
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-4">
                <Shield className="w-3 h-3" />
                SECURE AUTH
             </div>
             <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
               2FA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Authenticator</span>
             </h2>
             <p className="text-gray-400 text-lg">
               Lấy mã bảo mật 2 lớp (TOTP) chuẩn xác theo thời gian thực.
             </p>
          </div>

          {/* Input Area */}
          <div>
            <label className={labelStyle}>SECRET KEYS (MỖI DÒNG 1 KEY)</label>
            <div className="relative">
                <textarea 
                  placeholder={`Nhập secret keys...\nHỗ trợ format:\n- JBSWY3DPEHPK3PXP\n- Facebook|JBSWY3DPEHPK3PXP`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className={inputStyle}
                />
                <Key className="absolute right-4 top-4 w-5 h-5 text-gray-600" />
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleGet2FA}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Lock className="w-5 h-5" /> LẤY MÃ 2FA
            </button>
            <button 
              onClick={handleDeleteAll}
              className="bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-400 font-bold py-3 px-6 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Trash2 className="w-5 h-5" /> XÓA TẤT CẢ
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-blue-900/10 border border-blue-500/10 p-4 rounded-xl flex gap-3">
             <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
             <div className="text-sm text-gray-400 space-y-1">
                <p className="text-blue-300 font-semibold">Lưu ý quan trọng:</p>
                <ul className="list-disc pl-4 space-y-1 opacity-80">
                   <li>Secret Key thường là chuỗi ký tự viết hoa (Base32), ví dụ: <code>JBSWY3...</code></li>
                   <li>Mã code được tạo ra <strong>giống hệt</strong> mã trên điện thoại của bạn.</li>
                   <li>Hệ thống <strong>không lưu</strong> secret key của bạn, an toàn tuyệt đối.</li>
                </ul>
             </div>
          </div>
        </div>

        {/* CỘT PHẢI: KẾT QUẢ */}
        <div className="lg:col-span-5 flex flex-col h-full">
            <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl flex-1 flex flex-col shadow-2xl relative overflow-hidden min-h-[500px]">
                
                {/* Header Panel */}
                <div className="px-5 py-4 border-b border-[#222] bg-[#111]/50 backdrop-blur flex justify-between items-center">
                   <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      Live Codes ({progress}s)
                   </h3>
                   {/* Thanh progress bar mini */}
                   <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ease-linear ${progress < 5 ? 'bg-red-500' : 'bg-blue-500'}`} 
                        style={{ width: `${(progress / 30) * 100}%` }}
                      ></div>
                   </div>
                </div>

                {/* List Accounts */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar">
                   {accounts.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-3 opacity-50">
                         <Shield className="w-12 h-12" />
                         <span className="text-sm">Nhập Secret Key để bắt đầu</span>
                      </div>
                   ) : (
                      accounts.map((acc) => (
                         <div key={acc.id} className={`group bg-white/5 hover:bg-white/10 border hover:border-blue-500/30 rounded-xl p-4 transition-all relative overflow-hidden ${acc.isValid ? 'border-white/5' : 'border-red-500/30 bg-red-900/10'}`}>
                            <div className="flex justify-between items-start mb-2">
                               <span className="text-xs font-bold text-gray-400 uppercase truncate max-w-[150px]">{acc.label}</span>
                               <span className="text-[10px] text-gray-600 font-mono">TOTP</span>
                            </div>
                            
                            {acc.isValid ? (
                                <div className="flex justify-between items-center">
                                   <div className="text-3xl font-mono font-bold tracking-widest text-blue-400 group-hover:text-blue-300 transition-colors">
                                      {acc.code.slice(0, 3)} {acc.code.slice(3)}
                                   </div>
                                   <button 
                                      onClick={() => handleCopy(acc.code, acc.id)}
                                      className={`p-2 rounded-lg transition-all ${copiedId === acc.id ? 'bg-green-500 text-white' : 'bg-black/30 text-gray-400 hover:text-white'}`}
                                   >
                                      {copiedId === acc.id ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                   </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-red-400 font-bold">
                                    <AlertCircle className="w-5 h-5" />
                                    <span>Sai Secret Key!</span>
                                </div>
                            )}

                            {/* Progress bar background overlay (chỉ hiện khi hợp lệ) */}
                            {acc.isValid && (
                                <div 
                                   className="absolute bottom-0 left-0 h-0.5 bg-blue-500/50 transition-all duration-1000 ease-linear"
                                   style={{ width: `${(progress / 30) * 100}%` }}
                                ></div>
                            )}
                         </div>
                      ))
                   )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-[#222] bg-[#0f0f0f] text-center">
                    <p className="text-[10px] text-gray-600">
                       Hệ thống tự động đồng bộ thời gian thực.
                    </p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}