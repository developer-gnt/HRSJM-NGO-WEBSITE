export interface TestingNoticeConfig {
  enabled: boolean;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  continueButtonText: string;
  leaveButtonText?: string;
  footerText: string;
  leaveRedirectUrl?: string;
  /**
   * "session": popup appears once per browsing session (stored in sessionStorage)
   * "always": popup appears on every page refresh/visit
   */
  displayFrequency: "always" | "session";
}

export const testingNoticeConfig: TestingNoticeConfig = {
  enabled: true,
  badge: "Website Under Testing",
  title: "Welcome to HRSJM",
  subtitle: "Our website is currently in the testing phase.",
  description:
    "We are working to improve your experience. Some pages or features may be incomplete or temporarily unavailable. Thank you for your patience and cooperation.",
  continueButtonText: "Okay, I understood",
  footerText: "Thank you for your understanding and support.",
  displayFrequency: "always",
};
