
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewsDetail: React.FC = () => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const relatedNews = [
    {
      id: 'r1',
      tag: 'Phân tích',
      title: 'Dòng tiền đổ về Thủ Đức',
      desc: 'Hạ tầng giao thông hoàn thiện thúc đẩy giá trị bất động sản tăng trưởng bền vững.',
      time: '4 giờ trước',
      color: 'text-primary',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300'
    },
    {
      id: 'r2',
      tag: 'Cảnh báo',
      title: 'Lãi suất vay mua nhà',
      desc: 'Dự báo xu hướng lãi suất trong 6 tháng tới và lời khuyên cho nhà đầu tư cá nhân.',
      time: '6 giờ trước',
      color: 'text-orange-500',
      img: 'https://images.unsplash.com/photo-1512453979798-5eaad0ff3e01?auto=format&fit=crop&w=300'
    },
    {
      id: 'r3',
      tag: 'Quy hoạch',
      title: 'Bản đồ quy hoạch 2025',
      desc: 'Những thay đổi quan trọng trong quy hoạch sử dụng đất tại các quận trung tâm.',
      time: '1 ngày trước',
      color: 'text-emerald-500',
      img: 'https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=300'
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-news antialiased selection:bg-primary/30 text-slate-900 dark:text-slate-50 relative overflow-x-hidden">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold text-center flex-1 text-gray-900 dark:text-white truncate px-2 font-news tracking-tight">Tin tức Goland AI</h2>
        <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-900 dark:text-white transition-colors">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-32 w-full max-w-3xl mx-auto overflow-y-auto no-scrollbar">
        {/* Hero Section */}
        <div className="px-4 pt-6 pb-2">
          <div className="inline-flex items-center px-2.5 py-1 mb-4 rounded bg-primary/10 dark:bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider font-body">
            Thị trường
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 dark:text-white tracking-tight mb-4">
            Biến động thị trường: Tại sao giá BĐS Quận 2 tăng vọt trong Quý 4?
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-[#9dabb9] mb-6 font-body">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-primary">smart_toy</span>
              <span className="font-bold text-primary">AI Market Watch</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <span className="font-medium">2 giờ trước</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full px-4 mb-8">
          <div className="w-full aspect-video rounded-2xl bg-gray-200 dark:bg-gray-800 overflow-hidden relative shadow-md">
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaPc11lVR7_LtWQ4YgW5EY-pIMpDKjtUDsJpJvJxoXqxzh2xYOh1DTMY0r0SPFJtQkht7Cyt4XP-xq-ql0XKbEAwhvvYTDVCWanqQsXKoDjy9vcd7AaSLAV91AJx3wZWj-3tm_mgqAcWneP8I6SIZtCPVIuv5Qo7CK9veaZLXcl90DFrKy1imMrLUI4GVuuhcnU3Z6kwV_pvLo64fMAaA_TzgEK2msVAXszCByM4ZoASTYZH4JmL5qtsZFRzgSyxBZaEss85z-f5i5')" }}
            ></div>
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white/90 text-[10px] font-body font-bold">Ảnh minh họa: Khu đô thị mới Thủ Thiêm</p>
            </div>
          </div>
        </div>

        {/* AI Summary Accordion */}
        <div className="px-4 mb-6">
          <details className="group flex flex-col rounded-xl border border-primary/20 bg-white dark:bg-[#151c24] overflow-hidden shadow-sm" open>
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-4 bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors list-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white">
                  <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                </div>
                <p className="text-gray-900 dark:text-white text-sm font-bold font-body uppercase tracking-wide">Tóm tắt bởi AI</p>
              </div>
              <span className="material-symbols-outlined text-gray-500 group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <div className="px-4 py-4 bg-white dark:bg-[#151c24] animate-in fade-in slide-in-from-top-2">
              <p className="text-gray-700 dark:text-[#9dabb9] text-base leading-relaxed border-l-2 border-primary/40 pl-4 italic">
                Dữ liệu AI cho thấy sự gia tăng <span className="text-primary font-bold">15%</span> trong nhu cầu tìm kiếm tại Quận 2 do hạ tầng mới hoàn thiện. Các nhà đầu tư nên cân nhắc thời điểm này để chốt lời hoặc tái cơ cấu danh mục đầu tư dài hạn.
              </p>
            </div>
          </details>
        </div>

        {/* RELATED NEWS CAROUSEL SECTION */}
        <div className="mb-8">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-body tracking-tight uppercase">Đọc thêm cho bạn</h3>
            <span className="material-symbols-outlined text-primary">keyboard_double_arrow_right</span>
          </div>
          <div className="flex overflow-x-auto no-scrollbar gap-4 px-4 pb-2 snap-x">
            {relatedNews.map((news) => (
              <div 
                key={news.id} 
                className="flex-none w-[280px] bg-white dark:bg-[#151c24] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm snap-start group cursor-pointer active:scale-95 transition-all"
              >
                <div className="relative h-32 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                    style={{ backgroundImage: `url(${news.img})` }}
                  ></div>
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-0.5 rounded bg-white/90 dark:bg-gray-900/90 text-[9px] font-bold uppercase tracking-wider ${news.color}`}>
                      {news.tag}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight mb-1.5 line-clamp-2 font-news tracking-tight">
                    {news.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-2 font-body font-medium">
                    {news.desc}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[9px] font-bold text-gray-400 uppercase font-body">{news.time}</span>
                    <span className="material-symbols-outlined text-primary text-[18px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Article Body Content */}
        <div className="px-4 space-y-6 text-[18px] leading-[1.8] text-gray-800 dark:text-[#E0E0E0] font-news">
          <p>
            <span className="first-letter:text-5xl first-letter:font-bold first-letter:text-gray-900 first-letter:dark:text-white first-letter:mr-3 first-letter:float-left leading-[0.8]">T</span>heo báo cáo mới nhất từ hệ thống Goland AI, khu vực Quận 2 đang chứng kiến một làn sóng đầu tư mạnh mẽ chưa từng thấy trong vòng 3 năm qua. Sự thay đổi này không chỉ đến từ các dự án hạ tầng trọng điểm như Cầu Thủ Thiêm 2 và tuyến Metro số 1 sắp vận hành, mà còn do sự dịch chuyển dòng vốn từ các khu vực lân cận đang bị bão hòa.
          </p>
          <p>
            Ông Nguyễn Văn A, Giám đốc Chiến lược tại Goland Group, nhận định: "Thị trường đang phản ứng tích cực với các tín hiệu vĩ mô. Người mua nhà hiện nay không chỉ tìm kiếm nơi ở, họ tìm kiếm một hệ sinh thái sống thông minh."
          </p>

          <figure className="my-10">
            <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 shadow-lg">
              <div 
                className="aspect-[4/3] bg-cover bg-center" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCNKQNzib9-xVDyqwTUgN6MnkSrMesmvihaBfMOFcH-HzIvoIoSXP0Wx6F618iq5KAbW8LUybgkmU-Z1tPN7PGn_rZSFjDMhi_SHl8HrmVWpq_hFKUjgdObI6zZHcvc6fwnOwJFR0wBRjSIDCQTk9jUz2pPLKYKVkAyAI6Tvtg3xMgN8ec2Bg4dUT284-xa2koh_CMrYQNA22VSzLCBb9Xd7N28MP2sE1fGmq6UFvnjErpnYzZAviFs461MdMKsap5Z6YLUi7ny_FXu')" }}
              ></div>
              <figcaption className="p-3 text-sm text-center font-body text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/5">
                Biểu đồ tăng trưởng giá Q4/2023 - Nguồn: Goland Data
              </figcaption>
            </div>
          </figure>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4 tracking-tight">Dự báo ngắn hạn</h3>
          <p>
            Các chuyên gia AI của chúng tôi dự báo đà tăng này sẽ tiếp tục duy trì ít nhất đến hết Quý 1 năm sau. Tuy nhiên, người mua cần thận trọng với các dự án pháp lý chưa hoàn thiện.
          </p>
          <p>
            Goland AI khuyến nghị sử dụng công cụ <span onClick={() => navigate('/map')} className="bg-primary/20 text-primary dark:text-blue-300 px-1 rounded cursor-pointer font-medium hover:bg-primary/30 transition-colors">Kiểm tra Quy hoạch</span> tích hợp ngay trên ứng dụng để rà soát kỹ lưỡng trước khi xuống tiền.
          </p>
        </div>

        <div className="h-px bg-gray-200 dark:bg-gray-800 w-full my-8"></div>

        {/* Existing Bottom Related Content Section (Modified to not duplicate) */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Có thể bạn quan tâm</h3>
            <button className="text-primary text-sm font-body font-medium hover:underline">Xem tất cả</button>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { tag: 'Tin nhanh', title: 'Tiến độ bàn giao căn hộ Lumiere Riverside', time: '12 giờ trước', color: 'text-indigo-500', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300' },
              { tag: 'Đầu tư', title: 'Lợi nhuận cho thuê tại Quận 7 chạm mốc 8%', time: '1 ngày trước', color: 'text-emerald-500', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=300' }
            ].map((news, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl bg-white dark:bg-[#151c24] border border-gray-100 dark:border-gray-800 shadow-sm active:scale-[0.98] transition-transform cursor-pointer">
                <div 
                  className="w-24 h-24 shrink-0 rounded-lg bg-gray-200 dark:bg-gray-800 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${news.img})` }}
                ></div>
                <div className="flex flex-col justify-center min-w-0">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${news.color} mb-1 font-body`}>{news.tag}</span>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 mb-2 font-news">{news.title}</h4>
                  <p className="text-xs text-gray-400 font-body">{news.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#101922]/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-40 max-w-[480px] mx-auto shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-1">
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="flex flex-col items-center justify-center w-14 h-12 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group"
            >
              <span className={`material-symbols-outlined text-gray-600 dark:text-gray-400 group-hover:text-primary mb-0.5 ${isBookmarked ? 'text-primary fill-current' : ''}`}>
                {isBookmarked ? 'bookmark_added' : 'bookmark'}
              </span>
              <span className="text-[10px] font-body font-medium text-gray-500 dark:text-gray-400">Lưu</span>
            </button>
            <button 
              onClick={() => navigate('/share-preview')}
              className="flex flex-col items-center justify-center w-14 h-12 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group"
            >
              <span className="material-symbols-outlined text-gray-600 dark:text-gray-400 group-hover:text-primary mb-0.5">ios_share</span>
              <span className="text-[10px] font-body font-medium text-gray-500 dark:text-gray-400">Chia sẻ</span>
            </button>
          </div>
          <button className="flex-1 h-12 bg-primary hover:bg-blue-600 text-white font-body font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>Đánh dấu đã đọc</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
