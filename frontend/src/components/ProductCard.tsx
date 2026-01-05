import React from "react";
import { motion } from "framer-motion";
import { Play, Download, Star, ShoppingCart, Eye } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  tags: string[];
  rating: number;
  sales: number;
  previewUrl?: string;
  fileType: string;
  compatibleWith: string[];
  onBuy: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  category,
  subcategory,
  tags,
  rating,
  sales,
  previewUrl,
  fileType,
  compatibleWith,
  onBuy,
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "video":
        return "from-purple-900 to-pink-900";
      case "audio":
        return "from-blue-900 to-cyan-900";
      case "development":
        return "from-green-900 to-emerald-900";
      case "design":
        return "from-orange-900 to-red-900";
      case "productivity":
        return "from-indigo-900 to-purple-900";
      default:
        return "from-gray-900 to-gray-800";
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
      whileHover={{ y: -8 }}
      className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div
        className={`relative h-48 bg-gradient-to-br ${getCategoryColor(
          category
        )}`}
      >
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
            <div className="text-5xl">{getFileTypeIcon(fileType)}</div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
          {subcategory}
        </div>

        {/* Sales Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs">{sales.toLocaleString()} sold</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold mb-1 group-hover:text-purple-400 transition-colors line-clamp-1">
              {name}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2 mb-2">
              {description}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-gray-900 text-gray-300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-0.5 bg-gray-900 text-gray-300 text-xs rounded-full">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Rating & Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-600"
                }`}
              />
            ))}
            <span className="text-sm text-gray-400 ml-2">({rating})</span>
          </div>
          <div className="text-xl font-bold text-green-400">₹{price}</div>
        </div>

        {/* Compatible With */}
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-1">Works with:</div>
          <div className="flex flex-wrap gap-1">
            {compatibleWith.slice(0, 2).map((app) => (
              <span
                key={app}
                className="px-2 py-0.5 bg-gray-900 text-gray-400 text-xs rounded"
              >
                {app}
              </span>
            ))}
            {compatibleWith.length > 2 && (
              <span className="px-2 py-0.5 bg-gray-900 text-gray-400 text-xs rounded">
                +{compatibleWith.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={() => onBuy(id)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
          <button className="px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors group">
            <Eye className="w-5 h-5 group-hover:text-blue-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Add this import at top
import { TrendingUp } from "lucide-react";

export default ProductCard;
