
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdvancedSettings: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  
  const [settings, setSettings] = useState({
    pushNotifications: true,
    notifNewProjects: true,
    notifPriceChanges: true,
    notifMarketNews: false,
    aiSuggestions: true,
    emailMarketing: true,
    autoPlay360: false,
    locationData: true,
    aiHistory: true,
    personalization: true,
    partnerSharing: false
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleItem = ({ 
    label, 
    subtitle, 
    icon, 
    iconBg, 
    iconColor, 
    checked, 
    onChange 
  }: { 
    label: string; 
    subtitle?: string; 
    icon?: string; 
    iconBg?: string; 
    iconColor?: string; 
    checked: boolean; 
    onChange: () => void; 
  }) => (
    <div className="flex items-start gap-4 px-5 py-4 justify-between border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex gap-3 min-w-0">
        {icon && (
          <div className={`flex items-center justify-center size-9 rounded-full shrink-0 ${iconBg} ${iconColor}`}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{icon}</span>
          </div>
        )}
        <div className="flex flex-col justify-center min-w-0">
          <p className="text-[#111418] dark:text-white text-base font-medium leading-normal truncate">{label}</p>
          {subtitle && <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal mt-1">{subtitle}</p>}
        </div>
      </div>
      <div className="shrink-0 pt-1">
        <label className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none p-0.5 transition-colors ${checked ? 'bg-primary justify-end' : 'bg-gray-200 dark:bg-gray-700 justify-start'}`} onClick={onChange}>
          <div className="h-full w-[27px] rounded-full bg-white shadow-sm"></div>
        </label>
      </div>
    </div>
  );

  const SubToggleItem = ({ 
    label, 
    checked, 
    onChange,
    subtitle,
    isLast = false
  }: { 
    label: string; 
    checked: boolean; 
    onChange: () => void;
    subtitle?: string;
    isLast?: boolean;
  }) => (
    <div className={`flex items-center justify-between py-3 ${!isLast ? 'border-b border-gray-200/50 dark:border-gray-700/30' : ''}`}>
      <div className="min-w-0 pr-2">
        <p className="text-[#111418] dark:text-gray-200 text-sm font-medium">{label}</p>
        {subtitle && <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      <div className="shrink-0">
        <label className={`relative flex h-[24px] w-[40px] cursor-pointer items-center rounded-full border-none p-0.5 transition-colors ${checked ? 'bg-primary justify-end' : 'bg-gray-200 dark:bg-gray-700 justify-start'}`} onClick={onChange}>
          <div className="h-full w-[20px] rounded-full bg-white shadow-sm"></div>
        </label>
      </div>
    </div>
  );

  const NavItem = ({ 
    label, 
    value, 
    subtitle,
    icon, 
    iconBg, 
    iconColor, 
    onClick,
    isDanger = false,
    showChevron = true
  }: { 
    label: string; 
    value?: string; 
    subtitle?: string;
    icon: string; 
    iconBg: string; 
    iconColor: string; 
    onClick?: () => void;
    isDanger?: boolean;
    showChevron?: boolean;
  }) => (
    <div 
      onClick={onClick}
      className={`flex items-center gap-4 px-5 py-4 justify-between border-b border-gray-100 dark:border-gray-800 last:border-0 cursor-pointer transition-colors ${isDanger ? 'active:bg-red-50 dark:active:bg-red-900/10' : 'active:bg-gray-50 dark:active:bg-gray-800/50'}`}
    >
      <div className="flex items-center gap-3">
        <div className={`flex items-center justify-center size-9 rounded-full ${iconBg} ${iconColor}`}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{icon}</span>
        </div>
        <div>
          <p className={`text-base font-medium leading-normal ${isDanger ? 'text-red-600 dark:text-red-400' : 'text-[#111418] dark:text-white'}`}>{label}</p>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 font-normal mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {value && <p className="text-gray-500 dark:text-gray-400 text-sm font-normal">{value}</p>}
        {showChevron && <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '20px' }}>{isDanger ? '' : (label === 'Chính sách quyền riêng tư' ? 'open_in_new' : 'chevron_right')}</span>}
        {label === 'Xóa bộ nhớ đệm' && (
           <div className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-xs font-semibold text-[#111418] dark:text-white ml-2">Xóa</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-[#111418] dark:text-white font-display relative">
      {/* Top App Bar */}
      <div className="sticky top-0 z-50 flex items-center bg-white dark:bg-[#1c2936] px-4 py-3 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold leading-tight flex-1 text-center pr-10">Cài đặt Nâng cao</h2>
      </div>

      <div className="flex-1 flex flex-col gap-2 pb-12">
        {/* Section 1: Thông báo & AI */}
        <div>
          <h3 className="text-lg font-bold px-5 pb-2 pt-6">Thông báo & AI</h3>
          <div className="bg-white dark:bg-[#1c2936] border-y border-gray-100 dark:border-gray-800">
            <ToggleItem 
              label="Thông báo đẩy" 
              icon="notifications" 
              iconBg="bg-blue-100 dark:bg-blue-900/30" 
              iconColor="text-primary"
              checked={settings.pushNotifications}
              onChange={() => toggleSetting('pushNotifications')}
            />
            {/* Sub-notifications */}
            <div className="bg-gray-50/50 dark:bg-gray-800/20 pl-[60px] pr-5 py-2 border-b border-gray-100 dark:border-gray-800">
              <SubToggleItem label="Thông báo dự án mới" checked={settings.notifNewProjects} onChange={() => toggleSetting('notifNewProjects')} />
              <SubToggleItem label="Thông báo thay đổi giá" checked={settings.notifPriceChanges} onChange={() => toggleSetting('notifPriceChanges')} />
              <SubToggleItem label="Thông báo tin tức thị trường" checked={settings.notifMarketNews} onChange={() => toggleSetting('notifMarketNews')} isLast={true} />
            </div>

            <ToggleItem 
              label="Gợi ý từ Goland AI" 
              subtitle="AI phân tích lịch sử xem và sở thích để đề xuất BĐS phù hợp nhất, dự đoán xu hướng giá và cơ hội đầu tư."
              icon="smart_toy" 
              iconBg="bg-blue-100 dark:bg-blue-900/30" 
              iconColor="text-primary"
              checked={settings.aiSuggestions}
              onChange={() => toggleSetting('aiSuggestions')}
            />

            <div className="flex flex-col border-b border-gray-100 dark:border-gray-800 last:border-0">
              <ToggleItem 
                label="Email tin tức thị trường" 
                icon="mail" 
                iconBg="bg-purple-100 dark:bg-purple-900/30" 
                iconColor="text-purple-600 dark:text-purple-400"
                checked={settings.emailMarketing}
                onChange={() => toggleSetting('emailMarketing')}
              />
              <div className="flex items-center gap-4 pl-[60px] pr-5 pb-4 justify-between cursor-pointer group">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Tần suất gửi</p>
                <div className="flex items-center gap-1 text-primary group-hover:text-blue-600 transition-colors">
                  <span className="text-sm font-medium">Hàng tuần</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Tùy chọn chung */}
        <div>
          <h3 className="text-lg font-bold px-5 pb-2 pt-4">Tùy chọn chung</h3>
          <div className="bg-white dark:bg-[#1c2936] border-y border-gray-100 dark:border-gray-800">
            <NavItem 
              label="Ngôn ngữ" 
              value="Tiếng Việt"
              icon="language" 
              iconBg="bg-orange-100 dark:bg-orange-900/30" 
              iconColor="text-orange-600 dark:text-orange-400" 
              onClick={() => navigate('/language-region')}
            />
            <NavItem 
              label="Đơn vị tiền tệ" 
              value="VNĐ"
              icon="attach_money" 
              iconBg="bg-green-100 dark:bg-green-900/30" 
              iconColor="text-green-600 dark:text-green-400" 
            />
          </div>
        </div>

        {/* Section 3: Dữ liệu & Hiệu năng */}
        <div>
          <h3 className="text-lg font-bold px-5 pb-2 pt-4">Dữ liệu & Hiệu năng</h3>
          <div className="bg-white dark:bg-[#1c2936] border-y border-gray-100 dark:border-gray-800">
            <ToggleItem 
              label="Tự động phát video 360°" 
              icon="play_circle" 
              iconBg="bg-gray-100 dark:bg-gray-700" 
              iconColor="text-gray-600 dark:text-gray-300"
              checked={settings.autoPlay360}
              onChange={() => toggleSetting('autoPlay360')}
            />
            <NavItem 
              label="Xóa bộ nhớ đệm" 
              value="145.2 MB"
              icon="cleaning_services" 
              iconBg="bg-gray-100 dark:bg-gray-700" 
              iconColor="text-gray-600 dark:text-gray-300" 
              showChevron={false}
            />
            <NavItem 
              label="Xuất dữ liệu cá nhân" 
              subtitle="Lịch sử tìm kiếm, BĐS đã lưu"
              icon="download" 
              iconBg="bg-gray-100 dark:bg-gray-700" 
              iconColor="text-gray-600 dark:text-gray-300" 
            />
            <NavItem 
              label="Xóa dữ liệu tài khoản" 
              icon="delete_forever" 
              iconBg="bg-red-100 dark:bg-red-900/30" 
              iconColor="text-red-600" 
              isDanger={true}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        {/* Section 4: Thông tin & Quyền riêng tư */}
        <div>
          <h3 className="text-lg font-bold px-5 pb-2 pt-4">Thông tin & Quyền riêng tư</h3>
          <div className="bg-white dark:bg-[#1c2936] border-y border-gray-100 dark:border-gray-800">
            <NavItem 
              label="Về Goland AI" 
              icon="info" 
              iconBg="bg-blue-100 dark:bg-blue-900/30" 
              iconColor="text-primary" 
              onClick={() => navigate('/about')}
            />
            <NavItem 
              label="Kiểm soát dữ liệu" 
              icon="security" 
              iconBg="bg-teal-100 dark:bg-teal-900/30" 
              iconColor="text-teal-600 dark:text-teal-400" 
              onClick={() => navigate('/data-access-rights')}
            />
            {/* Data Control Subs */}
            <div className="bg-gray-50/50 dark:bg-gray-800/20 pl-[60px] pr-5 py-2 border-b border-gray-100 dark:border-gray-800">
              <SubToggleItem label="Dữ liệu vị trí" subtitle="Để gợi ý BĐS gần bạn" checked={settings.locationData} onChange={() => toggleSetting('locationData')} />
              <SubToggleItem label="Lịch sử & Tương tác AI" subtitle="Cải thiện kết quả tìm kiếm" checked={settings.aiHistory} onChange={() => toggleSetting('aiHistory')} />
              <SubToggleItem label="Cá nhân hóa gợi ý" subtitle="Gợi ý phù hợp sở thích" checked={settings.personalization} onChange={() => toggleSetting('personalization')} isLast={true} />
            </div>

            <ToggleItem 
              label="Chia sẻ đối tác" 
              subtitle="Chia sẻ dữ liệu ẩn danh"
              icon="share" 
              iconBg="bg-indigo-100 dark:bg-indigo-900/30" 
              iconColor="text-indigo-600 dark:text-indigo-400"
              checked={settings.partnerSharing}
              onChange={() => toggleSetting('partnerSharing')}
            />
            <NavItem 
              label="Thiết bị đăng nhập" 
              icon="devices" 
              iconBg="bg-gray-100 dark:bg-gray-700" 
              iconColor="text-gray-600 dark:text-gray-400" 
            />
            <NavItem 
              label="Chính sách quyền riêng tư" 
              icon="policy" 
              iconBg="bg-gray-100 dark:bg-gray-700" 
              iconColor="text-gray-600 dark:text-gray-400" 
            />
          </div>
          <p className="text-center text-xs text-gray-500 mt-8 mb-4 font-bold">
            Goland AI v2.4.0 (Build 20241025)<br/>
            Powered by AI Technology
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#1c2936] p-6 shadow-xl ring-1 ring-gray-900/5">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600">
                <span className="material-symbols-outlined text-[32px]">warning</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="mb-2 text-lg font-bold text-[#111418] dark:text-white">Xóa dữ liệu tài khoản?</h3>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                Hành động này sẽ xóa vĩnh viễn toàn bộ dữ liệu tài khoản của bạn và không thể khôi phục. Bạn có chắc chắn muốn tiếp tục không?
              </p>
              <div className="mb-6 relative">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="material-symbols-outlined text-gray-400" style={{ fontSize: '20px' }}>lock</span>
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 py-3 pl-10 pr-3 text-sm text-[#111418] dark:text-white placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors" 
                    placeholder="Nhập mật khẩu để xác nhận" 
                  />
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <p className="text-[10px] text-left text-gray-400 font-bold">Vui lòng nhập mật khẩu hiện tại của bạn.</p>
                  <button className="text-[10px] font-bold text-primary hover:text-blue-600 transition-colors">Quên mật khẩu?</button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => { setIsModalOpen(false); setPassword(''); }}
                className="flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 px-4 py-3 text-sm font-bold text-[#111418] dark:text-white hover:bg-gray-200 transition-colors"
              >
                Hủy
              </button>
              <button 
                disabled={!password}
                className={`flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold transition-colors ${password ? 'bg-red-600 text-white shadow-lg shadow-red-500/30' : 'bg-red-100 dark:bg-red-900/20 text-red-300 dark:text-red-900 cursor-not-allowed'}`}
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSettings;
