
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { 
      label: 'Trang chủ', 
      path: '/home',
      icon: (isActive: boolean) => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill={isActive ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    { 
      label: 'Bản đồ', 
      path: '/map',
      icon: (isActive: boolean) => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill={isActive ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="1 6 1 22 8 18 15 22 23 18 23 2 15 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="15" y1="6" x2="15" y2="22" />
        </svg>
      )
    },
    { 
      label: 'Đã lưu', 
      path: '/saved',
      icon: (isActive: boolean) => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill={isActive ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    { 
      label: 'Thông báo', 
      path: '/inbox',
      icon: (isActive: boolean) => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill={isActive ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      )
    },
    { 
      label: 'Cá nhân', 
      path: '/profile',
      icon: (isActive: boolean) => (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill={isActive ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] max-w-[480px] mx-auto">
      <div className="bg-white dark:bg-[#101922] border-t border-gray-100 dark:border-gray-800 h-[84px] w-full flex justify-around items-start pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] backdrop-blur-lg transition-colors">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1.5 w-16 transition-all group active:scale-90 ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500 hover:text-primary'}`}
            >
              <div className={`transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-md' : 'group-hover:scale-110'}`}>
                {item.icon(isActive)}
              </div>
              <span className={`text-[10px] transition-all font-medium tracking-tight ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
