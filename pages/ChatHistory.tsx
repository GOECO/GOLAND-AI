
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RenameChatModal from '../components/RenameChatModal';

interface ChatItemProps {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  isPinned?: boolean;
  iconColor?: string;
  iconBg?: string;
  onRename: (id: string, currentTitle: string) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ 
  id,
  icon, 
  title, 
  subtitle, 
  isPinned = false,
  iconColor = "text-text-sub-light dark:text-text-sub-dark",
  iconBg = "bg-[#f0f2f4] dark:bg-[#253341]",
  onRename
}) => {
  const navigate = useNavigate();

  return (
    <div 
      className={`group flex items-center gap-4 bg-surface-light dark:bg-surface-dark px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1f2e3d] transition-colors border-l-4 ${
        isPinned ? 'border-primary' : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
      }`}
    >
      <div className="relative shrink-0" onClick={() => navigate('/chat')}>
        <div className={`flex items-center justify-center rounded-xl size-12 shadow-sm ${
          isPinned ? 'bg-primary/10 dark:bg-primary/20 text-primary' : `${iconBg} ${iconColor}`
        }`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {isPinned && (
          <div className="absolute -bottom-1 -right-1 bg-surface-light dark:bg-surface-dark rounded-full p-0.5 shadow-sm border border-black/5">
            <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>push_pin</span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center flex-1 min-w-0" onClick={() => navigate('/chat')}>
        <div className="flex justify-between items-baseline mb-0.5">
          <p className={`text-base leading-normal truncate pr-2 ${
            isPinned ? 'text-text-main-light dark:text-text-main-dark font-bold' : 'text-text-main-light dark:text-text-main-dark font-medium'
          }`}>
            {title}
          </p>
        </div>
        <p className="text-text-sub-light dark:text-text-sub-dark text-xs font-normal leading-normal truncate">{subtitle}</p>
      </div>
      <div className="shrink-0">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRename(id, title);
          }}
          className="text-text-sub-light dark:text-text-sub-dark hover:text-primary dark:hover:text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="material-symbols-outlined">edit</span>
        </button>
      </div>
    </div>
  );
};

const ChatHistory: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [renamingChat, setRenamingChat] = useState<{id: string, title: string} | null>(null);

  const filters = ['Tất cả', 'Đã ghim', 'Gần đây', 'Tư vấn'];

  const handleRename = (id: string, title: string) => {
    setRenamingChat({ id, title });
  };

  const handleSaveRename = (newTitle: string) => {
    console.log(`Saving new title for ${renamingChat?.id}: ${newTitle}`);
    setRenamingChat(null);
    // In a real app, update the state/db here
  };

  return (
    <div className={`relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display antialiased transition-colors duration-200 ${renamingChat ? 'overflow-hidden' : ''}`}>
      {/* Header */}
      <div className={`sticky top-0 z-50 flex items-center bg-surface-light dark:bg-surface-dark px-4 py-3 justify-between border-b border-gray-100 dark:border-gray-800 shadow-sm transition-all ${renamingChat ? 'opacity-30 blur-[2px] pointer-events-none' : ''}`}>
        <div 
          onClick={() => navigate(-1)}
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer text-text-main-light dark:text-text-main-dark active:scale-90"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </div>
        <h2 className="text-text-main-light dark:text-text-main-dark text-xl font-bold leading-tight tracking-tight flex-1 text-center">
          Lịch sử Chat
        </h2>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer text-text-main-light dark:text-text-main-dark">
          <span className="material-symbols-outlined">settings</span>
        </div>
      </div>

      {/* Content Container (Blurred when modal open) */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${renamingChat ? 'opacity-30 blur-[2px] pointer-events-none' : ''}`}>
        {/* Search Bar */}
        <div className="px-4 py-4 bg-surface-light dark:bg-surface-dark transition-colors">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-12 bg-[#f0f2f4] dark:bg-[#253341] overflow-hidden transition-colors shadow-inner">
            <div className="text-text-sub-light dark:text-text-sub-dark flex items-center justify-center pl-4 pr-2">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className="flex w-full min-w-0 flex-1 bg-transparent border-none text-text-main-light dark:text-text-main-dark focus:outline-none focus:ring-0 h-full placeholder:text-text-sub-light dark:placeholder:text-text-sub-dark px-2 text-base font-normal" 
              placeholder="Tìm kiếm cuộc trò chuyện..."
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar bg-surface-light dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800 transition-colors">
          {filters.map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-all active:scale-95 ${
                activeFilter === filter 
                ? 'bg-primary text-white font-bold shadow-md shadow-primary/20' 
                : 'bg-[#f0f2f4] dark:bg-[#253341] text-text-main-light dark:text-text-main-dark font-medium hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <p className="text-sm leading-normal">{filter}</p>
            </button>
          ))}
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
          <div className="mt-2">
            <h3 className="text-text-sub-light dark:text-text-sub-dark text-sm font-bold uppercase tracking-wider px-4 py-3">Đã ghim</h3>
            <ChatItem 
              id="pinned-1"
              icon="apartment"
              title="Đầu tư Vinhomes Ocean Park"
              subtitle="Cập nhật 10 phút trước"
              isPinned={true}
              onRename={handleRename}
            />
            <ChatItem 
              id="pinned-2"
              icon="query_stats"
              title="Phân tích giá Quận 2"
              subtitle="Cập nhật hôm qua"
              isPinned={true}
              onRename={handleRename}
            />
          </div>

          <div className="mt-2">
            <h3 className="text-text-sub-light dark:text-text-sub-dark text-sm font-bold uppercase tracking-wider px-4 py-3">Gần đây</h3>
            <ChatItem 
              id="recent-1"
              icon="home"
              title="Tìm chung cư Quận 1 < 5 tỷ"
              subtitle="Cập nhật 2 giờ trước"
              onRename={handleRename}
            />
            <ChatItem 
              id="recent-2"
              icon="gavel"
              title="Thủ tục sang tên sổ đỏ"
              subtitle="Cập nhật 2 ngày trước"
              onRename={handleRename}
            />
          </div>

          <div className="flex flex-col items-center justify-center pt-10 pb-10 opacity-30">
            <span className="material-symbols-outlined text-5xl text-text-sub-light dark:text-text-sub-dark mb-2">smart_toy</span>
            <p className="text-xs text-text-sub-light dark:text-text-sub-dark font-bold uppercase tracking-widest">Hết danh sách</p>
          </div>
        </div>
      </div>

      {/* FAB */}
      <div className={`fixed bottom-24 right-6 z-30 transition-all ${renamingChat ? 'opacity-30 blur-[2px] pointer-events-none scale-90' : 'opacity-100 scale-100'}`}>
        <button 
          onClick={() => navigate('/chat')}
          className="flex items-center justify-center size-14 rounded-full bg-primary text-white shadow-[0_4px_14px_rgba(19,127,236,0.4)] hover:shadow-[0_6px_20px_rgba(19,127,236,0.6)] hover:scale-105 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-3xl font-bold">add_comment</span>
        </button>
      </div>

      {/* Rename Modal Overlay */}
      {renamingChat && (
        <RenameChatModal 
          initialValue={renamingChat.title}
          onClose={() => setRenamingChat(null)}
          onSave={handleSaveRename}
        />
      )}
    </div>
  );
};

export default ChatHistory;
