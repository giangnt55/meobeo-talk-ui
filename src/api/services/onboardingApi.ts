import { apiGet, apiPut, apiPost } from '@/lib/ky-client';
import type {
    OnboardingStatus,
    OnboardingStatusResponse,
    UpdateOnboardingStep,
} from '@/schemas/onboarding.schema';

export const onboardingApi = {
    /**
     * Get user's onboarding status
     */
    getStatus: async (): Promise<OnboardingStatus> => {
        const response = await apiGet<OnboardingStatusResponse>('onboarding/status');
        if (!response.data) {
            throw new Error('No onboarding data received');
        }
        return response.data;
    },

    /**
     * Update onboarding progress
     */
    updateStep: async (currentStep: number, completedSteps: number[]): Promise<OnboardingStatus> => {
        const payload: UpdateOnboardingStep = {
            current_step: currentStep,
            completed_steps: completedSteps,
        };
        const response = await apiPut<OnboardingStatusResponse>('onboarding/step', payload);
        if (!response.data) {
            throw new Error('No onboarding data received');
        }
        return response.data;
    },

    /**
     * Mark onboarding as complete
     */
    complete: async (): Promise<OnboardingStatus> => {
        const response = await apiPost<OnboardingStatusResponse>('onboarding/complete');
        if (!response.data) {
            throw new Error('No onboarding data received');
        }
        return response.data;
    },
};
