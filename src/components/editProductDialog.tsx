import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/components/productList";
import { Variant } from "@/components/productList";
import { Checkbox } from "@/components/ui/checkbox"; // Import the Checkbox component
import Image from "next/image"; // Use Next.js Image component for optimized loading

interface EditProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedProducts: Product[]) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/fetch-data?search=Hat&page=1`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProducts((prev) =>
      prev.includes(product)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const handleVariantSelect = (variant: Variant, product: Product) => {
    const productIndex = selectedProducts.findIndex((p) => p.id === product.id);
    const updatedProduct = { ...product };

    if (productIndex > -1) {
      const selectedVariants = updatedProduct.variants?.filter((v) =>
        v.id === variant.id ? !variant.selected : true
      );

      updatedProduct.variants = selectedVariants || [];
    } else {
      updatedProduct.variants = [...(updatedProduct.variants || []), variant];
    }

    setSelectedProducts((prev) => {
      const newProducts = [...prev];
      newProducts[productIndex] = updatedProduct;
      return newProducts;
    });
  };

  const handleSave = () => {
    onSave(selectedProducts);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {products.map((product) => (
                <div key={product.id} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={product.image.src}
                      alt={product.title}
                      width={48}
                      height={48}
                    />
                    <span>{product.title}</span>
                    <Checkbox
                      checked={selectedProducts.includes(product)}
                      onCheckedChange={() => handleProductSelect(product)}
                    />
                  </div>
                  {product.variants && product.variants.length > 0 && (
                    <div className="ml-8 space-y-2">
                      {product.variants.map((variant) => (
                        <div
                          key={variant.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={variant.selected}
                            onCheckedChange={() =>
                              handleVariantSelect(variant, product)
                            }
                          />
                          <span>{variant.title}</span>
                          <span className="text-sm text-gray-500">
                            Price: ${variant.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </DialogDescription>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-green-500 text-white"
            onClick={handleSave}
            disabled={loading || !!error}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
