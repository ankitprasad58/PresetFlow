import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  Search,
  X,
  Video,
  Music,
  Code,
  Palette,
  FileCode,
  TrendingUp,
  Clock,
  Star,
  Grid,
  List,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import CategoryCard from "../components/CategoryCard";
import toast from "react-hot-toast";
import type { Product, Category } from "../types/product";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<
    "newest" | "popular" | "price-low" | "price-high"
  >("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  // Define categories
  const categories: Category[] = [
    {
      id: "video",
      name: "Video Editing",
      icon: <Video className="w-8 h-8" />,
      description: "Presets, LUTs, templates for video editors",
      color: "from-purple-600 to-pink-600",
      productCount: 24,
      subcategories: [
        "Premiere Pro",
        "DaVinci Resolve",
        "Final Cut Pro",
        "After Effects",
        "Motion Graphics",
      ],
    },
    {
      id: "audio",
      name: "Audio Production",
      icon: <Music className="w-8 h-8" />,
      description: "Sound packs, plugins, samples for musicians",
      color: "from-blue-600 to-cyan-600",
      productCount: 18,
      subcategories: [
        "FL Studio",
        "Ableton Live",
        "Logic Pro",
        "Vocal Presets",
        "Sound Effects",
      ],
    },
    {
      id: "development",
      name: "Developer Tools",
      icon: <Code className="w-8 h-8" />,
      description: "Code templates, plugins, assets for developers",
      color: "from-green-600 to-emerald-600",
      productCount: 32,
      subcategories: [
        "React",
        "Vue",
        "Next.js",
        "Mobile Apps",
        "Backend",
        "UI Libraries",
      ],
    },
    {
      id: "design",
      name: "Design Resources",
      icon: <Palette className="w-8 h-8" />,
      description: "Templates, mockups, assets for designers",
      color: "from-orange-600 to-red-600",
      productCount: 28,
      subcategories: [
        "Figma",
        "Adobe",
        "Web Templates",
        "3D Assets",
        "Illustrations",
      ],
    },
    {
      id: "productivity",
      name: "Productivity",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Tools to boost your workflow efficiency",
      color: "from-indigo-600 to-purple-600",
      productCount: 15,
      subcategories: [
        "Notion Templates",
        "Excel Sheets",
        "Automation",
        "Project Management",
      ],
    },
    {
      id: "all",
      name: "All Products",
      icon: <Grid className="w-8 h-8" />,
      description: "Browse our entire collection",
      color: "from-gray-600 to-gray-800",
      productCount: 117,
      subcategories: [],
    },
  ];

  // Sample tags for filtering
  const availableTags = [
    "Best Seller",
    "New",
    "Trending",
    "Premium",
    "Free",
    "Bundle",
    "Beginner Friendly",
    "Advanced",
    "Tutorial Included",
    "Regular Updates",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // For now, use mock data. Replace with actual API call
        const mockProducts: Product[] = [
          {
            id: "1",
            name: "Cinematic LUTs Pack",
            description:
              "Professional color grading presets for cinematic footage",
            price: 99,
            category: "video",
            subcategory: "DaVinci Resolve",
            tags: ["Best Seller", "Premium", "Trending"],
            rating: 4.9,
            sales: 342,
            fileType: "preset",
            fileUrl: "",
            compatibleWith: [
              "Premiere Pro",
              "DaVinci Resolve",
              "Final Cut Pro",
            ],
            createdAt: "2024-01-15",
          },
          {
            id: "2",
            name: "Synthwave Sound Pack",
            description:
              "Retro synthwave sounds and presets for music production",
            price: 99,
            category: "audio",
            subcategory: "Ableton Live",
            tags: ["New", "Trending"],
            rating: 4.7,
            sales: 189,
            fileType: "preset",
            fileUrl: "",
            compatibleWith: ["Ableton Live", "FL Studio"],
            createdAt: "2024-01-20",
          },
          {
            id: "3",
            name: "React Dashboard Template",
            description:
              "Complete admin dashboard built with React and Tailwind",
            price: 199,
            category: "development",
            subcategory: "React",
            tags: ["Premium", "Bundle", "Tutorial Included"],
            rating: 4.8,
            sales: 156,
            fileType: "template",
            fileUrl: "",
            compatibleWith: ["React", "Next.js"],
            createdAt: "2024-01-10",
          },
          {
            id: "4",
            name: "Figma UI Kit",
            description: "Modern UI components for Figma design system",
            price: 149,
            category: "design",
            subcategory: "Figma",
            tags: ["Best Seller", "Premium"],
            rating: 4.9,
            sales: 287,
            fileType: "asset",
            fileUrl: "",
            compatibleWith: ["Figma"],
            createdAt: "2024-01-05",
          },
          {
            id: "5",
            name: "Notion Content Planner",
            description: "Complete content planning system for Notion",
            price: 79,
            category: "productivity",
            subcategory: "Notion Templates",
            tags: ["Beginner Friendly", "Free Updates"],
            rating: 4.6,
            sales: 412,
            fileType: "template",
            fileUrl: "",
            compatibleWith: ["Notion"],
            createdAt: "2024-01-18",
          },
          {
            id: "6",
            name: "Social Media Motion Pack",
            description: "Animated templates for Instagram, TikTok, YouTube",
            price: 129,
            category: "video",
            subcategory: "After Effects",
            tags: ["Trending", "Bundle"],
            rating: 4.7,
            sales: 231,
            fileType: "template",
            fileUrl: "",
            compatibleWith: ["After Effects", "Premiere Pro"],
            createdAt: "2024-01-12",
          },
        ];

        setProducts(mockProducts);
        setFilteredProducts(mockProducts);

        // Get category from URL params
        const categoryParam = searchParams.get("category");
        if (categoryParam && categories.some((c) => c.id === categoryParam)) {
          setSelectedCategory(categoryParam);
        }
      } catch (error) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          product.subcategory.toLowerCase().includes(query)
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter((product) =>
        selectedTags.every((tag) => product.tags.includes(tag))
      );
    }

    // Filter by price range
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.sales - a.sales);
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    setFilteredProducts(result);
  }, [
    products,
    selectedCategory,
    searchQuery,
    selectedTags,
    sortBy,
    priceRange,
  ]);

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

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchParams({ category: categoryId });
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedTags([]);
    setPriceRange([0, 500]);
    setSortBy("newest");
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading products...</p>
        </div>
      </div>
    );
  }

  const activeCategory = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Digital Assets
              </span>
              <br />
              <span className="text-white">For Creators & Developers</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover premium resources to boost your creativity and
              productivity. Everything you need in one marketplace.
            </p>

            {/* Search Bar */}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Explore Categories</h2>
            <p className="text-gray-400">
              Find exactly what you need for your creative workflow
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CategoryCard
                  category={category}
                  isActive={selectedCategory === category.id}
                  onClick={() => handleCategorySelect(category.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Header with Stats and Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {activeCategory?.name || "All Products"}
              </h2>
              <p className="text-gray-400">
                {filteredProducts.length} products •{" "}
                {activeCategory?.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4 lg:mt-0">
              {/* View Toggle */}
              <div className="flex items-center space-x-2 bg-gray-800 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${
                    viewMode === "grid" ? "bg-gray-700" : ""
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${
                    viewMode === "list" ? "bg-gray-700" : ""
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {/* Filter Button */}
              <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl transition-colors">
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="font-semibold">Filters</span>
              </div>

              {(selectedTags.length > 0 ||
                selectedCategory !== "all" ||
                searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-400 hover:text-red-300 flex items-center"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear All
                </button>
              )}
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategory !== "all" && (
                <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm flex items-center">
                  Category: {activeCategory?.name}
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="ml-2"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button onClick={() => handleTagToggle(tag)} className="ml-2">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Popular Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-purple-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="relative max-w-2xl mx-auto mb-12">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search presets, templates, plugins, assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-2xl flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your filters or search term
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ProductCard {...product} onBuy={handleBuy} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredProducts.map((product) => (
                      <ProductGrid
                        key={product.id}
                        product={product}
                        onBuy={handleBuy}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gray-800/50 rounded-2xl">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  117+
                </div>
                <div className="text-gray-400">Total Products</div>
              </div>
              <div className="text-center p-6 bg-gray-800/50 rounded-2xl">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  2,458+
                </div>
                <div className="text-gray-400">Happy Customers</div>
              </div>
              <div className="text-center p-6 bg-gray-800/50 rounded-2xl">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  4.8★
                </div>
                <div className="text-gray-400">Average Rating</div>
              </div>
              <div className="text-center p-6 bg-gray-800/50 rounded-2xl">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  24/7
                </div>
                <div className="text-gray-400">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sell Your Digital Products
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Have premium resources to share? Join our marketplace and reach
            thousands of creators worldwide.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all">
            Become a Seller
          </button>
        </div>
      </section>
    </div>
  );
};

export default Products;
