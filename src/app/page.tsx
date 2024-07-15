"use client";
import ProductList, { Product } from "@/components/productList";
import React, { useEffect } from "react";

const demoData = [
  {
    id: 77,
    title: "Fog Linen Chambray Towel - Beige Stripe",
    variants: [
      {
        id: 1,
        product_id: 77,
        title: "XS / Silver",
        price: "49",
      },
      {
        id: 2,
        product_id: 77,
        title: "S / Silver",
        price: "49",
      },
      {
        id: 3,
        product_id: 77,
        title: "M / Silver",
        price: "49",
      },
    ],
    image: {
      id: 266,
      product_id: 77,
      src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1",
    },
  },
  {
    id: 80,
    title: "Orbit Terrarium - Large",
    // variants: [
    //   {
    //     id: 64,
    //     product_id: 80,
    //     title: "Default Title",
    //     price: "109",
    //   },
    // ],
    image: {
      id: 272,
      product_id: 80,
      src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1",
    },
  },
];

const HomePage = () => {
  const [products, setProducts] = React.useState<Product[]>(demoData);
  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now(), // Using timestamp as a unique id
      title: "New Product",
      image: {
        id: Date.now(),
        product_id: Date.now(),
        src: "https://via.placeholder.com/150", // Placeholder image
      },
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };
  useEffect(() => {
    console.dir(products);
  }, [products]);

  return (
    <div>
      <ProductList products={products} setProducts={setProducts} />
      <button
        onClick={addProduct}
        className="mb-4 py-3 px-6 rounded-md bg-green-500 text-white hover:border-green-500 hover:text-green-500 hover:border-2 hover:bg-transparent float-right  duration-300 ease-in-out"
      >
        Add Product
      </button>
    </div>
  );
};

export default HomePage;
