
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAlert: React.FC = () => {
  const navigate = useNavigate();
  
  const [alertName, setAlertName] = useState('');
  const [propertyType, setPropertyType] = useState('Căn hộ');
  const [priceRange, setPriceRange] = useState({ min: 2, max: 10 });
  const [areaRange, setAreaRange] = useState({ min: 50, max: 120 });
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [priceDropActive, setPriceDropActive] = useState(true);
  const [priceDropPercent, setPriceDropPercent] = useState(5);
  const [frequency, setFrequency] = useState('immediate');

  const propertyTypes = ['Căn hộ', 'Đất nền', 'Nhà phố', 'Biệt thự', 'Shophouse'];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-[#111418] dark:text-gray-100 relative overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center bg-white dark:bg-surface-dark p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
        <button 
          onClick={() => navigate(-1)}
          className="text-[#111418] dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer transition-all active:scale-90"
        >
          <span className="material-symbols-outlined text-2xl font-bold">arrow_back_ios_new</span>
        </button>
        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Tạo Cảnh báo</h2>
        <div className="flex w-16 items-center justify-end">
          <button 
            onClick={() => {
              setAlertName('');
              setPropertyType('Căn hộ');
              setPriceRange({ min: 2, max: 10 });
              setAreaRange({ min: 50, max: 120 });
              setBedrooms(2);
              setBathrooms(1);
            }}
            className="text-[#617589] dark:text-gray-400 text-sm font-bold leading-normal tracking-tight shrink-0 hover:text-primary transition-colors"
          >
            Đặt lại
          </button>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Section 1: Basic Info */}
        <div className="px-4 py-5 space-y-6">
          {/* Alert Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[#111418] dark:text-gray-200 text-sm font-bold leading-normal px-1">
              Tên cảnh báo <span className="text-gray-400 font-normal">(Tùy chọn)</span>
            </label>
            <input 
              className="form-input flex w-full min-w-0 flex-1 rounded-2xl text-[#111418] dark:text-white dark:bg-[#1a2632] focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#dbe0e6] dark:border-gray-700 bg-white focus:border-primary h-12 placeholder:text-[#9aa2ac] px-4 text-base font-medium leading-normal transition-all shadow-sm" 
              placeholder="Ví dụ: Căn hộ Quận 1 đầu tư" 
              value={alertName}
              onChange={(e) => setAlertName(e.target.value)}
            />
          </div>

          {/* Property Type */}
          <div className="flex flex-col gap-3">
            <label className="text-[#111418] dark:text-gray-200 text-sm font-bold leading-normal px-1">Loại bất động sản</label>
            <div className="flex gap-2 flex-wrap">
              {propertyTypes.map((type) => (
                <button 
                  key={type}
                  onClick={() => setPropertyType(type)}
                  className={`group flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-4 transition-all border ${
                    propertyType === type 
                    ? 'bg-primary/10 border-primary/20 text-primary' 
                    : 'bg-gray-100 dark:bg-gray-800 border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className={`text-sm leading-normal ${propertyType === type ? 'font-bold' : 'font-medium'}`}>{type}</span>
                  {propertyType === type && <span className="material-symbols-outlined text-primary text-[18px]">check</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <label className="text-[#111418] dark:text-gray-200 text-sm font-bold leading-normal px-1">Khu vực quan tâm</label>
            <div className="relative flex w-full items-stretch rounded-2xl shadow-sm overflow-hidden">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400">search</span>
              </div>
              <input 
                className="form-input flex w-full min-w-0 flex-1 border-none bg-white dark:bg-[#1a2632] focus:outline-0 focus:ring-0 h-12 placeholder:text-[#9aa2ac] pl-11 pr-12 text-base font-medium leading-normal ring-1 ring-inset ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-primary" 
                placeholder="Nhập địa điểm, dự án..." 
                onClick={() => navigate('/map-selection')}
              />
              <button 
                onClick={() => navigate('/map-selection')}
                className="absolute right-0 h-full px-4 bg-gray-50/50 dark:bg-[#1f2b37]/50 border-l border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              >
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">map</span>
              </button>
            </div>
          </div>
        </div>

        <div className="h-2 bg-gray-50 dark:bg-[#0d141c]"></div>

        {/* Section 2: Specs */}
        <div className="px-4 py-6 space-y-8">
          {/* Price Range */}
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center px-1">
              <label className="text-[#111418] dark:text-gray-200 text-sm font-bold leading-normal uppercase tracking-wider">Khoảng giá (Tỷ VNĐ)</label>
              <span className="text-primary text-sm font-extrabold">{priceRange.min} - {priceRange.max} Tỷ+</span>
            </div>
            {/* Visual Double Slider Simulator */}
            <div className="relative h-6 w-full flex items-center px-2">
              <div className="absolute w-[calc(100%-16px)] h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="absolute left-[15%] right-[25%] h-1.5 bg-primary rounded-full"></div>
              {/* Thumbs */}
              <div className="absolute left-[15%] -ml-3 w-6 h-6 bg-white dark:bg-[#1a2632] border-2 border-primary rounded-full shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform flex items-center justify-center">
                <div className="size-1.5 rounded-full bg-primary"></div>
              </div>
              <div className="absolute right-[25%] -mr-3 w-6 h-6 bg-white dark:bg-[#1a2632] border-2 border-primary rounded-full shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform flex items-center justify-center">
                <div className="size-1.5 rounded-full bg-primary"></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input 
                  className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] px-3 text-sm font-bold dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-center shadow-sm" 
                  type="number" 
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                />
                <span className="absolute right-3 top-3 text-[9px] text-gray-400 font-black uppercase">MIN</span>
              </div>
              <span className="text-gray-300 font-bold">−</span>
              <div className="relative flex-1">
                <input 
                  className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] px-3 text-sm font-bold dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-center shadow-sm" 
                  type="number" 
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                />
                <span className="absolute right-3 top-3 text-[9px] text-gray-400 font-black uppercase">MAX</span>
              </div>
            </div>
          </div>

          {/* Area Range */}
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center px-1">
              <label className="text-[#111418] dark:text-gray-200 text-sm font-bold leading-normal uppercase tracking-wider">Diện tích (m²)</label>
              <span className="text-primary text-sm font-extrabold">{areaRange.min} - {areaRange.max} m²</span>
            </div>
            {/* Visual Double Slider Simulator */}
            <div className="relative h-6 w-full flex items-center px-2">
              <div className="absolute w-[calc(100%-16px)] h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="absolute left-[5%] right-[45%] h-1.5 bg-primary rounded-full"></div>
              <div className="absolute left-[5%] -ml-3 w-6 h-6 bg-white dark:bg-[#1a2632] border-2 border-primary rounded-full shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform flex items-center justify-center">
                <div className="size-1.5 rounded-full bg-primary"></div>
              </div>
              <div className="absolute right-[45%] -mr-3 w-6 h-6 bg-white dark:bg-[#1a2632] border-2 border-primary rounded-full shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform flex items-center justify-center">
                <div className="size-1.5 rounded-full bg-primary"></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input 
                  className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] px-3 text-sm font-bold dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-center shadow-sm" 
                  type="number" 
                  value={areaRange.min}
                  onChange={(e) => setAreaRange({...areaRange, min: Number(e.target.value)})}
                />
                <span className="absolute right-3 top-3 text-[9px] text-gray-400 font-black uppercase">MIN</span>
              </div>
              <span className="text-gray-300 font-bold">−</span>
              <div className="relative flex-1">
                <input 
                  className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a2632] px-3 text-sm font-bold dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-center shadow-sm" 
                  type="number" 
                  value={areaRange.max}
                  onChange={(e) => setAreaRange({...areaRange, max: Number(e.target.value)})}
                />
                <span className="absolute right-3 top-3 text-[9px] text-gray-400 font-black uppercase">MAX</span>
              </div>
            </div>
          </div>

          {/* Rooms Selection */}
          <div className="space-y-5 px-1">
            <div className="flex items-center justify-between">
              <span className="text-[#111418] dark:text-gray-200 text-sm font-bold uppercase tracking-wider">Phòng ngủ</span>
              <div className="flex gap-2.5">
                {[1, 2, 3, '4+'].map((num) => (
                  <button 
                    key={num}
                    onClick={() => setBedrooms(typeof num === 'string' ? 4 : num)}
                    className={`w-10 h-10 rounded-full border transition-all text-sm font-bold flex items-center justify-center ${
                      (typeof num === 'string' ? bedrooms >= 4 : bedrooms === num)
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-110' 
                      : 'border-gray-200 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#111418] dark:text-gray-200 text-sm font-bold uppercase tracking-wider">Phòng tắm</span>
              <div className="flex gap-2.5">
                {[1, 2, '3+'].map((num) => (
                  <button 
                    key={num}
                    onClick={() => setBathrooms(typeof num === 'string' ? 3 : num)}
                    className={`w-10 h-10 rounded-full border transition-all text-sm font-bold flex items-center justify-center ${
                      (typeof num === 'string' ? bathrooms >= 3 : bathrooms === num)
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-110' 
                      : 'border-gray-200 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-2 bg-gray-50 dark:bg-[#0d141c]"></div>

        {/* Section 3: AI Triggers */}
        <div className="px-4 py-6 space-y-6">
          <div className="flex items-center gap-3 mb-2 px-1">
            <span className="material-symbols-outlined text-primary font-bold">auto_awesome</span>
            <h3 className="text-[#111418] dark:text-white text-base font-extrabold uppercase tracking-tight">Cấu hình Goland AI</h3>
          </div>
          
          {/* Price Drop Trigger */}
          <div className="bg-gray-50 dark:bg-[#1f2b37] rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
            <label className="flex items-center justify-between mb-4 cursor-pointer">
              <span className="text-[#111418] dark:text-gray-200 text-sm font-bold">Kích hoạt khi giá giảm</span>
              <div className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={priceDropActive} 
                  onChange={() => setPriceDropActive(!priceDropActive)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
              </div>
            </label>
            <div className={`relative transition-opacity ${priceDropActive ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              <input 
                className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#253341] pl-5 pr-10 text-base font-bold dark:text-white focus:border-primary focus:ring-0 outline-none shadow-inner" 
                type="number" 
                value={priceDropPercent}
                onChange={(e) => setPriceDropPercent(Number(e.target.value))}
              />
              <span className="absolute right-5 top-2.5 text-sm text-gray-500 font-black">%</span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3 font-medium px-1">AI sẽ thông báo ngay khi có BĐS phù hợp giảm giá từ mức cài đặt trở lên.</p>
          </div>

          {/* Frequency Selection */}
          <div className="flex flex-col gap-3 px-1">
            <label className="text-[#111418] dark:text-gray-200 text-sm font-bold leading-normal">Tần suất nhận tin</label>
            <div className="grid grid-cols-3 gap-2 bg-gray-100 dark:bg-[#1f2b37] p-1.5 rounded-2xl">
              {[
                { id: 'immediate', label: 'Tức thời' },
                { id: 'daily', label: 'Hàng ngày' },
                { id: 'weekly', label: 'Hàng tuần' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setFrequency(item.id)}
                  className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all ${
                    frequency === item.id 
                    ? 'bg-white dark:bg-[#253341] shadow-md border border-gray-200 dark:border-gray-600' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-[#253341]/40'
                  }`}
                >
                  <span className={`text-xs font-bold ${frequency === item.id ? 'text-primary' : ''}`}>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-start gap-2 mt-1">
              <span className="material-symbols-outlined text-orange-500 text-[18px]">bolt</span>
              <p className="text-[11px] text-gray-500 italic font-medium">Khuyên dùng "Tức thời" cho thị trường đang sốt để chốt deal sớm.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#101922]/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 p-4 pb-8 flex flex-col gap-3 z-40 max-w-[480px] mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <button 
          onClick={() => navigate(-1)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary h-14 px-5 transition-all hover:bg-blue-600 shadow-xl shadow-primary/30 active:scale-[0.98] group"
        >
          <span className="text-white text-base font-black leading-normal tracking-wide">LƯU CẢNH BÁO</span>
          <span className="material-symbols-outlined text-white text-[20px] group-hover:translate-x-1 transition-transform">check_circle</span>
        </button>
        <button 
          onClick={() => navigate(-1)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-transparent h-10 px-5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-bold text-sm"
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  );
};

export default CreateAlert;
