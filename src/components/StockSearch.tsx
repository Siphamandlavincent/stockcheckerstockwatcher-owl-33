import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface StockSearchProps {
  onSearch: (symbol: string) => void;
}

export const StockSearch = ({ onSearch }: StockSearchProps) => {
  const [symbol, setSymbol] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol.trim()) {
      toast({
        title: "Error",
        description: "Please enter a stock symbol",
        variant: "destructive",
      });
      return;
    }
    onSearch(symbol.toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Enter stock symbol (e.g. AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="max-w-[300px]"
      />
      <Button type="submit">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  );
};