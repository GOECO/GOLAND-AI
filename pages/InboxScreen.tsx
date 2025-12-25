
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  type: 'price_drop' | 'new_project' | 'area_update' | 'ai_suggestion';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  image?: string;
  targetPath: string;
  aiNote?: string;
}

const InboxScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'price_drop',
      title: 'Giảm giá cực sốc!',
      message: 'Căn hộ The Matrix One bạn đang theo dõi vừa giảm 500 triệu VNĐ. Kiểm tra ngay cơ hội đầu tư này.',
      time: '10 phút trước',
      isRead: false,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80',
      targetPath: '/property/1',
      aiNote: 'Goland AI: Mức giá này đang thấp hơn 8% so với trung bình khu vực.'
    },
    {
      id: '2',
      type: 'new_project',
      title: 'Dự án mới tại Quận 2',
      message: 'Masteri Grand View vừa công bố bảng hàng đợt 1. Xem ngay vị trí và giá bán sơ bộ.',
      time: '2 giờ trước',
      isRead: false,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80',
      targetPath: '/saved'
    },
    {
      id: '3',
      type: 'ai_suggestion',
      title: 'Gợi ý từ Goland AI',
      message: 'Dựa trên sở thích của bạn, tôi tìm thấy 3 biệt thự vườn tại Thủ Đức có pháp lý hoàn chỉnh.',
      time: 'Hôm qua',
      isRead: true,
      targetPath: '/chat'
    },
    {
      id: '4',
      type: 'area_update',
      title: 'Cập nhật Quy hoạch',
      message: 'Bản đồ quy hoạch phân khu tại Phường Thạnh Mỹ Lợi vừa được cập nhật. Kiểm tra thay đổi.',
      time: '2 ngày trước',
      isRead: true,
      targetPath: '/map'
    }
  ]);

  const filters = ['Tất cả', 'Giá bán', 'Dự án', 'AI'];

  const markAsRead = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const getTypeStyles = (type: Notification['type']) => {
    switch (type) {
      case 'price_drop': return { icon: 'trending_down', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' };
      case 'new_project': return { icon: 'apartment', color: 'text-primary', bg: 'bg-blue-50 dark:bg-blue-900/20' };
      case 'ai_suggestion': return { icon: 'auto_awesome', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' };
      case 'area_update': return { icon: 'map', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' };
      default: return { icon: 'notifications', color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-gray-800' };
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display antialiased transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center bg-white dark:bg-surface-dark p-4 pb-3 justify-between shadow-sm border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-black leading-tight tracking-tight flex-1 uppercase text-text-main dark:text-white">Thông báo</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/alert-settings')}
            className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-text-sub dark:text-gray-400">settings</span>
          </button>
        </div>
      </header>

      {/* Filter Chips */}
      <div className="flex gap-2 px-4 py-4 overflow-x-auto no-scrollbar bg-white dark:bg-surface-dark border-b border-gray-50 dark:border-gray-800">
        {filters.map((filter) => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex h-9 shrink-0 items-center justify-center rounded-full px-5 transition-all active:scale-95 border ${
              activeFilter === filter 
              ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 font-bold' 
              : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium'
            }`}
          >
            <p className="text-sm uppercase tracking-tight">{filter}</p>
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col flex-1 pb-32">
        {notifications.length > 0 ? (
          notifications.map((notif) => {
            const styles = getTypeStyles(notif.type);
            return (
              <div 
                key={notif.id}
                onClick={() => navigate(notif.targetPath)}
                className={`relative flex gap-4 p-4 border-b border-gray-50 dark:border-gray-800 transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/40 ${!notif.isRead ? 'bg-blue-50/30 dark:bg-blue-900/5' : ''}`}
              >
                {!notif.isRead && (
                  <div className="absolute top-4 left-2 w-1.5 h-1.5 bg-primary rounded-full"></div>
                )}
                
                <div className="shrink-0 pt-1 pl-1">
                  <div className={`size-12 rounded-2xl flex items-center justify-center ${styles.bg} ${styles.color} shadow-sm ring-1 ring-inset ring-black/5`}>
                    <span className="material-symbols-outlined filled" style={{ fontSize: '24px' }}>{styles.icon}</span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className={`text-[15px] leading-tight truncate ${!notif.isRead ? 'font-black text-text-main dark:text-white' : 'font-bold text-gray-700 dark:text-gray-300'}`}>
                      {notif.title}
                    </h3>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest shrink-0 ml-2 pt-0.5">
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 font-medium">
                    {notif.message}
                  </p>

                  {notif.aiNote && (
                    <div className="mt-2 flex items-center gap-2 p-2 rounded-lg bg-primary/5 border border-primary/10">
                       <span className="material-symbols-outlined text-[14px] text-primary filled">auto_awesome</span>
                       <p className="text-[11px] font-bold text-primary italic leading-tight">{notif.aiNote}</p>
                    </div>
                  )}
                  
                  {notif.image && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm aspect-video relative group">
                      <img src={notif.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Preview" />
                      {notif.type === 'price_drop' && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="bg-white/90 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase text-primary shadow-lg">Xem biểu đồ giá</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-3 flex gap-2">
                    <button className="text-[11px] font-black uppercase text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors">
                      Xem chi tiết
                    </button>
                    {!notif.isRead && (
                       <button 
                        onClick={(e) => markAsRead(e, notif.id)}
                        className="text-[11px] font-black uppercase text-gray-400 hover:text-gray-600 dark:text-gray-500 px-3 py-1.5 rounded-lg transition-colors"
                       >
                         Đánh dấu đã đọc
                       </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-10 text-center opacity-30">
            <span className="material-symbols-outlined text-6xl mb-4">notifications_none</span>
            <p className="text-sm font-black uppercase tracking-widest">Không có thông báo nào</p>
          </div>
        )}

        {/* Floating Action Hint */}
        <div className="p-8 flex flex-col items-center gap-4 text-center">
          <div className="size-16 rounded-full bg-gray-50 dark:bg-gray-800/40 flex items-center justify-center text-gray-300 dark:text-gray-600">
            <span className="material-symbols-outlined text-3xl">smart_toy</span>
          </div>
          <div>
            <h4 className="text-sm font-black text-text-main dark:text-white uppercase tracking-tight">Bạn muốn nhận thêm cảnh báo?</h4>
            <p className="text-xs text-text-sub dark:text-gray-400 mt-1 font-bold">Hãy tạo các cảnh báo tùy chỉnh để không bỏ lỡ cơ hội tốt nhất.</p>
          </div>
          <button 
            onClick={() => navigate('/create-alert')}
            className="px-8 py-3 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 active:scale-95 transition-all"
          >
            Tạo cảnh báo mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default InboxScreen;
