
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  img: string;
  isOnline: boolean;
  isVerified?: boolean;
  status: 'active' | 'inactive';
  roleColor: string;
  roleBg: string;
}

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRoleFilter, setActiveRoleFilter] = useState('Tất cả');
  const [activeStatusFilter, setActiveStatusFilter] = useState('Tất cả');
  const [sortByStatus, setSortByStatus] = useState(false);

  const users: User[] = [
    {
      id: '1',
      name: 'Nguyễn Văn An',
      role: 'Admin hệ thống',
      email: 'an.nguyen@goland.ai',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFmfE7hKGEPmi9h5RLxMy04lNkZbpU3R6X0NwkFUFnLID4dk4IOpULIzbkEHHq_pBN10psWKS9GngOXmtssey2akqrl1q0ZeP4x-RvQqhpT_TuwBSRiq68J0Kq66fcsi9ad0vEqVO6pWRIzB2AJIM3uY_n5DCPcHd3IfNIoE9Mm8pUTixKsujJ6jWKr388TS8GR9-fLb7HOCEqA4jcpYUBnkeepCjW38e1XWYIhS2gDX8H9H27MwChOZWvSl6qsI1qCYGCUSIkYO5d',
      isOnline: true,
      status: 'active',
      roleColor: 'text-blue-400',
      roleBg: 'bg-blue-500/10'
    },
    {
      id: '2',
      name: 'Trần Thị Bích',
      role: 'Trưởng nhóm Sale',
      email: '0912 345 678',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABkvEeUoKuPskK4snVhNHV7qsXeGMUu9DYjJDa1PoYXPyStAtTi_E9sbh7w_pqVtlG--FasrGYvSWewhg_kvsRnjZCVUlKZJi0uYwW0lDQW4Otvh6yD0sIFY-lyTB07J3-qLr529MbBYVCOhHzg0ovhIGl_ELIM3W44-2FXMdkqqwQRIFR-ewy2Ry5qWXS3qNimp7tbTZAIKRYWna5ibbw6gRixBlSnks3gxwbpbViECelIM0a2tzRe0EDN5m9OxW8jyDOW9CjUpog',
      isOnline: true,
      status: 'active',
      roleColor: 'text-purple-400',
      roleBg: 'bg-purple-500/10'
    },
    {
      id: '3',
      name: 'Lê Văn Thành',
      role: 'Nhà đầu tư',
      email: 'thanh.le@invest.com',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuy4QbJKjoNbRdDi57WN_Wit7kuEkkjVeJmMLFL7fzcD8p6qxJPJt6-ZHplEG7SqsCcPTYZayGx50UULZa_6QiYJ_bZKZB4HbbmVjIdYZtlq_3ac6em3lexQuiQiadDlkjETXmooHfZRwa18P17V1GZrFemO8_qFTWOL2LXsT8rbMpDO2FESr_Y7n03YXMEqvgi3-89cPjeGQ25BsQ7R6q90YL5ajetEvygtAUQ_L6i0MHVJu505ZICV84tEe37kQzBwvbnwMx0cDH',
      isOnline: true,
      isVerified: true,
      status: 'active',
      roleColor: 'text-amber-400',
      roleBg: 'bg-amber-500/10'
    },
    {
      id: '4',
      name: 'Phạm Thị Hồng',
      role: 'Sale cá nhân',
      email: '0988 765 432',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfyxnnEVr0Pqx_baEsUyCjTohg-xA6R9pmmapMRV0JaecVERGtu5c5FWua-7BUsP4kjdAlKahwuHuv6xUeB-4zC06_6XwZQi_xOQyHKs2aqmpx8zqj7aSoI0568LxH8S-FgCdwpZaBWKn7yWY0WFu6upZHUTGJ0sSzJB4V_8AQgDUx7XTUNp76GkYvCMCPCf0vG362wK220uq8Ke--L6gkyG7xJavpw1928DONW_BXT-rNLTqZSx2jazD6K3gIxu7Fq1jAAYynvTsL',
      isOnline: false,
      status: 'inactive',
      roleColor: 'text-emerald-400',
      roleBg: 'bg-emerald-500/10'
    },
    {
      id: '5',
      name: 'Đoàn Minh Tuấn',
      role: 'Người mua/thuê',
      email: 'tuan.doan@gmail.com',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8_rEluIpZ_Q_9Dtx4Hu2vFYEk2R4pVyBgkU-bcD1vcIBwFQ8R2uXQ7W9i4aevXrGJ3Ie_7Eg3cnBPDbTKIcIsEAfz_iLgo6_YOUk0rXvvKFr7gapy_Pz7DUPYgWLjcWWd7U9UlH51r7l_vM00h6WtlVncz2Fpe0lQ9qTeLIdYdBMOmdY50l2j1jZV1JzcaaceoFJthyp_wsJndyunXBWzDD4JmCelSO4bEBYVbdMUTjsAhzKB2FTSwU-7uJS4iOJgAulSwwaTOL86',
      isOnline: true,
      status: 'active',
      roleColor: 'text-slate-400',
      roleBg: 'bg-slate-800'
    }
  ];

  const roleChips = ['Tất cả', 'Admin hệ thống', 'Trưởng nhóm Sale', 'Sale cá nhân', 'Nhà đầu tư', 'Người mua/thuê'];
  
  const counts = {
    all: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length
  };

  const statusOptions = [
    { label: 'Tất cả', value: 'Tất cả', count: counts.all, icon: 'group' },
    { label: 'Hoạt động', value: 'active', count: counts.active, icon: 'check_circle' },
    { label: 'Tạm dừng', value: 'inactive', count: counts.inactive, icon: 'cancel' }
  ];

  let filteredUsers = users
    .filter(u => activeRoleFilter === 'Tất cả' || u.role === activeRoleFilter)
    .filter(u => {
      if (activeStatusFilter === 'Tất cả') return true;
      return u.status === activeStatusFilter;
    })
    .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()));

  if (sortByStatus) {
    filteredUsers = [...filteredUsers].sort((a, b) => {
      if (a.status === 'active' && b.status === 'inactive') return -1;
      if (a.status === 'inactive' && b.status === 'active') return 1;
      return 0;
    });
  }

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-dark font-sans antialiased selection:bg-primary/30 transition-colors duration-500 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Premium Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-background-dark/80 backdrop-blur-2xl p-5 pb-4 border-b border-white/5 shadow-2xl">
        <div className="flex flex-col">
          <h2 className="text-white text-2xl font-black leading-none tracking-tighter uppercase font-display italic group cursor-default">
            Nhân <span className="text-primary group-hover:animate-pulse">Sự</span>
          </h2>
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em]">{filteredUsers.length} người dùng trực tuyến</p>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button 
            onClick={() => setSortByStatus(!sortByStatus)}
            className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all shadow-xl border active:scale-90 ${
              sortByStatus 
              ? 'bg-primary/20 text-primary border-primary/30 shadow-primary/10' 
              : 'bg-surface-dark text-slate-400 border-white/5'
            }`}
            title="Sắp xếp"
          >
            <span className={`material-symbols-outlined text-[22px] ${sortByStatus ? 'filled' : ''}`}>swap_vert</span>
          </button>
          <button 
            onClick={() => navigate('/add-user')}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-glow hover:bg-primary-dark active:scale-95 transition-all border border-white/10"
          >
            <span className="material-symbols-outlined text-[24px]">person_add</span>
          </button>
        </div>
      </header>

      {/* Persistent Filters & Search */}
      <div className="sticky top-[73px] z-40 bg-background-dark/95 backdrop-blur-xl px-5 py-6 pb-4 border-b border-white/5">
        {/* Modern Search */}
        <div className="relative mb-6 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-500 group-focus-within:text-primary transition-colors text-[22px]">search</span>
          </div>
          <input 
            className="w-full pl-12 pr-4 py-4 rounded-[20px] bg-slate-900/40 border border-white/10 text-white placeholder:text-slate-600 font-bold focus:ring-2 focus:ring-primary/20 focus:bg-slate-900/60 outline-none transition-all shadow-inner" 
            placeholder="Tìm kiếm theo tên, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Tabs */}
        <div className="flex gap-3 p-1.5 bg-slate-950/40 rounded-[22px] border border-white/5 mb-5">
          {statusOptions.map((opt) => (
            <button 
              key={opt.value}
              onClick={() => setActiveStatusFilter(opt.value)}
              className={`flex-1 flex flex-col items-center justify-center py-3 rounded-[18px] transition-all relative overflow-hidden ${
                activeStatusFilter === opt.value 
                ? 'bg-surface-dark shadow-2xl border border-white/10' 
                : 'text-slate-500 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                 <span className={`material-symbols-outlined text-[14px] ${
                   activeStatusFilter === opt.value ? 'text-primary' : 'text-slate-700'
                 }`}>
                   {opt.icon}
                 </span>
                 <span className={`text-[10px] font-black uppercase tracking-widest ${
                   activeStatusFilter === opt.value ? 'text-white' : 'text-slate-500'
                 }`}>
                   {opt.label}
                 </span>
              </div>
              <span className={`text-lg font-black tracking-tighter ${
                activeStatusFilter === opt.value ? 'text-primary' : 'opacity-40'
              }`}>
                {opt.count}
              </span>
              {activeStatusFilter === opt.value && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full shadow-glow"></div>
              )}
            </button>
          ))}
        </div>

        {/* Horizontal Role Scroller */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {roleChips.map(chip => (
            <button 
              key={chip}
              onClick={() => setActiveRoleFilter(chip)}
              className={`flex h-9 shrink-0 items-center justify-center rounded-xl px-5 text-[11px] font-black uppercase tracking-widest transition-all border ${
                activeRoleFilter === chip 
                ? 'bg-primary text-white border-transparent shadow-glow scale-105' 
                : 'bg-surface-dark text-slate-500 border-white/5 hover:border-white/10 hover:text-slate-300'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* User Table (Rows) */}
      <div className="flex flex-col flex-1 px-5 pt-6 pb-32 gap-4 relative z-10">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div 
              key={user.id} 
              onClick={() => navigate(`/edit-user/${user.id}`)}
              className="flex items-center gap-4 rounded-[28px] bg-gradient-to-br from-surface-dark to-slate-900/60 p-4 border border-white/5 transition-all hover:border-primary/30 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.98] cursor-pointer group animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Avatar Section */}
              <div className="relative shrink-0">
                <div 
                  className="bg-center bg-no-repeat bg-cover rounded-2xl h-16 w-16 shadow-2xl ring-2 ring-white/5 border border-white/10 transition-transform group-hover:scale-105" 
                  style={{ backgroundImage: `url("${user.img}")` }}
                ></div>
                <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-[3px] border-background-dark shadow-xl flex items-center justify-center ${user.isOnline ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                  {user.isOnline && <div className="size-1.5 bg-white rounded-full animate-ping opacity-75"></div>}
                </div>
              </div>

              {/* Info Section */}
              <div className="flex flex-1 flex-col min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 truncate">
                    <p className="text-white text-[17px] font-black truncate tracking-tight uppercase group-hover:text-primary transition-colors">{user.name}</p>
                    {user.isVerified && <span className="material-symbols-outlined text-[18px] text-blue-400 filled shrink-0" title="Đã xác thực">verified</span>}
                  </div>
                  
                  {/* Modern Status Badge */}
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full shrink-0 border ${
                    user.status === 'active' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-slate-800 text-slate-500 border-white/10'
                  }`}>
                     <span className={`size-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500 shadow-glow' : 'bg-slate-600'}`}></span>
                     <span className="text-[9px] font-black uppercase tracking-widest leading-none">
                       {user.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                     </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${user.roleBg} ${user.roleColor} border border-white/5`}>
                    {user.role}
                  </span>
                  <p className="text-slate-500 text-xs font-bold truncate tracking-tight">{user.email}</p>
                </div>
              </div>

              {/* Action Column */}
              <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-2xl bg-white/5 group-hover:bg-primary/20 transition-all text-slate-700 group-hover:text-primary group-hover:rotate-6">
                <span className="material-symbols-outlined font-black">chevron_right</span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-10 text-center animate-in fade-in zoom-in duration-700">
            <div className="size-28 rounded-[32px] bg-surface-dark flex items-center justify-center mb-8 shadow-2xl border border-white/5 transform -rotate-6">
              <span className="material-symbols-outlined text-5xl text-slate-700">group_off</span>
            </div>
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-xl mb-3">Dữ liệu trống</h3>
            <p className="text-sm font-medium text-slate-500 px-4 leading-relaxed">Không có nhân sự nào phù hợp với các tiêu chí bộ lọc hiện tại.</p>
            <button 
              onClick={() => { setActiveRoleFilter('Tất cả'); setActiveStatusFilter('Tất cả'); setSearchQuery(''); setSortByStatus(false); }}
              className="mt-10 px-10 py-4 rounded-[22px] bg-primary text-white font-black uppercase tracking-widest text-xs shadow-glow hover:brightness-110 active:scale-95 transition-all border border-white/10"
            >
              Thiết lập lại
            </button>
          </div>
        )}
      </div>

      {/* Custom Dark Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[90px] w-full items-start justify-around bg-background-dark/95 backdrop-blur-2xl border-t border-white/5 pt-4 pb-safe shadow-2xl">
        <button 
          onClick={() => navigate('/home')}
          className="flex flex-col items-center gap-1.5 opacity-40 hover:opacity-100 transition-all group w-16"
        >
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">grid_view</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Bảng tin</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 w-16 text-primary scale-110">
          <div className="relative">
            <span className="material-symbols-outlined filled">group</span>
            <div className="absolute -top-1 -right-1 size-2 bg-primary rounded-full shadow-glow animate-pulse"></div>
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.15em]">Nhân sự</span>
        </button>
        <button 
          onClick={() => navigate('/saved')}
          className="flex flex-col items-center gap-1.5 opacity-40 hover:opacity-100 transition-all group w-16"
        >
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">bookmark_manager</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Dự án</span>
        </button>
        <button 
          onClick={() => navigate('/profile')}
          className="flex flex-col items-center gap-1.5 opacity-40 hover:opacity-100 transition-all group w-16"
        >
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">account_circle</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Tôi</span>
        </button>
      </nav>
    </div>
  );
};

export default UserManagement;
