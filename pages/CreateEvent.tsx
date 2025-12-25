
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { getAIResponse } from '../services/geminiService';
import { PROPERTIES } from '../constants';
import { CalendarEvent } from '../types';

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const locationState = useLocation().state as { initialDate?: string } | null;
  const { id } = useParams();
  const isEdit = !!id;

  const [isReminderPickerOpen, setIsReminderPickerOpen] = useState(false);
  const [isConflict, setIsConflict] = useState(false);
  
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [startDate, setStartDate] = useState(locationState?.initialDate || new Date().toISOString().split('T')[0]); 
  const [reminder, setReminder] = useState('30 phút trước');
  const [eventType, setEventType] = useState<CalendarEvent['type']>('visit');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  
  const [isAiLoading, setIsAiLoading] = useState(false);

  const eventTypes = [
    { id: 'visit', label: 'Tham quan', icon: 'home_pin', color: 'bg-primary', light: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 'contract', label: 'Hợp đồng', icon: 'description', color: 'bg-emerald-500', light: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { id: 'meeting', label: 'Gặp mặt', icon: 'groups', color: 'bg-orange-500', light: 'bg-orange-50 dark:bg-orange-900/20' },
    { id: 'payment', label: 'Thanh toán', icon: 'payments', color: 'bg-purple-500', light: 'bg-purple-50 dark:bg-purple-900/20' }
  ];

  // Sync conflict state
  useEffect(() => {
    const saved = localStorage.getItem('goland_events');
    if (saved) {
      const events: CalendarEvent[] = JSON.parse(saved);
      const conflict = events.some(e => e.id !== id && e.date === startDate && e.time === startTime && !e.completed);
      setIsConflict(conflict);
    }
  }, [startDate, startTime, id]);

  // Load event if editing
  useEffect(() => {
    if (isEdit) {
      const saved = localStorage.getItem('goland_events');
      if (saved) {
        const events = JSON.parse(saved);
        const found = events.find((e: CalendarEvent) => e.id === id);
        if (found) {
          setTitle(found.title);
          setStartTime(found.time);
          setStartDate(found.date);
          setLocation(found.location || '');
          setNotes(found.notes || '');
          setReminder(found.reminder || 'Không');
          setEventType(found.type || 'visit');
          setSelectedPropertyId(found.propertyId || '');
        }
      }
    }
  }, [id, isEdit]);

  const handleAISuggest = async () => {
    setIsAiLoading(true);
    const typeLabel = eventTypes.find(t => t.id === eventType)?.label;
    const propName = PROPERTIES.find(p => p.id === selectedPropertyId)?.name || '';
    
    const prompt = `Tôi có một sự kiện "${typeLabel}" ${propName ? `cho dự án ${propName}` : ''}. Hãy gợi ý một tiêu đề chuyên nghiệp và checklist 3 món đồ cần mang theo. Trả về định dạng: "Tiêu đề | Checklist".`;
    
    try {
      const result = await getAIResponse(prompt);
      const parts = result.text.split('|');
      if (parts.length > 0) setTitle(parts[0].trim());
      if (parts.length > 1) setNotes(parts[1].trim());
    } catch (error) {
      console.error("AI failed", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSave = () => {
    if (!title) return alert('Vui lòng nhập tiêu đề');

    const saved = localStorage.getItem('goland_events');
    let existingEvents = saved ? JSON.parse(saved) : [];

    const eventData: CalendarEvent = {
      id: isEdit ? id! : Date.now().toString(),
      title,
      time: startTime,
      type: eventType,
      date: startDate,
      location,
      completed: false,
      notes,
      reminder,
      propertyId: selectedPropertyId
    };

    if (isEdit) {
      existingEvents = existingEvents.map((e: CalendarEvent) => e.id === id ? eventData : e);
    } else {
      existingEvents.push(eventData);
    }

    localStorage.setItem('goland_events', JSON.stringify(existingEvents));
    navigate(-1);
  };

  return (
    <div className="bg-[#f8fafc] dark:bg-background-dark min-h-screen flex flex-col font-display transition-colors duration-300">
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 px-4 h-16 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate(-1)} className="text-gray-500 font-bold hover:text-primary transition-colors flex items-center">
          <span className="material-symbols-outlined mr-1">close</span>
          Hủy
        </button>
        <h2 className="text-lg font-black uppercase tracking-tight dark:text-white">
          {isEdit ? 'Sửa lịch hẹn' : 'Tạo lịch mới'}
        </h2>
        <button onClick={handleSave} className="text-primary font-black uppercase tracking-widest text-sm hover:opacity-80 transition-opacity">Lưu</button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6 pb-24 no-scrollbar">
        
        {/* Type Selection */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Loại sự kiện</label>
          <div className="grid grid-cols-2 gap-3">
            {eventTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setEventType(type.id as any)}
                className={`flex items-center gap-3 p-4 rounded-3xl border transition-all duration-300 ${eventType === type.id ? `ring-2 ring-offset-2 ring-primary ${type.light} border-transparent shadow-lg` : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-800'}`}
              >
                <div className={`${type.color} size-10 rounded-2xl flex items-center justify-center text-white shadow-sm`}>
                  <span className="material-symbols-outlined filled text-xl">{type.icon}</span>
                </div>
                <span className={`text-sm font-black uppercase tracking-tight ${eventType === type.id ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                  {type.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Title Input with AI */}
        <div className="bg-white dark:bg-surface-dark p-5 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tiêu đề</label>
            <button 
              onClick={handleAISuggest}
              disabled={isAiLoading}
              className="flex items-center gap-1.5 text-[10px] font-black uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:scale-105 transition-all"
            >
              <span className={`material-symbols-outlined text-[16px] ${isAiLoading ? 'animate-spin' : 'filled'}`}>auto_awesome</span>
              {isAiLoading ? 'Đang soạn...' : 'AI Soạn giúp'}
            </button>
          </div>
          <input 
            type="text"
            placeholder="VD: Ký cọc nhà phố Masteri..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-none p-0 text-xl font-black text-slate-900 dark:text-white placeholder:text-gray-200 outline-none focus:ring-0"
          />
        </div>

        {/* Date & Time Picker */}
        <div className="bg-white dark:bg-surface-dark p-5 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ngày diễn ra</label>
              <div className="relative">
                <input 
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl h-12 px-4 text-sm font-bold dark:text-white"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Thời gian</label>
              <input 
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl h-12 px-4 text-sm font-bold text-primary"
              />
            </div>
          </div>
          {isConflict && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-2 text-red-500 animate-pulse">
              <span className="material-symbols-outlined text-lg">warning</span>
              <p className="text-[10px] font-bold uppercase tracking-tight">Thời gian này đã có lịch hẹn khác!</p>
            </div>
          )}
        </div>

        {/* Location & Property */}
        <div className="bg-white dark:bg-surface-dark p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Địa điểm / Địa chỉ</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">location_on</span>
              <input 
                type="text"
                placeholder="Nhập địa chỉ hoặc tên dự án"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl text-sm font-bold dark:text-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Dự án liên quan (Tùy chọn)</label>
            <select 
              value={selectedPropertyId}
              onChange={(e) => {
                setSelectedPropertyId(e.target.value);
                const p = PROPERTIES.find(item => item.id === e.target.value);
                if (p && !title) setTitle(`${eventTypes.find(t => t.id === eventType)?.label}: ${p.name}`);
                if (p && !location) setLocation(p.location);
              }}
              className="w-full h-14 bg-gray-50 dark:bg-gray-800/50 border-none rounded-2xl px-5 text-sm font-bold dark:text-white appearance-none"
            >
              <option value="">Chọn một dự án đã lưu</option>
              {PROPERTIES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="bg-white dark:bg-surface-dark p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">Ghi chú & Checklist</label>
          <textarea 
            placeholder="Nhập những lưu ý quan trọng cần chuẩn bị cho buổi hẹn..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full min-h-[120px] bg-gray-50 dark:bg-gray-800/30 rounded-2xl p-4 border-none text-sm font-medium dark:text-gray-300 outline-none focus:ring-1 focus:ring-primary/20 resize-none"
          />
        </div>
      </div>

      {/* Save FAB */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-10 bg-white/90 dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 z-50 max-w-[480px] mx-auto shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleSave}
          className="w-full h-16 bg-primary hover:bg-primary-dark text-white rounded-3xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <span>Xác nhận & Lưu lịch</span>
          <span className="material-symbols-outlined font-black">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
