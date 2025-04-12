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
                    <Card key={index} className="overflow-hidden group relative">
                      <CardContent className="p-0">
                        <div className="relative aspect-[16/6]">
                          <img
                            src={banner.image}
                            alt={`Banner ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {/* Banner info overlay */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4">
                            <span className="font-medium mb-2">Banner {index + 1}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
                                Preview
                              </Button>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          {/* Banner number badge */}
                          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
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
              {/* Banner preview */}
              <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
                <img
                  src={allBannerImages[currentPreview]?.image}
                  alt="Banner Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-transparent"></div>
                
                {/* Sample overlay content */}
                <div className="absolute bottom-6 left-6 max-w-[80%]">
                  <div className="space-y-2 bg-white/20 backdrop-blur-sm p-4 rounded shadow">
                    <h3 className="text-xl font-bold text-white drop-shadow">
                      Trending Collection
                    </h3>
                    <p className="text-sm text-white/90 drop-shadow line-clamp-2">
                      Discover the latest fashion trends for this season
                    </p>
                  </div>
                </div>
                
                {/* Navigation controls */}
                <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={prevPreview}
                    className="bg-white/60 hover:bg-white border-none rounded-full h-8 w-8"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={nextPreview}
                    className="bg-white/60 hover:bg-white border-none rounded-full h-8 w-8"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Preview info */}
              <div className="text-center w-full">
                <div className="flex justify-center space-x-1 mb-2">
                  {allBannerImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPreview(index)}
                      className={`transition-all ${
                        index === currentPreview 
                          ? "w-6 bg-primary" 
                          : "w-2 bg-gray-300"
                      } h-2 rounded-full`}
                      aria-label={`View banner ${index + 1}`}
                    ></button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Banner {currentPreview + 1} of {allBannerImages.length}
                </p>
              </div>
              
              {/* Tips */}
              <div className="border rounded p-4 w-full bg-muted/30">
                <h4 className="font-medium mb-2">Tips for Great Banners</h4>
                <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-4">
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
