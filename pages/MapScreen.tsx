
import React, { useState } from 'react';
import { PROPERTIES } from '../constants';
import { useNavigate } from 'react-router-dom';

const MapScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState(PROPERTIES[0]);

  return (
    <div className="bg-background-light dark:bg-background-dark font-body text-[#1e293b] dark:text-white overflow-hidden h-screen flex flex-col relative max-w-[480px] mx-auto shadow-2xl">
      
      {/* Top Search & Filter Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-12 pb-4 pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-3">
          {/* Search Bar */}
          <div className="shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-xl bg-white dark:bg-[#1e2936] flex items-center h-12 w-full px-1 border border-gray-100 dark:border-gray-800">
            <button className="flex items-center justify-center w-10 h-full text-[#64748b] dark:text-gray-400">
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <input 
              className="flex-1 bg-transparent border-none focus:ring-0 text-[#0f172a] dark:text-white placeholder:text-[#94a3b8] h-full text-[15px] font-normal px-2" 
              placeholder="Tìm địa điểm, dự án..." 
            />
            <button className="flex items-center justify-center w-10 h-full text-primary">
              <span className="material-symbols-outlined text-[24px]">mic</span>
            </button>
            <button className="flex items-center justify-center w-10 h-full text-white bg-primary rounded-lg m-1 shadow-sm hover:bg-blue-600 transition-colors">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-white pl-4 pr-3 shadow-md border border-transparent transition-transform active:scale-95">
              <p className="text-sm font-medium leading-normal">Mua bán</p>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            {[
              { label: 'Mức giá' },
              { label: 'Loại nhà đất' },
              { label: 'Diện tích' }
            ].map((filter, i) => (
              <button 
                key={i} 
                className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-[#1e2936] text-[#334155] dark:text-white pl-4 pr-3 shadow-sm border border-gray-200 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95"
              >
                <p className="text-sm font-medium leading-normal">{filter.label}</p>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Content Simulator */}
      <div className="relative flex-1 w-full h-full bg-[#e5e7eb] overflow-hidden">
        {/* Background Map Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-110" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDu5aTHCHED_H0txDIYAyoCd1Wc9_Jb0H3ncltl7JDKlsQJEig9Joqm_E4UcPO8KJ21C29A7UdVtFq7KQN3GOe4K9MFWHt-6HqBc6dQkZfC8Ll7e_UbdecuKVfQv5EItv4qEpWZbDlXNMtkTLRH55h2mI-1rMHuYAJDiADH-833EbhQ3XgvOxHJltwklGGLacC61PmqgFd6jFwUThR7azClsrCyPgEg5m8CwW2wiTN8dq90lnRW4IzNfImBJWileGK5CNJo4N60XEoX")' }}
        ></div>

        {/* Map Pins */}
        <div 
          onClick={() => setSelectedProperty(PROPERTIES[0])}
          className="absolute top-[40%] left-[45%] z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
        >
          <div className="bg-primary hover:bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md transition-transform group-hover:scale-110 flex items-center gap-1 border border-white/20">
            <span>5.2 Tỷ</span>
          </div>
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-primary mx-auto"></div>
        </div>

        {/* Floating Utilities */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-10">
          {['layers', 'near_me'].map((icon) => (
            <button key={icon} className="w-11 h-11 bg-white dark:bg-[#1e2936] rounded-xl shadow-lg flex items-center justify-center text-[#1e293b] dark:text-white active:scale-95 transition-transform border border-gray-100 dark:border-gray-800">
              <span className="material-symbols-outlined">{icon}</span>
            </button>
          ))}
          <button className="w-11 h-11 bg-white dark:bg-[#1e2936] rounded-xl shadow-lg flex items-center justify-center text-primary active:scale-95 transition-transform border border-gray-100 dark:border-gray-800">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>

        {/* Goland AI FAB */}
        <div className="absolute right-4 bottom-36 z-20">
          <button 
            onClick={() => navigate('/chat')}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full pl-3 pr-4 py-3 shadow-xl shadow-blue-500/30 transform transition-all active:scale-95 border-2 border-white/20"
          >
            <div className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-full">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            </div>
            <span className="font-bold text-sm tracking-wide">Goland AI</span>
          </button>
        </div>

        {/* Property Bottom Sheet (Peek View) */}
        <div className="absolute bottom-0 left-0 right-0 z-30 pb-[88px] pointer-events-none">
          <div className="mx-4 pointer-events-auto">
            <div className="bg-white dark:bg-[#1e2936] rounded-2xl shadow-[0_-4px_25px_rgba(0,0,0,0.1)] overflow-hidden animate-in slide-in-from-bottom-10 duration-500 ring-1 ring-black/5">
              {/* Drag Handle */}
              <div className="h-1 w-12 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mt-2 mb-1"></div>
              
              <div className="flex flex-col" onClick={() => navigate(`/property/${selectedProperty.id}`)}>
                {/* Property Image & Badges */}
                <div className="relative h-40 w-full bg-gray-200">
                  <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">MỚI</div>
                  
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate('/share-preview'); }}
                      className="bg-black/40 text-white p-1.5 rounded-full hover:bg-primary transition-colors shadow-sm active:scale-90"
                    >
                      <span className="material-symbols-outlined text-[20px]">share</span>
                    </button>
                    <button className="bg-black/40 text-white p-1.5 rounded-full hover:bg-red-500 transition-colors shadow-sm active:scale-90">
                      <span className="material-symbols-outlined text-[20px]">favorite_border</span>
                    </button>
                  </div>

                  <img 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrFmlzn-cGftypVgk8eyicSfyyu88kmdnlQUAGtTBf6vRgsNXQ2_VSFIXEJ9Gqf0e1xPejIpg5IajJwbnbc0w7pCWzj8ssYV5gFZqfqcrSUiZfDA676VIdA9FeHBHVuSBxC01o4B-rD0FQrj9c1xpQc9D-cVV5Z1kLWFR4zvzTsCGKMIkLBmfmZGtFCuA9u2WXZ-kAN-i-dbPmUhk7QjUOB6VRIxNOT9HBe-ui0q4WtCt2Qkf5zbN3cmvpMjkMdEqUwsJYht1hdM6G" 
                    alt="Property" 
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-white/10">
                    <span className="material-symbols-outlined text-[14px] text-primary">trending_up</span>
                    <span className="font-medium">Tiềm năng tăng giá cao</span>
                  </div>
                </div>

                {/* Property Stats */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-[17px] font-bold text-[#0f172a] dark:text-white leading-tight">Vinhomes Grand Park - Origami</h3>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        TP. Thủ Đức, TP.HCM
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block text-xl font-bold text-primary tracking-tight">5.2 Tỷ</span>
                      <span className="text-xs text-gray-400 font-medium">~65tr/m²</span>
                    </div>
                  </div>

                  {/* Specs Chips */}
                  <div className="flex gap-4 mt-3 mb-4 text-sm text-[#334155] dark:text-gray-200">
                    <div className="flex items-center gap-1 bg-background-light dark:bg-black/20 px-2.5 py-1 rounded-md border border-gray-100 dark:border-gray-800">
                      <span className="material-symbols-outlined text-gray-400 text-[18px]">bed</span>
                      <span className="font-medium">2 PN</span>
                    </div>
                    <div className="flex items-center gap-1 bg-background-light dark:bg-black/20 px-2.5 py-1 rounded-md border border-gray-100 dark:border-gray-800">
                      <span className="material-symbols-outlined text-gray-400 text-[18px]">bathtub</span>
                      <span className="font-medium">2 WC</span>
                    </div>
                    <div className="flex items-center gap-1 bg-background-light dark:bg-black/20 px-2.5 py-1 rounded-md border border-gray-100 dark:border-gray-800">
                      <span className="material-symbols-outlined text-gray-400 text-[18px]">straighten</span>
                      <span className="font-medium">72m²</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-primary hover:bg-blue-600 text-white h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/20 active:scale-95">
                      <span className="material-symbols-outlined text-[18px]">call</span>
                      Liên hệ
                    </button>
                    <button className="flex-1 bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700 text-[#0f172a] dark:text-white h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95">
                      <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapScreen;
