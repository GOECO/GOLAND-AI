
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SummaryScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-slate-900 dark:text-white relative overflow-x-hidden">
      {/* Background blurs */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40 dark:opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/20 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 border-b border-gray-200 dark:border-gray-800">
        <div 
          onClick={() => navigate(-1)}
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-200" style={{ fontSize: '24px' }}>close</span>
        </div>
        <h1 className="text-base font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Chia sẻ tóm tắt</h1>
        <div className="flex w-10 items-center justify-end"></div> 
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 pb-32 overflow-y-auto no-scrollbar">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all transform hover:scale-[1.01]">
          {/* Card Header */}
          <div className="p-6 pb-2 border-b border-gray-100 dark:border-gray-700/50">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Báo cáo thị trường</p>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">Quận 1, TP.HCM</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Quý 3/2023 - Cập nhật mới nhất</p>
              </div>
              <div className="flex items-center justify-center size-10 rounded-full bg-primary/10">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>apartment</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 p-4">
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/50 text-center">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-tighter">Giá TB</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">7.5 Tỷ</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-green-50 dark:bg-green-900/20 text-center">
              <span className="text-[10px] font-bold text-green-700 dark:text-green-500 mb-1 uppercase tracking-tighter">Tăng trưởng</span>
              <div className="flex items-center gap-0.5">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400" style={{ fontSize: '14px' }}>trending_up</span>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">+5.2%</span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/50 text-center">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-tighter">Giao dịch</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">1,205</span>
            </div>
          </div>

          {/* Chart Section */}
          <div className="px-6 py-2">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-slate-900 dark:text-white">Xu hướng giá</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold uppercase">6 tháng</span>
            </div>
            <div className="h-28 w-full relative">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 100">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#137fec" stopOpacity="0.25"></stop>
                    <stop offset="80%" stopColor="#137fec" stopOpacity="0.05"></stop>
                    <stop offset="100%" stopColor="#137fec" stopOpacity="0"></stop>
                  </linearGradient>
                  <filter height="140%" id="lineShadow" width="140%" x="-20%" y="-20%">
                    <feDropShadow dx="0" dy="3" floodColor="#137fec" floodOpacity="0.25" stdDeviation="3"></feDropShadow>
                  </filter>
                </defs>
                <g className="dark:stroke-slate-700/50" stroke="#f1f5f9" strokeDasharray="4,4" strokeWidth="1">
                  <line opacity="0.5" x1="0" x2="300" y1="25" y2="25"></line>
                  <line opacity="0.5" x1="0" x2="300" y1="50" y2="50"></line>
                  <line opacity="0.5" x1="0" x2="300" y1="75" y2="75"></line>
                  <line opacity="0.5" x1="75" x2="75" y1="0" y2="100"></line>
                  <line opacity="0.5" x1="150" x2="150" y1="0" y2="100"></line>
                  <line opacity="0.5" x1="225" x2="225" y1="0" y2="100"></line>
                </g>
                <path d="M0,80 C30,75 60,85 90,60 C120,35 150,50 180,40 C210,30 240,45 270,20 L300,15 L300,100 L0,100 Z" fill="url(#chartGradient)"></path>
                <path d="M0,80 C30,75 60,85 90,60 C120,35 150,50 180,40 C210,30 240,45 270,20 L300,15" fill="none" filter="url(#lineShadow)" stroke="#137fec" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                <circle className="dark:stroke-slate-800" cx="300" cy="15" fill="#137fec" filter="url(#lineShadow)" r="5" stroke="white" strokeWidth="2.5"></circle>
              </svg>
            </div>
          </div>

          {/* AI Insight */}
          <div className="p-4 mx-4 mb-4 mt-4 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
              <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">Goland AI Nhận định</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Thị trường Quận 1 đang chứng kiến sự hồi phục nhẹ về giá nhờ nguồn cung căn hộ cao cấp mới. Lượng giao dịch tăng 15% so với quý trước, tập trung ở phân khúc trung tâm.
            </p>
          </div>

          {/* Card Footer */}
          <div className="bg-gray-50 dark:bg-slate-900/50 px-6 py-3 flex justify-between items-center border-t border-gray-100 dark:border-gray-700/50">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Nguồn: Dữ liệu thị trường</span>
            <div className="flex items-center gap-1.5 opacity-80">
              <div className="size-4 rounded-sm bg-primary flex items-center justify-center text-[10px] font-bold text-white">G</div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Goland AI</span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed font-medium px-4">
          Bản tóm tắt này đã sẵn sàng để chia sẻ với khách hàng hoặc đăng lên mạng xã hội.
        </p>
      </main>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-4 pb-8 safe-area-pb z-50">
        <div className="flex gap-3 max-w-md mx-auto">
          <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-white font-bold text-sm transition-colors hover:bg-gray-50 dark:hover:bg-slate-700 active:scale-95">
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>Lưu ảnh</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all active:scale-95 hover:bg-blue-600">
            <span className="material-symbols-outlined text-[20px]">ios_share</span>
            <span>Chia sẻ ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryScreen;
