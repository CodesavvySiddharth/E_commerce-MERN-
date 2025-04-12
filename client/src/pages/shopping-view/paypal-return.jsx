import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      dispatch(capturePayment({ paymentId, payerId, orderId }))
        .then((data) => {
          if (data?.payload?.success) {
            sessionStorage.removeItem("currentOrderId");
            window.location.href = "/shop/payment-success";
          } else {
            setError("There was a problem processing your payment. Please try again.");
            setIsProcessing(false);
          }
        })
        .catch((err) => {
          setError("An unexpected error occurred. Please contact customer support.");
          setIsProcessing(false);
        });
    } else {
      setError("Missing payment information. Please try again.");
      setIsProcessing(false);
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full shadow-lg border-none">
        <CardHeader className="text-center">
          {isProcessing ? (
            <>
              <div className="mx-auto mb-6">
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Processing Your Payment
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-3">
                Please wait while we complete your transaction. This may take a few moments.
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle className="text-2xl font-bold text-red-600">
                Payment Processing Error
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-3">
                {error}
              </CardDescription>
            </>
          )}
        </CardHeader>
      </Card>
    </div>
  );
}

export default PaypalReturnPage;
