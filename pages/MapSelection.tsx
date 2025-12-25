
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SelectionMode = 'pin' | 'circle' | 'square' | 'polyline';

const MapSelection: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<SelectionMode>('polyline');
  const [radius, setRadius] = useState(2.5);

  // Mock data for polygon points (fixed screen coordinates for visual simulation)
  const polygonPoints = [
    { x: 80, y: 280 },
    { x: 280, y: 240 },
    { x: 340, y: 380 },
    { x: 200, y: 480 },
    { x: 60, y: 400 }
  ];

  const pointsPath = polygonPoints.map(p => `${p.x} ${p.y}`).join(' L ');

  const handleConfirm = () => {
    navigate('/create-alert');
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden font-display text-[#111418] antialiased">
      {/* Header */}
      <div className="z-20 flex items-center bg-white dark:bg-[#1a2632] px-4 py-3 shadow-sm justify-between shrink-0 border-b border-gray-100 dark:border-gray-800">
        <div 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-[#111418] dark:text-white transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined text-2xl font-bold">arrow_back</span>
        </div>
        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Chọn khu vực</h2>
        <div className="flex items-center justify-end w-12">
          <button className="text-primary text-sm font-bold leading-normal tracking-tight shrink-0 hover:text-blue-600 transition-colors">
            Làm mới
          </button>
        </div>
      </div>

      {/* Map Content Overlay */}
      <div className="relative flex-1 w-full overflow-hidden bg-gray-200">
        {/* Map Image Simulator */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 scale-110" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBatWMqJLp96E63WlmXutGPE8A9tBRwQCXm4VEf1LvCLIk-XNjcuWgZl7wsFtrjMjXdGIhY6Ia6bD3ny1a5-tYv82AS9xXLYVbZ2mNuCKwfYUwnAVQjE3n5ZpmZD_KTRJcqltScLYsK3NAukvX46sB_tB6UF0wJxS61-Yrs6Zf92uL8OQAOohiTWXtTDmTU1U4Bvd6as22s7aMCwvQoKphZLj6aLRK7bLoQ2AwFONECpOI15r7tcsEjvCXGSmtB5BgONUngJ5StSMfv')" }}
        ></div>
        
        {/* Visual Overlays */}
        <div className="absolute inset-0 bg-black/5 dark:bg-black/20 pointer-events-none"></div>
        <div className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        {/* Polygon Overlay (Active in polyline mode) */}
        {mode === 'polyline' && (
          <>
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
              <svg className="w-full h-full overflow-visible">
                <path 
                  className="drop-shadow-lg transition-all duration-300" 
                  d={`M${pointsPath} Z`} 
                  fill="rgba(19, 127, 236, 0.2)" 
                  stroke="#137fec" 
                  strokeLinejoin="round" 
                  strokeWidth="3"
                ></path>
              </svg>
            </div>
            {polygonPoints.map((point, idx) => (
              <div 
                key={idx} 
                className="absolute z-20 cursor-move group" 
                style={{ left: point.x, top: point.y, transform: 'translate(-50%, -50%)' }}
              >
                <div className="size-5 bg-white border-[3px] border-primary rounded-full shadow-md group-hover:scale-125 transition-transform"></div>
              </div>
            ))}
          </>
        )}

        {/* Circle Overlay (Active in circle mode) */}
        {mode === 'circle' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10">
            <div 
              className="rounded-full bg-primary/20 border-2 border-primary/50 shadow-[0_0_40px_rgba(19,127,236,0.3)] transition-all duration-300"
              style={{ width: `${radius * 60}px`, height: `${radius * 60}px` }}
            ></div>
            <div className="absolute -mt-12 text-primary drop-shadow-xl animate-bounce">
              <span className="material-symbols-outlined text-[56px] fill-current">location_on</span>
            </div>
          </div>
        )}

        {/* Search Overlay */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="flex w-full items-center rounded-2xl bg-white dark:bg-[#1a2632] shadow-[0_8px_30px_rgba(0,0,0,0.12)] h-14 border border-transparent focus-within:border-primary/50 transition-all px-4">
            <div className="flex items-center justify-center text-[#617589] dark:text-gray-400">
              <span className="material-symbols-outlined text-2xl">search</span>
            </div>
            <input 
              className="flex w-full min-w-0 flex-1 bg-transparent border-none px-3 text-base font-medium text-[#111418] dark:text-white placeholder:text-[#617589] focus:outline-0 focus:ring-0" 
              placeholder="Tìm kiếm địa điểm, quận, tên đường..." 
            />
          </div>
        </div>

        {/* Floating Tool Controls */}
        <div className="absolute right-4 top-24 z-30 flex flex-col gap-4 max-h-[calc(100%-120px)] overflow-y-auto no-scrollbar pb-2">
          {/* Shapes Group */}
          <div className="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] p-2 gap-2 border border-gray-100 dark:border-gray-700 shrink-0">
            {[
              { id: 'pin', icon: 'location_on' },
              { id: 'circle', icon: 'radio_button_unchecked' },
              { id: 'square', icon: 'crop_square' },
              { id: 'polyline', icon: 'polyline' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setMode(item.id as SelectionMode)}
                className={`size-10 flex items-center justify-center rounded-lg transition-all ${
                  mode === item.id 
                  ? 'bg-primary text-white shadow-lg shadow-blue-500/30 scale-105' 
                  : 'text-[#617589] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
              </button>
            ))}
          </div>

          {/* Edit Actions Group */}
          <div className="flex flex-col bg-white dark:bg-[#1a2632] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] p-2 gap-2 border border-gray-100 dark:border-gray-700 shrink-0">
            <button className="size-10 flex items-center justify-center rounded-lg text-[#617589] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Hoàn tác">
              <span className="material-symbols-outlined">undo</span>
            </button>
            <button className="size-10 flex items-center justify-center rounded-lg text-[#617589] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Làm lại">
              <span className="material-symbols-outlined">redo</span>
            </button>
            <button className="size-10 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors" title="Xóa vùng đã vẽ">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>

          {/* Map Utils Group */}
          <div className="flex flex-col gap-3 shrink-0">
            <div className="flex flex-col rounded-xl bg-white dark:bg-[#1a2632] shadow-[0_4px_16px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100 dark:border-gray-700">
              <button className="flex size-10 items-center justify-center border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined text-[#111418] dark:text-white">add</span>
              </button>
              <button className="flex size-10 items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 transition-colors">
                <span className="material-symbols-outlined text-[#111418] dark:text-white">remove</span>
              </button>
            </div>
            <button className="flex size-10 items-center justify-center rounded-xl bg-white dark:bg-[#1a2632] shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 transition-colors">
              <span className="material-symbols-outlined text-primary">my_location</span>
            </button>
            <button className="flex size-10 items-center justify-center rounded-xl bg-white dark:bg-[#1a2632] shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 transition-colors">
              <span className="material-symbols-outlined text-[#111418] dark:text-white">layers</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Selection Panel */}
      <div className="z-40 w-full rounded-t-[32px] bg-white dark:bg-[#1a2632] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] px-6 pt-6 pb-10 space-y-6 border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-bottom duration-500">
        
        {/* Polyline Stats View */}
        {mode === 'polyline' && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="text-[#111418] dark:text-white text-lg font-extrabold uppercase tracking-tight">Vùng tùy chỉnh</h3>
                <p className="text-xs text-[#617589] font-bold mt-0.5">5 điểm neo • Chạm để sửa</p>
              </div>
              <div className="flex gap-2">
                <button className="size-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 text-[#617589] transition-colors" title="Hoàn tác">
                  <span className="material-symbols-outlined">undo</span>
                </button>
                <button className="size-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 text-[#617589] transition-colors" title="Xóa">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30">
              <div className="size-12 rounded-full bg-white dark:bg-[#2c3b4a] shadow-sm flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl font-bold">square_foot</span>
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-[10px] text-[#617589] dark:text-gray-400 font-black uppercase tracking-widest mb-1">Diện tích cảnh báo</span>
                <span className="text-2xl font-black text-primary leading-none">4.5 km²</span>
              </div>
              <div className="h-10 w-px bg-blue-200 dark:bg-blue-800/50"></div>
              <div className="flex flex-col min-w-[80px]">
                <span className="text-[10px] text-[#617589] dark:text-gray-400 font-black uppercase tracking-widest mb-1">Chu vi</span>
                <span className="text-lg font-black text-[#111418] dark:text-white leading-none">12.5 km</span>
              </div>
            </div>
          </>
        )}

        {/* Standard Selection View (Radius Slider) */}
        {(mode === 'circle' || mode === 'pin') && (
          <div className="space-y-4 px-1">
            <div className="flex items-center justify-between">
              <span className="text-[#111418] dark:text-white text-base font-extrabold uppercase tracking-tight">Bán kính cảnh báo</span>
              <span className="text-primary text-base font-black bg-primary/10 px-3 py-1 rounded-xl border border-primary/20">
                {radius} km
              </span>
            </div>
            <div className="relative flex h-8 w-full items-center group">
              <input 
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={radius}
                onChange={(e) => setRadius(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            <div className="flex justify-between text-xs text-[#617589] dark:text-gray-500 font-black uppercase tracking-widest">
              <span>500m</span>
              <span>10km</span>
            </div>
          </div>
        )}

        {/* Selected Area Info */}
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-[#101922] border border-gray-100 dark:border-gray-800 shadow-inner">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <span className="material-symbols-outlined">place</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-[#617589] uppercase font-black tracking-widest mb-1">
              {mode === 'polyline' ? 'Trung tâm khu vực' : 'Khu vực đã chọn'}
            </span>
            <span className="text-[#111418] dark:text-white text-sm font-bold line-clamp-1 leading-tight">
              Khu đô thị Sala, Quận 2, TP. Hồ Chí Minh
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 text-[#111418] dark:text-white text-base font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={handleConfirm}
            className="flex items-center justify-center h-14 rounded-2xl bg-primary text-white text-base font-extrabold hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/30 active:scale-95"
          >
            Lưu khu vực
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapSelection;
