import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublishingSidebar from './components/PublishingSidebar.tsx';
import { BlogEditor } from './components/BlogEditor';
import { SEO } from '@/components/common/SEO/SEO';
import { blogApi } from '@/api/services/blogApi';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/common/ToastContainer/ToastContainer';
import './CreateBlog.css';

const CreateBlog: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [tags, setTags] = useState<string[]>(['design']);
    const [visibility, setVisibility] = useState<'public' | 'private' | 'followers'>('public');
    const [category, setCategory] = useState<string>('');
    const [isPublishing, setIsPublishing] = useState(false);
    const { toasts, removeToast, error: toastError, success: toastSuccess } = useToast();
    const lastSaved = '2 phút trước';

    const titleRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auto-resize textareas
    const autoResize = (element: HTMLTextAreaElement | null) => {
        if (element) {
            element.style.height = 'auto';
            element.style.height = element.scrollHeight + 'px';
        }
    };

    useEffect(() => {
        autoResize(titleRef.current);
    }, [title]);

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        // Reset input value so the same file can be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handlePublish = async () => {
        if (!title.trim() || !body.trim()) {
            toastError('Lỗi', 'Vui lòng nhập tiêu đề và nội dung bài viết');
            return;
        }

        try {
            setIsPublishing(true);

            const blog = await blogApi.createBlog({
                title: title.trim(),
                content_html: body,
                category: category || undefined,
                banner_url: coverImage || undefined,
                tags,
                visibility,
                status: 'published',
            });

            // Navigate to the created blog
            toastSuccess('Thành công', 'Bài viết đã được xuất bản');
            navigate(`/blog/${blog.id}`);
        } catch (err) {
            toastError('Lỗi', 'Không thể xuất bản bài viết. Vui lòng thử lại.');
            console.error('Error publishing blog:', err);
        } finally {
            setIsPublishing(false);
        }
    };

    const handleSaveDraft = async () => {
        if (!title.trim() || !body.trim()) {
            toastError('Lỗi', 'Cần có tiêu đề và nội dung để lưu bản nháp');
            return;
        }

        try {
            setIsPublishing(true);

            await blogApi.createBlog({
                title: title.trim(),
                content_html: body,
                category: category || undefined,
                banner_url: coverImage || undefined,
                tags,
                visibility,
                status: 'draft',
            });

            toastSuccess('Đã lưu', 'Bản nháp đã được lưu thành công!');
        } catch (err) {
            toastError('Lỗi', 'Không thể lưu bản nháp. Vui lòng thử lại.');
            console.error('Error saving draft:', err);
        } finally {
            setIsPublishing(false);
        }
    };

    const handleSchedule = () => {
        console.log('Scheduling blog...');
        // TODO: Implement schedule logic
    };

    return (
        <>
            <SEO title="Tạo Blog - MeoBeo Talk" />
            <ToastContainer toasts={toasts} onClose={removeToast} />

            {/* Main Layout */}
            <div className="create-blog-layout">
                {/* Left Spacer */}
                <div className="left-spacer"></div>

                {/* Center Editor */}
                <main className="editor-main">
                    {/* Draft Status Indicator */}
                    <div className="draft-status-bar">
                        <span className="material-symbols-outlined">edit_note</span>
                        <span>Bản nháp - Đã lưu {lastSaved}</span>
                    </div>

                    {/* Cover Image Upload */}
                    <div
                        className={`cover-upload ${coverImage ? 'has-image' : ''}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {coverImage ? (
                            <img
                                src={coverImage}
                                alt="Cover"
                                className="cover-preview"
                            />
                        ) : (
                            <>
                                <span className="material-symbols-outlined upload-icon">
                                    add_photo_alternate
                                </span>
                                <p className="upload-text">Thêm ảnh bìa</p>
                                <p className="upload-hint">Kích thước khuyến nghị: 1200x600</p>
                            </>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleCoverImageChange}
                            className="file-input"
                        />
                    </div>

                    {/* Title Input */}
                    <div className="title-container">
                        <textarea
                            ref={titleRef}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Tiêu đề"
                            className="title-input"
                            rows={1}
                        />
                    </div>

                    {/* Author Info */}
                    <div className="author-info">
                        <div className="author-avatar">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="Author"
                            />
                        </div>
                        <div className="author-details">
                            <span className="author-name">Alex Meow</span>
                            <span className="author-meta">Vừa xong · 1 phút đọc</span>
                        </div>
                    </div>

                    {/* Body Editor */}
                    <div className="body-container">
                        <BlogEditor
                            content={body}
                            onChange={setBody}
                            placeholder="Kể câu chuyện của bạn..."
                        />
                    </div>
                </main>

                {/* Right Sidebar */}
                <PublishingSidebar
                    visibility={visibility}
                    onVisibilityChange={setVisibility}
                    category={category}
                    onCategoryChange={setCategory}
                    tags={tags}
                    onTagsChange={setTags}
                    onPublish={handlePublish}
                    onSchedule={handleSchedule}
                    onSaveDraft={handleSaveDraft}
                    isPublishing={isPublishing}
                />
            </div>

            {/* Mobile Floating Button */}
            <button className="mobile-publish-btn" onClick={handlePublish}>
                <span className="material-symbols-outlined">publish</span>
            </button>
        </>
    );
};

export default CreateBlog;
