
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EventDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollY = scrollRef.current.scrollTop;
      const opacity = Math.min(scrollY / 180, 1);
      setHeaderOpacity(opacity);
    }
  };

  const speakers = [
    { name: 'Nguyễn Văn A', role: 'CEO Goland', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1yUDyQrz150eRCzUc5_ZJTiUjfRyqAWXUJyJ8CzbENfvLARnfqLyuR4-FfJw9FiM6jWen8xqmMIy_JYGFUblrfKexEwIaI4xd0KExC3C95Gf-zA9ZANeJFELRf6PmP0tDKyveLM7hc6_B13QuqNKNyhv71NjkSUyo1M4xw-KDPOpXmhcR_-AxSG_ZNHKrfNzfmukeeF3tLpvQkudAzH6DPmtvvYdKJyAm9nOGcuRmgPxon1BvNY_HxMQ36A6Dmc8HcXoe2J31QMUG' },
    { name: 'Trần Thị B', role: 'KTS Trưởng', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwuFgoTTqQjKxgYXRYpmik7BoGATwVpNesUAE645DUnxDhE-s9q9spzXWjdSCFQ01r9jGXJARNaKWUZ_sc0_Wukemk0OkuXv8RHKgKscJfSDY8CiB6GFkDAt9MDiK1zAqvR6OjotkFWAC6e27-rv2Ot150KD8tEF-Ep_8UJyEPMXyRQs80_23Rbhz9lv54nmVHiBRhu85M9VLuXQs6N7cQQTNIGgPXF9pSrRC2d7oZp8vxhIxa0jlvEErCfG3hg6zrZFxJG38u5QIN' },
    { name: 'Lê Hoàng C', role: 'Chuyên gia BĐS', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmuAqB-e_S-ajWMu3VBKZRfeK0978oeE3_KUb_rBDjqnpqZpfuOnpr-PXDeYIhyyar9hqfAIBLCvaIR9jL8pEuK_vr_oGpxbTW9dZh2d40Zf_y5scBGyyy0eCE_9RCqG1pL7B1AE09GR8W6SIbGdtGQifQOy4ZP4eI4gJFUTe733UmJ-Ovor9YAhlEBVenvMiZWrVgvsbfZ9BAKipF8ah2OP4H4UtiP6cuiAjlTip38OmBODPvdvlMSCJnr5ShG8z0_jUHF2yJCI8V' }
  ];

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-[#1a2430] shadow-2xl font-display">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 flex items-center bg-white/95 dark:bg-[#1a2430]/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={() => navigate(-1)}
          className="text-[#111418] dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
        </button>
        <h2 
          className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center truncate px-4 transition-opacity duration-300"
          style={{ opacity: headerOpacity }}
        >
          Sự kiện Độc Quyền: Ra Mắt Biểu Tượng Mới Goland Tower
        </h2>
        <div className="flex items-center justify-end gap-2">
          <button className="flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-[#111418] dark:text-white text-[24px]">ios_share</span>
          </button>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className={`material-symbols-outlined text-[#111418] dark:text-white text-[24px] ${isBookmarked ? 'filled' : ''}`}>
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto pb-24 no-scrollbar"
      >
        {/* Hero Image */}
        <div className="px-4 pt-2">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD9JDChk3gMtmSj81WuGZOVJcGhTbvW33Ez3IgdXfvzKEGiopPbAmG3DqLFAG1rOa0fZNdUMmg-r_dQ7BDoa7WosHiFr-GN9CG21ZeEzOAhTDBZ81bNNF_w5iyMlsPifZ29QyQnaWN28j6MHhPW1zX8mrgx1z8H_3XR8pXbK-aGZPq8EFHXaNjh6qw4Ehtg2UQi79grZI0-7nBLbjHza11wN-yaAcZf8fKL-xyfTtrcaOgg1N_m3sjtsavdEtPZtkJu3hnON_9ljWIG")' }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            {/* AI Badge on Image */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 border border-white/30 mb-2">
                <span className="material-symbols-outlined text-white text-[16px] filled">auto_awesome</span>
                <span className="text-xs font-semibold text-white uppercase tracking-tighter">Goland AI Recommendation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Title & Status */}
        <div className="px-4 pt-5">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center rounded-lg bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary ring-1 ring-inset ring-primary/20 uppercase">
              Sắp diễn ra
            </span>
            <span className="inline-flex items-center rounded-lg bg-green-50 dark:bg-green-900/30 px-2.5 py-1 text-[10px] font-bold text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20 uppercase">
              Miễn phí
            </span>
            <span className="inline-flex items-center rounded-lg bg-gray-100 dark:bg-gray-800 px-2.5 py-1 text-[10px] font-bold text-gray-600 dark:text-gray-300 uppercase">
              Hội thảo đầu tư
            </span>
          </div>
          <h1 className="text-[#111418] dark:text-white text-2xl font-extrabold leading-tight tracking-tight mb-2">
            Sự kiện Độc Quyền: Ra Mắt Biểu Tượng Mới Goland Tower
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">group</span>
            <span>128 người đã đăng ký tham gia</span>
          </p>
        </div>

        {/* Key Info Cards */}
        <div className="px-4 pt-6 flex flex-col gap-3">
          {/* Time Card */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <span className="material-symbols-outlined filled">calendar_month</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#111418] dark:text-white text-base font-bold truncate">Thứ Bảy, 25/11/2023</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm truncate">09:00 - 11:30</p>
            </div>
            <button className="text-primary text-[10px] font-black uppercase bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 transition-all active:scale-95">
              Thêm lịch
            </button>
          </div>
          {/* Location Card */}
          <div className="flex flex-col p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 shadow-sm gap-3">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined filled">location_on</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#111418] dark:text-white text-base font-bold">Goland Convention Center</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">Tầng 5, Tòa nhà Diamond, 123 Lê Duẩn, Quận 1, TP. Hồ Chí Minh</p>
              </div>
            </div>
            {/* Mini Map */}
            <div className="relative w-full h-32 rounded-lg overflow-hidden mt-1 border border-gray-200 dark:border-gray-700 group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAwlfbMr6zjsal34mfvMwjyv8d6LImB-dA9570ck9UT1I0iOMT2uJ4kxa6v-voE8B8psvl9IJnFlI-9KziTBHvcybBPc2kbPkr3Jn-Su_U_zXgkso9dr0bLplB9x5Ks8iQFUnYclNRsp8eXCBNqK8LItYnnk3WPB2hdBRDLDqrg9HiNTu_qZijfhGwH7YaVvvyZ6Lnzr9PUDirMo1vDv1NzmEHFh_nLJv1JEboeQnReTWZpAOLTT4MjCvirkcDSisbBF10RcQM4D7Er")' }}
              ></div>
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <button className="bg-white/90 dark:bg-gray-900/90 text-xs font-black uppercase text-[#111418] dark:text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-2 hover:scale-105 transition-transform border border-white/20">
                  <span className="material-symbols-outlined text-[18px] text-primary">map</span>
                  Mở bản đồ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Summary Section */}
        <div className="px-4 pt-6">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-5 border border-indigo-100 dark:border-indigo-800/30 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[20px] filled">smart_toy</span>
              <h3 className="text-indigo-900 dark:text-indigo-200 text-[10px] font-black uppercase tracking-widest">Goland AI Tóm tắt</h3>
            </div>
            <p className="text-indigo-800 dark:text-indigo-300 text-sm leading-relaxed font-medium italic">
              "Sự kiện phù hợp cho nhà đầu tư tìm kiếm cơ hội sinh lời cao tại trung tâm Quận 1. Tiềm năng tăng giá dự kiến 15%/năm. Có sự tham gia của các chuyên gia quy hoạch đô thị hàng đầu."
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 pt-8">
          <h3 className="text-[#111418] dark:text-white text-lg font-extrabold mb-4 uppercase tracking-tight">Giới thiệu sự kiện</h3>
          <div className={`text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed space-y-4 ${!isExpanded ? 'line-clamp-4' : ''}`}>
            <p>
              Khám phá không gian sống thượng lưu và cơ hội đầu tư hấp dẫn tại Goland Tower, sự kiện ra mắt độc quyền với nhiều ưu đãi và quà tặng đặc biệt.
            </p>
            <p>
              Khách mời sẽ được trải nghiệm không gian sống thượng lưu qua công nghệ thực tế ảo VR, đồng thời nhận được những ưu đãi độc quyền chỉ có tại sự kiện ra mắt lần này. Đây là cơ hội vàng để các nhà đầu tư chiến lược nắm bắt thị trường.
            </p>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-primary font-bold text-sm flex items-center gap-1 hover:underline"
          >
            {isExpanded ? 'Thu gọn' : 'Xem thêm'} 
            <span className={`material-symbols-outlined text-[18px] transition-transform ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span>
          </button>
        </div>

        {/* Speakers */}
        <div className="px-4 pt-10 pb-4">
          <h3 className="text-[#111418] dark:text-white text-lg font-extrabold mb-5 uppercase tracking-tight">Diễn giả & Khách mời</h3>
          <div className="flex overflow-x-auto gap-6 pb-4 -mx-4 px-4 no-scrollbar scroll-smooth snap-x">
            {speakers.map((speaker, idx) => (
              <div key={idx} className="flex flex-col items-center w-28 shrink-0 snap-center group">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 mb-3 shadow-md group-hover:scale-105 transition-transform duration-300 ring-4 ring-primary/5">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${speaker.img}")` }}></div >
                </div>
                <p className="text-[#111418] dark:text-white text-sm font-extrabold text-center line-clamp-1">{speaker.name}</p>
                <p className="text-gray-400 text-[10px] font-black uppercase text-center mt-0.5">{speaker.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Organizer Info */}
        <div className="px-4 pt-4 mb-12">
          <div className="flex items-center gap-4 py-6 border-t border-gray-100 dark:border-gray-800">
            <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700 shadow-inner">
              <div 
                className="w-10 h-10 bg-contain bg-center bg-no-repeat" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBNpPI2QsdAYhsB2dK9sG0IRFcf1pxotW0zX18-QfZW7dzxpqnO-nZwFNvPHSFTSQAjGn47Du-n4NvYTnhVUy17LWKXGR9ygL3caQi_QO6LWej3FJ0cwYCLuazmgwhFEyt0VgSibmLImZQF3G44JJyhPo17UNuliphtYfOKD_uP7WdkOJEPeKJImmB7lmZuqveOT08NZotk8Bn-MiiB7vFlDJXGc2aKTwH4LDRJHO9OvPIRT-Y2L6zzyys9QQyosH9DOXjqPbImeVC3")' }}
              ></div>
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-0.5">Đơn vị tổ chức</p>
              <p className="text-[#111418] dark:text-white font-extrabold text-base">Tập đoàn Goland Group</p>
            </div>
            <button className="bg-gray-50 dark:bg-gray-800 text-[#111418] dark:text-white px-4 py-2 rounded-lg text-xs font-black uppercase border border-gray-200 dark:border-gray-700 active:scale-95 transition-all">
              Liên hệ
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Footer Action */}
      <div className="sticky bottom-0 z-50 p-4 bg-white/95 dark:bg-[#1a2430]/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 pb-8 shadow-2xl">
        <button className="w-full bg-primary hover:bg-blue-600 text-white rounded-2xl h-14 text-base font-black uppercase tracking-wide shadow-xl shadow-blue-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
          Đăng ký tham gia
          <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
