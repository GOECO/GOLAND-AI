
import React, { useState } from 'react';
import { PROPERTIES } from '../constants';
import { useNavigate } from 'react-router-dom';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('saved');

  return (
    <div className="relative flex h-full w-full flex-col overflow-x-hidden pb-32 bg-background-light dark:bg-background-dark font-sans transition-colors duration-300">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 flex items-center bg-white dark:bg-background-dark p-4 border-b border-slate-200 dark:border-slate-800 justify-between">
        <div className="w-12"></div>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-slate-900 dark:text-white">Tài khoản</h2>
        <div className="flex w-12 items-center justify-end">
          <button 
            onClick={() => navigate('/advanced-settings')}
            className="flex items-center justify-center rounded-full w-10 h-10 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-slate-900 dark:text-white" style={{ fontSize: '24px' }}>settings</span>
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white dark:bg-background-dark p-6 flex flex-col items-center gap-4">
        <div className="relative">
          <div 
            className="bg-center bg-no-repeat bg-cover rounded-full h-24 w-24 border-2 border-white dark:border-background-dark shadow-lg ring-2 ring-primary/10" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDLBgbQhPkgVQ70sj-6Pj1Gbj5na6bNzBNY8DxooPsvzLHz-cyhDxysTDAomdt-F2CtxzzViy42RpHS9tBaJ4F9P0ABT_ixBzgsroA0hTAOB_AoB5RhG-PdmMrq3Re12L-wk58Ha6MQHjGyBN3rIRYIvzcryRXKszUvS7PtvI-iVOms0LAutQmFAaLpMSzanrDb1Dbi2NExXKbeTn4ZBLIUqv6I0S0hXnSnsRxVWGP-z8e6hwC_EC1bjrHMptwjblRoQICYiFHyJzSR")' }}
          ></div>
          <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1 border-2 border-white dark:border-background-dark">
            <span className="material-symbols-outlined text-white block" style={{ fontSize: '16px' }}>verified</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-2xl font-bold leading-tight text-slate-900 dark:text-white">Alex Nguyen</h1>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-50 to-yellow-100 text-amber-700 dark:from-amber-900/30 dark:to-yellow-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
            <span className="material-symbols-outlined filled" style={{ fontSize: '14px' }}>diamond</span>
            Thành viên Premium
          </span>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-xl h-12 px-4 bg-slate-100 dark:bg-slate-800 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all mt-2 text-slate-700 dark:text-slate-200 active:scale-[0.98]">
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
          <span>Chỉnh sửa hồ sơ</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 px-4 py-6">
        <div className="flex gap-3">
          {[
            { label: 'Đã lưu', val: 12 },
            { label: 'Đã xem', val: 48 },
            { label: 'Đã liên hệ', val: 5 }
          ].map((stat, i) => (
            <div key={i} className="flex flex-1 flex-col gap-1 rounded-2xl bg-background-light dark:bg-surface-dark p-3.5 items-center text-center border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer">
              <p className="text-primary text-2xl font-black leading-tight">{stat.val}</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] font-bold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights Banner */}
      <div className="mx-4 my-2">
        <div className="relative overflow-hidden rounded-2xl border border-blue-100 dark:border-blue-900/50 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-surface-dark p-5 shadow-soft">
          <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-primary text-[80px]">auto_awesome</span>
          </div>
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-primary/10 dark:bg-primary/20 p-1.5 rounded-lg">
                <span className="material-symbols-outlined text-primary text-xl">insights</span>
              </div>
              <p className="text-primary text-xs font-black uppercase tracking-widest">Goland AI Insights</p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">
              Dựa trên tìm kiếm tại <span className="font-bold text-slate-900 dark:text-white">TP. Thủ Đức</span>, giá thị trường khu vực này đã giảm <span className="text-emerald-600 font-bold">2%</span>. Có 3 BĐS mới phù hợp tiêu chí của bạn.
            </p>
            <button className="self-start mt-1 flex items-center justify-center rounded-xl h-10 px-5 bg-primary hover:bg-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all active:scale-95">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[68px] z-40 bg-background-light dark:bg-background-dark px-4 py-3 backdrop-blur-md bg-opacity-95">
        <div className="flex h-12 w-full items-center rounded-2xl bg-white dark:bg-surface-dark p-1.5 shadow-sm border border-slate-100 dark:border-slate-800">
          {[
            { id: 'saved', label: 'Đã lưu' },
            { id: 'history', label: 'Lịch sử' },
            { id: 'ai', label: 'Gợi ý AI', icon: 'smart_toy' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex h-full flex-1 items-center justify-center rounded-xl px-2 text-sm font-black transition-all ${
                activeTab === tab.id 
                ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {tab.icon && <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>}
                <span className="truncate">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Property List */}
      <div className="flex flex-col gap-4 px-4 pb-4 mt-2">
        {PROPERTIES.map((property) => (
          <div 
            key={property.id} 
            onClick={() => navigate(`/property/${property.id}`)}
            className="group flex flex-col sm:flex-row gap-0 sm:gap-4 overflow-hidden rounded-2xl bg-white dark:bg-surface-dark shadow-soft border border-slate-100 dark:border-slate-800 transition-all hover:border-primary/20 cursor-pointer"
          >
            <div className="relative h-48 sm:h-auto sm:w-36 shrink-0 bg-slate-200">
              <div 
                className="bg-center bg-no-repeat bg-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" 
                style={{ backgroundImage: `url(${property.image})` }}
              ></div>
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <div className="bg-white/90 dark:bg-background-dark/90 backdrop-blur rounded-lg px-2 py-1.5 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-red-500 text-[18px] fill-current">favorite</span>
                </div>
                <div 
                  onClick={(e) => { e.stopPropagation(); navigate('/share-preview'); }}
                  className="bg-white/90 dark:bg-background-dark/90 backdrop-blur rounded-lg px-2 py-1.5 flex items-center justify-center shadow-sm hover:text-primary transition-colors active:scale-90"
                >
                  <span className="material-symbols-outlined text-[18px]">ios_share</span>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] filled">auto_awesome</span>
                {property.match || 98}% Match
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between p-4">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">{property.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium line-clamp-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                  {property.location}
                </p>
                <div className="flex gap-4 mt-2 text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-tighter">
                  <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-slate-400">bed</span> {property.beds}</div>
                  <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-slate-400">bathtub</span> {property.baths}</div>
                  <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-slate-400">square_foot</span> {property.area}</div>
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between border-t border-slate-50 dark:border-slate-800 pt-3">
                <p className="text-primary text-xl font-black">{property.price}</p>
                <button className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors flex items-center gap-1">Chi tiết <span className="material-symbols-outlined text-sm">chevron_right</span></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Settings Menu */}
      <div className="px-4 py-4">
        <div className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-soft border border-slate-100 dark:border-slate-800">
          {[
            { label: 'Cài đặt thông báo', icon: 'notifications', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
            { label: 'Quản lý tin đăng', icon: 'real_estate_agent', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
            { label: 'Hỗ trợ & Trợ giúp', icon: 'help', color: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400', isLast: true, route: '/feedback' }
          ].map((item, i) => (
            <button 
              key={i}
              onClick={() => item.route && navigate(item.route)}
              className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left ${!item.isLast ? 'border-b border-slate-50 dark:border-slate-800' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-9 h-9 rounded-xl ${item.color}`}>
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</span>
              </div>
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => navigate('/login')}
          className="w-full mt-6 p-4 rounded-2xl text-red-500 font-black uppercase tracking-widest text-sm bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all shadow-sm active:scale-[0.98]"
        >
          Đăng xuất
        </button>
        
        <div className="flex flex-col items-center mt-10 mb-6 gap-1 opacity-40">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Goland AI v2.0.1</p>
           <p className="text-[9px] font-bold text-slate-400">Powered by Tech Vision</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
