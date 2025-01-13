export interface Stock {
  symbol: string;
  price: number;
  likes: number;
}

export interface WatchlistItem extends Stock {
  id: string;
}