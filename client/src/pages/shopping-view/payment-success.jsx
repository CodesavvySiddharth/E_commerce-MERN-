import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Package, ShoppingBag } from "lucide-react";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full shadow-lg border-none">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">Payment Successful!</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Your order has been placed and is being processed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 py-6 border-t border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Package className="w-5 h-5" />
              <span>Order Status</span>
            </div>
            <span className="font-medium text-green-600">Processing</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShoppingBag className="w-5 h-5" />
              <span>Estimated Delivery</span>
            </div>
            <span className="font-medium">3-5 business days</span>
          </div>
        </CardContent>
        <CardFooter className="flex gap-3 justify-center pt-6">
          <Button 
            onClick={() => navigate("/shop/account")} 
            className="w-full md:w-auto"
          >
            View Order Details
          </Button>
          <Button 
            onClick={() => navigate("/shop/home")} 
            variant="outline"
            className="w-full md:w-auto"
          >
            Continue Shopping
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
