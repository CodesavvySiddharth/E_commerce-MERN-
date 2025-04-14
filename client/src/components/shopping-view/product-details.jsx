import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid md:grid-cols-2 gap-6 p-5 max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] rounded-md">
        <div className="relative overflow-hidden rounded-md bg-gray-50">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={500}
            height={500}
            className="aspect-square w-full object-cover"
          />
        </div>
        
        <div className="flex flex-col h-full">
          <div className="mb-3">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{productDetails?.title}</h1>
            <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-3">
              {productDetails?.description}
            </p>
          </div>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-lg text-gray-300">
                    {star <= Math.round(averageReview) ? 
                      <span className="text-yellow-400">★</span> : 
                      <span>★</span>
                    }
                  </span>
                ))}
              </div>
              <span className="text-gray-500 text-xs ml-2">
                ({averageReview.toFixed(1)})
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            {productDetails?.salePrice > 0 && (
              <p className="text-lg sm:text-xl font-medium text-gray-400 line-through">
                ${productDetails?.price}
              </p>
            )}
            <p className="text-xl sm:text-2xl font-bold text-primary">
              ${productDetails?.salePrice > 0 ? productDetails?.salePrice : productDetails?.price}
            </p>
          </div>
          
          <div className="mb-4">
            <Button
              className="w-full py-2 text-base font-medium"
              size="default"
              disabled={productDetails?.totalStock === 0}
              onClick={() =>
                handleAddToCart(
                  productDetails?._id,
                  productDetails?.totalStock
                )
              }
            >
              {productDetails?.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
          
          <Separator className="my-2" />
          
          <div className="mt-2">
            <h2 className="text-lg font-bold mb-2">Reviews</h2>
            
            {reviews && reviews.length > 0 ? (
              <div className="grid gap-4 max-h-[180px] overflow-y-auto pr-2 mb-4">
                {reviews.map((reviewItem, index) => (
                  <div key={index} className="flex gap-3 pb-3 border-b border-gray-100">
                    <Avatar className="w-8 h-8 border">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {reviewItem?.userName?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-1">
                        <h3 className="font-medium text-sm">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-gray-600 text-xs">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 bg-gray-50 rounded-md mb-4">
                <p className="text-gray-500 text-sm">No Reviews Yet</p>
              </div>
            )}
            
            <div className="mt-2">
              <h3 className="font-medium text-sm mb-1">Write a review</h3>
              <div className="flex gap-1 mb-2">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write your review here..."
                className="mb-2 text-sm"
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === "" || rating === 0}
                className="w-full"
                size="sm"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
