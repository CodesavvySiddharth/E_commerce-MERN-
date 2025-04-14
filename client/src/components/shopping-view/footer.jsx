import { Link, useNavigate, useLocation } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Heart, ShoppingBag } from "lucide-react";

function ShoppingFooter() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleCategoryClick = (category) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [category]
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing?category=${category}`);
  };
  
  const handleSocialClick = (e) => {
    // Prevent default for demonstration links
    e.preventDefault();
    // You could add a toast notification here indicating these are demo links
  };
  
  const handleExternalLink = (e, url) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    // Could show a toast notification that this is a demo feature
  };
  
  return (
    <footer className="border-t border-gray-200">
      {/* Newsletter section */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Join Our Newsletter</h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">Stay updated with new arrivals and exclusive offers</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                required
              />
              <button 
                type="submit"
                className="bg-primary text-white px-6 py-2.5 rounded-md font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {/* About section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary/10 p-1.5 rounded-md">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-bold text-lg text-gray-900">Shopnetic</h2>
              </div>
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                Discover the latest fashion trends with Shopnetic. We offer a wide range of products
                from clothing to accessories at affordable prices with worldwide shipping.
              </p>
              <div className="flex space-x-3">
                <a href="#" onClick={handleSocialClick} className="bg-gray-100 w-8 h-8 rounded-md flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all shadow-sm">
                  <Facebook size={16} />
                </a>
                <a href="#" onClick={handleSocialClick} className="bg-gray-100 w-8 h-8 rounded-md flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all shadow-sm">
                  <Instagram size={16} />
                </a>
                <a href="#" onClick={handleSocialClick} className="bg-gray-100 w-8 h-8 rounded-md flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all shadow-sm">
                  <Twitter size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-gray-900 font-bold text-base border-b border-gray-100 pb-2 mb-4">Quick Links</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/shop/home" className="text-gray-600 text-sm hover:text-primary transition-colors flex items-center group">
                    <span className="w-1 h-1 bg-gray-300 group-hover:bg-primary group-hover:w-2 transition-all rounded-full mr-2"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop/listing" className="text-gray-600 text-sm hover:text-primary transition-colors flex items-center group">
                    <span className="w-1 h-1 bg-gray-300 group-hover:bg-primary group-hover:w-2 transition-all rounded-full mr-2"></span>
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/shop/account" className="text-gray-600 text-sm hover:text-primary transition-colors flex items-center group">
                    <span className="w-1 h-1 bg-gray-300 group-hover:bg-primary group-hover:w-2 transition-all rounded-full mr-2"></span>
                    My Account
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('men')} 
                    className="text-gray-600 text-sm hover:text-primary transition-colors flex items-center group w-full text-left"
                  >
                    <span className="w-1 h-1 bg-gray-300 group-hover:bg-primary group-hover:w-2 transition-all rounded-full mr-2"></span>
                    Men's Collection
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('women')} 
                    className="text-gray-600 text-sm hover:text-primary transition-colors flex items-center group w-full text-left"
                  >
                    <span className="w-1 h-1 bg-gray-300 group-hover:bg-primary group-hover:w-2 transition-all rounded-full mr-2"></span>
                    Women's Collection
                  </button>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-gray-900 font-bold text-base border-b border-gray-100 pb-2 mb-4">Categories</h3>
              <ul className="space-y-2.5">
                <li>
                  <button 
                    onClick={() => handleCategoryClick('men')} 
                    className="text-gray-600 text-sm hover:text-primary transition-colors flex items-center group w-full text-left"
                  >
                    <span className="w-1 h-1 bg-gray-300 group-hover:bg-primary group-hover:w-2 transition-all rounded-full mr-2"></span>
                    Men
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('women')} 
                    className="text-gray-600 text-sm hover:text-primary transition-colors flex items-center group w-full text-left"
                  >
                    <span className="w-1 h-1 bg-gray-300 group-hover:bg-primary group-hover:w-2 transition-all rounded-full mr-2"></span>
                    Women
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('kids')} 
                    className="text-gray-600 text-sm hover:text-primary transition-colors flex items-center group w-full text-left"
                  >
                    <span className="w-1 h-1 bg-gray-300 group-hover:bg-primary group-hover:w-2 transition-all rounded-full mr-2"></span>
                    Kids
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('footwear')} 
                    className="text-gray-600 text-sm hover:text-primary transition-colors flex items-center group w-full text-left"
                  >
                    <span className="w-1 h-1 bg-gray-300 group-hover:bg-primary group-hover:w-2 transition-all rounded-full mr-2"></span>
                    Footwear
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('accessories')} 
                    className="text-gray-600 text-sm hover:text-primary transition-colors flex items-center group w-full text-left"
                  >
                    <span className="w-1 h-1 bg-gray-300 group-hover:bg-primary group-hover:w-2 transition-all rounded-full mr-2"></span>
                    Accessories
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-gray-900 font-bold text-base border-b border-gray-100 pb-2 mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-md mt-0.5 flex-shrink-0">
                    <MapPin size={14} className="text-primary" />
                  </div>
                  <span className="text-gray-600 text-sm">123 Fashion Street, Style City, 12345</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-md flex-shrink-0">
                    <Phone size={14} className="text-primary" />
                  </div>
                  <a href="tel:+11234567890" className="text-gray-600 text-sm hover:text-primary transition-colors">+1 (123) 456-7890</a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary/10 p-1.5 rounded-md flex-shrink-0">
                    <Mail size={14} className="text-primary" />
                  </div>
                  <a href="mailto:support@shopnetic.com" className="text-gray-600 text-sm hover:text-primary transition-colors">support@shopnetic.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-gray-50 py-6">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
            &copy; {currentYear} Shopnetic. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link to="/shop/home" className="text-gray-500 text-xs md:text-sm hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/shop/home" className="text-gray-500 text-xs md:text-sm hover:text-primary transition-colors">Terms of Service</Link>
            <div className="text-gray-500 text-xs md:text-sm flex items-center">
              Made with <Heart size={12} className="mx-1 text-red-500" /> by Shopnetic
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ShoppingFooter; 