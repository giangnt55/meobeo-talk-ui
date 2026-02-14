import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublishingSidebar from './components/PublishingSidebar.tsx';
import { BlogEditor } from './components/BlogEditor';
import { SEO } from '@/components/common/SEO/SEO';
import { blogApi } from '@/api/services/blogApi';
import { uploadApi } from '@/api/services/uploadApi';
import { ConfirmModal, SuccessModal, InfoModal } from '@/components/common/Modal';
import './CreateBlog.css';

const CreateBlog: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [tags, setTags] = useState<string[]>(['design']);
    const [visibility, setVisibility] = useState<'public' | 'private' | 'followers'>('public');
    const [category, setCategory] = useState<string>('');
    const [isPublishing, setIsPublishing] = useState(false);

    // Modal states
    const [showPublishConfirm, setShowPublishConfirm] = useState(false);
    const [showDraftConfirm, setShowDraftConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [successMessage, setSuccessMessage] = useState({ title: '', message: '' });
    const [errorMessage, setErrorMessage] = useState({ title: '', message: '' });
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
            // Store file for later upload
            setCoverImageFile(file);
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setCoverImage(previewUrl);
        }
        // Reset input value so the same file can be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handlePublishClick = () => {
        if (!title.trim() || !body.trim()) {
            setErrorMessage({
                title: 'Thiếu thông tin',
                message: 'Vui lòng nhập tiêu đề và nội dung bài viết trước khi xuất bản.'
            });
            setShowError(true);
            return;
        }
        setShowPublishConfirm(true);
    };

    const handlePublish = async () => {
        setShowPublishConfirm(false);

        try {
            setIsPublishing(true);

            // Upload cover image if exists
            let uploadedCoverUrl = coverImage;
            if (coverImageFile) {
                const result = await uploadApi.directUpload(coverImageFile, 'banner');
                uploadedCoverUrl = result.public_url;
            }

            const blog = await blogApi.createBlog({
                title: title.trim(),
                content_html: body,
                category: category || undefined,
                banner_url: uploadedCoverUrl || undefined,
                tags,
                visibility,
                status: 'published',
            });

            // Show success and navigate
            setSuccessMessage({
                title: 'Đã xuất bản!',
                message: 'Bài viết của bạn đã được xuất bản thành công.'
            });
            setShowSuccess(true);

            // Navigate after a short delay
            setTimeout(() => {
                navigate(`/blog/${blog.id}`);
            }, 1500);
        } catch (err) {
            setErrorMessage({
                title: 'Lỗi xuất bản',
                message: 'Không thể xuất bản bài viết. Vui lòng thử lại.'
            });
            setShowError(true);
            console.error('Error publishing blog:', err);
        } finally {
            setIsPublishing(false);
        }
    };

    const handleSaveDraftClick = () => {
        if (!title.trim() || !body.trim()) {
            setErrorMessage({
                title: 'Thiếu thông tin',
                message: 'Cần có tiêu đề và nội dung để lưu bản nháp.'
            });
            setShowError(true);
            return;
        }
        setShowDraftConfirm(true);
    };

    const handleSaveDraft = async () => {
        setShowDraftConfirm(false);

        try {
            setIsPublishing(true);

            // Upload cover image if exists
            let uploadedCoverUrl = coverImage;
            if (coverImageFile) {
                const result = await uploadApi.directUpload(coverImageFile, 'banner');
                uploadedCoverUrl = result.public_url;
            }

            await blogApi.createBlog({
                title: title.trim(),
                content_html: body,
                category: category || undefined,
                banner_url: uploadedCoverUrl || undefined,
                tags,
                visibility,
                status: 'draft',
            });

            setSuccessMessage({
                title: 'Đã lưu bản nháp',
                message: 'Bản nháp của bạn đã được lưu thành công!'
            });
            setShowSuccess(true);
        } catch (err) {
            setErrorMessage({
                title: 'Lỗi lưu bản nháp',
                message: 'Không thể lưu bản nháp. Vui lòng thử lại.'
            });
            setShowError(true);
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

            {/* Modals */}
            <ConfirmModal
                isOpen={showPublishConfirm}
                onClose={() => setShowPublishConfirm(false)}
                onConfirm={handlePublish}
                title="Xuất bản bài viết?"
                message="Bài viết sẽ được công khai và mọi người có thể xem. Bạn có chắc chắn muốn xuất bản?"
                confirmText="Xuất bản"
                cancelText="Hủy"
                variant="primary"
            />

            <ConfirmModal
                isOpen={showDraftConfirm}
                onClose={() => setShowDraftConfirm(false)}
                onConfirm={handleSaveDraft}
                title="Lưu bản nháp?"
                message="Bài viết sẽ được lưu dưới dạng bản nháp và bạn có thể chỉnh sửa sau."
                confirmText="Lưu"
                cancelText="Hủy"
                variant="primary"
            />

            <SuccessModal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title={successMessage.title}
                message={successMessage.message}
            />

            <InfoModal
                isOpen={showError}
                onClose={() => setShowError(false)}
                title={errorMessage.title}
                icon="error"
                iconColor="red"
            >
                <p>{errorMessage.message}</p>
            </InfoModal>

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
                    onPublish={handlePublishClick}
                    onSchedule={handleSchedule}
                    onSaveDraft={handleSaveDraftClick}
                    isPublishing={isPublishing}
                />
            </div>

            {/* Mobile Floating Button */}
            <button className="mobile-publish-btn" onClick={handlePublishClick}>
                <span className="material-symbols-outlined">publish</span>
            </button>
        </>
    );
};

export default CreateBlog;
