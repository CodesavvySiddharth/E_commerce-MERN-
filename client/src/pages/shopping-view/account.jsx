import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import { Package, MapPin, User } from "lucide-react";
import { useSelector } from "react-redux";

function ShoppingAccount() {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative h-[250px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
          alt="Account header"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight drop-shadow-md mb-2">
              My Account
            </h1>
            {user?.name && (
              <p className="text-white/90 text-lg font-medium">
                Welcome back, {user.name}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-5xl px-4 py-10 -mt-10 relative z-10">
        <div className="flex flex-col rounded-lg border bg-white p-6 md:p-8 shadow-lg">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger 
                value="orders" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 flex items-center justify-center gap-2"
              >
                <Package className="h-4 w-4" />
                <span>My Orders</span>
              </TabsTrigger>
              <TabsTrigger 
                value="address" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 flex items-center justify-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                <span>My Addresses</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="border-t pt-6">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address" className="border-t pt-6">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
