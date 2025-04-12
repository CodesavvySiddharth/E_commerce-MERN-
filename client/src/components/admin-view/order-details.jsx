import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";
import { Package, Truck, MapPin, CreditCard, Calendar, PenLine } from "lucide-react";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(orderDetails, "orderDetailsorderDetails");

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Order Details
        </DialogTitle>
        <DialogDescription>
          Complete information about the customer order.
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-6 mt-4">
        <div className="grid gap-3 p-4 bg-muted/30 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-primary mb-2">Order Information</h3>
          <div className="flex items-center justify-between border-b border-border/30 pb-2">
            <p className="font-medium text-foreground">Order ID</p>
            <Label className="font-mono text-sm bg-primary/10 px-2 py-1 rounded">{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between border-b border-border/30 pb-2">
            <p className="font-medium text-foreground">Order Date</p>
            <Label className="text-muted-foreground flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              {orderDetails?.orderDate.split("T")[0]}
            </Label>
          </div>
          <div className="flex items-center justify-between border-b border-border/30 pb-2">
            <p className="font-medium text-foreground">Order Price</p>
            <Label className="font-semibold text-primary">${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex items-center justify-between border-b border-border/30 pb-2">
            <p className="font-medium text-foreground">Payment method</p>
            <Label className="capitalize flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
              {orderDetails?.paymentMethod}
            </Label>
          </div>
          <div className="flex items-center justify-between border-b border-border/30 pb-2">
            <p className="font-medium text-foreground">Payment Status</p>
            <Label className="capitalize">{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-foreground">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500 hover:bg-green-600"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-muted-foreground" />
              Order Items ({orderDetails?.cartItems?.length || 0} items)
            </h3>
            <ul className="grid gap-3 mt-2">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-background rounded-md border shadow-sm hover:border-primary/30 transition-all duration-200">
                      <span className="font-medium">{item.title}</span>
                      <div className="flex gap-4">
                        <span className="text-sm text-muted-foreground">Qty: <span className="font-semibold text-foreground">{item.quantity}</span></span>
                        <span className="text-sm text-muted-foreground">Price: <span className="font-semibold text-primary">${item.price}</span></span>
                      </div>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4 p-4 bg-muted/30 rounded-lg shadow-sm">
          <div className="grid gap-2">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Shipping Information
            </h3>
            <div className="grid gap-2 text-muted-foreground mt-2">
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-foreground min-w-[80px]">Name:</span>
                <span>{user.userName}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-foreground min-w-[80px]">Address:</span>
                <span>{orderDetails?.addressInfo?.address}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-foreground min-w-[80px]">City:</span>
                <span>{orderDetails?.addressInfo?.city}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-foreground min-w-[80px]">Pincode:</span>
                <span>{orderDetails?.addressInfo?.pincode}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-foreground min-w-[80px]">Phone:</span>
                <span>{orderDetails?.addressInfo?.phone}</span>
              </div>
              {orderDetails?.addressInfo?.notes && (
                <div className="flex gap-2 items-start">
                  <span className="font-semibold text-foreground min-w-[80px]">Notes:</span>
                  <span>{orderDetails?.addressInfo?.notes}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-1.5">
            <PenLine className="h-4 w-4 text-muted-foreground" />
            Update Order Status
          </h3>
          <CommonForm
            formControls={[
              {
                label: "Select New Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
