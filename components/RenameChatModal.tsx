
import React, { useState, useEffect, useRef } from 'react';

interface RenameChatModalProps {
  initialValue: string;
  onClose: () => void;
  onSave: (newValue: string) => void;
}

const RenameChatModal: React.FC<RenameChatModalProps> = ({ initialValue, onClose, onSave }) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const maxLength = 30;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // Set cursor to the end
      inputRef.current.setSelectionRange(value.length, value.length);
    }
  }, []);

  const handleClear = () => {
    setValue('');
    inputRef.current?.focus();
  };

  const handleSave = () => {
    if (value.trim()) {
      onSave(value.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-start pt-32 sm:justify-center sm:pt-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 z-0" 
        onClick={onClose}
      />
      
      {/* Dialog Card */}
      <div className="relative z-10 w-[90%] max-w-[340px] bg-white dark:bg-[#1e2936] rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-300">
        {/* Title Section */}
        <div className="px-6 pt-7 pb-2 text-center">
          <h2 className="text-[#111418] dark:text-white text-[20px] font-bold leading-tight tracking-tight">
            Đổi tên cuộc trò chuyện
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2.5 font-medium px-2">
            Đặt tên dễ nhớ để bạn tìm lại sau này.
          </p>
        </div>

        {/* Input Section */}
        <div className="px-5 py-5">
          <div className="flex flex-col w-full gap-2">
            <div className="flex w-full items-center rounded-xl bg-background-light dark:bg-[#101922] border-2 border-primary/40 focus-within:border-primary transition-all overflow-hidden shadow-inner">
              <input 
                ref={inputRef}
                className="flex w-full min-w-0 flex-1 resize-none bg-transparent h-12 px-4 text-[#111418] dark:text-white placeholder:text-[#617589] text-base font-bold leading-normal outline-none border-none focus:ring-0" 
                maxLength={maxLength} 
                type="text" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') onClose();
                }}
              />
              {value.length > 0 && (
                <button 
                  onClick={handleClear}
                  className="flex items-center justify-center h-12 w-10 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] filled">cancel</span>
                </button>
              )}
            </div>
            <div className="flex justify-end px-1">
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">
                {value.length}/{maxLength} ký tự
              </span>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex p-5 gap-3 pt-2">
          <button 
            onClick={onClose}
            className="flex-1 h-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 text-sm font-bold tracking-wide hover:bg-gray-200 dark:hover:bg-gray-600 transition-all active:scale-95"
          >
            Hủy
          </button>
          <button 
            onClick={handleSave}
            disabled={!value.trim()}
            className="flex-1 h-12 items-center justify-center rounded-xl bg-primary text-white text-sm font-black uppercase tracking-widest shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
          >
            Lưu
          </button>
        </div>
      </div>

      {/* Visual Keyboard Spacer Simulator */}
      <div className="hidden sm:block h-32 w-full"></div>
    </div>
  );
};

export default RenameChatModal;
