import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StockSearchProps {
  onSearch: (symbol: string, like?: boolean) => void;
  onCompare: (symbols: string[], like?: boolean) => void;
}

export const StockSearch = ({ onSearch, onCompare }: StockSearchProps) => {
  const [symbol1, setSymbol1] = useState("");
  const [symbol2, setSymbol2] = useState("");
  const [comparing, setComparing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comparing) {
      if (!symbol1.trim() || !symbol2.trim()) {
        toast({
          title: "Error",
          description: "Please enter both stock symbols",
          variant: "destructive",
        });
        return;
      }
      onCompare([symbol1.toUpperCase(), symbol2.toUpperCase()]);
    } else {
      if (!symbol1.trim()) {
        toast({
          title: "Error",
          description: "Please enter a stock symbol",
          variant: "destructive",
        });
        return;
      }
      onSearch(symbol1.toUpperCase());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter stock symbol (e.g. AAPL)"
          value={symbol1}
          onChange={(e) => setSymbol1(e.target.value)}
          className="max-w-[300px]"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => setComparing(!comparing)}
        >
          {comparing ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          Compare
        </Button>
      </div>

      {comparing && (
        <Input
          placeholder="Enter second stock symbol"
          value={symbol2}
          onChange={(e) => setSymbol2(e.target.value)}
          className="max-w-[300px]"
        />
      )}

      <Button type="submit">
        <Search className="h-4 w-4 mr-2" />
        {comparing ? "Compare Stocks" : "Search"}
      </Button>
    </form>
  );
};