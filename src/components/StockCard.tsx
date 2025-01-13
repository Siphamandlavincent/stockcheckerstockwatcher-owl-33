import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StockCardProps {
  symbol: string;
  price: number;
  likes: number;
  onLike?: () => void;
}

export const StockCard = ({
  symbol,
  price,
  likes,
  onLike,
}: StockCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold">{symbol}</h3>
          <p className="text-3xl font-semibold mt-2">${price.toFixed(2)}</p>
        </div>
        {onLike && (
          <Button variant="outline" size="icon" onClick={onLike}>
            <ThumbsUp className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Likes</p>
        <p className="font-medium">{likes}</p>
      </div>
    </Card>
  );
};