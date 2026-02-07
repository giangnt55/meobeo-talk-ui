import React from 'react';

const NewFeaturesSection: React.FC = () => {
    return (
        <div className="w-full bg-white dark:bg-[#1a120b] py-20">
            <div className="max-w-[960px] mx-auto px-6">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4 text-center items-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                            Features
                        </div>
                        <h2 className="text-[#181411] dark:text-white text-3xl lg:text-4xl font-bold leading-tight">
                            Ways to Share Your World
                        </h2>
                        <p className="text-[#897261] dark:text-gray-400 text-base max-w-2xl">
                            Choose the format that fits your story best. From quick snapshots to deep dives, we have a canvas for you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card 1 */}
                        <div className="group flex flex-col gap-4 rounded-2xl border border-[#e6e0db] dark:border-gray-800 bg-[#fbfaf9] dark:bg-[#2c2018] p-8 transition-all hover:border-primary/50 hover:shadow-lg">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">edit_note</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-[#181411] dark:text-white text-xl font-bold">Small Blogs</h3>
                                <p className="text-[#897261] dark:text-gray-400 text-sm leading-relaxed">
                                    Share quick thoughts, single photos, or bite-sized updates about your day. Perfect for keeping friends in the loop without the pressure of a long post.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group flex flex-col gap-4 rounded-2xl border border-[#e6e0db] dark:border-gray-800 bg-[#fbfaf9] dark:bg-[#2c2018] p-8 transition-all hover:border-primary/50 hover:shadow-lg">
                            <div className="w-12 h-12 rounded-xl bg-sage/20 dark:bg-sage/10 flex items-center justify-center text-[#5a6b5c] dark:text-[#9CA998] group-hover:bg-[#5a6b5c] group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">menu_book</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-[#181411] dark:text-white text-xl font-bold">Memory Journals</h3>
                                <p className="text-[#897261] dark:text-gray-400 text-sm leading-relaxed">
                                    Dedicate a space for deeper reflection. Combine text, multiple images, and mood tags to chronicle significant life events or personal growth.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                            See all features <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewFeaturesSection;
