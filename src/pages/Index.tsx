import { useState } from "react";
import { StockSearch } from "@/components/StockSearch";
import { StockCard } from "@/components/StockCard";
import { Watchlist } from "@/components/Watchlist";
import { Stock, WatchlistItem } from "@/types/stock";
import { useToast } from "@/components/ui/use-toast";

// Simulated API call - replace with real API integration
const fetchStockData = async (symbol: string): Promise<Stock> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Simulate random stock data
  const price = Math.random() * 1000;
  const change = (Math.random() - 0.5) * 20;
  
  return {
    symbol,
    price,
    change,
    changePercent: (change / price) * 100,
    volume: Math.floor(Math.random() * 10000000),
  };
};

const Index = () => {
  const [currentStock, setCurrentStock] = useState<Stock | null>(null);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (symbol: string) => {
    try {
      setIsLoading(true);
      const data = await fetchStockData(symbol);
      setCurrentStock(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch stock data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToWatchlist = () => {
    if (!currentStock) return;
    
    const newItem: WatchlistItem = {
      ...currentStock,
      id: `${currentStock.symbol}-${Date.now()}`,
    };
    
    setWatchlist((prev) => [...prev, newItem]);
    toast({
      title: "Success",
      description: `${currentStock.symbol} added to watchlist`,
    });
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Stock Price Checker</h1>
        <p className="text-muted-foreground">
          Search for stocks and add them to your watchlist
        </p>
      </div>

      <StockSearch onSearch={handleSearch} />

      {isLoading && (
        <div className="text-center py-8">Loading...</div>
      )}

      {currentStock && !isLoading && (
        <div className="max-w-md mx-auto">
          <StockCard
            {...currentStock}
            onAddToWatchlist={addToWatchlist}
            isInWatchlist={watchlist.some(
              (item) => item.symbol === currentStock.symbol
            )}
          />
        </div>
      )}

      {watchlist.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Your Watchlist</h2>
          <Watchlist
            stocks={watchlist}
            onRemoveFromWatchlist={removeFromWatchlist}
          />
        </div>
      )}
    </div>
  );
};

export default Index;