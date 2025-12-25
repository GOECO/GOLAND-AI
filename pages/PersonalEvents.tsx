
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarEvent } from '../types';

const PersonalEvents: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('goland_events');
    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }, []);

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'visit': return { icon: 'calendar_month', color: 'text-primary', bg: 'bg-blue-50 dark:bg-primary/20' };
      case 'contract': return { icon: 'description', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' };
      case 'meeting': return { icon: 'person', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' };
      case 'payment': return { icon: 'payments', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' };
      default: return { icon: 'event', color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-800' };
    }
  };

  const filteredEvents = events.filter(e => {
    const eventDate = new Date(e.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (filter === 'upcoming') {
      return eventDate >= today;
    } else {
      return eventDate < today;
    }
  }).sort((a, b) => {
    return filter === 'upcoming' 
      ? a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
      : b.date.localeCompare(a.date) || b.time.localeCompare(a.time);
  });
  
  // Group events by date string for display
  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const date = event.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(event);
    return groups;
  }, {} as Record<string, CalendarEvent[]>);

  const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.getTime() === today.getTime()) return 'Hôm nay, ' + date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long' });
    if (date.getTime() === tomorrow.getTime()) return 'Ngày mai, ' + date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long' });
    
    return date.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' });
  };

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
          (Object.entries(groupedEvents) as [string, CalendarEvent[]][]).map(([dateStr, dateEvents]) => (
            <div key={dateStr} className="mb-6">
              <div className="px-5 pb-3 pt-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">{formatDateLabel(dateStr)}</h3>
              </div>
              
              <div className="space-y-3 px-4">
                {dateEvents.map((event) => {
                  const styles = getTypeStyles(event.type);
                  return (
                    <div 
                      key={event.id}
                      onClick={() => navigate(`/event/${event.id}`)}
                      className="group relative overflow-hidden rounded-[20px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)] dark:bg-[#1A2633] dark:shadow-none border border-black/5 dark:border-white/5 transition-all active:scale-[0.98] hover:shadow-md cursor-pointer"
                    >
                      <div className="flex flex-col p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-4">
                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${styles.bg} ${styles.color} shadow-sm ring-1 ring-inset ring-black/5`}>
                              <span className="material-symbols-outlined filled" style={{ fontSize: '24px' }}>{styles.icon}</span>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <p className={`text-base font-extrabold text-slate-900 dark:text-white line-clamp-1 leading-tight uppercase tracking-tight ${event.completed ? 'line-through opacity-50' : ''}`}>{event.title}</p>
                              <div className="mt-2 flex items-center gap-3 text-xs font-bold text-slate-400 dark:text-slate-500">
                                <div className="flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                                  <span>{event.time}</span>
                                </div>
                                {event.reminder !== 'Không' && !event.completed && (
                                  <div className="flex items-center gap-1 text-primary">
                                    <span className="material-symbols-outlined text-[14px] filled">notifications</span>
                                    <span>{event.reminder}</span>
                                  </div>
                                )}
                              </div>
                              {event.location && (
                                <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500">
                                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                                  <span className="line-clamp-1">{event.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <button className="shrink-0 rounded-full p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 transition-colors">
                            <span className="material-symbols-outlined">chevron_right</span>
                          </button>
                        </div>

                        {/* AI Suggestion Simulated Placeholder */}
                        {!event.completed && (
                          <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-900/20 px-4 py-2 border border-indigo-100/50 dark:border-indigo-800/30">
                            <span className="material-symbols-outlined text-[18px] text-indigo-600 dark:text-indigo-400 filled">auto_awesome</span>
                            <p className="text-[11px] font-bold text-indigo-700/80 dark:text-indigo-300/80 italic leading-snug">
                              AI: Đã tối ưu hóa lịch trình cho bạn.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-10 text-center opacity-40">
            <span className="material-symbols-outlined text-6xl mb-4">event_busy</span>
            <p className="text-sm font-bold uppercase tracking-widest">Chưa có sự kiện nào</p>
            <button 
              onClick={() => navigate('/create-event')}
              className="mt-6 bg-primary text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
            >
              Lên lịch ngay
            </button>
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
