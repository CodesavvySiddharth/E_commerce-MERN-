import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { ShoppingBag, CreditCard } from "lucide-react";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader className="border-b pb-4 mb-5">
        <SheetTitle className="flex items-center gap-2 text-xl">
          <ShoppingBag className="h-5 w-5 text-primary" />
          Your Cart
        </SheetTitle>
      </SheetHeader>
      
      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="flex-1 overflow-auto max-h-[calc(80vh-180px)] pr-1 scrollbar-thin">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))}
            </div>
          </div>
          
          <div className="border-t mt-6 pt-4 sticky bottom-0 bg-background">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>${totalCartAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span className="text-primary">${totalCartAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <Button
              onClick={() => {
                navigate("/shop/checkout");
                setOpenCartSheet(false);
              }}
              className="w-full mt-4 py-6 text-base"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Proceed to Checkout
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
          <h3 className="font-medium text-lg">Your cart is empty</h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button
            onClick={() => {
              navigate("/shop/home");
              setOpenCartSheet(false);
            }}
            variant="outline"
            className="mt-2"
          >
            Continue Shopping
          </Button>
        </div>
      )}
    </SheetContent>
  );
}

export default UserCartWrapper;
