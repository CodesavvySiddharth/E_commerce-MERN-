import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Clock, CreditCard, MapPin, Package, Truck, AlertCircle, CheckCircle, CalendarClock } from "lucide-react";

function ShoppingOrderDetailsView({ orderDetails }) {
  // Handle missing data case
  if (!orderDetails) {
    return (
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-center flex-col py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-3" />
            <DialogTitle className="text-xl mb-2">Order Details Not Available</DialogTitle>
            <DialogDescription className="text-center">
              The order information could not be loaded. Please try again later.
            </DialogDescription>
          </div>
        </DialogHeader>
      </DialogContent>
    );
  }

  // Helper function to get payment status styling
  const getPaymentStatusStyles = (status) => {
    return status === "completed" 
      ? "bg-green-500 hover:bg-green-600 transition-all" 
      : "bg-yellow-500 hover:bg-yellow-600 transition-all";
  };

  // Helper function to get order status styling
  const getOrderStatusStyles = (status) => {
    switch(status) {
      case "confirmed":
        return "bg-green-500 hover:bg-green-600 transition-all";
      case "rejected":
        return "bg-red-600 hover:bg-red-700 transition-all";
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600 transition-all";
      case "delivered":
        return "bg-yellow-500 hover:bg-yellow-600 transition-all";
      case "inProcess":
        return "bg-yellow-500 hover:bg-yellow-600 transition-all";
      case "inShipping":
        return "bg-yellow-500 hover:bg-yellow-600 transition-all";
      default:
        return "bg-slate-500 hover:bg-slate-600 transition-all";
    }
  };

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Order Details
        </DialogTitle>
        <DialogDescription>
          Complete information about your order.
        </DialogDescription>
      </DialogHeader>

      {/* Order summary section */}
      <div className="bg-muted/20 rounded-lg p-4 mb-4 border border-muted">
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <Label className="text-xs text-muted-foreground">Order ID</Label>
            <p className="font-medium text-sm truncate" title={orderDetails?._id}>
              <span className="text-xs text-muted-foreground pr-1">#</span>
              {orderDetails?._id}
            </p>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Order Date</Label>
            <p className="font-medium text-sm flex items-center gap-1.5">
              <CalendarClock className="h-3.5 w-3.5 text-muted-foreground" />
              {formatDate(orderDetails?.orderDate)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs text-muted-foreground">Payment Method</Label>
            <p className="font-medium text-sm flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
              {orderDetails?.paymentMethod}
            </p>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Total Amount</Label>
            <p className="font-medium text-sm">
              ${parseFloat(orderDetails?.totalAmount).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Status section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Payment Status</Label>
          <Badge className={`w-fit py-1 px-3 ${getPaymentStatusStyles(orderDetails?.paymentStatus)}`}>
            {orderDetails?.paymentStatus}
          </Badge>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Order Status</Label>
          <Badge className={`w-fit py-1 px-3 ${getOrderStatusStyles(orderDetails?.orderStatus)}`}>
            {orderDetails?.orderStatus}
          </Badge>
        </div>
      </div>

      <Separator className="my-3" />

      {/* Products section */}
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-1.5">
          <Truck className="h-4 w-4 text-muted-foreground" />
          Order Details ({orderDetails?.items?.length} items)
        </h3>

        <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
          {orderDetails?.items?.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-3 bg-muted/10 rounded-md border border-muted"
            >
              <div className="h-16 w-16 bg-muted/30 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={item?.product?.imageUrl} 
                  alt={item?.product?.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/100x100/png?text=Product";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item?.product?.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">
                    Qty: {item?.quantity}
                  </p>
                  <p className="text-sm font-medium">
                    ${parseFloat(item?.product?.price * item?.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-3" />

      {/* Shipping section */}
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          Shipping Information
        </h3>
        
        <div className="bg-muted/10 p-3 rounded-md border border-muted">
          <address className="not-italic">
            <p className="font-medium text-sm">{orderDetails?.shippingAddress?.fullName}</p>
            <p className="text-sm text-muted-foreground">{orderDetails?.shippingAddress?.street}</p>
            <p className="text-sm text-muted-foreground">
              {orderDetails?.shippingAddress?.city}, {orderDetails?.shippingAddress?.state}, {orderDetails?.shippingAddress?.zipCode}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              <strong>Phone:</strong> {orderDetails?.shippingAddress?.phone}
            </p>
          </address>
        </div>
      </div>

      {/* Order estimate */}
      <div className="mt-4 p-3 bg-muted/20 rounded-md border border-muted">
        <h3 className="text-sm font-medium mb-2 flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Estimated Delivery
        </h3>
        <p className="text-sm text-muted-foreground">
          {orderDetails?.orderStatus === "confirmed" ? (
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Your order will be delivered within 3-5 business days
            </span>
          ) : orderDetails?.orderStatus === "rejected" ? (
            <span className="flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 text-red-500" />
              This order has been cancelled or rejected
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-amber-500" />
              Pending confirmation - Delivery estimate will be available once confirmed
            </span>
          )}
        </p>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={() => window.print()}>
          Print Receipt
        </Button>
        <Button type="button" onClick={() => window.location.href = "/shop/home"}>
          Continue Shopping
        </Button>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
