import React from 'react';

const NewMemoryJourneyTimeline: React.FC = () => {
    return (
        <div className="w-full max-w-[960px] px-6 py-20">
            <h2 className="text-[#181411] dark:text-white text-3xl font-bold text-center mb-16">
                Hành Trình Ký Ức Của Bạn
            </h2>
            <div className="relative max-w-3xl mx-auto">
                {/* Vertical Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/80 via-sage/50 to-transparent"></div>

                {/* Timeline Item 1 */}
                <div className="relative pl-16 pb-12 group">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-background-light dark:bg-background-dark border-2 border-primary flex items-center justify-center z-10 shadow-sm group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-primary text-sm">flag</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white dark:bg-[#2c2018] border border-[#e6e0db] dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex-1">
                            <span className="text-xs font-bold text-primary uppercase tracking-wide">Bước 1</span>
                            <h3 className="text-lg font-bold text-[#181411] dark:text-white mt-1">
                                Tạo Góc Nhỏ Riêng
                            </h3>
                            <p className="text-[#897261] dark:text-gray-400 text-sm mt-2">
                                Đăng ký và trang trí hồ sơ cá nhân theo chất riêng. Chọn theme, cài đặt quyền riêng tư và bắt đầu cuốn sổ tay kỹ thuật số của bạn.
                            </p>
                        </div>
                        <div className="w-full sm:w-32 h-24 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                            <img
                                alt="Woman using laptop in cozy room"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7JwNgOHjlIp4eMmsPOg9l3FIkW-P6pgNEczy7U3BcLkRbPsvMZansC7Kvsdygfiyxj0ZgO1tVS7tVwvLTWrnaJ57La6IZqmJMd1REN2f66PW8a5FAQQLQBld3s09V9K2urJ3ASpRb1iYSUM1AAzu7ao4dPBgi46LN9oVV7hTpwPqwRf8iKxWrinoTvkFJxx49Vw5oT6aBaW4avlacbhhvBuABkKgfZCfxO0Iub0UHep69ibaPc0SWwHie91XwnHyh1p31ZRs7M-4"
                            />
                        </div>
                    </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative pl-16 pb-12 group">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-background-light dark:bg-background-dark border-2 border-sage flex items-center justify-center z-10 shadow-sm group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-sage text-sm">photo_camera</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white dark:bg-[#2c2018] border border-[#e6e0db] dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex-1">
                            <span className="text-xs font-bold text-sage uppercase tracking-wide">Bước 2</span>
                            <h3 className="text-lg font-bold text-[#181411] dark:text-white mt-1">
                                Lưu Giữ & Chăm Chút
                            </h3>
                            <p className="text-[#897261] dark:text-gray-400 text-sm mt-2">
                                Đăng tải những bức ảnh từ các chuyến đi. Dùng bộ chỉnh sửa xịn xò để thêm filter, sticker và những dòng chú thích ý nghĩa.
                            </p>
                        </div>
                        <div className="w-full sm:w-32 h-24 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                            <img
                                alt="Hand holding a polaroid photo"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxeqm1srV_9RWbiExEV7gjDNLcwKKx6iH2AkaaBn32B0MP01bDVSJyoSjZcWq0nZ_miG5VUWo_ySUUOOmZNA0HguQZhCm0CUJbiqvAARf7HGYed8SpGTKwavnyNJrMQO1oEfjprSE8j-tA2bOTDNs8kS8Ieuo6cZ-S0mMc3tUZb9hFZGRWVhrAAaCRGGPctmt3BdS6T2XmBR8o6eJ8f44YZXYQZmqM6vWWcv4diXn0f1cmu4HElh8un8uN1_ofMQ_Z9Y69DX2aSJg"
                            />
                        </div>
                    </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="relative pl-16 pb-4 group">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-background-light dark:bg-background-dark border-2 border-primary flex items-center justify-center z-10 shadow-sm group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-primary text-sm">rocket_launch</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white dark:bg-[#2c2018] border border-[#e6e0db] dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex-1">
                            <span className="text-xs font-bold text-primary uppercase tracking-wide">Bước 3</span>
                            <h3 className="text-lg font-bold text-[#181411] dark:text-white mt-1">
                                Chia Sẻ & Kết Nối
                            </h3>
                            <p className="text-[#897261] dark:text-gray-400 text-sm mt-2">
                                Khoe câu chuyện của bạn với cả thế giới hoặc giữ làm của riêng. Kết nối với những tâm hồn đồng điệu.
                            </p>
                        </div>
                        <div className="w-full sm:w-32 h-24 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                            <img
                                alt="Friends hugging outdoors"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA6w80o7bdZM0JnjyuV3QMr7sUXZBMECXA85SQ2JfUeqWbuItxr9opqvCyMIk9SrAx1jauo4T17vK2YGuEk_1vGV9DoRT-IPGcOvFCL9ndrq9XgiwZmBZBAA3CALp4WRzPT4DKkPcO0Txyc0Ajy9oondjDJtHmGKrfagHmD1AbcE4FcREyYebwbnLQBSJNrZVNnGp_SxWiHxMXmeZKIhtkT3aZzlXeXXwdOG3wP_3fdfiEUefHmnsNnJ287K37_5JQckUi36SGsl8"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewMemoryJourneyTimeline;
