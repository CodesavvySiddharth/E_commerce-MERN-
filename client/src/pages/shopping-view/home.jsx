import { Button } from "@/components/ui/button";
import { bannerImages as localBannerImages } from "../../assets/banner-images";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
  Heart,
  TrendingUp,
  Star,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import BannerSlider from "@/components/shopping-view/banner-slider";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon, color: "from-blue-500/20 to-blue-500/5" },
  { id: "women", label: "Women", icon: CloudLightning, color: "from-purple-500/20 to-purple-500/5" },
  { id: "kids", label: "Kids", icon: BabyIcon, color: "from-green-500/20 to-green-500/5" },
  { id: "accessories", label: "Accessories", icon: WatchIcon, color: "from-amber-500/20 to-amber-500/5" },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon, color: "from-red-500/20 to-red-500/5" },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt, highlight: true },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket, highlight: true },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images, highlight: true },
  { id: "h&m", label: "H&M", icon: Heater },
];
function ShoppingHome() {
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Use local banner images instead of feature images from server
  const bannerImages = localBannerImages;

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Using the new BannerSlider component */}
      <BannerSlider banners={bannerImages} interval={5000} autoPlay={true} />

      {/* Welcome message */}
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 md:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0C0 110.457 89.5431 200 200 200V0H0Z" fill="currentColor" />
            </svg>
          </div>
          <div className="max-w-3xl relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to <span className="text-primary">Shopnetic</span>
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Discover the latest trends and timeless classics. Our carefully curated collection brings you quality fashion for every style and occasion.
            </p>
            <Button 
              onClick={() => navigate('/shop/listing')} 
              className="group rounded-full px-6"
            >
              Shop All Collections 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Shop by Category Section - Redesigned & Enhanced */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col items-center mb-12">
            <div className="bg-primary/10 px-4 py-1 rounded-full mb-3">
              <span className="text-sm text-primary font-semibold uppercase tracking-wider">Explore Our Collection</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Shop by <span className="text-primary border-b-4 border-primary pb-1">Category</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            {categoriesWithIcon.map((categoryItem, index) => (
              <div
                key={index}
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                className="cursor-pointer group transition-all duration-500 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl p-8 relative overflow-hidden flex flex-col items-center transition-all duration-300 h-full`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${categoryItem.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-white transition-colors duration-300 relative z-10">
                    <categoryItem.icon className="w-10 h-10 text-primary" />
                  </div>
                  <span className="font-bold text-lg text-center group-hover:text-primary transition-colors duration-300 relative z-10">
                    {categoryItem.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products with enhanced design */}
      <section className="py-16 md:py-20 bg-white relative z-10">
        <div className="container mx-auto px-4 md:px-8 pb-8">
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center bg-primary/10 px-4 py-1 rounded-full mb-3">
              <Star className="text-primary w-4 h-4 mr-2" />
              <span className="text-sm text-primary font-semibold uppercase tracking-wider">Handpicked For You</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Featured <span className="text-primary border-b-4 border-primary pb-1">Products</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {productList && productList.length > 0
              ? productList.map((productItem, index) => (
                  <div 
                    key={productItem._id} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ShoppingProductTile
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  </div>
                ))
              : null}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button
              variant="outline" 
              onClick={() => navigate('/shop/listing')}
              className="group rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Shop by Brand Section - Redesigned & Enhanced */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 rotate-45 opacity-5">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0H100V100H50V50H0V0H50Z" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center bg-primary/10 px-4 py-1 rounded-full mb-3">
              <TrendingUp className="text-primary w-4 h-4 mr-2" />
              <span className="text-sm text-primary font-semibold uppercase tracking-wider">Trending Brands</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Shop by <span className="text-primary border-b-4 border-primary pb-1">Brand</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {brandsWithIcon.map((brandItem, index) => (
              <div
                key={index}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className={`cursor-pointer group animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`
                  bg-white border ${brandItem.highlight ? 'border-primary/20' : 'border-gray-100'} 
                  rounded-lg p-6 flex flex-col items-center justify-center 
                  hover:border-primary/30 transition-all duration-300 
                  hover:shadow-lg h-full ${brandItem.highlight ? 'shadow-md' : ''}
                `}>
                  <div className={`
                    w-16 h-16 rounded-full 
                    ${brandItem.highlight ? 'bg-primary/10' : 'bg-gray-50'} 
                    flex items-center justify-center mb-3 
                    group-hover:bg-primary/10 transition-colors duration-300
                  `}>
                    <brandItem.icon className={`w-7 h-7 ${brandItem.highlight ? 'text-primary' : 'text-gray-600'} group-hover:text-primary transition-colors duration-300`} />
                  </div>
                  <span className={`font-semibold ${brandItem.highlight ? 'text-primary' : 'text-gray-700'} group-hover:text-primary transition-colors duration-300`}>
                    {brandItem.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Trust section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Why Shop With Us</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Discover the Fashion Hub difference</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Quality Products</h3>
              <p className="text-sm text-gray-600">Curated selection of premium fashion items</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Quick shipping to your doorstep</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Secure Payment</h3>
              <p className="text-sm text-gray-600">Safe and secure payment options</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Customer service always available</p>
            </div>
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />

      {/* Add some custom animation CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default ShoppingHome;
