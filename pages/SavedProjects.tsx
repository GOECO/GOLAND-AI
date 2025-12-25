
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  location: string;
  priceRange: string;
  progress?: string;
  status?: string;
  insight?: string;
  img: string;
  rating?: string;
  isSoldOut?: boolean;
  hasPriceAlert?: boolean;
  area: string;
  beds: number;
  baths: number;
  description?: string;
}

const SavedProjects: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'p1',
      name: 'The Matrix One',
      location: 'Mễ Trì, Nam Từ Liêm',
      priceRange: '5.2 - 10.5 Tỷ',
      progress: 'Tầng 32',
      insight: 'Giá tăng 2% hôm nay',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      rating: '4.8',
      hasPriceAlert: true,
      area: '86m²',
      beds: 2,
      baths: 2,
      description: 'Dự án hạng sang với tầm nhìn panorama triệu đô, đầy đủ tiện ích chuẩn 5 sao.'
    },
    {
      id: 'p2',
      name: 'Vinhomes Smart City',
      location: 'Tây Mỗ, Nam Từ Liêm',
      priceRange: '2.5 - 6.8 Tỷ',
      status: 'Sắp mở bán',
      insight: 'Nhu cầu thuê cao',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      area: '54m²',
      beds: 1,
      baths: 1,
      description: 'Thành phố thông minh đẳng cấp quốc tế đầu tiên tại Việt Nam.'
    },
    {
      id: 'p3',
      name: 'Ecopark Sky Oasis',
      location: 'Văn Giang, Hưng Yên',
      priceRange: '2.1 - 4.5 Tỷ',
      insight: 'Mới cập nhật bảng hàng',
      img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      hasPriceAlert: true,
      area: '72m²',
      beds: 2,
      baths: 2,
      description: 'Căn hộ nghỉ dưỡng xanh mát bên hồ điều hòa 54ha, chất sống resort.'
    },
    {
      id: 'p4',
      name: 'Imperia Garden',
      location: 'Thanh Xuân, Hà Nội',
      priceRange: '4.5 Tỷ',
      isSoldOut: true,
      img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80',
      area: '105m²',
      beds: 3,
      baths: 2,
      description: 'Vườn trong phố, không gian sống xanh yên bình giữa lòng thủ đô.'
    }
  ]);

  const toggleSelect = (id: string) => {
    if (!isEditMode) {
      navigate(`/property/${id === 'p1' ? '1' : '2'}`);
      return;
    }
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const togglePriceAlert = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, hasPriceAlert: !p.hasPriceAlert } : p
    ));
  };

  const handleEditToggle = () => {
    if (isEditMode) {
      setSelectedIds(new Set());
    }
    setIsEditMode(!isEditMode);
  };

  const filters = [
    { label: 'Tất cả', icon: 'check' },
    { label: 'Căn hộ', icon: 'apartment' },
    { label: 'Nhà phố', icon: 'villa' },
    { label: 'Giá tốt', icon: 'trending_up' }
  ];

  const activeAlertsCount = projects.filter(p => p.hasPriceAlert).length;

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display antialiased transition-colors duration-200">
      {/* Top App Bar */}
      <div className="sticky top-0 z-50 flex items-center bg-white dark:bg-surface-dark p-4 pb-3 justify-between shadow-sm border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-black leading-tight tracking-tight flex-1 uppercase text-text-main dark:text-white">
          {isEditMode ? 'Chọn dự án' : 'Dự án đã lưu'}
        </h2>
        <div className="flex w-16 items-center justify-end">
          <button 
            onClick={handleEditToggle}
            className="text-primary text-base font-black uppercase tracking-widest shrink-0 hover:opacity-80 transition-opacity"
          >
            {isEditMode ? 'Hủy' : 'Sửa'}
          </button>
        </div>
      </div>

      {/* Alerts Summary Widget */}
      {!isEditMode && activeAlertsCount > 0 && (
        <div className="px-4 py-3 bg-primary/5 border-b border-primary/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px] filled animate-pulse">notifications_active</span>
            </div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Đang theo dõi giá <span className="text-primary font-black">{activeAlertsCount}</span> dự án
            </p>
          </div>
          <button 
            onClick={() => navigate('/alert-settings')}
            className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
          >
            Cấu hình
          </button>
        </div>
      )}

      {/* Search Bar & Filters */}
      <div className={`transition-all duration-300 ${isEditMode ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        <div className="px-4 py-4 bg-white dark:bg-surface-dark border-b border-gray-50 dark:border-gray-800 transition-colors">
          <div className="flex w-full items-stretch rounded-2xl h-12 bg-gray-100 dark:bg-gray-800/60 overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-primary/40 transition-all">
            <div className="flex items-center justify-center pl-4 pr-2 text-gray-400">
              <span className="material-symbols-outlined text-[24px]">search</span>
            </div>
            <input 
              className="flex w-full flex-1 bg-transparent border-none text-sm font-bold text-text-main dark:text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none h-full" 
              placeholder="Tìm kiếm dự án, khu vực..." 
            />
            <div className="flex items-center justify-center pr-3 text-primary">
              <span className="material-symbols-outlined text-[24px]">tune</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 px-4 py-4 overflow-x-auto no-scrollbar bg-white dark:bg-surface-dark border-b border-gray-50 dark:border-gray-800 transition-colors">
          {filters.map((filter) => (
            <button 
              key={filter.label}
              onClick={() => setActiveFilter(filter.label)}
              className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-all active:scale-95 shadow-sm border ${
                activeFilter === filter.label 
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${activeFilter === filter.label ? 'text-white' : 'text-primary'}`}>{filter.icon}</span>
              <p className="text-sm font-black uppercase tracking-tight">{filter.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content List */}
      <div className="flex flex-col gap-5 p-4 pb-48 overflow-y-auto no-scrollbar">
        {projects.map((project, idx) => {
          const isSelected = selectedIds.has(project.id);
          const isLarge = idx === 0;

          return (
            <div key={project.id} className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
              {isEditMode && (
                <div 
                  onClick={() => toggleSelect(project.id)}
                  className="shrink-0 cursor-pointer p-1 -ml-1 transition-transform active:scale-90"
                >
                  <span className={`material-symbols-outlined text-[28px] transition-colors ${isSelected ? 'text-primary filled' : 'text-gray-300 dark:text-gray-600'}`}>
                    {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </div>
              )}
              
              <div 
                onClick={() => toggleSelect(project.id)}
                className={`flex flex-1 transition-all duration-300 overflow-hidden ${
                  isLarge 
                  ? 'flex-col rounded-[2.5rem] bg-white dark:bg-surface-dark shadow-soft' 
                  : 'gap-4 p-4 rounded-[2rem] bg-white dark:bg-surface-dark shadow-sm'
                } ${isEditMode && isSelected ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-background-dark scale-[0.98]' : ''} ${isEditMode && !isSelected ? 'opacity-60 grayscale-[0.3]' : ''} border border-gray-100 dark:border-gray-800 relative`}
              >
                {/* Large Card Styling */}
                {isLarge ? (
                  <>
                    <div className="relative h-44 w-full bg-gray-200 overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.img})` }}></div>
                      {project.rating && (
                        <div className="absolute top-4 right-4 bg-white/95 dark:bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-lg border border-primary/10">
                          <span className="material-symbols-outlined text-[16px] text-amber-500 filled">star</span>
                          <span className="text-xs font-black text-slate-900 dark:text-white">{project.rating}</span>
                        </div>
                      )}
                      
                      {/* Interactive Price Alert Toggle */}
                      <button 
                        onClick={(e) => togglePriceAlert(e, project.id)}
                        className={`absolute top-4 left-4 backdrop-blur-md size-9 rounded-full flex items-center justify-center shadow-lg border transition-all active:scale-90 ${
                          project.hasPriceAlert 
                          ? 'bg-primary/90 text-white border-primary/20 scale-110' 
                          : 'bg-white/70 dark:bg-black/60 text-gray-400 border-white/20'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[20px] ${project.hasPriceAlert ? 'filled animate-pulse' : ''}`}>notifications_active</span>
                      </button>

                      {project.insight && (
                        <div className="absolute bottom-4 left-4 bg-primary/95 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 border border-white/20">
                          <span className="material-symbols-outlined text-[16px] filled">auto_awesome</span>
                          {project.insight}
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight truncate">{project.name}</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-[11px] font-bold uppercase tracking-widest mt-1.5 truncate">{project.location}</p>
                        </div>
                        {!isEditMode && (
                          <button className="text-primary hover:scale-110 active:scale-90 transition-transform">
                            <span className="material-symbols-outlined text-3xl filled">favorite</span>
                          </button>
                        )}
                      </div>

                      {/* Specs Row */}
                      <div className="flex items-center gap-4 py-1">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-primary text-[18px]">straighten</span>
                          <span className="text-xs font-bold text-slate-700 dark:text-gray-300">{project.area}</span>
                        </div>
                        <div className="w-px h-3 bg-gray-200 dark:bg-gray-700"></div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-primary text-[18px]">bed</span>
                          <span className="text-xs font-bold text-slate-700 dark:text-gray-300">{project.beds} PN</span>
                        </div>
                        <div className="w-px h-3 bg-gray-200 dark:bg-gray-700"></div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-primary text-[18px]">bathtub</span>
                          <span className="text-xs font-bold text-slate-700 dark:text-gray-300">{project.baths} WC</span>
                        </div>
                      </div>

                      {project.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-lg font-black text-primary">{project.priceRange}</span>
                        {project.progress && (
                          <div className="flex flex-col gap-1.5 min-w-[100px]">
                            <div className="flex justify-between items-center px-0.5">
                              <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Tiến độ</span>
                              <span className="text-[8px] font-black text-primary uppercase tracking-widest">{project.progress}</span>
                            </div>
                            <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                              <div className="h-full bg-primary w-3/4 rounded-full"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Compact Horizontal Styling */
                  <>
                    <div className={`w-32 h-32 shrink-0 rounded-[1.5rem] overflow-hidden relative shadow-sm ${project.isSoldOut ? 'grayscale' : ''}`}>
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${project.img})` }}></div>
                      {project.status && (
                        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white border border-white/20">{project.status}</div>
                      )}
                      
                      {/* Interactive Price Alert Toggle (Compact) */}
                      <button 
                        onClick={(e) => togglePriceAlert(e, project.id)}
                        className={`absolute bottom-2 right-2 backdrop-blur-md size-7 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 ${
                          project.hasPriceAlert 
                          ? 'bg-primary text-white' 
                          : 'bg-white/90 dark:bg-black/80 text-gray-400'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[16px] ${project.hasPriceAlert ? 'filled' : ''}`}>notifications_active</span>
                      </button>

                      {project.isSoldOut && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-[9px] font-black text-white uppercase tracking-widest bg-red-600 px-2 py-1 rounded-lg">Hết hàng</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 justify-between py-0.5 min-w-0">
                      <div>
                        <div className="flex justify-between items-start mb-0.5">
                          <h3 className="text-[15px] font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight truncate">{project.name}</h3>
                          {!isEditMode && !project.isSoldOut && (
                             <button className="text-red-500 shrink-0 ml-1 hover:scale-110 transition-transform">
                               <span className="material-symbols-outlined text-[20px] filled">favorite</span>
                             </button>
                          )}
                        </div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 truncate">{project.location}</p>
                        
                        {/* Compact Specs */}
                        <div className="flex items-center gap-3 mb-2">
                           <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-gray-400">
                             <span className="material-symbols-outlined text-[16px] text-primary">bed</span>
                             {project.beds}
                           </div>
                           <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-gray-400">
                             <span className="material-symbols-outlined text-[16px] text-primary">bathtub</span>
                             {project.baths}
                           </div>
                           <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-gray-400">
                             <span className="material-symbols-outlined text-[16px] text-primary">straighten</span>
                             {project.area}
                           </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-primary">{project.priceRange}</span>
                          {project.insight && (
                            <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-lg ${project.insight.includes('thuê') ? 'bg-blue-50 dark:bg-blue-900/20 text-primary' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600'} text-[8px] font-black uppercase tracking-widest border border-black/5`}>
                              <span className="material-symbols-outlined text-[12px]">{project.insight.includes('thuê') ? 'trending_up' : 'update'}</span>
                              {project.insight}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Action Bar (Edit Mode Only) */}
      {isEditMode && (
        <div className="fixed bottom-10 left-0 right-0 z-50 px-6 max-w-md mx-auto animate-in slide-in-from-bottom-10 duration-500 pointer-events-none">
          <div className="pointer-events-auto bg-primary dark:bg-[#1a2632] rounded-[2.5rem] shadow-2xl shadow-primary/30 border border-white/10 overflow-hidden flex flex-col p-1.5">
            {/* Header part of the bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 mb-1">
              <div className="flex items-center gap-3">
                <div className="size-6 rounded-full bg-white flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px] filled">check_circle</span>
                </div>
                <span className="text-sm font-black text-white uppercase tracking-tight">Đã chọn {selectedIds.size} dự án</span>
              </div>
              <button 
                onClick={handleEditToggle}
                className="size-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Actions Grid */}
            <div className="flex items-center justify-between gap-2 p-1.5">
              <button className="flex flex-1 flex-col items-center justify-center py-3 rounded-xl hover:bg-white/10 transition-colors group">
                <span className="material-symbols-outlined text-[24px] text-white group-hover:scale-110 transition-transform">heart_minus</span>
                <span className="text-[10px] font-black uppercase tracking-widest mt-1 text-white/90">Bỏ thích</span>
              </button>
              <button className="flex flex-1 flex-col items-center justify-center py-3 rounded-xl hover:bg-white/10 transition-colors group">
                <span className="material-symbols-outlined text-[24px] text-white group-hover:scale-110 transition-transform">notifications_active</span>
                <span className="text-[10px] font-black uppercase tracking-widest mt-1 text-white/90">Đặt báo giá</span>
              </button>
              <button 
                onClick={() => navigate('/share-preview')}
                className="flex flex-1 flex-col items-center justify-center py-3 rounded-xl bg-white hover:bg-gray-50 dark:bg-primary/10 dark:hover:bg-primary/20 transition-colors group"
              >
                <span className="material-symbols-outlined text-[24px] text-primary dark:text-blue-400 group-hover:scale-110 transition-transform">ios_share</span>
                <span className="text-[10px] font-black uppercase tracking-widest mt-1 text-primary dark:text-blue-400">Chia sẻ</span>
              </button>
              <button className="flex flex-1 flex-col items-center justify-center py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition-colors group border border-red-500/20">
                <span className="material-symbols-outlined text-[24px] text-red-500 group-hover:scale-110 transition-transform">delete</span>
                <span className="text-[10px] font-black uppercase tracking-widest mt-1 text-red-400">Xóa</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedProjects;
