import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';

// Types
export interface UploadRequest {
    file_name: string;
    file_type: string;
    file_size: number;
    upload_type: 'avatar' | 'banner' | 'post_image' | 'journal_image';
    entity_id?: string;
}

export interface UploadResponse {
    upload_url: string;
    file_key: string;
    expires_at: string;
}

export interface FileInfo {
    file_key: string;
    public_url: string;
    thumbnail_url?: string;
    file_size: number;
    content_type: string;
}

export const uploadApi = {
    /**
     * Request presigned upload URL from server
     */
    requestUpload: async (data: UploadRequest): Promise<UploadResponse> => {
        const response = await api
            .post('upload/request', {
                json: data,
            })
            .json<ApiResponse<UploadResponse>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to request upload URL');
    },

    /**
     * Upload file directly to R2 using presigned URL
     */
    uploadFile: async (uploadUrl: string, file: File): Promise<void> => {
        const response = await fetch(uploadUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to upload file to R2');
        }
    },

    /**
     * Confirm upload and get public URL
     */
    confirmUpload: async (fileKey: string): Promise<FileInfo> => {
        const response = await api
            .post('upload/confirm', {
                json: { file_key: fileKey },
            })
            .json<ApiResponse<FileInfo>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to confirm upload');
    },

    /**
     * Delete file from R2
     */
    deleteFile: async (fileKey: string): Promise<void> => {
        const response = await api
            .delete(`upload/${encodeURIComponent(fileKey)}`)
            .json<ApiResponse<null>>();

        if (!response.success) {
            throw new Error(response.message || 'Failed to delete file');
        }
    },

    /**
     * Get file info
     */
    getFileInfo: async (fileKey: string): Promise<FileInfo> => {
        const response = await api
            .get(`upload/${encodeURIComponent(fileKey)}/info`)
            .json<ApiResponse<FileInfo>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to get file info');
    },
};
