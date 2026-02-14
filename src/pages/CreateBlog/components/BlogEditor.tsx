import React, { useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import './BlogEditor.css';

import { uploadApi } from '@/api/services/uploadApi';

interface BlogEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({
    content,
    onChange,
    placeholder = 'Kể câu chuyện của bạn...',
}) => {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'editor-link',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'editor-image',
                },
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'blog-content focus:outline-none',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const url = window.prompt('Nhập đường dẫn:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            try {
                const result = await uploadApi.directUpload(file, 'blog_image');
                editor.chain().setImage({ src: result.public_url }).run();
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Không thể tải lên hình ảnh');
            }
        }
        // Reset input so the same file can be selected again
        if (imageInputRef.current) {
            imageInputRef.current.value = '';
        }
    };

    const addImage = () => {
        imageInputRef.current?.click();
    };

    return (
        <div className="blog-editor">
            {/* Toolbar */}
            <div className="editor-toolbar">
                <div className="toolbar-group">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                        title="Tiêu đề 1"
                    >
                        <span className="material-symbols-outlined">format_h1</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                        title="Tiêu đề 2"
                    >
                        <span className="material-symbols-outlined">format_h2</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                        title="Tiêu đề 3"
                    >
                        <span className="material-symbols-outlined">format_h3</span>
                    </button>
                </div>

                <div className="toolbar-divider"></div>

                <div className="toolbar-group">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'is-active' : ''}
                        title="In đậm (Cmd+B)"
                    >
                        <span className="material-symbols-outlined">format_bold</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'is-active' : ''}
                        title="In nghiêng (Cmd+I)"
                    >
                        <span className="material-symbols-outlined">format_italic</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'is-active' : ''}
                        title="Gạch ngang"
                    >
                        <span className="material-symbols-outlined">strikethrough_s</span>
                    </button>
                </div>

                <div className="toolbar-divider"></div>

                <div className="toolbar-group">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                        title="Danh sách liệt kê"
                    >
                        <span className="material-symbols-outlined">format_list_bulleted</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}
                        title="Danh sách số"
                    >
                        <span className="material-symbols-outlined">format_list_numbered</span>
                    </button>
                </div>

                <div className="toolbar-divider"></div>

                <div className="toolbar-group">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={editor.isActive('blockquote') ? 'is-active' : ''}
                        title="Trích dẫn"
                    >
                        <span className="material-symbols-outlined">format_quote</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={editor.isActive('codeBlock') ? 'is-active' : ''}
                        title="Khối mã"
                    >
                        <span className="material-symbols-outlined">code</span>
                    </button>
                </div>

                <div className="toolbar-divider"></div>

                <div className="toolbar-group">
                    <button
                        type="button"
                        onClick={setLink}
                        className={editor.isActive('link') ? 'is-active' : ''}
                        title="Thêm liên kết"
                    >
                        <span className="material-symbols-outlined">link</span>
                    </button>
                    <button
                        type="button"
                        onClick={addImage}
                        title="Thêm hình ảnh"
                    >
                        <span className="material-symbols-outlined">image</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        title="Đường kẻ ngang"
                    >
                        <span className="material-symbols-outlined">horizontal_rule</span>
                    </button>
                </div>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} className="editor-content" />

            {/* Hidden File Input for Images */}
            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
            />
        </div>
    );
};
