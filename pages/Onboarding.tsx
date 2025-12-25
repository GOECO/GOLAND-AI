
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(0);
  const [time, setTime] = useState('9:41');
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
  }, []);

  const steps = [
    {
      title: 'Trợ lý AI Phân tích',
      description: 'AI tự động phân tích dữ liệu, định giá và gợi ý bất động sản tốt nhất cho riêng bạn.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8x955MD_QOVXyN6202rGq2E4nn2q1ldIDKWvfNPIxYgjx2zUMlEhIOmDQIa-YcU1VAVDDXy7HmcCPzGD-21CHzr5ru2sZ24Hk_ki67CG3M60YZGYdJlzbr00bWmIPweuwrKZO2aOlnVu4suZJm9QMFYp7ewReXGyF81QNau7ooxbHVhiuhM0h73xkkGGxZWZw8MZ_DGkUSgHHFPkyHcG-_u0zUAGWtVaJieFHN67CBF-2_yBO2-KF5NGbdQwOFAHPKI0n_Df--S-2'
    },
    {
      title: 'Bản đồ Quy hoạch',
      description: 'Tra cứu pháp lý, quy hoạch chi tiết từng lô đất một cách trực quan và chính xác.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcpqABvrk4b3-crlo9xUB9RhgDa4fo9Iy0uPPyWx0JrHz3twVdIkaP1uSdRWx1kblJL2mUOTIZDeW5zWiJBxeEWIy_RLM_XO0TkbdCD1VCRqZFqv_aBn9tSYwvSZGHc7mBsP7eoS1NBGFij05q3gAZuJdKW2XH03ZVnkvKfCnvFCRobvhdR-DGN8VJj-5rHhnLHyZ2FgylNt5iRUK84sJg8mKK9G__nYwLGDIKiwxNMi9ZfKF77f1mklKmuVBOdPtRi6JN3E1ph6j_'
    },
    {
      title: 'Dự báo Thị trường',
      description: 'Nhận định giá chính xác, dự báo xu hướng đầu tư sinh lời trong tương lai.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFAdvjbs4swPISWxIbtninft0b2TBNlrNafiZpG9HFi4BRxRWBh1Fp2sq_9poIecljsGHJVUvfbC3w46S4pf4ZejVLoNmgP3A6SrzcWggIjsR42ciM6pYSXtPKChJwToQcpZxDJScvQRuCZQZ9ex1A2rDuPhU8NCjzU5EF_JUVwmHFzIt2lqcveGPtMAGRZSDbOSrvEnOTjEIFfDrjeKMik8RFi6j7Fe08BMTX9cDnjBirA5ZhmQp8eubhTt_Qq9fj0oiND0sU3UWM'
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased flex items-center justify-center min-h-screen p-0 sm:p-4 selection:bg-primary selection:text-white transition-colors duration-500">
      <div className="relative flex h-[812px] w-full max-w-[375px] flex-col bg-white dark:bg-background-dark overflow-hidden sm:rounded-[3rem] shadow-2xl border-[8px] border-white dark:border-gray-800 box-content ring-1 ring-black/5">
        
        {/* Status Bar */}
        <div className="h-14 w-full flex items-end justify-between px-6 pb-2 z-30">
          <span className="text-xs font-semibold text-slate-900 dark:text-white font-body">{time}</span>
          <div className="flex gap-1.5 text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-[18px]">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[18px]">wifi</span>
            <span className="material-symbols-outlined text-[18px]">battery_full</span>
          </div>
        </div>

        {/* Skip Button */}
        <div className="absolute top-14 right-6 z-30">
          <button 
            onClick={() => navigate('/login')}
            className="group flex items-center gap-1.5 pl-4 pr-2 py-1.5 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/60 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:bg-white dark:hover:bg-slate-700 active:scale-95"
          >
            <span className="text-[13px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tighter">Bỏ qua</span>
            <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-primary transition-colors">chevron_right</span>
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col relative z-10 pt-4">
          <div className="flex-1 flex items-center justify-center relative px-6">
            {/* Background Blur Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/15 rounded-full blur-[90px] animate-pulse-slow"></div>
            
            {/* Illustration Card */}
            <div className="relative w-full aspect-[4/5] max-h-[440px] bg-white dark:bg-surface-dark rounded-[2.5rem] border border-white/60 dark:border-white/5 shadow-soft overflow-hidden group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-95 dark:opacity-70" 
                style={{ backgroundImage: `url(${steps[step].image})` }}
              ></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] dark:opacity-[0.1]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-background-dark/90"></div>
              
              <div className="absolute inset-0 p-6">
                {/* Floating Growth Widget */}
                <div className="absolute top-8 right-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-white/60 dark:border-slate-600 w-32 transform rotate-3 animate-float">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tăng trưởng</span>
                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded-full">+12.4%</span>
                  </div>
                  <div className="flex items-end justify-between h-8 gap-1.5">
                    <div className="w-1/4 bg-blue-100 dark:bg-blue-900/50 h-[40%] rounded-sm"></div>
                    <div className="w-1/4 bg-blue-200 dark:bg-blue-800/50 h-[60%] rounded-sm"></div>
                    <div className="w-1/4 bg-blue-300 dark:bg-blue-700/50 h-[30%] rounded-sm"></div>
                    <div className="w-1/4 bg-primary h-[85%] rounded-sm shadow-glow"></div>
                  </div>
                </div>

                {/* AI Center Point */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 flex items-center justify-center mt-4">
                  <div className="absolute inset-0 border border-primary/20 rounded-full border-dashed animate-[spin_16s_linear_infinite]"></div>
                  <div className="absolute inset-0 border border-primary/10 rounded-full animate-pulse-slow"></div>
                  <div className="w-24 h-24 bg-white/30 dark:bg-slate-800/30 backdrop-blur-md border border-white/60 dark:border-slate-600 rounded-full flex items-center justify-center relative shadow-[0_8px_32px_rgba(0,106,245,0.2)]">
                    <div className="absolute top-0 right-1 w-3 h-3 bg-primary rounded-full shadow-glow animate-pulse border-2 border-white dark:border-slate-800"></div>
                    <span className="material-symbols-outlined text-primary text-[44px] drop-shadow-sm">memory</span>
                  </div>
                </div>

                {/* Location Chip */}
                <div className="absolute top-[45%] left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-white/60 dark:border-slate-600 flex items-center gap-2.5 transform -translate-y-2 animate-float [animation-delay:1.5s]">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-slate-800 dark:text-white leading-tight uppercase tracking-tighter">Q. Bình Thạnh</div>
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">TP. Hồ Chí Minh</div>
                  </div>
                </div>

                {/* AI Insight Box */}
                <div className="absolute bottom-6 left-4 right-4 bg-white/95 dark:bg-slate-800/95 p-4 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white dark:border-slate-700 backdrop-blur-xl">
                  <div className="flex gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0 text-white">
                      <span className="material-symbols-outlined text-[22px]">smart_toy</span>
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded">Goland AI</span>
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                      </div>
                      <p className="text-[12px] leading-snug text-slate-600 dark:text-slate-300 font-bold">
                        Căn hộ này có tiềm năng sinh lời cao, dự báo tăng <span className="text-primary font-black">15%</span> trong 2 năm tới.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Text */}
          <div className="flex flex-col items-center px-8 pb-2 pt-8">
            <h1 className="text-slate-900 dark:text-white text-[28px] font-black leading-tight text-center mb-3 tracking-tighter uppercase">
              {steps[step].title}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed text-center font-bold max-w-[280px]">
              {steps[step].description}
            </p>
          </div>
        </main>

        {/* Footer Actions */}
        <div className="flex flex-col w-full items-center justify-center gap-7 px-6 pb-10 pt-4 bg-transparent z-20">
          {/* Step Indicators */}
          <div className="flex flex-row items-center justify-center gap-2">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 transition-all duration-500 rounded-full shadow-sm ${i === step ? 'w-8 bg-primary' : 'w-2 bg-slate-200 dark:bg-slate-700'}`} 
              />
            ))}
          </div>
          
          {/* Continue Button */}
          <button 
            onClick={handleNext}
            className="w-full h-[60px] bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center rounded-2xl shadow-[0_10px_30px_rgba(0,106,245,0.25)] group relative overflow-hidden ring-4 ring-blue-50 dark:ring-blue-900/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="text-white text-[16px] font-black tracking-widest mr-2 relative z-10 uppercase">
              {step === steps.length - 1 ? 'Bắt đầu ngay' : 'Tiếp tục'}
            </span>
            <span className="material-symbols-outlined text-white text-[20px] group-hover:translate-x-1 transition-transform relative z-10">arrow_forward</span>
          </button>
        </div>

        {/* Background Decorative Blurs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
      </div>
    </div>
  );
};

export default Onboarding;
