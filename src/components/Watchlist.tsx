import { WatchlistItem } from "@/types/stock";
import { StockCard } from "./StockCard";

interface WatchlistProps {
  stocks: WatchlistItem[];
  onRemoveFromWatchlist: (id: string) => void;
}

export const Watchlist = ({ stocks, onRemoveFromWatchlist }: WatchlistProps) => {
  if (stocks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Your watchlist is empty. Search for stocks to add them here.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stocks.map((stock) => (
        <StockCard
          key={stock.id}
          {...stock}
          isInWatchlist={true}
          onRemoveFromWatchlist={() => onRemoveFromWatchlist(stock.id)}
        />
      ))}
    </div>
  );
};