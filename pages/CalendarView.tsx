
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarEvent } from '../types';

const EVENT_STYLES = {
  visit: { icon: 'home_pin', color: 'text-primary', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  contract: { icon: 'description', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  meeting: { icon: 'groups', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  payment: { icon: 'payments', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' }
};

const CalendarView: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'agenda'>('grid');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = () => {
    const savedEvents = localStorage.getItem('goland_events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  };

  useEffect(() => {
    loadData();
    // Refresh data periodically to sync
    const interval = setInterval(loadData, 1000);
    return () => clearInterval(interval);
  }, []);

  const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
      if (viewMode === 'grid') {
        return e.date === selectedDateStr && matchesSearch;
      }
      return matchesSearch;
    }).sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
  }, [events, selectedDateStr, searchQuery, viewMode]);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getStartOffset = () => new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handleToggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = events.map(ev => ev.id === id ? { ...ev, completed: !ev.completed } : ev);
    setEvents(updated);
    localStorage.setItem('goland_events', JSON.stringify(updated));
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display pb-32">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/95 backdrop-blur-md p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate('/home')} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl">
          <button onClick={() => setViewMode('grid')} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-400'}`}>Lịch</button>
          <button onClick={() => setViewMode('agenda')} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${viewMode === 'agenda' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-400'}`}>Tất cả</button>
        </div>
        <button onClick={() => navigate('/create-event')} className="size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      {/* Search Bar */}
      <div className="px-4 pt-6 pb-2">
        <div className="bg-white dark:bg-surface-dark flex items-center px-4 h-14 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <span className="material-symbols-outlined text-gray-400">search</span>
          <input 
            type="text" 
            placeholder="Tìm kiếm lịch trình..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold ml-2"
          />
        </div>
      </div>

      {viewMode === 'grid' && (
        <div className="p-4">
          <div className="bg-white dark:bg-surface-dark rounded-[2.5rem] shadow-soft border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="flex items-center justify-between p-6">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                Tháng {currentDate.getMonth() + 1}, {currentDate.getFullYear()}
              </h3>
              <div className="flex gap-2">
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="size-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center"><span className="material-symbols-outlined">chevron_left</span></button>
                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="size-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center"><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>
            <div className="grid grid-cols-7 text-center pb-4 px-2">
              {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => (
                <span key={d} className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-px bg-gray-100 dark:bg-gray-800 p-px">
              {Array.from({ length: getStartOffset() }).map((_, i) => (
                <div key={`offset-${i}`} className="aspect-square bg-white dark:bg-surface-dark opacity-40"></div>
              ))}
              {Array.from({ length: daysInMonth(currentDate.getFullYear(), currentDate.getMonth()) }, (_, i) => i + 1).map(day => {
                const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayEvents = events.filter(e => e.date === dateStr);
                const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth();
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                    className={`aspect-square bg-white dark:bg-surface-dark relative flex flex-col items-center justify-center transition-all ${isSelected ? 'z-10' : ''}`}
                  >
                    <div className={`size-10 rounded-2xl flex items-center justify-center text-sm font-black transition-all ${isSelected ? 'bg-primary text-white shadow-glow scale-110' : 'text-slate-600 dark:text-slate-300'}`}>
                      {day}
                    </div>
                    <div className="absolute bottom-1 flex gap-0.5">
                      {dayEvents.slice(0, 3).map((ev, idx) => (
                        <div key={idx} className={`size-1 rounded-full ${EVENT_STYLES[ev.type as keyof typeof EVENT_STYLES]?.color.replace('text-', 'bg-') || 'bg-gray-300'}`}></div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="px-4 flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-between px-2 mb-2">
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
             {viewMode === 'grid' ? 'Lịch trình trong ngày' : 'Tất cả lịch trình'}
           </h3>
           <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">{filteredEvents.length} Sự kiện</span>
        </div>
        
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => {
            const style = EVENT_STYLES[event.type as keyof typeof EVENT_STYLES] || EVENT_STYLES.meeting;
            return (
              <div 
                key={event.id}
                onClick={() => navigate(`/event/${event.id}`)}
                className={`flex items-center gap-4 bg-white dark:bg-surface-dark p-5 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 transition-all active:scale-95 cursor-pointer ${event.completed ? 'opacity-40 grayscale' : ''}`}
              >
                <div className={`${style.bg} ${style.color} size-14 rounded-3xl flex items-center justify-center shrink-0 shadow-sm ring-1 ring-inset ring-black/5`}>
                  <span className="material-symbols-outlined filled text-2xl">{style.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-black uppercase tracking-tight truncate dark:text-white">{event.title}</h4>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                    <span className="flex items-center gap-1 text-primary"><span className="material-symbols-outlined text-[14px]">schedule</span>{event.time}</span>
                    <span className="flex items-center gap-1 truncate"><span className="material-symbols-outlined text-[14px]">location_on</span>{event.location || 'N/A'}</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => handleToggleComplete(event.id, e)}
                  className={`size-10 rounded-2xl border-2 flex items-center justify-center transition-all ${event.completed ? 'bg-primary border-primary text-white' : 'border-gray-100 dark:border-gray-800 text-gray-300'}`}
                >
                  <span className="material-symbols-outlined text-[20px] font-black">{event.completed ? 'check' : 'radio_button_unchecked'}</span>
                </button>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-30 text-center">
            <span className="material-symbols-outlined text-6xl mb-4">event_note</span>
            <p className="text-sm font-black uppercase tracking-widest px-10 leading-relaxed">Không có lịch hẹn nào phù hợp tiêu chí</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => navigate('/create-event', { state: { initialDate: selectedDateStr } })}
        className="fixed bottom-28 right-6 z-[60] size-16 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group"
      >
        <span className="material-symbols-outlined text-3xl font-black group-hover:rotate-90 transition-transform">add</span>
      </button>
    </div>
  );
};

export default CalendarView;
