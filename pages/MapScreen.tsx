
import React, { useState, useEffect, useMemo } from 'react';
import { PROPERTIES } from '../constants';
import { useNavigate } from 'react-router-dom';
import { Property } from '../types';

const MapScreen: React.FC = () => {
  const navigate = useNavigate();
  
  // Filter States
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [activeDistrict, setActiveDistrict] = useState('Tất cả');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [transactionType, setTransactionType] = useState<'buy' | 'rent'>('buy');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]); // Scale 0-100 for simplicity
  const [selectedBeds, setSelectedBeds] = useState<number | 'all'>('all');
  
  const districts = [
    'Tất cả', 
    'Quận 1', 
    'Thủ Thiêm', 
    'Bình Thạnh', 
    'Thảo Điền',
    'Quận 7', 
    'Thủ Đức', 
    'Quận 3', 
    'Quận 9'
  ];
  
  const propertyTypes = [
    { label: 'Căn hộ', value: 'apartment', icon: 'apartment' },
    { label: 'Nhà phố', value: 'house', icon: 'home' },
    { label: 'Đất nền', value: 'land', icon: 'landscape' },
    { label: 'Biệt thự', value: 'villa', icon: 'villa' }
  ];

  const bedOptions = [
    { label: 'Tất cả PN', value: 'all', icon: 'bed' },
    { label: '1 PN', value: 1, icon: 'filter_1' },
    { label: '2 PN', value: 2, icon: 'filter_2' },
    { label: '3 PN', value: 3, icon: 'filter_3' },
    { label: '4+ PN', value: 4, icon: 'filter_4' }
  ];

  // Price chips change based on transaction type
  const priceOptions = transactionType === 'buy' ? [
    { label: 'Mọi giá', value: [0, 100] as [number, number] },
    { label: '< 5 Tỷ', value: [0, 5] as [number, number] },
    { label: '5 - 10 Tỷ', value: [5, 10] as [number, number] },
    { label: '10 - 20 Tỷ', value: [10, 20] as [number, number] },
    { label: '> 20 Tỷ', value: [20, 100] as [number, number] }
  ] : [
    { label: 'Mọi giá', value: [0, 100] as [number, number] },
    { label: '< 10 Tr', value: [0, 10] as [number, number] },
    { label: '10 - 20 Tr', value: [10, 20] as [number, number] },
    { label: '20 - 30 Tr', value: [20, 30] as [number, number] },
    { label: '> 30 Tr', value: [30, 100] as [number, number] }
  ];

  // Helper to parse price string like "4.5 Tỷ" or "15 Triệu" to raw number
  const parsePrice = (p: Property): number => {
    const val = parseFloat(p.price.replace(/[^0-9.]/g, ''));
    return isNaN(val) ? 0 : val;
  };

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(p => {
      const transactionMatch = p.transaction === transactionType;
      const districtMatch = activeDistrict === 'Tất cả' || p.location.toLowerCase().includes(activeDistrict.toLowerCase());
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(p.type);
      
      const priceVal = parsePrice(p);
      const priceMatch = priceVal >= priceRange[0] && (priceRange[1] === 100 ? true : priceVal <= priceRange[1]);
      
      const bedsMatch = selectedBeds === 'all' || (selectedBeds === 4 ? p.beds >= 4 : p.beds === selectedBeds);
      
      return transactionMatch && districtMatch && typeMatch && priceMatch && bedsMatch;
    });
  }, [activeDistrict, selectedTypes, priceRange, selectedBeds, transactionType]);

  const [selectedProperty, setSelectedProperty] = useState<Property>(filteredProperties[0] || PROPERTIES[0]);

  useEffect(() => {
    if (filteredProperties.length > 0 && !filteredProperties.find(p => p.id === selectedProperty.id)) {
      setSelectedProperty(filteredProperties[0]);
    }
  }, [filteredProperties, selectedProperty.id]);

  const resetFilters = () => {
    setActiveDistrict('Tất cả');
    setSelectedTypes([]);
    setPriceRange([0, 100]);
    setSelectedBeds('all');
    setTransactionType('buy');
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const isPriceActive = (optValue: [number, number]) => {
    return priceRange[0] === optValue[0] && priceRange[1] === optValue[1];
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-body text-[#1e293b] dark:text-white overflow-hidden h-screen flex flex-col relative max-w-[480px] mx-auto shadow-2xl transition-colors duration-300">
      
      {/* Top Search & Filter Interface */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-12 pb-4 pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-2">
          {/* Main Search Bar */}
          <div className="shadow-lg rounded-2xl bg-white dark:bg-[#1e2936] flex items-center h-12 w-full px-1 border border-gray-100 dark:border-gray-800 transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <button className="flex items-center justify-center w-10 h-full text-gray-400">
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <input 
              className="flex-1 bg-transparent border-none focus:ring-0 text-[#0f172a] dark:text-white placeholder:text-gray-400 h-full text-[14px] font-medium px-2" 
              placeholder="Tìm kiếm khu vực, dự án..." 
            />
            <button 
              onClick={() => setIsFilterSheetOpen(true)}
              className="flex items-center justify-center w-10 h-full text-gray-400"
            >
              <span className="material-symbols-outlined text-[24px]">tune</span>
            </button>
            <button className="flex items-center justify-center w-10 h-full text-white bg-primary rounded-xl m-1 shadow-sm hover:bg-blue-600 transition-colors">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
          </div>

          {/* Quick Filter Horizontal Rows */}
          <div className="flex flex-col gap-2 overflow-x-hidden">
            {/* ROW 1: Transaction Type & District */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
              <button 
                onClick={() => {
                  setTransactionType(transactionType === 'buy' ? 'rent' : 'buy');
                  setPriceRange([0, 100]); // Reset price when changing type
                }}
                className="flex h-8 shrink-0 items-center justify-center gap-x-1 rounded-full bg-slate-900 dark:bg-primary text-white px-4 shadow-md border border-slate-800 dark:border-primary/20 transition-all active:scale-95"
              >
                <p className="text-[10px] font-black uppercase tracking-tight">{transactionType === 'buy' ? 'Mua' : 'Thuê'}</p>
                <span className="material-symbols-outlined text-[14px]">swap_horiz</span>
              </button>
              <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 self-center shrink-0"></div>
              {districts.map((district) => (
                <button
                  key={district}
                  onClick={() => setActiveDistrict(district)}
                  className={`flex h-8 shrink-0 items-center justify-center gap-x-1 rounded-full transition-all px-4 shadow-sm border active:scale-95 ${
                    activeDistrict === district
                    ? 'bg-primary text-white border-primary shadow-glow font-bold'
                    : 'bg-white/95 dark:bg-[#1e2936]/95 backdrop-blur-md text-[#334155] dark:text-white border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <p className="text-[11px] font-bold uppercase tracking-tight">{district}</p>
                </button>
              ))}
            </div>

            {/* ROW 2: Bedrooms & Price Range (Requested Features) */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
              {/* Bedroom Chips */}
              <div className="flex gap-2 shrink-0">
                {bedOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedBeds(opt.value as any)}
                    className={`flex h-8 shrink-0 items-center justify-center gap-x-1.5 rounded-full transition-all px-3.5 shadow-sm border active:scale-95 ${
                      selectedBeds === opt.value
                      ? 'bg-primary text-white border-primary shadow-glow font-bold'
                      : 'bg-white/95 dark:bg-[#1e2936]/95 backdrop-blur-md text-[#334155] dark:text-white border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[15px] ${selectedBeds === opt.value ? 'filled' : ''}`}>bed</span>
                    <p className="text-[11px] font-bold uppercase tracking-tight">{opt.label}</p>
                  </button>
                ))}
              </div>
              
              <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 self-center shrink-0"></div>
              
              {/* Price Chips */}
              <div className="flex gap-2 shrink-0">
                {priceOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setPriceRange(opt.value)}
                    className={`flex h-8 shrink-0 items-center justify-center gap-x-1.5 rounded-full transition-all px-3.5 shadow-sm border active:scale-95 ${
                      isPriceActive(opt.value)
                      ? 'bg-primary text-white border-primary shadow-glow font-bold'
                      : 'bg-white/95 dark:bg-[#1e2936]/95 backdrop-blur-md text-[#334155] dark:text-white border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[15px] ${isPriceActive(opt.value) ? 'filled' : ''}`}>payments</span>
                    <p className="text-[11px] font-bold uppercase tracking-tight">{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* ROW 3: Property Type Chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => setSelectedTypes([])}
                className={`flex h-8 shrink-0 items-center justify-center rounded-full transition-all px-4 shadow-sm border active:scale-95 ${
                  selectedTypes.length === 0
                  ? 'bg-primary text-white border-primary shadow-glow font-bold'
                  : 'bg-white/95 dark:bg-[#1e2936]/95 backdrop-blur-md text-[#334155] dark:text-white border-gray-200 dark:border-gray-800'
                }`}
              >
                <p className="text-[11px] font-bold uppercase tracking-tight">Tất cả loại</p>
              </button>
              {propertyTypes.map((type) => {
                const isActive = selectedTypes.includes(type.value);
                return (
                  <button
                    key={type.value}
                    onClick={() => toggleType(type.value)}
                    className={`flex h-8 shrink-0 items-center justify-center gap-x-1.5 rounded-full transition-all px-3.5 shadow-sm border active:scale-95 ${
                      isActive
                      ? 'bg-primary text-white border-primary shadow-glow font-bold'
                      : 'bg-white/95 dark:bg-[#1e2936]/95 backdrop-blur-md text-[#334155] dark:text-white border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[15px] ${isActive ? 'filled' : ''}`}>
                      {isActive ? 'check_circle' : type.icon}
                    </span>
                    <p className="text-[11px] font-bold uppercase tracking-tight">{type.label}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Map Content Simulator */}
      <div className="relative flex-1 w-full h-full bg-[#e5e7eb] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-110 opacity-100 transition-opacity duration-500" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDu5aTHCHED_H0txDIYAyoCd1Wc9_Jb0H3ncltl7JDKlsQJEig9Joqm_E4UcPO8KJ21C29A7UdVtFq7KQN3GOe4K9MFWHt-6HqBc6dQkZfC8Ll7e_UbdecuKVfQv5EItv4qEpWZbDlXNMtkTLRH55h2mI-1rMHuYAJDiADH-833EbhQ3XgvOxHJltwklGGLacC61PmqgFd6jFwUThR7azClsrCyPgEg5m8CwW2wiTN8dq90lnRW4IzNfImBJWileGK5CNJo4N60XEoX")' }}
        ></div>

        {/* Dynamic Pins */}
        {filteredProperties.length > 0 ? (
          filteredProperties.map((p) => (
            <div 
              key={p.id}
              onClick={(e) => { e.stopPropagation(); setSelectedProperty(p); }}
              className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ top: `${p.coords.y}%`, left: `${p.coords.x}%` }}
            >
              <div className={`transition-all duration-300 ${selectedProperty.id === p.id ? 'scale-125 z-20 bg-primary hover:bg-blue-600 shadow-glow' : 'scale-100 bg-slate-900/80 hover:bg-primary'} text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg shadow-xl flex items-center gap-1 border border-white/20`}>
                <span>{p.price}</span>
              </div>
              <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] ${selectedProperty.id === p.id ? 'border-t-primary' : 'border-t-slate-900/80'} mx-auto transition-colors`}></div>
            </div>
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-8 py-5 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 text-center animate-in zoom-in-95 duration-500">
               <span className="material-symbols-outlined text-5xl text-gray-300 mb-3">search_off</span>
               <p className="text-sm font-black text-slate-500 uppercase tracking-widest">Không có kết quả</p>
               <button 
                onClick={resetFilters}
                className="mt-4 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2.5 rounded-xl shadow-lg pointer-events-auto active:scale-95"
               >
                 Đặt lại bộ lọc
               </button>
            </div>
          </div>
        )}

        {/* Map Actions */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-10">
          {['layers', 'near_me'].map((icon) => (
            <button key={icon} className="w-11 h-11 bg-white dark:bg-[#1e2936] rounded-xl shadow-lg flex items-center justify-center text-[#1e293b] dark:text-white active:scale-95 transition-transform border border-gray-100 dark:border-gray-800">
              <span className="material-symbols-outlined">{icon}</span>
            </button>
          ))}
        </div>

        {/* AI FAB */}
        <div className="absolute right-4 bottom-36 z-20">
          <button 
            onClick={(e) => { e.stopPropagation(); navigate('/chat'); }}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full pl-3.5 pr-5 py-3.5 shadow-xl shadow-blue-500/30 transform transition-all active:scale-95 border-2 border-white/20"
          >
            <div className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-full">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            </div>
            <span className="font-black text-xs uppercase tracking-widest">Goland AI</span>
          </button>
        </div>

        {/* Property Preview Card */}
        {filteredProperties.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 z-30 pb-[88px] pointer-events-none">
            <div className="mx-4 pointer-events-auto">
              <div className="bg-white dark:bg-[#1e2936] rounded-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.12)] overflow-hidden animate-in slide-in-from-bottom-10 duration-500 ring-1 ring-black/5 border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col" onClick={() => navigate(`/property/${selectedProperty.id}`)}>
                  <div className="relative h-44 w-full bg-gray-200">
                    <img className="w-full h-full object-cover" src={selectedProperty.image} alt={selectedProperty.name} />
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-3 py-2 rounded-xl flex items-center gap-2 font-black uppercase tracking-widest border border-white/10">
                      <span className="material-symbols-outlined text-[16px] text-primary filled">auto_awesome</span>
                      <span>AI Gợi ý</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-[17px] font-black text-[#0f172a] dark:text-white uppercase truncate tracking-tight">{selectedProperty.name}</h3>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1.5 flex items-center gap-1 font-bold uppercase tracking-tight">
                          <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                          {selectedProperty.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="block text-2xl font-black text-primary tracking-tighter leading-none">{selectedProperty.price}</span>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4 mb-5 text-[11px] text-[#334155] dark:text-gray-200">
                      <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-black/20 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-800 font-black">
                        <span className="material-symbols-outlined text-gray-400 text-[18px]">bed</span>
                        <span>{selectedProperty.beds} PN</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-black/20 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-800 font-black">
                        <span className="material-symbols-outlined text-gray-400 text-[18px]">bathtub</span>
                        <span>{selectedProperty.baths} WC</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-black/20 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-800 font-black">
                        <span className="material-symbols-outlined text-gray-400 text-[18px]">straighten</span>
                        <span>{selectedProperty.area}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-primary text-white h-12 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/25 active:scale-95 transition-all">Liên hệ</button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate('/chat'); }}
                        className="flex-1 bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700 text-[#0f172a] dark:text-white h-12 rounded-2xl font-black uppercase text-xs tracking-widest active:scale-95 transition-all"
                      >Chat với AI</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Filter Bottom Sheet */}
      {isFilterSheetOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="absolute inset-0 z-0" onClick={() => setIsFilterSheetOpen(false)}></div>
          <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#1a2632] rounded-t-[2.5rem] shadow-2xl p-6 pb-12 animate-in slide-in-from-bottom duration-500 ease-out flex flex-col gap-6 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-2"></div>
            
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Bộ lọc chi tiết</h3>
              <button 
                onClick={resetFilters}
                className="text-primary font-black uppercase tracking-widest text-[11px] bg-primary/10 px-3 py-1.5 rounded-lg"
              >
                Đặt lại
              </button>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Khu vực ưu tiên</p>
              <div className="grid grid-cols-3 gap-2">
                {districts.map(district => (
                  <button
                    key={district}
                    onClick={() => setActiveDistrict(district)}
                    className={`flex items-center justify-center py-3 rounded-xl border text-[10px] font-black uppercase tracking-tighter transition-all ${
                      activeDistrict === district 
                      ? 'border-primary bg-primary text-white shadow-lg' 
                      : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-400 hover:border-gray-200'
                    }`}
                  >
                    {district}
                  </button>
                ))}
              </div>
            </div>

            {/* Bedrooms Selection */}
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Số phòng ngủ</p>
              <div className="grid grid-cols-5 gap-2">
                {bedOptions.map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedBeds(opt.value as any)}
                    className={`flex flex-col items-center justify-center py-3 rounded-xl border text-[10px] font-black uppercase transition-all ${
                      selectedBeds === opt.value 
                      ? 'border-primary bg-primary text-white shadow-lg' 
                      : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg mb-1">{opt.icon}</span>
                    <span className="tracking-tighter">{opt.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider Simulation */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  {transactionType === 'buy' ? 'Khoảng giá (Tỷ VNĐ)' : 'Khoảng giá (Triệu VNĐ)'}
                </p>
                <span className="text-sm font-black text-primary">
                  {priceRange[0]} - {priceRange[1] === 100 ? '100+' : priceRange[1]} {transactionType === 'buy' ? 'Tỷ' : 'Tr'}
                </span>
              </div>
              <div className="px-2 pt-2">
                <div className="relative h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full">
                  <div 
                    className="absolute h-full bg-primary rounded-full shadow-glow" 
                    style={{ left: `${(priceRange[0]/100)*100}%`, right: `${100 - (priceRange[1]/100)*100}%` }}
                  ></div>
                  <input 
                    type="range" min="0" max="100" value={priceRange[0]} 
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <input 
                    type="range" min="0" max="100" value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div 
                    className="absolute size-5 bg-white border-2 border-primary rounded-full -mt-1.5 shadow-md"
                    style={{ left: `calc(${(priceRange[0]/100)*100}% - 10px)` }}
                  ></div>
                  <div 
                    className="absolute size-5 bg-white border-2 border-primary rounded-full -mt-1.5 shadow-md"
                    style={{ left: `calc(${(priceRange[1]/100)*100}% - 10px)` }}
                  ></div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsFilterSheetOpen(false)}
              className="w-full h-14 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/25 active:scale-[0.98] transition-all mt-4"
            >
              Áp dụng ({filteredProperties.length} kết quả)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapScreen;
