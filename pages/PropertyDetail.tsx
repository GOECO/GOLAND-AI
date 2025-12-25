
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROPERTIES } from '../constants';
import { getAIResponse } from '../services/geminiService';

const PropertyDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = PROPERTIES.find(p => p.id === id) || PROPERTIES[0];
  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [priceAlert, setPriceAlert] = useState(false);
  const [threshold, setThreshold] = useState(5);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  
  // AI Insight State
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    const fetchMarketAnalysis = async () => {
      setIsAiLoading(true);
      const prompt = `Analyze the current property market trends in Ho Chi Minh City for the project '${property.name}'. 
      Provide professional insights on:
      1. Recent price appreciation trends (last 1-2 years).
      2. Typical rental yields for this specific project.
      3. Upcoming neighborhood/infrastructure developments nearby.
      Keep the response concise, data-driven, and in Vietnamese. Use bullet points for clarity.`;
      
      try {
        const result = await getAIResponse(prompt);
        setAiInsight(result.text);
      } catch (error) {
        console.error("Failed to fetch AI insights:", error);
        setAiInsight("Không thể tải thông tin phân tích thị trường lúc này. Vui lòng thử lại sau.");
      } finally {
        setIsAiLoading(false);
      }
    };

    fetchMarketAnalysis();
  }, [property.name]);

  const handleToggleAlert = () => {
    if (!priceAlert) {
      setIsAlertModalOpen(true);
    } else {
      setPriceAlert(false);
    }
  };

  const saveAlert = () => {
    setPriceAlert(true);
    setIsAlertModalOpen(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const calculateSavings = (percent: number) => {
    const priceVal = parseFloat(property.price.replace(' Tỷ', ''));
    const savings = (priceVal * percent) / 100;
    return savings.toFixed(2) + ' Tỷ';
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen pb-28 font-body text-slate-900 dark:text-white transition-colors duration-300">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[340px] animate-in slide-in-from-top-10 fade-in duration-300">
          <div className="bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/50 backdrop-blur-md">
            <span className="material-symbols-outlined filled">check_circle</span>
            <p className="text-sm font-bold">Đã lưu cảnh báo giảm giá {threshold}%!</p>
          </div>
        </div>
      )}

      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 flex items-center bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-xl p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={() => navigate(-1)}
          className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex items-center justify-end gap-1">
          {/* Requested Share Button next to More Options */}
          <button 
            onClick={() => navigate('/share-preview')}
            className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-slate-900 dark:text-white active:scale-90"
            title="Share"
          >
            <span className="material-symbols-outlined">share</span>
          </button>
          <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-slate-900 dark:text-white active:scale-90" title="More options">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative w-full flex flex-col group/design-root overflow-x-hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 pt-2">
          <div className="flex items-stretch px-4 gap-3">
            <div className="snap-center shrink-0 w-[85vw] flex flex-col gap-4 rounded-2xl relative overflow-hidden shadow-soft">
              <div 
                className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-2xl relative transition-transform duration-700 hover:scale-105" 
                style={{ backgroundImage: `url(${property.image})` }}
              >
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-sm">photo_camera</span> 1/12
                </div>
              </div>
            </div>
            <div className="snap-center shrink-0 w-[85vw] flex flex-col gap-4 rounded-2xl relative overflow-hidden shadow-soft">
              <div 
                className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-2xl relative group cursor-pointer" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHrRsa5YYbsfAQvu8on1uEVm7JbkDTa3jWYsyxpu1p5muM1x9v0J2J9dG7kTn-sOn98ir2IOat4MTWYlRLPy0J9oJ6NKMQrdF8v046B_rMOH8aHwTaRT-m8NuFwN8NVlePlDj9DOrmbhtWKtwxtb--1OJryDlPtaB73AzS6Q_YncnqTdwbV-u4cfKMmzqq862Uq1fDsthQTGkLKDw28JHbAoLhawZxSL1_JdCppvJ3LVwmuPoN3Ld-vZbr-L0Ynfg6ru4j-L6hhC6v")' }}
              >
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full pl-3 pr-4 py-2 flex items-center gap-2 shadow-lg scale-100 hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-primary">360</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">View 360°</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AR/VR Experience Buttons */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-3">
        <button className="relative overflow-hidden group flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl font-bold text-sm shadow-glow transition-all active:scale-[0.98]">
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="material-symbols-outlined">view_in_ar</span>
          <span>View in AR</span>
        </button>
        <button className="relative overflow-hidden group flex items-center justify-center gap-2 bg-white dark:bg-surface-dark text-primary dark:text-white border border-blue-100 dark:border-gray-700 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-[0.98] hover:bg-blue-50/50 dark:hover:bg-gray-700/50">
          <span className="material-symbols-outlined text-primary">vr180_create2d</span>
          <span>VR Experience</span>
        </button>
      </div>

      {/* Property Information */}
      <div className="px-4 pt-1">
        <div className="flex gap-2 mb-3 flex-wrap">
          <div className="flex h-7 shrink-0 items-center justify-center gap-x-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 pl-2.5 pr-3 border border-blue-100 dark:border-blue-800">
            <span className="material-symbols-outlined text-primary text-sm filled">verified</span>
            <p className="text-primary text-xs font-bold leading-normal">Verified</p>
          </div>
          <div className="flex h-7 shrink-0 items-center justify-center gap-x-1.5 rounded-full bg-orange-50 dark:bg-orange-900/30 pl-2.5 pr-3 border border-orange-100 dark:border-orange-800">
            <span className="material-symbols-outlined text-orange-500 dark:text-orange-400 text-sm filled">local_fire_department</span>
            <p className="text-orange-600 dark:text-orange-400 text-xs font-bold leading-normal">Hot Deal</p>
          </div>
        </div>

        <h1 className="font-display text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-tight text-left mb-2">
          {property.name} - Luxury Condo
        </h1>
        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm mb-5">
          <span className="material-symbols-outlined text-[1.2rem] text-primary">location_on</span>
          <span className="font-medium">{property.location}</span>
        </div>

        <div className="flex items-end justify-between border-b border-gray-100 dark:border-gray-800 pb-5 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Price</p>
              <button 
                onClick={() => setIsAlertModalOpen(true)}
                className={`flex items-center justify-center size-6 rounded-full transition-all ${priceAlert ? 'bg-primary text-white animate-pulse shadow-glow' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}
              >
                <span className={`material-symbols-outlined text-[16px] ${priceAlert ? 'filled' : ''}`}>notifications_active</span>
              </button>
            </div>
            <h2 className="font-display text-primary tracking-tight text-3xl font-bold leading-none">
              {property.price.split(' ')[0]} <span className="text-lg text-slate-700 dark:text-gray-300 font-bold">{property.price.split(' ')[1]}</span>
            </h2>
          </div>
          <div className="text-right">
            <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Unit Price</p>
            <p className="text-slate-900 dark:text-white text-lg font-bold">
              {property.unitPrice.split('/')[0]} <span className="text-sm font-normal text-gray-500">/ {property.unitPrice.split('/')[1]}</span>
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="flex justify-between items-center py-2 px-1">
          {[
            { icon: 'bed', label: `${property.beds} Beds` },
            { icon: 'bathtub', label: `${property.baths} Baths` },
            { icon: 'square_foot', label: property.area },
            { icon: 'compass_calibration', label: 'SE' }
          ].map((feat, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1.5">
                <div className="bg-gray-50 dark:bg-gray-800 p-3.5 rounded-2xl transition-transform hover:scale-105">
                  <span className="material-symbols-outlined text-slate-700 dark:text-gray-300">{feat.icon}</span>
                </div>
                <span className="text-sm font-semibold dark:text-gray-200">{feat.label}</span>
              </div>
              {i < 3 && <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Dynamic Goland AI Insight Card */}
      <div className="mt-8 mx-4 p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700 relative overflow-hidden shadow-soft transition-all duration-500">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        <div className="flex justify-between items-start mb-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-white dark:bg-slate-700 p-1 rounded-md shadow-sm">
                <span className="material-symbols-outlined text-primary text-xl filled">auto_awesome</span>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Goland AI Market Analysis</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium ml-1">Live market data & trends</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center size-14">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle className="stroke-current text-white dark:text-slate-700 opacity-50" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                <circle className="stroke-current text-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset={100 - (property.potential || 8.5) * 10} strokeLinecap="round" strokeWidth="3"></circle>
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-sm font-bold text-primary">{property.potential || 8.5}</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider mt-1">Growth Index</span>
          </div>
        </div>

        <div className="space-y-3 relative z-10">
          {isAiLoading ? (
            <div className="flex flex-col gap-4 animate-pulse p-4 bg-white/40 dark:bg-white/5 rounded-xl">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
          ) : (
            <div className="bg-white/70 dark:bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/50 dark:border-white/10 shadow-sm text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium">
              {aiInsight || "Đang phân tích dữ liệu thị trường..."}
            </div>
          )}
          
          <div 
            onClick={handleToggleAlert}
            className={`flex flex-col p-3.5 rounded-xl border transition-all duration-500 overflow-hidden cursor-pointer ${priceAlert ? 'bg-primary/10 border-primary/30 shadow-md scale-[1.02]' : 'bg-white/70 dark:bg-white/5 border-white/50 dark:border-white/10 shadow-sm hover:border-primary/20'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-start">
                <span className={`material-symbols-outlined text-lg mt-0.5 transition-colors ${priceAlert ? 'text-primary filled animate-pulse' : 'text-gray-400'}`}>notifications_active</span>
                <div className="pr-4">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Cảnh báo giảm giá</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                    {priceAlert ? `Đang theo dõi mức giảm ${threshold}% (~${calculateSavings(threshold)})` : 'Nhận thông báo khi giá giảm đến mức mong muốn.'}
                  </p>
                </div>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <div className={`w-10 h-5.5 rounded-full transition-colors ${priceAlert ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'} p-0.5 flex items-center ${priceAlert ? 'justify-end' : 'justify-start'}`}>
                  <div className="h-4.5 w-4.5 rounded-full bg-white shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/chat')}
          className="w-full mt-5 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark active:scale-95"
        >
          <span className="material-symbols-outlined text-lg">chat_spark</span>
          Chat with AI for deeper analysis
        </button>
      </div>

      {/* Description */}
      <div className="px-4 mt-8">
        <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-3">Description</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {property.description || "Luxury apartment located in the heart of the city with a breathtaking view of the river. This unit features high-end finishes, smart home integration, and floor-to-ceiling windows."}
          <span className="text-primary font-bold cursor-pointer ml-1 hover:underline">Read more</span>
        </p>
      </div>

      {/* Legal & Furniture Grid */}
      <div className="px-4 mt-8">
        <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-4">Legal & Furniture</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Legal Status', val: 'Pink Book', icon: 'gavel' },
            { label: 'Furniture', val: 'Fully Furnished', icon: 'chair' },
            { label: 'Built Year', val: '2021', icon: 'calendar_month' },
            { label: 'Floor', val: '18th Floor', icon: 'apartment' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:border-primary/20">
              <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-full shrink-0">
                <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 text-xl">{item.icon}</span>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.label}</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Map Section */}
      <div className="px-4 mt-8 mb-8">
        <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-4">Location</h3>
        <div 
          className="w-full h-48 rounded-3xl bg-gray-200 relative overflow-hidden group cursor-pointer shadow-sm border border-gray-100 dark:border-gray-800" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDu5aTHCHED_H0txDIYAyoCd1Wc9_Jb0H3ncltl7JDKlsQJEig9Joqm_E4UcPO8KJ21C29A7UdVtFq7KQN3GOe4K9MFWHt-6HqBc6dQkZfC8Ll7e_UbdecuKVfQv5EItv4qEpWZbDlXNMtkTLRH55h2mI-1rMHuYAJDiADH-833EbhQ3XgvOxHJltwklGGLacC61PmqgFd6jFwUThR7azClsrCyPgEg5m8CwW2wiTN8dq90lnRW4IzNfImBJWileGK5CNJo4N60XEoX")', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-slate-900/10 hover:bg-slate-900/20 transition-colors"></div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white dark:bg-slate-900 p-3 rounded-full shadow-lg border border-white/20">
              <span className="material-symbols-outlined text-primary filled text-3xl">location_on</span>
            </div>
          </div>
          <button className="absolute bottom-3 right-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-1">
            <span>Open Map</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </button>
        </div>
      </div>

      {/* Price Alert Modal */}
      {isAlertModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAlertModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white dark:bg-[#1a2632] rounded-t-[32px] shadow-2xl flex flex-col p-6 pb-12 animate-in slide-in-from-bottom duration-500 ease-out">
            <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6 opacity-50"></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
                <span className="material-symbols-outlined text-3xl filled">notifications_active</span>
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Cài đặt cảnh báo</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Chọn mức giảm giá để nhận thông báo</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 px-1">Mức giảm mong muốn</p>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 3, 5, 10, 15].map((p) => (
                    <button 
                      key={p}
                      onClick={() => setThreshold(p)}
                      className={`h-12 rounded-xl text-sm font-black transition-all border ${threshold === p ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' : 'bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700 hover:bg-white'}`}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tiết kiệm dự kiến</span>
                  <span className="text-primary font-black text-lg">~ {calculateSavings(threshold)}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(threshold / 15) * 100}%` }}></div>
                </div>
                <p className="text-[11px] text-gray-400 mt-3 italic font-medium leading-relaxed">
                  "Hệ thống sẽ tự động quét biến động giá từ chủ nhà và sàn giao dịch 24/7 để báo cho bạn."
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setIsAlertModalOpen(false)}
                  className="flex-1 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 text-slate-700 dark:text-white font-bold text-base hover:bg-gray-200 transition-all active:scale-95"
                >
                  Hủy
                </button>
                <button 
                  onClick={saveAlert}
                  className="flex-[1.5] h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/30 hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Lưu cảnh báo</span>
                  <span className="material-symbols-outlined">done</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-4 pb-8 flex gap-3 items-center z-[60] shadow-[0_-8px_30px_-5px_rgba(0,0,0,0.1)] max-w-[480px] mx-auto">
        <button 
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`flex flex-col items-center justify-center size-12 shrink-0 rounded-xl transition-all border ${isBookmarked ? 'bg-red-50 dark:bg-red-900/20 text-red-500 border-red-100' : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-transparent hover:border-gray-200'} active:scale-90`}
        >
          <span className={`material-symbols-outlined text-2xl ${isBookmarked ? 'filled' : ''}`}>favorite</span>
        </button>
        <button 
          onClick={() => navigate('/chat')}
          className="flex flex-col items-center justify-center size-12 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-primary border border-blue-100 dark:border-blue-900 hover:scale-105 active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined text-2xl filled">chat_bubble</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]">
          <span className="material-symbols-outlined">call</span>
          <span>Contact Agent</span>
        </button>
      </div>
    </div>
  );
};

export default PropertyDetail;
