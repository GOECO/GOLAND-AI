
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAIResponse } from '../services/geminiService';

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [allDay, setAllDay] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [startDate, setStartDate] = useState('20 Th10, 2023');

  const handleAISuggest = async () => {
    setIsAiLoading(true);
    const prompt = `Suggest a professional real estate event title and a short detailed note for it. ${title ? `Current context: ${title}.` : 'General activity.'} Return as JSON: { "title": "...", "notes": "..." }`;
    
    try {
      const result = await getAIResponse(prompt);
      // Attempt to parse JSON from AI response
      const jsonMatch = result.text.match(/\{.*\}/s);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        setTitle(data.title);
        setNotes(data.notes);
      } else {
        // Fallback if not JSON
        setTitle(result.text.split('\n')[0].replace('Title: ', ''));
      }
    } catch (error) {
      console.error("AI Suggestion failed", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSave = () => {
    // In a real app, save to context/DB here
    console.log("Saving Event:", { title, location, allDay, startTime, startDate, notes });
    navigate(-1);
  };

  return (
    <div className="bg-[#f0f2f5] dark:bg-background-dark min-h-screen flex flex-col font-display antialiased overflow-hidden transition-colors duration-300">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#f0f2f5]/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-100/50 dark:border-gray-800/50">
        <div className="flex items-center justify-between px-4 h-14">
          <button 
            onClick={() => navigate(-1)}
            className="text-primary text-[17px] font-normal hover:opacity-80 transition-opacity"
          >
            Hủy
          </button>
          <span className="text-[17px] font-extrabold text-[#111418] dark:text-white uppercase tracking-tight">Tạo sự kiện</span>
          <button 
            onClick={handleSave}
            className="text-primary text-[17px] font-black hover:opacity-80 transition-opacity"
          >
            Lưu
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 overflow-y-auto px-4 pt-2 pb-24 flex flex-col gap-6 transition-all duration-300 ${isTimePickerOpen ? 'blur-sm pointer-events-none opacity-40' : 'opacity-100'}`}>
        
        {/* Section 1: Title & Location */}
        <div className="bg-white dark:bg-[#1e293b] rounded-[24px] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col px-5 pt-5 pb-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#617589] dark:text-gray-400">Tiêu đề</label>
              <button 
                onClick={handleAISuggest}
                disabled={isAiLoading}
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-3 py-1.5 rounded-full hover:bg-purple-100 transition-all active:scale-95 disabled:opacity-50"
              >
                <span className={`material-symbols-outlined text-[16px] ${isAiLoading ? 'animate-spin' : 'filled'}`}>auto_awesome</span>
                {isAiLoading ? 'Đang nghĩ...' : 'Gợi ý AI'}
              </button>
            </div>
            <input 
              className="w-full bg-transparent border-none p-0 text-xl font-extrabold text-[#111418] dark:text-white placeholder:text-gray-300 focus:ring-0 focus:outline-none h-10" 
              placeholder="VD: Xem nhà Quận 7" 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div 
            onClick={() => navigate('/map-selection')}
            className="flex items-center px-5 py-5 min-h-[60px] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[#617589] dark:text-gray-400 mr-3 group-hover:text-primary transition-colors">location_on</span>
            <div className="flex-1 min-w-0">
              <p className={`text-base font-bold truncate ${location ? 'text-[#111418] dark:text-white' : 'text-gray-300'}`}>
                {location || 'Thêm địa điểm hoặc chọn trên bản đồ'}
              </p>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-[20px] group-hover:text-primary transition-colors">map</span>
          </div>

          <div 
            onClick={() => navigate('/map-selection')}
            className="h-36 w-full relative bg-gray-200 dark:bg-gray-700 cursor-pointer overflow-hidden group"
          >
            <img 
              alt="Map Preview" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcpqABvrk4b3-crlo9xUB9RhgDa4fo9Iy0uPPyWx0JrHz3twVdIkaP1uSdRWx1kblJL2mUOTIZDeW5zWiJBxeEWIy_RLM_XO0TkbdCD1VCRqZFqv_aBn9tSYwvSZGHc7mBsP7eoS1NBGFij05q3gAZuJdKW2XH03ZVnkvKfCnvFCRobvhdR-DGN8VJj-5rHhnLHyZ2FgylNt5iRUK84sJg8mKK9G__nYwLGDIKiwxNMi9ZfKF77f1mklKmuVBOdPtRi6JN3E1ph6j_"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            <div className="absolute bottom-4 right-4 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg border border-white/20 active:scale-95 transition-transform">
              Mở bản đồ
            </div>
          </div>
        </div>

        {/* Section 2: Timing */}
        <div className="bg-white dark:bg-[#1e293b] rounded-[24px] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
          <div className="flex items-center justify-between px-5 py-5">
            <span className="text-base font-bold text-[#111418] dark:text-white">Cả ngày</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={allDay}
                onChange={() => setAllDay(!allDay)}
              />
              <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>
          
          <div 
            onClick={() => setIsTimePickerOpen(true)}
            className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors group"
          >
            <span className="text-base font-bold text-[#617589] dark:text-gray-300 group-hover:text-primary transition-colors">Bắt đầu</span>
            <div className="flex flex-col items-end">
              <span className="text-base font-black text-primary bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-xl text-right transition-transform group-active:scale-95">
                {startTime}
              </span>
              <span className="text-[10px] text-[#617589] dark:text-gray-400 mt-1.5 font-black uppercase tracking-tighter">
                {startDate}
              </span>
            </div>
          </div>

          <div 
            onClick={() => setIsTimePickerOpen(true)}
            className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors group"
          >
            <span className="text-base font-bold text-[#617589] dark:text-gray-300 group-hover:text-primary transition-colors">Kết thúc</span>
            <div className="flex flex-col items-end">
              <span className="text-base font-black text-[#111418] dark:text-white px-3 py-1 rounded-xl text-right transition-transform group-active:scale-95">
                10:00
              </span>
              <span className="text-[10px] text-[#617589] dark:text-gray-400 mt-1.5 font-black uppercase tracking-tighter">
                {startDate}
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Configuration */}
        <div className="bg-white dark:bg-[#1e293b] rounded-[24px] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
          <div className="flex items-center justify-between px-5 py-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors group">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-blue-900/30 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[22px]">repeat</span>
              </div>
              <span className="text-base font-bold text-[#111418] dark:text-white">Lặp lại</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#617589] dark:text-gray-400 font-bold">Không bao giờ</span>
              <span className="material-symbols-outlined text-gray-400 text-[20px]">chevron_right</span>
            </div>
          </div>

          <div className="flex items-center justify-between px-5 py-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors group">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 shadow-sm border border-orange-100 dark:border-orange-900/30 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[22px]">notifications</span>
              </div>
              <span className="text-base font-bold text-[#111418] dark:text-white">Nhắc nhở</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#617589] dark:text-gray-400 font-bold">30 phút trước</span>
              <span className="material-symbols-outlined text-gray-400 text-[20px]">chevron_right</span>
            </div>
          </div>
        </div>

        {/* Section 4: Details */}
        <div className="bg-white dark:bg-[#1e293b] rounded-[24px] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
          <div className="px-5 py-5">
            <label className="block text-[10px] font-black uppercase tracking-widest text-[#617589] dark:text-gray-400 mb-4 px-1">Ghi chú</label>
            <textarea 
              className="w-full bg-gray-50 dark:bg-[#101922]/50 border border-transparent focus:border-primary/20 dark:focus:border-primary/20 rounded-2xl p-4 text-base font-bold text-[#111418] dark:text-white placeholder:text-gray-300 focus:ring-0 focus:outline-none resize-none min-h-[140px] shadow-inner transition-all" 
              placeholder="Nhập mô tả chi tiết, mã căn hộ, hoặc thông tin khách hàng..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center px-5 py-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
            <span className="material-symbols-outlined text-[#617589] dark:text-gray-400 mr-4 group-hover:text-primary transition-colors">link</span>
            <input 
              className="flex-1 bg-transparent border-none p-0 text-base font-black text-primary placeholder:text-gray-300 focus:ring-0 focus:outline-none" 
              placeholder="URL liên kết (nếu có)" 
              type="url"
            />
          </div>
        </div>

        {/* Delete Action */}
        <button className="bg-white dark:bg-[#1e293b] rounded-[24px] shadow-sm border border-red-100 dark:border-red-900/30 w-full py-5 flex items-center justify-center text-red-500 font-black uppercase tracking-widest text-sm hover:bg-red-50 dark:hover:bg-red-900/10 transition-all active:scale-[0.98] mt-2 mb-2">
          Xóa sự kiện
        </button>
        
        <p className="text-center text-[10px] text-[#617589] dark:text-gray-500 font-bold uppercase tracking-[0.2em] px-8 leading-relaxed opacity-60">
          Goland AI sẽ tự động đồng bộ sự kiện này với lịch của bạn.
        </p>
      </div>

      {/* Time Picker Modal Overlay */}
      {isTimePickerOpen && (
        <div aria-modal="true" className="fixed inset-0 z-[100] flex items-end justify-center animate-in fade-in duration-300" role="dialog">
          <div className="absolute inset-0 bg-[#101922]/80 backdrop-blur-md" onClick={() => setIsTimePickerOpen(false)}></div>
          <div className="relative w-full max-w-[480px] bg-white dark:bg-[#1e293b] rounded-t-[40px] shadow-2xl transform transition-transform duration-500 ease-out overflow-hidden flex flex-col max-h-[94vh] animate-in slide-in-from-bottom duration-500">
            
            {/* Handle Bar */}
            <div className="w-full flex justify-center pt-4 pb-1 bg-white dark:bg-[#1e293b]">
              <div className="w-14 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full opacity-50"></div>
            </div>
            
            {/* Modal Header */}
            <div className="px-8 py-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800/50">
              <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Thời gian sự kiện</h2>
              <button 
                onClick={() => setIsTimePickerOpen(false)}
                className="size-10 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full bg-gray-50 dark:bg-gray-800 shadow-inner"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain no-scrollbar flex-1 pb-10">
              {/* Selected Summary */}
              <div className="px-8 py-6 bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10 border-b border-gray-50 dark:border-gray-800/50">
                <div className="flex items-baseline justify-between">
                  <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                    <p className="text-[10px] font-black text-primary dark:text-blue-400 uppercase tracking-widest mb-2">Bắt đầu lúc</p>
                    <div className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                      <span>{startTime}</span>
                      <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                      <span className="text-xl opacity-60 font-bold">{startDate}</span>
                    </div>
                  </div>
                  <div className="size-14 rounded-2xl bg-white dark:bg-[#253341] shadow-lg flex items-center justify-center text-primary border border-primary/10">
                    <span className="material-symbols-outlined text-[32px] filled">edit_calendar</span>
                  </div>
                </div>
              </div>

              {/* Calendar Control */}
              <div className="px-6 pt-8 pb-4">
                <div className="flex items-center justify-between mb-8 px-2">
                  <button className="size-10 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-500 active:scale-90 transition-all border border-black/5 dark:border-white/5 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                  </button>
                  <span className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tighter">Tháng 10, 2023</span>
                  <button className="size-10 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-500 active:scale-90 transition-all border border-black/5 dark:border-white/5 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-7 mb-6">
                  {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                    <div key={d} className="text-center text-[11px] font-black text-gray-400 uppercase tracking-widest">{d}</div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-y-4 justify-items-center text-sm font-extrabold text-gray-700 dark:text-gray-300 px-2">
                  {Array.from({length: 31}, (_, i) => i + 1).map(day => {
                    const isSelected = day === 20;
                    const isToday = day === 19;
                    const isHighlighted = day === 10 || day === 23;
                    return (
                      <div 
                        key={day} 
                        onClick={() => setStartDate(`${day} Th10, 2023`)}
                        className="relative group cursor-pointer flex flex-col items-center justify-center"
                      >
                        <div className={`size-10 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                          isSelected 
                          ? 'bg-primary text-white shadow-xl shadow-blue-500/40 scale-110 z-10 border-2 border-white/20' 
                          : isToday 
                          ? 'border-2 border-primary text-primary bg-primary/5' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-90'
                        }`}>
                          {day}
                        </div>
                        {isHighlighted && !isSelected && (
                          <div className={`absolute -bottom-1 size-1.5 rounded-full ${day === 10 ? 'bg-blue-500' : 'bg-orange-500'} shadow-sm animate-pulse`}></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="h-px w-full bg-gray-100 dark:bg-gray-800 my-6 mx-8 max-w-[calc(100%-64px)] opacity-50"></div>

              {/* Time Scroller Visual */}
              <div className="px-10 py-4">
                <div className="relative h-48 overflow-hidden bg-gray-50 dark:bg-[#151c27] rounded-[32px] flex items-center justify-center shadow-inner border border-black/5 dark:border-white/5">
                  <div className="absolute w-[85%] h-16 border-y-2 border-primary/30 bg-primary/10 rounded-2xl pointer-events-none z-0 shadow-lg"></div>
                  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-gray-50 dark:from-[#1e293b] to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gray-50 dark:from-[#1e293b] to-transparent z-10 pointer-events-none"></div>
                  
                  <div className="flex items-center gap-14 z-20 h-full">
                    {/* Hour Column */}
                    <div className="flex flex-col items-center gap-5 w-20 select-none">
                      <span className="text-gray-300 dark:text-gray-700 text-xl font-black opacity-30">07</span>
                      <span className="text-gray-400 dark:text-gray-500 text-2xl font-black opacity-60">08</span>
                      <span className="text-primary font-black text-5xl scale-110 drop-shadow-sm transition-transform duration-500">09</span>
                      <span className="text-gray-400 dark:text-gray-500 text-2xl font-black opacity-60">10</span>
                      <span className="text-gray-300 dark:text-gray-700 text-xl font-black opacity-30">11</span>
                    </div>
                    <div className="text-primary/40 dark:text-gray-600 font-black text-4xl pb-1.5 animate-pulse">:</div>
                    {/* Minute Column */}
                    <div className="flex flex-col items-center gap-5 w-20 select-none">
                      <span className="text-gray-300 dark:text-gray-700 text-xl font-black opacity-30">58</span>
                      <span className="text-gray-400 dark:text-gray-500 text-2xl font-black opacity-60">59</span>
                      <span className="text-primary font-black text-5xl scale-110 drop-shadow-sm transition-transform duration-500">00</span>
                      <span className="text-gray-400 dark:text-gray-500 text-2xl font-black opacity-60">01</span>
                      <span className="text-gray-300 dark:text-gray-700 text-xl font-black opacity-30">02</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirm Actions */}
              <div className="p-8 bg-white dark:bg-[#1e293b] flex gap-4 mt-2">
                <button 
                  onClick={() => setIsTimePickerOpen(false)}
                  className="flex-1 py-4.5 rounded-[20px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 transition-all active:scale-95 text-xs"
                >
                  Bỏ qua
                </button>
                <button 
                  onClick={() => {
                    setStartTime('09:00'); // Mock logic
                    setIsTimePickerOpen(false);
                  }}
                  className="flex-1 py-4.5 rounded-[20px] font-black uppercase tracking-[0.2em] text-white bg-primary shadow-2xl shadow-primary/40 active:scale-[0.98] transition-all text-xs border border-white/10"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
