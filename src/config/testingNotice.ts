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
  badge: "Celebrating 15 Years",
  title: "A New Chapter Begins!",
  subtitle: "15 Years of Human Rights and Social Justice Mission",
  description:
    "We are celebrating 15 years of commitment with an exciting new digital experience!\n\nDiscover our New Website with Members Login, Upcoming Mobile App, New Logo, and New Membership ID & Kit.\n\nThe journey continues with new possibilities!",
  continueButtonText: "Explore What's New",
  footerText: "Thank you for your understanding and support.",
  displayFrequency: "always",
};
