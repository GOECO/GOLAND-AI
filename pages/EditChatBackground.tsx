
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Tool = 'crop' | 'rotate' | 'opacity' | 'zoom';

const EditChatBackground: React.FC = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<Tool>('opacity');
  const [opacity, setOpacity] = useState(75);
  const [zoom, setZoom] = useState(75);
  const [rotation, setRotation] = useState(0);

  const handleApply = () => {
    // Save settings if needed and return
    navigate(-1);
  };

  return (
    <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col font-display text-[#111418] dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-800 z-30 bg-white dark:bg-background-dark">
        <button 
          onClick={() => navigate(-1)}
          className="text-gray-500 dark:text-gray-400 text-base font-bold hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Hủy
        </button>
        <h2 className="text-lg font-black leading-tight tracking-tight flex-1 text-center uppercase">Chỉnh sửa ảnh nền</h2>
        <div className="flex items-center justify-end gap-3 w-[80px]">
          <button className="text-[#111418] dark:text-white flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 p-1.5 transition-all active:scale-90">
            <span className="material-symbols-outlined text-[20px]">undo</span>
          </button>
          <button className="text-gray-300 dark:text-gray-700 flex items-center justify-center rounded-full p-1.5 cursor-not-allowed">
            <span className="material-symbols-outlined text-[20px]">redo</span>
          </button>
        </div>
      </header>

      {/* Canvas Area */}
      <div className="flex-1 relative flex items-center justify-center bg-[#f6f7f8] dark:bg-[#0d141c] overflow-hidden p-6">
        {/* Checkerboard Pattern for Transparency Reference */}
        <div className="relative w-full aspect-[3/5] max-w-sm shadow-2xl rounded-[32px] overflow-hidden border-4 border-white dark:border-gray-800 group" 
             style={{ backgroundImage: 'linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px', backgroundColor: '#fff' }}>
          
          {/* Main Image Preview */}
          <div 
            className="w-full h-full bg-cover bg-center transition-all duration-300 ease-out" 
            style={{ 
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmWPm5eKFAvZOdPd0_Cav6RfRWMOyUQH6sW4iD-rcQxug9Gyh7vttlYUqyxxF25ijo1uPsysYo30zSoVqpHaWb7ZJy0dMW3DGoDWq2LqJP5aHfOqKrg6z2qlvadDKqmFE03N9y7todkV5DpxArUtmsK13RGu00NQyZaabEq_r-x_FOPTeoP_kKwhOtbzmPZ1w9o65HQRCDPx5lI9XHQb77tYzdp1TUQPTpBfDDHKiv0IYwDbxmn4m-ShcStrUkXb0jpO8enKv9Ow-G')", 
              opacity: opacity / 100,
              transform: `scale(${1 + (zoom - 50) / 100}) rotate(${rotation}deg)`
            }}
          />

          {/* Floating Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
              {activeTool === 'opacity' ? `Opacity: ${opacity}%` : activeTool === 'zoom' ? `Zoom: ${zoom}%` : activeTool === 'rotate' ? `Rotation: ${rotation}°` : 'Cropping'}
            </div>
          </div>
        </div>
      </div>

      {/* Controls Panel */}
      <div className="flex flex-col bg-white dark:bg-[#1a2632] border-t border-gray-100 dark:border-gray-800 pb-10 pt-4 rounded-t-[40px] shadow-[0_-12px_40px_rgba(0,0,0,0.1)] z-20 transition-colors">
        
        {/* Slider Logic for active tool */}
        <div className="px-8 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex w-full items-center justify-between mb-1">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-primary text-[22px] font-bold">
                  {activeTool === 'opacity' ? 'opacity' : activeTool === 'zoom' ? 'zoom_in' : activeTool === 'rotate' ? 'rotate_right' : 'crop'}
                </span>
                <p className="text-sm font-black uppercase tracking-tight">
                  {activeTool === 'opacity' ? 'Độ mờ' : activeTool === 'zoom' ? 'Độ phóng' : activeTool === 'rotate' ? 'Xoay ảnh' : 'Cắt ảnh'}
                </p>
              </div>
              <p className="text-primary text-sm font-black bg-primary/10 px-3 py-0.5 rounded-full">
                {activeTool === 'opacity' ? `${opacity}%` : activeTool === 'zoom' ? `${zoom}%` : activeTool === 'rotate' ? `${rotation}°` : 'Gốc'}
              </p>
            </div>

            {/* Custom Styled Slider */}
            <div className="relative flex w-full h-8 items-center group">
              <input 
                type="range" 
                min={activeTool === 'rotate' ? -180 : 0} 
                max={activeTool === 'rotate' ? 180 : 100}
                value={activeTool === 'opacity' ? opacity : activeTool === 'zoom' ? zoom : rotation}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (activeTool === 'opacity') setOpacity(val);
                  if (activeTool === 'zoom') setZoom(val);
                  if (activeTool === 'rotate') setRotation(val);
                }}
                className="absolute w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary z-10" 
              />
            </div>
          </div>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex justify-between items-center px-8 gap-4 mb-6">
          {[
            { id: 'crop', label: 'Cắt', icon: 'crop' },
            { id: 'rotate', label: 'Xoay', icon: 'rotate_right' },
            { id: 'opacity', label: 'Độ mờ', icon: 'opacity' },
            { id: 'zoom', label: 'Zoom', icon: 'zoom_in' },
          ].map((tool) => (
            <button 
              key={tool.id}
              onClick={() => setActiveTool(tool.id as Tool)}
              className={`flex flex-col items-center justify-center gap-2 flex-1 p-2 rounded-2xl transition-all duration-300 relative group ${
                activeTool === tool.id 
                ? 'bg-primary/10 dark:bg-primary/20 scale-105 shadow-sm' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div className={`p-2.5 rounded-full transition-all duration-300 ${
                activeTool === tool.id ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
              }`}>
                <span className="material-symbols-outlined text-[26px]">{tool.icon}</span>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${activeTool === tool.id ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}`}>
                {tool.label}
              </span>
              {activeTool === tool.id && (
                <div className="absolute top-1 right-1 size-2 bg-primary rounded-full animate-pulse border-2 border-white dark:border-[#1a2632]"></div>
              )}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="px-8">
          <button 
            onClick={handleApply}
            className="w-full h-14 flex items-center justify-center rounded-2xl bg-primary text-white text-base font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 hover:bg-blue-600 transition-all active:scale-[0.98] group"
          >
            <span className="truncate">Áp dụng thay đổi</span>
            <span className="material-symbols-outlined ml-3 text-xl group-hover:translate-x-1 transition-transform">auto_fix_high</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditChatBackground;
