import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { MapPin, Home, Phone, FileText, MapPinIcon } from "lucide-react";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected 
          ? "ring-2 ring-primary bg-primary/5" 
          : "hover:border-primary/30"
      }`}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1 shadow-sm">
          <MapPinIcon className="h-4 w-4" />
        </div>
      )}
      
      <CardContent className="p-5">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Home className="h-4 w-4 text-primary mt-1 shrink-0" />
            <div className="flex-1">
              <span className="text-xs text-muted-foreground">Address</span>
              <p className="font-medium line-clamp-2">{addressInfo?.address}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground">City</span>
                <p className="font-medium">{addressInfo?.city}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground">Pincode</span>
                <p className="font-medium">{addressInfo?.pincode}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Phone className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
            <div>
              <span className="text-xs text-muted-foreground">Phone</span>
              <p className="font-medium">{addressInfo?.phone}</p>
            </div>
          </div>
          
          {addressInfo?.notes && (
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground">Notes</span>
                <p className="text-sm line-clamp-2">{addressInfo?.notes}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="px-5 py-3 border-t bg-muted/10 flex justify-between gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
          className="flex-1"
        >
          Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
          className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
