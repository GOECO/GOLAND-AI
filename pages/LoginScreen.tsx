
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col bg-background-light dark:bg-background-dark">
      <div className="h-1/3 w-full bg-cover bg-center relative flex flex-col justify-end p-6" 
           style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(16,25,34,0.9)), url("https://images.unsplash.com/photo-1512453979798-5eaad0ff3e01?auto=format&fit=crop&w=1200")' }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white">
            <span className="material-symbols-outlined">apartment</span>
          </div>
          <h1 className="text-white text-2xl font-bold">Goland AI</h1>
        </div>
        <p className="text-blue-100/80 font-medium">Công nghệ định hình bất động sản</p>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <h2 className="text-3xl font-bold mb-2">Xin chào,</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Đăng nhập để trải nghiệm bất động sản thông minh.</p>

        <div className="flex flex-col gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">person</span>
            <input 
              type="text" 
              placeholder="Số điện thoại / Email" 
              className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] focus:ring-primary focus:border-primary transition-all"
            />
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
            <input 
              type="password" 
              placeholder="Mật khẩu" 
              className="w-full h-14 pl-12 pr-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] focus:ring-primary focus:border-primary transition-all"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <span className="material-symbols-outlined">visibility_off</span>
            </button>
          </div>
          <div className="text-right">
            <button className="text-primary font-bold text-sm">Quên mật khẩu?</button>
          </div>
          <button 
            onClick={() => navigate('/home')}
            className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-blue-600 transition-colors"
          >
            Đăng nhập
          </button>
        </div>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
          <span className="text-xs text-gray-400 font-medium">Hoặc đăng nhập với</span>
          <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="h-12 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center gap-3 font-bold bg-white dark:bg-[#1a2632]">
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
            Google
          </button>
          <button className="h-12 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center gap-3 font-bold bg-white dark:bg-[#1a2632]">
            <span className="material-symbols-outlined">apple</span>
            Apple
          </button>
        </div>

        <div className="mt-auto pt-6 text-center text-xs text-gray-500">
          Bằng việc tiếp tục, bạn đồng ý với <span className="text-primary">Điều khoản</span> và <span className="text-primary">Bảo mật</span>.
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
