
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Platform {
  id: string;
  name: string;
  icon: string;
  type: 'svg' | 'material';
  color: string;
  active: boolean;
  svgPath?: string;
}

const ShareSettings: React.FC = () => {
  const navigate = useNavigate();
  
  const [platforms, setPlatforms] = useState<Platform[]>([
    { 
      id: 'fb', 
      name: 'Facebook', 
      icon: '', 
      type: 'svg', 
      color: 'bg-[#1877F2]', 
      active: true,
      svgPath: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    },
    { 
      id: 'zalo', 
      name: 'Zalo', 
      icon: 'Zalo', 
      type: 'material', 
      color: 'bg-[#0068FF]', 
      active: true 
    },
    { 
      id: 'messenger', 
      name: 'Messenger', 
      icon: 'chat', 
      type: 'material', 
      color: 'bg-gradient-to-tr from-[#00C6FF] to-[#0072FF]', 
      active: true 
    },
    { 
      id: 'copy', 
      name: 'Sao chép liên kết', 
      icon: 'link', 
      type: 'material', 
      color: 'bg-gray-100 dark:bg-gray-700', 
      active: true 
    },
    { 
      id: 'sms', 
      name: 'Tin nhắn', 
      icon: 'sms', 
      type: 'material', 
      color: 'bg-[#4CD964]', 
      active: false 
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: 'photo_camera', 
      type: 'material', 
      color: 'bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4]', 
      active: false 
    },
    { 
      id: 'email', 
      name: 'Email', 
      icon: 'mail', 
      type: 'material', 
      color: 'bg-gray-200 dark:bg-gray-600', 
      active: false 
    },
  ]);

  const togglePlatform = (id: string) => {
    setPlatforms(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const restoreDefaults = () => {
    setPlatforms(prev => prev.map((p, i) => ({ ...p, active: i < 4 })));
  };

  return (
    <div className="h-screen w-full bg-background-light dark:bg-background-dark flex flex-col relative overflow-hidden">
      {/* Simulation of HomeScreen background behind the modal */}
      <div className="absolute inset-0 bg-slate-100 dark:bg-[#101922] grayscale-[50%] opacity-40 blur-sm pointer-events-none"></div>
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity z-0" onClick={() => navigate(-1)}></div>

      {/* Modal / Bottom Sheet */}
      <div className="relative mt-auto w-full bg-white dark:bg-gray-900 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] flex flex-col animate-in slide-in-from-bottom duration-300 max-h-[92vh] z-10">
        
        {/* Handle & Header */}
        <div className="pt-3 pb-2 w-full bg-white dark:bg-gray-900 sticky top-0 border-b border-gray-100 dark:border-gray-800 z-20 rounded-t-[32px]">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full opacity-50"></div>
          </div>
          <div className="flex items-center justify-between px-6 pb-2">
            <button onClick={() => navigate(-1)} className="text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Hủy</button>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">Cài đặt Chia sẻ</h3>
            <button onClick={() => navigate(-1)} className="text-base font-bold text-primary hover:text-blue-600 transition-colors">Lưu</button>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 p-4 overflow-y-auto no-scrollbar pb-12">
          <p className="px-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 mt-2">Nền tảng hiển thị</p>
          
          <div className="flex flex-col gap-3.5">
            {platforms.map((platform) => (
              <div 
                key={platform.id} 
                className={`flex items-center gap-3.5 p-3.5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all ${!platform.active ? 'opacity-60' : 'scale-100'}`}
              >
                <div className="flex items-center justify-center w-8 h-8 text-gray-300 dark:text-gray-600 cursor-grab active:cursor-grabbing hover:text-gray-400">
                  <span className="material-symbols-outlined text-[24px]">drag_handle</span>
                </div>
                
                <div className={`size-12 rounded-2xl flex items-center justify-center ${platform.color} text-white shadow-lg shrink-0 overflow-hidden relative group`}>
                  {platform.type === 'svg' ? (
                    <svg className="w-6 h-6 fill-current relative z-10" viewBox="0 0 24 24">
                      <path d={platform.svgPath}></path>
                    </svg>
                  ) : (
                    platform.id === 'zalo' ? (
                      <span className="font-sans font-black text-xs tracking-tight scale-110 relative z-10">Zalo</span>
                    ) : (
                      <span className="material-symbols-outlined text-[24px] relative z-10">{platform.icon}</span>
                    )
                  )}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className={`text-base font-bold leading-tight ${platform.active ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                    {platform.name}
                  </h4>
                </div>

                <label className="relative inline-flex items-center cursor-pointer mr-1">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={platform.active}
                    onChange={() => togglePlatform(platform.id)}
                  />
                  <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary shadow-inner"></div>
                </label>
              </div>
            ))}
          </div>

          <div className="mt-10 mb-6 text-center">
            <button 
              onClick={restoreDefaults}
              className="text-sm font-bold text-red-500 hover:text-red-600 dark:hover:text-red-400 py-3 px-6 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
            >
              Khôi phục mặc định
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareSettings;
