import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { bannerImages as localBannerImages } from "../../assets/banner-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRightIcon, ChevronLeftIcon, ImageIcon, UploadIcon, Trash2 } from "lucide-react";

function AdminFeatures() {
  const [imageUrl, setImageUrl] = useState("");
  const [currentPreview, setCurrentPreview] = useState(0);
  const [activeTab, setActiveTab] = useState("upload");
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { toast } = useToast();

  // Use local banner images as a backup
  const allBannerImages = featureImageList && featureImageList.length > 0 
    ? featureImageList 
    : localBannerImages;

  function handleAddBanner() {
    if (!imageUrl.trim()) {
      toast({
        title: "Please enter an image URL",
        variant: "destructive",
      });
      return;
    }

    dispatch(addFeatureImage(imageUrl)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Banner image added successfully",
        });
        setImageUrl("");
        dispatch(getFeatureImages());
      } else {
        toast({
          title: "Failed to add banner image",
          variant: "destructive",
        });
      }
    });
  }

  function handleUseLocalBanners() {
    toast({
      title: "Using local banner images",
      description: "The application is now using the local banner images from the assets folder."
    });
  }

  function nextPreview() {
    setCurrentPreview((prev) => (prev + 1) % allBannerImages.length);
  }

  function prevPreview() {
    setCurrentPreview((prev) => 
      prev === 0 ? allBannerImages.length - 1 : prev - 1
    );
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Banner Management</h1>
        <p className="text-muted-foreground">
          Manage the banner images displayed on the homepage carousel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Banner Management */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="upload" className="w-full" onValueChange={setActiveTab}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Add New Banner</CardTitle>
                  <TabsList>
                    <TabsTrigger value="upload" className="flex items-center gap-1">
                      <UploadIcon className="h-4 w-4" />
                      <span>Upload</span>
                    </TabsTrigger>
                    <TabsTrigger value="local" className="flex items-center gap-1">
                      <ImageIcon className="h-4 w-4" />
                      <span>Local</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                <CardDescription>
                  {activeTab === "upload" 
                    ? "Add a new banner by URL or file upload"
                    : "Use locally stored banner images"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabsContent value="upload" className="space-y-4">
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      placeholder="Enter image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleAddBanner} className="whitespace-nowrap">
                      Add Banner
                    </Button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mt-2">
                    <p>Recommended banner dimensions: 1920 × 600 pixels</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="local">
                  <div className="flex flex-col space-y-4">
                    <p className="text-sm text-muted-foreground">
                      The application will use the default banner images located in your assets folder.
                    </p>
                    <Button onClick={handleUseLocalBanners} variant="outline" className="self-start">
                      Use Local Banners
                    </Button>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Current Banners</CardTitle>
                <CardDescription>
                  {allBannerImages.length} banner{allBannerImages.length !== 1 ? 's' : ''} available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allBannerImages.map((banner, index) => (
                    <Card key={index} className="overflow-hidden group relative border border-muted/50 transition-all duration-300 hover:shadow-md hover:border-primary/30">
                      <CardContent className="p-0">
                        <div className="relative aspect-[16/6]">
                          <img
                            src={banner.image}
                            alt={`Banner ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Banner info overlay with improved styling */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                            <span className="font-medium mb-1 text-lg">{banner.title || `Banner ${index + 1}`}</span>
                            {banner.description && (
                              <p className="text-xs text-center mb-3 line-clamp-2 max-w-[90%] text-white/90">{banner.description}</p>
                            )}
                            <div className="flex gap-3">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-white border-white/70 hover:bg-white/20 hover:border-white transition-colors duration-200"
                                onClick={() => setCurrentPreview(index)}
                              >
                                Preview
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                className="hover:bg-red-600/90 transition-colors duration-200"
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Remove
                              </Button>
                            </div>
                          </div>
                          {/* Banner number badge with improved styling */}
                          <div className="absolute top-2 right-2 bg-black/70 text-white px-2.5 py-1 rounded-md text-xs backdrop-blur-sm shadow-md">
                            {index + 1}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Tabs>
        </div>

        {/* Right Column - Banner Preview */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Banner Preview</CardTitle>
              <CardDescription>
                How your banner will appear on the homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              {/* Banner preview with enhanced styling */}
              <div className="relative w-full h-[350px] overflow-hidden rounded-lg shadow-md border border-muted/60">
                <img
                  src={allBannerImages[currentPreview]?.image}
                  alt="Banner Preview"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
                
                {/* Sample overlay content with improved styling */}
                <div className="absolute bottom-6 left-6 max-w-[80%]">
                  <div className="space-y-2 bg-black/40 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/10">
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">
                      {allBannerImages[currentPreview]?.title || "Trending Collection"}
                    </h3>
                    <p className="text-sm text-white/90 drop-shadow-lg line-clamp-2">
                      {allBannerImages[currentPreview]?.description || "Discover the latest fashion trends for this season"}
                    </p>
                    {allBannerImages[currentPreview]?.buttonText && (
                      <Button 
                        size="sm" 
                        className="mt-2 bg-primary hover:bg-primary/90 text-white shadow-md transition-all duration-300 hover:translate-y-[-1px]"
                      >
                        {allBannerImages[currentPreview].buttonText}
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Navigation controls with improved styling */}
                <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={prevPreview}
                    className="bg-white/60 hover:bg-white/90 border-none rounded-full h-9 w-9 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={nextPreview}
                    className="bg-white/60 hover:bg-white/90 border-none rounded-full h-9 w-9 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* Preview info with improved styling */}
              <div className="text-center w-full">
                <div className="flex justify-center space-x-2 mb-2">
                  {allBannerImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPreview(index)}
                      className={`transition-all duration-300 ${
                        index === currentPreview 
                          ? "w-8 bg-primary shadow-md" 
                          : "w-2.5 bg-gray-300 hover:bg-gray-400"
                      } h-2.5 rounded-full hover:scale-110`}
                      aria-label={`View banner ${index + 1}`}
                    ></button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Banner {currentPreview + 1} of {allBannerImages.length}
                </p>
              </div>
              
              {/* Tips with improved styling */}
              <div className="border rounded-lg p-5 w-full bg-muted/20 shadow-sm">
                <h4 className="font-medium mb-3 text-primary flex items-center">
                  <ImageIcon className="h-4 w-4 mr-2" /> Tips for Great Banners
                </h4>
                <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-5">
                  <li>Use high-quality images (1920 × 600px recommended)</li>
                  <li>Choose images that match your brand identity</li>
                  <li>Ensure good contrast between text and background</li>
                  <li>Keep messaging clear and concise</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminFeatures;
