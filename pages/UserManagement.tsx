
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

  const users: User[] = [
    {
      id: '1',
      name: 'Nguyễn Văn An',
      role: 'Admin hệ thống',
      email: 'an.nguyen@goland.ai',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFmfE7hKGEPmi9h5RLxMy04lNkZbpU3R6X0NwkFUFnLID4dk4IOpULIzbkEHHq_pBN10psWKS9GngOXmtssey2akqrl1q0ZeP4x-RvQqhpT_TuwBSRiq68J0Kq66fcsi9ad0vEqVO6pWRIzB2AJIM3uY_n5DCPcHd3IfNIoE9Mm8pUTixKsujJ6jWKr388TS8GR9-fLb7HOCEqA4jcpYUBnkeepCjW38e1XWYIhS2gDX8H9H27MwChOZWvSl6qsI1qCYGCUSIkYO5d',
      isOnline: true,
      status: 'active',
      roleColor: 'text-primary dark:text-blue-300',
      roleBg: 'bg-blue-50 dark:bg-blue-900/30'
    },
    {
      id: '2',
      name: 'Trần Thị Bích',
      role: 'Trưởng nhóm Sale',
      email: '0912 345 678',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABkvEeUoKuPskK4snVhNHV7qsXeGMUu9DYjJDa1PoYXPyStAtTi_E9sbh7w_pqVtlG--FasrGYvSWewhg_kvsRnjZCVUlKZJi0uYwW0lDQW4Otvh6yD0sIFY-lyTB07J3-qLr529MbBYVCOhHzg0ovhIGl_ELIM3W44-2FXMdkqqwQRIFR-ewy2Ry5qWXS3qNimp7tbTZAIKRYWna5ibbw6gRixBlSnks3gxwbpbViECelIM0a2tzRe0EDN5m9OxW8jyDOW9CjUpog',
      isOnline: true,
      status: 'active',
      roleColor: 'text-purple-700 dark:text-purple-300',
      roleBg: 'bg-purple-50 dark:bg-purple-900/30'
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
      roleColor: 'text-amber-700 dark:text-amber-400',
      roleBg: 'bg-amber-50 dark:bg-amber-900/30'
    },
    {
      id: '4',
      name: 'Phạm Thị Hồng',
      role: 'Sale cá nhân',
      email: '0988 765 432',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfyxnnEVr0Pqx_baEsUyCjTohg-xA6R9pmmapMRV0JaecVERGtu5c5FWua-7BUsP4kjdAlKahwuHuv6xUeB-4zC06_6XwZQi_xOQyHKs2aqmpx8zqj7aSoI0568LxH8S-FgCdwpZaBWKn7yWY0WFu6upZHUTGJ0sSzJB4V_8AQgDUx7XTUNp76GkYvCMCPCf0vG362wK220uq8Ke--L6gkyG7xJavpw1928DONW_BXT-rNLTqZSx2jazD6K3gIxu7Fq1jAAYynvTsL',
      isOnline: false,
      status: 'inactive',
      roleColor: 'text-emerald-700 dark:text-emerald-300',
      roleBg: 'bg-emerald-50 dark:bg-emerald-900/30'
    },
    {
      id: '5',
      name: 'Đoàn Minh Tuấn',
      role: 'Người mua/thuê',
      email: 'tuan.doan@gmail.com',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8_rEluIpZ_Q_9Dtx4Hu2vFYEk2R4pVyBgkU-bcD1vcIBwFQ8R2uXQ7W9i4aevXrGJ3Ie_7Eg3cnBPDbTKIcIsEAfz_iLgo6_YOUk0rXvvKFr7gapy_Pz7DUPYgWLjcWWd7U9UlH51r7l_vM00h6WtlVncz2Fpe0lQ9qTeLIdYdBMOmdY50l2j1jZV1JzcaaceoFJthyp_wsJndyunXBWzDD4JmCelSO4bEBYVbdMUTjsAhzKB2FTSwU-7uJS4iOJgAulSwwaTOL86',
      isOnline: true,
      status: 'active',
      roleColor: 'text-gray-600 dark:text-gray-300',
      roleBg: 'bg-gray-100 dark:bg-gray-700'
    }
  ];

  const roleChips = ['Tất cả', 'Admin hệ thống', 'Trưởng nhóm Sale', 'Sale cá nhân', 'Nhà đầu tư', 'Người mua/thuê'];
  const statusChips = ['Tất cả', 'Hoạt động', 'Tạm dừng'];

  const filteredUsers = users
    .filter(u => activeRoleFilter === 'Tất cả' || u.role === activeRoleFilter)
    .filter(u => {
      if (activeStatusFilter === 'Tất cả') return true;
      if (activeStatusFilter === 'Hoạt động') return u.status === 'active';
      if (activeStatusFilter === 'Tạm dừng') return u.status === 'inactive';
      return true;
    })
    .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display antialiased transition-colors duration-200">
      {/* Top App Bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white dark:bg-surface-dark backdrop-blur-sm p-4 pb-3 border-b border-gray-100 dark:border-gray-800 transition-colors">
        <h2 className="text-text-main dark:text-white text-xl font-bold leading-tight tracking-tight flex-1">Quản lý Người dùng</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-text-main dark:text-white">notifications</span>
          </button>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="sticky top-[60px] z-10 bg-background-light dark:bg-background-dark px-4 py-3 pb-2 transition-colors">
        <div className="flex gap-3 mb-4">
          <div className="flex flex-1 items-center rounded-2xl bg-white dark:bg-surface-dark shadow-soft border border-gray-100 dark:border-gray-800 h-12 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <div className="flex items-center justify-center pl-4 pr-2 text-text-sub dark:text-gray-400">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className="flex w-full flex-1 border-none bg-transparent py-2 px-0 text-base font-medium text-text-main dark:text-white placeholder:text-text-sub/60 focus:ring-0" 
              placeholder="Tìm kiếm tên, email, sđt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-surface-dark shadow-soft border border-gray-100 dark:border-gray-800 text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>

        {/* Role Filters */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            <div className="flex items-center shrink-0 pr-2 border-r border-gray-200 dark:border-gray-700">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Vai trò</span>
            </div>
            {roleChips.map(chip => (
              <button 
                key={chip}
                onClick={() => setActiveRoleFilter(chip)}
                className={`flex h-8 shrink-0 items-center justify-center rounded-full px-4 shadow-sm transition-all active:scale-95 ${
                  activeRoleFilter === chip 
                  ? 'bg-text-main dark:bg-white text-white dark:text-text-main font-bold' 
                  : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-main dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <p className="text-xs">{chip}</p>
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            <div className="flex items-center shrink-0 pr-2 border-r border-gray-200 dark:border-gray-700">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trạng thái</span>
            </div>
            {statusChips.map(chip => (
              <button 
                key={chip}
                onClick={() => setActiveStatusFilter(chip)}
                className={`flex h-8 shrink-0 items-center justify-center rounded-full px-4 shadow-sm transition-all active:scale-95 ${
                  activeStatusFilter === chip 
                  ? 'bg-primary text-white font-bold' 
                  : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-text-main dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <p className="text-xs">{chip}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="flex flex-col gap-3 px-4 pt-2 pb-32">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div 
              key={user.id} 
              onClick={() => navigate(`/edit-user/${user.id}`)}
              className="flex items-center gap-4 rounded-[2rem] bg-white dark:bg-surface-dark p-4 shadow-soft dark:border dark:border-gray-800 transition-all hover:shadow-lg active:scale-[0.99] group border border-transparent cursor-pointer"
            >
              <div className="relative shrink-0">
                <div 
                  className="bg-center bg-no-repeat bg-cover rounded-full h-14 w-14 ring-2 ring-gray-100 dark:ring-gray-700 shadow-sm" 
                  style={{ backgroundImage: `url("${user.img}")` }}
                ></div>
                <div className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-[3px] border-white dark:border-surface-dark shadow-sm ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>
              <div className="flex flex-1 flex-col justify-center min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-text-main dark:text-white text-base font-extrabold truncate">{user.name}</p>
                  {/* Status Badge */}
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter shadow-sm border ${
                    user.status === 'active' 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' 
                    : 'bg-gray-50 text-gray-500 border-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                  }`}>
                    <span className={`size-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                    {user.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className={`inline-flex items-center rounded-lg ${user.roleBg} px-2 py-0.5 text-[10px] font-black uppercase tracking-tight ${user.roleColor} ring-1 ring-inset ring-current/10`}>
                    {user.isVerified && <span className="material-symbols-outlined mr-1 !text-[12px] filled">verified</span>}
                    {user.role}
                  </span>
                </div>
                <p className="text-text-sub dark:text-slate-400 text-sm truncate font-medium">{user.email}</p>
              </div>
              <button className="shrink-0 h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-text-sub dark:text-gray-400 transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-10 text-center opacity-40">
            <span className="material-symbols-outlined text-6xl mb-4">person_search</span>
            <p className="text-sm font-bold uppercase tracking-widest">Không tìm thấy người dùng phù hợp</p>
          </div>
        )}
      </div>

      {/* FAB */}
      <button 
        onClick={() => navigate('/add-user')}
        className="fixed bottom-28 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-glow hover:bg-primary-dark transition-all active:scale-90 group"
      >
        <span className="material-symbols-outlined text-[28px] group-hover:rotate-90 transition-transform duration-300">add</span>
      </button>

      {/* Bottom Navigation for Admin/Management context */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-[84px] w-full items-start justify-around bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 pt-3 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.03)] backdrop-blur-lg">
        <button 
          onClick={() => navigate('/home')}
          className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity w-16"
        >
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-[10px] font-bold">Tổng quan</span>
        </button>
        <button className="flex flex-col items-center gap-1 w-16 text-primary">
          <div className="rounded-full bg-primary/10 px-4 py-1 flex items-center justify-center">
            <span className="material-symbols-outlined filled">group</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter">Người dùng</span>
        </button>
        <button 
          onClick={() => navigate('/saved')}
          className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity w-16"
        >
          <span className="material-symbols-outlined">apartment</span>
          <span className="text-[10px] font-bold">Dự án</span>
        </button>
        <button 
          onClick={() => navigate('/advanced-settings')}
          className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity w-16"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold">Cài đặt</span>
        </button>
      </nav>
    </div>
  );
};

export default UserManagement;
