
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
  type: 'apartment' | 'house' | 'land' | 'villa';
  transaction: 'buy' | 'rent';
  coords: { x: number; y: number }; // x, y percentages for map simulation
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  media?: any;
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  type: 'visit' | 'contract' | 'meeting' | 'payment';
  date: string; // ISO format YYYY-MM-DD
  location?: string;
  completed?: boolean;
  reminder?: string;
  notes?: string;
  propertyId?: string;
  isConflict?: boolean;
}
