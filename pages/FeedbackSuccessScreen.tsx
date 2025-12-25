
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeedbackSuccessScreen: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const trackingCode = "#GOLANDAI12345";

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark antialiased font-display text-slate-900 dark:text-white transition-colors duration-200">
      {/* TopAppBar (Minimalist) */}
      <div className="flex items-center justify-between px-4 py-4 pt-8 sticky top-0 z-10 bg-transparent">
        <div className="w-10"></div>
        <h2 className="text-lg font-bold leading-tight tracking-tight opacity-0">Success</h2>
        <button 
          onClick={() => navigate('/home')}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer active:scale-90"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>close</span>
        </button>
      </div>

      {/* Main Content Area (Centered) */}
      <div className="flex flex-1 flex-col items-center justify-center px-8 -mt-10 animate-in fade-in zoom-in-95 duration-500">
        {/* Success Visual */}
        <div className="relative flex items-center justify-center mb-10 group">
          {/* Abstract Background Glow */}
          <div className="absolute w-40 h-40 bg-primary/20 rounded-full blur-2xl dark:bg-primary/10 animate-pulse"></div>
          {/* Icon Container */}
          <div className="relative flex items-center justify-center w-28 h-28 bg-primary rounded-full shadow-xl shadow-primary/30 ring-4 ring-white dark:ring-background-dark transition-transform duration-500 ease-out transform group-hover:scale-105">
            <span className="material-symbols-outlined text-white select-none" style={{ fontSize: '64px', fontVariationSettings: "'wght' 600" }}>check</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-3 max-w-[480px]">
          <h1 className="text-[#111418] dark:text-white text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em] text-center">
            Gửi báo cáo thành công!
          </h1>
          <p className="text-[#637588] dark:text-slate-400 text-base font-normal leading-relaxed text-center px-2">
            Cảm ơn bạn đã đóng góp ý kiến. Đội ngũ <span className="text-primary font-medium">Goland AI</span> sẽ xem xét và xử lý phản hồi của bạn trong thời gian sớm nhất.
          </p>

          {/* Tracking Code Card */}
          <div className="mt-5 w-full flex justify-center">
            <div 
              onClick={handleCopy}
              className="group relative flex w-full max-w-[320px] cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 pr-4 dark:border-slate-700 dark:bg-white/5 transition-all hover:border-primary/50 hover:shadow-md active:scale-[0.98]"
            >
              <div className="flex flex-col items-start px-3 py-2 text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Mã theo dõi của bạn</span>
                <span className="font-mono text-lg font-bold text-slate-900 dark:text-white select-all">{trackingCode}</span>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${copied ? 'bg-green-100 text-green-600' : 'bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary dark:bg-white/5'}`}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{copied ? 'check' : 'content_copy'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Pulse Illustration */}
        <div className="mt-8 w-full max-w-[240px] h-24 rounded-2xl bg-[#f1f5f9] dark:bg-slate-800/40 flex items-center justify-center gap-2 border border-gray-100 dark:border-gray-800">
          <div className="w-1.5 h-8 bg-primary/20 rounded-full animate-bounce [animation-duration:1.5s]"></div>
          <div className="w-1.5 h-12 bg-primary/40 rounded-full animate-bounce [animation-duration:1.2s]"></div>
          <div className="w-1.5 h-6 bg-primary/20 rounded-full animate-bounce [animation-duration:1.8s]"></div>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="w-full px-5 py-6 pb-10 mt-auto bg-transparent max-w-md mx-auto">
        <button 
          onClick={() => navigate('/home')}
          className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 bg-primary text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-primary/25"
        >
          <span className="truncate">Quay về Trang Chủ</span>
        </button>
      </div>
    </div>
  );
};

export default FeedbackSuccessScreen;
