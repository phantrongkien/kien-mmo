"use client";

import React, { useState } from 'react';
import { Copy, X, Zap, ArrowLeft } from 'lucide-react'; // Đã thêm ArrowLeft
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MagicContainer, MagicCard } from '@/components/ui/MagicCard';
import SpotlightCard from '@/components/ui/SpotlightCard';
import TextType from '@/components/ui/TextType'; // Giữ lại hiệu ứng gõ chữ

// Dữ liệu Coin
const COINS = [
  { id: 'btc', symbol: 'BTC', network: 'Bitcoin', name: 'Bitcoin', icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', address: 'bc1qx0knad70naqhhhkphrylxa6y5usmvfkqmh84z3', rgb: '247, 147, 26' },
  { id: 'eth', symbol: 'ETH', network: 'Ethereum', name: 'Ethereum', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', address: '0xF6823fee88abc4686255d5cD340292D500Fd2637', rgb: '98, 126, 234' },
  { id: 'bnb', symbol: 'BNB', network: 'BSC', name: 'BNB Chain', icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png', address: '0xF6823fee88abc4686255d5cD340292D500Fd2637', rgb: '243, 186, 47' },
  { id: 'doge', symbol: 'DOGE', network: 'Dogecoin', name: 'Dogecoin', icon: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png', address: 'DBwkfH9gsHPfb8tvAY3JWxVx56uA7riNS7', rgb: '194, 166, 51' },
  { id: 'trx', symbol: 'TRX', network: 'TRC20', name: 'Tron', icon: 'https://cryptologos.cc/logos/tron-trx-logo.png', address: 'TYao9qytWXWKwDjv1KPi71h5KYAQGiQhC1', rgb: '255, 0, 0' },
  { id: 'ltc', symbol: 'LTC', network: 'Litecoin', name: 'Litecoin', icon: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png', address: 'ltc1qkdfz6awelxenp8lc8v7hr2k8m4xamawmk2sgzg', rgb: '52, 93, 157' },
  { id: 'usdt', symbol: 'USDT', network: 'BEP20', name: 'Tether USD', icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/usdt.png', address: '0xF6823fee88abc4686255d5cD340292D500Fd2637', rgb: '38, 161, 123' },
];

// Thêm prop onBack để nhận lệnh quay lại từ Dashboard
export default function TrustWalletUI({ onBack }: { onBack?: () => void }) {
  const [selectedCoin, setSelectedCoin] = useState<any>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Đã sao chép địa chỉ ví!', { position: "top-center", autoClose: 1500, theme: "dark" });
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white font-sans flex items-center justify-center p-4 relative overflow-hidden animate-in fade-in zoom-in duration-300">
      
      {/* Nút Quay lại Dashboard (Chỉ hiện khi có prop onBack) */}
      {onBack && (
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 z-50 flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Quay lại
        </button>
      )}

      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <ToastContainer />

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 z-10 mt-10 md:mt-0">
        
        {/* Cột Trái: Giữ nguyên TextType và Kien Community */}
        <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
           <div>
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-green-400 mb-4 backdrop-blur-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                SYSTEM ONLINE
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-2">
                Kien Community
              </h1>
              
              {/* Hiệu ứng gõ chữ (Đã khôi phục) */}
              <div className="text-gray-400 text-lg min-h-[30px]">
                 <TextType 
                   text={[
                     "Cổng Donate & Chia sẻ tài nguyên MMO.",
                     "Hệ thống bảo mật tuyệt đối.",
                     "Hỗ trợ cộng đồng phát triển.",
                     "Chia sẻ tuts & tricks miễn phí."
                   ]}
                   typingSpeed={50}
                   deletingSpeed={30}
                   pauseDuration={2000}
                   cursorCharacter="_"
                 />
              </div>
           </div>
           
           <SpotlightCard className="custom-spotlight-card text-center md:text-left" spotlightColor="rgba(0, 229, 255, 0.2)">
              <p className="text-gray-500 text-sm uppercase font-bold tracking-wider mb-2">Tổng quỹ bảo hiểm</p>
              <h2 className="text-5xl font-extrabold text-white tracking-tighter">$1,337.00</h2>
              <div className="mt-4 flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-xs text-green-400 font-mono">Secure Vault Active</span>
              </div>
           </SpotlightCard>
        </div>

        {/* Cột Phải */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl h-[500px] overflow-y-auto custom-scrollbar">
          <h3 className="text-gray-400 text-xs font-bold uppercase mb-4 tracking-wider">Chọn cổng thanh toán</h3>
          
          <MagicContainer className="space-y-3">
            {COINS.map((coin) => (
              <MagicCard 
                key={coin.id}
                colorRGB={coin.rgb}
                onClick={() => setSelectedCoin(coin)}
                className="p-4 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                     <img src={coin.icon} alt={coin.symbol} className="w-10 h-10 rounded-full bg-white/10 p-0.5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-base text-white group-hover:text-white transition-colors">{coin.symbol}</span>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300 font-mono">{coin.network}</span>
                       <span className="text-xs text-gray-500">{coin.name}</span>
                    </div>
                  </div>
                </div>
                <div>
                   <Zap className="w-5 h-5 text-gray-600 group-hover:text-yellow-400 transition-colors" />
                </div>
              </MagicCard>
            ))}
          </MagicContainer>
        </div>
      </div>

      {/* MODAL QR CODE */}
      {selectedCoin && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#1c1c1e] w-full max-w-sm rounded-3xl border border-gray-700 shadow-2xl overflow-hidden relative">
            <button onClick={() => setSelectedCoin(null)} className="absolute top-4 right-4 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <X className="w-5 h-5 text-gray-300" />
            </button>
            <div className="p-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 p-0.5 mb-6 shadow-xl">
                    <div className="w-full h-full bg-[#1c1c1e] rounded-full flex items-center justify-center border border-white/10">
                        <img src={selectedCoin.icon} className="w-12 h-12" />
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedCoin.symbol}</h3>
                <p className="text-gray-400 text-sm mb-6">Mạng: <span className="text-blue-400 font-bold">{selectedCoin.network}</span></p>
                <div className="bg-white p-3 rounded-2xl shadow-xl mb-6">
                     <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${selectedCoin.address}`} className="w-40 h-40"/>
                </div>
                <div className="w-full bg-[#121214] p-4 rounded-xl border border-gray-800 break-all mb-4" onClick={() => handleCopy(selectedCoin.address)}>
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Địa chỉ ví</p>
                    <p className="font-mono text-sm text-gray-300">{selectedCoin.address}</p>
                </div>
                <button onClick={() => handleCopy(selectedCoin.address)} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                    <Copy size={18} /> Sao chép
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}