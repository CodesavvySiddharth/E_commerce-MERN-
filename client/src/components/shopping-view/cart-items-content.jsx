import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-muted/40 hover:border-primary/20 hover:bg-primary/5 transition-colors duration-200">
      <div className="relative h-20 w-20 rounded-md overflow-hidden shrink-0 bg-muted/20">
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className="w-full h-full object-cover transition-all hover:scale-105"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm line-clamp-1">{cartItem?.title}</h3>
        
        {cartItem?.salePrice > 0 ? (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs line-through text-muted-foreground">${cartItem?.price}</span>
            <span className="text-sm font-semibold text-primary">${cartItem?.salePrice}</span>
          </div>
        ) : (
          <div className="mt-1">
            <span className="text-sm font-semibold">${cartItem?.price}</span>
          </div>
        )}
        
        <div className="flex items-center mt-2">
          <div className="flex items-center border rounded-full overflow-hidden h-7">
            <Button
              variant="ghost"
              className="h-7 w-7 px-0 rounded-none"
              size="icon"
              disabled={cartItem?.quantity === 1}
              onClick={() => handleUpdateQuantity(cartItem, "minus")}
            >
              <Minus className="w-3 h-3" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="font-medium text-xs px-2 min-w-6 text-center">{cartItem?.quantity}</span>
            <Button
              variant="ghost"
              className="h-7 w-7 px-0 rounded-none"
              size="icon"
              onClick={() => handleUpdateQuantity(cartItem, "plus")}
            >
              <Plus className="w-3 h-3" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-1">
        <p className="font-bold text-sm text-primary">
          ${(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="icon" 
          className="h-7 w-7 rounded-full hover:bg-destructive/10 hover:text-destructive"
          onClick={() => handleCartItemDelete(cartItem)}
        >
          <Trash className="w-4 h-4" />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
