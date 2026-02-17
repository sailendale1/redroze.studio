
export type Language = 'en' | 'mr';

export interface ContentSchema {
  hero: {
    headline: string;
    subtext: string;
    bookCall: string;
    imCreator: string;
    imBusiness: string;
    stats: {
      creators: string;
      brands: string;
      revenue: string;
      reels: string;
    };
  };
  whatWeDo: {
    title: string;
    reels: { title: string; desc: string };
    strategy: { title: string; desc: string };
    sponsors: { title: string; desc: string };
    branding: { title: string; desc: string };
    web: { title: string; desc: string };
    courses: { title: string; desc: string };
  };
  creators: {
    title: string;
    subtitle: string;
    points: string[];
    button: string;
  };
  brands: {
    title: string;
    subtitle: string;
    fixes: string[];
    provides: string[];
    button: string;
  };
  whyUs: {
    title: string;
    points: string[];
  };
  howItWorks: {
    title: string;
    steps: { title: string; desc: string }[];
  };
  testimonials: {
    title: string;
    list: { name: string; text: string; role: string }[];
  };
  videoProof: {
    title: string;
    sub: string;
  };
  ctaStrip: {
    text: string;
    button: string;
  };
  exitPopup: {
    title: string;
    sub: string;
    button: string;
  };
}
