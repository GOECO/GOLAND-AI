
import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';
import { Message } from '../types';
import { useNavigate } from 'react-router-dom';

const ChatScreen: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I am Goland AI. I can assist with market prices, zoning laws, and project comparisons. How can I help you navigate the real estate market today?",
      timestamp: '10:23 AM'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Context for comparison trigger
    if (messageText.toLowerCase().includes('compare') || messageText.toLowerCase().includes('vinhomes')) {
      setTimeout(() => {
        const aiMsg: Message = {
          id: 'compare-mock',
          role: 'assistant',
          content: "Here is the comparison. Vinhomes Central Park has seen a steady 15% increase over the last 3 years, slightly outperforming Masteri Thao Dien at 12%.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    const history = messages.slice(-5).map(m => ({ role: m.role, content: m.content }));
    const aiResult = await getAIResponse(messageText, history);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResult.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-background-light dark:bg-background-dark font-body relative overflow-hidden transition-colors duration-500 max-w-[480px] mx-auto shadow-2xl">
      {/* Header */}
      <header className="flex items-center bg-white dark:bg-surface-dark p-4 pb-3 justify-between shadow-soft z-20 shrink-0 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center text-slate-500 hover:text-primary transition-colors active:scale-90">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <div className="relative group cursor-pointer">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-10 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-primary/20 dark:to-primary/5 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">smart_toy</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-500 rounded-full border-2 border-white dark:border-surface-dark"></div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-slate-900 dark:text-white text-[17px] font-bold leading-tight tracking-tight">Goland Assistant</h2>
            <p className="text-[11px] text-primary font-semibold tracking-wide uppercase">AI Online</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button className="size-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-slate-400">
            <span className="material-symbols-outlined text-[22px]">refresh</span>
          </button>
          <button className="size-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-slate-400">
            <span className="material-symbols-outlined text-[22px]">more_vert</span>
          </button>
        </div>
      </header>

      {/* Chat Canvas */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 scroll-smooth pb-32 no-scrollbar bg-background-light dark:bg-background-dark"
      >
        <div className="flex justify-center w-full py-2">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest bg-gray-200/50 dark:bg-surface-dark/50 px-3 py-1 rounded-full backdrop-blur-sm">Today, 10:23 AM</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {msg.role === 'assistant' && (
              <div className="flex items-center justify-center rounded-full size-8 shrink-0 bg-primary text-white shadow-glow">
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
              </div>
            )}
            <div className={`flex flex-1 flex-col gap-1.5 ${msg.role === 'user' ? 'items-end' : 'items-start'} min-w-0`}>
              {msg.role === 'assistant' && <p className="text-slate-400 dark:text-gray-400 text-[11px] font-medium ml-1">Goland AI</p>}
              <div 
                className={`text-[15px] font-normal leading-relaxed rounded-2xl p-4 shadow-sm border ${
                  msg.role === 'user' 
                  ? 'bg-primary text-white border-transparent rounded-br-none max-w-[85%]' 
                  : 'bg-white dark:bg-surface-dark text-slate-900 dark:text-gray-100 border-gray-100 dark:border-gray-700/50 rounded-bl-none max-w-[92%]'
                }`}
              >
                <p>{msg.content}</p>
                
                {/* Data Component: Price Comparison */}
                {msg.id === 'compare-mock' && (
                  <div className="mt-5 w-full space-y-4">
                    <div className="bg-gray-50 dark:bg-[#151E2D] rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        Price Growth (3 Years)
                      </h4>
                      <div className="space-y-5">
                        <div>
                          <div className="flex justify-between text-xs mb-2">
                            <span className="font-semibold text-slate-900 dark:text-white">Vinhomes Central Park</span>
                            <span className="text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">+15%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
                            <div className="bg-primary h-2 rounded-full shadow-[0_0_10px_rgba(0,97,255,0.4)] transition-all duration-1000" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-2">
                            <span className="font-semibold text-slate-900 dark:text-white">Masteri Thảo Điền</span>
                            <span className="text-blue-400 font-bold bg-blue-400/10 px-1.5 py-0.5 rounded">+12%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden">
                            <div className="bg-blue-400 h-2 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.4)] transition-all duration-1000" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative w-full h-36 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 group cursor-pointer">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDu5aTHCHED_H0txDIYAyoCd1Wc9_Jb0H3ncltl7JDKlsQJEig9Joqm_E4UcPO8KJ21C29A7UdVtFq7KQN3GOe4K9MFWHt-6HqBc6dQkZfC8Ll7e_UbdecuKVfQv5EItv4qEpWZbDlXNMtkTLRH55h2mI-1rMHuYAJDiADH-833EbhQ3XgvOxHJltwklGGLacC61PmqgFd6jFwUThR7azClsrCyPgEg5m8CwW2wiTN8dq90lnRW4IzNfImBJWileGK5CNJo4N60XEoX')" }}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-2.5">
                        <div className="bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md size-8 flex items-center justify-center rounded-lg text-primary shadow-lg">
                          <span className="material-symbols-outlined text-lg">location_on</span>
                        </div>
                        <div className="text-white drop-shadow-md">
                          <p className="text-xs font-bold">View Location Map</p>
                          <p className="text-[10px] opacity-90 font-medium">Distance: 2.5km apart</p>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-medium border border-white/10">Interactive</div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button className="bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 hover:border-primary/40 text-xs font-semibold px-4 py-2 rounded-lg transition-all active:scale-95">View Full Report</button>
                      <button className="bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-700 text-slate-900 dark:text-gray-200 border border-gray-200 dark:border-gray-700 text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-sm active:scale-95">Contact Agent</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 mt-1 px-1">
                <span className="text-slate-400 text-[10px] font-medium">{msg.timestamp}</span>
                {msg.role === 'user' && <span className="material-symbols-outlined text-[12px] text-primary">done_all</span>}
              </div>
            </div>
          </div>
        ))}

        {/* Suggestion Chips */}
        {!isTyping && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 pl-11">
            {[
              { label: 'Analyze Price', icon: 'analytics' },
              { label: 'Check Zoning', icon: 'map' },
              { label: 'Compare Projects', icon: 'compare_arrows' }
            ].map((chip) => (
              <button 
                key={chip.label}
                onClick={() => handleSend(chip.label)}
                className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 pl-3 pr-4 hover:border-primary hover:text-primary dark:hover:border-primary transition-all shadow-sm group active:scale-95"
              >
                <span className="material-symbols-outlined text-primary text-[18px] group-hover:scale-110 transition-transform">{chip.icon}</span>
                <p className="text-slate-900 dark:text-gray-200 text-xs font-semibold whitespace-nowrap group-hover:text-primary">{chip.label}</p>
              </button>
            ))}
          </div>
        )}

        {isTyping && (
          <div className="flex gap-2 ml-11">
            <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700 shadow-sm flex gap-1 items-center">
              <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 w-full bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 p-4 pb-6 z-30 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
        <div className="flex items-end gap-2.5">
          <button className="flex items-center justify-center size-11 shrink-0 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-primary transition-all active:scale-90">
            <span className="material-symbols-outlined">add</span>
          </button>
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center px-4 py-2.5 min-h-[44px] border border-transparent focus-within:border-primary/50 focus-within:bg-white dark:focus-within:bg-surface-dark focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder-gray-400 text-[15px] focus:ring-0 p-0 resize-none max-h-24" 
              placeholder="Ask Goland AI..." 
              rows={1}
            />
            <button className="ml-2 text-gray-400 hover:text-primary transition-colors active:scale-90">
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
          </div>
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="flex items-center justify-center size-11 shrink-0 rounded-full bg-primary text-white shadow-lg shadow-blue-500/30 hover:bg-primary-dark hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-3 font-medium">
          Goland AI can make mistakes. Consider checking important info.
        </p>
      </div>
    </div>
  );
};

export default ChatScreen;
