
export interface Property {
  id: string;
  name: string;
  location: string;
  price: string;
  unitPrice: string;
  beds: number;
  baths: number;
  area: string;
  image: string;
  match?: number;
  isHot?: boolean;
  isVerified?: boolean;
  potential?: number;
  description?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  media?: any;
}
