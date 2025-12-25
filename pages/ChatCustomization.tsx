
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const COLORS = [
  '#137fec', '#ec135a', '#13ecb8', '#8013ec', '#111418',
  '#FF9F1C', '#2EC4B6', '#E71D36', '#011627'
];

const BACKGROUNDS = [
  { id: 'none', name: 'Trống', type: 'color', value: '#f8f9fa' },
  { id: 'cloudy', name: 'Cloudy', type: 'gradient', value: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
  { id: 'neon', name: 'Neon', type: 'image', value: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaXVHzVfVP7sc-XPNYk18v2frkScQCgnIT8fIu9ka1iU8sImjzRaYhZd5t57ne531-SMXAjOx4J_Kl6fr0rki-RbQ0wNx1xkQCOm39MhMclJ2N-pSLyRFE-OdxAdkX2oxPECTVxn-kgnvCBfYaFXNf7Py6tJ5lHKVKF9b_hM937Kz9aFTPD7vJqY7j30ODFRyNT-Oye0WavzXxU-PSFPPykQ9pF0gMLVWi_BOAUn58Vu_W7KdZCv4XO0932gqpuJGmjOGK-rt8P2A0' },
  { id: 'city', name: 'City', type: 'image', value: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoJD78FHjw83z7FoXf6klc9nDumnR-e7uwcy4WqRF_0izw6zmwJzFaxjko3DvoKIlORV0XV1hfxdSe8HPe9vKhKrp5NShBE0iBk6Ywk-l0Ydc2syOopYIzUJ1yH81mXOwI8lXVkl_MLW7zp01NTbTM96vrEyHqSwHYQuVdNSRId7pSxfICh1Z3mQje4iHsyYUZpGACEi0U1V-2SejIUobUrvNZw_iecqAfaF9TDWPqXZsXn14K7gVRDsRWPpyjzbRmdmqbg02TWsm9' },
  { id: 'map', name: 'Map', type: 'image', value: 'https://placeholder.pics/svg/300' },
  { id: 'sunset', name: 'Sunset', type: 'gradient', value: 'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)' }
];

const ChatCustomization: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'colors' | 'backgrounds'>('colors');
  const [selectedColor, setSelectedColor] = useState('#137fec');
  const [selectedBgId, setSelectedBgId] = useState('none');

  useEffect(() => {
    const savedColor = localStorage.getItem('goland_chat_bubble_color');
    const savedBgId = localStorage.getItem('goland_chat_bg_id');
    if (savedColor) setSelectedColor(savedColor);
    if (savedBgId) setSelectedBgId(savedBgId);
  }, []);

  const handleApply = () => {
    localStorage.setItem('goland_chat_bubble_color', selectedColor);
    localStorage.setItem('goland_chat_bg_id', selectedBgId);
    navigate(-1);
  };

  const currentBg = BACKGROUNDS.find(b => b.id === selectedBgId) || BACKGROUNDS[0];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-slate-900 dark:text-white relative overflow-x-hidden pb-24 transition-colors duration-300">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 flex items-center bg-white dark:bg-[#1a2632] p-4 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
        <button 
          onClick={() => { navigate(-1); }}
          className="flex size-12 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-black leading-tight flex-1 text-center pr-12 uppercase tracking-tight">Tùy chỉnh Chat</h2>
      </header>

      {/* Preview Section */}
      <div className="flex flex-col w-full px-4 pt-6 pb-4">
        <h3 className="text-xl font-extrabold mb-4 px-1 tracking-tight">Xem trước</h3>
        <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a2632]">
          {/* Status Bar Simulation */}
          <div className="h-6 w-full flex justify-between items-center px-4 text-[10px] text-gray-400 font-black z-10 relative bg-white/50 dark:bg-[#1a2632]/50 backdrop-blur">
            <span>9:41</span>
            <div className="flex gap-1.5 items-center">
              <span className="material-symbols-outlined text-[14px] font-black">signal_cellular_alt</span>
              <span className="material-symbols-outlined text-[14px] font-black">wifi</span>
              <span className="material-symbols-outlined text-[14px] font-black">battery_full</span>
            </div>
          </div>

          {/* Chat Preview Background */}
          <div 
            className="relative flex flex-col gap-6 p-4 min-h-[320px] transition-all duration-700 ease-in-out overflow-hidden"
            style={{ 
              background: currentBg.type === 'gradient' ? currentBg.value : currentBg.type === 'color' ? currentBg.value : '#f8f9fa',
              backgroundImage: currentBg.type === 'image' ? `url(${currentBg.value})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {currentBg.type === 'image' && <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-[1px]"></div>}
            
            {/* Mock AI Message */}
            <div className="relative z-10 flex items-end gap-3 self-start max-w-[85%] animate-in fade-in slide-in-from-left-2 duration-500">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-8 shrink-0 border-2 border-white dark:border-gray-700 shadow-lg" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAaIJvyvWtzcejM49Cf_zjcRt-FGDbIPQYbpvVx1EtYNS5sAwCfaejlMo85YHGeseSVoe_cZgWC7shxP9YmkxHUg3WPWb5lpfe5Fpc2rCaVRTwcnSZuEZquxTMzvp97uvHb7NpTTO_rryGDWNARJkgmIWlNJjxb-2NRaR7hk2ykMAoFuwfiE4YhyompT2T_uqdDA0_DFLkYG3gXpdtxLSQIsKWZD0TL6Mez4mccz2QHrjep8OXX514UeTvqIUfkQSX0ObnTQCqlDUkW")' }}
              ></div>
              <div className="flex flex-col gap-1 items-start">
                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Trợ lý Goland</p>
                <div className="bg-white dark:bg-[#23303d] p-3 rounded-2xl rounded-bl-none shadow-md border border-black/5 dark:border-white/5">
                  <p className="text-[14px] text-gray-800 dark:text-gray-200 font-bold leading-relaxed">
                    Chào bạn, Goland AI có thể giúp gì cho bạn hôm nay?
                  </p>
                </div>
              </div>
            </div>

            {/* Mock User Message */}
            <div className="relative z-10 flex items-end gap-3 self-end max-w-[85%] justify-end mt-2 animate-in fade-in slide-in-from-right-2 duration-500">
              <div className="flex flex-col gap-1 items-end">
                <div 
                  className="p-3 rounded-2xl rounded-br-none shadow-xl text-white transition-all duration-500 transform scale-100"
                  style={{ backgroundColor: selectedColor }}
                >
                  <p className="text-[14px] font-extrabold leading-relaxed">
                    Tìm cho tôi căn hộ 2 phòng ngủ tại Quận 1.
                  </p>
                </div>
                <span className="text-[10px] text-gray-400 font-black mr-1 flex items-center gap-1 uppercase tracking-tighter opacity-80">
                  Đã xem <span className="material-symbols-outlined text-[12px] font-black">done_all</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="mt-4 bg-white dark:bg-[#1a2632] rounded-t-[40px] shadow-[0_-12px_40px_rgba(0,0,0,0.08)] flex-1 flex flex-col border-t border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
        {/* Tab Switcher */}
        <div className="flex px-8 pt-8 pb-6">
          <div className="flex h-14 flex-1 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800/80 p-1.5 shadow-inner">
            <button 
              onClick={() => { setTab('colors'); }}
              className={`flex-1 h-full rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${tab === 'colors' ? 'bg-white dark:bg-[#1a2632] text-primary shadow-lg scale-100' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Màu sắc
            </button>
            <button 
              onClick={() => { setTab('backgrounds'); }}
              className={`flex-1 h-full rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${tab === 'backgrounds' ? 'bg-white dark:bg-[#1a2632] text-primary shadow-lg scale-100' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Mẫu nền
            </button>
          </div>
        </div>

        {/* Dynamic Controls List */}
        <div className="px-8 flex-1 overflow-y-auto no-scrollbar pb-36 scroll-smooth">
          {tab === 'colors' ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
              <div className="flex items-center justify-between mb-6 px-1">
                <h4 className="text-sm font-black uppercase tracking-tighter text-slate-900 dark:text-white">Màu bong bóng chat</h4>
                <button 
                  onClick={() => { setSelectedColor('#137fec'); }}
                  className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-blue-600 transition-colors bg-primary/5 px-3 py-1 rounded-full border border-primary/20"
                >
                  Mặc định
                </button>
              </div>
              <div className="grid grid-cols-5 gap-y-6 gap-x-4 pb-4">
                {COLORS.map((color) => (
                  <button 
                    key={color}
                    onClick={() => { setSelectedColor(color); }}
                    className="relative flex items-center justify-center transition-all hover:scale-110 active:scale-90"
                  >
                    <div 
                      className={`size-11 rounded-full shadow-lg transition-all duration-300 ${selectedColor === color ? 'ring-4 ring-offset-2 ring-primary dark:ring-offset-[#1a2632] scale-110' : 'opacity-90'}`}
                      style={{ backgroundColor: color }}
                    ></div>
                    {selectedColor === color && (
                      <span className="absolute text-white material-symbols-outlined text-[20px] font-black drop-shadow-md pointer-events-none animate-in zoom-in duration-300">check</span>
                    )}
                  </button>
                ))}
                <button className="size-11 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-primary transition-all active:scale-95 border-2 border-dashed border-gray-300 dark:border-gray-700">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
              <div className="flex items-center justify-between mb-6 px-1">
                <h4 className="text-sm font-black uppercase tracking-tighter text-slate-900 dark:text-white">Thư viện mẫu nền</h4>
                <button 
                  onClick={() => { setSelectedBgId('none'); }}
                  className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-blue-600 transition-colors bg-primary/5 px-3 py-1 rounded-full border border-primary/20"
                >
                  Xóa nền
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4">
                {BACKGROUNDS.map((bg) => (
                  <div 
                    key={bg.id}
                    onClick={() => { setSelectedBgId(bg.id); }}
                    className={`aspect-[3/4] rounded-2xl border-2 transition-all cursor-pointer overflow-hidden relative group shadow-sm ${
                      selectedBgId === bg.id ? 'border-primary scale-[1.03] shadow-xl z-10' : 'border-gray-100 dark:border-gray-800 opacity-80 hover:opacity-100 hover:border-gray-300'
                    }`}
                    style={{ 
                      background: bg.type === 'gradient' ? bg.value : bg.type === 'color' ? bg.value : '#fff',
                      backgroundImage: bg.type === 'image' ? `url(${bg.value})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {bg.id === 'none' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-gray-300 text-4xl">block</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Trống</span>
                      </div>
                    )}
                    {(bg.type !== 'color' && bg.id !== 'none') && (
                      <div className="absolute bottom-0 left-0 w-full p-2.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <span className="text-[9px] text-white font-black uppercase text-center block tracking-widest">{bg.name}</span>
                      </div>
                    )}
                    {selectedBgId === bg.id && (
                      <div className="absolute top-2 right-2 size-6 bg-primary rounded-full flex items-center justify-center text-white shadow-xl animate-in zoom-in duration-300 border-2 border-white/20">
                        <span className="material-symbols-outlined text-[16px] font-black">check</span>
                      </div>
                    )}
                  </div>
                ))}
                {/* Upload/Edit custom button */}
                <button 
                  onClick={() => navigate('/edit-chat-bg')}
                  className="aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all active:scale-95 group"
                >
                  <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">add_photo_alternate</span>
                  </div>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest group-hover:text-primary">Tải lên</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Persistent Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 pb-10 bg-white/95 dark:bg-[#1a2632]/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 flex gap-4 z-[60] shadow-[0_-10px_50px_rgba(0,0,0,0.15)] max-w-[480px] mx-auto">
        <button 
          onClick={() => { navigate(-1); }}
          className="flex-1 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white font-bold text-base hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-[0.98]"
        >
          Hủy
        </button>
        <button 
          onClick={handleApply}
          className="flex-1 h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-primary/40 hover:bg-blue-600 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Áp dụng</span>
          <span className="material-symbols-outlined text-[22px] font-black">check_circle</span>
        </button>
      </div>
    </div>
  );
};

export default ChatCustomization;
