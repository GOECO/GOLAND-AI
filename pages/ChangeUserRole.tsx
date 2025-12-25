
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface RoleOption {
  id: string;
  name: string;
  description: string;
}

const ChangeUserRole: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [selectedRoleId, setSelectedRoleId] = useState('sale');

  const roles: RoleOption[] = [
    { id: 'admin', name: 'Admin hệ thống', description: 'Quyền cao nhất. Quản lý toàn bộ hệ thống, cấu hình và người dùng.' },
    { id: 'sale_lead', name: 'Trưởng nhóm sale', description: 'Quản lý đội nhóm sales, phân quyền nhân viên và xem báo cáo tổng hợp.' },
    { id: 'sale', name: 'Sale cá nhân', description: 'Truy cập CRM, quản lý khách hàng cá nhân và tạo giao dịch.' },
    { id: 'owner', name: 'Chủ dự án', description: 'Đăng tải dự án mới, cập nhật bảng hàng và chính sách bán hàng.' },
    { id: 'investor', name: 'Nhà đầu tư', description: 'Xem bản đồ quy hoạch, phân tích thị trường và gợi ý đầu tư từ AI.' },
    { id: 'collab', name: 'Cộng tác viên', description: 'Giới thiệu khách hàng, theo dõi hoa hồng và trạng thái giới thiệu.' },
    { id: 'buyer', name: 'Người mua/thuê nhà', description: 'Tìm kiếm bất động sản, lưu tin quan tâm và liên hệ môi giới.' },
  ];

  const handleConfirm = () => {
    // Simulated update logic
    console.log(`Updating user ${id} to role: ${selectedRoleId}`);
    navigate(-1);
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-white dark:bg-[#111418] font-display transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center bg-white dark:bg-[#111418] p-4 border-b border-gray-100 dark:border-gray-800 h-16 shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="material-symbols-outlined text-text-main dark:text-white" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-black leading-tight tracking-tight text-text-main dark:text-white pr-10 uppercase tracking-tighter">
          Thay đổi Vai trò
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        {/* User Summary */}
        <div className="p-4">
          <div className="flex items-center gap-4 bg-background-light dark:bg-gray-800/40 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-inner">
            <div className="relative shrink-0">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full h-14 w-14 border-2 border-white dark:border-gray-700 shadow-soft" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDpdcCEFkvhMCgywngUblgyejOh98EqlxoEcelUVxgkbm0MebffRG_HoIYHmjhZlVW4QPIALnCr8fZcNSsiJzeOoHxqnRqAW1TmWwJbt-O7-mxt-nj-qNa7zRwnRFlRh0xLua5qhlovmshHd9JbA9GDIZ0mTWAVJwQZxx33T56HHijn7loy7pFP4UWpghojsCa0KRoav5i7fpakamHIhycaFt5K3OdNXoiL1qC6gDp45xCUw6mnmx5TGzfo9vXeixbcZJuu-z4H6G_B")' }}
              ></div>
              <span className="absolute bottom-0 right-0 size-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full shadow-sm"></span>
            </div>
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <h2 className="text-[#111418] dark:text-white text-base font-black leading-normal truncate uppercase tracking-tight">Nguyễn Văn A</h2>
              <p className="text-text-sub dark:text-gray-400 text-sm font-medium leading-normal truncate">anv@goland.ai</p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Hiện tại:</span>
                <span className="inline-flex items-center rounded-lg bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 text-[10px] font-black uppercase text-primary dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 tracking-widest">
                  Sale cá nhân
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-2 bg-background-light dark:bg-black/20"></div>

        {/* Role Selection */}
        <div className="px-5 pt-7 pb-2">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px] filled">admin_panel_settings</span>
            </div>
            <h3 className="text-[#111418] dark:text-white text-lg font-black leading-tight uppercase tracking-tight">
              Chọn vai trò mới
            </h3>
          </div>

          <div className="flex flex-col gap-3.5">
            {roles.map((role) => (
              <label 
                key={role.id} 
                onClick={() => setSelectedRoleId(role.id)}
                className={`group relative cursor-pointer flex items-start gap-4 rounded-3xl border-2 p-5 transition-all duration-300 shadow-sm ${
                  selectedRoleId === role.id 
                  ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-glow' 
                  : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 bg-white dark:bg-surface-dark'
                }`}
              >
                <div className={`mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  selectedRoleId === role.id ? 'border-primary bg-primary' : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {selectedRoleId === role.id && <div className="size-2 rounded-full bg-white animate-in zoom-in duration-200"></div>}
                </div>
                <div className="flex grow flex-col gap-1">
                  <p className={`text-base font-black leading-normal uppercase tracking-tight ${
                    selectedRoleId === role.id ? 'text-primary' : 'text-text-main dark:text-white'
                  }`}>
                    {role.name}
                  </p>
                  <p className={`text-xs leading-relaxed font-medium ${
                    selectedRoleId === role.id ? 'text-text-main/70 dark:text-gray-300' : 'text-text-sub dark:text-gray-400'
                  }`}>
                    {role.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="h-10"></div>
      </main>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#111418]/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-5 pb-8 z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] max-w-[480px] mx-auto">
        <div className="flex gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex-1 h-14 rounded-[20px] bg-gray-100 dark:bg-gray-800 text-text-main dark:text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95"
          >
            Hủy
          </button>
          <button 
            onClick={handleConfirm}
            className="flex-[2] h-14 rounded-[20px] bg-primary text-white font-black uppercase tracking-[0.2em] text-xs shadow-glow hover:bg-primary-dark transition-all flex items-center justify-center gap-3 active:scale-95 group"
          >
            <span className="truncate">Xác nhận Thay đổi</span>
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">check_circle</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChangeUserRole;
