import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { ShoppingCart, Eye } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div 
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer"
      >
        <div className="relative overflow-hidden">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg transition-transform duration-700 group-hover:scale-105"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 shadow-md">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 shadow-md">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 shadow-md">
              Sale
            </Badge>
          ) : null}
          
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white text-black hover:bg-white/90"
              onClick={(e) => {
                e.stopPropagation();
                handleGetProductDetails(product?._id);
              }}
            >
              <Eye className="h-4 w-4 mr-1" /> Quick View
            </Button>
          </div>
        </div>
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">{product?.title}</h2>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm px-2 py-1 rounded-full bg-primary/10 text-primary">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-sm text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            {product?.salePrice > 0 ? (
              <div className="flex items-center gap-2">
                <span className="line-through text-sm text-muted-foreground">
                  ${product?.price}
                </span>
                <span className="text-lg font-bold text-primary">
                  ${product?.salePrice}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-primary">
                ${product?.price}
              </span>
            )}
            
            {product?.averageReview > 0 && (
              <div className="flex items-center">
                <span className="text-sm text-yellow-500">★</span>
                <span className="text-sm ml-1">{product?.averageReview}</span>
              </div>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-4 pt-0">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed" disabled>
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full group-hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="h-4 w-4 mr-2" /> Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
