export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  label: string;
  eyebrow: string;
  heading: string;
  description: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    label: "General",
    eyebrow: "About HRSJM",
    heading: "General Questions",
    description:
      "Answers to the most common questions about HRSJM, our mission and how we work.",
    items: [
      {
        question: "What is HRSJM?",
        answer:
          "HRSJM — the Human Rights & Social Justice Mission — is a non-profit organisation dedicated to upholding human rights, dignity, equality and access to justice for every person. We work through community outreach, legal support, awareness campaigns and advocacy.",
      },
      {
        question: "How can I get involved?",
        answer:
          "You can join as a member, volunteer, donate, or file a complaint on behalf of someone whose rights have been violated. Every form of participation helps advance justice.",
      },
      {
        question: "Is HRSJM a registered organisation?",
        answer:
          "Yes. HRSJM is a registered not-for-profit organisation operating in compliance with applicable Indian laws and regulations.",
      },
      {
        question: "Where is HRSJM located?",
        answer:
          "Our office is at Sir Mathuradas Vasanji Rd, Chimatpada, Marol Naka, Andheri East, Mumbai, Maharashtra 400059, India. We work across communities and can be contacted through our website or by email.",
      },
    ],
  },
  {
    id: "rights",
    label: "Your Rights",
    eyebrow: "Know Your Rights",
    heading: "Your Rights — FAQs",
    description:
      "Common questions about human rights, legal protections and how to seek support.",
    items: [
      {
        question: "What are fundamental rights?",
        answer:
          "Fundamental rights are the basic freedoms and protections every person is entitled to — equality, dignity, freedom of expression and protection from discrimination. They are guaranteed by the Constitution and cannot be taken away arbitrarily.",
      },
      {
        question: "How can I file a complaint if my rights are violated?",
        answer:
          "You can approach the police, the State or National Human Rights Commission, or reach out to HRSJM directly. Our team helps you document what happened, understand the right legal route and connect with the support you need.",
      },
      {
        question: "Where can I get free legal aid?",
        answer:
          "Free legal aid is available through the District Legal Services Authority (DLSA) in every district, and through organisations like HRSJM. If you cannot afford a lawyer, you are entitled to free legal assistance under the Legal Services Authorities Act.",
      },
      {
        question: "Are children's rights different from adult rights?",
        answer:
          "Children enjoy all fundamental rights, plus special protections under laws such as the POCSO Act and the ban on child labour. These extra safeguards recognise that children need care, education and protection from exploitation.",
      },
      {
        question: "How does the Right to Information (RTI) work?",
        answer:
          "Any citizen can file a simple RTI application with a public authority, asking for information a government department holds. The department must respond within 30 days, making RTI a powerful tool for transparency and accountability.",
      },
    ],
  },
  {
    id: "membership",
    label: "Membership",
    eyebrow: "Becoming a Member",
    heading: "Membership FAQs",
    description:
      "Answers to common questions about joining HRSJM and participating in our work.",
    items: [
      {
        question: "Who can become an HRSJM member?",
        answer:
          "Anyone who supports human rights, equality and social justice can apply. Members come from all backgrounds — students, professionals, community workers and concerned citizens.",
      },
      {
        question: "What are the benefits of membership?",
        answer:
          "Members connect with a like-minded community, take part in awareness activities, events and initiatives, contribute their skills, and stay informed about HRSJM's work.",
      },
      {
        question: "How do I apply for membership?",
        answer:
          "Choose a membership option, complete the application form on the Membership page and submit it. Our team reviews every application and will contact you about the next steps.",
      },
      {
        question: "Can I participate in HRSJM activities?",
        answer:
          "Yes. Members are invited to participate in awareness campaigns, community activities, events and initiatives according to their interest and availability.",
      },
      {
        question: "Can I volunteer without becoming a member?",
        answer:
          "Yes, volunteering is open to everyone. Membership simply deepens your connection with HRSJM and gives you a more structured way to participate and contribute.",
      },
      {
        question: "How will I know if my membership application is accepted?",
        answer:
          "Our team personally reviews each application and will contact you using the email address or phone number you provided once it has been processed.",
      },
      {
        question: "Can I update my membership information?",
        answer:
          "Yes. If your details change, contact us and we will update your membership information so our records stay current.",
      },
    ],
  },
  {
    id: "complaint",
    label: "Get Help",
    eyebrow: "Filing a Complaint",
    heading: "Get Help — FAQs",
    description:
      "Common questions about filing a complaint and how HRSJM supports you through the process.",
    items: [
      {
        question: "What types of complaints can I file?",
        answer:
          "You can file complaints related to human rights violations, discrimination, harassment, denial of legal rights, or any situation requiring legal, social or community support.",
      },
      {
        question: "Is my information kept confidential?",
        answer:
          "Yes. Your information is strictly confidential and is shared only with the team members reviewing your case, solely to provide you with support.",
      },
      {
        question: "What happens after I submit the form?",
        answer:
          "Our team carefully reviews every submission and contacts you with the next steps and the support options available for your situation.",
      },
      {
        question: "How long does it take to get a response?",
        answer:
          "We aim to respond to every complaint as quickly as possible, typically within a few working days of receiving your submission.",
      },
      {
        question: "Can I file a complaint on behalf of someone else?",
        answer:
          "Yes. If someone you know has faced a violation and cannot file themselves, you may file on their behalf. Please describe the situation and your relationship in the form.",
      },
    ],
  },
  {
    id: "donation",
    label: "Donations",
    eyebrow: "Supporting Our Work",
    heading: "Donation FAQs",
    description:
      "Answers to common questions about how your donation is used and how it helps.",
    items: [
      {
        question: "How is my donation used?",
        answer:
          "Your donation is used to support legal aid, awareness programs, community initiatives, research and advocacy work. We ensure transparent and responsible use of all funds.",
      },
      {
        question: "Is my donation secure?",
        answer:
          "Yes. Donations are processed through secure and trusted payment channels, and your personal information is handled responsibly and is never shared.",
      },
      {
        question: "Can I donate monthly?",
        answer:
          "Yes. Choose the Monthly option in the donation form and your contribution will continue supporting our work every month. You can change or stop it at any time.",
      },
      {
        question: "Do you provide tax benefits?",
        answer:
          "Donations to HRSJM may be eligible for tax exemption under applicable Indian regulations. A receipt is issued for every contribution.",
      },
      {
        question: "Can I donate from outside India?",
        answer:
          "Yes. We welcome support from across the world and accept international donations through our secure online payment options.",
      },
    ],
  },
];
