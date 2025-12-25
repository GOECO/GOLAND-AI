
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PersonalEvent {
  id: string;
  title: string;
  time: string;
  location: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  aiSuggestion?: string;
  date: string;
  status: 'upcoming' | 'past';
}

const PersonalEvents: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

  const events: PersonalEvent[] = [
    {
      id: '1',
      title: 'Xem căn hộ Vinhomes Smart City',
      time: '09:00 - 10:30',
      location: 'Tây Mỗ, Nam Từ Liêm, Hà Nội',
      icon: 'calendar_month',
      colorClass: 'text-primary',
      bgClass: 'bg-blue-50 dark:bg-primary/20',
      aiSuggestion: 'Goland AI gợi ý đi sớm 15p để tránh tắc đường.',
      date: 'Hôm nay, 24 Tháng 10',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Ký hợp đồng thuê nhà',
      time: '14:00 - 15:00',
      location: 'Văn phòng công chứng số 1',
      icon: 'description',
      colorClass: 'text-green-600',
      bgClass: 'bg-green-50 dark:bg-green-900/20',
      date: 'Hôm nay, 24 Tháng 10',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Gặp khách hàng Nguyễn Văn A',
      time: '10:00 - 11:30',
      location: 'Highlands Coffee, Quận 1',
      icon: 'person',
      colorClass: 'text-orange-600',
      bgClass: 'bg-orange-50 dark:bg-orange-900/20',
      date: 'Ngày mai, 25 Tháng 10',
      status: 'upcoming'
    },
    {
      id: '4',
      title: 'Đóng tiền cọc đợt 2',
      time: '15:30 - 16:00',
      location: 'Ngân hàng Techcombank',
      icon: 'payments',
      colorClass: 'text-purple-600',
      bgClass: 'bg-purple-50 dark:bg-purple-900/20',
      date: 'Ngày mai, 25 Tháng 10',
      status: 'upcoming'
    }
  ];

  const filteredEvents = events.filter(e => e.status === filter);
  
  // Group events by date
  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const date = event.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(event);
    return groups;
  }, {} as Record<string, PersonalEvent[]>);

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white pb-24">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white dark:bg-[#1A2633] px-4 py-3 shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="flex size-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white uppercase tracking-tighter">
          Sự kiện Cá nhân
        </h1>
        <div className="size-10"></div> 
      </header>

      {/* Segmented Control Filter */}
      <div className="sticky top-[60px] z-40 bg-background-light dark:bg-background-dark px-4 py-4 backdrop-blur-md bg-opacity-95 dark:bg-opacity-95">
        <div className="flex h-12 w-full items-center justify-center rounded-2xl bg-slate-200/50 dark:bg-slate-800/50 p-1">
          <button 
            onClick={() => setFilter('upcoming')}
            className={`relative flex h-full flex-1 items-center justify-center rounded-xl transition-all duration-300 font-bold text-sm ${filter === 'upcoming' ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
          >
            Sắp tới
          </button>
          <button 
            onClick={() => setFilter('past')}
            className={`relative flex h-full flex-1 items-center justify-center rounded-xl transition-all duration-300 font-bold text-sm ${filter === 'past' ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
          >
            Đã qua
          </button>
        </div>
      </div>

      {/* Event List Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {Object.entries(groupedEvents).length > 0 ? (
          Object.entries(groupedEvents).map(([date, dateEvents]) => (
            <div key={date} className="mb-6">
              <div className="px-5 pb-3 pt-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">{date}</h3>
              </div>
              
              <div className="space-y-3 px-4">
                {dateEvents.map((event) => (
                  <div 
                    key={event.id}
                    className="group relative overflow-hidden rounded-[20px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] dark:bg-[#1A2633] dark:shadow-none border border-black/5 dark:border-white/5 transition-all active:scale-[0.98] hover:shadow-md"
                  >
                    <div className="flex flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-4">
                          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${event.bgClass} ${event.colorClass} shadow-sm ring-1 ring-inset ring-black/5`}>
                            <span className="material-symbols-outlined filled" style={{ fontSize: '24px' }}>{event.icon}</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <p className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-1 leading-tight">{event.title}</p>
                            <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500">
                              <span className="material-symbols-outlined text-[14px]">schedule</span>
                              <span>{event.time}</span>
                            </div>
                            <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500">
                              <span className="material-symbols-outlined text-[14px]">location_on</span>
                              <span className="line-clamp-1">{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <button className="shrink-0 rounded-full p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </div>

                      {/* AI Suggestion Chip */}
                      {event.aiSuggestion && (
                        <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-900/20 px-4 py-2 border border-indigo-100/50 dark:border-indigo-800/30">
                          <span className="material-symbols-outlined text-[18px] text-indigo-600 dark:text-indigo-400 filled">auto_awesome</span>
                          <p className="text-[11px] font-bold text-indigo-700/80 dark:text-indigo-300/80 italic leading-snug">
                            {event.aiSuggestion}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-10 text-center opacity-40">
            <span className="material-symbols-outlined text-6xl mb-4">event_busy</span>
            <p className="text-sm font-bold uppercase tracking-widest">Chưa có sự kiện nào</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => navigate('/create-event')}
        className="fixed bottom-10 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-2xl shadow-primary/40 transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/20"
      >
        <span className="material-symbols-outlined text-3xl font-bold">add</span>
      </button>
    </div>
  );
};

export default PersonalEvents;
