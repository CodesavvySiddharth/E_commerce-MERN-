import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/30">
      <div>
        <div className="relative group">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover transition-all duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        </div>
        <CardContent className="p-5">
          <h2 className="text-xl font-bold mb-2 mt-2 line-clamp-1 text-foreground">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-muted-foreground" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold text-green-600">${product?.salePrice}</span>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{product?.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center gap-2 p-5 pt-0 border-t border-border/40 mt-3">
          <Button
            variant="outline"
            className="flex-1 hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-200"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button 
            variant="destructive"
            className="flex-1 hover:bg-destructive/90 transition-all duration-200"
            onClick={() => handleDelete(product?._id)}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
