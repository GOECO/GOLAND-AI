
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LanguageRegionSettings: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState('vi');

  const languages = [
    {
      id: 'vi',
      name: 'Tiếng Việt',
      country: 'Việt Nam',
      flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLBKenWKMZ4o8be_ecM2uijG37Zlv6R9ykczWag1VWgmTYfKQRKS9XqRHRN2F_80E-HHbqmxd8JCZsXRt8s5pKx0K_FL6RVquMulApUJrIUDfcXd8yfLk-DBlJ4sjS41SAKDxtamSnZYgQ6zWbSrUntSdhT0Rwg1fXQU-TfExahEV_5OOniJxkmNfuUt94XV1wEWBLWlqxRAQYg8FF4dB5vSYnuoJzPFWf2_hVqTK66mMc47fotc_T7_5QJD3-B8JmgN3HUUPmVliT'
    },
    {
      id: 'en',
      name: 'English',
      country: 'United States',
      flagUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAURKMG_AsyUJycCMuiM7d2iSocUDVDy1kIqpNDwFj43pl_bbteKJMx_ZofHSJqTY4Job0igwWxQaVYTE18gkTP_WguqUNi5rjQNow0jtJJq1HwcZgbrOoiSzfXsdEPZGh3nl4cGsbHQ8_EBDSQ5n4F0QfU-l5sXdqIJ2FoOIqISQ3OBIqtMmus153xCE3piwD7sKSy4JBeqeplPHOyFr9qzCqsV5Brgq3J-JlhQ2Ve15KpX0qaLO-I5ikHtpx_VDB-wQgKO92rf8f3'
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-[#111418] dark:text-white font-display relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <div className="flex items-center px-4 py-3 justify-between h-14">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
            Ngôn ngữ & Khu vực
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 p-4 pb-32">
        {/* Language Section */}
        <section>
          <div className="flex items-center gap-2 px-1 mb-3">
            <span className="material-symbols-outlined text-primary text-xl">language</span>
            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold tracking-wider uppercase">Ngôn ngữ hiển thị</h3>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="flex flex-col">
              {languages.map((lang, idx) => (
                <React.Fragment key={lang.id}>
                  <label className="relative flex items-center justify-between p-4 cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center bg-gray-100 relative">
                        <img 
                          alt={`${lang.name} Flag`} 
                          src={lang.flagUrl} 
                          className="w-full h-full object-cover absolute inset-0" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-900 dark:text-white font-bold text-base">{lang.name}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs">{lang.country}</span>
                      </div>
                    </div>
                    <div className="relative flex items-center">
                      <input 
                        type="radio" 
                        name="language"
                        checked={selectedLang === lang.id}
                        onChange={() => setSelectedLang(lang.id)}
                        className="h-5 w-5 border-2 border-gray-300 dark:border-gray-600 bg-transparent text-primary focus:ring-primary focus:ring-offset-0 transition-all cursor-pointer checked:bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBbLWbqNTH3viBes3cT5ZgMwzH3RnHx9KqxjGYK3Bif-9CGKFSnfnOj13xUMDSO3bikbNyLpIOQMcij4EPgbyfJaO7Dst7beMcjRDN4kEmbUIz47HUfV-lOuZ2Fag4aRN21WEaVfhi8YAmlhG7cK6vf7UJtvDxKS5s4kUtH6awSorGD1ZUjhIAm62wxWucYLYP0Jse53imsA289S5E98cTDjTdAfWC62wVA6AenWxX6zKYNqs8x1hLln0BVhisp1OHeO_TDV1EhkKqI')] bg-center bg-no-repeat bg-[length:100%_100%]" 
                      />
                    </div>
                  </label>
                  {idx < languages.length - 1 && (
                    <div className="h-px w-full bg-gray-100 dark:bg-gray-800 mx-4"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Region Section */}
        <section>
          <div className="flex items-center gap-2 px-1 mb-3">
            <span className="material-symbols-outlined text-primary text-xl">public</span>
            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold tracking-wider uppercase">Khu vực & Định dạng</h3>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            {/* Region Selector */}
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group text-left">
              <div className="flex flex-col pr-4">
                <span className="text-gray-900 dark:text-white font-bold text-base">Vùng</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs mt-1">Dữ liệu bất động sản sẽ được ưu tiên theo vùng này.</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <img 
                  alt="Vietnam Flag Small" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPEgi0eGCsNzr-83VMuFhn0Kx6k3JYk3V5QCB5JPk7K4I1h5GzdTg4KYjum97QIE_JfzOuJGFHQ6yE2FBWQOw9wjX3WxxbXv_EBmPzDivMORKCwfB9Ojoyoabu6e1MxbP2_yBtPPkhWnih_5NmBlZZihlAxYnnQI4xJUBZ8gCOdUS7xs4c5zTQBhfA-mX-FKgKuYbmbTTD4naqK0ypzxQOVFhlGt2otHkX34E6oVNb5gY2CMy-KKs5YG_lsUsUT5XdU_DZyAw6SvO4" 
                  className="w-5 h-5 rounded-full object-cover border border-gray-200 shadow-sm"
                />
                <span className="text-primary font-bold text-sm">Việt Nam</span>
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors text-[18px]">arrow_forward_ios</span>
              </div>
            </button>
            
            {/* Format Info */}
            <div className="bg-gray-50 dark:bg-gray-800/30 p-4 border-t border-gray-100 dark:border-gray-800">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-wider">Đơn vị tiền tệ</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-sm">payments</span>
                    <span className="text-gray-900 dark:text-white font-mono font-bold text-sm">VND (₫)</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-wider">Đơn vị đo lường</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-sm">square_foot</span>
                    <span className="text-gray-900 dark:text-white font-mono font-bold text-sm">Mét (m²)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Context Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 p-5 shadow-sm">
          <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[80px] text-primary">smart_toy</span>
          </div>
          {/* Cloud decoration like in the screenshot */}
          <div className="absolute top-1 right-2 opacity-20 pointer-events-none">
            <span className="material-symbols-outlined text-4xl text-primary">cloud</span>
          </div>
          <div className="flex gap-4 relative z-10">
            <div className="shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">Goland AI Assistant</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                Cài đặt của bạn giúp AI cá nhân hóa các gợi ý đầu tư và hiển thị dữ liệu thị trường chính xác hơn cho khu vực bạn quan tâm.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Actions */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-background-dark p-4 border-t border-gray-100 dark:border-gray-800 pb-8 z-40 max-w-[480px] mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Lưu thay đổi</span>
          <span className="material-symbols-outlined text-lg">check</span>
        </button>
      </footer>
    </div>
  );
};

export default LanguageRegionSettings;
