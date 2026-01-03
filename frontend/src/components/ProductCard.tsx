// frontend/src/components/ProductCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { Play, Download, Star } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  previewUrl?: string;
  onBuy: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  category,
  previewUrl,
  onBuy,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700"
    >
      <div className="relative h-48 bg-gradient-to-r from-purple-900 to-blue-900">
        {previewUrl ? (
          <video
            src={previewUrl}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Play className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded-md text-sm">
          {category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-300 mb-4">{description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
            ))}
            <span className="text-sm text-gray-400 ml-2">(48)</span>
          </div>
          <div className="text-2xl font-bold text-green-400">₹{price}</div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => onBuy(id)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Buy Now
          </button>
          <button className="px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
