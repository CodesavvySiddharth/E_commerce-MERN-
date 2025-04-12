import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
import { Package, Info, Calendar, AlertTriangle } from "lucide-react";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

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
      day: 'numeric' 
    }).format(date);
  };

  return (
    <Card className="shadow-sm border-muted">
      <CardHeader className="bg-muted/30">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Package className="h-5 w-5 text-primary" />
            Your Orders
          </CardTitle>
          <Badge className="px-2 py-1">{orderList?.length || 0} Orders</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {orderList && orderList.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/20">
                <TableRow>
                  <TableHead className="w-[260px]">Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderList.map((orderItem, index) => (
                  <TableRow 
                    key={orderItem?._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-muted/5"}
                  >
                    <TableCell className="font-medium truncate max-w-[240px]">
                      <span className="text-xs text-muted-foreground pr-1">#</span>{orderItem?._id}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        {formatDate(orderItem?.orderDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 transition-all ${getOrderStatusStyles(orderItem?.orderStatus)}`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${parseFloat(orderItem?.totalAmount).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-primary hover:text-primary"
                          onClick={() => handleFetchOrderDetails(orderItem?._id)}
                        >
                          <Info className="h-4 w-4 mr-1" /> Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="bg-muted/20 p-4 rounded-full mb-4">
              <AlertTriangle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No orders found</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              You haven't placed any orders yet. Browse our products and make your first purchase!
            </p>
            <Button 
              className="mt-4"
              onClick={() => window.location.href = "/shop/home"}
            >
              Browse Products
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
