import { useState } from 'react';
import { uploadApi, type UploadRequest, type FileInfo } from '@/api/services/uploadApi';

interface UseFileUploadReturn {
    uploadFile: (
        file: File,
        uploadType: UploadRequest['upload_type'],
        entityId?: string
    ) => Promise<FileInfo | null>;
    uploading: boolean;
    progress: number;
    error: string | null;
    resetError: () => void;
}

export const useFileUpload = (): UseFileUploadReturn => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const resetError = () => setError(null);

    const uploadFile = async (
        file: File,
        uploadType: UploadRequest['upload_type'],
        entityId?: string
    ): Promise<FileInfo | null> => {
        try {
            setUploading(true);
            setError(null);
            setProgress(0);

            // Step 1: Request upload URL (10%)
            const uploadRequest: UploadRequest = {
                file_name: file.name,
                file_type: file.type,
                file_size: file.size,
                upload_type: uploadType,
                entity_id: entityId,
            };

            const uploadResponse = await uploadApi.requestUpload(uploadRequest);
            setProgress(10);

            // Step 2: Upload file to R2 (10% -> 80%)
            await uploadApi.uploadFile(uploadResponse.upload_url, file);
            setProgress(80);

            // Step 3: Confirm upload and get public URL (80% -> 100%)
            const fileInfo = await uploadApi.confirmUpload(uploadResponse.file_key);
            setProgress(100);

            return fileInfo;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Upload failed';
            setError(errorMessage);
            console.error('Upload error:', err);
            return null;
        } finally {
            setUploading(false);
            // Reset progress after a short delay
            setTimeout(() => setProgress(0), 1000);
        }
    };

    return {
        uploadFile,
        uploading,
        progress,
        error,
        resetError,
    };
};
