import { useState } from "react";
import { StockSearch } from "@/components/StockSearch";
import { StockCard } from "@/components/StockCard";
import { useToast } from "@/components/ui/use-toast";
import { fetchStock, fetchStocks, StockResponse } from "@/lib/api";

const Index = () => {
  const [stocks, setStocks] = useState<StockResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (symbol: string, like = false) => {
    try {
      setIsLoading(true);
      const data = await fetchStock(symbol, like);
      setStocks([data]);
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

  const handleCompareStocks = async (symbols: string[], like = false) => {
    try {
      setIsLoading(true);
      const data = await fetchStocks(symbols, like);
      setStocks(data);
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

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Stock Price Checker</h1>
        <p className="text-muted-foreground">
          Search for stocks and compare their prices and likes
        </p>
      </div>

      <StockSearch onSearch={handleSearch} onCompare={handleCompareStocks} />

      {isLoading && (
        <div className="text-center py-8">Loading...</div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {stocks.map((stock) => (
          <StockCard
            key={stock.symbol}
            {...stock}
            onLike={() => handleSearch(stock.symbol, true)}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;