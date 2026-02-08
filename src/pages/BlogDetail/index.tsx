import React from 'react';
import { useParams } from 'react-router-dom';
import { SEO } from '@/components/common/SEO/SEO';
import './BlogDetail.css';

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Mock data - in production, fetch based on ID
    const post = {
        id: id || '1',
        category: 'Thiết kế',
        tags: ['Hệ thống thiết kế', 'Tối giản', 'UX/UI'],
        title: 'Nghệ Thuật Thiết Kế Tối Giản',
        subtitle: 'Trong một thế giới đầy tiếng ồn, tìm kiếm sự rõ ràng thường có nghĩa là loại bỏ những thứ không cần thiết. Cuộc khám phá về sự tối giản này không chỉ là về lựa chọn thẩm mỹ, mà là một sự thay đổi cơ bản trong cách chúng ta nhìn nhận giá trị.',
        author: {
            name: 'Elena Fisher',
            avatar: 'https://via.placeholder.com/40',
            date: '24 Th10, 2023',
            readTime: '5 phút đọc'
        },
        heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYvxfGtD5hG4qubvuZEjgePXBg9AdtbCkqnHjIA3RIKOAFhsU1FoucyFhF_FFvKeq8NN39hnBsKP5n8UC5SFRZ3kuceUVwvyiXeirG9rtgm5Bd5o9jM-X8Tm3m1I7jShruixIH_vPQGzCYB9yvgccDt4Nbl_8J5d1OfaitMCjviXOwZ8xXAw1N3KQfDWPo9AOTFyJW2MUYgVuQm0hHtruD-yEnAt6zoGBOgCskMpEm2UuKtjzhLcY3voYFNkcUvsbp9XLhT3bc-e8',
        heroCaption: 'Sự tĩnh lặng của thị giác cho phép tâm trí lên tiếng.',
        likes: 1200,
        comments: 48,
        lastUpdated: '2 ngày trước'
    };

    return (
        <>
            <SEO title={`${post.title} - MeoBeo Talk`} />

            <main className="blog-detail-container">
                <article className="blog-detail-article">
                    {/* Category Tags */}
                    <div className="article-categories">
                        <span>{post.category}</span>
                        <span className="category-dot"></span>
                        <span>Triết lý</span>
                    </div>

                    {/* Title */}
                    <h1 className="article-title">{post.title}</h1>

                    {/* Subtitle */}
                    <p className="article-subtitle">{post.subtitle}</p>

                    {/* Author & Actions */}
                    <div className="article-meta">
                        <div className="author-info">
                            <div className="author-avatar">
                                <img src={post.author.avatar} alt={post.author.name} />
                            </div>
                            <div className="author-details">
                                <span className="author-name">{post.author.name}</span>
                                <span className="author-date">
                                    {post.author.date} · {post.author.readTime}
                                </span>
                            </div>
                        </div>
                        <div className="article-actions">
                            <button className="action-btn" aria-label="Bookmark">
                                <span className="material-symbols-outlined">bookmark</span>
                            </button>
                            <button className="action-btn" aria-label="Share">
                                <span className="material-symbols-outlined">ios_share</span>
                            </button>
                            <button className="action-btn" aria-label="More options">
                                <span className="material-symbols-outlined">more_horiz</span>
                            </button>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="hero-image-container">
                        <div className="hero-image">
                            <img src={post.heroImage} alt={post.title} />
                        </div>
                        <figcaption className="hero-caption">{post.heroCaption}</figcaption>
                    </div>

                    {/* Article Body */}
                    <div className="article-body">
                        <p className="article-opening">
                            Chủ nghĩa tối giản không phải là sự trống rỗng; đó là việc tạo ra không gian cho những gì thực sự quan trọng. Khi chúng ta loại bỏ sự lộn xộn về hình ảnh khỏi màn hình, hoặc sự lộn xộn vật lý khỏi ngôi nhà của mình, chúng ta không chỉ tạo ra không gian—chúng ta đang chọn lọc sự chú ý của mình. Web hiện đại đã trở thành một lễ hội của sự xao nhãng, với các cửa sổ bật lên, biểu ngữ và cuộn vô hạn tranh giành một phần băng thông nhận thức của chúng ta.
                        </p>

                        <p>
                            Thiết kế cho sự tối giản đòi hỏi sự kiềm chế có kỷ luật. Thêm vào thì dễ; bớt đi mới khó. Mỗi yếu tố trên một trang phải chiến đấu cho sự tồn tại của nó. Nút này có phục vụ mục tiêu chính của người dùng không? Hình ảnh này có thúc đẩy câu chuyện không? Nếu câu trả lời là do dự, yếu tố đó phải đi. Triết lý này mở rộng ra ngoài thiết kế vào cách chúng ta viết và giao tiếp.
                        </p>

                        <h3>Thẩm Mỹ Chức Năng</h3>

                        <p>
                            Hình thức tuân theo chức năng là một câu ngạn ngữ cũ, nhưng trong thời đại kỹ thuật số, nó đã mang một sự cấp bách mới. Một giao diện đẹp mắt nhưng làm người dùng bối rối là một thất bại của thiết kế. Chủ nghĩa tối giản thực sự kết hợp thẩm mỹ với khả năng sử dụng, tạo ra một trải nghiệm cảm thấy trực quan và dễ dàng.
                        </p>

                        {/* Inline Image */}
                        <figure className="inline-image">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7If36zOX6WqTTbznoeWQnpzoRu6hUSJ__AvjXWHeBGAyweIo2xMh0DiXL4omhl7pNE5Yca0ZV9RiSymrrnOV1_AwyvL-kiuoJecXYq2ZqGx-EWKe6_BqfDi4O7qvODAbE5L17dvd7le4qOoR1hf832NmhfUx1nhYk-qH8avlB-gFM1s3MP1oPIOTuO8QgAQGRhzFnMKFDtXTgIv3oB325-5ht7MHjEpCTdDXHlEZ77R6rzHWPtlPG8fhYjSP5rpKddYbs3248_RA"
                                alt="Góc làm việc gọn gàng với laptop và cây xanh"
                            />
                        </figure>

                        <p>
                            Khi chúng tôi tiến về phía trước, nền tảng "MeoBeo Talk" nhằm mục đích thể hiện những nguyên tắc này. Bằng cách ưu tiên từ ngữ viết và tiếng nói của tác giả, chúng tôi loại bỏ sự game hóa của tương tác xã hội. Không có thông báo nhấp nháy ở đây, chỉ có những câu chuyện đang chờ được đọc.
                        </p>

                        <blockquote className="article-quote">
                            "Sự hoàn hảo đạt được, không phải khi không còn gì để thêm vào, mà là khi không còn gì để bớt đi."
                            <cite>— Antoine de Saint-Exupéry</cite>
                        </blockquote>

                        <p>
                            Nắm lấy tư duy này cho phép người sáng tạo tập trung vào bản chất thông điệp của họ. Nó mời độc giả vào một không gian tĩnh lặng, suy ngẫm, nơi các ý tưởng có thể được tiêu hóa chậm rãi, không chịu áp lực phải nhấp sang chủ đề xu hướng tiếp theo. Đây là nghệ thuật của thiết kế tối giản—một cuộc cách mạng thầm lặng trong một thế giới ồn ào.
                        </p>
                    </div>

                    {/* Footer Meta / Tags */}
                    <div className="article-footer">
                        <div className="article-tags">
                            {post.tags.map((tag, index) => (
                                <span key={index} className="tag-pill">{tag}</span>
                            ))}
                        </div>
                        <div className="article-engagement">
                            <div className="engagement-actions">
                                <button className="engagement-btn">
                                    <span className="material-symbols-outlined">thumb_up</span>
                                    <span>{post.likes.toLocaleString()}</span>
                                </button>
                                <span className="engagement-divider">|</span>
                                <button className="engagement-btn">
                                    <span className="material-symbols-outlined">chat_bubble</span>
                                    <span>{post.comments}</span>
                                </button>
                            </div>
                            <div className="last-updated">
                                Cập nhật lần cuối {post.lastUpdated}
                            </div>
                        </div>
                    </div>
                </article>
            </main>
        </>
    );
};

export default BlogDetailPage;
