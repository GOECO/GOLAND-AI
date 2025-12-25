
import React from 'react';
import { PROPERTIES } from '../constants';
import { useNavigate } from 'react-router-dom';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-32 bg-background-light dark:bg-background-dark min-h-screen relative font-sans antialiased transition-colors duration-300">
      {/* Premium Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 transition-all">
        <div className="flex items-center justify-between px-5 h-16">
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => navigate('/profile')}>
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-2xl size-10 border-2 border-white dark:border-gray-800 shadow-soft group-hover:scale-105 transition-transform" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAMuxuegQ0ihDFNJdD8bJTGo-2732MKenNVlxGrxuzUPnwzuJtltxLGxYThEarcPRCB20M3z4xwB4FodBWrPBKcFlQ4GwhCr_-_yqPjlHGkibDw9EP1aXl8xiUrGTmbtLH9FpNynRxDCKaSliOzfqmVREkRmGTBHZ46KtJwvZ3YQqimoD-EL0CrDh5wlqzv_FuALQh3LzABV5YPvpqC7vgEtVYcjVj6an99jTHNFP7vMuLZWxr1u22B0ry8F9sX1KhngpxHXEcZjN8J")' }}
              ></div>
              <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-sm"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-sub dark:text-gray-500 leading-none">Xin chào</span>
              <h2 className="text-[15px] font-black text-text-main dark:text-white leading-tight mt-0.5 font-display uppercase tracking-tight">Alex Nguyen 👋</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/inbox')}
              className="relative flex items-center justify-center size-10 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="material-symbols-outlined text-text-main dark:text-white" style={{ fontSize: '22px' }}>notifications</span>
              <span className="absolute top-2.5 right-2.5 size-1.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800"></span>
            </button>
            <button 
              onClick={() => navigate('/chat-history')}
              className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <span className="material-symbols-outlined filled" style={{ fontSize: '22px' }}>history</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-col">
        {/* Search Hero Area */}
        <div className="px-5 pt-8 pb-4 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 size-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 size-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          
          <h1 className="text-3xl font-black text-text-main dark:text-white leading-[1.1] mb-6 font-display uppercase tracking-tighter max-w-[300px]">
            Tìm kiếm bằng <span className="text-primary">Trí tuệ Nhân tạo</span>
          </h1>

          <div 
            onClick={() => navigate('/chat')}
            className="group relative flex w-full items-center rounded-3xl bg-white dark:bg-gray-800 shadow-soft border border-blue-50 dark:border-gray-700 p-1.5 transition-all hover:border-primary/50 cursor-pointer"
          >
            <div className="flex items-center justify-center size-12 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform shrink-0">
              <span className="material-symbols-outlined filled" style={{ fontSize: '26px' }}>smart_toy</span> 
            </div>
            <div className="flex flex-col flex-1 px-4 min-w-0">
              <span className="text-gray-400 dark:text-gray-500 text-sm font-bold truncate">Hỏi Goland AI về bất động sản...</span>
            </div>
            <div className="flex items-center gap-1 pr-1.5">
              <div className="size-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-400 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>mic</span>
              </div>
            </div>
          </div>

          {/* Quick Stats / Market Pulse */}
          <div className="mt-8 grid grid-cols-2 gap-3">
             <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black uppercase tracking-widest text-text-sub dark:text-gray-500">Giá TT Trung bình</span>
                   <span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>
                </div>
                <div className="flex items-baseline gap-1">
                   <span className="text-xl font-black text-text-main dark:text-white">125M</span>
                   <span className="text-[10px] text-gray-400">/ m²</span>
                </div>
                <p className="text-[10px] text-green-600 font-bold bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full w-fit mt-1">+2.4% tháng qua</p>
             </div>
             <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-black uppercase tracking-widest text-text-sub dark:text-gray-500">Tin đăng mới</span>
                   <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                </div>
                <div className="flex items-baseline gap-1">
                   <span className="text-xl font-black text-text-main dark:text-white">1,402</span>
                </div>
                <p className="text-[10px] text-primary font-bold bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full w-fit mt-1">Cập nhật 5p trước</p>
             </div>
          </div>
        </div>

        {/* AI Picks Carousel */}
        <div className="mt-4">
          <div className="flex items-center justify-between px-5 mb-5">
            <div className="flex flex-col">
               <h2 className="text-xl font-black tracking-tight text-text-main dark:text-white font-display uppercase italic">Đề xuất bởi AI</h2>
               <p className="text-xs text-text-sub font-bold uppercase tracking-widest">Dựa trên sở thích của bạn</p>
            </div>
            <button className="size-10 flex items-center justify-center rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          
          <div className="flex overflow-x-auto no-scrollbar px-5 pb-8 gap-5 snap-x">
            {PROPERTIES.map((property) => (
              <div 
                key={property.id} 
                onClick={() => navigate(`/property/${property.id}`)}
                className="flex flex-col min-w-[300px] snap-center bg-white dark:bg-gray-800 rounded-3xl shadow-soft border border-gray-100 dark:border-gray-700 group cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
                  <div 
                    className="absolute inset-0 bg-center bg-cover transition-transform duration-1000 group-hover:scale-110" 
                    style={{ backgroundImage: `url(${property.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-primary/10">
                    <span className="material-symbols-outlined filled" style={{ fontSize: '14px' }}>auto_awesome</span>
                    {property.match || 98}% Match
                  </div>
                  
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate('/share-preview'); }}
                      className="size-8 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-primary transition-colors shadow-lg active:scale-90"
                    >
                      <span className="material-symbols-outlined text-[18px]">share</span>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); }}
                      className="size-8 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-red-500 transition-colors shadow-lg active:scale-90"
                    >
                      <span className="material-symbols-outlined text-[18px]">favorite</span>
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                    <div className="flex flex-col gap-0.5">
                       <span className="text-[10px] font-black text-white/70 uppercase tracking-tighter">Giá tổng cộng</span>
                       <span className="text-xl font-black text-white tracking-tight leading-none font-display">{property.price}</span>
                    </div>
                    <div className="bg-primary px-3 py-1.5 rounded-xl shadow-lg border border-white/10">
                       <span className="text-[10px] font-black text-white uppercase tracking-widest">Xem Ngay</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-black text-text-main dark:text-white truncate font-display uppercase tracking-tight">{property.name}</h3>
                  <div className="flex items-center text-text-sub dark:text-gray-400 text-[13px] mt-1 gap-1.5 font-bold">
                    <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                    <span className="truncate">{property.location}</span>
                  </div>
                  <div className="mt-5 flex gap-4 border-t border-gray-50 dark:border-gray-700 pt-4">
                    <div className="flex flex-col gap-0.5">
                       <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Diện tích</span>
                       <span className="text-sm font-black text-text-main dark:text-white uppercase">{property.area}</span>
                    </div>
                    <div className="w-px h-6 bg-gray-100 dark:bg-gray-700 self-center"></div>
                    <div className="flex flex-col gap-0.5">
                       <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Phòng ngủ</span>
                       <span className="text-sm font-black text-text-main dark:text-white uppercase">{property.beds} PN</span>
                    </div>
                    <div className="w-px h-6 bg-gray-100 dark:bg-gray-700 self-center"></div>
                    <div className="flex flex-col gap-0.5">
                       <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Vị trí</span>
                       <span className="text-sm font-black text-text-main dark:text-white uppercase">Tây Nam</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modules Explore Grid */}
        <div className="px-5 mt-4">
          <h2 className="text-xl font-black tracking-tight text-text-main dark:text-white mb-5 font-display uppercase italic">Khám phá Tiện ích</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Bản đồ số', desc: 'Quy hoạch & Giá', icon: 'map', color: 'text-primary', bg: 'bg-blue-50 dark:bg-blue-900/20', path: '/map' },
              { title: 'Trợ lý 24/7', desc: 'Tư vấn chuyên sâu', icon: 'chat_spark', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', path: '/chat', isSpecial: true },
              { title: 'Định giá AI', desc: 'Thị trường thực tế', icon: 'analytics', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', path: '/market-report' },
              { title: 'Pháp lý', desc: 'Check sổ & Thuế', icon: 'gavel', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20', path: '#' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => item.path !== '#' && navigate(item.path)}
                className={`flex flex-col p-5 rounded-[2rem] border border-gray-100 dark:border-gray-700 active:scale-[0.98] transition-all cursor-pointer group shadow-sm hover:shadow-md hover:border-primary/20 ${item.isSpecial ? 'bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-gray-800' : 'bg-white dark:bg-gray-800'}`}
              >
                <div className={`size-12 rounded-2xl ${item.bg} flex items-center justify-center mb-4 ${item.color} group-hover:scale-110 transition-transform shadow-sm`}>
                  <span className="material-symbols-outlined text-[26px]">{item.icon}</span>
                </div>
                <span className="text-[15px] font-black text-text-main dark:text-white uppercase tracking-tight">{item.title}</span>
                <span className="text-[11px] text-text-sub dark:text-gray-400 mt-1 font-bold">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Spotlight */}
        <div className="px-5 mt-10 mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col">
               <h2 className="text-xl font-black tracking-tight text-text-main dark:text-white font-display uppercase italic">Tiêu điểm đầu tư</h2>
               <p className="text-xs text-text-sub font-bold uppercase tracking-widest">Dữ liệu thị trường độc quyền</p>
            </div>
            <button className="text-primary text-sm font-black uppercase tracking-widest hover:underline">Chi tiết</button>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { 
                name: 'The Global City', 
                sub: 'Thành phố thông minh • TP. Thủ Đức', 
                roi: '+12%', 
                roiLabel: 'Dự báo ROI',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAevM95SdyvjXxQdgcG5lMWg715hvGGPnQ4bmuxFlSVpuCDNWki5DrknLsttPWa_DQi-bU2kR4Scggp3WyZPOFLMyuWZlq_YPmpyHEnTEPNwGqjtUcdRe3UXhqciL4YRrXNDdI_PBOmSQjFAHwb8q27v_PP54pt6gYF2FOAG7PJPG2yibd7-85YE7-g9lMv_7AahfQ6KarSIPcr0RocrUN0kEe4KFr1JcTgkM3kV3PAobuYsDqHbV2-cBO20Zw1e2CmRB5I20QPwjrU' 
              },
              { 
                name: 'Eco Green Saigon', 
                sub: 'Dưới giá thị trường • Quận 7', 
                roi: '+8.5%', 
                roiLabel: 'Lợi nhuận thuê',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGn3Fz4ZHiBNVI8fTZxhkwBcggq8UBUTZRFFuUuap1bJXcjCviMBP0Im340472p1M8od5HBDhzar_rSx2h-r7Ig7xtCxOXlN3KivbawjJwRArveSxuQJC5vgXqFVB4NYSjF1tZtQ1yr9U9BGnyv75oqVsdZPsfr38D2ZoKeGt6AFmmwF2LVp5F5bhw7fW7H7cpvX00HsvvvlwQ67mzfn35KxJoznyxOxf0D4iJW9MhMhp1NtrP8WtgD1H_VP8a2yxd0-goje_BEhHb' 
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate('/summary')}
                className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-[2rem] shadow-soft border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div 
                  className="size-16 rounded-2xl bg-cover bg-center shrink-0 transition-transform group-hover:scale-110 shadow-lg border border-white/20" 
                  style={{ backgroundImage: `url("${item.img}")` }}
                ></div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-black text-text-main dark:text-white truncate font-display uppercase tracking-tight">{item.name}</h4>
                  <p className="text-[11px] text-text-sub dark:text-gray-400 font-bold uppercase tracking-tight truncate">{item.sub}</p>
                </div>
                <div className="text-right pr-1 shrink-0">
                  <div className="flex items-center justify-end gap-1 text-green-600 dark:text-green-400">
                    <span className="material-symbols-outlined filled" style={{ fontSize: '16px' }}>trending_up</span>
                    <p className="text-base font-black tracking-tight">{item.roi}</p>
                  </div>
                  <p className="text-[9px] text-gray-400 uppercase font-black tracking-tighter leading-none mt-0.5">{item.roiLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community / Feed Hint */}
        <div className="px-5 mb-12">
           <div className="rounded-[2.5rem] bg-slate-900 dark:bg-primary/20 p-8 flex flex-col items-center text-center gap-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="size-16 rounded-full bg-primary flex items-center justify-center text-white shadow-glow relative z-10">
                 <span className="material-symbols-outlined text-3xl filled">forum</span>
              </div>
              <div className="relative z-10">
                 <h3 className="text-white text-xl font-black font-display uppercase tracking-tight mb-2">Thảo luận cùng chuyên gia</h3>
                 <p className="text-white/60 text-sm font-medium px-4">Tham gia cộng đồng Goland AI để nhận tin tức thị trường nhanh nhất.</p>
              </div>
              <button className="relative z-10 px-8 py-3 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">
                 Tham gia ngay
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
