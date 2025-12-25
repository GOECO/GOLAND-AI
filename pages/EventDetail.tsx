
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CalendarEvent, Property } from '../types';
import { PROPERTIES } from '../constants';
import { getAIResponse } from '../services/geminiService';

const EVENT_ILLUSTRATIONS = {
  visit: {
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    icon: 'home_pin',
    color: 'bg-primary',
    label: 'Tham quan nhà'
  },
  contract: {
    img: 'https://images.unsplash.com/photo-1554224155-1696413575b8?auto=format&fit=crop&w=800&q=80',
    icon: 'description',
    color: 'bg-emerald-500',
    label: 'Ký kết hợp đồng'
  },
  meeting: {
    img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    icon: 'groups',
    color: 'bg-orange-500',
    label: 'Họp mặt khách hàng'
  },
  payment: {
    img: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=800&q=80',
    icon: 'payments',
    color: 'bg-purple-500',
    label: 'Thanh toán & Cọc'
  }
};

const EventDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [eventData, setEventData] = useState<CalendarEvent | null>(null);
  const [linkedProperty, setLinkedProperty] = useState<Property | null>(null);
  const [aiTip, setAiTip] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('goland_events');
    if (saved) {
      const events: CalendarEvent[] = JSON.parse(saved);
      const found = events.find(e => e.id === id);
      if (found) {
        setEventData(found);
        if (found.propertyId) {
          const prop = PROPERTIES.find(p => p.id === found.propertyId);
          if (prop) setLinkedProperty(prop);
        }
      }
    }
  }, [id]);

  useEffect(() => {
    const fetchTip = async () => {
      if (!eventData) return;
      setIsLoading(true);
      const prompt = `Đây là sự kiện bất động sản: "${eventData.title}" loại ${eventData.type}. Hãy đưa ra 1 mẹo chuẩn bị quan trọng nhất cho loại sự kiện này để gây ấn tượng với khách hàng. Trả lời cực ngắn gọn.`;
      try {
        const result = await getAIResponse(prompt);
        setAiTip(result.text);
      } catch (error) {
        setAiTip('Nhớ kiểm tra kỹ hồ sơ pháp lý trước khi gặp khách hàng.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTip();
  }, [eventData]);

  const handleToggleComplete = () => {
    if (!eventData) return;
    const saved = localStorage.getItem('goland_events');
    if (saved) {
      const events: CalendarEvent[] = JSON.parse(saved);
      const updated = events.map(e => e.id === id ? { ...e, completed: !e.completed } : e);
      localStorage.setItem('goland_events', JSON.stringify(updated));
      setEventData({ ...eventData, completed: !eventData.completed });
    }
  };

  const handleDelete = () => {
    if (confirm('Bạn chắc chắn muốn xóa lịch hẹn này?')) {
      const saved = localStorage.getItem('goland_events');
      if (saved) {
        const events: CalendarEvent[] = JSON.parse(saved);
        localStorage.setItem('goland_events', JSON.stringify(events.filter(e => e.id !== id)));
      }
      navigate('/calendar');
    }
  };

  if (!eventData) return null;

  const illustration = EVENT_ILLUSTRATIONS[eventData.type as keyof typeof EVENT_ILLUSTRATIONS] || EVENT_ILLUSTRATIONS.meeting;

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display transition-colors">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-black uppercase tracking-tight dark:text-white truncate max-w-[200px]">Chi tiết sự kiện</h2>
        <div className="flex gap-2">
          <button onClick={() => navigate(`/edit-event/${id}`)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button onClick={handleDelete} className="size-10 flex items-center justify-center rounded-full hover:bg-red-50 text-red-500 transition-colors">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </header>

      <main className="flex-1 pb-32 flex flex-col gap-6 overflow-y-auto no-scrollbar">
        {/* Hero Illustration */}
        <div className="relative h-60 w-full overflow-hidden">
          <img src={illustration.img} className="size-full object-cover" alt={eventData.type} />
          <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent"></div>
          <div className="absolute top-6 left-6 flex items-center gap-3">
             <div className={`${illustration.color} size-12 rounded-2xl flex items-center justify-center text-white border-2 border-white/20 shadow-xl`}>
               <span className="material-symbols-outlined text-2xl filled">{illustration.icon}</span>
             </div>
             <div className="bg-white/80 dark:bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
               <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">{illustration.label}</span>
             </div>
          </div>
        </div>

        <div className="px-4 -mt-12 relative z-10">
          {/* Status & Title */}
          <div className="bg-white dark:bg-surface-dark p-6 rounded-[2.5rem] shadow-soft border border-gray-100 dark:border-gray-800">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 ${eventData.completed ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'}`}>
              {eventData.completed ? 'Đã hoàn thành' : 'Sắp diễn ra'}
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase leading-tight tracking-tight mb-2">
              {eventData.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Lên lịch vào {eventData.date} lúc {eventData.time}</p>
          </div>
        </div>

        <div className="px-4 flex flex-col gap-6">
          {/* AI Smart Tip */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-5 rounded-3xl text-white shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[80px]">lightbulb</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-xl filled">auto_awesome</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Lời khuyên từ Goland AI</span>
              </div>
              <p className="text-sm font-bold leading-relaxed italic">
                {isLoading ? 'Đang chuẩn bị lời khuyên...' : `"${aiTip}"`}
              </p>
            </div>
          </div>

          {/* Key Info Grid */}
          <div className="grid gap-3">
            <div className="bg-white dark:bg-surface-dark p-4 rounded-3xl flex items-center gap-4 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="size-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined filled">location_on</span>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Địa điểm</p>
                <p className="text-sm font-bold dark:text-white truncate">{eventData.location || 'Chưa cập nhật'}</p>
              </div>
              {eventData.location && (
                <button onClick={() => navigate('/map')} className="ml-auto size-10 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-[20px]">map</span>
                </button>
              )}
            </div>

            <div className="bg-white dark:bg-surface-dark p-4 rounded-3xl flex items-center gap-4 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="size-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined filled">notifications_active</span>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nhắc nhở</p>
                <p className="text-sm font-bold dark:text-white">{eventData.reminder}</p>
              </div>
            </div>
          </div>

          {/* Linked Property */}
          {linkedProperty && (
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Dự án liên quan</h3>
              <div 
                onClick={() => navigate(`/property/${linkedProperty.id}`)}
                className="bg-white dark:bg-surface-dark p-3 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4 cursor-pointer hover:border-primary/30 transition-all group"
              >
                <div className="size-16 rounded-2xl overflow-hidden shrink-0">
                  <img src={linkedProperty.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={linkedProperty.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-black dark:text-white truncate uppercase tracking-tight">{linkedProperty.name}</h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{linkedProperty.location}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs font-black text-primary">{linkedProperty.price}</span>
                    <span className="size-1 rounded-full bg-gray-300"></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{linkedProperty.area}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-300 mr-2 group-hover:text-primary transition-colors">arrow_forward_ios</span>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Ghi chú & Chi tiết</h3>
            <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap font-medium">
                {eventData.notes || 'Không có ghi chú thêm.'}
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 pb-10 bg-white/90 dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 z-50">
        <div className="flex gap-3 max-w-md mx-auto">
          <button 
            onClick={() => navigate('/share-preview')}
            className="size-14 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[24px]">share</span>
          </button>
          <button 
            onClick={handleToggleComplete}
            className={`flex-1 h-14 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-sm shadow-xl transition-all active:scale-[0.98] ${eventData.completed ? 'bg-gray-100 text-gray-400' : 'bg-primary text-white shadow-primary/25 hover:bg-primary-dark'}`}
          >
            {eventData.completed ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
            <span className="material-symbols-outlined text-[20px]">{eventData.completed ? 'verified' : 'check_circle'}</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default EventDetail;
