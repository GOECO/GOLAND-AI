
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SharePreview: React.FC = () => {
  const navigate = useNavigate();
  const [generalMessage, setGeneralMessage] = useState('');
  const [captions, setCaptions] = useState(['Góc nhìn toàn cảnh', '', 'Chi tiết đảo bếp']);

  const shareItems = [
    {
      title: 'Phòng khách',
      tag: 'Hiện đại',
      img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600',
    },
    {
      title: 'Phòng ngủ Master',
      tag: 'Sang trọng',
      img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600',
    },
    {
      title: 'Phòng Bếp',
      tag: 'Smart Home',
      img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600',
    }
  ];

  const updateCaption = (index: number, val: string) => {
    const newCaptions = [...captions];
    newCaptions[index] = val;
    setCaptions(newCaptions);
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={() => navigate(-1)}
          className="text-slate-500 dark:text-slate-400 text-base font-medium hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          Hủy
        </button>
        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Xem trước chia sẻ
        </h2>
        <div className="w-[28px]"></div>
      </div>

      <div className="flex-1 flex flex-col pb-32">
        {/* Image Carousel */}
        <div className="pt-6 pb-2">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4 no-scrollbar items-start">
            {shareItems.map((item, idx) => (
              <div key={idx} className="snap-center shrink-0 w-[85%] flex flex-col gap-3">
                <div className="relative w-full rounded-2xl overflow-hidden shadow-lg aspect-[3/4] group cursor-pointer ring-1 ring-black/5 dark:ring-white/10">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                    style={{ backgroundImage: `url(${item.img})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-white font-bold text-lg">{item.title}</h3>
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs rounded-md">{item.tag}</span>
                        <span className="px-2 py-0.5 bg-primary/80 backdrop-blur-md text-white text-xs rounded-md font-medium">Goland AI</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Caption Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">edit_note</span>
                  </div>
                  <input 
                    className="block w-full rounded-xl border border-[#e5e7eb] dark:border-gray-700 bg-surface-light dark:bg-surface-dark py-3 pl-10 pr-16 text-sm text-[#111418] dark:text-white placeholder-gray-400 focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm" 
                    maxLength={150} 
                    placeholder="Thêm chú thích..." 
                    type="text" 
                    value={captions[idx]}
                    onChange={(e) => updateCaption(idx, e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <span className="text-xs text-gray-400 font-medium">{captions[idx].length}/150</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 py-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          </div>
        </div>

        {/* General Message */}
        <div className="h-4 bg-transparent"></div>
        <div className="px-4">
          <label className="flex flex-col w-full">
            <p className="text-[#111418] dark:text-white text-base font-bold leading-normal pb-3">Lời nhắn chung</p>
            <div className="relative">
              <textarea 
                className="form-input flex w-full resize-none overflow-hidden rounded-xl text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e5e7eb] dark:border-gray-700 bg-surface-light dark:bg-surface-dark focus:border-primary min-h-[120px] placeholder:text-[#9ca3af] p-4 text-base font-normal leading-relaxed transition-all" 
                maxLength={200} 
                placeholder="Nhập nội dung bạn muốn chia sẻ..."
                value={generalMessage}
                onChange={(e) => setGeneralMessage(e.target.value)}
              ></textarea>
              <div className="absolute bottom-3 right-3 text-xs text-gray-400 font-medium">{generalMessage.length}/200</div>
            </div>
          </label>
        </div>

        {/* Share To Section */}
        <div className="h-6 bg-transparent"></div>
        <div className="px-4">
          <h3 className="text-[#111418] dark:text-white tracking-tight text-lg font-bold leading-tight text-left pb-4">Chia sẻ qua</h3>
          <div className="grid grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-2 group">
              <div className="size-14 rounded-full bg-blue-50 dark:bg-[#0068ff]/20 flex items-center justify-center border border-blue-100 dark:border-blue-900 group-hover:bg-blue-100 dark:group-hover:bg-[#0068ff]/30 transition-colors">
                <span className="text-[#0068ff] font-bold text-xs tracking-wider">Zalo</span>
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Zalo</span>
            </button>
            <button className="flex flex-col items-center gap-2 group">
              <div className="size-14 rounded-full bg-blue-50 dark:bg-[#1877f2]/20 flex items-center justify-center border border-blue-100 dark:border-blue-900 group-hover:bg-blue-100 dark:group-hover:bg-[#1877f2]/30 transition-colors">
                <span className="material-symbols-outlined text-[#1877f2]" style={{ fontSize: '28px' }}>social_leaderboard</span>
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Facebook</span>
            </button>
            <button className="flex flex-col items-center gap-2 group">
              <div className="size-14 rounded-full bg-green-50 dark:bg-green-500/20 flex items-center justify-center border border-green-100 dark:border-green-900 group-hover:bg-green-100 dark:group-hover:bg-green-500/30 transition-colors">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400" style={{ fontSize: '26px' }}>sms</span>
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Tin nhắn</span>
            </button>
            <button className="flex flex-col items-center gap-2 group">
              <div className="size-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                <span className="material-symbols-outlined text-gray-600 dark:text-gray-300" style={{ fontSize: '26px' }}>link</span>
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Sao chép</span>
            </button>
            <button 
              onClick={() => navigate('/share-settings')}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="size-14 rounded-full bg-gray-50 dark:bg-surface-dark flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-600 group-hover:border-primary group-hover:bg-primary/5 transition-all">
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary" style={{ fontSize: '26px' }}>more_horiz</span>
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Thêm</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 max-w-md mx-auto z-[100]">
        <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-primary hover:bg-blue-600 text-white shadow-lg shadow-primary/30 transition-all active:scale-[0.98]">
          <span className="material-symbols-outlined mr-2 text-[20px]">send</span>
          <span className="text-base font-bold leading-normal tracking-wide">Chia sẻ ngay</span>
        </button>
      </div>
    </div>
  );
};

export default SharePreview;
