export interface Stock {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export interface WatchlistItem extends Stock {
  id: string;
}