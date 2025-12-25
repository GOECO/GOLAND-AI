
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAIResponse } from '../services/geminiService';
import { Message } from '../types';

const HelpSupport: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Chào mừng bạn quay lại! Cần hỗ trợ gì thêm về bất động sản không?',
      timestamp: '10:30'
    }
  ]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isChatOpen]);

  const handleSendMessage = async (text?: string) => {
    const inputMsg = text || chatInput;
    if (!inputMsg.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    const history = messages.slice(-5).map(m => ({ role: m.role, content: m.content }));
    const result = await getAIResponse(inputMsg, history);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: result.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const resetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Phiên chat đã được làm mới. Tôi có thể hỗ trợ gì cho bạn?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const popularTopics = [
    { title: 'Tài khoản', icon: 'account_circle', color: 'text-primary', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { title: 'Giao dịch', icon: 'payments', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
    { title: 'AI Assistant', icon: 'smart_toy', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { title: 'Bảo mật', icon: 'security', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' }
  ];

  const quickGuides = [
    { 
      tag: 'CƠ BẢN', 
      title: 'Làm quen với giao diện Goland AI mới', 
      icon: 'play_circle', 
      color: 'text-primary', 
      gradient: 'from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40' 
    },
    { 
      tag: 'TÌM KIẾM', 
      title: 'Cách tìm bất động sản theo bản đồ quy hoạch', 
      icon: 'map', 
      color: 'text-green-600', 
      gradient: 'from-green-100 to-teal-100 dark:from-green-900/40 dark:to-teal-900/40' 
    },
    { 
      tag: 'ĐỊNH GIÁ', 
      title: 'Hiểu về thuật toán định giá AI', 
      icon: 'analytics', 
      color: 'text-orange-600', 
      gradient: 'from-orange-100 to-red-100 dark:from-orange-900/40 dark:to-red-900/40' 
    }
  ];

  const faqs = [
    { 
      q: 'Làm thế nào để đặt lịch xem nhà?', 
      a: 'Bạn có thể nhấn vào nút "Liên hệ Agent" hoặc "Đặt lịch hẹn" trực tiếp trên trang chi tiết bất động sản. AI sẽ giúp bạn sắp xếp thời gian phù hợp.' 
    },
    { 
      q: 'Phí môi giới được tính như thế nào?', 
      a: 'Goland AI áp dụng mức phí cạnh tranh dựa trên loại hình giao dịch. Thông thường là 1-2% giá trị giao dịch cho người bán/cho thuê.' 
    },
    { 
      q: 'Làm sao để nâng cấp tài khoản Pro?', 
      a: 'Truy cập mục Cá nhân > Gói dịch vụ và chọn nâng cấp lên Premium/Pro để hưởng các tính năng AI nâng cao và dữ liệu thị trường độc quyền.' 
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display transition-colors duration-200">
      {/* TopAppBar */}
      <div className="flex items-center bg-white dark:bg-surface-dark p-4 pb-2 justify-between sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-200">
        <div 
          onClick={() => navigate(-1)}
          className="text-text-main dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </div>
        <h2 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Trợ giúp & Hỗ trợ</h2>
        <div className="flex items-center justify-end">
          <p className="text-primary text-sm font-bold leading-normal tracking-[0.015em] shrink-0 cursor-pointer hover:opacity-80">Gửi yêu cầu</p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        {/* Greeting & SearchBar */}
        <div className="bg-white dark:bg-surface-dark rounded-b-2xl pb-6 transition-colors duration-200">
          <h2 className="text-text-main dark:text-white tracking-tight text-[26px] font-bold leading-tight px-4 text-left pb-4 pt-4">
            Xin chào, <span className="text-primary">Goland AI</span> có thể giúp gì cho bạn?
          </h2>
          <div className="px-4">
            <label className="flex flex-col h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm overflow-hidden">
                <div className="text-text-sub flex bg-[#f0f2f4] dark:bg-gray-800 items-center justify-center pl-4 transition-colors duration-200">
                  <span className="material-symbols-outlined text-[24px]">search</span>
                </div>
                <input 
                  className="form-input flex w-full min-w-0 flex-1 border-none bg-[#f0f2f4] dark:bg-gray-800 text-text-main dark:text-white focus:outline-0 focus:ring-0 h-full placeholder:text-text-sub px-4 pl-2 text-base font-medium leading-normal transition-colors duration-200" 
                  placeholder="Tìm kiếm vấn đề của bạn..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </label>
          </div>
        </div>

        <div className="h-2"></div>

        {/* Popular Topics Grid */}
        <div className="px-4 pt-6">
          <h3 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-3">Chủ đề phổ biến</h3>
          <div className="grid grid-cols-2 gap-3">
            {popularTopics.map((topic, idx) => (
              <div key={idx} className="flex flex-col gap-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark p-4 items-start shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <div className={`flex items-center justify-center size-10 rounded-full ${topic.bg} ${topic.color} group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-[24px]">{topic.icon}</span>
                </div>
                <h2 className="text-text-main dark:text-white text-base font-bold leading-tight mt-1">{topic.title}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Guides Carousel */}
        <div className="pt-8">
          <div className="flex items-center justify-between px-4 pb-3">
            <h3 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Hướng dẫn nhanh</h3>
            <span className="text-primary text-sm font-semibold cursor-pointer">Xem tất cả</span>
          </div>
          <div className="flex overflow-x-auto no-scrollbar gap-4 px-4 pb-4 snap-x">
            {quickGuides.map((guide, idx) => (
              <div key={idx} className="flex-none w-60 flex flex-col snap-start bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 group cursor-pointer">
                <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${guide.gradient}`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`material-symbols-outlined text-4xl ${guide.color} opacity-40 group-hover:scale-110 transition-transform`}>{guide.icon}</span>
                  </div>
                </div>
                <div className="p-3">
                  <p className={`text-xs font-bold mb-1 ${guide.color}`}>{guide.tag}</p>
                  <h4 className="text-text-main dark:text-white font-bold text-sm leading-snug line-clamp-2">{guide.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="px-4 pt-4">
          <h3 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-3">Câu hỏi thường gặp</h3>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm"
              >
                <div className="flex justify-between items-center cursor-pointer">
                   <span className="text-text-main dark:text-white font-medium text-[15px] pr-4">{faq.q}</span>
                   <span className={`material-symbols-outlined text-text-sub transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}>expand_more</span>
                </div>
                {expandedFaq === idx && (
                  <div className="mt-3 text-sm text-text-sub dark:text-gray-400 leading-relaxed font-body animate-in slide-in-from-top-2 duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
            <button className="w-full py-3 mt-1 text-primary font-bold text-sm bg-blue-50 dark:bg-blue-900/10 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors">
              Xem thêm câu hỏi
            </button>
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="px-4 pt-8 pb-6">
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-text-main dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4 text-center">Bạn cần hỗ trợ thêm?</h3>
            
            {/* Primary AI Chat Button */}
            <button 
              onClick={() => setIsChatOpen(true)}
              className="w-full bg-primary hover:bg-blue-600 text-white rounded-xl py-4 px-4 flex items-center justify-center gap-3 shadow-lg shadow-blue-200 dark:shadow-none transition-all mb-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer-fast"></div>
              <span className="material-symbols-outlined">smart_toy</span>
              <span className="font-bold text-base">Chat ngay với Goland AI</span>
            </button>

            {/* Secondary Contact Methods */}
            <div className="flex gap-3">
              <a className="flex-1 flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" href="#">
                <span className="material-symbols-outlined text-primary">call</span>
                <span className="text-xs font-bold text-text-main dark:text-white">1900 8888</span>
              </a>
              <a className="flex-1 flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" href="#">
                <span className="material-symbols-outlined text-primary">mail</span>
                <span className="text-xs font-bold text-text-main dark:text-white">Email Hỗ trợ</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Overlay */}
      {isChatOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-[60] flex flex-col items-center pointer-events-none p-4">
          <div className="w-full max-w-md pointer-events-auto">
            <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transform transition-all duration-300 translate-y-0 opacity-100 mb-3 flex flex-col h-[520px]">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-primary to-blue-600 p-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                      <span className="material-symbols-outlined text-white text-xl">smart_toy</span>
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-primary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Goland AI Chat</h4>
                    <p className="text-blue-100 text-[10px] leading-none">Trực tuyến ngay bây giờ</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setIsResetModalOpen(true)}
                    className="bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold py-1.5 px-3 rounded-full flex items-center gap-1 transition-colors mr-1"
                  >
                    <span className="material-symbols-outlined text-base">add</span>
                    Chat mới
                  </button>
                  <button 
                    onClick={() => setMessages([{ id: Date.now().toString(), role: 'assistant', content: 'Lịch sử đã được xóa.', timestamp: 'Vừa xong' }])}
                    className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10" 
                    title="Xóa lịch sử"
                  >
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                  <button 
                    onClick={() => setIsChatOpen(false)}
                    className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
                  >
                    <span className="material-symbols-outlined text-xl">close</span>
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-[#151f2a] flex flex-col gap-4 no-scrollbar">
                <div className="flex justify-center mb-2">
                  <span className="text-[10px] text-gray-500 font-medium bg-gray-200/60 dark:bg-gray-800/80 px-3 py-1 rounded-full">HÔM NAY</span>
                </div>
                
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 mt-1">
                        <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                      </div>
                    )}
                    <div className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                      <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white dark:bg-surface-dark text-text-main dark:text-white border border-gray-100 dark:border-gray-700 rounded-tl-none'}`}>
                        <p>{msg.content}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 px-1">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 mt-1">
                      <span className="material-symbols-outlined text-primary text-sm animate-pulse">smart_toy</span>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700 shadow-sm flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                )}

                {/* Suggestions Chips */}
                <div className="flex flex-wrap gap-2 pl-10 mt-2">
                  {['Hướng dẫn định giá', 'Quên mật khẩu?', 'Gặp hỗ trợ viên'].map((chip) => (
                    <button 
                      key={chip}
                      onClick={() => handleSendMessage(chip)}
                      className="px-3 py-1.5 bg-white dark:bg-surface-dark border border-blue-100 dark:border-gray-700 rounded-full text-xs text-primary font-medium hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">add_circle</span>
                </button>
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-full py-2.5 px-5 text-sm focus:ring-1 focus:ring-primary text-text-main dark:text-white placeholder:text-gray-400" 
                  placeholder="Nhập câu hỏi..." 
                />
                <button 
                  onClick={() => handleSendMessage()}
                  disabled={!chatInput.trim() || isTyping}
                  className="p-2.5 bg-primary text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-md disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-lg">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Chat Reset Confirmation Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsResetModalOpen(false)}></div>
          <div className="relative w-full max-w-[320px] bg-white dark:bg-surface-dark rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-700 transform transition-all scale-100 opacity-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4 text-primary ring-4 ring-blue-50/50 dark:ring-blue-900/10">
                <span className="material-symbols-outlined text-[28px]">chat_add_on</span>
              </div>
              <h3 className="text-text-main dark:text-white text-lg font-bold leading-snug mb-2">
                Bắt đầu trò chuyện mới?
              </h3>
              <p className="text-text-sub dark:text-gray-400 text-[15px] leading-relaxed mb-6 font-medium">
                Lịch sử trò chuyện hiện tại sẽ bị xóa. Bạn có muốn tiếp tục không?
              </p>
              <div className="grid grid-cols-2 gap-3 w-full">
                <button 
                  onClick={() => setIsResetModalOpen(false)}
                  className="w-full py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-text-sub dark:text-gray-300 font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 transition-all"
                >
                  Hủy
                </button>
                <button 
                  onClick={() => {
                    resetChat();
                    setIsResetModalOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-blue-600 shadow-lg shadow-blue-500/25 active:scale-95 transition-all"
                >
                  Đồng ý
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupport;
