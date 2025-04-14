import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });

      return;
    }

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            setShowAddForm(false);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            setShowAddForm(false);
            toast({
              title: "Address added successfully",
            });
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
    setShowAddForm(true);
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <div className="space-y-4">
      {addressList && addressList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {addressList.map((singleAddressItem) => (
            <AddressCard
              key={singleAddressItem._id}
              selectedId={selectedId}
              handleDeleteAddress={handleDeleteAddress}
              addressInfo={singleAddressItem}
              handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-4 bg-muted/10 rounded-lg border border-dashed border-muted">
          <p className="text-muted-foreground mb-2">No addresses found</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowAddForm(true)}
            className="mt-2"
          >
            Add your first address
          </Button>
        </div>
      )}

      {addressList && addressList.length > 0 && addressList.length < 3 && !showAddForm && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowAddForm(true)}
          className="w-full flex items-center justify-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add New Address</span>
        </Button>
      )}

      {showAddForm && (
        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {currentEditedId !== null ? "Edit Address" : "Add New Address"}
            </CardTitle>
            <Separator className="mt-2" />
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <CommonForm
              formControls={addressFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Save Changes" : "Add Address"}
              onSubmit={handleManageAddress}
              isBtnDisabled={!isFormValid()}
            />
            {!currentEditedId && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setShowAddForm(false);
                  setFormData(initialAddressFormData);
                }}
                className="w-full mt-2"
              >
                Cancel
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Address;
