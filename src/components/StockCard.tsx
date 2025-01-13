import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { Stock } from "@/types/stock";
import { cn } from "@/lib/utils";

interface StockCardProps extends Stock {
  onAddToWatchlist?: () => void;
  onRemoveFromWatchlist?: () => void;
  isInWatchlist?: boolean;
}

export const StockCard = ({
  symbol,
  price,
  change,
  changePercent,
  volume,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  isInWatchlist,
}: StockCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold">{symbol}</h3>
          <p className="text-3xl font-semibold mt-2">${price.toFixed(2)}</p>
        </div>
        {onAddToWatchlist && !isInWatchlist && (
          <Button variant="outline" size="icon" onClick={onAddToWatchlist}>
            <Plus className="h-4 w-4" />
          </Button>
        )}
        {onRemoveFromWatchlist && isInWatchlist && (
          <Button variant="outline" size="icon" onClick={onRemoveFromWatchlist}>
            <Minus className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Change</p>
          <p
            className={cn(
              "font-medium",
              isPositive ? "text-stock-up" : "text-stock-down"
            )}
          >
            {isPositive ? "+" : ""}
            {change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Volume</p>
          <p className="font-medium">
            {new Intl.NumberFormat().format(volume)}
          </p>
        </div>
      </div>
    </Card>
  );
};