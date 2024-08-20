export enum AppType {
  ALL = "All",
  FACEBOOK = "Facebook",
  TWITTER = "Twitter",
  GOOGLE = "Google",
  INSTAGRAM = "Instagram",
  AMAZON = "Amazon",
  EBAY = "Amazon",
  CRAWL = "Amazon",
  RETAIL = "Amazon",
  AIRDROP = "Amazon",
  DISCORD = "Amazon",
  ZALO = "Amazon",
}

export interface App {
  id: number;
  type: AppType;
  name: string;
  createdBy: string;
  description: string;
  numberView: number;
  numberDownload: number;
  star: number;
  paid: boolean;
  createdAt: number;
}
