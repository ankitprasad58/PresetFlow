import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Download,
  ShoppingCart,
  Eye,
  Clock,
  TrendingUp,
} from "lucide-react";
import type { Product } from "../types/product";

interface ProductGridProps {
  product: Product;
  onBuy: (id: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ product, onBuy }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "video":
        return "bg-purple-900/30 border-purple-700 text-purple-300";
      case "audio":
        return "bg-blue-900/30 border-blue-700 text-blue-300";
      case "development":
        return "bg-green-900/30 border-green-700 text-green-300";
      case "design":
        return "bg-orange-900/30 border-orange-700 text-orange-300";
      case "productivity":
        return "bg-indigo-900/30 border-indigo-700 text-indigo-300";
      default:
        return "bg-gray-800 border-gray-700 text-gray-300";
    }
  };

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case "preset":
        return "🎨";
      case "template":
        return "📁";
      case "plugin":
        return "🔌";
      case "asset":
        return "💎";
      default:
        return "📦";
    }
  };

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-purple-500 transition-colors"
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Thumbnail */}
        <div className="md:w-64 flex-shrink-0">
          <div className="relative h-48 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl">
                {getFileTypeIcon(product.fileType)}
              </div>
            </div>
            <div className="absolute top-3 left-3">
              <span
                className={`px-2 py-1 text-xs rounded-lg ${getCategoryColor(
                  product.category
                )}`}
              >
                {product.subcategory}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold mb-1 group-hover:text-purple-400 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-400 mb-2">{product.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">
                ₹{product.price}
              </div>
              <div className="text-sm text-gray-400">One-time purchase</div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-600"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-400">
                ({product.rating})
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              {product.sales.toLocaleString()} sales
            </div>

            <div className="flex items-center text-sm text-gray-400">
              <Clock className="w-4 h-4 mr-1" />
              Updated {new Date(product.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-900 text-gray-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Compatible With */}
          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-1">Compatible with:</div>
            <div className="flex flex-wrap gap-2">
              {product.compatibleWith.map((app) => (
                <span
                  key={app}
                  className="px-3 py-1 bg-gray-900 text-gray-300 text-sm rounded-lg"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onBuy(product.id)}
                className="flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button className="p-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                <Eye className="w-5 h-5" />
              </button>

              <button className="p-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>

            <button className="text-sm text-gray-400 hover:text-white transition-colors">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductGrid;
