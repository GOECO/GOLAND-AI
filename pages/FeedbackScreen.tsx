
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeedbackScreen: React.FC = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<'bug' | 'feedback'>('bug');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [allowContact, setAllowContact] = useState(true);
  const [attachments, setAttachments] = useState<string[]>(['placeholder']); // Mock existing attachment

  const handleSubmit = () => {
    // In a real app, send to backend
    console.log("Feedback Submitted:", { type, subject, description, allowContact });
    navigate('/feedback-success');
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-background-dark min-h-screen flex flex-col relative shadow-xl overflow-hidden font-display transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-slate-900 dark:text-white transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-center flex-1 uppercase">Phản hồi</h1>
        <button 
          onClick={() => navigate(-1)}
          className="text-slate-500 dark:text-gray-400 font-bold text-sm hover:text-slate-900 dark:hover:text-white transition-colors px-2"
        >
          Hủy
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        {/* AI Assistant Banner */}
        <div className="px-5 pt-6 pb-2">
          <div className="flex items-start gap-4 p-4 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/10 dark:border-primary/20 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shrink-0 shadow-lg text-white">
              <span className="material-symbols-outlined text-xl filled">auto_awesome</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Goland AI Assistant</p>
              <p className="text-[12px] text-slate-500 dark:text-gray-400 leading-relaxed font-medium">
                Phản hồi của bạn sẽ giúp hệ thống AI của chúng tôi học hỏi và phục vụ bạn tốt hơn trong tương lai.
              </p>
            </div>
          </div>
        </div>

        {/* Segmented Control */}
        <div className="px-5 py-4">
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800/50 rounded-2xl relative shadow-inner">
            <button 
              onClick={() => setType('bug')}
              className={`flex-1 text-center py-2.5 rounded-xl text-sm font-black uppercase tracking-tighter transition-all z-10 ${
                type === 'bug' ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-slate-500 dark:text-gray-400'
              }`}
            >
              Báo cáo Lỗi
            </button>
            <button 
              onClick={() => setType('feedback')}
              className={`flex-1 text-center py-2.5 rounded-xl text-sm font-black uppercase tracking-tighter transition-all z-10 ${
                type === 'feedback' ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-slate-500 dark:text-gray-400'
              }`}
            >
              Góp ý
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="px-5 space-y-6 pt-2">
          {/* Subject */}
          <div className="space-y-2">
            <label className="block text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white px-1">
              Tiêu đề
            </label>
            <input 
              className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-2xl text-slate-900 dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] font-medium shadow-inner" 
              placeholder="Vắn tắt vấn đề bạn gặp phải" 
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white px-1">
              Mô tả chi tiết
            </label>
            <textarea 
              className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-2xl text-slate-900 dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-[15px] font-medium resize-none min-h-[160px] shadow-inner" 
              placeholder="Hãy mô tả chi tiết vấn đề hoặc ý kiến đóng góp của bạn để chúng tôi có thể hỗ trợ tốt nhất..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Media Attachment */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
                Đính kèm ảnh/video
              </label>
              <span className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">Tối đa 3 file</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {/* Add Button */}
              {attachments.length < 3 && (
                <button 
                  onClick={() => setAttachments([...attachments, 'placeholder'])}
                  className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-primary/30 dark:border-primary/40 rounded-2xl bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 transition-all group active:scale-95 shadow-sm"
                >
                  <span className="material-symbols-outlined text-primary mb-1 group-hover:scale-110 transition-transform">add_photo_alternate</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Thêm</span>
                </button>
              )}
              
              {/* Preview Items */}
              {attachments.map((_, idx) => (
                <div key={idx} className="aspect-square relative rounded-2xl overflow-hidden group border border-gray-100 dark:border-gray-800 shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
                  <button 
                    onClick={() => removeAttachment(idx)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors z-10 shadow-lg"
                  >
                    <span className="material-symbols-outlined text-[16px] font-bold">close</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Toggle */}
          <div className="pt-4">
            <label className="flex items-start justify-between p-5 border border-gray-100 dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-800/40 cursor-pointer group hover:border-primary/30 transition-all shadow-sm">
              <div className="flex-1 pr-6">
                <div className="text-base font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tight">Gửi thông tin liên hệ</div>
                <div className="text-[12px] text-slate-500 dark:text-gray-400 font-medium leading-relaxed">Cho phép đội ngũ hỗ trợ liên hệ lại với bạn qua email đăng ký nếu cần thêm thông tin.</div>
              </div>
              <div className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
                <input 
                  type="checkbox" 
                  checked={allowContact}
                  onChange={() => setAllowContact(!allowContact)}
                  className="sr-only peer" 
                />
                <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary shadow-inner"></div>
              </div>
            </label>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 z-30">
        <button 
          onClick={handleSubmit}
          disabled={!subject.trim() || !description.trim()}
          className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:grayscale text-white font-black uppercase tracking-[0.2em] py-4 rounded-2xl shadow-xl shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
        >
          <span>Gửi phản hồi</span>
          <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">send</span>
        </button>
      </div>
    </div>
  );
};

export default FeedbackScreen;
