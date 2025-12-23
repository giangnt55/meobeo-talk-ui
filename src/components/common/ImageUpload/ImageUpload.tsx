import React, { useRef, useState } from 'react';
import { useFileUpload } from '@/hooks/useFileUpload';
import type { UploadRequest } from '@/api/services/uploadApi';
import './ImageUpload.css';

interface ImageUploadProps {
    onUploadComplete: (url: string, thumbnailUrl?: string) => void;
    uploadType: UploadRequest['upload_type'];
    entityId?: string;
    maxSize?: number; // in bytes
    accept?: string;
    currentImage?: string;
    label?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    onUploadComplete,
    uploadType,
    entityId,
    maxSize = 10 * 1024 * 1024, // 10MB default
    accept = 'image/*',
    currentImage,
    label = 'Upload Image',
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const { uploadFile, uploading, progress, error, resetError } = useFileUpload();

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        resetError();

        // Validate file size
        if (file.size > maxSize) {
            alert(`File too large. Maximum size: ${(maxSize / 1024 / 1024).toFixed(0)}MB`);
            return;
        }

        // Validate file type
        if (accept && !file.type.match(accept.replace('*', '.*'))) {
            alert(`Invalid file type. Accepted: ${accept}`);
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload file
        const fileInfo = await uploadFile(file, uploadType, entityId);
        if (fileInfo) {
            onUploadComplete(fileInfo.public_url, fileInfo.thumbnail_url);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemove = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onUploadComplete('');
    };

    return (
        <div className="image-upload">
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileSelect}
                disabled={uploading}
                style={{ display: 'none' }}
            />

            {preview ? (
                <div className="image-preview">
                    <img src={preview} alt="Preview" />
                    {!uploading && (
                        <div className="preview-actions">
                            <button
                                type="button"
                                onClick={handleClick}
                                className="btn-change"
                            >
                                Change
                            </button>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="btn-remove"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={uploading}
                    className="upload-button"
                >
                    <svg
                        className="upload-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                    <span>{label}</span>
                </button>
            )}

            {uploading && (
                <div className="upload-progress">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="progress-text">{progress}%</span>
                </div>
            )}

            {error && (
                <div className="upload-error">
                    <span>{error}</span>
                    <button onClick={resetError} className="btn-dismiss">
                        ×
                    </button>
                </div>
            )}
        </div>
    );
};
