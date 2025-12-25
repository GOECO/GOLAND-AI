
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataAccessRights: React.FC = () => {
  const navigate = useNavigate();
  
  const [locationPermission, setLocationPermission] = useState<'always' | 'while_using' | 'never'>('while_using');
  const [privacySettings, setPrivacySettings] = useState({
    searchHistory: true,
    aiInteraction: true,
    deviceData: false
  });

  const togglePrivacy = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-[#111418] dark:text-white font-display relative">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-white dark:bg-[#1c2936] px-4 py-3 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200">
        <button 
          onClick={() => navigate(-1)}
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[#111418] dark:text-white" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
        </button>
        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight flex-1 text-center pr-10">Quyền truy cập dữ liệu</h2>
      </div>

      <div className="flex-1 flex flex-col gap-6 pb-32 pt-6">
        {/* Intro Text */}
        <div className="px-5">
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Kiểm soát cách Goland AI thu thập và sử dụng dữ liệu của bạn. Những thiết lập này giúp cá nhân hóa trải nghiệm trong khi vẫn bảo vệ quyền riêng tư của bạn.
          </p>
        </div>

        {/* Location Data Section */}
        <div>
          <h3 className="text-xs font-bold leading-tight tracking-wider px-5 pb-3 uppercase text-gray-500 dark:text-gray-500">Dữ liệu vị trí</h3>
          <div className="flex flex-col bg-white dark:bg-[#1c2936] border-y border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-blue-50/50 dark:bg-blue-900/10">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontSize: '20px' }}>location_on</span>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                  Dữ liệu vị trí giúp ứng dụng xác định tọa độ hiện tại để gợi ý bất động sản lân cận và hiển thị bản đồ quy hoạch chính xác. Khi bật, bạn có thể sử dụng tính năng 'Tìm quanh đây' và dẫn đường. Nếu tắt, các tính năng bản đồ và phân tích thị trường theo khu vực sẽ bị hạn chế.
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setLocationPermission('always')}
              className="flex items-center gap-4 px-5 py-4 justify-between border-b border-gray-100 dark:border-gray-800 cursor-pointer active:bg-gray-50 dark:active:bg-gray-800/50 transition-colors text-left"
            >
              <p className="text-base font-medium">Luôn luôn</p>
              {locationPermission === 'always' && <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>check</span>}
            </button>
            
            <button 
              onClick={() => setLocationPermission('while_using')}
              className="flex items-center gap-4 px-5 py-4 justify-between border-b border-gray-100 dark:border-gray-800 cursor-pointer active:bg-gray-50 dark:active:bg-gray-800/50 transition-colors text-left"
            >
              <p className="text-base font-medium">Chỉ khi dùng ứng dụng</p>
              {locationPermission === 'while_using' && <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>check</span>}
            </button>
            
            <button 
              onClick={() => setLocationPermission('never')}
              className="flex items-center gap-4 px-5 py-4 justify-between border-b border-gray-100 dark:border-gray-800 cursor-pointer active:bg-gray-50 dark:active:bg-gray-800/50 transition-colors text-left"
            >
              <p className="text-base font-medium">Không bao giờ</p>
              {locationPermission === 'never' && <span className="material-symbols-outlined text-primary" style={{ fontSize: '24px' }}>check</span>}
            </button>
          </div>
        </div>

        {/* Privacy & Usage Section */}
        <div>
          <h3 className="text-xs font-bold leading-tight tracking-wider px-5 pb-3 uppercase text-gray-500 dark:text-gray-500">Quyền riêng tư & Sử dụng</h3>
          <div className="flex flex-col bg-white dark:bg-[#1c2936] border-y border-gray-100 dark:border-gray-800 shadow-sm">
            
            <div className="flex items-start gap-4 px-5 py-4 justify-between border-b border-gray-100 dark:border-gray-800">
              <div className="flex flex-col gap-1 pr-4 min-w-0 flex-1">
                <p className="text-base font-medium leading-normal">Lịch sử tìm kiếm</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Chúng tôi thu thập từ khóa, mức giá và khu vực bạn quan tâm để AI học hỏi nhu cầu của bạn. Lợi ích là bạn sẽ nhận được các đề xuất BĐS sát với mong muốn nhất. Nếu tắt, các gợi ý sẽ trở nên chung chung và kém hiệu quả.
                </p>
              </div>
              <div className="shrink-0 pt-1">
                <label className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none p-0.5 transition-colors ${privacySettings.searchHistory ? 'bg-primary justify-end' : 'bg-gray-200 dark:bg-gray-700 justify-start'}`} onClick={() => togglePrivacy('searchHistory')}>
                  <div className="h-full w-[27px] rounded-full bg-white shadow-sm"></div>
                </label>
              </div>
            </div>

            <div className="flex items-start gap-4 px-5 py-4 justify-between border-b border-gray-100 dark:border-gray-800">
              <div className="flex flex-col gap-1 pr-4 min-w-0 flex-1">
                <p className="text-base font-medium leading-normal">Tương tác với AI</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Lưu trữ nội dung chat với trợ lý ảo dưới dạng ẩn danh để cải thiện thuật toán xử lý ngôn ngữ. Điều này giúp AI tư vấn pháp lý và thủ tục ngày càng thông minh hơn. Dữ liệu nhạy cảm được tự động loại bỏ để đảm bảo an toàn.
                </p>
              </div>
              <div className="shrink-0 pt-1">
                <label className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none p-0.5 transition-colors ${privacySettings.aiInteraction ? 'bg-primary justify-end' : 'bg-gray-200 dark:bg-gray-700 justify-start'}`} onClick={() => togglePrivacy('aiInteraction')}>
                  <div className="h-full w-[27px] rounded-full bg-white shadow-sm"></div>
                </label>
              </div>
            </div>

            <div className="flex items-start gap-4 px-5 py-4 justify-between">
              <div className="flex flex-col gap-1 pr-4 min-w-0 flex-1">
                <p className="text-base font-medium leading-normal">Dữ liệu thiết bị</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Thu thập thông số kỹ thuật (dòng máy, hệ điều hành) và nhật ký lỗi để tối ưu hóa hiệu suất ứng dụng. Việc này giúp chúng tôi phát hiện và sửa lỗi nhanh chóng, tránh tình trạng ứng dụng bị đóng đột ngột hay giật lag.
                </p>
              </div>
              <div className="shrink-0 pt-1">
                <label className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none p-0.5 transition-colors ${privacySettings.deviceData ? 'bg-primary justify-end' : 'bg-gray-200 dark:bg-gray-700 justify-start'}`} onClick={() => togglePrivacy('deviceData')}>
                  <div className="h-full w-[27px] rounded-full bg-white shadow-sm"></div>
                </label>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Sticky Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#1c2936]/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-4 pb-8 z-40 max-w-[480px] mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>save</span>
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default DataAccessRights;
