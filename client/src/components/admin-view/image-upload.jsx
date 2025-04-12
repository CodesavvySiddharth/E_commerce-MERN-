import { FileIcon, UploadCloudIcon, XIcon, ImageIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);
  const { toast } = useToast();
  const [uploadError, setUploadError] = useState(null);

  console.log(isEditMode, "isEditMode");

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPEG, PNG, etc.)",
          variant: "destructive"
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image size should be less than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setImageFile(selectedFile);
      setUploadError(null);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    
    if (droppedFile) {
      // Validate file type
      if (!droppedFile.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPEG, PNG, etc.)",
          variant: "destructive"
        });
        return;
      }
      
      setImageFile(droppedFile);
      setUploadError(null);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl(null);
    setUploadError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    setUploadError(null);
    try {
      const data = new FormData();
      data.append("my_file", imageFile);
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );
      
      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url);
        toast({
          title: "Image uploaded successfully",
        });
      } else {
        setUploadError("Upload failed. Please try again.");
        toast({
          title: "Upload failed",
          description: "Could not upload image. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError(error.message || "Upload failed. Please try again.");
      toast({
        title: "Upload error",
        description: error.message || "Could not upload image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div
      className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
      <Label className="text-lg font-semibold mb-3 block text-primary">Product Image</Label>
      
      {/* Show current/uploaded image */}
      {uploadedImageUrl && (
        <div className="mb-4">
          <div className="relative rounded-lg overflow-hidden w-full aspect-square mb-3 border shadow-sm group">
            <img 
              src={uploadedImageUrl} 
              alt="Product Image" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button 
                variant="destructive" 
                size="icon"
                onClick={handleRemoveImage}
                className="rounded-full"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRemoveImage}
              className="text-destructive hover:bg-destructive/10 transition-colors duration-200"
            >
              <XIcon className="w-4 h-4 mr-1" />
              Remove Image
            </Button>
          </div>
        </div>
      )}
      
      {!uploadedImageUrl && (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`${
            isEditMode ? "opacity-60" : ""
          } border-2 border-dashed rounded-lg p-6 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 ${uploadError ? 'border-destructive/50 bg-destructive/5' : 'border-border'}`}
        >
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={handleImageFileChange}
            disabled={isEditMode}
          />
          {!imageFile ? (
            <Label
              htmlFor="image-upload"
              className={`${
                isEditMode ? "cursor-not-allowed" : ""
              } flex flex-col items-center justify-center h-36 cursor-pointer`}
            >
              <UploadCloudIcon className="w-12 h-12 text-muted-foreground mb-3 group-hover:text-primary transition-colors duration-200" />
              <span className="font-medium text-foreground">Drag & drop or click to upload image</span>
              <span className="text-xs text-muted-foreground mt-2">
                Accepted formats: JPEG, PNG, WebP (max 5MB)
              </span>
              {uploadError && (
                <span className="text-sm text-destructive mt-2 font-medium">{uploadError}</span>
              )}
            </Label>
          ) : imageLoadingState ? (
            <div className="space-y-3 p-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
              <div className="text-sm text-center text-muted-foreground animate-pulse">Uploading image...</div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-background rounded-md shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium line-clamp-1">{imageFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(imageFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleRemoveImage}
                className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
      
      {uploadError && (
        <div className="mt-3 text-sm text-destructive bg-destructive/10 p-2 rounded-md">
          <p>{uploadError}</p>
        </div>
      )}
    </div>
  );
}

export default ProductImageUpload;
