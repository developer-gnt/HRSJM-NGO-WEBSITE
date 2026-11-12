export interface MaintenanceConfig {
  enabled: boolean;
  badge: string;
  title: string;
  hindiTitle: string;
  description: string;
  estimatedReturn: string;
  contact: {
    phone: string;
    phoneDisplay: string;
    email: string;
    address: string;
  };
  socialLinks: Array<{
    name: string;
    href: string;
  }>;
}

export const maintenanceConfig: MaintenanceConfig = {
  // Set to true to display the maintenance screen across the website
  // Set to false to return to normal site operations
  enabled: false,

  badge: "Scheduled Maintenance in Progress",
  title: "We'll Be Right Back Shortly",
  hindiTitle: "मानव अधिकार एवं सामाजिक न्याय मिशन · तकनीकी रखरखाव प्रगति पर है",
  description:
    "Our website is currently undergoing scheduled maintenance and system upgrades to improve performance, data security, and community services. We appreciate your patience and will be back online shortly.",
  estimatedReturn: "System updates are underway - please check back soon.",

  contact: {
    phone: "+917021057853",
    phoneDisplay: "+91 70210 57853",
    email: "enquiry@hrsjm.org",
    address: "Sir Mathuradas Vasanji Rd, Chimatpada, Marol Naka, Andheri East, Mumbai, Maharashtra 400059",
  },

  socialLinks: [
    { name: "Facebook", href: "https://www.facebook.com/HumanRightsSocialJusticeMissionNgo" },
    { name: "X (Twitter)", href: "https://x.com/hrsjm_president" },
    { name: "Instagram", href: "https://www.instagram.com/humanrights_hrsjm/" },
  ],
};
