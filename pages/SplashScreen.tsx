
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="relative animate-bounce">
        <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-xl"></div>
        <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-white dark:bg-[#1a2632] shadow-xl border border-white/20">
          <span className="material-symbols-outlined text-7xl text-primary">
            smart_toy
          </span>
        </div>
      </div>
      <div className="mt-8 text-center animate-pulse">
        <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white tracking-tight">
          Goland AI
        </h1>
        <p className="text-gray-500 dark:text-slate-400 font-medium mt-2">
          Trợ lý Bất Động Sản Thông Minh
        </p>
      </div>
      <div className="absolute bottom-12 w-32 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-primary animate-shimmer w-full"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
