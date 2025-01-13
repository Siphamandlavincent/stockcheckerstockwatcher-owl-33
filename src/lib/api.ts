import axios from 'axios';

const PROXY_URL = 'https://stock-price-checker-proxy.freecodecamp.rocks';
const MONGODB_URI = 'mongodb+srv://vkhumalo:ERzeVUkA2s0LJxan@cluster0.aybht.mongodb.net/?retryWrites=true&w=majority';

export interface StockResponse {
  symbol: string;
  price: number;
  likes: number;
}

export const fetchStock = async (symbol: string, like = false): Promise<StockResponse> => {
  try {
    // Fetch stock price from FreeCodeCamp proxy
    const priceResponse = await axios.get(`${PROXY_URL}/v1/stock/${symbol}/quote`);
    const price = priceResponse.data.latestPrice || 0;

    // Fetch likes count from our API
    const likesResponse = await axios.get(`/api/stock-likes?symbol=${symbol}`);
    const likes = likesResponse.data.likes || 0;

    // Add like if requested
    if (like) {
      await axios.post('/api/stock-likes', { symbol });
    }

    return {
      symbol: symbol.toUpperCase(),
      price,
      likes,
    };
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return {
      symbol: symbol.toUpperCase(),
      price: 0,
      likes: 0,
    };
  }
};

export const fetchStocks = async (symbols: string[], like = false): Promise<StockResponse[]> => {
  return Promise.all(symbols.map(symbol => fetchStock(symbol, like)));
};