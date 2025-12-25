
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  const coreValues = [
    { icon: 'psychology', title: 'AI Tiên phong', desc: 'Dẫn đầu về công nghệ' },
    { icon: 'verified_user', title: 'Minh bạch', desc: 'Thông tin xác thực' },
    { icon: 'bolt', title: 'Tốc độ', desc: 'Xử lý tức thì' },
    { icon: 'favorite', title: 'Tận tâm', desc: 'Vì khách hàng' }
  ];

  const leadership = [
    { name: 'Alex Nguyen', role: 'CEO & Founder', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcy1J7EUiZpdL4sDpf1Bb5puHRAK3F8JQje_iDwWN3-LymI60LA4C_3f_5D6uZPaji60dL7gCYimEMuk5vGkJev80P4hE6WtNkkh-aYvUEFhR5BbOTZNy543gwaDfyc87Peoo8jvU2TuOxa5zd6W8bX2U4p7uYEdH0YFTZoUjohN8A3L4Bb-tN2HIZGk8B0ha4sUuK6IjO0BDkmK78cPULI5FK6hudehjPTVHHpuK3fXDconDxeW0-GKdsQDKIEPg5QBRYk1weGcVm' },
    { name: 'Sarah Tran', role: 'CTO', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbPLp6qVW1OKNhjvHOGiYjUYxVFu4M-tljmFyaNw9YLKGtoI-1bc0V6UYhsjL1yfrdu00nLAQSILjDlOKzg6b2vMG7pIiGCEQxClcSRFc0_5FvG6f65UZrlyFTbrM9dEiHq3HnUPqx24yeEKj2dYtHlnvPESUIyP4VXSrLWGhgxFj7uTeJoBqbuzYl8rWrJR1inQ3av-JmGbkOvj33uhqhLgVlpn3oLCq8QRP9Z940TTFE8D6XiKNXHPPSwtheDbBPUCJ7-9mrLtss' },
    { name: 'Minh Le', role: 'Head of Product', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFAdvjbs4swPISWxIbtninft0b2TBNlrNafiZpG9HFi4BRxRWBh1Fp2sq_9poIecljsGHJVUvfbC3w46S4pf4ZejVLoNmgP3A6SrzcWggIjsR42ciM6pYSXtPKChJwToQcpZxDJScvQRuCZQZ9ex1A2rDuPhU8NCjzU5EF_JUVwmHFzIt2lqcveGPtMAGRZSDbOSrvEnOTjEIFfDrjeKMik8RFi6j7Fe08BMTX9cDnjBirA5ZhmQp8eubhTt_Qq9fj0oiND0sU3UWM' },
    { name: 'Linh Pham', role: 'CMO', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPUAsUZQzjv5yNruniAFUCtVlyvko3wzVLWbFaNvku5aZZSrq_QHTBZ9R0SWCZ2D-8cGEGKs16fFB0CWujOvlka2bfUBqLIDhhkvrG1yjZfG-14FZTaW-84pkLSolwhhZJ2PzzCW2fQaWbabUxo8ohhBsrGxo1X7PWmePB8cP5zbwu81C149yTwd8aRqa_92qNiP2v8mcbp-wCaxYThaeqj6zbDtWsXbIeTdGhXQvlPtG3RJXMt3uTus2dNh3ELHxAqVxXqFQE7xni' }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-[#111418] dark:text-white font-display relative">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-white/95 dark:bg-[#1c2936]/95 backdrop-blur-sm p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800 transition-colors">
        <button 
          onClick={() => navigate(-1)}
          className="text-[#111418] dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer hover:opacity-70 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
          Về Goland AI
        </h2>
      </div>

      <main className="flex-1 flex flex-col pb-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center p-8 pb-4">
          <div className="relative p-1 rounded-3xl bg-gradient-to-br from-blue-100 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 shadow-sm mb-6">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-2xl h-32 w-32 shadow-sm border border-white/20" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAb0QeO4eDGGTjjaZG0FlZJmuZ257Dc_Agjc_6oZEywZ0L2CbTwEDWjELlTPjqsk0GdRwTeguQcp7f3r2Q46iR2-d8j4_2bYnyZjU3uaS_d-1Ley6gYxmgCo5b0yppDsiwIssdne1SXPFkbqxfbO50FSBaWnW4eYoSdeM0jPNpU7oa77ZzkYAs8wtL_2-Fz2y5fzISmLiyijPPsuWFhVtG4attPvYHxSnTq6jKUfwVPhIyHEnUlXg_KWd7WhiM55OrJfOmzCBVs9JE2")' }}
            ></div>
          </div>
          <div className="flex flex-col items-center text-center space-y-1">
            <h1 className="text-[#111418] dark:text-white text-3xl font-bold leading-tight tracking-tight">
              Goland AI
            </h1>
            <p className="text-primary font-bold text-base px-4">
              Bất động sản thông minh cho mọi nhà
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="px-5 py-4">
          <div className="flex flex-col gap-3 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1c2936] p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-2xl">history_edu</span>
              <p className="text-[#111418] dark:text-white text-lg font-bold">Câu chuyện khởi nguồn</p>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed font-body">
              Goland AI bắt đầu với một câu hỏi đơn giản: "Tại sao tìm kiếm ngôi nhà mơ ước lại khó khăn đến vậy?". Chúng tôi tin rằng công nghệ có thể xóa bỏ rào cản đó.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed font-body">
              Không chỉ là ứng dụng tìm nhà, chúng tôi sử dụng trí tuệ nhân tạo để phân tích thị trường, định giá chính xác và kết nối nhu cầu thực một cách minh bạch nhất.
            </p>
          </div>
        </div>

        {/* Mission & Vision Carousel */}
        <div className="flex flex-col w-full py-4">
          <h3 className="text-[#111418] dark:text-white text-xl font-bold px-5 pb-4">
            Sứ mệnh & Tầm nhìn
          </h3>
          <div className="flex overflow-x-auto no-scrollbar pb-2 px-5 gap-4 snap-x">
            <div className="snap-center shrink-0 w-[300px] flex flex-col gap-3 rounded-3xl bg-white dark:bg-[#1c2936] border border-gray-100 dark:border-gray-800 p-3 shadow-sm ring-1 ring-black/5">
              <div 
                className="w-full h-40 bg-center bg-no-repeat bg-cover rounded-2xl" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA32XXEnjaP20hCO7yMp8Oo2XRmv1SrEHvGYCzGiL_y0Do6jayeRhgLp62qVlsYeBguwCwttRTODHsN8tgS4X8xnByZEPm7SULIdY1bSh_tVw7yjD4gIlQkrG3zH4RLWzh3qjw96uuvuFSTs57YFMZyBDvFWgCdThxYEJx87tADSsH0uEbt9RMNepisxFLtPgf_Yl1JWADM5TvhF4FXdMaXVBgCzS8ZOgnjf_5P2ePpeoFCqI21hSX2gyR_rujMq2zJyjDDRE4WXQEv")' }}
              ></div>
              <div className="px-2 pb-2">
                <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Sứ mệnh</p>
                <p className="text-[#111418] dark:text-white text-lg font-bold leading-tight mb-2">Minh bạch hóa thị trường</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed font-body">
                  Sử dụng AI để loại bỏ thông tin ảo, mang lại dữ liệu BĐS chính xác và đáng tin cậy nhất cho người dùng.
                </p>
              </div>
            </div>
            <div className="snap-center shrink-0 w-[300px] flex flex-col gap-3 rounded-3xl bg-white dark:bg-[#1c2936] border border-gray-100 dark:border-gray-800 p-3 shadow-sm ring-1 ring-black/5">
              <div 
                className="w-full h-40 bg-center bg-no-repeat bg-cover rounded-2xl" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCIpWn-9L7qQduLcuhvMCRZWoq5f-PfVwQaa1yFMbfsPgkrTX_AtdMMJZqB-S6PhLJe9PZJoVw42RCRMBYKARHE4wsqS69oBtlLASFe5IyKsid6z3CvQzLN9i9h8X4rVD2bxZAPfdSvvwlTbiSjOwYlTg1MyQe9T86ELPXf4ojaphaFJ1LzLk_5-2HN2ebfJOsOli8_x4wgswtsNE9l1wOwr_d92ut59DebvWVxNrtLjDgjGBjfkyLeB_-oAGqr-Nl2Du3P_PyaByqy")' }}
              ></div>
              <div className="px-2 pb-2">
                <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Tầm nhìn</p>
                <p className="text-[#111418] dark:text-white text-lg font-bold leading-tight mb-2">Hệ sinh thái số 1</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed font-body">
                  Trở thành nền tảng công nghệ bất động sản toàn diện nhất khu vực Đông Nam Á vào năm 2030.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="px-5 py-6">
          <h3 className="text-[#111418] dark:text-white text-xl font-bold pb-5">
            Giá trị cốt lõi
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {coreValues.map((val, idx) => (
              <div key={idx} className="flex flex-col p-5 rounded-3xl bg-white dark:bg-[#1c2936] border border-gray-100 dark:border-gray-800 items-start gap-3 shadow-sm ring-1 ring-black/5 hover:ring-primary/30 transition-all cursor-default">
                <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-2xl">{val.icon}</span>
                </div>
                <div>
                  <p className="font-bold text-base text-[#111418] dark:text-white">{val.title}</p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="flex flex-col w-full py-4">
          <div className="flex items-center justify-between px-5 pb-5">
            <h3 className="text-[#111418] dark:text-white text-xl font-bold">
              Đội ngũ lãnh đạo
            </h3>
            <button className="text-primary text-sm font-bold hover:underline">Xem tất cả</button>
          </div>
          <div className="flex overflow-x-auto no-scrollbar px-5 gap-6">
            {leadership.map((person, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 min-w-[100px] group">
                <div 
                  className="w-20 h-20 rounded-full bg-cover bg-center border-2 border-primary/20 shadow-md transition-transform group-hover:scale-105" 
                  style={{ backgroundImage: `url("${person.img}")` }}
                ></div>
                <div className="text-center">
                  <p className="text-[#111418] dark:text-white text-sm font-bold truncate max-w-[120px]">{person.name}</p>
                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight mt-0.5">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="px-5 py-6">
          <h3 className="text-[#111418] dark:text-white text-xl font-bold pb-5">Liên hệ</h3>
          <div className="flex flex-col gap-5 rounded-3xl bg-white dark:bg-[#1c2936] border border-gray-100 dark:border-gray-800 p-6 shadow-sm ring-1 ring-black/5">
            {/* Office */}
            <div className="flex gap-4 items-start">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Văn phòng</p>
                <p className="text-[#111418] dark:text-white text-sm font-medium leading-relaxed">
                  Tầng 19, Tòa nhà Innovation, Khu Công Nghệ Cao, Tp. Thủ Đức, TP. Hồ Chí Minh
                </p>
              </div>
            </div>
            {/* Hotline */}
            <div className="flex gap-4 items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">call</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hotline</p>
                <p className="text-[#111418] dark:text-white text-sm font-bold">1900 6868 99</p>
              </div>
            </div>
            {/* Email */}
            <div className="flex gap-4 items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</p>
                <p className="text-[#111418] dark:text-white text-sm font-bold">contact@goland.ai</p>
              </div>
            </div>

            <div className="h-px w-full bg-gray-100 dark:bg-gray-800 my-2"></div>

            {/* Social Connect */}
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold text-[#111418] dark:text-white">Kết nối với Goland AI</p>
              <div className="grid grid-cols-2 gap-3">
                <a href="#" className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-all active:scale-95">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.733.984-2.733 2.592v1.38h3.754l-.531 3.667h-3.223v7.98H9.101Z"></path></svg>
                  <span className="font-bold text-sm">Facebook</span>
                </a>
                <a href="#" className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-all active:scale-95">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                  <span className="font-bold text-sm">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-1 pb-8 pt-12 border-t border-gray-100 dark:border-gray-800 mt-6 mx-8">
          <p className="text-gray-400 text-xs font-bold">Phiên bản 2.4.0 (Build 2024)</p>
          <p className="text-gray-400 text-xs font-medium">© 2024 Goland AI Technology. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
