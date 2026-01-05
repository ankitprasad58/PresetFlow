import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  productCount: number;
  subcategories: string[];
}

interface CategoryCardProps {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isActive,
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full text-left rounded-2xl p-5 transition-all duration-300 ${
        isActive
          ? `bg-gradient-to-br ${category.color} border-2 border-white/20`
          : "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-xl ${
            isActive ? "bg-white/20" : "bg-gray-900"
          }`}
        >
          {category.icon}
        </div>
        <ChevronRight
          className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`}
        />
      </div>

      <h3
        className={`text-lg font-bold mb-1 ${
          isActive ? "text-white" : "text-white"
        }`}
      >
        {category.name}
      </h3>

      <p
        className={`text-sm mb-3 ${
          isActive ? "text-white/80" : "text-gray-400"
        }`}
      >
        {category.description}
      </p>

      <div className="flex justify-between items-center">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            isActive ? "bg-white/20 text-white" : "bg-gray-900 text-gray-300"
          }`}
        >
          {category.productCount} products
        </span>

        {category.subcategories.length > 0 && (
          <span className="text-xs text-gray-400">
            {category.subcategories.length} subcategories
          </span>
        )}
      </div>
    </motion.button>
  );
};

export default CategoryCard;
