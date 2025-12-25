
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MarketReport: React.FC = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareFormat, setShareFormat] = useState<'pdf' | 'image' | 'summary'>('pdf');

  const handleContinue = () => {
    if (shareFormat === 'summary') {
      navigate('/summary');
    } else {
      setIsShareModalOpen(false);
      // Xử lý các định dạng khác ở đây
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-white dark:bg-gray-900 shadow-xl font-display transition-colors duration-200">
      {/* TopAppBar */}
      <div className="sticky top-0 z-50 flex items-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={() => navigate(-1)}
          className="text-[#111418] dark:text-white flex size-12 shrink-0 items-center justify-start hover:text-primary transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Báo cáo Thị trường</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex items-center justify-center text-[#111418] dark:text-white hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[24px]">more_vert</span>
          </button>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <div className={`flex-1 overflow-y-auto pb-4 no-scrollbar transition-all duration-300 ${isShareModalOpen ? 'blur-[2px] opacity-50' : ''}`}>
        {/* Filter Tabs */}
        <div className="bg-white dark:bg-gray-900 pt-2 pb-1 sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800">
          <div className="flex px-4 justify-between">
            {[
              { id: 'week', label: 'Theo tuần' },
              { id: 'month', label: 'Theo tháng' },
              { id: 'year', label: 'Theo năm' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setPeriod(tab.id as any)}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-2 flex-1 transition-all ${
                  period === tab.id 
                  ? 'border-b-primary text-primary' 
                  : 'border-b-transparent text-[#617589] dark:text-gray-400'
                }`}
              >
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">{tab.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chips Filters */}
        <div className="flex gap-3 px-4 py-4 overflow-x-auto no-scrollbar bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-white pl-4 pr-3 shadow-md shadow-primary/20">
            <p className="text-sm font-medium leading-normal">Quận 1, TP.HCM</p>
            <span className="material-symbols-outlined text-[20px]">expand_more</span>
          </button>
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f2f4] dark:bg-gray-800 pl-4 pr-3 border border-transparent hover:border-primary/20 transition-colors">
            <p className="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal">Tất cả loại BĐS</p>
            <span className="material-symbols-outlined text-[20px] text-[#111418] dark:text-gray-200">expand_more</span>
          </button>
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f0f2f4] dark:bg-gray-800 pl-4 pr-3 border border-transparent hover:border-primary/20 transition-colors">
            <p className="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal">Khoảng giá</p>
            <span className="material-symbols-outlined text-[20px] text-[#111418] dark:text-gray-200">expand_more</span>
          </button>
        </div>

        {/* AI Insight Section */}
        <div className="px-4 py-4">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-blue-100/30 dark:from-primary/10 dark:to-gray-800 p-5 border border-primary/20 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-blue-400 text-white shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
              </div>
              <h3 className="text-primary dark:text-blue-400 font-bold text-xs uppercase tracking-widest">Goland AI Phân Tích</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              Giá căn hộ Quận 1 đang trong chu kỳ tăng nhẹ <span className="text-green-600 font-bold">+2.5%</span> do nguồn cung khan hiếm cuối năm. Các dự án gần tuyến Metro số 1 ghi nhận mức quan tâm tăng vọt.
            </p>
          </div>
        </div>

        {/* Price Trend Chart Section */}
        <div className="pt-2">
          <div className="flex items-center justify-between px-4 pb-3">
            <h2 className="text-[#111418] dark:text-white tracking-tight text-[20px] font-bold leading-tight">Xu hướng giá</h2>
            <button className="text-primary text-sm font-semibold hover:text-blue-600">Chi tiết</button>
          </div>
          <div className="px-4">
            <div className="flex flex-col gap-2 rounded-2xl border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-[#617589] dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Giá trung bình</p>
                  <p className="text-[#111418] dark:text-white text-3xl font-extrabold leading-none tracking-tight">120 tr<span className="text-lg text-gray-500 font-medium ml-1">/m²</span></p>
                </div>
                <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1.5 rounded-lg border border-green-100 dark:border-green-900/30">
                  <span className="material-symbols-outlined text-[#078838] dark:text-green-400 text-[18px]">trending_up</span>
                  <p className="text-[#078838] dark:text-green-400 text-sm font-bold">+2.5%</p>
                </div>
              </div>
              
              {/* Chart Visual */}
              <div className="relative w-full h-[160px] py-2">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 100">
                  <defs>
                    <linearGradient id="gradient-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#137fec" stopOpacity="0.2"></stop>
                      <stop offset="100%" stopColor="#137fec" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <line className="dark:stroke-gray-700" stroke="#f0f2f4" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="320" y1="0" y2="0"></line>
                  <line className="dark:stroke-gray-700" stroke="#f0f2f4" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="320" y1="50" y2="50"></line>
                  <line className="dark:stroke-gray-700" stroke="#f0f2f4" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="320" y1="100" y2="100"></line>
                  <path d="M0,80 C30,80 30,50 60,50 C90,50 90,70 120,60 C150,50 150,20 180,30 C210,40 210,10 240,20 C270,30 270,5 320,15 V100 H0 Z" fill="url(#gradient-fill)"></path>
                  <path d="M0,80 C30,80 30,50 60,50 C90,50 90,70 120,60 C150,50 150,20 180,30 C210,40 210,10 240,20 C270,30 270,5 320,15" fill="none" stroke="#137fec" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                  <g transform="translate(240, 20)">
                    <circle cx="0" cy="0" fill="#137fec" fillOpacity="0.1" r="16"></circle>
                    <circle cx="0" cy="0" fill="#ffffff" r="5" stroke="#137fec" strokeWidth="2.5"></circle>
                  </g>
                </svg>
                <div className="absolute top-[5px] left-[65%] -translate-x-1/2 bg-[#111418] text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none">
                  120 tr
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#111418]"></div>
                </div>
              </div>
              <div className="flex justify-between mt-2 px-1">
                <span className="text-xs text-gray-400 font-medium">T5</span>
                <span className="text-xs text-gray-400 font-medium">T6</span>
                <span className="text-xs text-gray-400 font-medium">T7</span>
                <span className="text-xs text-gray-400 font-medium">T8</span>
                <span className="text-xs text-gray-400 font-medium">T9</span>
                <span className="text-xs text-primary font-bold">T10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Stats Breakdown */}
        <div className="pt-8">
          <h2 className="text-[#111418] dark:text-white tracking-tight text-[20px] font-bold leading-tight px-4 pb-4">Phân bổ giao dịch</h2>
          <div className="px-4 grid gap-5">
            {[
              { label: 'Căn hộ chung cư', color: 'bg-primary', percent: 45, count: 150 },
              { label: 'Nhà phố riêng lẻ', color: 'bg-indigo-400', percent: 30, count: 98 },
              { label: 'Đất nền dự án', color: 'bg-teal-400', percent: 25, count: 82 }
            ].map((item, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-center text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                  </div>
                  <span className="font-bold text-[#111418] dark:text-white">{item.percent}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div className={`${item.color} h-3 rounded-full relative group-hover:bg-blue-600 transition-colors transition-all duration-1000`} style={{ width: `${item.percent}%` }}></div>
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">{item.count} giao dịch</p>
              </div>
            ))}
          </div>
        </div>

        {/* Market Influencers */}
        <div className="pt-8">
          <h2 className="text-[#111418] dark:text-white tracking-tight text-[20px] font-bold leading-tight px-4 pb-4">Yếu tố tác động</h2>
          <div className="px-4 space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="shrink-0 pt-1">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 ring-4 ring-blue-50/50 dark:ring-blue-900/10">
                  <span className="material-symbols-outlined">train</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-[#111418] dark:text-white truncate pr-2">Tuyến Metro số 1</h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    Tích cực
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">Dự kiến vận hành thương mại vào cuối năm, thúc đẩy giá BĐS khu vực lân cận ga Bến Thành.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="shrink-0 pt-1">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 ring-4 ring-orange-50/50 dark:ring-orange-900/10">
                  <span className="material-symbols-outlined">percent</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-[#111418] dark:text-white truncate pr-2">Lãi suất vay mua nhà</h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                    Thận trọng
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">Lãi suất thả nổi có xu hướng tăng nhẹ, ảnh hưởng đến quyết định của nhà đầu tư dùng đòn bẩy.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparative Analysis */}
        <div className="pt-8 mb-4">
          <div className="flex items-center justify-between px-4 pb-4">
            <h2 className="text-[#111418] dark:text-white tracking-tight text-[20px] font-bold leading-tight">So sánh khu vực</h2>
            <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 py-1 rounded transition-colors">
              Thêm
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>
          <div className="px-4">
            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold" scope="col">Khu vực</th>
                    <th className="px-4 py-3 text-right" scope="col">Giá TB</th>
                    <th className="px-4 py-3 text-right" scope="col">Tăng trưởng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  <tr className="bg-primary/5 dark:bg-primary/10">
                    <td className="px-4 py-3 font-bold text-primary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Quận 1
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">120 tr</td>
                    <td className="px-4 py-3 text-right text-green-600 font-bold">+2.5%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-[#111418] dark:text-gray-200 pl-7">Quận 3</td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">105 tr</td>
                    <td className="px-4 py-3 text-right text-green-600 font-bold">+1.8%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-[#111418] dark:text-gray-200 pl-7">Bình Thạnh</td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">75 tr</td>
                    <td className="px-4 py-3 text-right text-green-600 font-bold">+3.2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="px-4 pt-4 pb-8 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Dữ liệu được cung cấp bởi Goland AI</p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="sticky bottom-0 z-50 border-t border-gray-100 bg-white/95 backdrop-blur-md p-4 pb-6 dark:border-gray-800 dark:bg-gray-900/95 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex w-full gap-3">
          <button className="group flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-bold text-gray-700 transition-all hover:border-primary/30 hover:bg-blue-50/50 active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            <span className="material-symbols-outlined text-[22px] text-gray-500 transition-colors group-hover:text-primary dark:text-gray-400">download</span>
            <span>Lưu báo cáo</span>
          </button>
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-600 active:scale-95"
          >
            <span className="material-symbols-outlined text-[22px]">share</span>
            <span>Chia sẻ</span>
          </button>
        </div>
      </div>

      {/* Share Modal (Bottom Sheet Overlay) */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end items-center animate-in fade-in duration-300">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#141414]/60 backdrop-blur-[2px]" 
            onClick={() => setIsShareModalOpen(false)}
          ></div>
          
          {/* Bottom Sheet Content */}
          <div className="relative w-full max-w-md bg-white dark:bg-[#1a2632] rounded-t-[32px] shadow-2xl flex flex-col pb-8 animate-in slide-in-from-bottom duration-300 ease-out">
            {/* Handle */}
            <div className="flex w-full flex-col items-center pt-4 pb-2">
              <div className="h-1.5 w-12 rounded-full bg-[#dbe0e6] dark:bg-gray-600"></div>
            </div>

            <div className="flex flex-col px-6 pt-2 pb-1 text-center">
              <h2 className="text-[#111418] dark:text-white tracking-tight text-2xl font-bold leading-tight">Chia sẻ Báo cáo</h2>
            </div>
            
            <div className="flex flex-col px-6 pb-6 text-center">
              <p className="text-[#617589] dark:text-gray-400 text-sm font-normal leading-normal">
                Chọn định dạng tệp bạn muốn trích xuất dữ liệu thị trường này.
              </p>
            </div>

            {/* Radio Options */}
            <div className="flex flex-col gap-3 px-5 mb-4">
              {/* PDF Option */}
              <label 
                className={`group relative flex items-center gap-4 rounded-2xl border p-4 cursor-pointer transition-all ${
                  shareFormat === 'pdf' 
                  ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm' 
                  : 'border-[#dbe0e6] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
                onClick={() => setShareFormat('pdf')}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                  <span className="material-symbols-outlined text-[28px]">picture_as_pdf</span>
                </div>
                <div className="flex grow flex-col">
                  <p className="text-[#111418] dark:text-white text-base font-bold leading-snug">Tài liệu PDF</p>
                  <p className="text-[#617589] dark:text-gray-400 text-xs font-normal leading-normal">Bao gồm dữ liệu chi tiết & biểu đồ</p>
                </div>
                <div className="relative flex items-center">
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    shareFormat === 'pdf' ? 'border-primary' : 'border-[#dbe0e6] dark:border-gray-500'
                  }`}>
                    {shareFormat === 'pdf' && <div className="h-3 w-3 rounded-full bg-primary animate-in zoom-in-50 duration-200"></div>}
                  </div>
                </div>
              </label>

              {/* Image Option */}
              <label 
                className={`group relative flex items-center gap-4 rounded-2xl border p-4 cursor-pointer transition-all ${
                  shareFormat === 'image' 
                  ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm' 
                  : 'border-[#dbe0e6] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
                onClick={() => setShareFormat('image')}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                  <span className="material-symbols-outlined text-[28px]">image</span>
                </div>
                <div className="flex grow flex-col">
                  <p className="text-[#111418] dark:text-white text-base font-bold leading-snug">Hình ảnh</p>
                  <p className="text-[#617589] dark:text-gray-400 text-xs font-normal leading-normal">Tóm tắt trực quan, tối ưu cho MXH</p>
                </div>
                <div className="relative flex items-center">
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    shareFormat === 'image' ? 'border-primary' : 'border-[#dbe0e6] dark:border-gray-500'
                  }`}>
                    {shareFormat === 'image' && <div className="h-3 w-3 rounded-full bg-primary animate-in zoom-in-50 duration-200"></div>}
                  </div>
                </div>
              </label>

              {/* Summary Option */}
              <label 
                className={`group relative flex items-center gap-4 rounded-2xl border p-4 cursor-pointer transition-all ${
                  shareFormat === 'summary' 
                  ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm' 
                  : 'border-[#dbe0e6] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
                onClick={() => setShareFormat('summary')}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  <span className="material-symbols-outlined text-[28px]">summarize</span>
                </div>
                <div className="flex grow flex-col">
                  <p className="text-[#111418] dark:text-white text-base font-bold leading-snug">Tóm tắt báo cáo</p>
                  <p className="text-[#617589] dark:text-gray-400 text-xs font-normal leading-normal">Bản tin cô đọng các điểm chính</p>
                </div>
                <div className="relative flex items-center">
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    shareFormat === 'summary' ? 'border-primary' : 'border-[#dbe0e6] dark:border-gray-500'
                  }`}>
                    {shareFormat === 'summary' && <div className="h-3 w-3 rounded-full bg-primary animate-in zoom-in-50 duration-200"></div>}
                  </div>
                </div>
              </label>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col px-5 gap-3 mt-2">
              <button 
                onClick={handleContinue}
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-14 bg-primary hover:bg-blue-600 transition-all text-white text-[17px] font-bold shadow-lg shadow-blue-500/25 active:scale-[0.98]"
              >
                <span>Tiếp tục</span>
                <span className="material-symbols-outlined ml-2 text-xl">arrow_forward</span>
              </button>
              <button 
                onClick={() => setIsShareModalOpen(false)}
                className="flex w-full cursor-pointer items-center justify-center rounded-2xl h-12 bg-transparent text-[#617589] dark:text-gray-400 hover:text-[#111418] dark:hover:text-white font-bold text-sm transition-colors"
              >
                Hủy
              </button>
            </div>
            
            {/* Safe Area Spacing */}
            <div className="h-4 w-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketReport;
