import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';
import type {
    Journal,
    JourneyWithJournals,
    CreateJournalInput,
    UpdateJournalInput,
} from '@/types/post';

export const journalApi = {
    /**
     * Get a journey with all its journals
     */
    getJourneyWithJournals: async (journeyId: string): Promise<JourneyWithJournals> => {
        const response = await api
            .get(`journeys/${journeyId}/journals`)
            .json<ApiResponse<JourneyWithJournals>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to fetch journey with journals');
    },

    /**
     * Create a new journal in a journey
     */
    createJournal: async (
        journeyId: string,
        data: CreateJournalInput
    ): Promise<Journal> => {
        const response = await api
            .post(`journeys/${journeyId}/journals`, {
                json: data,
            })
            .json<ApiResponse<Journal>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to create journal');
    },

    /**
     * Get a single journal by ID
     */
    getJournal: async (journalId: string): Promise<Journal> => {
        const response = await api
            .get(`journals/${journalId}`)
            .json<ApiResponse<Journal>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to fetch journal');
    },

    /**
     * Update a journal
     */
    updateJournal: async (
        journalId: string,
        data: UpdateJournalInput
    ): Promise<Journal> => {
        const response = await api
            .put(`journals/${journalId}`, {
                json: data,
            })
            .json<ApiResponse<Journal>>();

        if (response.success && response.data) {
            return response.data;
        }

        throw new Error(response.message || 'Failed to update journal');
    },

    /**
     * Delete a journal
     */
    deleteJournal: async (journalId: string): Promise<void> => {
        const response = await api
            .delete(`journals/${journalId}`)
            .json<ApiResponse<null>>();

        if (!response.success) {
            throw new Error(response.message || 'Failed to delete journal');
        }
    },

    /**
     * Reorder journals in a journey
     */
    reorderJournals: async (journeyId: string, journalIds: string[]): Promise<void> => {
        const response = await api
            .post(`journeys/${journeyId}/journals/reorder`, {
                json: { journal_ids: journalIds },
            })
            .json<ApiResponse<null>>();

        if (!response.success) {
            throw new Error(response.message || 'Failed to reorder journals');
        }
    },
};
