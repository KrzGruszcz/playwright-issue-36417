export interface BlogPostMetadata {
  id: string;
  hash: string;
  title: string;
  subtitle: string;
  headerImage: ImageType;
  thumbnailImage: ImageType;
  topics: string[];
  publishDate: string;
  createDate: string;
  readingTime: string;
  author?: string;
}

export interface ImageType {
  src: string;
  alt: string;
}

export interface FigureType extends ImageType {
  title: string;
  subtitle: string;
  mobileOverview: ImageType;
  mobileDetails: ImageType;
}

export type Industry =
  | "nonprofit"
  | "healthcare"
  | "finance"
  | "commerce"
  | "manufacturing";

export type AccentColor = "pink" | "cyan" | "yellow" | "green";

export type Sector = {
  title: string;
  description: string;
};

export type Portfolio = {
  title: string;
  visibleCaseStudies: string[];
  visibleItemsMaxCount?: number;
};

export const allServices = [
  "web-development",
  "mobile-development",
  "devops-cloud",
  "product-design",
] as const;

export type Service = (typeof allServices)[number];

export type ServiceMetadata = {
  icon: string;
  variant: "cyan" | "pink" | "green" | "yellow";
  label: string;
  value: Service;
  image: {
    src: string;
    style: {
      height: number;
      width: number;
    };
  };
  tags: string[];
  portfolio: Portfolio;
  cta: {
    href: string;
    text: string;
  };
};

export const featuredTeamMembers = [
  "alex-storm",
  "jamie-lynch",
  "taylor-ryder",
  "nina-voss",
  "leo-maddox",
  "chris-renner",
  "sasha-kell",
] as const;

export type TeamMember = (typeof featuredTeamMembers)[number];
