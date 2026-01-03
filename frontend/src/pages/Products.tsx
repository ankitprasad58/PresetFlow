import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  previewUrl?: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        setProducts(data);
      } catch (error) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuy = (productId: string) => {
    const cart = JSON.parse(localStorage.getItem("preset-cart") || "[]");
    const product = products.find((p) => p.id === productId);
    if (product && !cart.find((p: Product) => p.id === productId)) {
      cart.push(product);
      localStorage.setItem("preset-cart", JSON.stringify(cart));
      toast.success("Added to cart");
      navigate("/checkout");
    }
  };

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12">Video Presets</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} onBuy={handleBuy} />
        ))}
      </div>
    </div>
  );
};

export default Products;
