/* Shared success-story data. The same list powers the Human Stories carousel
   on the home page and the Success Stories page (/success-stories), so the
   stories stay consistent site-wide. */
export interface SuccessStory {
  title: string;
  quote: string;
  location: string;
  image: string;
  alt: string;
}

export const successStories: SuccessStory[] = [
  {
    title: "From Silence to Strength",
    quote: "HRSJM gave me a voice and a new future.",
    location: "Mumbai, Maharashtra",
    image: "/images/story-1.png",
    alt: "A woman in an orange and brown headscarf shares her story of finding her voice.",
  },
  {
    title: "Justice for Our Community",
    quote: "With legal support, our community found hope.",
    location: "Satyenagar, Delhi",
    image: "/images/story-2.png",
    alt: "A man in a blue shirt standing before members of his community.",
  },
  {
    title: "Education Changes Lives",
    quote: "I can now dream of a brighter tomorrow.",
    location: "Nashik, Maharashtra",
    image: "/images/story-3.png",
    alt: "A young student in a community education setting.",
  },
  {
    title: "Community Voices",
    quote: "Together, our voices can create meaningful change.",
    location: "Mumbai, Maharashtra",
    image: "/images/story-4.png",
    alt: "A young woman carrying her books on her way to study.",
  },
  {
    title: "Dignity & Justice",
    quote: "Everyone deserves dignity, support and justice.",
    location: "Maharashtra, India",
    image: "/images/story-5.png",
    alt: "An elderly man from a rural village.",
  },
  {
    title: "A Brighter Tomorrow",
    quote: "Education gives every child a reason to dream.",
    location: "Maharashtra, India",
    image: "/images/story-6.png",
    alt: "A smiling child in a classroom setting.",
  },
];