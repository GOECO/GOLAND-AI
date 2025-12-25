
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AlertItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  bg: string;
  enabled: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
  isAI?: boolean;
  gradient?: string;
}

const AlertSettings: React.FC = () => {
  const navigate = useNavigate();
  const [globalEnabled, setGlobalEnabled] = useState(true);
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: 'price',
      title: 'Biến động giá',
      desc: 'Nhận thông báo khi BĐS bạn theo dõi tăng hoặc giảm giá.',
      icon: 'currency_exchange',
      color: 'text-primary',
      bg: 'bg-primary/10',
      enabled: true,
      frequency: 'immediate'
    },
    {
      id: 'projects',
      title: 'Dự án mới',
      desc: 'Cập nhật dự án mới mở bán tại khu vực quan tâm.',
      icon: 'apartment',
      color: 'text-purple-600',
      bg: 'bg-purple-500/10',
      enabled: true,
      frequency: 'weekly'
    },
    {
      id: 'planning',
      title: 'Thay đổi quy hoạch',
      desc: 'Cảnh báo AI về thay đổi quy hoạch đất đai tại vị trí bạn đã lưu.',
      icon: 'map',
      color: 'text-cyan-600',
      bg: 'bg-cyan-500/10',
      enabled: true,
      frequency: 'daily',
      isAI: true,
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      id: 'news',
      title: 'Tin tức thị trường',
      desc: 'Tổng hợp tin tức nóng hổi về thị trường BĐS.',
      icon: 'newspaper',
      color: 'text-orange-600',
      bg: 'bg-orange-500/10',
      enabled: false,
      frequency: 'daily'
    },
    {
      id: 'suggestions',
      title: 'Gợi ý AI',
      desc: 'BĐS mới phù hợp với tiêu chí tìm kiếm của bạn dựa trên AI.',
      icon: 'auto_awesome',
      color: 'text-indigo-600',
      bg: 'bg-indigo-500/10',
      enabled: true,
      frequency: 'immediate',
      isAI: true,
      gradient: 'from-indigo-500 to-purple-500'
    }
  ]);

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  const setFrequency = (id: string, freq: AlertItem['frequency']) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, frequency: freq } : a));
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-slate-900 dark:text-white relative overflow-x-hidden">
      {/* Top App Bar */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center p-4 h-16 max-w-md mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white active:scale-90"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
          </button>
          <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight pr-10">Tùy chỉnh Cảnh báo</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto p-4 flex flex-col gap-6 pb-32">
        {/* Global Toggle Section */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 transition-colors">
          <div className="flex-1">
            <p className="text-base font-bold leading-normal text-slate-900 dark:text-white">Cho phép tất cả thông báo</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Tắt để tạm dừng mọi cảnh báo từ Goland AI</p>
          </div>
          <div className="shrink-0">
            <label className={`relative flex h-[32px] w-[52px] cursor-pointer items-center rounded-full border-2 border-transparent p-0.5 transition-colors duration-300 ease-in-out ${globalEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}>
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={globalEnabled}
                onChange={() => setGlobalEnabled(!globalEnabled)}
              />
              <span className={`pointer-events-none inline-block size-7 rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out ${globalEnabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
            </label>
          </div>
        </div>

        {/* Section Header */}
        <div className="px-1">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Cài đặt chi tiết</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Tùy chỉnh loại thông báo và tần suất nhận tin.</p>
        </div>

        {/* Alert Items List */}
        <div className={`flex flex-col gap-4 transition-all duration-500 ${globalEnabled ? 'opacity-100 scale-100' : 'opacity-50 scale-[0.98] pointer-events-none grayscale'}`}>
          {alerts.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md group relative overflow-hidden ${!item.enabled ? 'opacity-80' : ''}`}
            >
              {item.isAI && item.gradient && (
                <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${item.gradient}`}></div>
              )}
              <div className="flex gap-4">
                {/* Icon */}
                <div className="shrink-0">
                  <div className={`flex items-center justify-center rounded-2xl ${item.bg} ${item.color} size-12 shadow-sm`}>
                    <span className="material-symbols-outlined filled" style={{ fontSize: '24px' }}>{item.icon}</span>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-base font-bold leading-tight truncate ${item.enabled ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                        {item.title}
                      </h4>
                      {item.isAI && (
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-extrabold text-primary ring-1 ring-inset ring-primary/20 dark:bg-primary/20 dark:text-blue-300">AI</span>
                      )}
                    </div>
                    <div className="shrink-0 -mt-1 -mr-1">
                      <label className={`relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full border-2 border-transparent p-0.5 transition-colors duration-200 ${item.enabled ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}>
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          checked={item.enabled}
                          onChange={() => toggleAlert(item.id)}
                        />
                        <span className={`pointer-events-none inline-block size-6 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${item.enabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
                      </label>
                    </div>
                  </div>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4 font-medium">{item.desc}</p>
                  
                  {/* Frequency Selector */}
                  {item.enabled && (
                    <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-1 duration-300">
                      {[
                        { id: 'immediate', label: 'Tức thời' },
                        { id: 'daily', label: 'Hàng ngày' },
                        { id: 'weekly', label: 'Hàng tuần' }
                      ].map((freq) => (
                        <button 
                          key={freq.id}
                          onClick={() => setFrequency(item.id, freq.id as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            item.frequency === freq.id 
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                          }`}
                        >
                          {freq.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Actions Sticky */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 z-40 max-w-[480px] mx-auto shadow-2xl">
        <button 
          onClick={() => navigate(-1)}
          className="w-full h-14 flex items-center justify-center gap-2 rounded-2xl bg-primary hover:bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default AlertSettings;
