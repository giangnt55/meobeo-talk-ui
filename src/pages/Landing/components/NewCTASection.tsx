import React from 'react';

const NewCTASection: React.FC = () => {
    return (
        <div className="w-full px-6 py-20 bg-sage/5 dark:bg-sage/10">
            <div className="max-w-[720px] mx-auto text-center flex flex-col gap-6 items-center">
                <span className="material-symbols-outlined text-5xl text-primary">auto_awesome</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#181411] dark:text-white">
                    Sẵn sàng viết nên cuốn sổ tay kỹ thuật số chưa?
                </h2>
                <p className="text-[#897261] dark:text-gray-300">
                    Tham gia cùng hàng ngàn thành viên đang lưu giữ di sản của họ, từng ký ức một.
                </p>
                <button className="mt-4 flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-8 bg-primary hover:bg-orange-600 text-white text-base font-bold shadow-lg transition-all hover:scale-105">
                    Tạo Tài Khoản Miễn Phí
                </button>
            </div>
        </div>
    );
};

export default NewCTASection;
