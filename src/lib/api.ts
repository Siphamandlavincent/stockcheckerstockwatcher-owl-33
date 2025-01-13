import { supabase, anonymizeIP } from './supabase';

const PROXY_URL = 'https://stock-price-checker-proxy.freecodecamp.rocks';

export interface StockResponse {
  symbol: string;
  price: number;
  likes: number;
}

export const fetchStock = async (symbol: string, like = false): Promise<StockResponse> => {
  // Fetch stock price from proxy
  const response = await fetch(`${PROXY_URL}/v1/stock/${symbol}/quote`);
  const data = await response.json();

  // Get likes count
  const { count } = await supabase
    .from('stock_likes')
    .select('*', { count: 'exact' })
    .eq('stock_symbol', symbol.toUpperCase());

  // Add like if requested
  if (like) {
    const response = await fetch('https://api.ipify.org?format=json');
    const { ip } = await response.json();
    const ipHash = await anonymizeIP(ip);

    await supabase
      .from('stock_likes')
      .insert({ stock_symbol: symbol.toUpperCase(), ip_hash: ipHash })
      .single();
  }

  return {
    symbol: symbol.toUpperCase(),
    price: data.latestPrice || 0,
    likes: count || 0,
  };
};

export const fetchStocks = async (symbols: string[], like = false): Promise<StockResponse[]> => {
  return Promise.all(symbols.map(symbol => fetchStock(symbol, like)));
};