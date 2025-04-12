import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  console.log(rating, "rating");

  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      key={star}
      className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
        star <= rating
          ? "text-yellow-500 hover:bg-yellow-100/30 border-yellow-500/50"
          : "text-slate-400 hover:bg-primary/10 hover:text-primary border-slate-300/50"
      }`}
      variant="outline"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`w-6 h-6 transition-colors duration-200 ${
          star <= rating ? "fill-yellow-500 drop-shadow-sm" : "fill-slate-200 hover:fill-slate-300"
        }`}
      />
    </Button>
  ));
}

export default StarRatingComponent;
