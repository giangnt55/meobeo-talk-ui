export const ONBOARDING_STEPS = {
  PROFILE: '/onboarding/profile',
  INTERESTS: '/onboarding/interests',
  FOLLOW: '/onboarding/follow',
  COMPLETE: '/timeline',
} as const;

export const getOnboardingProgress = (currentPath: string): number => {
  switch (currentPath) {
    case ONBOARDING_STEPS.PROFILE:
      return 1;
    case ONBOARDING_STEPS.INTERESTS:
      return 2;
    case ONBOARDING_STEPS.FOLLOW:
      return 3;
    default:
      return 0;
  }
};

export const getNextOnboardingStep = (currentStep: number): string => {
  switch (currentStep) {
    case 1:
      return ONBOARDING_STEPS.INTERESTS;
    case 2:
      return ONBOARDING_STEPS.FOLLOW;
    case 3:
      return ONBOARDING_STEPS.COMPLETE;
    default:
      return ONBOARDING_STEPS.PROFILE;
  }
};

type OnboardingData = {
  displayName?: string;
  interests?: string[];
  [key: string]: unknown;
};

export const validateOnboardingStep = (step: number, data: OnboardingData): string | null => {
  const safeData: OnboardingData = data ?? {};
  switch (step) {
    case 1:
      if (!safeData.displayName || !safeData.displayName.trim()) {
        return 'Display name is required';
      }
      break;
    case 2:
      if (!safeData.interests || safeData.interests.length < 5) {
        return 'Please select at least 5 interests';
      }
      break;
    case 3:
      // Optional step, no validation needed
      break;
  }
  return null;
};