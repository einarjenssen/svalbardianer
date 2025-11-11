export interface OnlineStore {
  id: number;
  name: string;
  url: string;
  verified: boolean;
  last_verified: Date;
  min_shipping: number;
  is_shipping: Boolean | null;
}