
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSave = () => {
    // Save logic here
    navigate('/user-management');
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-surface-dark font-display transition-colors duration-200">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 flex items-center bg-white dark:bg-surface-dark p-4 border-b border-gray-100 dark:border-gray-800 h-16 shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="material-symbols-outlined text-text-main dark:text-white">arrow_back</span>
        </button>
        <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight text-text-main dark:text-white pr-10">
          {isEdit ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
        </h2>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col pb-32 pt-2">
        {/* Profile Avatar Header */}
        <div className="flex flex-col items-center gap-4 py-6 px-4">
          <div className="relative group cursor-pointer">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full h-28 w-28 border-4 border-white dark:border-gray-800 shadow-soft relative overflow-hidden bg-gray-100 dark:bg-gray-800 ring-2 ring-primary/5" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA85OmB0wEzvD4y9ak5lAkYYuDxUSBgDtwnxNaXKC0sHBEpEfOXcWNEVGKJFFaSL2bMXLNyJJnPYsPluea4H-9WOUSO5QB2Kqjr4z5Os8m5zDTCoj6I5q2Q3JlpMuDyCQsssnKf2gIVuBMLGqOQTtOSk2g019SCU6vLblXSsEr3qhqZ0V08i2dPl0yX76O565-vWDADoAMTuJPBmlszqrRutc0wJnW3zM5Okco3T6xDdbimCNr3i4YNwy1WE7IafyC2GYqnoIYR38CG")' }}
            >
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-white">photo_camera</span>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 bg-primary p-2 rounded-full border-[3px] border-white dark:border-surface-dark flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95">
              <span className="material-symbols-outlined text-white text-[16px] filled">edit</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-text-main dark:text-white text-lg font-black leading-tight uppercase tracking-tight">Ảnh đại diện</p>
            <p className="text-text-sub dark:text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Chạm để tải ảnh lên</p>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5 px-5 w-full">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-text-main dark:text-gray-200 text-sm font-black uppercase tracking-tight ml-1">Tên đầy đủ</label>
            <input 
              className="w-full rounded-2xl text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 h-14 placeholder:text-gray-300 dark:placeholder:text-gray-600 px-5 text-base font-bold transition-all outline-none focus:border-primary shadow-inner" 
              placeholder="Nhập tên đầy đủ" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-text-main dark:text-gray-200 text-sm font-black uppercase tracking-tight ml-1">Email</label>
            <input 
              className="w-full rounded-2xl text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 h-14 placeholder:text-gray-300 dark:placeholder:text-gray-600 px-5 text-base font-bold transition-all outline-none focus:border-primary shadow-inner" 
              placeholder="example@goland.ai" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-text-main dark:text-gray-200 text-sm font-black uppercase tracking-tight ml-1">Số điện thoại</label>
            <input 
              className="w-full rounded-2xl text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 h-14 placeholder:text-gray-300 dark:placeholder:text-gray-600 px-5 text-base font-bold transition-all outline-none focus:border-primary shadow-inner" 
              placeholder="0901234567" 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Password */}
          {!isEdit && (
            <div className="flex flex-col gap-2">
              <label className="text-text-main dark:text-gray-200 text-sm font-black uppercase tracking-tight ml-1">Mật khẩu</label>
              <div className="relative">
                <input 
                  className="w-full rounded-2xl text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 h-14 placeholder:text-gray-300 dark:placeholder:text-gray-600 px-5 pr-12 text-base font-bold transition-all outline-none focus:border-primary shadow-inner" 
                  placeholder="Nhập mật khẩu" 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full w-14 flex items-center justify-center text-text-sub dark:text-gray-500 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              <p className="text-[10px] text-text-sub dark:text-gray-500 pl-1 font-bold uppercase tracking-tighter">Ít nhất 8 ký tự, bao gồm chữ và số.</p>
            </div>
          )}

          <div className="h-px bg-gray-100 dark:bg-gray-800 my-2"></div>

          {/* Role Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-text-main dark:text-gray-200 text-sm font-black uppercase tracking-tight ml-1">Vai trò</label>
            <div className="relative">
              <select 
                className="appearance-none w-full rounded-2xl text-text-main dark:text-white focus:ring-2 focus:ring-primary/20 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 h-14 px-5 pr-12 text-base font-bold transition-all cursor-pointer outline-none focus:border-primary shadow-inner"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option disabled value="">Chọn vai trò</option>
                <option value="admin">Admin hệ thống</option>
                <option value="sale_lead">Trưởng nhóm sale</option>
                <option value="sale">Sale cá nhân</option>
                <option value="collab">Cộng tác viên</option>
                <option value="buyer">Người mua/thuê nhà</option>
                <option value="investor">Nhà đầu tư</option>
                <option value="owner">Chủ dự án</option>
              </select>
              <div className="absolute right-0 top-0 h-full w-12 flex items-center justify-center pointer-events-none text-text-sub dark:text-gray-400">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>

          {/* Status Toggle */}
          <div className="flex items-center justify-between py-4 px-1 rounded-3xl bg-gray-50 dark:bg-gray-800/20 border border-transparent hover:border-gray-100 dark:hover:border-gray-800 transition-all">
            <div className="flex flex-col gap-0.5">
              <span className="text-text-main dark:text-gray-200 text-base font-black uppercase tracking-tight">Trạng thái hoạt động</span>
              <span className="text-text-sub dark:text-gray-500 text-[11px] font-bold uppercase tracking-widest">Bật để kích hoạt tài khoản ngay</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
              />
              <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 p-4 z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
        <div className="flex gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex-1 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 text-text-main dark:text-white font-black uppercase tracking-widest text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95"
          >
            Hủy
          </button>
          <button 
            onClick={handleSave}
            className="flex-[2] h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-xs shadow-glow hover:bg-primary-dark transition-all flex items-center justify-center gap-3 active:scale-95 group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">save</span>
            Lưu thông tin
          </button>
        </div>
        <div className="h-4"></div>
      </footer>
    </div>
  );
};

export default AddUser;
