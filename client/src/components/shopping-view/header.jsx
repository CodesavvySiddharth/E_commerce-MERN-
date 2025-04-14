import { 
  Home, 
  LogOut, 
  Menu, 
  ShoppingCart, 
  UserCog, 
  Search, 
  ShoppingBag 
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Input } from "../ui/input";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const pathname = location.pathname;

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col lg:flex-row gap-1.5 lg:gap-3">
      {shoppingViewHeaderMenuItems.map((menuItem) => {
        const isActive = pathname === menuItem.path || 
                        (pathname.includes('listing') && location.search.includes(menuItem.id));
        
        return (
          <button
            onClick={() => handleNavigate(menuItem)}
            className={`
              px-3 py-1.5 mx-2 text-sm font-medium transition-all duration-200
              ${isActive 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-gray-700 hover:text-primary hover:border-b-2 hover:border-primary/50'}
            `}
            key={menuItem.id}
          >
            {menuItem.label}
          </button>
        );
      })}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex items-center gap-8">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="ghost"
          size="icon"
          className="relative transition-all hover:text-primary h-9 w-9"
        >
          <ShoppingCart className="w-5 h-5" />
          {(cartItems?.items?.length || 0) > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white rounded-full text-xs flex items-center justify-center font-semibold shadow-sm">
              {cartItems?.items?.length || 0}
            </span>
          )}
          <span className="sr-only">Shopping Cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-transparent p-0">
            <Avatar className="h-8 w-8 transition-transform border border-gray-200">
              <AvatarFallback className="bg-primary text-white font-semibold text-sm">
                {user?.userName ? user.userName[0].toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={8} className="w-56 p-2">
          <DropdownMenuLabel className="font-semibold">
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9 bg-primary text-white">
                <AvatarFallback className="font-bold">
                  {user?.userName ? user.userName[0].toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium line-clamp-1">{user?.userName || 'User'}</span>
                <span className="text-xs text-muted-foreground line-clamp-1">{user?.email || 'user@example.com'}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-2" />
          <DropdownMenuItem 
            onClick={() => navigate("/shop/account")}
            className="cursor-pointer rounded-md mb-1 hover:bg-primary/10 flex items-center py-2"
          >
            <UserCog className="mr-2 h-4 w-4" />
            <span>My Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => navigate("/shop/listing")}
            className="cursor-pointer rounded-md mb-1 hover:bg-primary/10 flex items-center py-2"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Browse Products</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => navigate("/shop/search")}
            className="cursor-pointer rounded-md mb-1 hover:bg-primary/10 flex items-center py-2"
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Search Products</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-2" />
          <DropdownMenuItem 
            onClick={handleLogout}
            className="cursor-pointer rounded-md text-red-500 hover:bg-red-50 hover:text-red-500 flex items-center py-2"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full backdrop-blur transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 shadow-sm' 
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center px-4 lg:px-8">
        <div className="flex items-center mr-6 lg:mr-12">
          <Link to="/shop/home" className="flex items-center gap-2 transition-all hover:opacity-80">
            <ShoppingBag className="h-7 w-7 text-primary" />
            <span className="font-bold text-xl hidden sm:inline-block text-gray-900">Shopnetic</span>
          </Link>
        </div>

        <div className="hidden lg:flex flex-1 justify-center">
          <MenuItems />
        </div>

        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          <div className="hidden lg:block">
            <HeaderRightContent />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 hover:bg-transparent text-gray-800">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-6">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  <span className="font-bold text-xl text-gray-900">Shopnetic</span>
                </div>
                
                <div className="flex flex-col mb-6">
                  <h2 className="text-sm font-medium text-muted-foreground mb-3">Navigation</h2>
                  <MenuItems />
                </div>
                
                <div className="mt-auto">
                  <HeaderRightContent />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
